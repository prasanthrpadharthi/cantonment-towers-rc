"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Camera, CheckCircle, AlertCircle } from "lucide-react"

interface UploadedImage {
  id: string
  filename: string
  url: string
  caption: string
  uploaderName: string
  uploadedAt: string
  status: "pending" | "approved" | "rejected"
}

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [uploaderName, setUploaderName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !caption.trim() || !uploaderName.trim()) {
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")

    try {
      // Upload to backend API
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("caption", caption);
      formData.append("uploaderName", uploaderName);


      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "/api";
      const response = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      const newImage: UploadedImage = {
        id: data.id,
        filename: selectedFile.name,
        url: data.url,
        caption: caption,
        uploaderName: uploaderName,
        uploadedAt: new Date().toISOString(),
        status: "pending",
      };

      setUploadStatus("success");

      // Reset form
      setSelectedFile(null);
      setCaption("");
      setUploaderName("");
      setPreviewUrl(null);

      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Community Moments</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload photos from community events, celebrations, and daily life at Cantonment Towers. All images will be
            reviewed before appearing in our gallery.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Upload Community Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div>
                <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
                  Select Image
                </Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to select an image or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {previewUrl && (
                <div className="relative">
                  <Label className="block text-sm font-medium mb-2">Preview</Label>
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* Caption */}
              <div>
                <Label htmlFor="caption" className="block text-sm font-medium mb-2">
                  Photo Caption *
                </Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe what's happening in this photo..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Uploader Name */}
              <div>
                <Label htmlFor="uploader-name" className="block text-sm font-medium mb-2">
                  Your Name *
                </Label>
                <Input
                  id="uploader-name"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Upload Status */}
              {uploadStatus === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Photo uploaded successfully! It will be reviewed before appearing in the gallery.
                  </span>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">Please fill in all required fields and select an image.</span>
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile || !caption.trim() || !uploaderName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </>
                )}
              </Button>

              {/* Guidelines */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Photos should be related to Cantonment Towers community</li>
                  <li>• Ensure you have permission to share photos with people in them</li>
                  <li>• No inappropriate or offensive content</li>
                  <li>• Images will be reviewed by admins before publication</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
