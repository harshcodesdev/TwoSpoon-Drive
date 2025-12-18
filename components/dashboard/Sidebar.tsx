"use client"

import { Home, HardDrive, Monitor, Users, Clock, Star, AlertCircle, Trash2, ChevronRight } from "lucide-react"
import { NewFileMenu } from "./NewFileMenu"

interface SidebarProps {
  onNewFolder: () => void
  onFileUpload: () => void
  onFolderUpload: () => void
}

export function Sidebar({ onNewFolder, onFileUpload, onFolderUpload }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Home", active: false },
    { icon: HardDrive, label: "My Drive", active: true },
    { icon: Monitor, label: "Computers", active: false, collapsed: true },
    { icon: Users, label: "Shared with me", active: false },
    { icon: Clock, label: "Recent", active: false },
    { icon: Star, label: "Starred", active: false },
    { icon: AlertCircle, label: "Spam", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ]

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
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                item.active
                  ? "bg-[#2a2b2f] text-[#8ab4f8]"
                  : "text-[#e8eaed] hover:bg-[#1b1c1f]"
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${item.active ? "text-[#8ab4f8]" : "text-[#9aa0a6]"}`} />
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
          <span className="text-xs text-[#9aa0a6]">(94% full)</span>
        </div>
        <div className="mb-2 text-xs text-[#9aa0a6]">14.12 GB of 15 GB used</div>
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[#0f0f10]">
          <div className="h-full w-[94%] bg-[#f28b82]" />
        </div>
        <button className="w-full rounded-lg border border-[#2a2b2f] bg-transparent px-3 py-2 text-xs font-medium text-[#f28b82] transition-colors hover:bg-[#2a2b2f]">
          Get more storage
        </button>
      </div>
    </aside>
  )
}
