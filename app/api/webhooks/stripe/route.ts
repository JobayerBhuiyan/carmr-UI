import { NextRequest } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"
import { createEntitlement, deactivateSubscription, PLAN_CONFIG } from "@/lib/services/entitlements"
import { sendPurchaseConfirmation, sendSubscriptionConfirmation, sendSubscriptionCanceled, sendPaymentFailed } from "@/lib/services/email"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured")
  return new Stripe(key, { apiVersion: "2025-05-28.basil" })
}

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET not configured")
  return secret
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

function getServerClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    const webhookSecret = getWebhookSecret()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return new Response("Invalid signature", { status: 400 })
  }

  const supabase = getServerClient()

  const { data: existingTransaction } = await supabase
    .from("transactions")
    .select("id")
    .eq("stripe_event_id", event.id)
    .maybeSingle()

  if (existingTransaction) {
    return new Response(JSON.stringify({ received: true, duplicate: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(supabase, event.id, session)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(supabase, event.id, subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(supabase, event.id, subscription)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await logTransaction(supabase, event.id, paymentIntent)
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await logFailedPayment(supabase, event.id, paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return new Response("Webhook processing failed", { status: 500 })
  }
}

async function handleCheckoutCompleted(
  supabase: ReturnType<typeof getServerClient>,
  eventId: string,
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.user_id
  const planName = session.metadata?.plan_name as keyof typeof PLAN_CONFIG | undefined

  if (!userId || !planName) {
    console.error("Missing user_id or plan_name in session metadata")
    return
  }

  const entitlement = await createEntitlement(
    supabase,
    userId,
    planName,
    session.customer as string,
    session.subscription as string | undefined
  )

  await supabase.from("transactions").insert({
    stripe_event_id: eventId,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string,
    user_id: userId,
    amount: session.amount_total || 0,
    currency: session.currency || "usd",
    status: "completed",
    plan_name: planName,
    entitlement_id: entitlement?.id,
    metadata: { session_id: session.id },
    processed_at: new Date().toISOString(),
  })

  const { data: profile } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", userId)
    .maybeSingle()

  if (profile?.email) {
    const config = PLAN_CONFIG[planName]
    if (session.mode === "subscription") {
      await sendSubscriptionConfirmation(profile.email, session.subscription as string)
    } else {
      await sendPurchaseConfirmation(
        profile.email,
        planName,
        session.amount_total || 0,
        config?.credits
      )
    }
  }
}

async function handleSubscriptionUpdate(
  supabase: ReturnType<typeof getServerClient>,
  eventId: string,
  subscription: Stripe.Subscription
) {
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.error("Missing user_id in subscription metadata")
    return
  }

  if (subscription.status === "active") {
    const { data: existingEntitlement } = await supabase
      .from("entitlements")
      .select("id")
      .eq("stripe_subscription_id", subscription.id)
      .eq("is_active", true)
      .maybeSingle()

    if (!existingEntitlement) {
      await createEntitlement(
        supabase,
        userId,
        "monthly",
        subscription.customer as string,
        subscription.id
      )
    } else {
      const newExpiry = new Date(subscription.current_period_end * 1000).toISOString()
      await supabase
        .from("entitlements")
        .update({ expires_at: newExpiry, updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id)
    }
  }

  await supabase.from("transactions").insert({
    stripe_event_id: eventId,
    user_id: userId,
    amount: 0,
    status: "completed",
    plan_name: "monthly",
    metadata: { subscription_id: subscription.id, status: subscription.status },
    processed_at: new Date().toISOString(),
  })
}

async function handleSubscriptionCanceled(
  supabase: ReturnType<typeof getServerClient>,
  eventId: string,
  subscription: Stripe.Subscription
) {
  await deactivateSubscription(supabase, subscription.id)

  await supabase.from("transactions").insert({
    stripe_event_id: eventId,
    user_id: subscription.metadata?.user_id,
    amount: 0,
    status: "completed",
    plan_name: "monthly",
    metadata: { subscription_id: subscription.id, action: "canceled" },
    processed_at: new Date().toISOString(),
  })

  if (subscription.metadata?.user_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", subscription.metadata.user_id)
      .maybeSingle()

    if (profile?.email) {
      const endDate = new Date(subscription.current_period_end * 1000).toISOString()
      await sendSubscriptionCanceled(profile.email, endDate)
    }
  }
}

async function logTransaction(
  supabase: ReturnType<typeof getServerClient>,
  eventId: string,
  paymentIntent: Stripe.PaymentIntent
) {
  await supabase.from("transactions").insert({
    stripe_event_id: eventId,
    stripe_payment_intent_id: paymentIntent.id,
    user_id: paymentIntent.metadata?.user_id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: "completed",
    metadata: { payment_intent_id: paymentIntent.id },
    processed_at: new Date().toISOString(),
  })
}

async function logFailedPayment(
  supabase: ReturnType<typeof getServerClient>,
  eventId: string,
  paymentIntent: Stripe.PaymentIntent
) {
  await supabase.from("transactions").insert({
    stripe_event_id: eventId,
    stripe_payment_intent_id: paymentIntent.id,
    user_id: paymentIntent.metadata?.user_id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: "failed",
    metadata: {
      payment_intent_id: paymentIntent.id,
      error: paymentIntent.last_payment_error?.message,
    },
    processed_at: new Date().toISOString(),
  })

  if (paymentIntent.metadata?.user_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", paymentIntent.metadata.user_id)
      .maybeSingle()

    if (profile?.email) {
      await sendPaymentFailed(profile.email, paymentIntent.last_payment_error?.message)
    }
  }
}
