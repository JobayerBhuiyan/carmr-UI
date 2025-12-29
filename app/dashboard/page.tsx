"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth/context"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2, FileText, CreditCard, Calendar, Download } from "lucide-react"

type Report = {
  id: string
  vin: string
  license_plate: string | null
  license_state: string | null
  status: string
  created_at: string
  report_data: {
    vehicle?: {
      year?: number
      make?: string
      model?: string
      trim?: string
    }
  }
}

type Entitlement = {
  id: string
  type: string
  credits_remaining: number | null
  expires_at: string | null
  plan_name: string
  is_active: boolean
  created_at: string
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [entitlements, setEntitlements] = useState<Entitlement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const supabase = createBrowserClient()

      const [reportsResult, entitlementsResult] = await Promise.all([
        supabase
          .from("reports")
          .select("*")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("entitlements")
          .select("*")
          .eq("user_id", user?.id)
          .eq("is_active", true)
          .order("created_at", { ascending: false }),
      ])

      if (reportsResult.data) {
        setReports(reportsResult.data)
      }

      if (entitlementsResult.data) {
        setEntitlements(entitlementsResult.data)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getEntitlementDisplay = (ent: Entitlement) => {
    if (ent.type === "credits") {
      return `${ent.credits_remaining} credits remaining`
    }
    if (ent.type === "pass" || ent.type === "subscription") {
      if (ent.expires_at) {
        const expiresDate = new Date(ent.expires_at)
        const now = new Date()
        const daysRemaining = Math.ceil((expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return `${daysRemaining} days remaining`
      }
    }
    return "Active"
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-muted-foreground">
                {reports.filter((r) => r.status === "completed").length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entitlements.length}</div>
              <p className="text-xs text-muted-foreground">
                {entitlements.reduce((acc, e) => acc + (e.credits_remaining || 0), 0)} credits total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(user.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
            </CardContent>
          </Card>
        </div>

        {entitlements.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Active Entitlements</CardTitle>
              <CardDescription>Your current plans and credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entitlements.map((ent) => (
                  <div key={ent.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium capitalize">{ent.plan_name?.replace(/-/g, " ")}</p>
                      <p className="text-sm text-muted-foreground">{getEntitlementDisplay(ent)}</p>
                    </div>
                    <Badge className="capitalize">{ent.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your vehicle history report lookups</CardDescription>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No reports yet</p>
                <Button asChild>
                  <Link href="/">Check a VIN</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{report.vin}</p>
                        {getStatusBadge(report.status)}
                      </div>
                      {report.report_data?.vehicle && (
                        <p className="text-sm text-muted-foreground">
                          {report.report_data.vehicle.year} {report.report_data.vehicle.make}{" "}
                          {report.report_data.vehicle.model}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {report.status === "completed" && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/report/${report.id}`}>
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/pricing">Purchase More Credits</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
