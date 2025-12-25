import { FileText, CheckCircle, XCircle, Mail, Clock, CreditCard, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export const metadata = {
  title: "Refund Policy | CarMR",
  description:
    "CarMR refund policy - learn about our 14-day refund window, eligibility criteria, and how to request a refund.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span>Refund Policy</span>
        </nav>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">Refund Policy</h1>

        <p className="mb-8 text-muted-foreground">
          Thank you for choosing CarMR! Please note that the reliance on any vehicle history report when purchasing a
          vehicle is at your own risk. We cannot be held liable for any purchases you make in reliance on our reports.
        </p>

        {/* Section 1: Conditions for a Refund */}
        <section id="conditions" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">1. Conditions for a Refund</h2>
          </div>
          <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
            <li>
              The request for a refund is made within <strong className="text-foreground">14 days</strong> following the
              transaction date.
            </li>
            <li>The reason for the refund is considered valid according to our policy.</li>
          </ol>
        </section>

        {/* Section 2: Valid Reasons */}
        <section id="valid-reasons" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">2. Valid Reasons for a Refund</h2>
          </div>
          <ul className="ml-6 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
              Receiving an empty or failed report
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
              Being charged twice for the identical report (duplicate charge)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
              Technical issue preventing report delivery
            </li>
          </ul>
        </section>

        {/* Section 3: Invalid Reasons */}
        <section id="invalid-reasons" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold">3. Invalid Reasons for a Refund</h2>
          </div>
          <ul className="ml-6 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
              Inaccuracies in a report (report data is sourced from third-party databases and is provided "as is")
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
              Incomplete report (the information available on a vehicle may vary)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
              Untimely report (report delivery or generation delays)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
              User changed their mind after purchase
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
              Failing to cancel the subscription before the renewal date
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            The monthly fee and subscription terms are clearly agreed upon before purchase and are detailed on the
            purchase page, as well as in our{" "}
            <Link href="/info#acceptable-use" className="text-primary hover:underline">
              Terms & Conditions
            </Link>
            . Not canceling before the next billing cycle does not qualify as a valid reason for a refund.
          </p>
        </section>

        {/* Section 4: Requesting a Refund */}
        <section id="requesting" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">4. Requesting a Refund</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            If you believe your refund reason is valid, please fill out the form below or email the following
            information to{" "}
            <a href="mailto:refunds@carmr.com" className="text-primary hover:underline">
              refunds@carmr.com
            </a>
            :
          </p>
          <ul className="ml-6 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Email Subject: Refund Request
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Your email address
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Order ID or Invoice ID
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Vehicle VIN (for which the report was generated)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Reason for the refund
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Your First and Last Name
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Date of purchase
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              Stripe Payment Intent ID (starts with pi_...)
            </li>
          </ul>
        </section>

        {/* Section 5: Additional Refund Terms */}
        <section id="additional-terms" className="mb-10 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">
              5. Additional Refund Terms (Trial Subscriptions & Automatic Charges)
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium text-foreground">Partial Refund (Cost of Full Report)</h3>
              <p className="text-muted-foreground">
                If you request a refund after the Subscription has been activated, we reserve the right to refund your
                payment minus the cost of a full vehicle report ("Full Report"). The Full Report is normally priced at
                $39.99, or the price stated on our website for a single report before any discounts and special offers.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="mb-2 font-medium text-foreground">Processing Time</h3>
                <p className="text-muted-foreground">
                  We will review your refund request within 10-15 business days (or earlier if possible) and respond in
                  accordance with these Terms.
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-foreground">Refund Payment Method</h3>
              <p className="text-muted-foreground">
                The refund will be issued using the original payment method whenever possible, unless technical reasons
                prevent us from doing so.
              </p>
            </div>
          </div>
        </section>

        {/* Final Notes */}
        <section id="final-notes" className="mb-12 scroll-mt-24">
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Final Notes</h2>
          </div>
          <ul className="ml-6 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
              <span>
                <strong className="text-foreground">Subscription Terms:</strong> All subscription terms, including
                automatic renewals and cancellation procedures, can be found in our{" "}
                <Link href="/info#acceptable-use" className="text-primary hover:underline">
                  Terms & Conditions
                </Link>
                .
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
              <span>
                <strong className="text-foreground">Liability Disclaimer:</strong> CarMR is not liable for any damages
                resulting from the use or non-use of information provided in its reports.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
              <span>
                <strong className="text-foreground">No Legal Advice:</strong> This Refund Policy does not constitute
                legal advice, and any disputes are subject to applicable law and jurisdiction.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            By purchasing or subscribing to CarMR services, you acknowledge that you have read, understood, and agreed
            to this Refund Policy.
          </p>
        </section>

        {/* Refund Request Form */}
        <section id="refund-form" className="scroll-mt-24">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-semibold">Submit Refund Request</h2>
            <form className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="orderId" className="text-sm font-medium">
                  Order / Invoice ID
                </label>
                <Input id="orderId" placeholder="Order ID or Invoice ID" />
              </div>
              <div className="space-y-2">
                <label htmlFor="vin" className="text-sm font-medium">
                  Vehicle VIN
                </label>
                <Input id="vin" placeholder="17-character VIN" />
              </div>
              <div className="space-y-2">
                <label htmlFor="paymentIntent" className="text-sm font-medium">
                  Stripe Payment Intent ID
                </label>
                <Input id="paymentIntent" placeholder="pi_..." />
              </div>
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason for Refund
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empty">Empty or failed report</SelectItem>
                    <SelectItem value="duplicate">Duplicate charge</SelectItem>
                    <SelectItem value="technical">Technical issue preventing delivery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="purchaseDate" className="text-sm font-medium">
                  Date of Purchase
                </label>
                <Input id="purchaseDate" type="date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input id="firstName" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input id="lastName" placeholder="Last name" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Additional Notes
                </label>
                <Textarea id="notes" placeholder="Any additional information..." rows={4} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Submit Refund Request
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
