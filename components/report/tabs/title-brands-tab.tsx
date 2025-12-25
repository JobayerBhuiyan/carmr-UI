"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Shield, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface TitleBrandsTabProps {
  report: VehicleReport
}

export function TitleBrandsTab({ report }: TitleBrandsTabProps) {
  const [showAllMajor, setShowAllMajor] = useState(false)
  const [showAllOther, setShowAllOther] = useState(false)
  const [showAllOdometer, setShowAllOdometer] = useState(false)

  const majorProblems = report.majorTitleBrandChecks.filter((c) => c.status === "problem").length
  const otherProblems = report.otherTitleBrandChecks.filter((c) => c.status === "problem").length
  const odometerProblems = report.odometerChecks.filter((c) => c.status === "problem").length

  const displayedMajorChecks = showAllMajor ? report.majorTitleBrandChecks : report.majorTitleBrandChecks.slice(0, 4)
  const displayedOtherChecks = showAllOther ? report.otherTitleBrandChecks : report.otherTitleBrandChecks.slice(0, 6)
  const displayedOdometerChecks = showAllOdometer ? report.odometerChecks : report.odometerChecks.slice(0, 4)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Title History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Title History
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Source: NMVTIS
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Current Title */}
          {report.titleHistory.filter((t) => t.isCurrent).length > 0 && (
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">Current Title Information</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-left font-medium">Title Issue Date</th>
                      <th className="pb-2 text-left font-medium">State</th>
                      <th className="pb-2 text-left font-medium">Mileage</th>
                      <th className="pb-2 text-left font-medium">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.titleHistory
                      .filter((t) => t.isCurrent)
                      .map((title, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3">
                            {new Date(title.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="py-3">
                            <Badge variant="secondary">{title.state}</Badge>
                          </td>
                          <td className="py-3">{title.mileage.toLocaleString()} mi</td>
                          <td className="py-3">{title.event}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Historical Title */}
          <div>
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">Historical Title Information</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium">Title Issue Date</th>
                    <th className="pb-2 text-left font-medium">State</th>
                    <th className="pb-2 text-left font-medium">Mileage</th>
                    <th className="pb-2 text-left font-medium">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {report.titleHistory
                    .filter((t) => !t.isCurrent)
                    .map((title, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3">
                          {new Date(title.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3">
                          <Badge variant="outline">{title.state}</Badge>
                        </td>
                        <td className="py-3">{title.mileage > 0 ? `${title.mileage.toLocaleString()} mi` : "-"}</td>
                        <td className="py-3">{title.event}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Major Title Brand Checks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Major Title Brand Check
            </CardTitle>
            <Badge variant={majorProblems > 0 ? "destructive" : "secondary"}>
              {report.majorTitleBrandChecks.length} points checked / {majorProblems}{" "}
              {majorProblems === 1 ? "problem" : "problems"} reported
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayedMajorChecks.map((check, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start justify-between rounded-lg border p-3",
                  check.status === "problem" ? "border-danger/30 bg-danger/5" : "border-border bg-muted/30",
                )}
              >
                <div className="flex items-start gap-3">
                  {check.status === "clear" ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 text-danger" />
                  )}
                  <div>
                    <p className="font-medium">{check.brand}</p>
                    {check.status === "problem" && check.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{check.description}</p>
                    )}
                    {check.date && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Date: {new Date(check.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant={check.status === "clear" ? "secondary" : "destructive"} className="shrink-0">
                  {check.status === "clear" ? "No problems found" : "Problem Reported"}
                </Badge>
              </div>
            ))}
          </div>
          {report.majorTitleBrandChecks.length > 4 && (
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAllMajor(!showAllMajor)}>
              {showAllMajor ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> Hide All
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> Show All {report.majorTitleBrandChecks.length} Checks
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Odometer Check */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Odometer Check
            </CardTitle>
            <Badge variant={odometerProblems > 0 ? "destructive" : "secondary"}>
              {report.odometerChecks.length} points checked / {odometerProblems}{" "}
              {odometerProblems === 1 ? "problem" : "problems"} reported
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayedOdometerChecks.map((check, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3",
                  check.status === "problem" ? "border-danger/30 bg-danger/5" : "border-border bg-muted/30",
                )}
              >
                <div className="flex items-center gap-3">
                  {check.status === "clear" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger" />
                  )}
                  <span className="font-medium">{check.check}</span>
                </div>
                <Badge variant={check.status === "clear" ? "secondary" : "destructive"}>
                  {check.status === "clear" ? "No problems found" : "Problem Reported"}
                </Badge>
              </div>
            ))}
          </div>
          {report.odometerChecks.length > 4 && (
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAllOdometer(!showAllOdometer)}>
              {showAllOdometer ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> Hide All
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> Show All {report.odometerChecks.length} Checks
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Other Title Brand Checks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Other Title Brand Check</CardTitle>
            <Badge variant={otherProblems > 0 ? "destructive" : "secondary"}>
              {report.otherTitleBrandChecks.length} points checked / {otherProblems}{" "}
              {otherProblems === 1 ? "problem" : "problems"} reported
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {displayedOtherChecks.map((check, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3",
                  check.status === "problem" ? "border-danger/30 bg-danger/5" : "border-border bg-muted/30",
                )}
              >
                <div className="flex items-center gap-2">
                  {check.status === "clear" ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-danger" />
                  )}
                  <span className="text-sm">{check.brand}</span>
                </div>
              </div>
            ))}
          </div>
          {report.otherTitleBrandChecks.length > 6 && (
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAllOther(!showAllOther)}>
              {showAllOther ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> Hide All
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> Show All {report.otherTitleBrandChecks.length} Checks
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Junk/Salvage/Insurance Records */}
      {report.junkSalvageRecords.length > 0 && (
        <Card className="border-danger/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-danger">
                <AlertTriangle className="h-5 w-5" />
                Junk / Salvage / Insurance Records
              </CardTitle>
              <Badge variant="destructive">{report.junkSalvageRecords.length} records found</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {report.junkSalvageRecords.map((record, index) => (
                <div key={index} className="rounded-lg border border-danger/30 bg-danger/5 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{record.reportingEntity}</p>
                      <p className="text-sm text-muted-foreground">{record.location}</p>
                      {record.phone && <p className="text-sm text-muted-foreground">Phone: {record.phone}</p>}
                      {record.email && <p className="text-sm text-muted-foreground">Email: {record.email}</p>}
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{record.recordType}</Badge>
                    {record.disposition && <Badge variant="secondary">Disposition: {record.disposition}</Badge>}
                    <Badge variant="secondary">Export: {record.intendedForExport ? "Yes" : "No"}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              If this VIN has a record in the Junk/Salvage or Insurance information then the business that submitted the
              VIN to NMVTIS deemed the vehicle to be either a junk, salvage, or in the case of an insurer, a total loss.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stolen Vehicle Check */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              Stolen Vehicle Check
            </CardTitle>
            <Badge variant="secondary">{report.stolenVehicleCheck.databasesChecked}+ databases checked</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 rounded-lg border border-success/30 bg-success/5 p-4">
            <CheckCircle className="h-8 w-8 text-success" />
            <div>
              <p className="font-semibold text-success">No Theft Records Found</p>
              <p className="text-sm text-muted-foreground">
                This vehicle has been checked against {report.stolenVehicleCheck.databasesChecked}+ law enforcement
                databases
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
