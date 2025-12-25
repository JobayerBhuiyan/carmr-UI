import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingColumns } from "@/components/pricing/pricing-columns"
import { PricingComparison } from "@/components/pricing/pricing-comparison"
import { TrustBadge } from "@/components/trust-badge"

export const metadata = {
  title: "Pricing - CarMR",
  description: "Simple, transparent pricing for vehicle history reports. Pay per report or get unlimited access.",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plans and Pricing</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that works for you. All plans include full vehicle history reports with AI-powered
                summaries.
              </p>
            </div>

            <PricingColumns className="mt-12" />

            <div className="mt-8 mx-auto max-w-3xl space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">*3 Days Trial for Unlimited Vehicle History.</span> In
                the trial membership, you can check up to five reports per day. Cancel anytime online through your
                account. After your 3-day trial, you will be billed $39.99 plus applicable sales tax per month.
              </p>
              <p>
                <span className="font-semibold text-foreground">*Money-Back Guarantee</span> in accordance with our{" "}
                <a href="/refund-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  refund policy
                </a>
                .
              </p>
            </div>

            <div className="mt-12 flex justify-center">
              <TrustBadge />
            </div>
          </div>
        </section>

        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Compare Plans</h2>
            <PricingComparison className="mt-8" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
