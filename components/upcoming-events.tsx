import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Music, Flag, Utensils, DollarSign, ExternalLink } from "lucide-react"
import Link from "next/link"

export function UpcomingEvents() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for these exciting community activities and celebrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured Event */}
          <Card className="overflow-hidden border-2 border-red-200">
            <div className="relative h-48 bg-red-100">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold">SG60 PICNIC</h3>
                  <p className="text-xl">@ KIM PONG PARK</p>
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>National Day Community Picnic</CardTitle>
                <Badge className="bg-red-100 text-red-800">Featured</Badge>
              </div>
              <CardDescription>Flag-raising ceremony, live band & local snacks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <span>Saturday, 9 August 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span>9:00 AM - 11:30 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span>Kim Pong Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <span>$5 per person</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium mb-2">Event Highlights:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Flag-raising</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Live band</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Local snacks</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button size="sm">Register Now</Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </CardFooter>
          </Card>

          {/* Recent & Past Events */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recent & Upcoming Activities</h3>

            <Card className="flex">
              <div className="bg-red-100 w-24 flex-shrink-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-red-700">15</span>
                <span className="text-sm text-red-600">Jul</span>
              </div>
              <div className="p-4">
                <h4 className="font-medium">Community Garden Planting Day</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Join us to plant new herbs and vegetables in our community garden
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">Block 15 Garden Area</span>
                </div>
              </div>
            </Card>

            <Card className="flex">
              <div className="bg-gray-100 w-24 flex-shrink-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">28</span>
                <span className="text-sm text-gray-600">Jun</span>
              </div>
              <div className="p-4">
                <h4 className="font-medium">Senior Citizens Health Talk</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Health screening and wellness tips for our elderly residents
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Completed
                </Badge>
              </div>
            </Card>

            <Card className="flex">
              <div className="bg-gray-100 w-24 flex-shrink-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">12</span>
                <span className="text-sm text-gray-600">Jun</span>
              </div>
              <div className="p-4">
                <h4 className="font-medium">Youth Day Sports Competition</h4>
                <p className="text-sm text-gray-600 mt-1">Basketball and badminton tournaments for teenagers</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Completed
                </Badge>
              </div>
            </Card>

            <div className="text-center mt-6">
              <Link
                href="https://www.facebook.com/share/15g4W3eCmc/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
              >
                View all events on our Facebook page
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
