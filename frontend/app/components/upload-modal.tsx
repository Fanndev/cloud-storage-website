"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, X, type File, Check, AlertCircle } from "lucide-react"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: File[]) => void
}

interface FileUpload {
  file: File
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  id: string
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploads, setUploads] = useState<FileUpload[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (files: File[]) => {
    const newUploads: FileUpload[] = files.map((file) => ({
      file,
      progress: 0,
      status: "pending",
      id: Math.random().toString(36).substr(2, 9),
    }))

    setUploads((prev) => [...prev, ...newUploads])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const simulateUpload = async (uploadItem: FileUpload) => {
    setUploads((prev) => prev.map((item) => (item.id === uploadItem.id ? { ...item, status: "uploading" } : item)))

    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploads((prev) => prev.map((item) => (item.id === uploadItem.id ? { ...item, progress } : item)))
    }

    const success = Math.random() > 0.1
    setUploads((prev) =>
      prev.map((item) => (item.id === uploadItem.id ? { ...item, status: success ? "success" : "error" } : item)),
    )
  }

  const startUpload = async () => {
    setIsUploading(true)
    const pendingUploads = uploads.filter((upload) => upload.status === "pending")

    await Promise.all(pendingUploads.map(simulateUpload))

    setIsUploading(false)

    const successfulFiles = uploads.filter((upload) => upload.status === "success").map((upload) => upload.file)

    if (successfulFiles.length > 0) {
      onUpload(successfulFiles)
    }
  }

  const removeFile = (id: string) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== id))
  }

  const clearAll = () => {
    setUploads([])
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return "🖼️"
    if (file.type.startsWith("video/")) return "🎥"
    if (file.type.startsWith("audio/")) return "🎵"
    if (file.type.includes("pdf")) return "📄"
    return "📁"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Files</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Drop files here or click to browse</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Support for images, videos, documents, and more</p>
          </div>

          {/* File List */}
          {uploads.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Files ({uploads.length})</h3>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploads.map((upload) => (
                  <div
                    key={upload.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="text-2xl">{getFileIcon(upload.file)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{upload.file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(upload.file.size)}</p>
                      {upload.status === "uploading" && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Uploading...</span>
                            <span>{upload.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${upload.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {upload.status === "success" && <Check className="w-5 h-5 text-green-500" />}
                      {upload.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                      {upload.status === "pending" && (
                        <button
                          onClick={() => removeFile(upload.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {uploads.length > 0 && (
              <span>
                {uploads.filter((u) => u.status === "success").length} of {uploads.length} uploaded
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startUpload}
              disabled={uploads.length === 0 || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isUploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
