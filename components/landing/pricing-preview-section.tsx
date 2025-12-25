"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import { pricingPlans, proPass, monthlyPlan } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"

export function PricingPreviewSection() {
  const { t } = useI18n()
  const [selectedCard, setSelectedCard] = useState<string | null>("pro-pass")

  if (!pricingPlans || !proPass || !monthlyPlan) {
    return null
  }

  const displayPlans = [
    { ...pricingPlans[1], subtitle: t.singleReport, cardId: "single-report" },
    { ...proPass, subtitle: t.proPass, cardId: "pro-pass" },
    { ...monthlyPlan, subtitle: t.monthly, cardId: "monthly" },
  ]

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.choosePlan}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {displayPlans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedCard(plan.cardId)}
              className={cn(
                "relative flex cursor-pointer flex-col transition-all duration-200",
                "hover:border-primary/50 hover:shadow-md",
                selectedCard === plan.cardId
                  ? "border-primary ring-2 ring-primary/20 shadow-lg"
                  : plan.popular || plan.bestValue
                    ? "border-primary/30"
                    : "border-border",
              )}
            >
              {plan.badge && (
                <Badge
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                    plan.bestValue ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {plan.bestValue ? t.bestValue : plan.badge}
                </Badge>
              )}

              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{plan.subtitle}</p>
                <CardTitle className="mt-1 text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.duration && <span className="text-muted-foreground">/{plan.duration}</span>}
                </div>

                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {selectedCard === plan.cardId && (
                <div className="absolute right-3 top-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/pricing">
              {t.compareFeatures}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
