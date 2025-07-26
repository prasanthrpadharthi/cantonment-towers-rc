"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  createdAt: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Event>>({});
  const [editingId, setEditingId] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const PAGE_SIZE = 12;

  useEffect(() => {
    fetchEvents();
  }, [page]);

  async function fetchEvents() {
    setIsLoading(true);
    const res = await fetch(`/api/events/all?page=${page}&limit=${PAGE_SIZE}`);
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events);
      setTotal(data.total);
    }
    setIsLoading(false);
  }

  function handleEdit(event: Event) {
    setForm(event);
    setEditingId(event._id);
    setShowForm(true);
  }

  function handleNew() {
    setForm({});
    setEditingId(null);
    setShowForm(true);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Submitting form", form);
    
    setIsLoading(true);
    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `/api/events/${editingId}` : "/api/events";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({});
      setEditingId(null);
      fetchEvents();
    }
    setIsLoading(false);
  }

  async function handleDisable(id: string) {
    setIsLoading(true);
    await fetch(`/api/events/${id}/disable`, { method: "PATCH" });
    fetchEvents();
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Button onClick={handleNew}>New Event</Button>
      </div>
      {showForm && (
        <form className="bg-white p-6 rounded shadow mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <Input value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <Textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Date</label>
            <Input type="date" value={form.date ? form.date.slice(0,10) : ""} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Location</label>
            <Input value={form.location || ""} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Image URL</label>
            <Input value={form.image || ""} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Registration URL</label>
            <Input value={form.registrationUrl || ""} onChange={e => setForm(f => ({ ...f, registrationUrl: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Calendar URL</label>
            <Input value={form.calendarUrl || ""} onChange={e => setForm(f => ({ ...f, calendarUrl: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>{editingId ? "Update" : "Create"}</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm({}); setEditingId(null); }}>Cancel</Button>
          </div>
        </form>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event._id} className="relative">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-gray-600">{event.date ? new Date(event.date).toLocaleString() : ""}</div>
              <div className="mb-2">{event.description}</div>
              <div className="mb-2 text-xs text-gray-500">{event.location}</div>
              {event.image && <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded mb-2" />}
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>Edit</Button>
                {event.isActive && new Date(event.date) > new Date() && (
                  <Button size="sm" variant="destructive" onClick={() => handleDisable(event._id)}>Disable</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div className="flex justify-center gap-2 mt-8">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
          <span className="px-2 text-sm">Page {page} of {Math.ceil(total / PAGE_SIZE)}</span>
          <Button size="sm" variant="outline" disabled={page === Math.ceil(total / PAGE_SIZE)} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
