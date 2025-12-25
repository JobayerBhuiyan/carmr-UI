import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle, DollarSign, MapPin, Calendar, Car } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface AccidentsTabProps {
  report: VehicleReport
}

function CarDamageDiagram({ damageAreas }: { damageAreas: string[] }) {
  const areas = {
    front: { x: 45, y: 5, width: 30, height: 15 },
    rear: { x: 45, y: 80, width: 30, height: 15 },
    left: { x: 5, y: 30, width: 15, height: 40 },
    right: { x: 100, y: 30, width: 15, height: 40 },
    top: { x: 35, y: 35, width: 50, height: 30 },
    undercarriage: { x: 45, y: 95, width: 30, height: 5 },
  }

  return (
    <div className="relative mx-auto h-48 w-32">
      {/* Car outline */}
      <svg viewBox="0 0 120 100" className="h-full w-full">
        {/* Car body outline */}
        <path
          d="M 30 20 Q 60 5 90 20 L 95 35 Q 100 50 95 65 L 90 80 Q 60 95 30 80 L 25 65 Q 20 50 25 35 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
        />
        {/* Damage areas */}
        {Object.entries(areas).map(([area, coords]) => (
          <rect
            key={area}
            x={coords.x}
            y={coords.y}
            width={coords.width}
            height={coords.height}
            rx="2"
            className={cn(
              "transition-colors",
              damageAreas.includes(area) ? "fill-danger/60 stroke-danger" : "fill-muted/30 stroke-muted-foreground/30",
            )}
            strokeWidth="1"
          />
        ))}
      </svg>
      {/* Legend */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-danger/60" />
          <span>Damaged</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-muted/30 border border-muted-foreground/30" />
          <span>No Damage</span>
        </div>
      </div>
    </div>
  )
}

export function AccidentsTab({ report }: AccidentsTabProps) {
  if (report.accidents.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">No Accidents Reported</h3>
            <p className="mt-2 text-center text-muted-foreground">
              This vehicle has no reported accidents in our database.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const severityConfig = {
    Minor: { className: "bg-warning/10 text-warning border-warning/30", icon: AlertTriangle },
    Moderate: { className: "bg-orange-500/10 text-orange-500 border-orange-500/30", icon: AlertTriangle },
    Severe: { className: "bg-danger/10 text-danger border-danger/30", icon: XCircle },
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="flex items-center gap-4 py-4">
          <AlertTriangle className="h-8 w-8 text-warning" />
          <div>
            <p className="font-semibold">
              {report.accidents.length} Accident{report.accidents.length > 1 ? "s" : ""} Reported
            </p>
            <p className="text-sm text-muted-foreground">
              Use this information as leverage when negotiating the price of the car.
            </p>
          </div>
        </CardContent>
      </Card>

      {report.accidents.map((accident, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Accident #{index + 1}
              </CardTitle>
              <Badge className={cn("border", severityConfig[accident.severity].className)}>{accident.severity}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Details */}
              <div className="space-y-4">
                <p>{accident.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(accident.date).toLocaleDateString()}</span>
                  </div>
                  {accident.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{accident.location}</span>
                    </div>
                  )}
                  {accident.repairCost && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Est. Repair Cost: ${accident.repairCost.toLocaleString()}</span>
                    </div>
                  )}
                  {accident.collisionType && (
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{accident.collisionType}</span>
                    </div>
                  )}
                </div>

                {/* Airbag status */}
                <div className="flex items-center gap-2 text-sm">
                  {accident.airbagDeployed ? (
                    <>
                      <XCircle className="h-4 w-4 text-danger" />
                      <span className="font-medium text-danger">Airbags Deployed</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">No Airbag Deployment</span>
                    </>
                  )}
                </div>

                {/* Source */}
                <Badge variant="outline" className="text-xs">
                  Source: {accident.source}
                </Badge>
              </div>

              {accident.damageAreas && accident.damageAreas.length > 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-6">
                  <p className="mb-4 text-sm font-medium text-muted-foreground">Damage Areas</p>
                  <CarDamageDiagram damageAreas={accident.damageAreas} />
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {accident.damageAreas.map((area) => (
                      <Badge key={area} variant="destructive" className="capitalize">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
