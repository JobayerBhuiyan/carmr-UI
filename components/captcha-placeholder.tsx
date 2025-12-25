import { Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function CaptchaPlaceholder() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <Checkbox id="captcha" className="mt-1" />
        <div className="flex-1">
          <label htmlFor="captcha" className="text-sm font-medium cursor-pointer">
            I&apos;m not a robot
          </label>
          <p className="mt-1 text-xs text-muted-foreground">Please verify you&apos;re human to continue</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
            <Shield className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-[10px] text-muted-foreground">reCAPTCHA</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          <RefreshCw className="mr-1 h-3 w-3" />
          Refresh
        </Button>
      </div>
    </div>
  )
}
