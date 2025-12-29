"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth/context"
import { useI18n } from "@/lib/i18n/context"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()
  const { t } = useI18n()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await signUp(emailOrPhone, password, name)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "Sign up failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-8">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span>Get Started</span>
        </nav>
      </div>

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/images/carMR-logo-cropped.png"
                alt="CarMR"
                width={180}
                height={28}
                className="mx-auto h-10 w-auto"
              />
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">{t.createAccount || "Create an account"}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t.signUpSubtitle || "Get started with CarMR today"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name || "Full name"}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailOrPhone">Email or phone number</Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="you@example.com or +1 (555) 123-4567"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password || "Password"}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  {t.passwordRequirement || "Must be at least 6 characters"}
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.creatingAccount || "Creating account..."}
                </>
              ) : (
                t.getStarted
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {t.haveAccount || "Already have an account?"}{" "}
              <Link href="/sign-in" className="font-medium text-primary hover:underline">
                {t.signIn}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
