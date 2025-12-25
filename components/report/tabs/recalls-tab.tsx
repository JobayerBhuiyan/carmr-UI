import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface RecallsTabProps {
  report: VehicleReport
}

export function RecallsTab({ report }: RecallsTabProps) {
  if (report.recalls.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">No Open Recalls</h3>
            <p className="mt-2 text-center text-muted-foreground">This vehicle has no open recalls at this time.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig = {
    Open: { icon: AlertCircle, className: "bg-danger/10 text-danger border-danger/30" },
    Completed: { icon: CheckCircle, className: "bg-success/10 text-success border-success/30" },
    "N/A": { icon: Bell, className: "bg-muted text-muted-foreground" },
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {report.recalls.map((recall, index) => {
        const status = statusConfig[recall.status]
        const StatusIcon = status.icon

        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {recall.component}
                </CardTitle>
                <Badge className={cn(status.className)}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {recall.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{recall.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Date: {new Date(recall.date).toLocaleDateString()}</span>
                {recall.nhtsa_id && (
                  <Button variant="link" size="sm" className="h-auto p-0" asChild>
                    <a
                      href={`https://www.nhtsa.gov/recalls?nhtsaId=${recall.nhtsa_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NHTSA: {recall.nhtsa_id}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
