import { UpcomingEvents } from "@/components/upcoming-events"
import { SocialFeed } from "@/components/social-feed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Star, Calendar, Users, Heart, Home } from "lucide-react"
import Image from "next/image"

export function ClassicTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header with Singapore theme */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Flag className="h-8 w-8" />
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
                Join our Cantonment Towers community as we commemorate Singapore's remarkable journey from independence
                to becoming a global city-state. Together, we celebrate our shared heritage and bright future.
              </p>
              <div className="flex gap-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Events
                </Button>
                <Button variant="outline">
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
                      Built in the 1980s as part of Singapore's public housing development
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
              <Image
                src="/images/cantonment-towers-aerial.png"
                alt="Cantonment Towers residential blocks aerial view"
                width={500}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
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

      {/* Community Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Life</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capturing the vibrant moments and activities that make our community special
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/community-garden.png"
                alt="Residents working in community garden"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Community Garden</h3>
                  <p className="text-sm">Growing together, harvesting friendships</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/national-day-celebration.png"
                alt="National Day celebration in void deck"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">National Day Celebrations</h3>
                  <p className="text-sm">Unity in diversity, celebrating as one</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/flag-art.jpg"
                alt="Community flag art project"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">SG60 Flag Art</h3>
                  <p className="text-sm">Creating memories for our nation's milestone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <SocialFeed />

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
              © 2025 Cantonment Towers Resident Committee. Celebrating Singapore's 60th Anniversary with pride and
              unity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
