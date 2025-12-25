"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { translations, languages, type Language, type TranslationKeys } from "./translations"

const LOCALE_COOKIE = "NEXT_LOCALE"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return
  const date = new Date()
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en"

  // First check cookie
  const cookieLang = getCookie(LOCALE_COOKIE)
  if (cookieLang && languages.some((l) => l.code === cookieLang)) {
    return cookieLang as Language
  }

  // Then check browser preference
  const browserLang = navigator.language.split("-")[0]
  if (languages.some((l) => l.code === browserLang)) {
    return browserLang as Language
  }

  return "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialLang = getInitialLanguage()
    setLanguageState(initialLang)
    // Set document direction
    document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = initialLang
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    setCookie(LOCALE_COOKIE, lang)
    // Update document direction for RTL languages
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }, [])

  const t = translations[language]
  const isRTL = language === "ar"

  return <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export { languages }
export type { Language }
