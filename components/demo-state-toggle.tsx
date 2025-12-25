"use client"

import { useDemoState } from "@/components/demo-state-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FlaskConical } from "lucide-react"
import type { DemoState } from "@/lib/mock-data"

const demoStates: { value: DemoState; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "out-of-reports", label: "Out of Reports" },
  { value: "rate-limited", label: "Rate Limited" },
  { value: "requires-captcha", label: "Requires Captcha" },
]

export function DemoStateToggle() {
  const { demoState, setDemoState } = useDemoState()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-lg">
      <Badge variant="outline" className="gap-1.5">
        <FlaskConical className="h-3 w-3" />
        Demo
      </Badge>
      <Select value={demoState} onValueChange={(v) => setDemoState(v as DemoState)}>
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {demoStates.map((state) => (
            <SelectItem key={state.value} value={state.value}>
              {state.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
