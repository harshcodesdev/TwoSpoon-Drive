"use client"

import { useState, useEffect } from "react"
import { User, LogOut, Settings, CreditCard, HelpCircle } from "lucide-react"
import { signOut } from "next-auth/react"

interface UserProfilePopupProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  onClose: () => void
}

export function UserProfilePopup({ user, onClose }: UserProfilePopupProps) {
  const [imageError, setImageError] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" })
  }

  const userInitial = user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false)
  }, [user?.image])

  return (
    <>
      <div
        className="fixed right-4 top-16 z-50 w-80 rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Info Section */}
        <div className="border-b border-[#2a2b2f] p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-blue-500 flex items-center justify-center">
              {user.image && !imageError ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-white text-lg font-medium">
                  {userInitial}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium text-[#e8eaed]">
                {user.name || "User"}
              </div>
              <div className="truncate text-xs text-[#9aa0a6]">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {/* <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]">
            <User className="h-5 w-5 text-[#9aa0a6]" />
            <span>Manage your Google Account</span>
          </button> */}
          <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]">
            <Settings className="h-5 w-5 text-[#9aa0a6]" />
            <span>Settings</span>
          </button>
          {/* <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]">
            <CreditCard className="h-5 w-5 text-[#9aa0a6]" />
            <span>Billing & plans</span>
          </button> */}
          {/* <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]">
            <HelpCircle className="h-5 w-5 text-[#9aa0a6]" />
            <span>Help & support</span>
          </button> */}
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2b2f]" />

        {/* Sign Out */}
        <div className="p-2">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]"
          >
            <LogOut className="h-5 w-5 text-[#9aa0a6]" />
            <span>Sign out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2a2b2f] p-3">
          <div className="text-xs text-[#9aa0a6]">
            <div className="mb-1">Privacy Policy</div>
            <div>Terms of Service</div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  )
}

