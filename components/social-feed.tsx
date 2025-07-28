import { Card, CardContent } from "@/components/ui/card"
import { Facebook, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SocialFeed() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with the latest happenings at Cantonment Towers
          </p>
          <Link
            href="https://www.facebook.com/share/15g4W3eCmc/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
          >
            <Facebook className="h-5 w-5 mr-2" />
            Follow our Facebook Page
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Facebook Post 1 */}
          <Card className="overflow-hidden">
            <div className="bg-blue-50 p-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  <Image
                    src="/images/rc.jpeg"
                    alt="Cantonment Towers"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Cantonment Towers Residents</p>
                  <p className="text-xs text-gray-500">July 20, 2025</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm">
                Our community garden is thriving! 🌱 Thanks to all residents who joined our planting session. The herbs
                and vegetables are growing beautifully, bringing our neighborhood closer together. Next session: July
                28th at 9 AM!
              </p>
              <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/images/community-garden.png"
                  alt="Community garden activities"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>24</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>8 comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>3 shares</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Post 2 */}
          <Card className="overflow-hidden">
            <div className="bg-blue-50 p-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  <Image
                    src="/images/rc.jpeg"
                    alt="Cantonment Towers"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Cantonment Towers Residents</p>
                  <p className="text-xs text-gray-500">July 15, 2025</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm">
                📢 <strong>EVENT ANNOUNCEMENT</strong>
                <br />
                SG60 PICNIC @ KIM PONG PARK
                <br />
                Join us for flag-raising ceremony, live band, and local snacks!
                <br />📅 Sat, 9 Aug 2025
                <br />🕒 9-11:30am
                <br />💰 $5 per person
                <br />
                <br />
                Register at the RC office by August 1st. Limited spots available!
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>36</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>12 comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>7 shares</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Post 3 */}
          <Card className="overflow-hidden">
            <div className="bg-blue-50 p-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  <Image
                    src="/images/rc.jpeg"
                    alt="Cantonment Towers"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Cantonment Towers Residents</p>
                  <p className="text-xs text-gray-500">July 5, 2025</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm">
                Our community garden is thriving! 🌱 Thanks to all the volunteers who helped with planting last month.
                The herbs and vegetables are growing beautifully. Join us for the next gardening session on July 15th.
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>18</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>5 comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>2 shares</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link
            href="https://www.facebook.com/share/15g4W3eCmc/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <Facebook className="h-4 w-4 mr-2" />
            See More on Facebook
          </Link>
        </div>
      </div>
    </section>
  )
}
