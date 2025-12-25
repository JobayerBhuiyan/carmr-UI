"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Shield, ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VehicleReport } from "@/lib/mock-data"

interface SalesTabProps {
  report: VehicleReport
}

export function SalesTab({ report }: SalesTabProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const salesHistory = report.salesHistory || []

  const openGallery = (saleIndex: number, photoIndex = 0) => {
    setCurrentSaleIndex(saleIndex)
    setCurrentPhotoIndex(photoIndex)
    setGalleryOpen(true)
  }

  const currentPhotos = salesHistory[currentSaleIndex]?.photos || []

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % currentPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length)
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Badge variant="secondary" className="text-sm">
          {salesHistory.length} records found
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 text-xs">
          <Shield className="h-3 w-3" />
          Blockchain Confirmed
        </Badge>
      </div>

      <div className="space-y-6">
        {salesHistory.map((sale, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">
                    Was put on sale{" "}
                    {new Date(sale.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{sale.saleType}</Badge>
                    <span className="text-sm text-muted-foreground">{sale.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  {sale.price && <p className="text-2xl font-bold">${sale.price.toLocaleString()}</p>}
                  <p className="text-sm text-muted-foreground">{sale.mileage.toLocaleString()} mi</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Cost</dt>
                  <dd className="font-medium">{sale.price ? `$${sale.price.toLocaleString()}` : "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Odometer</dt>
                  <dd className="font-medium">{sale.mileage.toLocaleString()} mi</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Location</dt>
                  <dd className="font-medium">{sale.location}</dd>
                </div>
                {sale.condition && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Condition</dt>
                    <dd className="font-medium">{sale.condition}</dd>
                  </div>
                )}
              </dl>

              {/* Highlights */}
              {sale.highlights && sale.highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {sale.highlights.map((highlight, hIndex) => (
                    <Badge key={hIndex} variant="secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Photo gallery */}
              {sale.photos && sale.photos.length > 0 && (
                <div className="mt-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {sale.photos.slice(0, 4).map((photo, photoIndex) => (
                      <button
                        key={photoIndex}
                        onClick={() => openGallery(index, photoIndex)}
                        className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-border transition-all hover:border-primary"
                      >
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`Sale photo ${photoIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                        {photoIndex === 3 && sale.photos!.length > 4 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                            +{sale.photos!.length - 4} more
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => openGallery(index, 0)}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Show all {sale.photos.length} photos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {salesHistory.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No sales history records found</p>
          </CardContent>
        </Card>
      )}

      {/* Photo gallery dialog */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl border-none bg-black/95 p-0">
          <DialogTitle className="sr-only">Sale Photo Gallery</DialogTitle>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
              onClick={() => setGalleryOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative aspect-video w-full">
              {currentPhotos[currentPhotoIndex] && (
                <Image
                  src={currentPhotos[currentPhotoIndex] || "/placeholder.svg"}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {currentPhotos.length > 1 && (
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

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-center text-sm text-white/70">
                {currentPhotoIndex + 1} / {currentPhotos.length}
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto p-4">
              {currentPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded border-2 transition-all",
                    currentPhotoIndex === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
