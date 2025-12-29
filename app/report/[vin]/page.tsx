import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportHeaderCard } from "@/components/report/report-header-card"
import { ReportTabs } from "@/components/report/report-tabs"
import { ReportSidebar } from "@/components/report/report-sidebar"
import { StickyActionBar } from "@/components/report/sticky-action-bar"
import { ReportWatermark } from "@/components/report/report-watermark"
import { DemoStateProvider } from "@/components/demo-state-provider"
import { DemoStateToggle } from "@/components/demo-state-toggle"
import { mockReport, mockCautionReport, mockHighRiskReport, type VehicleReport } from "@/lib/mock-data"
import type { Database } from "@/lib/supabase/types"

export const metadata = {
  title: "Vehicle Report - CarMR",
  description: "Comprehensive vehicle history report with AI-powered summary.",
}

function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

function getReportForVin(vin: string): VehicleReport {
  if (vin === "2T1BURHE5JC073215") return mockCautionReport
  if (vin === "3FA6P0H77KR245892") return mockHighRiskReport
  return { ...mockReport, vin }
}

async function getReportFromDatabase(reportId: string): Promise<VehicleReport | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", reportId)
    .eq("status", "completed")
    .maybeSingle()

  if (error || !report || !report.report_data) {
    return null
  }

  return report.report_data as unknown as VehicleReport
}

export default async function ReportPage({ params }: { params: Promise<{ vin: string }> }) {
  const { vin: identifier } = await params

  let report: VehicleReport

  if (isUUID(identifier)) {
    const dbReport = await getReportFromDatabase(identifier)
    if (!dbReport) {
      notFound()
    }
    report = dbReport
  } else {
    report = getReportForVin(identifier)
  }

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

              <div className="hidden min-w-0 lg:block">
                <ReportSidebar report={report} />
              </div>
            </div>
          </div>

          <StickyActionBar report={report} className="lg:hidden" />
        </main>
        <Footer />

        <DemoStateToggle />
      </div>
    </DemoStateProvider>
  )
}
