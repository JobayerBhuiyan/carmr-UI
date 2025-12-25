"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { pricingPlans } from "@/lib/mock-data"

interface PackageSelectorProps {
  onSelect?: (planId: string) => void
  className?: string
}

export function PackageSelector({ onSelect, className }: PackageSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[0].id)
  const plan = pricingPlans.find((p) => p.id === selectedPlan) || pricingPlans[0]

  return (
    <div className={className}>
      <Select value={selectedPlan} onValueChange={setSelectedPlan}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pricingPlans.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.reports} Report{p.reports === 1 ? "" : "s"} - ${p.price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">${plan.price}</span>
          <span className="text-sm text-muted-foreground">${plan.pricePerReport?.toFixed(2)}/report</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">No expiration</p>
      </div>

      <Button className="mt-4 w-full" onClick={() => onSelect?.(selectedPlan)}>
        Buy {plan.reports} Report{plan.reports === 1 ? "" : "s"}
      </Button>
    </div>
  )
}
