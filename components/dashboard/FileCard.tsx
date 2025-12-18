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
}

export function FileCard({ id, name, type, isFolder, onContextMenu, onClick }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
      className="group relative cursor-pointer rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] transition-all hover:border-[#4285f4] hover:shadow-sm"
      style={{ width: "260px", height: "110px", borderRadius: "8px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => onContextMenu?.(e, id)}
      onClick={onClick}
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
