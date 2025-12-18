"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/dashboard/TopBar"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { FileGrid } from "@/components/dashboard/FileGrid"
import { ContextMenu } from "@/components/dashboard/ContextMenu"

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null)
  const [user, setUser] = useState<{
    name?: string | null
    email?: string | null
    image?: string | null
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch user session from API
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/user")
        if (!res.ok) {
          if (res.status === 401) {
            // Not authenticated, redirect to home
            window.location.href = "/"
            return
          }
          throw new Error("Failed to fetch user")
        }
        const data = await res.json()
        if (data.user) {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        // Redirect to home if error
        window.location.href = "/"
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleFileContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault()
    setSelectedFile(fileId)
    setContextMenuPos({ x: e.clientX, y: e.clientY })
  }

  const handleCloseContextMenu = () => {
    setContextMenuPos(null)
    setSelectedFile(null)
  }

  // Mock files data
  const files = [
    { id: "1", name: "File1.txt", type: "text" as const },
    { id: "2", name: "File", type: "file" as const },
    { id: "3", name: "File", type: "file" as const },
    { id: "4", name: "PDF File", type: "pdf" as const },
  ]

  // Show loading state or redirect if no user
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f0f10] text-white">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#2a2b2f] border-t-blue-500 mx-auto" />
          <p className="text-sm text-[#9aa0a6]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="flex h-screen flex-col bg-[#0f0f10] text-white">
      <TopBar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <FileGrid files={files} onFileContextMenu={handleFileContextMenu} />
      </div>
      {contextMenuPos && (
        <ContextMenu x={contextMenuPos.x} y={contextMenuPos.y} onClose={handleCloseContextMenu} />
      )}
    </div>
  )
}
