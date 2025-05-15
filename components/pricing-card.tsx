import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
}: PricingCardProps) {
  return (
    <div className="relative group">
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-blue-500/50 z-20">
          Most Popular
        </div>
      )}

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl blur-md transition-all ${
          popular ? "bg-blue-500/30" : "bg-blue-500/10 group-hover:bg-blue-500/20"
        }`}
      ></div>

      {/* Card */}
      <div
        className={`relative bg-blue-950/40 backdrop-blur-md border rounded-3xl p-8 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden ${
          popular ? "border-blue-500/50" : "border-blue-800/50"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">{price}</span>
            {price !== "$0" && <span className="text-blue-200/70 ml-1">/month</span>}
          </div>
          <p className="text-blue-200/80 mb-6">{description}</p>

          <Button
            variant={buttonVariant}
            className={`w-full mb-8 text-lg py-6 ${
              buttonVariant === "default"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-500/50"
                : "text-white border-blue-500/50 hover:bg-blue-900/30"
            }`}
          >
            {buttonText}
          </Button>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-3 mt-1">
                  <Check className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
