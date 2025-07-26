"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Music, Flag, Utensils, DollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  image?: string;
  registrationUrl?: string;
  calendarUrl?: string;
  isActive: boolean;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const res = await fetch(`/api/events?from=${from}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const today = new Date();
  const isToday = (date: string) => {
    const d = new Date(date);
    return d.toDateString() === today.toDateString();
  };
  const isPast = (date: string) => new Date(date) < today;
  const isFuture = (date: string) => new Date(date) > today;

  // Sort events by date ascending
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = sortedEvents.filter(e => isPast(e.date));
  const futureEvents = sortedEvents.filter(e => isFuture(e.date));
  const todayEvents = sortedEvents.filter(e => isToday(e.date));
  const featured = todayEvents.length > 0 ? todayEvents[0] : futureEvents[0];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for these exciting community activities and celebrations
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading events...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Featured Event */}
            {featured && (
              <Card className="overflow-hidden border-2 border-red-200">
                {featured.image && (
                  <div className="relative h-48 bg-red-100">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{featured.title}</CardTitle>
                    <Badge className="bg-red-100 text-red-800">{isToday(featured.date) ? "Today" : "Next"}</Badge>
                  </div>
                  <CardDescription>{featured.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span>{new Date(featured.date).toLocaleDateString("en-SG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                    {featured.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span>{featured.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {featured.registrationUrl && (
                    <Button size="sm" asChild>
                      <a href={featured.registrationUrl} target="_blank" rel="noopener noreferrer">Register Now</a>
                    </Button>
                  )}
                  {featured.calendarUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={featured.calendarUrl} target="_blank" rel="noopener noreferrer">
                        <Calendar className="h-4 w-4 mr-2" />Add to Calendar
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}

            {/* Recent & Past Events */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Recent & Upcoming Activities</h3>
              {sortedEvents.filter(e => !featured || e._id !== featured._id).map(event => {
                const d = new Date(event.date);
                const isPastEvent = isPast(event.date);
                return (
                  <Card className="flex" key={event._id}>
                    <div className={isPastEvent ? "bg-gray-100 w-24 flex-shrink-0 flex flex-col items-center justify-center" : "bg-red-100 w-24 flex-shrink-0 flex flex-col items-center justify-center"}>
                      <span className={isPastEvent ? "text-2xl font-bold text-gray-700" : "text-2xl font-bold text-red-700"}>{d.getDate()}</span>
                      <span className={isPastEvent ? "text-sm text-gray-600" : "text-sm text-red-600"}>{d.toLocaleString("en-SG", { month: "short" })}</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{event.location}</span>
                        </div>
                      )}
                      {isPastEvent && (
                        <Badge variant="outline" className="mt-2 text-xs">Completed</Badge>
                      )}
                      {!isPastEvent && event.registrationUrl && (
                        <Button size="sm" asChild className="mt-2">
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register</a>
                        </Button>
                      )}
                      {!isPastEvent && event.calendarUrl && (
                        <Button variant="outline" size="sm" asChild className="mt-2 ml-2">
                          <a href={event.calendarUrl} target="_blank" rel="noopener noreferrer">
                            <Calendar className="h-4 w-4 mr-2" />Add to Calendar
                          </a>
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
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
        )}
      </div>
    </section>
  );
}
