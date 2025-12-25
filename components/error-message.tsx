"use client"

import { AlertCircle, WifiOff, Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ErrorType = "generic" | "not-found" | "offline" | "rate-limited"

interface ErrorMessageProps {
  type?: ErrorType
  onRetry?: () => void
  className?: string
}

const errorConfig = {
  generic: {
    icon: AlertCircle,
    title: "Something went wrong",
    message: "We're having trouble checking that VIN. Try again.",
  },
  "not-found": {
    icon: Search,
    title: "VIN not found",
    message: "Double-check the VIN and try again.",
  },
  offline: {
    icon: WifiOff,
    title: "No internet connection",
    message: "Please check your connection and retry.",
  },
  "rate-limited": {
    icon: AlertCircle,
    title: "Too many requests",
    message: "Please wait a moment before trying again.",
  },
}

export function ErrorMessage({ type = "generic", onRetry, className }: ErrorMessageProps) {
  const config = errorConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <Icon className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{config.title}</h3>
      <p className="mt-2 text-muted-foreground">{config.message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
