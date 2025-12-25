"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Info, Users, History, AlertTriangle, Bell, FileText, DollarSign, ShoppingCart } from "lucide-react"
import { AISummaryTab } from "@/components/report/tabs/ai-summary-tab"
import { OverviewTab } from "@/components/report/tabs/overview-tab"
import { OwnershipTab } from "@/components/report/tabs/ownership-tab"
import { HistoryTab } from "@/components/report/tabs/history-tab"
import { AccidentsTab } from "@/components/report/tabs/accidents-tab"
import { RecallsTab } from "@/components/report/tabs/recalls-tab"
import { TitleTab } from "@/components/report/tabs/title-tab"
import { MarketValueTab } from "@/components/report/tabs/market-value-tab"
import { SalesTab } from "@/components/report/tabs/sales-tab"
import type { VehicleReport } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ReportTabsProps {
  report: VehicleReport
}

const mainTabs = [
  { id: "ai-summary", label: "AI Summary", icon: Sparkles },
  { id: "overview", label: "Overview", icon: Info },
  { id: "ownership", label: "Ownership", icon: Users },
  { id: "history", label: "History & Events", icon: History },
  { id: "accidents", label: "Accidents & Damage", icon: AlertTriangle },
  { id: "recalls", label: "Recalls & Safety", icon: Bell },
  { id: "title", label: "Title & Brands", icon: FileText },
  { id: "sales", label: "Sales History", icon: ShoppingCart },
]

const rightTab = { id: "market-value", label: "Market Value", icon: DollarSign }

export function ReportTabs({ report }: ReportTabsProps) {
  return (
    <Tabs defaultValue="ai-summary" className="min-w-0 w-full">
      <div className="sticky top-16 z-40 -mx-4 bg-muted/30 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-full overflow-x-auto">
          <TabsList className="flex h-auto w-max min-w-full justify-between gap-1 bg-transparent p-0 py-2">
            <div className="flex shrink-0 gap-1">
              {mainTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "shrink-0 gap-1.5 rounded-full border border-transparent px-4 py-2 text-sm",
                    "data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "hover:bg-muted",
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </div>
            <TabsTrigger
              value={rightTab.id}
              className={cn(
                "shrink-0 gap-1.5 rounded-full border border-transparent px-4 py-2 text-sm",
                "data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "hover:bg-muted",
              )}
            >
              <rightTab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{rightTab.label}</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <TabsContent value="ai-summary" className="m-0">
          <AISummaryTab report={report} />
        </TabsContent>
        <TabsContent value="overview" className="m-0">
          <OverviewTab report={report} />
        </TabsContent>
        <TabsContent value="ownership" className="m-0">
          <OwnershipTab report={report} />
        </TabsContent>
        <TabsContent value="history" className="m-0">
          <HistoryTab report={report} />
        </TabsContent>
        <TabsContent value="accidents" className="m-0">
          <AccidentsTab report={report} />
        </TabsContent>
        <TabsContent value="recalls" className="m-0">
          <RecallsTab report={report} />
        </TabsContent>
        <TabsContent value="title" className="m-0">
          <TitleTab report={report} />
        </TabsContent>
        <TabsContent value="sales" className="m-0">
          <SalesTab report={report} />
        </TabsContent>
        <TabsContent value="market-value" className="m-0">
          <MarketValueTab report={report} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
