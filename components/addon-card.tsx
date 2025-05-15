import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface AddonCardProps {
  title: string
  price: string
  description: string
}

export default function AddonCard({ title, price, description }: AddonCardProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-md group-hover:bg-blue-500/20 transition-all"></div>

      {/* Card */}
      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <div className="mb-2">
            <span className="text-2xl font-bold">{price}</span>
          </div>
          <p className="text-blue-200/80 mb-4 text-sm">{description}</p>

          <Button variant="ghost" className="w-full text-white border border-blue-800/50 hover:bg-blue-900/30 group">
            <PlusCircle className="h-4 w-4 mr-2 group-hover:text-blue-400" />
            Add to Plan
          </Button>
        </div>
      </div>
    </div>
  )
}
