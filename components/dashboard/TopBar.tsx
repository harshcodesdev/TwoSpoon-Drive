"use client"

import { Cloud, Search, Filter, HelpCircle, Settings, Grid3x3 } from "lucide-react"
import { useState } from "react"
import { UserProfilePopup } from "./UserProfilePopup"

interface TopBarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function TopBar({ user }: TopBarProps) {
  const [showProfilePopup, setShowProfilePopup] = useState(false)

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"

  return (
    <>
      <header className="flex h-14 items-center border-b border-[#2a2b2f] bg-[#0f0f10] px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-normal text-white">TwoSpoonDrive</span>
        </div>

        {/* Search Bar */}
        <div className="mx-auto flex flex-1 items-center justify-center max-w-2xl px-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa0a6]" />
            <input
              type="text"
              placeholder="Search in Drive"
              className="h-10 w-full rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] pl-11 pr-11 text-sm text-white placeholder-[#9aa0a6] transition-colors focus:border-[#4285f4] focus:bg-[#2a2b2f] focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-colors hover:bg-[#2a2b2f]">
              <Filter className="h-5 w-5 text-[#9aa0a6]" />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <HelpCircle className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <Settings className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <Grid3x3 className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button>
          <button
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer overflow-hidden"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              userInitial
            )}
          </button>
        </div>
      </header>
      {showProfilePopup && user && (
        <UserProfilePopup user={user} onClose={() => setShowProfilePopup(false)} />
      )}
    </>
  )
}
