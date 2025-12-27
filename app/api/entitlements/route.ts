import { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"
import { verifyAuth, jsonResponse, errorResponse } from "@/lib/api/auth"
import { getUserEntitlements, checkUserEntitlement } from "@/lib/services/entitlements"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

function getServerClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.userId) {
      return errorResponse(auth.error || "Unauthorized", 401)
    }

    const supabase = getServerClient()
    const entitlements = await getUserEntitlements(supabase, auth.userId)
    const access = await checkUserEntitlement(supabase, auth.userId)

    const now = new Date()
    let totalCredits = 0
    let activePass: { expiresAt: string; planName: string } | null = null
    let activeSubscription: { expiresAt: string; planName: string } | null = null

    for (const ent of entitlements) {
      if (!ent.is_active) continue

      if (ent.type === "credits" && ent.credits_remaining > 0) {
        totalCredits += ent.credits_remaining
      } else if (ent.type === "pass" && ent.expires_at && new Date(ent.expires_at) > now) {
        if (!activePass || new Date(ent.expires_at) > new Date(activePass.expiresAt)) {
          activePass = { expiresAt: ent.expires_at, planName: ent.plan_name }
        }
      } else if (ent.type === "subscription" && ent.expires_at && new Date(ent.expires_at) > now) {
        if (!activeSubscription || new Date(ent.expires_at) > new Date(activeSubscription.expiresAt)) {
          activeSubscription = { expiresAt: ent.expires_at, planName: ent.plan_name }
        }
      }
    }

    return jsonResponse({
      hasAccess: access.hasAccess,
      totalCredits,
      activePass,
      activeSubscription,
      entitlements: entitlements.map((e) => ({
        id: e.id,
        type: e.type,
        planName: e.plan_name,
        creditsRemaining: e.credits_remaining,
        expiresAt: e.expires_at,
        isActive: e.is_active,
      })),
    })
  } catch (error) {
    console.error("Entitlements API error:", error)
    return errorResponse("Internal server error", 500)
  }
}
