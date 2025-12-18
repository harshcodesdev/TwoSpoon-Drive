"use client"

import { FileCard } from "./FileCard"
import { FolderMenu } from "./FolderMenu"
import { ChevronDown } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface File {
  id: string
  name: string
  type?: string | null
  isFolder: boolean
}

interface BreadcrumbItem {
  id: string
  name: string
}

interface FileGridProps {
  files: File[]
  breadcrumbPath: BreadcrumbItem[]
  currentFolderId: string | null
  onFileContextMenu: (e: React.MouseEvent, fileId: string) => void
  onFileClick?: (fileId: string, isFolder: boolean) => void
  onNavigate?: (folderId: string | null) => void
  onNewFolder?: () => void
  onFileUpload?: () => void
  onFolderUpload?: () => void
  onDownload?: () => void
  onRename?: () => void
  onShare?: () => void
  onMoveToTrash?: () => void
}

export function FileGrid({
  files,
  breadcrumbPath,
  currentFolderId,
  onFileContextMenu,
  onFileClick,
  onNavigate,
  onNewFolder,
  onFileUpload,
  onFolderUpload,
  onDownload,
  onRename,
  onShare,
  onMoveToTrash,
}: FileGridProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0f10] p-6">
      {/* Breadcrumb Navigation */}
      {breadcrumbPath.length > 0 && (
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList className="text-[#9aa0a6] text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => onNavigate?.(null)}
                  className="cursor-pointer hover:text-[#e8eaed] transition-colors text-[#8ab4f8]"
                >
                  My Drive
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbPath.map((item, index) => {
                const isLast = index === breadcrumbPath.length - 1
                return (
                  <div key={item.id} className="flex items-center">
                    <BreadcrumbSeparator className="text-[#5f6368]">
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-[#e8eaed] font-normal">{item.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          onClick={() => onNavigate?.(item.id)}
                          className="cursor-pointer hover:text-[#e8eaed] transition-colors text-[#8ab4f8]"
                        >
                          {item.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {/* Header with Filters */}
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <h1 className="text-[22px] font-normal text-[#e8eaed]">
            {breadcrumbPath.length > 0 ? breadcrumbPath[breadcrumbPath.length - 1].name : "My Drive"}
          </h1>
          <FolderMenu
            isRoot={currentFolderId === null}
            onNewFolder={onNewFolder || (() => {})}
            onFileUpload={onFileUpload || (() => {})}
            onFolderUpload={onFolderUpload || (() => {})}
            onDownload={onDownload || (() => {})}
            onRename={onRename || (() => {})}
            onShare={onShare || (() => {})}
            onMoveToTrash={onMoveToTrash || (() => {})}
          />
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
      {files.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-[#9aa0a6]">No files or folders yet</p>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, 260px)", gap: "16px" }}>
          {files.map((file) => (
            <FileCard
              key={file.id}
              id={file.id}
              name={file.name}
              type={file.type || undefined}
              isFolder={file.isFolder}
              onContextMenu={onFileContextMenu}
              onClick={() => onFileClick?.(file.id, file.isFolder)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
