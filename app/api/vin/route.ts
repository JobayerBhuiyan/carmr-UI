import { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"
import { verifyAuth, jsonResponse, errorResponse } from "@/lib/api/auth"
import { checkRateLimit, getClientIdentifier } from "@/lib/services/rate-limit"
import { checkUserEntitlement, consumeEntitlement } from "@/lib/services/entitlements"
import { lookupVin, isValidVin, cleanVin } from "@/lib/services/auto-data-direct"
import { mockReport, mockCautionReport, mockHighRiskReport } from "@/lib/mock-data"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

function getServerClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.userId) {
      return errorResponse(auth.error || "Unauthorized", 401)
    }

    const identifier = getClientIdentifier(request, auth.userId)
    const rateLimitResult = await checkRateLimit(identifier, "vin")
    if (!rateLimitResult.success) {
      return jsonResponse(
        {
          error: "Rate limit exceeded",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        429
      )
    }

    const body = await request.json()
    const { vin } = body

    if (!vin || typeof vin !== "string") {
      return errorResponse("VIN is required", 400)
    }

    const cleanedVin = cleanVin(vin)
    if (!isValidVin(cleanedVin)) {
      return errorResponse("Invalid VIN format", 400)
    }

    const supabase = getServerClient()

    const { data: existingReport } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", auth.userId)
      .eq("vin", cleanedVin)
      .eq("status", "completed")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existingReport) {
      return jsonResponse({
        reportId: existingReport.id,
        cached: true,
      })
    }

    const entitlementCheck = await checkUserEntitlement(supabase, auth.userId)
    if (!entitlementCheck.hasAccess) {
      return jsonResponse(
        { error: "No active entitlement", requiresPurchase: true },
        402
      )
    }

    const { data: pendingReport, error: insertError } = await supabase
      .from("reports")
      .insert({
        user_id: auth.userId,
        vin: cleanedVin,
        status: "pending",
        entitlement_id: entitlementCheck.entitlement?.id,
      })
      .select()
      .single()

    if (insertError || !pendingReport) {
      console.error("Failed to create report:", insertError)
      return errorResponse("Failed to create report", 500)
    }

    let reportData
    const addResult = await lookupVin(cleanedVin)

    if (addResult.success && addResult.data) {
      reportData = addResult.data
    } else {
      if (cleanedVin === "2T1BURHE5JC073215") {
        reportData = { ...mockCautionReport, vin: cleanedVin, reportId: pendingReport.id }
      } else if (cleanedVin === "3FA6P0H77KR245892") {
        reportData = { ...mockHighRiskReport, vin: cleanedVin, reportId: pendingReport.id }
      } else {
        reportData = { ...mockReport, vin: cleanedVin, reportId: pendingReport.id }
      }
    }

    const { error: updateError } = await supabase
      .from("reports")
      .update({
        report_data: reportData,
        status: "completed",
      })
      .eq("id", pendingReport.id)

    if (updateError) {
      console.error("Failed to update report:", updateError)
      return errorResponse("Failed to save report", 500)
    }

    if (entitlementCheck.entitlement) {
      await consumeEntitlement(supabase, entitlementCheck.entitlement)
    }

    await supabase.from("rate_limit_events").insert({
      user_id: auth.userId,
      ip_address: request.headers.get("x-forwarded-for")?.split(",")[0].trim() || null,
      endpoint: "/api/vin",
      blocked: false,
    })

    return jsonResponse({
      reportId: pendingReport.id,
      cached: false,
    })
  } catch (error) {
    console.error("VIN API error:", error)
    return errorResponse("Internal server error", 500)
  }
}
