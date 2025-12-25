"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { pricingPlans, proPass, monthlyPlan } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const handleSelect = (planName: string) => {
    toast.success(`Selected: ${planName}`, {
      description: "Checkout integration coming soon.",
    })
    onOpenChange(false)
  }

  const allPlans = [...pricingPlans, proPass, monthlyPlan]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>Choose the plan that works best for you</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {allPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-xl border p-4 transition-colors hover:border-primary/50",
                (plan.popular || plan.bestValue) && "border-primary",
              )}
            >
              {plan.badge && (
                <Badge
                  className={cn(
                    "absolute -top-2.5 right-4",
                    plan.bestValue ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground",
                  )}
                >
                  {plan.badge}
                </Badge>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {plan.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-success" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    {plan.duration && <span className="text-sm text-muted-foreground">/{plan.duration}</span>}
                  </div>
                  <Button
                    size="sm"
                    variant={plan.popular || plan.bestValue ? "default" : "outline"}
                    onClick={() => handleSelect(plan.name)}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
