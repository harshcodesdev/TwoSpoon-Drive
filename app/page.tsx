"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cloud, ArrowRight } from "lucide-react"

export default function Home() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center pb-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Floating Header Card in Middle */}
            {/* <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="mx-auto inline-flex rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg px-10 py-4 items-center justify-between gap-12 w-full max-w-[950px]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-700">
                    <Cloud className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-slate-900">TwoSpoonDrive</span>
                </div>
                <nav className="flex items-center gap-6">
                  <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    Pricing
                  </a>
                  <Button
                    variant="ghost"
                    onClick={handleSignIn}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Log in
                  </Button>
                </nav>
              </div>
            </motion.header> */}

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 blur-xl opacity-20" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 shadow-lg">
                  <Cloud className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
            >
              Your files, everywhere you need them
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 text-lg text-slate-600 sm:text-xl"
            >
              Secure, fast, and reliable cloud storage. Access your files from anywhere, anytime.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                onClick={handleSignIn}
                size="lg"
                className="cursor-pointer  group h-12 gap-2 rounded-full bg-slate-900 px-8 text-base font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group h-12 gap-2 rounded-full border-2 border-slate-200 bg-white px-8 text-base font-medium text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                See our plans
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <p className="mb-6 text-sm font-medium text-slate-500">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {["Google", "Microsoft", "Apple", "Meta", "Amazon", "Netflix"].map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="text-sm font-semibold text-slate-400"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
