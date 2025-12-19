"use client"

import { RotateCcw, Trash2, ChevronRight } from "lucide-react"

interface TrashContextMenuProps {
  x: number
  y: number
  fileId: string
  isFolder: boolean
  onClose: () => void
  onRestore: (fileId: string) => void
  onDeleteForever: (fileId: string) => void
}

export function TrashContextMenu({
  x,
  y,
  fileId,
  isFolder,
  onClose,
  onRestore,
  onDeleteForever,
}: TrashContextMenuProps) {
  const handleRestore = () => {
    onRestore(fileId)
    onClose()
  }

  const handleDeleteForever = () => {
    onDeleteForever(fileId)
    onClose()
  }

  const menuItems = [
    { icon: RotateCcw, label: "Restore", onClick: handleRestore },
    { divider: true },
    { icon: Trash2, label: "Delete forever", onClick: handleDeleteForever },
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
              onClick={item.onClick}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-[#9aa0a6]" />
              <span className="flex-1 text-left font-normal">{item.label}</span>
            </button>
          )
        })}
      </div>
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  )
}

