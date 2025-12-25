import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingComparisonProps {
  className?: string
}

const comparisonData = [
  {
    feature: "Price",
    packages: "$19.99 - $89.99",
    proPass: "$0.99",
    monthly: "$39.99/mo",
  },
  {
    feature: "Validity",
    packages: "Never expires",
    proPass: "72 hours",
    monthly: "Active subscription",
  },
  {
    feature: "Reports Included",
    packages: "1 / 5 / 20",
    proPass: "Unlimited",
    monthly: "Unlimited",
  },
  {
    feature: "Best For",
    packages: "Single vehicle check",
    proPass: "Car shopping weekend",
    monthly: "Dealers & heavy users",
  },
  {
    feature: "Who It's For",
    packages: "Individual buyers",
    proPass: "Active shoppers",
    monthly: "Professionals",
  },
  {
    feature: "Full Vehicle History",
    packages: true,
    proPass: true,
    monthly: true,
  },
  {
    feature: "AI-Powered Summary",
    packages: true,
    proPass: true,
    monthly: true,
  },
  {
    feature: "Market Value Estimate",
    packages: true,
    proPass: true,
    monthly: true,
  },
  {
    feature: "PDF Download",
    packages: true,
    proPass: true,
    monthly: true,
  },
  {
    feature: "Priority Support",
    packages: false,
    proPass: false,
    monthly: true,
  },
]

export function PricingComparison({ className }: PricingComparisonProps) {
  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-success" />
      ) : (
        <Minus className="mx-auto h-5 w-5 text-muted-foreground" />
      )
    }
    return value
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Feature</TableHead>
            <TableHead className="text-center">Packages</TableHead>
            <TableHead className="text-center bg-primary/5">
              <span className="font-semibold text-primary">Pro Pass</span>
            </TableHead>
            <TableHead className="text-center">Monthly</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonData.map((row) => (
            <TableRow key={row.feature}>
              <TableCell className="font-medium">{row.feature}</TableCell>
              <TableCell className="text-center text-sm">{renderCell(row.packages)}</TableCell>
              <TableCell className="text-center text-sm bg-primary/5">{renderCell(row.proPass)}</TableCell>
              <TableCell className="text-center text-sm">{renderCell(row.monthly)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
