"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import PricingCard from "@/components/pricing-card"
import AddonCard from "@/components/addon-card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-3xl mb-12 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Link href="/">
            <div className="flex items-center space-x-2 bg-blue-900/70 backdrop-blur-md rounded-full py-2 px-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
              <span className="font-bold text-lg">RefStack.me</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-blue-200 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <div className="flex items-center gap-2 bg-blue-950/40 backdrop-blur-md rounded-full py-1 px-4 border border-blue-800/30">
              <span className="text-sm font-medium">Annual Billing</span>
              <Switch />
              <span className="text-xs text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded-full">Save 20%</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Choose Your Plan
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
            Select the perfect plan to maximize your referral potential and grow your network
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <PricingCard
            title="Free"
            price="$0"
            description="For individuals getting started"
            features={[
              "Up to 5 referral links",
              "Basic analytics (views only)",
              "Default theme + basic referral cards",
              "Standard support",
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
            buttonOverride={
              <Button
                variant="outline"
                className="w-full text-white border-blue-500/50 hover:bg-blue-900/30"
                onClick={() => router.push("/register")}
              >
                Get Started
              </Button>
            }
          />

          <PricingCard
            title="Pro"
            price="$9.99/mo"
            description="For creators and professionals ready to grow"
            features={[
              "Unlimited referral links",
              "Advanced analytics (CTR, geography, etc)",
              "Advanced layouts + media embeds",
              "Priority support",
              "Custom URL slugs",
              "Link scheduling",
              "Profile page with bio & avatar",
              "Custom branding/themes",
              "Conversion tracking & top performer insights",
            ]}
            buttonText="Upgrade to Pro"
            buttonVariant="default"
            popular={true}
            buttonOverride={
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50"
                onClick={() => router.push("/register")}
              >
                Upgrade to Pro
              </Button>
            }
          />
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Optional Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AddonCard title="Custom Domain" price="$5/mo" description="Use your own domain like links.mysite.com" />
            <AddonCard title="White-Labeling" price="$10/mo" description="Remove all ReferralStack branding" />
            <AddonCard
              title="Developer API Access"
              price="$25/mo"
              description="Integrate with your systems via secure API"
            />
            <AddonCard
              title="Auto-Expiring Links"
              price="$2/mo"
              description="Time-based link control for limited promos"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative mb-16">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-md"></div>

          <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to stack your referrals?</h2>
              <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                Join thousands of creators and professionals who are maximizing their referral potential with RefStack
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                  onClick={() => router.push("/register")}
                >
                  Start Your Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-blue-500/50 text-xl py-6 px-8 rounded-full hover:bg-blue-900/30"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Can I upgrade or downgrade at any time?</h3>
              <p className="text-blue-200/80">
                Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated amount for the
                remainder of your billing cycle.
              </p>
            </div>
            <div className="bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Do you offer refunds?</h3>
              <p className="text-blue-200/80">
                We offer a 14-day money-back guarantee for all new Pro subscriptions. If you're not satisfied, contact
                our support team.
              </p>
            </div>
            <div className="bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Can I use RefStack for my business?</h3>
              <p className="text-blue-200/80">
                The Pro plan is perfect for businesses looking to manage and track their referral programs efficiently.
              </p>
            </div>
            <div className="bg-blue-950/30 backdrop-blur-md border border-blue-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-blue-200/80">
                We accept all major credit cards, PayPal, and select cryptocurrencies for payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
