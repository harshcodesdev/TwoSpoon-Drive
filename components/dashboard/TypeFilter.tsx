"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Folder, FileText, Table, Presentation, Video, Image, File, Archive, Music } from "lucide-react"
import { FileTypeCategory, FILE_TYPE_OPTIONS } from "@/lib/fileTypes"

interface TypeFilterProps {
  value: FileTypeCategory
  onChange: (value: FileTypeCategory) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  folders: Folder,
  documents: FileText,
  spreadsheets: Table,
  presentations: Presentation,
  videos: Video,
  photos: Image,
  pdfs: File,
  archives: Archive,
  audio: Music,
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const selectedOption = FILE_TYPE_OPTIONS.find((opt) => opt.value === value) || FILE_TYPE_OPTIONS[0]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 rounded-md border border-[#2a2b2f] bg-[#1b1c1f] px-3 text-xs text-[#e8eaed] transition-colors focus:border-[#4285f4] focus:outline-none hover:border-[#3c3c3c]"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-[#dadce0] bg-white shadow-lg">
          {FILE_TYPE_OPTIONS.map((option) => {
            const Icon = option.icon ? iconMap[option.value] : null
            const isSelected = value === option.value

            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value as FileTypeCategory)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#202124] transition-colors hover:bg-[#f1f3f4] first:rounded-t-lg last:rounded-b-lg ${
                  isSelected ? "bg-[#e8f0fe] text-[#1a73e8]" : ""
                }`}
              >
                {Icon && <Icon className="h-5 w-5 text-[#5f6368] flex-shrink-0" />}
                <span className="flex-1 text-left">{option.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

