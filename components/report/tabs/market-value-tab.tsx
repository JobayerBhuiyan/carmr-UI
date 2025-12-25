"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, DollarSign, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface MarketValueTabProps {
  report: VehicleReport
}

export function MarketValueTab({ report }: MarketValueTabProps) {
  const { marketValue } = report
  const [priceType, setPriceType] = useState<"classified" | "auction">("classified")

  const impactIcons = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: Minus,
  }

  const impactColors = {
    positive: "text-success",
    negative: "text-danger",
    neutral: "text-muted-foreground",
  }

  const currentPriceData = priceType === "classified" ? marketValue.classifiedPrice : marketValue.auctionPrice

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              Market Price Analysis
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <Shield className="h-3 w-3" />
                Blockchain Confirmed
              </Badge>
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Price is actual for:{" "}
            <span className="font-medium text-foreground">United States (determined automatically)</span>
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={priceType} onValueChange={(v) => setPriceType(v as "classified" | "auction")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classified">Classified Sites Price</TabsTrigger>
              <TabsTrigger value="auction">Auction Sites Price</TabsTrigger>
            </TabsList>

            <TabsContent value="classified" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-center">
                  <p className="text-2xl font-bold text-success">
                    ${marketValue.classifiedPrice?.belowMarket?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Below market</p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    ${marketValue.classifiedPrice?.average?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Average dealer forecourt price</p>
                </div>
                <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-center">
                  <p className="text-2xl font-bold text-danger">
                    ${marketValue.classifiedPrice?.aboveMarket?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Above market</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auction" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-center">
                  <p className="text-2xl font-bold text-success">
                    ${marketValue.auctionPrice?.belowMarket?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Below market</p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    ${marketValue.auctionPrice?.average?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Average auction forecourt price</p>
                </div>
                <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-center">
                  <p className="text-2xl font-bold text-danger">
                    ${marketValue.auctionPrice?.aboveMarket?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Above market</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <p className="mt-4 text-xs text-muted-foreground">
            Market price analysis is based on a vehicle's history such as vehicle class and age, number of owners,
            accident and damage history, title brands, odometer readings, etc. This information is used to compare the
            vehicle's favorability against the entire market of vehicles.
          </p>
        </CardContent>
      </Card>

      {(marketValue.priceByYear?.length > 0 || marketValue.priceByMileage?.length > 0) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {marketValue.priceByYear && marketValue.priceByYear.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Price/Year Dependence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  {/* Simple bar chart */}
                  <div className="flex h-full items-end justify-around gap-2">
                    {marketValue.priceByYear.map((item, index) => {
                      const maxPrice = Math.max(...marketValue.priceByYear!.map((p) => p.price))
                      const height = (item.price / maxPrice) * 100
                      const isCurrentYear = item.year === report.year

                      return (
                        <div key={index} className="flex flex-1 flex-col items-center gap-1">
                          <span className="text-xs font-medium">${(item.price / 1000).toFixed(0)}k</span>
                          <div
                            className={cn(
                              "w-full rounded-t transition-all",
                              isCurrentYear ? "bg-primary" : "bg-muted-foreground/30",
                            )}
                            style={{ height: `${height}%` }}
                          />
                          <span
                            className={cn(
                              "text-xs",
                              isCurrentYear ? "font-bold text-primary" : "text-muted-foreground",
                            )}
                          >
                            {item.year}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {marketValue.priceByMileage && marketValue.priceByMileage.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Price/Mileage Dependence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  {/* Simple line chart */}
                  <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      points={marketValue.priceByMileage
                        .map((d, i) => {
                          const x = (i / (marketValue.priceByMileage!.length - 1)) * 100
                          const maxPrice = Math.max(...marketValue.priceByMileage!.map((p) => p.price))
                          const minPrice = Math.min(...marketValue.priceByMileage!.map((p) => p.price))
                          const y = 100 - ((d.price - minPrice) / (maxPrice - minPrice)) * 80 - 10
                          return `${x},${y}`
                        })
                        .join(" ")}
                    />
                    {marketValue.priceByMileage.map((d, i) => {
                      const x = (i / (marketValue.priceByMileage!.length - 1)) * 100
                      const maxPrice = Math.max(...marketValue.priceByMileage!.map((p) => p.price))
                      const minPrice = Math.min(...marketValue.priceByMileage!.map((p) => p.price))
                      const y = 100 - ((d.price - minPrice) / (maxPrice - minPrice)) * 80 - 10
                      return <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--primary))" />
                    })}
                  </svg>
                  {/* Labels */}
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    {marketValue.priceByMileage.map((d, i) => (
                      <span key={i}>{(d.mileage / 1000).toFixed(0)}k mi</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Estimated Market Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-5xl font-bold">{marketValue.estimated.toLocaleString()}</span>
            </div>
            <p className="mt-2 text-muted-foreground">
              Range: ${marketValue.range.low.toLocaleString()} - ${marketValue.range.high.toLocaleString()}
            </p>
            <Badge className="mt-3" variant="outline">
              {marketValue.condition} Condition
            </Badge>
          </div>

          {/* Visual range indicator */}
          <div className="mt-8">
            <div className="relative h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-success via-primary to-danger"
                style={{
                  width: "100%",
                }}
              />
              {/* Estimated value marker */}
              <div
                className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded bg-foreground"
                style={{
                  left: `${((marketValue.estimated - marketValue.range.low) / (marketValue.range.high - marketValue.range.low)) * 100}%`,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span className="text-success">${marketValue.range.low.toLocaleString()}</span>
              <span className="font-medium text-foreground">${marketValue.estimated.toLocaleString()}</span>
              <span className="text-danger">${marketValue.range.high.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Value Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketValue.factors.map((factor, index) => {
              const Icon = impactIcons[factor.impact]
              return (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <div className={cn("mt-0.5", impactColors[factor.impact])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{factor.factor}</p>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
