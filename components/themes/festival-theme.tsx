import { UpcomingEvents } from "@/components/upcoming-events"
import { SocialFeed } from "@/components/social-feed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PartyPopper, Star, Calendar, Users, Heart, Home, Sparkles } from "lucide-react"
import Image from "next/image"

export function FestivalTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Festival Header */}
      <header className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute top-8 right-8 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-100"></div>
          <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-bounce delay-200"></div>
          <div className="absolute bottom-4 right-1/3 w-5 h-5 bg-white/15 rounded-full animate-bounce delay-300"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full animate-pulse">
                <PartyPopper className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold animate-pulse">🎉 Cantonment Towers 🎊</h1>
                <p className="text-orange-100">Festival Community • Blocks 11-20</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold animate-bounce">🇸🇬 SG60 🇸🇬</div>
              <div className="text-orange-100">Diamond Celebration!</div>
            </div>
          </div>
        </div>
      </header>

      {/* Festival Banner */}
      <section className="relative h-36 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 viewBox=0 0 40 40 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Cpath d=M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20-16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16z/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 animate-spin" />
              <h2 className="text-4xl font-bold">🎊 SG60 FESTIVAL 🎊</h2>
              <Sparkles className="h-6 w-6 animate-spin" />
            </div>
            <p className="text-lg animate-pulse">Singapore's Biggest Birthday Party!</p>
          </div>
        </div>
      </section>

      {/* Festival Hero Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 via-orange-100/50 to-red-100/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 mb-4 animate-pulse">
                <Star className="h-4 w-4 mr-1" />🎉 Singapore National Day Festival 2025 🎉
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🎊 Celebrating 60 Years of
                <span className="text-red-600"> Singapore! </span>🎊
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Join the biggest community celebration at Cantonment Towers! 🏠✨ Experience the joy, unity, and festive
                spirit as we commemorate Singapore's incredible 60-year journey with music, food, games, and
                unforgettable memories! 🎵🍜🎮
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse">
                  <Calendar className="h-4 w-4 mr-2" />🎪 Join the Festival!
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Users className="h-4 w-4 mr-2" />🤝 Be a Volunteer
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-lg blur-lg opacity-30 animate-pulse"></div>
              <Image
                src="/images/cantonment-towers-aerial.png"
                alt="Festival at Cantonment Towers"
                width={600}
                height={400}
                className="relative rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-yellow-300">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                  <span className="font-semibold">🎉 Festival Spirit!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Events */}
      <UpcomingEvents />

      {/* Festival Heritage */}
      <section className="py-12 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🏛️ Our Festive Heritage 🏛️</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the colorful history of celebrations and festivals at Cantonment Towers! 🎨🎭
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Home className="h-5 w-5" />🏠 Festival Building History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-gray-900">🎪 Festival Grounds</h4>
                    <p className="text-gray-600">Built with spacious void decks perfect for community celebrations</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-900">🎵 Music & Performance Areas</h4>
                    <p className="text-gray-600">Dedicated spaces for cultural performances and live entertainment</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-gray-900">🍜 Food Festival Zones</h4>
                    <p className="text-gray-600">Community kitchens and dining areas for multicultural feasts</p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-lg border border-pink-200">
                    <h4 className="font-semibold text-gray-900">🎨 Art & Craft Corners</h4>
                    <p className="text-gray-600">Creative spaces for community art projects and workshops</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg blur opacity-30"></div>
                <Image
                  src="/images/cantonment-towers-aerial.png"
                  alt="Festival venues at Cantonment Towers"
                  width={500}
                  height={300}
                  className="relative rounded-lg shadow-lg w-full"
                />
              </div>
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
                <CardHeader>
                  <CardTitle>🎊 Festival Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="font-medium">🎉 1990 - First Community Festival</p>
                        <p className="text-sm text-gray-600">Inaugural celebration bringing all residents together</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="font-medium">🎭 2000 - Cultural Festival Launch</p>
                        <p className="text-sm text-gray-600">Annual multicultural celebration begins</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="font-medium">🎪 2015 - Festival Committee Formed</p>
                        <p className="text-sm text-gray-600">Dedicated team for organizing community celebrations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="font-medium">🎊 2025 - SG60 Mega Festival</p>
                        <p className="text-sm text-gray-600">Biggest celebration in community history!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎨 Festival Moments 🎨</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capturing the joy, laughter, and unforgettable memories from our community celebrations! 📸✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg border-4 border-yellow-300">
              <Image
                src="/images/community-garden.png"
                alt="Festival garden party"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">🌻 Garden Festival</h3>
                  <p className="text-sm">Blooming celebrations in our community garden!</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg border-4 border-red-300">
              <Image
                src="/images/national-day-celebration.png"
                alt="National Day festival celebration"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">🇸🇬 National Day Fiesta</h3>
                  <p className="text-sm">Patriotic celebrations with music and dance!</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg border-4 border-orange-300">
              <Image
                src="/images/flag-art.jpg"
                alt="Festival flag art creation"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">🎨 Festival Art Creation</h3>
                  <p className="text-sm">Community coming together to create magic!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <SocialFeed />

      {/* Festival Footer */}
      <footer className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🎪 Festival Headquarters</h3>
              <p className="text-orange-100 text-sm">
                Cantonment Towers Festival Community
                <br />🏠 Blocks 11-20
                <br />
                🇸🇬 Singapore
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">🎉 Festival Services</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>🎵 Live Entertainment Booking</li>
                <li>🍜 Community Feast Planning</li>
                <li>🎨 Art & Craft Workshops</li>
                <li>🎪 Event Space Reservations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">🤝 Join the Celebration</h3>
              <p className="text-orange-100 text-sm mb-4">Be part of our festive community spirit!</p>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-orange-600 bg-transparent animate-pulse"
              >
                🎊 Join Festival Group
              </Button>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-orange-100 text-sm">
              🎉 © 2025 Cantonment Towers Festival Community. Celebrating Singapore's 60th with joy and unity! 🎊
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
