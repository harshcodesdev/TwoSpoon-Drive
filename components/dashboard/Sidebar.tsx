"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { HardDrive, Users, Star, Trash2, ChevronRight } from "lucide-react"
import { NewFileMenu } from "./NewFileMenu"

interface SidebarProps {
  onNewFolder: () => void
  onFileUpload: () => void
  onFolderUpload: () => void
}

interface StorageStats {
  used: number
  limit: number
  remaining: number
  percentage: number
  fileCount: number
  formatted: {
    used: string
    limit: string
    remaining: string
  }
}

export function Sidebar({ onNewFolder, onFileUpload, onFolderUpload }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null)
  const [isLoadingStorage, setIsLoadingStorage] = useState(true)

  const isTrash = pathname === "/dashboard/trash"
  const isMyDrive = pathname === "/dashboard" || pathname.startsWith("/dashboard/folders/")
  const isSharedWithMe = pathname === "/dashboard/shared"
  const isStarred = pathname === "/dashboard/starred"

  // Fetch storage statistics
  useEffect(() => {
    const fetchStorageStats = async () => {
      try {
        const res = await fetch("/api/storage")
        if (res.ok) {
          const data = await res.json()
          setStorageStats(data)
        }
      } catch (error) {
        console.error("Error fetching storage stats:", error)
      } finally {
        setIsLoadingStorage(false)
      }
    }

    fetchStorageStats()

    // Refresh storage stats every 30 seconds
    const interval = setInterval(fetchStorageStats, 30000)
    return () => clearInterval(interval)
  }, [])

  // Listen for storage updates (when files are uploaded/deleted)
  useEffect(() => {
    const handleStorageUpdate = () => {
      fetch("/api/storage")
        .then((res) => res.json())
        .then((data) => setStorageStats(data))
        .catch((error) => console.error("Error updating storage stats:", error))
    }

    window.addEventListener("storage:update", handleStorageUpdate)
    return () => window.removeEventListener("storage:update", handleStorageUpdate)
  }, [])

  const navItems: Array<{
    icon: typeof HardDrive
    label: string
    active: boolean
    path?: string
    collapsed?: boolean
  }> = [
    { icon: HardDrive, label: "My Drive", active: isMyDrive, path: "/dashboard" },
    { icon: Users, label: "Shared with me", active: isSharedWithMe, path: "/dashboard/shared" },
    { icon: Star, label: "Starred", active: isStarred, path: "/dashboard/starred" },
    { icon: Trash2, label: "Trash", active: isTrash, path: "/dashboard/trash" },
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.path) {
      router.push(item.path)
    }
  }

  return (
    <aside className="w-[240px] border-r border-[#2a2b2f] bg-[#0f0f10] p-3">
      {/* New Button with Menu */}
      <div className="mb-3">
        <NewFileMenu
          onNewFolder={onNewFolder}
          onFileUpload={onFileUpload}
          onFolderUpload={onFolderUpload}
        />
      </div>

      {/* Navigation Items */}
      <nav className="space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                item.active
                  ? "bg-[#2a2b2f] text-[#8ab4f8]"
                  : "text-[#e8eaed] hover:bg-[#1b1c1f]"
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${item.active ? "text-[#8ab4f8]" : "text-[#9aa0a6]"}`} />
              <span className="flex-1 text-left font-normal">{item.label}</span>
              {item.collapsed && (
                <ChevronRight className="h-4 w-4 text-[#9aa0a6]" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Storage Section */}
      <div className="mt-6 rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] p-4">
        <div className="mb-2 flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-[#9aa0a6]" />
          <span className="text-xs font-medium text-[#e8eaed]">Storage</span>
          {storageStats && (
            <span className="text-xs text-[#9aa0a6]">
              ({Math.round(storageStats.percentage)}% full)
            </span>
          )}
        </div>
        {isLoadingStorage ? (
          <div className="mb-2 text-xs text-[#9aa0a6]">Loading...</div>
        ) : storageStats ? (
          <>
            <div className="mb-2 text-xs text-[#9aa0a6]">
              {storageStats.formatted.used} of {storageStats.formatted.limit} used
            </div>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[#0f0f10]">
              <div
                className={`h-full transition-all ${
                  storageStats.percentage >= 90
                    ? "bg-[#f28b82]"
                    : storageStats.percentage >= 75
                    ? "bg-[#fbbc04]"
                    : "bg-[#34a853]"
                }`}
                style={{ width: `${Math.min(100, storageStats.percentage)}%` }}
              />
            </div>
            {/* {storageStats.percentage >= 100 ? (
              <div className="w-full rounded-lg border border-[#f28b82] bg-transparent px-3 py-2 text-xs font-medium text-[#f28b82] text-center">
                Storage full
              </div>
            ) : (
              <button className="w-full rounded-lg border border-[#2a2b2f] bg-transparent px-3 py-2 text-xs font-medium text-[#f28b82] transition-colors hover:bg-[#2a2b2f]">
                Get more storage
              </button>
            )} */}
          </>
        ) : (
          <div className="mb-2 text-xs text-[#9aa0a6]">Unable to load storage</div>
        )}
      </div>
    </aside>
  )
}
