import { UpcomingEvents } from "@/components/upcoming-events";
import { SocialFeed } from "@/components/social-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Sparkles, Calendar, Users, Heart, Home } from "lucide-react";
import Image from "next/image";

export function ModernTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd" fill="#ffffff" fillOpacity="0.05" cx="30" cy="30" r="2" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Cantonment Towers
                </h1>
                <p className="text-blue-200">Modern Community Living • Blocks 11-20</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                SG60
              </div>
              <div className="text-blue-200">Diamond Jubilee</div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern SG60 Banner */}
      <section className="relative h-40 bg-gradient-to-r from-red-500 via-red-600 to-red-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Sparkles className="h-8 w-8 animate-pulse" />
              <h2 className="text-5xl font-bold">SG60</h2>
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
            <p className="text-xl font-light">Singapore's Diamond Jubilee Celebration</p>
          </div>
        </div>
      </section>
      {/* ...existing code... */}

      {/* Modern Hero Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 mb-6 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Singapore National Day 2025
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                60 Years of
                <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"> Singapore</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of community living at Cantonment Towers. Join us as we celebrate Singapore's
                incredible journey from independence to becoming a world-class smart nation.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Explore Events
                </Button>
                <Button className="border-2 px-8 py-3 text-lg bg-transparent">
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-lg opacity-20"></div>
              <Image
                src="/images/cantonment-towers-aerial.png"
                alt="Modern view of Cantonment Towers"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <span className="font-semibold text-lg">Smart Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Events */}
      <UpcomingEvents />

      {/* Modern Heritage Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Digital Heritage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Cantonment Towers has evolved alongside Singapore's digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  Smart Building Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Digital Infrastructure</h4>
                    <p className="text-gray-600">Fiber-optic connectivity and smart home integration throughout all blocks</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Sustainable Living</h4>
                    <p className="text-gray-600">Solar panels, rainwater harvesting, and energy-efficient systems</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Community Tech</h4>
                    <p className="text-gray-600">Digital notice boards, mobile app integration, and smart facilities booking</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-20"></div>
                <Image
                  src="/images/cantonment-towers-aerial.png"
                  alt="Smart community features"
                  width={500}
                  height={300}
                  className="relative rounded-xl shadow-lg w-full"
                />
              </div>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Innovation Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">2020 - Smart Nation Integration</p>
                        <p className="text-sm text-gray-600">Digital transformation initiatives launched</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">2022 - Green Building Certification</p>
                        <p className="text-sm text-gray-600">Achieved BCA Green Mark Gold Plus status</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-red-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">2025 - SG60 Digital Celebrations</p>
                        <p className="text-sm text-gray-600">Virtual reality heritage tours and digital art installations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Community Innovation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing our smart community initiatives and digital lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/community-garden.png"
                alt="Smart community garden with IoT sensors"
                width={400}
                height={300}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-semibold text-lg">Smart Garden</h3>
                  <p className="text-sm">IoT-enabled urban farming with automated irrigation</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/national-day-celebration.png"
                alt="Digital National Day celebration"
                width={400}
                height={300}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-semibold text-lg">Digital Celebrations</h3>
                  <p className="text-sm">Hybrid events with live streaming and AR experiences</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/flag-art.jpg"
                alt="Digital flag art installation"
                width={400}
                height={300}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="font-semibold text-lg">Interactive Art</h3>
                  <p className="text-sm">Community-created digital art with QR code stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <SocialFeed />

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
              <p className="text-blue-200 mb-4">
                Cantonment Towers Smart Community<br />
                Blocks 11-20<br />
                Singapore
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Smart Services</h3>
              <ul className="space-y-3 text-blue-200">
                <li>• Digital Committee Portal</li>
                <li>• Smart Facility Booking</li>
                <li>• Virtual Event Calendar</li>
                <li>• AI-Powered Feedback System</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Stay Connected</h3>
              <p className="text-blue-200 mb-6">Join our digital community ecosystem</p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Download Community App
              </Button>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-blue-200">
              © 2025 Cantonment Towers Smart Community. Celebrating Singapore's digital future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
