"use client"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SocialFeed } from "@/components/social-feed"
import { ImageUploader } from "@/components/image-uploader"
import { CommunityGallery } from "@/components/community-gallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Star, Calendar, Users, Heart, Home } from "lucide-react"
import Image from "next/image"

export default function CantonmentTowersSG60() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header with Singapore theme */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Refresh Application"
                onClick={() => window.location.reload()}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                tabIndex={0}
                title="Refresh Application"
              >
                <Flag className="h-8 w-8 hover:scale-110 transition-transform duration-150" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Cantonment Towers</h1>
                <p className="text-red-100">Blocks 11 - 20 Resident Committee</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">SG60</div>
              <div className="text-red-100">Celebrating 60 Years</div>
            </div>
          </div>
        </div>
      </header>

      {/* SG60 Banner */}
      <section className="relative h-32 bg-gradient-to-r from-red-600 to-red-700 overflow-hidden">
        <div className="absolute inset-0 bg-red-800/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">🇸🇬 SG60 🇸🇬</h2>
            <p className="text-lg">Celebrating Singapore's Diamond Jubilee</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-red-100 text-red-800 mb-4">
                <Star className="h-4 w-4 mr-1" />
                Singapore National Day 2025
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Celebrating 60 Years of Singapore</h2>
              <p className="text-lg text-gray-600 mb-6">
                Join our Cantonment Towers community as we commemorate Singapore{"'"}s remarkable journey from
                independence to becoming a global city-state. Together, we celebrate our shared heritage and bright
                future.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    const eventsSection = document.getElementById("events-section");
                    if (eventsSection) {
                      eventsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Events
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://go.gov.sg/ctrc-wacommunity", "_blank")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Committee
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/cantonment-towers-aerial.png"
                alt="Aerial view of Cantonment Towers residential blocks"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="font-semibold">Community Spirit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Image Uploader Section */}
      <ImageUploader />

      {/* Community Gallery Section */}
      <CommunityGallery />

      {/* Building History Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Heritage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the rich history of Cantonment Towers and how our community has grown alongside Singapore
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-red-600" />
                  Building History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Construction Period</h4>
                    <p className="text-gray-600">
                      Built in the 1980s as part of Singapore{"'"}s public housing development
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Developer</h4>
                    <p className="text-gray-600">Housing & Development Board (HDB)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Architecture</h4>
                    <p className="text-gray-600">Modern tropical design with community spaces and green corridors</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Blocks Coverage</h4>
                    <p className="text-gray-600">Blocks 11-20 housing over 1,000 families</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">1985 - First Residents Move In</p>
                        <p className="text-sm text-gray-600">Initial families settled in Blocks 11-15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">1990 - Resident Committee Formed</p>
                        <p className="text-sm text-gray-600">Official establishment of community leadership</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">2000 - Community Garden Launch</p>
                        <p className="text-sm text-gray-600">Residents create shared green spaces</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">2025 - SG60 Celebrations</p>
                        <p className="text-sm text-gray-600">Community art projects and festivities</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Resident Committee Work */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The Resident Committee works tirelessly to build a harmonious and vibrant community for all residents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Community Events</CardTitle>
                <CardDescription>Bringing neighbors together through celebrations and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• National Day celebrations</li>
                  <li>• Chinese New Year festivities</li>
                  <li>• Deepavali light-up ceremonies</li>
                  <li>• Hari Raya community meals</li>
                  <li>• Mid-Autumn Festival gatherings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Facility Management</CardTitle>
                <CardDescription>Maintaining and improving our shared living spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Playground maintenance</li>
                  <li>• Community garden upkeep</li>
                  <li>• Common area cleaning</li>
                  <li>• Security coordination</li>
                  <li>• Lift and corridor maintenance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Social Programs</CardTitle>
                <CardDescription>Supporting residents through various life stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Senior citizen activities</li>
                  <li>• Youth development programs</li>
                  <li>• Family bonding events</li>
                  <li>• Health and wellness talks</li>
                  <li>• Educational workshops</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <SocialFeed />

      {/* SG60 Special Events */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SG60 Special Events</h2>
            <p className="text-lg text-red-100 max-w-2xl mx-auto">
              Join us in celebrating Singapore{"'"}s Diamond Jubilee with special community activities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Flag Art Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-100">
                  Community collaboration to create a giant Singapore flag using recycled materials
                </p>
                <div className="mt-4 text-xs">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    In Progress
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Heritage Walk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-100">
                  Guided tour showcasing the history and development of our neighborhood
                </p>
                <div className="mt-4 text-xs">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Aug 9, 2025
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Unity Feast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-100">
                  Multi-cultural potluck featuring dishes from all ethnic communities
                </p>
                <div className="mt-4 text-xs">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Aug 10, 2025
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Time Capsule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-100">Residents contribute memories and hopes for future generations</p>
                <div className="mt-4 text-xs">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Ongoing
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                Cantonment Towers Resident Committee
                <br />
                Blocks 11-20
                <br />
                Singapore
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Committee Members</li>
                <li>Event Calendar</li>
                <li>Facility Booking</li>
                <li>Feedback Form</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Our Activities</h3>
              <p className="text-gray-300 text-sm mb-4">Stay updated with community news and events</p>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Join WhatsApp Group
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Cantonment Towers Resident Committee. Celebrating Singapore{"'"}s 60th Anniversary with pride and
              unity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
