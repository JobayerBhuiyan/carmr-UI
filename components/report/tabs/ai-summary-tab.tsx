import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface AISummaryTabProps {
  report: VehicleReport
}

export function AISummaryTab({ report }: AISummaryTabProps) {
  const { aiSummary } = report

  const assessmentConfig = {
    GOOD: {
      label: "GOOD BUY",
      description: "This vehicle passes our checks",
      className: "bg-success/10 text-success border-success/30",
    },
    CAUTION: {
      label: "CAUTION",
      description: "Review the details carefully",
      className: "bg-warning/10 text-warning border-warning/30",
    },
    SKIP: {
      label: "SKIP THIS ONE",
      description: "We found significant concerns",
      className: "bg-danger/10 text-danger border-danger/30",
    },
  }

  const assessment = assessmentConfig[aiSummary.assessment]

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Overall Assessment */}
      <div className={cn("rounded-xl border-2 p-6 text-center", assessment.className)}>
        <Badge className={cn("text-lg font-bold", assessment.className)}>{assessment.label}</Badge>
        <p className="mt-2 text-base">{assessment.description}</p>
      </div>

      {/* Key Points */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold">Key Points</h2>
        <Card className="mt-4">
          <CardContent className="p-6">
            <ul className="space-y-3">
              {aiSummary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-base leading-relaxed">
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* What This Means For You */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold">What This Means for You</h2>
        <Card className="mt-4">
          <CardContent className="space-y-4 p-6">
            {aiSummary.whatThisMeans.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Questions to Ask */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold">Questions to Ask the Seller</h2>
        <Card className="mt-4">
          <CardContent className="p-6">
            <ul className="space-y-3">
              {aiSummary.questionsToAsk.map((question, index) => (
                <li key={index} className="flex items-start gap-3 text-base leading-relaxed">
                  <span className="shrink-0 font-mono text-sm text-muted-foreground">{index + 1}.</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Line */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold">Bottom Line</h2>
        <Card className="mt-4 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-lg font-semibold leading-relaxed">{aiSummary.bottomLine}</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
