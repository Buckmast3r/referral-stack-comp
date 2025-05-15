"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check, ArrowRight, Users, BarChart3, LinkIcon, Shield } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import FeatureCard from "@/components/feature-card"
import AnimatedCounter from "@/components/animated-counter"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 text-white">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 bg-blue-900/70 backdrop-blur-md rounded-full py-2 px-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
              <span className="text-white text-lg">▶</span>
            </div>
            <span className="font-bold text-lg">RefStack.me</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-blue-200 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-blue-200 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-blue-200 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-blue-200 hover:text-white transition-colors px-4 py-2">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 leading-tight">
              Maximize Your Referral Potential
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/90 mb-10 max-w-3xl mx-auto">
              The all-in-one platform to create, manage, and track your referral links across all your favorite
              services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                onClick={() => router.push("/register")}
              >
                Start For Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-white border-blue-500/50 text-lg py-6 px-8 rounded-full hover:bg-blue-900/30"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"></div>

              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-800/30">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">D</span>
                      </div>
                      <div>
                        <div className="font-bold">Dropbox</div>
                        <div className="text-sm text-blue-200/70">Tech Referral</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-blue-200/70">
                        <span className="text-white font-bold">24</span> clicks
                      </div>
                      <div className="text-sm text-green-400">
                        <span className="font-bold">+12%</span> this week
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-800/30">
                    <div className="flex items-center mb-3">
                      <div className="bg-teal-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">C</span>
                      </div>
                      <div>
                        <div className="font-bold">Coinbase</div>
                        <div className="text-sm text-blue-200/70">Crypto Referral</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-blue-200/70">
                        <span className="text-white font-bold">18</span> clicks
                      </div>
                      <div className="text-sm text-green-400">
                        <span className="font-bold">+8%</span> this week
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h3 className="text-5xl font-bold mb-2">
                  <AnimatedCounter value={50} suffix="K+" />
                </h3>
                <p className="text-blue-200/80">Active Users</p>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h3 className="text-5xl font-bold mb-2">
                  <AnimatedCounter value={1} prefix="$" suffix="M+" />
                </h3>
                <p className="text-blue-200/80">Referral Revenue Generated</p>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h3 className="text-5xl font-bold mb-2">
                  <AnimatedCounter value={500} suffix="+" />
                </h3>
                <p className="text-blue-200/80">Supported Programs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Everything You Need to Maximize Referrals
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              RefStack provides all the tools you need to create, manage, and optimize your referral strategy.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <FeatureCard
              icon={<LinkIcon className="h-6 w-6" />}
              title="Link Management"
              description="Create and manage all your referral links in one place with custom URLs and tracking."
              variants={fadeIn}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Advanced Analytics"
              description="Track clicks, conversions, and revenue with detailed analytics and insights."
              variants={fadeIn}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Audience Targeting"
              description="Create custom landing pages and referral links tailored to different audiences."
              variants={fadeIn}
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Fraud Protection"
              description="Advanced security features to prevent referral fraud and abuse."
              variants={fadeIn}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              How RefStack Works
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Get started in minutes and start maximizing your referral potential.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Create Your Stack</h3>
                <p className="text-blue-200/80">
                  Sign up for a free account and add your first referral programs to your stack in just a few clicks.
                </p>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Share Your Links</h3>
                <p className="text-blue-200/80">
                  Share your personalized referral links across social media, email, or your website with our easy
                  sharing tools.
                </p>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Track & Optimize</h3>
                <p className="text-blue-200/80">
                  Monitor performance in real-time and optimize your strategy based on detailed analytics and insights.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              What Our Users Say
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Join thousands of creators and professionals who are maximizing their referral potential with RefStack.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <TestimonialCard
              quote="RefStack has completely transformed how I manage my affiliate links. I've seen a 40% increase in conversions since switching!"
              author="Sarah Johnson"
              role="Content Creator"
              rating={5}
              variants={fadeIn}
            />
            <TestimonialCard
              quote="The analytics are incredible. I can finally see which referral programs are actually working for my audience."
              author="Michael Chen"
              role="Tech Blogger"
              rating={5}
              variants={fadeIn}
            />
            <TestimonialCard
              quote="I was skeptical at first, but the results speak for themselves. My referral revenue has doubled in just 3 months."
              author="Jessica Williams"
              role="Finance Influencer"
              rating={5}
              variants={fadeIn}
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Start for free, upgrade as you grow. No hidden fees or complicated tiers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-blue-200/70">/month</span>
                </div>
                <p className="text-blue-200/80 mb-6">Perfect for individuals getting started with referrals.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Up to 5 referral links</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Standard support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-white border-blue-500/50 hover:bg-blue-900/30">
                  Get Started
                </Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-blue-500/50 z-10">
                Most Popular
              </div>
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-md"></div>
              <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-500/50 rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-blue-200/70">/month</span>
                </div>
                <p className="text-blue-200/80 mb-6">For creators and professionals ready to grow.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Unlimited referral links</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50">
                  Upgrade to Pro
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors"
            >
              View full pricing details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Ready to Stack Your Referrals?
                </h2>
                <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators and professionals who are maximizing their referral potential with
                  RefStack.
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-blue-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                  <span className="text-white text-lg">▶</span>
                </div>
                <span className="font-bold text-lg">RefStack.me</span>
              </div>
              <p className="text-blue-200/70 mb-4">
                The all-in-one platform to create, manage, and track your referral links.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-300 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-blue-300 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-blue-300 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-blue-200/70 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-blue-200/70 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-blue-200/70 hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-blue-200/70 hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-blue-200/70 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-blue-200/70 hover:text-white transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-blue-200/70 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-blue-200/70 hover:text-white transition-colors">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200/70 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-blue-200/70 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-200/70 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-blue-200/70 hover:text-white transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200/70 mb-4 md:mb-0">© 2025 RefStack. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-blue-200/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-200/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-blue-200/70 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
