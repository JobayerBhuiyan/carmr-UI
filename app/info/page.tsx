import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  Shield,
  FileText,
  Users,
  HelpCircle,
  Cookie,
  Scale,
  Server,
  FileCheck,
  Activity,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Information & Legal | CarMR",
  description: "FAQ, Support, Careers, and Legal information for CarMR vehicle history reports.",
}

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span>Information & Legal</span>
        </nav>

        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight">Information & Legal</h1>
        <p className="mb-16 text-center text-muted-foreground">
          Everything you need to know about CarMR, our policies, and how we can help you.
        </p>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <p className="mb-6 text-muted-foreground">
            Find answers to the most common questions about our vehicle history reports and services.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a VIN and where can I find it?</AccordionTrigger>
              <AccordionContent>
                A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle. You can
                find it on the driver's side dashboard (visible through the windshield), on the driver's side door jamb,
                on your vehicle registration, or on your insurance card.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate are your vehicle history reports?</AccordionTrigger>
              <AccordionContent>
                Our reports are compiled from multiple trusted sources including NMVTIS, NHTSA, insurance companies, and
                auction houses. While we strive for 100% accuracy, we recommend using our reports as one part of your
                vehicle research alongside a physical inspection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do reports expire?</AccordionTrigger>
              <AccordionContent>
                No, your purchased reports never expire. Once you buy a report, you can access it anytime from your
                account. However, we recommend getting a fresh report if significant time has passed, as new information
                may have been added to the vehicle's history.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay.
                All transactions are secured with bank-level encryption.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I get a refund?</AccordionTrigger>
              <AccordionContent>
                Yes, refund requests must be submitted within 14 days of the transaction date. Refunds are approved for
                valid reasons such as receiving an empty or failed report, duplicate charges, or technical issues
                preventing delivery. Please visit our{" "}
                <a href="/refund-policy" className="text-primary hover:underline">
                  Refund Policy
                </a>{" "}
                page for full details and to submit a request.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What is the AI Summary feature?</AccordionTrigger>
              <AccordionContent>
                Our AI Summary analyzes the entire vehicle history and provides a plain-English overview highlighting
                key concerns, positive factors, and an overall risk assessment. It helps you quickly understand the
                vehicle's history without reading through all the detailed data.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">How It Works</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Getting a vehicle history report is quick and easy. Our streamlined process ensures you have all the
            information you need in seconds.
          </p>
          <p className="mb-4 text-muted-foreground">
            Simply enter the vehicle's VIN or license plate number, and our system instantly searches through millions
            of records from trusted sources including NMVTIS, NHTSA, insurance databases, and auction records.
          </p>
          <p className="text-muted-foreground">
            Within seconds, you'll receive a comprehensive report with an AI-generated summary, ownership history,
            accident records, title information, recall status, and current market value estimates.
          </p>
        </section>

        {/* Blog Section */}
        <section id="blog" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Blog</h2>
          </div>
          <p className="mb-6 text-muted-foreground">
            Stay informed with our latest articles on vehicle buying tips, industry news, and expert advice.
          </p>
          <ul className="space-y-4">
            <li className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <h3 className="font-medium">10 Red Flags to Watch for When Buying a Used Car</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Learn how to spot potential problems before making a purchase.
              </p>
            </li>
            <li className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <h3 className="font-medium">Understanding Title Brands: Salvage, Rebuilt, and More</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A comprehensive guide to vehicle title statuses and what they mean for buyers.
              </p>
            </li>
            <li className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
              <h3 className="font-medium">How AI is Transforming Vehicle History Reports</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover how our AI summary feature helps you make smarter decisions.
              </p>
            </li>
          </ul>
        </section>

        {/* Careers Section */}
        <section id="careers" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Careers</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Join our team and help millions of car buyers make informed decisions. We're always looking for talented
            individuals who are passionate about automotive data technology and vehicle marketplace.
          </p>
          <p className="mb-4 text-muted-foreground">
            We offer competitive salaries, remote work options, comprehensive benefits, and the opportunity to work with
            automotive data technology and vehicle marketplace.
          </p>
          <p className="text-muted-foreground">
            Interested? Send your resume to <span className="text-primary">careers@carmr.com</span> and tell us why
            you'd be a great fit.
          </p>
        </section>

        {/* Support Section */}
        <section id="support" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Support</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Our support team is here to help you with any questions or issues. We pride ourselves on fast, friendly, and
            helpful customer service.
          </p>
          <p className="mb-4 text-muted-foreground">
            For general inquiries, email us at <span className="text-primary">support@carmr.com</span>. Our average
            response time is under 2 hours during business hours (Mon-Fri, 9am-6pm EST).
          </p>
          <p className="text-muted-foreground">
            For urgent issues related to recent purchases, please include your order number in the subject line for
            faster assistance.
          </p>
        </section>

        {/* Cookie Policy Section */}
        <section id="cookies" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Cookie className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Cookie Policy</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            We use cookies and similar technologies to provide, protect, and improve our services. This policy explains
            how and why we use these technologies.
          </p>
          <p className="mb-4 text-muted-foreground">
            Essential cookies are required for basic site functionality and cannot be disabled. Analytics cookies help
            us understand how visitors use our site so we can improve it. Marketing cookies may be used to deliver
            relevant advertisements.
          </p>
          <p className="text-muted-foreground">
            You can manage your cookie preferences at any time through your browser settings. Note that disabling
            certain cookies may affect site functionality.
          </p>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Security</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Your security is our top priority. We implement bank-level security measures to protect your personal
            information and payment data.
          </p>
          <p className="mb-4 text-muted-foreground">
            All data transmissions are encrypted using TLS 1.3. Payment processing is handled by PCI-DSS compliant
            providers. We never store your full credit card details on our servers.
          </p>
          <p className="text-muted-foreground">
            Our infrastructure is hosted on secure cloud providers with SOC 2 Type II certification. We conduct regular
            security audits and penetration testing to identify and address potential vulnerabilities.
          </p>
        </section>

        {/* Acceptable Use Section */}
        <section id="acceptable-use" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Scale className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Acceptable Use Policy</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            By using CarMR, you agree to use our services responsibly and in compliance with all applicable laws. Our
            vehicle history reports are intended for personal use in evaluating vehicle purchases.
          </p>
          <p className="mb-4 text-muted-foreground">
            Prohibited uses include: reselling reports without authorization, using automated systems to bulk-query our
            database, misrepresenting report data, or using reports for discriminatory purposes.
          </p>
          <p className="text-muted-foreground">
            Violations of this policy may result in account termination and legal action where appropriate.
          </p>
        </section>

        {/* Subprocessors Section */}
        <section id="subprocessors" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Server className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Subprocessors</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            We work with trusted third-party service providers (subprocessors) to deliver our services. These partners
            are bound by strict data protection agreements.
          </p>
          <p className="mb-4 text-muted-foreground">
            Our current subprocessors include: Vercel (hosting), Stripe (payment processing), AWS (cloud
            infrastructure), and various data providers for vehicle history information.
          </p>
          <p className="text-muted-foreground">
            We regularly review our subprocessors to ensure they maintain appropriate security standards. Customers will
            be notified of any material changes to this list.
          </p>
        </section>

        {/* DPA Section */}
        <section id="dpa" className="mb-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Data Processing Agreement</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Our Data Processing Agreement (DPA) outlines how we handle personal data in compliance with GDPR, CCPA, and
            other applicable data protection regulations.
          </p>
          <p className="mb-4 text-muted-foreground">
            We process data only as necessary to provide our services. Personal data is retained only as long as needed
            for the purposes outlined in our Privacy Policy.
          </p>
          <p className="text-muted-foreground">
            For enterprise customers requiring a signed DPA, please contact{" "}
            <span className="text-primary">legal@carmr.com</span>.
          </p>
        </section>

        {/* Status Section */}
        <section id="status" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">System Status</h2>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-lg font-medium text-green-500">All Systems Operational</span>
            </div>
            <p className="mt-3 text-muted-foreground">
              All CarMR services are running normally. Report generation, payment processing, and API services are fully
              operational.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
