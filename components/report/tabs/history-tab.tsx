"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Wrench,
  FileCheck,
  ClipboardList,
  ShoppingCart,
  AlertTriangle,
  Bell,
  Gauge,
  Tag,
  Gavel,
  Trash2,
  ChevronDown,
  ChevronUp,
  Flag,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface HistoryTabProps {
  report: VehicleReport
}

const eventIcons = {
  Service: Wrench,
  Inspection: FileCheck,
  Registration: ClipboardList,
  Sale: ShoppingCart,
  Accident: AlertTriangle,
  Recall: Bell,
  Odometer: Gauge,
  TitleBrand: Tag,
  Auction: Gavel,
  JunkSalvage: Trash2,
}

const eventColors = {
  Service: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  Inspection: "text-green-500 border-green-500/30 bg-green-500/10",
  Registration: "text-gray-500 border-gray-500/30 bg-gray-500/10",
  Sale: "text-purple-500 border-purple-500/30 bg-purple-500/10",
  Accident: "text-red-500 border-red-500/30 bg-red-500/10",
  Recall: "text-orange-500 border-orange-500/30 bg-orange-500/10",
  Odometer: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10",
  TitleBrand: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  Auction: "text-indigo-500 border-indigo-500/30 bg-indigo-500/10",
  JunkSalvage: "text-rose-500 border-rose-500/30 bg-rose-500/10",
}

const sourceColors = {
  NMVTIS: "bg-primary/10 text-primary border-primary/30",
  "State Records": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "Service Provider": "bg-green-500/10 text-green-500 border-green-500/30",
  Insurance: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  Auction: "bg-purple-500/10 text-purple-500 border-purple-500/30",
}

