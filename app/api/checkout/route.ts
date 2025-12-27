import { NextRequest } from "next/server"
import Stripe from "stripe"
import { verifyAuth, jsonResponse, errorResponse } from "@/lib/api/auth"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured")
  }
  return new Stripe(key, { apiVersion: "2025-05-28.basil" })
}

function getPriceIds() {
  return {
    single: process.env.STRIPE_PRICE_SINGLE || "",
    "5-pack": process.env.STRIPE_PRICE_5_PACK || "",
    "20-pack": process.env.STRIPE_PRICE_20_PACK || "",
    "3-day-pass": process.env.STRIPE_PRICE_3_DAY_PASS || "",
    monthly: process.env.STRIPE_PRICE_MONTHLY || "",
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.userId) {
      return errorResponse(auth.error || "Unauthorized", 401)
    }

    const body = await request.json()
    const { planName } = body
    const priceIds = getPriceIds()

    if (!planName || !priceIds[planName as keyof typeof priceIds]) {
      return errorResponse("Invalid plan", 400)
    }

    const priceId = priceIds[planName as keyof typeof priceIds]
    if (!priceId) {
      return errorResponse("Plan not configured", 500)
    }

    const stripe = getStripe()
    const isSubscription = planName === "monthly"
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || ""

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/pricing?success=true&plan=${planName}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        user_id: auth.userId,
        plan_name: planName,
      },
      ...(isSubscription && {
        subscription_data: {
          metadata: {
            user_id: auth.userId,
            plan_name: planName,
          },
        },
      }),
    })

    return jsonResponse({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return errorResponse("Failed to create checkout session", 500)
  }
}
