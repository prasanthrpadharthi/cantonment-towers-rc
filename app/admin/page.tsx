"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, XCircle, Clock, Trash2, RotateCcw, User, Calendar, Eye } from "lucide-react"

interface CommunityImage {
  id: string
  filename: string
  url: string
  caption: string
  uploaderName: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [images, setImages] = useState<CommunityImage[]>([])
  const [selectedImage, setSelectedImage] = useState<CommunityImage | null>(null)

  useEffect(() => {
    if (isLoggedIn) {
      loadImages()
    }
  }, [isLoggedIn])

  const loadImages = () => {
    const storedImages = JSON.parse(localStorage.getItem("communityImages") || "[]")
    setImages(storedImages)
  }

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Invalid credentials. Use 'admin' for both username and password.")
    }
  }

  const updateImageStatus = (imageId: string, newStatus: "approved" | "rejected" | "pending") => {
    const updatedImages = images.map((img) => (img.id === imageId ? { ...img, status: newStatus } : img))
    setImages(updatedImages)
    localStorage.setItem("communityImages", JSON.stringify(updatedImages))
  }

  const deleteImage = (imageId: string) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)
    localStorage.setItem("communityImages", JSON.stringify(updatedImages))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const ImageCard = ({ image }: { image: CommunityImage }) => (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img src={image.url || "/placeholder.svg"} alt={image.caption} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">{getStatusBadge(image.status)}</div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-800 mb-3 line-clamp-2">{image.caption}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{image.uploaderName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(image.uploadDate)}</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => setSelectedImage(image)} className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>

          {image.status === "pending" && (
            <>
              <Button
                size="sm"
                onClick={() => updateImageStatus(image.id, "approved")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                onClick={() => updateImageStatus(image.id, "rejected")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </>
          )}

          {image.status === "approved" && (
            <Button
              size="sm"
              onClick={() => updateImageStatus(image.id, "rejected")}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <XCircle className="h-3 w-3 mr-1" />
              Reject
            </Button>
          )}

          {image.status === "rejected" && (
            <Button
              size="sm"
              onClick={() => updateImageStatus(image.id, "pending")}
              variant="outline"
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Review
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => deleteImage(image.id)}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <div className="text-xs text-gray-500 text-center">Demo credentials: admin / admin</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pendingImages = images.filter((img) => img.status === "pending")
  const approvedImages = images.filter((img) => img.status === "approved")
  const rejectedImages = images.filter((img) => img.status === "rejected")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Community Gallery Admin
            </h1>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingImages.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedImages.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedImages.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Management Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingImages.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({approvedImages.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected ({rejectedImages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingImages.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No pending images</h3>
                <p className="text-gray-500">All images have been reviewed!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedImages.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No approved images</h3>
                <p className="text-gray-500">Approved images will appear here.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedImages.length === 0 ? (
              <div className="text-center py-12">
                <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No rejected images</h3>
                <p className="text-gray-500">Rejected images will appear here.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.caption}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{selectedImage.caption}</h3>
                {getStatusBadge(selectedImage.status)}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Uploaded by {selectedImage.uploaderName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedImage.uploadDate)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedImage.status === "pending" && (
                  <>
                    <Button
                      onClick={() => {
                        updateImageStatus(selectedImage.id, "approved")
                        setSelectedImage(null)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        updateImageStatus(selectedImage.id, "rejected")
                        setSelectedImage(null)
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    deleteImage(selectedImage.id)
                    setSelectedImage(null)
                  }}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
