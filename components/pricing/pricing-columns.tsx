"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader2 } from "lucide-react"
import { pricingPlans, proPass, monthlyPlan } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { CTA_SECONDARY } from "@/components/cta"
import { useAuth } from "@/lib/auth/context"
import { createBrowserClient } from "@/lib/supabase/client"

interface PricingColumnsProps {
  className?: string
}

const PLAN_NAME_MAP: Record<string, string> = {
  "Single Report": "single",
  "5 Reports": "5-pack",
  "20 Reports": "20-pack",
  "Pro Pass": "3-day-pass",
  "Monthly Subscription": "monthly",
}

export function PricingColumns({ className }: PricingColumnsProps) {
  const [selectedPackage, setSelectedPackage] = useState(pricingPlans[1].id)
  const [loading, setLoading] = useState<string | null>(null)
  const currentPackage = pricingPlans.find((p) => p.id === selectedPackage) || pricingPlans[1]
  const { user } = useAuth()
  const router = useRouter()

  const handleSelect = async (planName: string) => {
    if (!user) {
      toast.error("Please sign in to continue")
      router.push("/sign-in")
      return
    }

    const planId = PLAN_NAME_MAP[planName]
    if (!planId) {
      toast.error("Invalid plan selected")
      return
    }

    setLoading(planId)

    try {
      const supabase = createBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        toast.error("Please sign in to continue")
        router.push("/sign-in")
        return
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ planName: planId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to start checkout")
      setLoading(null)
    }
  }

  const hasSavings = currentPackage.features.some((f) => f.toLowerCase().includes("save"))

  return (
    <div className={cn("grid items-stretch gap-6 md:gap-8 lg:grid-cols-3", className)}>
      {/* Column A: Pay-Per-Report */}
      <Card className="h-full flex flex-col overflow-visible">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pay-Per-Report</p>
          <CardTitle className="mt-1 text-xl">Report Packages</CardTitle>
          <CardDescription>Buy reports that never expire</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-visible">
          <div className="space-y-3">
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {pricingPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.reports} Report{Number(plan.reports) === 1 ? "" : "s"} - ${plan.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${currentPackage.price}</span>
                <span className="text-sm text-muted-foreground">
                  ${currentPackage.pricePerReport?.toFixed(2)}/report
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">No expiration</p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>Full vehicle history</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>AI-powered summary</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>Market value estimate</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>PDF download</span>
            </li>
            <li className="min-h-[20px] md:min-h-[24px] flex items-start gap-2 text-sm" aria-live="polite">
              {hasSavings ? (
                <>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-success font-medium">
                    {currentPackage.features.find((f) => f.toLowerCase().includes("save"))}
                  </span>
                </>
              ) : (
                <span className="invisible">Save placeholder</span>
              )}
            </li>
          </ul>
        </CardContent>

        <div className="mt-auto p-6 pt-4">
          <button
            type="button"
            className={CTA_SECONDARY}
            onClick={() => handleSelect(currentPackage.name)}
            disabled={loading === PLAN_NAME_MAP[currentPackage.name]}
          >
            {loading === PLAN_NAME_MAP[currentPackage.name] ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Processing...
              </>
            ) : (
              <>Buy {currentPackage.reports} Report{Number(currentPackage.reports) === 1 ? "" : "s"}</>
            )}
          </button>
        </div>
      </Card>

      {/* Column B: Pro Pass (Highlighted) */}
      <Card className="relative h-full flex flex-col border-primary shadow-lg">
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground">
          {proPass.badge}
        </Badge>

        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Weekend Special</p>
          <CardTitle className="mt-1 text-xl">{proPass.name}</CardTitle>
          <CardDescription>{proPass.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-3">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${proPass.price}</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <p className="mt-2 text-sm font-medium text-primary">Unlimited reports for 72 hours</p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {proPass.features.map((feature, idx) => (
              <li
                key={feature}
                className={cn("flex items-start gap-2 text-sm", idx === proPass.features.length - 1 && "mb-0")}
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <div className="mt-auto p-6 pt-4">
          <Button
            className="w-full bg-primary hover:brightness-110 text-white rounded-2xl px-4 py-3 transition-colors"
            onClick={() => handleSelect(proPass.name)}
            disabled={loading === "3-day-pass"}
          >
            {loading === "3-day-pass" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Pro Pass"
            )}
          </Button>
        </div>
      </Card>

      {/* Column C: Monthly Subscription */}
      <Card className="relative h-full flex flex-col border-primary/50">
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          {monthlyPlan.badge}
        </Badge>

        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unlimited Access</p>
          <CardTitle className="mt-1 text-xl">{monthlyPlan.name}</CardTitle>
          <CardDescription>{monthlyPlan.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="shrink-0 text-4xl font-bold">${monthlyPlan.price}</span>
                <span className="shrink-0 text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Cancel anytime</p>
            </div>
          </div>
        </CardContent>

        <div className="mt-auto p-6 pt-4">
          <button
            type="button"
            className={CTA_SECONDARY}
            onClick={() => handleSelect(monthlyPlan.name)}
            disabled={loading === "monthly"}
          >
            {loading === "monthly" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Processing...
              </>
            ) : (
              "Subscribe Monthly"
            )}
          </button>
        </div>
      </Card>
    </div>
  )
}
