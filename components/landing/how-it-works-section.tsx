"use client"

import { Search, FileText, CheckCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function HowItWorksSection() {
  const { t } = useI18n()

  const steps = [
    {
      icon: Search,
      title: t.enterVinStep,
      description: t.enterVinStepDesc,
    },
    {
      icon: FileText,
      title: t.instantAnalysis,
      description: t.instantAnalysisDesc,
    },
    {
      icon: CheckCircle,
      title: t.getReport,
      description: t.getReportDesc,
    },
  ]

  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.howItWorks}</h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step number connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-border sm:block" />
              )}

              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
