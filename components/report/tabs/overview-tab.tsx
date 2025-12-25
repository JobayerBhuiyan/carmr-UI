"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingDown, TrendingUp, Minus, Shield, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface OverviewTabProps {
  report: VehicleReport
}

export function OverviewTab({ report }: OverviewTabProps) {
  const [showAllEquipment, setShowAllEquipment] = useState(false)

  const specs = [
    { label: "Year", value: report.year },
    { label: "Make", value: report.make },
    { label: "Model", value: report.model },
    { label: "Trim", value: report.trim },
    { label: "Engine", value: report.engine },
    { label: "Made In", value: report.madeIn },
    { label: "Fuel Type", value: report.fuelType },
    { label: "Body Style", value: report.bodyStyle },
    { label: "Transmission", value: report.transmission },
    { label: "Drivetrain", value: report.drivetrain },
  ]

  const quickStats = [
    {
      label: "All history events",
      value: `${report.historyEvents.length} records found`,
      status: "neutral" as const,
    },
    {
      label: "Safety Recalls",
      value:
        report.recalls.filter((r) => r.status === "Open").length > 0
          ? `${report.recalls.filter((r) => r.status === "Open").length} open`
          : "No open recalls",
      status: report.recalls.filter((r) => r.status === "Open").length > 0 ? "warning" : ("success" as const),
    },
    {
      label: "Accidents",
      value: report.accidents.length > 0 ? `${report.accidents.length} records found` : "No records found",
      status: report.accidents.length > 0 ? "warning" : ("success" as const),
    },
    {
      label: "Last Mileage",
      value: `${report.mileage.toLocaleString()} mi`,
      status: "neutral" as const,
    },
    {
      label: "Sales history",
      value: `${report.salesHistory?.length || 0} sales found`,
      status: "neutral" as const,
    },
    {
      label: "Owners",
      value: `${report.owners}+ owners found`,
      status: report.owners > 3 ? "warning" : ("success" as const),
    },
  ]

  const statusColors = {
    success: "border-success/30 bg-success/5 text-success",
    warning: "border-warning/30 bg-warning/5 text-warning",
    neutral: "border-border bg-muted/30 text-foreground",
  }

  const equipment = report.equipment || []
  const displayedEquipment = showAllEquipment ? equipment : equipment.slice(0, 24)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-3">
        {report.nmvtisVerified && (
          <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-3 py-1.5">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">NMVTIS Verified</span>
          </div>
        )}
        {report.blockchainVerified && (
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Blockchain Confirmed</span>
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={cn("rounded-lg border p-4 transition-colors hover:bg-muted/50", statusColors[stat.status])}
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Vehicle Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-lg border border-border bg-muted/30 p-3">
                <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                <dd className="mt-1 font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {equipment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {displayedEquipment.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {equipment.length > 24 && (
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAllEquipment(!showAllEquipment)}>
                {showAllEquipment ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" /> Show All {equipment.length} Items
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Mileage Analysis
            <Badge variant="outline" className="text-xs font-normal">
              Source: NMVTIS
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Current Mileage</p>
              <p className="mt-1 text-3xl font-bold">{report.mileage.toLocaleString()} mi</p>
              <p className="mt-1 text-xs text-muted-foreground">
                As of today, the estimated mileage of this vehicle could be
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Average for {report.year} {report.make} {report.model}
              </p>
              <p className="mt-1 text-3xl font-bold text-muted-foreground">
                {report.mileageAnalysis?.averageMileageForYear.toLocaleString() || "N/A"} mi
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                As of today, the average mileage identical {report.year} {report.make} {report.model} could be
              </p>
            </div>
          </div>

          {/* Mileage comparison bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Mileage Comparison</span>
              <Badge
                variant={
                  report.mileageAnalysis?.status === "below_average"
                    ? "default"
                    : report.mileageAnalysis?.status === "above_average"
                      ? "destructive"
                      : "secondary"
                }
                className="flex items-center gap-1"
              >
                {report.mileageAnalysis?.status === "below_average" ? (
                  <>
                    <TrendingDown className="h-3 w-3" /> Below Average
                  </>
                ) : report.mileageAnalysis?.status === "above_average" ? (
                  <>
                    <TrendingUp className="h-3 w-3" /> Above Average
                  </>
                ) : (
                  <>
                    <Minus className="h-3 w-3" /> Average
                  </>
                )}
              </Badge>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full transition-all",
                  report.mileageAnalysis?.status === "below_average"
                    ? "bg-success"
                    : report.mileageAnalysis?.status === "above_average"
                      ? "bg-danger"
                      : "bg-primary",
                )}
                style={{
                  width: `${Math.min(
                    (report.mileage / (report.mileageAnalysis?.averageMileageForYear || report.mileage)) * 100,
                    100,
                  )}%`,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0 mi</span>
              <span>{((report.mileageAnalysis?.averageMileageForYear || 50000) * 1.5).toLocaleString()} mi</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
              <div className="h-10 w-10 rounded-full bg-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Exterior</p>
                <p className="font-medium">{report.exteriorColor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
              <div className="h-10 w-10 rounded-full bg-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Interior</p>
                <p className="font-medium">{report.interiorColor}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
