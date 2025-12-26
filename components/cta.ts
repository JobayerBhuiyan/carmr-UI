// Shared CTA class for secondary buttons (Buy X Reports, Subscribe Monthly)
// Uses literal strings so Tailwind won't purge hover utilities
export const CTA_SECONDARY =
  "inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium text-white transition-colors duration-200 " +
  "bg-primary/90 dark:bg-primary/90 hover:bg-primary dark:hover:bg-primary hover:brightness-110 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:brightness-95 disabled:opacity-50"
