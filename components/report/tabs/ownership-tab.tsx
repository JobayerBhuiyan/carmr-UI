import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Gauge, User, TrendingUp, Clock } from "lucide-react"
import type { VehicleReport } from "@/lib/mock-data"

interface OwnershipTabProps {
  report: VehicleReport
}

export function OwnershipTab({ report }: OwnershipTabProps) {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {report.owners}+ owners found
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ownership History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            {report.ownership.map((owner, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Timeline line */}
                {index < report.ownership.length - 1 && (
                  <div className="absolute left-5 top-10 h-[calc(100%+1.5rem)] w-0.5 bg-border" />
                )}

                {/* Timeline dot */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <User className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {owner.owner === 1
                          ? "1st"
                          : owner.owner === 2
                            ? "2nd"
                            : owner.owner === 3
                              ? "3rd"
                              : `${owner.owner}th`}{" "}
                        Owner
                      </h3>
                      <Badge variant="outline" className="mt-1">
                        {owner.ownershipType}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {owner.state}, United States
                    </Badge>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-border/50 bg-background p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Estimated mi/year
                      </div>
                      <p className="mt-1 font-semibold">{owner.estimatedMilesPerYear.toLocaleString()} mi</p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-background p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Gauge className="h-3 w-3" />
                        Last odometer reading
                      </div>
                      <p className="mt-1 font-semibold">{owner.lastOdometerReading.toLocaleString()} mi</p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-background p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Was purchased in
                      </div>
                      <p className="mt-1 font-semibold">{new Date(owner.purchaseDate).getFullYear()}</p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-background p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Was in usage
                      </div>
                      <p className="mt-1 font-semibold">{owner.ownershipDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {report.salesHistory && report.salesHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium">Date</th>
                    <th className="pb-3 text-left font-medium">Mileage</th>
                    <th className="pb-3 text-left font-medium">Sale Type</th>
                    <th className="pb-3 text-left font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {report.salesHistory.map((sale, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3">
                        {new Date(sale.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3">{sale.mileage.toLocaleString()} mi</td>
                      <td className="py-3">
                        <Badge variant="outline">{sale.saleType}</Badge>
                      </td>
                      <td className="py-3">{sale.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
