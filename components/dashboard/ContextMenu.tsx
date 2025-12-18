"use client"

import {
  Grid3x3,
  Download,
  FileText,
  File,
  Users,
  Folder,
  Star,
  Trash2,
  ChevronRight,
} from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuItems = [
    { icon: Grid3x3, label: "Open with", hasArrow: true },
    { icon: Download, label: "Download" },
    { icon: FileText, label: "Rename" },
    { icon: File, label: "Make a copy", shortcut: "⌘C ⌘V" },
    { divider: true },
    { icon: Users, label: "Share", hasArrow: true },
    { icon: Folder, label: "Organize", hasArrow: true },
    { icon: FileText, label: "File information", hasArrow: true },
    { icon: Star, label: "Make available offline" },
    { divider: true },
    { icon: Trash2, label: "Move to trash" },
  ]

  return (
    <>
      <div
        className="fixed z-50 min-w-[200px] rounded-lg border border-[#2a2b2f] bg-[#1b1c1f] py-1 shadow-xl"
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="my-1 border-t border-[#2a2b2f]" />
          }

          const Icon = item.icon!
          return (
            <button
              key={index}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-[#e8eaed] transition-colors hover:bg-[#2a2b2f]"
              onClick={onClose}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-[#9aa0a6]" />
              <span className="flex-1 text-left font-normal">{item.label}</span>
              {item.hasArrow && (
                <ChevronRight className="h-4 w-4 rotate-[-90deg] text-[#9aa0a6]" />
              )}
              {item.shortcut && (
                <span className="text-xs text-[#9aa0a6] font-mono">{item.shortcut}</span>
              )}
            </button>
          )
        })}
      </div>
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  )
}
