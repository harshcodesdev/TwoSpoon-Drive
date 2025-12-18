"use client"

import { FileCard } from "./FileCard"
import { ChevronDown } from "lucide-react"

interface File {
  id: string
  name: string
  type: "text" | "file" | "pdf"
}

interface FileGridProps {
  files: File[]
  onFileContextMenu: (e: React.MouseEvent, fileId: string) => void
}

export function FileGrid({ files, onFileContextMenu }: FileGridProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0f10] p-6">
      {/* Header with Filters */}
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <h1 className="text-[22px] font-normal text-[#e8eaed]">My Drive</h1>
          <button className="rounded-full p-1 transition-colors hover:bg-[#1b1c1f]">
            <ChevronDown className="h-5 w-5 text-[#9aa0a6]" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-[#2a2b2f] bg-[#1b1c1f] px-3 text-xs text-[#e8eaed] transition-colors focus:border-[#4285f4] focus:outline-none hover:border-[#3c3c3c]">
            <option>Type</option>
          </select>
          <select className="h-9 rounded-md border border-[#2a2b2f] bg-[#1b1c1f] px-3 text-xs text-[#e8eaed] transition-colors focus:border-[#4285f4] focus:outline-none hover:border-[#3c3c3c]">
            <option>People</option>
          </select>
          <select className="h-9 rounded-md border border-[#2a2b2f] bg-[#1b1c1f] px-3 text-xs text-[#e8eaed] transition-colors focus:border-[#4285f4] focus:outline-none hover:border-[#3c3c3c]">
            <option>Modified</option>
          </select>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, 260px)", gap: "16px" }}>
        {files.map((file) => (
          <FileCard
            key={file.id}
            id={file.id}
            name={file.name}
            type={file.type}
            onContextMenu={onFileContextMenu}
          />
        ))}
      </div>
    </div>
  )
}
