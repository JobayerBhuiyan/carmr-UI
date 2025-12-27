"use client"

import Link from "next/link"
import { Database, Lock, Eye } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold tracking-tight">CarMR</span>
            <p className="mt-2 text-sm text-muted-foreground">{t.footerTagline}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Database className="h-3.5 w-3.5" />
                <span>{t.multiSourceData}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.product}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.vinCheck}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.pricing}
                </Link>
              </li>
              <li>
                <Link href="/report/1HGBH41JXMN109186" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.sampleReport}
                </Link>
              </li>
              <li>
                <Link href="/info#faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.company}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/info#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/info#support" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/info#careers" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.careers}
                </Link>
              </li>
              <li>
                <Link href="/info#blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/info#status" className="text-sm text-muted-foreground hover:text-foreground">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t.legal}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/info#security" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/info#acceptable-use" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="/info#dpa" className="text-sm text-muted-foreground hover:text-foreground">
                  {t.dataProtection}
                </Link>
              </li>
              <li>
                <Link href="/info#cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/info#subprocessors" className="text-sm text-muted-foreground hover:text-foreground">
                  Subprocessors
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CarMR. {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>{t.encrypted}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              <span>{t.neverSellData}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
