"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "@/lib/mock-data"

interface PricingCardProps {
  plan: PricingPlan
  onSelect?: () => void
  className?: string
  compact?: boolean
}

export function PricingCard({ plan, onSelect, className, compact = false }: PricingCardProps) {
  const isHighlighted = plan.popular || plan.bestValue

  return (
    <Card className={cn("relative flex flex-col", isHighlighted && "border-primary shadow-lg", className)}>
      {plan.badge && (
        <Badge
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2",
            plan.bestValue ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground",
          )}
        >
          {plan.badge}
        </Badge>
      )}

      <CardHeader className={cn(compact && "pb-2")}>
        <CardTitle className={cn("text-xl", compact && "text-lg")}>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className={cn("flex-1", compact && "py-2")}>
        <div className="mb-4">
          <span className={cn("text-4xl font-bold", compact && "text-3xl")}>${plan.price}</span>
          {plan.duration && <span className="text-muted-foreground">/{plan.duration}</span>}
        </div>

        {plan.pricePerReport && (
          <p className="mb-4 text-sm text-muted-foreground">${plan.pricePerReport.toFixed(2)} per report</p>
        )}

        {!compact && (
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant={isHighlighted ? "default" : "outline"} onClick={onSelect}>
          {plan.reports === "unlimited" ? "Get Started" : `Buy ${plan.reports} Report${plan.reports === 1 ? "" : "s"}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
