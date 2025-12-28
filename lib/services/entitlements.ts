import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database, Entitlement } from "@/lib/supabase/types"

export type EntitlementCheck = {
  hasAccess: boolean
  entitlement: Entitlement | null
  reason?: string
}

export const PLAN_CONFIG = {
  single: { credits: 1, type: "credits" as const },
  "5-pack": { credits: 5, type: "credits" as const },
  "20-pack": { credits: 20, type: "credits" as const },
  "3-day-pass": { durationHours: 72, type: "pass" as const },
  monthly: { durationDays: 30, type: "subscription" as const },
} as const

export async function checkUserEntitlement(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<EntitlementCheck> {
  const now = new Date().toISOString()

  const { data: passOrSub } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .in("type", ["pass", "subscription"])
    .gt("expires_at", now)
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (passOrSub) {
    return { hasAccess: true, entitlement: passOrSub }
  }

  const { data: credits } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .eq("type", "credits")
    .gt("credits_remaining", 0)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle()

  if (credits && credits.credits_remaining > 0) {
    return { hasAccess: true, entitlement: credits }
  }

  return { hasAccess: false, entitlement: null, reason: "No active entitlement" }
}

export async function consumeEntitlement(
  supabase: SupabaseClient<Database>,
  entitlement: Entitlement
): Promise<boolean> {
  if (entitlement.type === "credits") {
    const { error } = await supabase
      .from("entitlements")
      .update({
        credits_remaining: entitlement.credits_remaining - 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", entitlement.id)
      .eq("credits_remaining", entitlement.credits_remaining)

    return !error
  }

  return true
}

export async function createEntitlement(
  supabase: SupabaseClient<Database>,
  userId: string,
  planName: keyof typeof PLAN_CONFIG,
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
): Promise<Entitlement | null> {
  const config = PLAN_CONFIG[planName]
  const now = new Date()

  let expiresAt: string | null = null
  let creditsRemaining = 0

  if (config.type === "credits") {
    creditsRemaining = (config as { credits: number }).credits
  } else if (config.type === "pass") {
    const hours = (config as { durationHours: number }).durationHours
    expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString()
  } else if (config.type === "subscription") {
    const days = (config as { durationDays: number }).durationDays
    expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString()
  }

  const { data, error } = await supabase
    .from("entitlements")
    .insert({
      user_id: userId,
      type: config.type,
      credits_remaining: creditsRemaining,
      expires_at: expiresAt,
      plan_name: planName,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Failed to create entitlement:", error)
    return null
  }

  return data
}

export async function getUserEntitlements(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Entitlement[]> {
  const { data, error } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch entitlements:", error)
    return []
  }

  return data || []
}

export async function deactivateSubscription(
  supabase: SupabaseClient<Database>,
  stripeSubscriptionId: string
): Promise<boolean> {
  const { error } = await supabase
    .from("entitlements")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", stripeSubscriptionId)

  return !error
}
