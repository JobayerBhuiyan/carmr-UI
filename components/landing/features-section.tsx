"use client"

import { Brain, Shield, TrendingUp, Clock, FileCheck, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: Brain,
      title: t.aiSummary,
      description: t.comprehensiveDataDesc,
    },
    {
      icon: Shield,
      title: t.comprehensiveData,
      description: t.accidentHistoryDesc,
    },
    {
      icon: TrendingUp,
      title: t.marketValue,
      description: t.marketValueDesc,
    },
    {
      icon: Clock,
      title: t.recallAlerts,
      description: t.recallAlertsDesc,
    },
    {
      icon: FileCheck,
      title: t.titleBrands,
      description: t.titleBrandsDesc,
    },
    {
      icon: Users,
      title: t.ownershipRecords,
      description: t.ownershipRecordsDesc,
    },
  ]

  return (
    <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.comprehensiveData}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
