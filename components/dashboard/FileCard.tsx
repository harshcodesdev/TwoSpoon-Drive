"use client"

import { FileText, File, MoreVertical, Folder } from "lucide-react"
import { useState } from "react"

interface FileCardProps {
  id: string
  name: string
  type?: string
  isFolder?: boolean
  onContextMenu?: (e: React.MouseEvent, fileId: string) => void
  onClick?: () => void
  onMove?: (fileId: string, targetFolderId: string | null) => void
  isDragging?: boolean
  isDragOver?: boolean
  onDragStart?: (e: React.DragEvent, fileId: string, isFolder: boolean) => void
  onDragOver?: (e: React.DragEvent, fileId: string, isFolder: boolean) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent, fileId: string, isFolder: boolean) => void
}

export function FileCard({
  id,
  name,
  type,
  isFolder,
  onContextMenu,
  onClick,
  onMove,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [wasDragged, setWasDragged] = useState(false)

  const handleFileClick = async () => {
    // Prevent click if item was just dragged
    if (wasDragged) {
      setWasDragged(false)
      return
    }

    if (isFolder) {
      onClick?.()
    } else {
      // For files, download through secure proxy endpoint
      try {
        const res = await fetch(`/api/files/${id}/download`)
        if (!res.ok) {
          throw new Error("Failed to download file")
        }

        // Get filename from Content-Disposition header or use a default
        const contentDisposition = res.headers.get("Content-Disposition")
        let fileName = "download"
        if (contentDisposition) {
          // Try standard format first: filename="name"
          const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i)
          if (quotedMatch && quotedMatch[1]) {
            fileName = quotedMatch[1].trim()
          } else {
            // Fallback to unquoted format: filename=name
            const unquotedMatch = contentDisposition.match(/filename=([^;]+)/i)
            if (unquotedMatch && unquotedMatch[1]) {
              fileName = unquotedMatch[1].trim()
            }
          }
        }

        // Create blob from response
        const blob = await res.blob()
        const blobUrl = window.URL.createObjectURL(blob)

        // Trigger download
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up blob URL
        window.URL.revokeObjectURL(blobUrl)
      } catch (error) {
        console.error("Error downloading file:", error)
        alert("Failed to download file")
      }
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    setWasDragged(false)
    if (onDragStart) {
      onDragStart(e, id, isFolder || false)
    } else {
      // Default drag behavior
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text/plain", JSON.stringify({ id, isFolder }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Only allow dropping on folders
    if (!isFolder) {
      e.dataTransfer.dropEffect = "none"
      return
    }

    // Allow drop on folders (validation happens in onDragOver callback)
    e.dataTransfer.dropEffect = "move"
    if (onDragOver) {
      onDragOver(e, id, isFolder || false)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Always call onDragLeave - let FileGrid handle the logic
    if (onDragLeave) {
      onDragLeave(e)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Only allow dropping on folders
    if (!isFolder) {
      return
    }

    const draggedData = e.dataTransfer.getData("text/plain")
    if (!draggedData) return

    try {
      const dragged = JSON.parse(draggedData)

      // Prevent dropping folder into itself
      if (dragged.id === id) {
        return
      }

      if (onDrop) {
        onDrop(e, id, isFolder || false)
      } else if (onMove) {
        onMove(dragged.id, id)
      }
    } catch (error) {
      console.error("Error parsing drag data:", error)
    }
  }

  const handleDragEnd = () => {
    setWasDragged(true)
    // Reset after a short delay to allow click event to check
    setTimeout(() => setWasDragged(false), 100)
  }

  const getIcon = () => {
    if (isFolder) {
      return <Folder className="h-[30px] w-[30px] text-[#8ab4f8]" fill="currentColor" />
    }

    switch (type) {
      case "pdf":
        return (
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-[#ea4335] text-white">
            <span className="text-[10px] font-bold">PDF</span>
          </div>
        )
      case "text":
      case "text/plain":
        return <FileText className="h-[30px] w-[30px] text-[#9aa0a6] stroke-[1.5]" />
      default:
        return <File className="h-[30px] w-[30px] text-[#9aa0a6] stroke-[1.5]" />
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`group relative cursor-pointer rounded-lg border transition-all ${
        isDragging
          ? "opacity-50 border-[#4285f4]"
          : isDragOver
          ? "border-[#4285f4] border-2 bg-[#1b1c1f] shadow-lg ring-2 ring-[#4285f4] ring-opacity-50"
          : "border-[#2a2b2f] bg-[#1b1c1f] hover:border-[#4285f4] hover:shadow-sm"
      }`}
      style={{ width: "260px", height: "110px", borderRadius: "8px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => onContextMenu?.(e, id)}
      onClick={handleFileClick}
    >
      <div className="flex h-full flex-col" style={{ padding: "12px" }}>
        {/* Icon Area */}
        <div className="relative mb-3 flex h-[60px] w-full items-center justify-center rounded bg-white">
          {getIcon()}
          <button
            className={`absolute right-1.5 top-1.5 rounded-full p-1 transition-all ${
              isHovered ? "opacity-100" : "opacity-0"
            } hover:bg-[#f1f3f4]`}
            onClick={(e) => {
              e.stopPropagation()
              onContextMenu?.(e, id)
            }}
          >
            <MoreVertical className="h-4 w-4 text-[#5f6368]" />
          </button>
        </div>
        {/* File Name */}
        <div className="flex-1 flex items-end">
          <div className="truncate text-left text-[13px] font-medium leading-[1.3] text-[#e8eaed]">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}
