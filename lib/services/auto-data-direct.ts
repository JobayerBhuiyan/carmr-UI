import type { VehicleReport } from "@/lib/mock-data"

const AUTO_DATA_DIRECT_API_URL = process.env.AUTO_DATA_DIRECT_API_URL
const AUTO_DATA_DIRECT_API_KEY = process.env.AUTO_DATA_DIRECT_API_KEY

export type VinLookupResult = {
  success: boolean
  data?: VehicleReport
  error?: string
}

export type PlateLookupResult = {
  success: boolean
  vin?: string
  data?: VehicleReport
  error?: string
}

export async function lookupVin(vin: string): Promise<VinLookupResult> {
  if (!AUTO_DATA_DIRECT_API_URL || !AUTO_DATA_DIRECT_API_KEY) {
    console.warn("Auto Data Direct not configured, using mock data")
    return { success: false, error: "Vehicle data service not configured" }
  }

  try {
    const response = await fetch(`${AUTO_DATA_DIRECT_API_URL}/vin/${vin}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTO_DATA_DIRECT_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Auto Data Direct API error:", response.status, errorText)
      return {
        success: false,
        error: response.status === 404 ? "Vehicle not found" : "Failed to fetch vehicle data",
      }
    }

    const data = await response.json()
    return { success: true, data: transformApiResponse(data) }
  } catch (error) {
    console.error("Auto Data Direct API exception:", error)
    return { success: false, error: "Failed to connect to vehicle data service" }
  }
}

export async function lookupPlate(
  plate: string,
  state: string
): Promise<PlateLookupResult> {
  if (!AUTO_DATA_DIRECT_API_URL || !AUTO_DATA_DIRECT_API_KEY) {
    console.warn("Auto Data Direct not configured")
    return { success: false, error: "Vehicle data service not configured" }
  }

  try {
    const response = await fetch(`${AUTO_DATA_DIRECT_API_URL}/plate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTO_DATA_DIRECT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plate, state }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Auto Data Direct plate lookup error:", response.status, errorText)
      return {
        success: false,
        error: response.status === 404 ? "Vehicle not found" : "Failed to lookup plate",
      }
    }

    const data = await response.json()
    return {
      success: true,
      vin: data.vin,
      data: transformApiResponse(data),
    }
  } catch (error) {
    console.error("Auto Data Direct plate lookup exception:", error)
    return { success: false, error: "Failed to connect to vehicle data service" }
  }
}

function transformApiResponse(apiData: Record<string, unknown>): VehicleReport {
  return apiData as unknown as VehicleReport
}

export function isValidVin(vin: string): boolean {
  const cleanVin = vin.replace(/[^A-HJ-NPR-Z0-9]/gi, "").toUpperCase()
  if (cleanVin.length !== 17) return false
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)
}

export function cleanVin(vin: string): string {
  return vin.replace(/[^A-HJ-NPR-Z0-9]/gi, "").toUpperCase()
}

export function isValidPlate(plate: string): boolean {
  const cleanPlate = plate.replace(/[^A-Z0-9]/gi, "").toUpperCase()
  return cleanPlate.length >= 2 && cleanPlate.length <= 8
}

export function isValidState(state: string): boolean {
  const validStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
  ]
  return validStates.includes(state.toUpperCase())
}
