"use client"
import { useRef, useState } from "react";
import { store } from "@/app/actions/upload/action";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const formData = new FormData();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setMessage("Please select a file.");
      setLoading(false);
      return;
    }
    formData.append("file", file);
    const result = await store(formData);
    if (result?.fileId) {
      setMessage("File uploaded successfully!");
    } else {
      setMessage(result?.message || "Upload failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-sm text-red-500">{message}</div>}
    </div>
  );
} 