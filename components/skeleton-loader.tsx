import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  variant?: "card" | "report" | "pricing" | "tabs"
  className?: string
}

export function SkeletonLoader({ variant = "card", className }: SkeletonLoaderProps) {
  if (variant === "report") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Header card skeleton */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex flex-col sm:flex-row">
            <Skeleton className="aspect-video w-full sm:aspect-[4/3] sm:w-64 lg:w-80" />
            <div className="flex flex-1 flex-col p-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-24" />
              <Skeleton className="mt-4 h-5 w-40" />
              <div className="mt-auto grid grid-cols-3 gap-4 pt-4">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            </div>
          </div>
        </div>
        {/* Tabs skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "pricing") {
    return (
      <div className={cn("grid gap-6 sm:grid-cols-3", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-2 h-6 w-32" />
            <Skeleton className="mt-4 h-10 w-24" />
            <div className="mt-6 space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4" />
              ))}
            </div>
            <Skeleton className="mt-6 h-10" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "tabs") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20 rounded-full" />
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-6 w-40" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default card skeleton
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-2 h-4 w-48" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-4" />
        ))}
      </div>
    </div>
  )
}
