"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import { pricingPlans, proPass, monthlyPlan } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { CTA_SECONDARY } from "@/components/cta"

interface PricingColumnsProps {
  className?: string
}

export function PricingColumns({ className }: PricingColumnsProps) {
  const [selectedPackage, setSelectedPackage] = useState(pricingPlans[1].id)
  const currentPackage = pricingPlans.find((p) => p.id === selectedPackage) || pricingPlans[1]

  const handleSelect = (planName: string) => {
    toast.success(`Selected: ${planName}`, {
      description: "Checkout integration coming soon.",
    })
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
              <div className="flex items-baseline justify-between">
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
          <button type="button" className={CTA_SECONDARY} onClick={() => handleSelect(currentPackage.name)}>
            Buy {currentPackage.reports} Report{Number(currentPackage.reports) === 1 ? "" : "s"}
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
          >
            Get Pro Pass
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
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${monthlyPlan.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Cancel anytime</p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {monthlyPlan.features.map((feature, idx) => (
              <li
                key={feature}
                className={cn("flex items-start gap-2 text-sm", idx === monthlyPlan.features.length - 1 && "mb-0")}
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <div className="mt-auto p-6 pt-4">
          <button type="button" className={CTA_SECONDARY} onClick={() => handleSelect(monthlyPlan.name)}>
            Subscribe Monthly
          </button>
        </div>
      </Card>
    </div>
  )
}
