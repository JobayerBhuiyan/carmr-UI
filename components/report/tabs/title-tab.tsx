import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, AlertTriangle, MapPin, Calendar, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface TitleTabProps {
  report: VehicleReport
}

export function TitleTab({ report }: TitleTabProps) {
  const titleStatusConfig = {
    Clean: { className: "bg-success/10 text-success border-success/30", icon: CheckCircle },
    Salvage: { className: "bg-danger/10 text-danger border-danger/30", icon: AlertTriangle },
    Rebuilt: { className: "bg-warning/10 text-warning border-warning/30", icon: AlertTriangle },
    Flood: { className: "bg-danger/10 text-danger border-danger/30", icon: AlertTriangle },
    Lemon: { className: "bg-warning/10 text-warning border-warning/30", icon: AlertTriangle },
  }

  const status = titleStatusConfig[report.titleStatus]
  const StatusIcon = status.icon

  const problemBrands = report.majorTitleBrandChecks?.filter((b) => b.status === "problem") || []

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Title Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("flex items-center gap-3 rounded-xl border-2 p-6", status.className)}>
            <StatusIcon className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{report.titleStatus} Title</p>
              <p className="text-sm opacity-80">
                {report.titleStatus === "Clean"
                  ? "No title brands or issues found"
                  : "This vehicle has title history that may affect value"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Major Title Brand Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Major Title Brand Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {report.majorTitleBrandChecks?.map((check, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3",
                  check.status === "clear" ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5",
                )}
              >
                <span className="text-sm">{check.brand}</span>
                {check.status === "clear" ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-danger" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {problemBrands.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Title Brand History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problemBrands.map((brand, index) => (
                <div key={index} className="flex gap-4 rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/10">
                    <FileText className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{brand.brand}</Badge>
                    </div>
                    {brand.description && <p className="mt-2">{brand.description}</p>}
                    {brand.date && (
                      <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(brand.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">No Title Brands</h3>
            <p className="mt-2 text-center text-muted-foreground">
              This vehicle has no negative title brands in its history.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Title History */}
      {report.titleHistory && report.titleHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Title History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.titleHistory.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3",
                    item.isCurrent && "border-primary bg-primary/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.state}</p>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{item.mileage.toLocaleString()} mi</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
