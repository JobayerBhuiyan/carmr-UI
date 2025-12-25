"use client"

import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Copy, Check, Eye, EyeOff, Users, Gauge, FileText, ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface ReportHeaderCardProps {
  report: VehicleReport
}

export function ReportHeaderCard({ report }: ReportHeaderCardProps) {
  const [showFullVin, setShowFullVin] = useState(false)
  const [copied, setCopied] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const handleCopyVin = () => {
    navigator.clipboard.writeText(report.vin)
    setCopied(true)
    toast.success("VIN copied", {
      description: "Clears in 60 seconds.",
    })
    setTimeout(() => setCopied(false), 60000)
  }

  const statusConfig = {
    GOOD_BUY: {
      label: "GOOD BUY",
      className: "bg-success text-success-foreground",
    },
    CAUTION: {
      label: "CAUTION",
      className: "bg-warning text-warning-foreground",
    },
    HIGH_RISK: {
      label: "HIGH RISK",
      className: "bg-danger text-danger-foreground",
    },
  }

  const status = statusConfig[report.overallStatus]

  const photos = report.vehiclePhotos || []
  const hasPhotos = photos.length > 0

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col sm:flex-row">
          {/* Vehicle Image with gallery preview */}
          <div
            className="group relative aspect-video w-full cursor-pointer bg-muted sm:aspect-[4/3] sm:w-64 lg:w-80"
            onClick={() => hasPhotos && setGalleryOpen(true)}
          >
            <Image
              src={report.imageUrl || "/placeholder.svg?height=300&width=400&query=car sedan"}
              alt={`${report.year} ${report.make} ${report.model}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {hasPhotos && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                <ImageIcon className="h-3 w-3" />
                <span>{photos.length} photos</span>
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="flex flex-1 flex-col p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold">
                  {report.year} {report.make} {report.model}
                </h1>
                <p className="text-muted-foreground">{report.trim}</p>
              </div>
              <Badge className={cn("shrink-0 text-sm", status.className)}>{status.label}</Badge>
            </div>

            {/* VIN Display */}
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                VIN: {showFullVin ? report.vin : report.maskedVin}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowFullVin(!showFullVin)}
                aria-label={showFullVin ? "Hide VIN" : "Show VIN"}
              >
                {showFullVin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopyVin} aria-label="Copy VIN">
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-auto grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{report.mileage.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Miles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{report.owners}</p>
                  <p className="text-xs text-muted-foreground">Owners</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{report.titleStatus}</p>
                  <p className="text-xs text-muted-foreground">Title</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl border-none bg-black/95 p-0">
          <DialogTitle className="sr-only">Vehicle Photo Gallery</DialogTitle>
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
              onClick={() => setGalleryOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Main image */}
            <div className="relative aspect-video w-full">
              {photos[currentPhotoIndex] && (
                <Image
                  src={photos[currentPhotoIndex].url || "/placeholder.svg"}
                  alt={photos[currentPhotoIndex].caption}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Caption and counter */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-center text-white">{photos[currentPhotoIndex]?.caption}</p>
              <p className="mt-1 text-center text-sm text-white/70">
                {currentPhotoIndex + 1} / {photos.length}
              </p>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto p-4">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded border-2 transition-all",
                    currentPhotoIndex === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={photo.url || "/placeholder.svg"} alt={photo.caption} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
