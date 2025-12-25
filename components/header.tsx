"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10">
            <Image
              src="/images/carMR-logo-cropped.png"
              alt="CarMR"
              width={260}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.home}
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.pricing}
          </Link>
          <Link
            href="/report/1HGBH41JXMN109186"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.sampleReport}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t.toggleTheme}</span>
          </Button>

          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            {t.signIn}
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            {t.getStarted}
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.pricing}
            </Link>
            <Link
              href="/report/1HGBH41JXMN109186"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.sampleReport}
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">
                {t.signIn}
              </Button>
              <Button size="sm" className="flex-1">
                {t.getStarted}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
