"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { DemoState } from "@/lib/mock-data"

interface DemoStateContextType {
  demoState: DemoState
  setDemoState: (state: DemoState) => void
}

const DemoStateContext = createContext<DemoStateContextType | undefined>(undefined)

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const [demoState, setDemoState] = useState<DemoState>("normal")

  return <DemoStateContext.Provider value={{ demoState, setDemoState }}>{children}</DemoStateContext.Provider>
}

export function useDemoState() {
  const context = useContext(DemoStateContext)
  if (!context) {
    throw new Error("useDemoState must be used within a DemoStateProvider")
  }
  return context
}
