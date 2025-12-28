import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportHeaderCard } from "@/components/report/report-header-card"
import { ReportTabs } from "@/components/report/report-tabs"
import { ReportSidebar } from "@/components/report/report-sidebar"
import { StickyActionBar } from "@/components/report/sticky-action-bar"
import { ReportWatermark } from "@/components/report/report-watermark"
import { DemoStateProvider } from "@/components/demo-state-provider"
import { DemoStateToggle } from "@/components/demo-state-toggle"
import { mockReport, mockCautionReport, mockHighRiskReport } from "@/lib/mock-data"

export const metadata = {
  title: "Vehicle Report - CarMR",
  description: "Comprehensive vehicle history report with AI-powered summary.",
}

// Map sample VINs to different report types for demo
function getReportForVin(vin: string) {
  if (vin === "2T1BURHE5JC073215") return mockCautionReport
  if (vin === "3FA6P0H77KR245892") return mockHighRiskReport
  return mockReport
}

export default async function ReportPage({ params }: { params: Promise<{ vin: string }> }) {
  const { vin } = await params
  const report = getReportForVin(vin)

  return (
    <DemoStateProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 pb-20 lg:pb-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 overflow-hidden">
            <ReportWatermark report={report} />

            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="min-w-0 space-y-6">
                <ReportHeaderCard report={report} />
                <ReportTabs report={report} />
              </div>

              {/* Sidebar - 40% on desktop */}
              <div className="hidden min-w-0 lg:block">
                <ReportSidebar report={report} />
              </div>
            </div>
          </div>

          {/* Mobile sticky action bar */}
          <StickyActionBar report={report} className="lg:hidden" />
        </main>
        <Footer />

        {/* Demo state toggle */}
        <DemoStateToggle />
      </div>
    </DemoStateProvider>
  )
}
