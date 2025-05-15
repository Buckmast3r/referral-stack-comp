"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
  variants?: any
}

export default function TestimonialCard({ quote, author, role, rating, variants }: TestimonialCardProps) {
  return (
    <motion.div className="relative" variants={variants}>
      <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-blue-100 mb-6 italic">"{quote}"</p>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-blue-200/70 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
