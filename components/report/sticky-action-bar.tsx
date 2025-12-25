"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Download, MoreHorizontal, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { UpgradeModal } from "@/components/report/upgrade-modal"
import { useDemoState } from "@/components/demo-state-provider"
import type { VehicleReport } from "@/lib/mock-data"

interface StickyActionBarProps {
  report: VehicleReport
  className?: string
}

export function StickyActionBar({ report, className }: StickyActionBarProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const { demoState } = useDemoState()

  const isOutOfReports = demoState === "out-of-reports"
  const isRateLimited = demoState === "rate-limited"

  const handleShare = () => {
    toast.success("Share link copied!")
  }

  const handleDownload = () => {
    toast.success("Preparing PDF...")
  }

  const handleEmail = () => {
    toast.success(`Report sent to ${report.userEmail}`)
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className,
        )}
      >
        {/* Out of reports banner */}
        {isOutOfReports && (
          <div className="flex items-center justify-between gap-2 border-b border-danger/30 bg-danger/10 px-4 py-2">
            <div className="flex items-center gap-2 text-danger">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">No reports remaining</span>
            </div>
            <Button size="sm" variant="destructive" onClick={() => setUpgradeOpen(true)}>
              Upgrade
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <Button className="flex-1" onClick={handleShare} disabled={isRateLimited}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={isRateLimited}>
            <Download className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEmail} disabled={isRateLimited}>
                Email Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUpgradeOpen(true)}>Upgrade Plan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </>
  )
}