export function HistoryTab({ report }: HistoryTabProps) {
  const [showAll, setShowAll] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const sortedEvents = [...report.historyEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const displayedEvents = showAll ? sortedEvents : sortedEvents.slice(0, 10)

  const odometerData = report.odometerReadings || []
  const maxMileage = Math.max(...odometerData.map((d) => d.mileage), 1)
  const chartMax = Math.ceil(maxMileage * 1.1)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {report.historyEvents.length} records found
          </Badge>
        </div>
        <Badge variant="outline" className="text-xs">
          Data confirmed via NMVTIS and verified sources
        </Badge>
      </div>

      {odometerData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Odometer History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-red-500">{maxMileage.toLocaleString()}</span>
                <div className="h-px flex-1 border-t-2 border-dashed border-red-400" />
              </div>

              <div className="relative h-64 w-full">
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground pr-2">
                  <span>{chartMax.toLocaleString()}</span>
                  <span>{Math.round(chartMax * 0.75).toLocaleString()}</span>
                  <span>{Math.round(chartMax * 0.5).toLocaleString()}</span>
                  <span>{Math.round(chartMax * 0.25).toLocaleString()}</span>
                  <span>0</span>
                </div>

                <div className="ml-16 h-full border-l border-b border-border/50 relative">
                  <div className="absolute inset-0">
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                      <div
                        key={ratio}
                        className="absolute left-0 right-0 border-t border-dashed border-border/30"
                        style={{ top: `${ratio * 100}%` }}
                      />
                    ))}
                  </div>

                  <svg className="absolute inset-0 h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(225, 73%, 57%)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(225, 73%, 57%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d={`M ${odometerData
                        .map((d, i) => {
                          const x = odometerData.length === 1 ? 50 : (i / (odometerData.length - 1)) * 100
                          const y = 100 - (d.mileage / chartMax) * 100
                          return `${x} ${y}`
                        })
                        .join(" L ")} L 100 100 L 0 100 Z`}
                      fill="url(#lineGradient)"
                    />

                    <polyline
                      fill="none"
                      stroke="hsl(225, 73%, 57%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={odometerData
                        .map((d, i) => {
                          const x = odometerData.length === 1 ? 50 : (i / (odometerData.length - 1)) * 100
                          const y = 100 - (d.mileage / chartMax) * 100
                          return `${x},${y}`
                        })
                        .join(" ")}
                    />

                    {odometerData.map((d, i) => {
                      const x = odometerData.length === 1 ? 50 : (i / (odometerData.length - 1)) * 100
                      const y = 100 - (d.mileage / chartMax) * 100
                      const isHovered = hoveredPoint === i

                      return (
                        <g key={i}>
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r={isHovered ? "8" : "6"}
                            fill="hsl(var(--background))"
                            stroke="hsl(225, 73%, 57%)"
                            strokeWidth="2"
                            className="cursor-pointer transition-all duration-200"
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="3"
                            fill="hsl(225, 73%, 57%)"
                            className="pointer-events-none"
                          />
                          <text
                            x={`${x}%`}
                            y={`${y - 8}%`}
                            textAnchor="middle"
                            className={cn(
                              "fill-current text-[10px] font-medium transition-opacity duration-200",
                              isHovered ? "opacity-100" : "opacity-70",
                            )}
                            style={{ fill: "hsl(225, 73%, 57%)" }}
                          >
                            {d.mileage.toLocaleString()} mi
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              <div className="ml-16 mt-2 flex justify-between text-xs text-muted-foreground">
                {odometerData.map((d, i) => {
                  const showLabel =
                    odometerData.length <= 6 ||
                    i === 0 ||
                    i === odometerData.length - 1 ||
                    i === Math.floor(odometerData.length / 2)

                  if (!showLabel && odometerData.length > 6) return null

                  return (
                    <span
                      key={i}
                      className="text-center"
                      style={{
                        position: odometerData.length > 6 ? "absolute" : "relative",
                        left:
                          odometerData.length > 6
                            ? `calc(${(i / (odometerData.length - 1)) * 100}% + 4rem)`
                            : undefined,
                        transform: odometerData.length > 6 ? "translateX(-50%)" : undefined,
                      }}
                    >
                      {new Date(d.date).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 max-h-64 overflow-y-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Mileage</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {odometerData.map((reading, index) => (
                    <tr
                      key={index}
                      className={cn(
                        "border-t border-border/50 transition-colors",
                        hoveredPoint === index && "bg-primary/5",
                      )}
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <td className="px-4 py-3">
                        {new Date(reading.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 font-semibold">{reading.mileage.toLocaleString()} mi</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={reading.status === "verified" ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            reading.status === "verified" && "bg-primary text-primary-foreground",
                          )}
                        >
                          {reading.status === "verified" ? "Verified" : "Unverified"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Vehicle History Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Mileage</th>
                  <th className="pb-3 pr-4">Source</th>
                  <th className="pb-3">Event Details</th>
                </tr>
              </thead>
              <tbody>
                {displayedEvents.map((event, index) => {
                  const Icon = eventIcons[event.type] || Flag
                  const colorClass = eventColors[event.type] || "text-gray-500"

                  return (
                    <tr
                      key={index}
                      className={cn(
                        "border-b border-border/50 transition-colors hover:bg-muted/30",
                        event.type === "Accident" || event.type === "TitleBrand" || event.type === "JunkSalvage"
                          ? "bg-danger/5"
                          : "",
                      )}
                    >
                      <td className="py-4 pr-4 align-top">
                        <div className="flex items-center gap-2">
                          <Flag className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 align-top">
                        {event.mileage ? (
                          <span className="font-medium">{event.mileage.toLocaleString()} mi</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-4 pr-4 align-top">
                        <Badge
                          variant="outline"
                          className={cn("text-xs", sourceColors[event.source as keyof typeof sourceColors])}
                        >
                          {event.source}
                        </Badge>
                      </td>
                      <td className="py-4 align-top">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                              colorClass,
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {event.type}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm">{event.description}</p>
                            {event.location && <p className="mt-1 text-xs text-muted-foreground">{event.location}</p>}
                            {event.details && (
                              <p className="mt-2 rounded bg-muted/50 p-2 text-xs text-muted-foreground">
                                {event.details}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {sortedEvents.length > 10 && (
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAll(!showAll)}>
              {showAll ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> Hide Events
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> Show All {sortedEvents.length} Events
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
