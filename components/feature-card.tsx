"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  variants?: any
}

export default function FeatureCard({ icon, title, description, variants }: FeatureCardProps) {
  return (
    <motion.div className="relative" variants={variants}>
      <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-blue-200/80">{description}</p>
      </div>
    </motion.div>
  )
}
