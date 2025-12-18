"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { FileGrid } from "@/components/dashboard/FileGrid"
import { ContextMenu } from "@/components/dashboard/ContextMenu"
import { CreateFolderDialog } from "@/components/dashboard/CreateFolderDialog"

interface File {
  id: string
  name: string
  type?: string | null
  isFolder: boolean
}

export default function FolderPage() {
  const params = useParams()
  const router = useRouter()
  const folderId = params.folderId as string

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isLoadingFiles, setIsLoadingFiles] = useState(true)
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false)
  const [breadcrumbPath, setBreadcrumbPath] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    // Listen for new folder event from sidebar
    const handleNewFolder = () => {
      setShowCreateFolderDialog(true)
    }
    window.addEventListener("dashboard:newFolder", handleNewFolder)
    return () => {
      window.removeEventListener("dashboard:newFolder", handleNewFolder)
    }
  }, [])

  useEffect(() => {
    // Fetch files from API
    const fetchFiles = async () => {
      try {
        setIsLoadingFiles(true)
        const res = await fetch(`/api/files?parentId=${folderId}`)
        if (!res.ok) {
          throw new Error("Failed to fetch files")
        }
        const data = await res.json()
        setFiles(data.files || [])
      } catch (error) {
        console.error("Error fetching files:", error)
      } finally {
        setIsLoadingFiles(false)
      }
    }

    // Fetch breadcrumb path
    const fetchBreadcrumbPath = async () => {
      try {
        const res = await fetch(`/api/files/path?folderId=${folderId}`)
        if (res.ok) {
          const data = await res.json()
          setBreadcrumbPath(data.path || [])
        }
      } catch (error) {
        console.error("Error fetching breadcrumb path:", error)
        setBreadcrumbPath([])
      }
    }

    if (folderId) {
      fetchFiles()
      fetchBreadcrumbPath()
    }
  }, [folderId])

  const handleFileContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault()
    setSelectedFile(fileId)
    setContextMenuPos({ x: e.clientX, y: e.clientY })
  }

  const handleCloseContextMenu = () => {
    setContextMenuPos(null)
    setSelectedFile(null)
  }

  const handleCreateFolder = async (name: string) => {
    try {
      const res = await fetch("/api/files/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          parentId: folderId,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to create folder")
      }

      // Refresh files list
      const filesRes = await fetch(`/api/files?parentId=${folderId}`)
      if (filesRes.ok) {
        const data = await filesRes.json()
        setFiles(data.files || [])
      }
    } catch (error) {
      console.error("Error creating folder:", error)
      alert(error instanceof Error ? error.message : "Failed to create folder")
      throw error
    }
  }

  const handleFileClick = (fileId: string, isFolder: boolean) => {
    if (isFolder) {
      router.push(`/dashboard/folders/${fileId}`)
    }
  }

  const handleNavigate = (targetFolderId: string | null) => {
    if (targetFolderId === null) {
      router.push("/dashboard")
    } else {
      router.push(`/dashboard/folders/${targetFolderId}`)
    }
  }

  const handleFileUpload = () => {
    // TODO: Implement file upload
    console.log("File upload clicked")
  }

  const handleFolderUpload = () => {
    // TODO: Implement folder upload
    console.log("Folder upload clicked")
  }

  const handleFolderDownload = () => {
    // TODO: Implement folder download
    console.log("Folder download clicked")
  }

  const handleFolderRename = () => {
    // TODO: Implement folder rename
    console.log("Folder rename clicked")
  }

  const handleFolderShare = () => {
    // TODO: Implement folder share
    console.log("Folder share clicked")
  }

  const handleFolderMoveToTrash = () => {
    // TODO: Implement folder move to trash
    console.log("Folder move to trash clicked")
  }

  return (
    <>
      {isLoadingFiles ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#2a2b2f] border-t-blue-500 mx-auto" />
            <p className="text-sm text-[#9aa0a6]">Loading files...</p>
          </div>
        </div>
      ) : (
        <FileGrid
          files={files}
          breadcrumbPath={breadcrumbPath}
          currentFolderId={folderId}
          onFileContextMenu={handleFileContextMenu}
          onFileClick={handleFileClick}
          onNavigate={handleNavigate}
          onNewFolder={() => setShowCreateFolderDialog(true)}
          onFileUpload={handleFileUpload}
          onFolderUpload={handleFolderUpload}
          onDownload={handleFolderDownload}
          onRename={handleFolderRename}
          onShare={handleFolderShare}
          onMoveToTrash={handleFolderMoveToTrash}
        />
      )}
      {contextMenuPos && (
        <ContextMenu x={contextMenuPos.x} y={contextMenuPos.y} onClose={handleCloseContextMenu} />
      )}
      <CreateFolderDialog
        isOpen={showCreateFolderDialog}
        onClose={() => setShowCreateFolderDialog(false)}
        onCreate={handleCreateFolder}
      />
    </>
  )
}

