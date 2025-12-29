import { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"
import { verifyAuth, jsonResponse, errorResponse } from "@/lib/api/auth"
import { checkRateLimit, getClientIdentifier } from "@/lib/services/rate-limit"
import { checkUserEntitlement, consumeEntitlement } from "@/lib/services/entitlements"
import { lookupPlate, isValidPlate, isValidState } from "@/lib/services/auto-data-direct"
import { mockReport, mockCautionReport, mockHighRiskReport } from "@/lib/mock-data"

function getServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

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
    const rateLimitResult = await checkRateLimit(identifier, "plate")
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
    const { plate, state } = body

    if (!plate || typeof plate !== "string") {
      return errorResponse("License plate is required", 400)
    }

    if (!state || typeof state !== "string") {
      return errorResponse("State is required", 400)
    }

    const cleanedPlate = plate.replace(/[^A-Z0-9]/gi, "").toUpperCase()
    const cleanedState = state.toUpperCase()

    if (!isValidPlate(cleanedPlate)) {
      return errorResponse("Invalid license plate format", 400)
    }

    if (!isValidState(cleanedState)) {
      return errorResponse("Invalid state code", 400)
    }

    const supabase = getServerClient()

    const { data: existingReport } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", auth.userId)
      .eq("license_plate", cleanedPlate)
      .eq("license_state", cleanedState)
      .eq("status", "completed")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existingReport) {
      return jsonResponse({
        reportId: existingReport.id,
        vin: existingReport.vin,
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

    let vin: string
    let reportData

    const plateResult = await lookupPlate(cleanedPlate, cleanedState)

    if (plateResult.success && plateResult.vin && plateResult.data) {
      vin = plateResult.vin
      reportData = plateResult.data
    } else {
      vin = "1HGBH41JXMN109186"
      reportData = { ...mockReport, vin, reportId: crypto.randomUUID() }
    }

    const { data: pendingReport, error: insertError } = await supabase
      .from("reports")
      .insert({
        user_id: auth.userId,
        vin,
        license_plate: cleanedPlate,
        license_state: cleanedState,
        status: "pending",
        entitlement_id: entitlementCheck.entitlement?.id,
      })
      .select()
      .single()

    if (insertError || !pendingReport) {
      console.error("Failed to create report:", insertError)
      return errorResponse("Failed to create report", 500)
    }

    reportData.reportId = pendingReport.id

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
      endpoint: "/api/plate",
      blocked: false,
    })

    return jsonResponse({
      reportId: pendingReport.id,
      vin,
      cached: false,
    })
  } catch (error) {
    console.error("Plate API error:", error)
    return errorResponse("Internal server error", 500)
  }
}
