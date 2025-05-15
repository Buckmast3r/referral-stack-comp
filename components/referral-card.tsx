"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReferralCardProps {
  category: string
  company: string
  logo: string
  logoColor: string
  hasExternalLink?: boolean
}

export default function ReferralCard({
  category,
  company,
  logo,
  logoColor,
  hasExternalLink = false,
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://refstack.me/")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText("https://refstack.me/")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const getCategoryColor = (category: string) => {
    return "bg-yellow-400 text-black"
  }

  const getCompanyLogo = (company: string) => {
    switch (company.toLowerCase()) {
      case "dropbox":
        return (
          <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
            <path d="M12 2L6 7l6 5-6 5 6 5 6-5-6-5 6-5z" />
          </svg>
        )
      case "coinbase":
        return <div className="text-white font-bold text-2xl">C</div>
      case "refstack":
        return <div className="text-white font-bold text-2xl">R</div>
      case "robinhood":
        return (
          <svg viewBox="0 0 24 24" fill="white" width="100%" height="100%">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 4c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z" />
          </svg>
        )
      default:
        return <div className="text-white font-bold text-2xl">{company.charAt(0)}</div>
    }
  }

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md group-hover:bg-blue-500/20 transition-all"></div>

      {/* Card */}
      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={`${getCategoryColor(category)} text-xs font-bold px-3 py-1 rounded-full`}>
                {category}
              </span>
              <span className="text-xl font-bold">{company}</span>
            </div>
            {hasExternalLink && (
              <Button variant="ghost" size="icon" className="text-blue-300 h-8 w-8">
                <ExternalLink size={16} />
              </Button>
            )}
          </div>

          {/* Logo and Program */}
          <div className="flex items-center space-x-4 mb-4">
            <div
              className={`${logoColor} w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
            >
              <div className="w-8 h-8 relative">{getCompanyLogo(company)}</div>
            </div>
            <div>
              <p className="text-blue-200/80 text-sm">Referral Program</p>
              <div className="flex items-center mt-1">
                <div className="bg-blue-950/70 backdrop-blur-sm rounded-md px-3 py-1 text-sm text-blue-200/70 border border-blue-900/50">
                  https://refstack.me/
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-300 h-6 ml-1"
                  onClick={copyLinkToClipboard}
                >
                  {linkCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="ghost" className="text-white border border-blue-800/50 hover:bg-blue-900/30">
              Send Referral
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50"
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
