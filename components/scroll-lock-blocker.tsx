"use client"

import { useEffect } from "react"

/**
 * This component uses a MutationObserver to forcefully prevent Radix UI's
 * react-remove-scroll from locking body scroll and adding padding-right.
 * This prevents horizontal page shift when opening Select/Dialog components.
 */
export function ScrollLockBlocker() {
  useEffect(() => {
    const body = document.body

    const fix = () => {
      // Remove overflow: hidden
      if (body.style.overflow === "hidden") {
        body.style.overflow = ""
      }
      // Remove padding-right
      if (body.style.paddingRight) {
        body.style.paddingRight = ""
      }
      // Remove margin-right
      if (body.style.marginRight) {
        body.style.marginRight = ""
      }
      // Remove data-scroll-locked attribute
      if (body.hasAttribute("data-scroll-locked")) {
        body.removeAttribute("data-scroll-locked")
      }
    }

    // Run fix immediately in case styles are already applied
    fix()

    // Watch for changes to body attributes and style
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "style" || mutation.attributeName === "data-scroll-locked") {
          fix()
        }
      }
    })

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["style", "data-scroll-locked"],
    })

    return () => observer.disconnect()
  }, [])

  return null
}
