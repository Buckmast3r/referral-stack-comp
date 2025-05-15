import { Button } from "@/components/ui/button"
import ReferralCard from "@/components/referral-card"
import StatsCard from "@/components/stats-card"
import RobotAvatar from "@/components/robot-avatar"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-3xl mb-12 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <div className="flex items-center space-x-2 bg-blue-900/70 backdrop-blur-md rounded-full py-2 px-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
              <span className="text-white text-lg">▶</span>
            </div>
            <span className="font-bold text-lg">RefStack.me</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-blue-950/40 backdrop-blur-md rounded-full py-2 px-4 border border-blue-800/30 hover:bg-blue-900/40 transition-colors"
            >
              <span className="text-sm font-medium">Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <RobotAvatar />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              abuckmaster94!
            </h1>
            <p className="text-xl text-blue-200/80">Here's an overview of your referral activity.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <StatsCard title="Total Clicks" value="2" />
          <StatsCard title="Total Referral Cards" value="5" />
          <StatsCard title="Avg. Clicks per Card" value="0.4" />
        </div>

        {/* Referral Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ReferralCard
            category="Tech"
            company="Dropbox"
            logo="/dropbox-logo.svg"
            logoColor="bg-blue-500"
            hasExternalLink={true}
          />
          <ReferralCard
            category="Crypto"
            company="Coinbase"
            logo="/coinbase-logo.svg"
            logoColor="bg-blue-500"
            hasExternalLink={false}
          />
          <ReferralCard
            category="Finance"
            company="RefStack"
            logo="/refstack-logo.svg"
            logoColor="bg-teal-400"
            hasExternalLink={false}
          />
          <ReferralCard
            category="Finance"
            company="Robinhood"
            logo="/robinhood-logo.svg"
            logoColor="bg-teal-400"
            hasExternalLink={true}
          />
        </div>

        {/* Build Button */}
        <div className="flex justify-center mb-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-8 px-12 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
            Build Your Referral Stack
          </Button>
        </div>
      </div>
    </div>
  )
}
