"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

  return (
    <div className={cn("grid gap-6 lg:grid-cols-3", className)}>
      {/* Column A: Pay-Per-Report */}
      <Card className="flex flex-col overflow-visible">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pay-Per-Report</p>
          <CardTitle className="mt-1 text-xl">Report Packages</CardTitle>
          <CardDescription>Buy reports that never expire</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-visible">
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pricingPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.reports} Report{Number(plan.reports) === 1 ? "" : "s"} - ${plan.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-bold">${currentPackage.price}</span>
              <span className="text-sm text-muted-foreground">${currentPackage.pricePerReport?.toFixed(2)}/report</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">No expiration</p>
          </div>

          <ul className="mt-6 space-y-2">
            {currentPackage.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <button type="button" className={CTA_SECONDARY} onClick={() => handleSelect(currentPackage.name)}>
            Buy {currentPackage.reports} Report{Number(currentPackage.reports) === 1 ? "" : "s"}
          </button>
        </CardFooter>
      </Card>

      {/* Column B: Pro Pass (Highlighted) */}
      <Card className="relative flex flex-col border-primary shadow-lg">
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground">
          {proPass.badge}
        </Badge>

        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Weekend Special</p>
          <CardTitle className="mt-1 text-xl">{proPass.name}</CardTitle>
          <CardDescription>{proPass.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">${proPass.price}</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="mt-2 text-sm font-medium text-primary">Unlimited reports for 72 hours</p>
          </div>

          <ul className="mt-6 space-y-2">
            {proPass.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-primary hover:brightness-110 text-white rounded-2xl px-4 py-3 transition-colors"
            onClick={() => handleSelect(proPass.name)}
          >
            Get Pro Pass
          </Button>
        </CardFooter>
      </Card>

      {/* Column C: Monthly Subscription */}
      <Card className="relative flex flex-col border-primary/50">
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          {monthlyPlan.badge}
        </Badge>

        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unlimited Access</p>
          <CardTitle className="mt-1 text-xl">{monthlyPlan.name}</CardTitle>
          <CardDescription>{monthlyPlan.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">${monthlyPlan.price}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Cancel anytime</p>
          </div>

          <ul className="mt-6 space-y-2">
            {monthlyPlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <button type="button" className={CTA_SECONDARY} onClick={() => handleSelect(monthlyPlan.name)}>
            Subscribe Monthly
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
