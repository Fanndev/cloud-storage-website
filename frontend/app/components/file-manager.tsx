"use client"

import { useState, useEffect } from "react"
import {
  Upload,
  File,
  ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Download,
  Trash2,
  Search,
  Grid3X3,
  List,
  Plus,
  FolderOpen,
} from "lucide-react"
import { UploadModal } from "@/app/components/upload-modal"
import { store, destroy } from "@/app/actions/upload/action"

interface FileItem {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document" | "archive"
  size: string
  uploadDate: string
  url?: string
}

const mockFiles: FileItem[] = [
  { id: "1", name: "presentation.pdf", type: "document", size: "2.4 MB", uploadDate: "2024-01-15" },
  { id: "2", name: "vacation-photo.jpg", type: "image", size: "1.8 MB", uploadDate: "2024-01-14" },
  { id: "3", name: "project-demo.mp4", type: "video", size: "15.2 MB", uploadDate: "2024-01-13" },
  { id: "4", name: "background-music.mp3", type: "audio", size: "4.1 MB", uploadDate: "2024-01-12" },
  { id: "5", name: "backup-files.zip", type: "archive", size: "8.7 MB", uploadDate: "2024-01-11" },
]

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)

  const fetchFiles = async () => {
    setLoadingFiles(true)
    try {
      const res = await fetch("http://localhost:5000/api/files", {
        headers: {
          Authorization: localStorage.getItem("access_token") || "",
        },
      })
      const data = await res.json()
      setFiles(
        (data.files || []).map((f: any) => ({
          id: f.id,
          name: f.name,
          type: f.mimeType.startsWith("image/") ? "image" : f.mimeType.startsWith("video/") ? "video" : f.mimeType.startsWith("audio/") ? "audio" : f.mimeType.includes("zip") ? "archive" : "document",
          size: f.size ? `${(f.size / 1024 / 1024).toFixed(2)} MB` : "-",
          uploadDate: "-",
          url: f.webViewLink,
        }))
      )
    } catch {
      setFiles([])
    }
    setLoadingFiles(false)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUploadFiles = async (selectedFiles: File[]) => {
    for (const file of selectedFiles) {
      const formData = new FormData()
      formData.append("file", file)
      await store(formData)
    }
    setIsUploadModalOpen(false)
    fetchFiles()
  }

  const handleDeleteFile = async (id: string) => {
    await destroy(Number(id))
    fetchFiles()
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      case "video":
        return <Video className="w-5 h-5 text-red-500" />
      case "audio":
        return <Music className="w-5 h-5 text-purple-500" />
      case "archive":
        return <Archive className="w-5 h-5 text-orange-500" />
      default:
        return <File className="w-5 h-5 text-blue-500" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "video":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "audio":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "archive":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    }
  }

  const handleFileUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: "new-file.pdf",
        type: "document",
        size: "1.2 MB",
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setFiles([newFile, ...files])
      setIsUploading(false)
    }, 2000)
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleDropdown = (fileId: string) => {
    setOpenDropdown(openDropdown === fileId ? null : fileId)
  }

  return (
    <>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadFiles}
      />
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Files</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your cloud storage</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-64 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-white dark:bg-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-accent-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-accent-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              disabled={isUploading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 h-10 px-4 py-2"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Upload
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Files</p>
                  <p className="text-2xl font-bold">{files.length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Storage Used</p>
                  <p className="text-2xl font-bold">32.2 GB</p>
                </div>
                <Upload className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Images</p>
                  <p className="text-2xl font-bold">{files.filter((f) => f.type === "image").length}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Videos</p>
                  <p className="text-2xl font-bold">{files.filter((f) => f.type === "video").length}</p>
                </div>
                <Video className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Files Display */}
        {filteredFiles.length === 0 ? (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center py-12 shadow-sm">
            <div className="p-6">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No files found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Upload your first file to get started"}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"
            }
          >
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-card-foreground shadow-sm group hover:shadow-lg transition-all duration-300 hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25"
              >
                <div className={viewMode === "grid" ? "p-4" : "p-3"}>
                  <div className={viewMode === "grid" ? "space-y-3" : "flex items-center justify-between"}>
                    <div
                      className={
                        viewMode === "grid" ? "flex items-center justify-between" : "flex items-center space-x-3"
                      }
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div className={viewMode === "list" ? "" : "flex-1"}>
                          <p className="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                          {viewMode === "list" && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {file.size} • {file.uploadDate}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(file.id)}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-accent-foreground h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openDropdown === file.id && (
                          <div className="absolute right-0 top-8 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 text-popover-foreground shadow-md">
                            <button
                              onClick={() => setOpenDropdown(null)}
                              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </button>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {viewMode === "grid" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getFileTypeColor(
                              file.type,
                            )}`}
                          >
                            {file.type}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{file.size}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded {file.uploadDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}
      </div>
    </>
  )
}
