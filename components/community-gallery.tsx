"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

import { Calendar, User } from "lucide-react"

interface ApprovedImage {
  id: string
  filename: string
  url: string
  caption: string
  uploaderName: string
  uploadedAt: string
  status: "approved"
}

export function CommunityGallery() {
  const [approvedImages, setApprovedImages] = useState<ApprovedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<ApprovedImage | null>(null)

  useEffect(() => {
    async function fetchApprovedImages() {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const apiBase = backendUrl ? backendUrl : '';
      const res = await fetch(`/api/images/approved?page=1&limit=24`);
      if (res.ok) {
        const data = await res.json();
        setApprovedImages(data.images || []);
      }
    }
    fetchApprovedImages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Photo Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the vibrant moments and memories shared by our Cantonment Towers community
          </p>
        </div>

        {approvedImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos yet</h3>
            <p className="text-gray-500">Be the first to share a community moment!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {approvedImages.map((image) => (
              <Card
                key={image.id}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-48">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-800 mb-3 line-clamp-2">{image.caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{image.uploaderName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(image.uploadedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            role="button"
            tabIndex={0}
            aria-label="Close image modal"
            onClick={() => setSelectedImage(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                setSelectedImage(null);
              }
            }}
          >
            <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{selectedImage.caption}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Shared by {selectedImage.uploaderName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedImage.uploadedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
