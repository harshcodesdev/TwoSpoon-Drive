"use client"

import { Cloud, Search, Filter, HelpCircle, Settings, Grid3x3, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { UserProfilePopup } from "./UserProfilePopup"
import { SearchResults } from "./SearchResults"
import Image from "next/image"

interface TopBarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function TopBar({ user }: TopBarProps) {
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [imageError, setImageError] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"

  // Focus search on Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
        setShowSearchResults(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false)
      }
    }

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSearchResults])

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
        <div
          ref={searchContainerRef}
          className="relative mx-auto flex flex-1 items-center justify-center max-w-2xl px-8"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa0a6]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSearchResults(true)
              }}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowSearchResults(true)
                }
              }}
              className="h-10 w-full rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] pl-11 pr-20 text-sm text-white placeholder-[#9aa0a6] transition-colors focus:border-[#4285f4] focus:bg-[#2a2b2f] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowSearchResults(false)
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-colors hover:bg-[#2a2b2f]"
              >
                <X className="h-4 w-4 text-[#9aa0a6]" />
              </button>
            )}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden rounded border border-[#2a2b2f] bg-[#1b1c1f] px-1.5 py-0.5 text-xs text-[#9aa0a6] md:inline">
                ⌘K
              </kbd>
              <button className="rounded-full p-1.5 transition-colors hover:bg-[#2a2b2f]">
                <Filter className="h-5 w-5 text-[#9aa0a6]" />
              </button>
            </div>
          </div>
          {showSearchResults && searchQuery.trim() && (
            <SearchResults
              query={searchQuery}
              isOpen={showSearchResults}
              onClose={() => setShowSearchResults(false)}
            />
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <HelpCircle className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <Settings className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button>
          {/* <button className="rounded-full p-2 transition-colors hover:bg-[#1b1c1f]">
            <Grid3x3 className="h-5 w-5 text-[#9aa0a6] hover:text-white" />
          </button> */}
          <button
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer overflow-hidden"
          >
            {user?.image && !imageError ? (
              <Image
                key={user.image}
                src={user.image}
                alt={user.name || "User"}
                className="h-full w-full object-cover"
                onLoad={() => setImageError(false)}
                onError={() => setImageError(true)}
                width={32}
                height={32}
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
