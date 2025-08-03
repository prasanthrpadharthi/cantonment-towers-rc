"use client"
import { Analytics } from "@vercel/analytics/next"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, XCircle, Clock, Trash2, RotateCcw, User, Calendar, Eye, RefreshCw, Loader2 } from "lucide-react"

interface CommunityImage {
  _id: string
  uniqueName: string
  url: string
  caption: string
  uploader: string
  uploadedAt: string
  status: "pending" | "approved" | "rejected" | "blocked"
  blockComment?: string
}


export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<CommunityImage | null>(null)

  // Pagination and images state for each status
  const [pendingImages, setPendingImages] = useState<CommunityImage[]>([])
  const [pendingPage, setPendingPage] = useState(1)
  const [pendingTotal, setPendingTotal] = useState(0)

  const [approvedImages, setApprovedImages] = useState<CommunityImage[]>([])
  const [approvedPage, setApprovedPage] = useState(1)
  const [approvedTotal, setApprovedTotal] = useState(0)

  const [rejectedImages, setRejectedImages] = useState<CommunityImage[]>([])
  const [rejectedPage, setRejectedPage] = useState(1)
  const [rejectedTotal, setRejectedTotal] = useState(0)

  const [blockedImages, setBlockedImages] = useState<CommunityImage[]>([])
  const [blockedPage, setBlockedPage] = useState(1)
  const [blockedTotal, setBlockedTotal] = useState(0)
  const [blockModal, setBlockModal] = useState<{ open: boolean, image: CommunityImage | null }>({ open: false, image: null })
  const [blockComment, setBlockComment] = useState("")
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'blocked'>('pending')
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const PAGE_SIZE = 12;

  // Fetch images for a given status and page
  const fetchImages = async (status: 'pending' | 'approved' | 'rejected' | 'blocked', page: number, showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const res = await fetch(`/api/images-paginated?page=${page}&limit=${PAGE_SIZE}&status=${status}&_=${Date.now()}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
        },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      if (status === 'pending') {
        setPendingImages(data.images);
        setPendingTotal(data.total || 0);
      } else if (status === 'approved') {
        setApprovedImages(data.images);
        setApprovedTotal(data.total || 0);
      } else if (status === 'rejected') {
        setRejectedImages(data.images);
        setRejectedTotal(data.total || 0);
      } else if (status === 'blocked') {
        setBlockedImages(data.images);
        setBlockedTotal(data.total || 0);
      }
    } catch (err) {
      if (status === 'pending') {
        setPendingImages([]);
        setPendingTotal(0);
      } else if (status === 'approved') {
        setApprovedImages([]);
        setApprovedTotal(0);
      } else if (status === 'rejected') {
        setRejectedImages([]);
        setRejectedTotal(0);
      } else if (status === 'blocked') {
        setBlockedImages([]);
        setBlockedTotal(0);
      }
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  // Fetch all tabs
  const refreshAllTabs = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchImages('pending', pendingPage, false),
      fetchImages('approved', approvedPage, false),
      fetchImages('rejected', rejectedPage, false),
      fetchImages('blocked', blockedPage, false),
    ]);
    setIsLoading(false);
  };

  // Fetch images when logged in or page/tab changes
  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      setToken(stored);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    refreshAllTabs();
  }, [isLoggedIn, token, pendingPage, approvedPage, rejectedPage, blockedPage]);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setIsLoggedIn(true);
        setLoginError("");
        localStorage.setItem("adminToken", data.token);
      } else {
        setLoginError("Invalid credentials.");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    }
  }


  const updateImageStatus = async (imageId: string, newStatus: "approved" | "rejected" | "pending") => {
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/images/${imageId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        body: JSON.stringify({ status: newStatus }),
      });
      console.log("Updating image status:", imageId, newStatus, token);
      if (!res.ok) throw new Error("Failed to update status");
      await refreshAllTabs();
    } catch (err) {
      // Optionally show error
    } finally {
      setIsActionLoading(false);
    }
  };

  // Optionally implement delete API call if needed
  const blockImage = (image: CommunityImage) => {
    setBlockModal({ open: true, image });
    setBlockComment("");
  };

  const confirmBlockImage = async () => {
    if (!blockModal.image) return;
    setIsActionLoading(true);
    try {
      const res = await fetch(`/api/images/${blockModal.image._id}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
        body: JSON.stringify({ comment: blockComment }),
      });
      if (!res.ok) throw new Error("Failed to block image");
      setBlockModal({ open: false, image: null });
      setBlockComment("");
      await refreshAllTabs();
    } catch (err) {
      // Optionally show error
    } finally {
      setIsActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Try to parse if it's a MongoDB date object
      try {
        const parsed = new Date(Number(dateString));
        if (!isNaN(parsed.getTime())) return parsed.toLocaleString("en-SG");
      } catch {}
      return "-";
    }
    return date.toLocaleString("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
            <span>{image.uploader}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(image.uploadedAt)}</span>
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
                onClick={() => updateImageStatus(image._id, "approved")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                onClick={() => updateImageStatus(image._id, "rejected")}
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
              onClick={() => updateImageStatus(image._id, "rejected")}
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
              onClick={() => updateImageStatus(image._id, "pending")}
              variant="outline"
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Review
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => blockImage(image)}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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



  // Pagination controls
  const renderPagination = (page: number, total: number, setPage: (p: number) => void) => {
    const totalPages = Math.ceil(total / PAGE_SIZE);
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center gap-2 mt-6">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="px-2 text-sm">Page {page} of {totalPages}</span>
        <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    );
  };

  return (
    <>
      <Analytics />
      <div className="min-h-screen bg-gray-50">
        {/* Global Loader */}
        {(isLoading || isActionLoading) && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        )}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Community Gallery Admin
            </h1>
            <div className="flex gap-2 items-center">
              <a href="/admin/events" className="text-blue-600 font-medium hover:underline">Events</a>
              <Button onClick={refreshAllTabs} variant="outline" size="sm" disabled={isLoading || isActionLoading}>
                <RefreshCw className={isLoading ? "animate-spin h-4 w-4 mr-2" : "h-4 w-4 mr-2"} />
                Refresh
              </Button>
              <Button onClick={() => {
                setIsLoggedIn(false);
                setToken(null);
                localStorage.removeItem("adminToken");
              }} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
        </header>
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
        <Tabs defaultValue="pending" value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingTotal})
            </TabsTrigger>
            <TabsTrigger value="blocked" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Blocked ({blockedTotal})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({approvedTotal})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected ({rejectedTotal})
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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingImages.map((image) => (
                    <ImageCard key={image._id} image={image} />
                  ))}
                </div>
                {renderPagination(pendingPage, pendingTotal, setPendingPage)}
              </>
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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedImages.map((image) => (
                    <ImageCard key={image._id} image={image} />
                  ))}
                </div>
                {renderPagination(approvedPage, approvedTotal, setApprovedPage)}
              </>
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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rejectedImages.map((image) => (
                    <ImageCard key={image._id} image={image} />
                  ))}
                </div>
                {renderPagination(rejectedPage, rejectedTotal, setRejectedPage)}
              </>
            )}
          </TabsContent>
          <TabsContent value="blocked">
            {blockedImages.length === 0 ? (
              <div className="text-center py-12">
                <Trash2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No blocked images</h3>
                <p className="text-gray-500">Blocked images will appear here.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blockedImages.map((image) => (
                  <Card key={image._id} className="overflow-hidden border-red-400 border-2">
                    <div className="relative h-48">
                      <img src={image.url || "/placeholder.svg"} alt={image.caption} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="text-red-600 border-red-600">Blocked</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-800 mb-3 line-clamp-2">{image.caption}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{image.uploader}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(image.uploadedAt)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-red-700 mt-2">
                        <strong>Block Reason:</strong> {image.blockComment || "-"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {renderPagination(blockedPage, blockedTotal, setBlockedPage)}
          </TabsContent>
      {/* Block Modal */}
      {blockModal.open && blockModal.image && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Block Image</h3>
            <p className="mb-2">Please provide a reason for blocking this image:</p>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              value={blockComment}
              onChange={e => setBlockComment(e.target.value)}
              placeholder="Enter reason for blocking..."
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBlockModal({ open: false, image: null })}>Cancel</Button>
              <Button onClick={confirmBlockImage} disabled={isActionLoading || !blockComment.trim()} className="bg-red-600 hover:bg-red-700 text-white">
                {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Block
              </Button>
            </div>
          </div>
        </div>
      )}
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
                <span>Uploaded by {selectedImage.uploader}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(selectedImage.uploadedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {selectedImage.status === "pending" && (
                <>
                  <Button
                    onClick={() => {
                      updateImageStatus(selectedImage._id, "approved")
                      setSelectedImage(null)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      updateImageStatus(selectedImage._id, "rejected")
                      setSelectedImage(null)
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
