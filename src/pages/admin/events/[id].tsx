'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Save, X, Upload, Calendar, MapPin, Users } from 'lucide-react';

// Mock data (replace with real API later)
const getEventById = (id: string) => {
  const events: Record<string, any> = {
    '1': {
      id: '1',
      title: 'agriFood Nigeria 2025 Exhibition',
      date: '2025-03-03', // YYYY-MM-DD for input
      time: '09:00',
      location: 'Lagos State Event Center',
      isOnline: false,
      description: 'Join us for the premier agricultural exhibition featuring livestock innovations, networking opportunities, and the latest in agro-technology.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
      expectedAttendees: 1500,
      status: 'Approved',
    },
    '2': {
      id: '2',
      title: 'Sustainable Poultry Farming Workshop',
      date: '2025-06-17',
      time: '14:00',
      location: 'Online (Zoom)',
      isOnline: true,
      description: 'Learn cost-effective and eco-friendly poultry practices from industry experts.',
      image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&h=600&fit=crop',
      expectedAttendees: 300,
      status: 'Pending',
    },
    // Add more as needed
  };
  return events[id] || null;
};

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const event = getEventById(id);
    if (event) {
      setFormData(event);
      setPreviewImage(event.image);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading event...</div>;
  }

  if (!formData) {
    return <div className="p-8 text-center text-red-600">Event not found</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated event:', formData);
    alert('Event updated successfully!');
    // In real app: send to API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-600 mt-2">Update event details and approve/reject if needed</p>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Event Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-green-500 outline-none pb-4"
                placeholder="Enter event title"
              />
            </div>

            {/* Date, Time & Location */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time (optional)
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Lagos State Event Center or Online (Zoom)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <label className="flex items-center gap-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={formData.isOnline}
                      onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-sm">Online Event</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-700 leading-relaxed"
                placeholder="Describe the event, agenda, speakers, etc..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Event Image</h3>
              <div className="space-y-4">
                {previewImage ? (
                  <div className="relative max-w-full rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <Image
                      src={previewImage}
                      alt="Event preview"
                      width={800}
                      height={400}
                      className="w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="max-w-full aspect-[8/4] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <p className="text-gray-400">No image selected</p>
                  </div>
                )}

                <div className="text-center">
                  <label className="cursor-pointer inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Recommended: 1200×600px · JPG, PNG · Max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Attendees */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                <Users className="w-5 h-5" />
                Expected Attendees (optional)
              </label>
              <input
                type="number"
                value={formData.expectedAttendees || ''}
                onChange={(e) => setFormData({ ...formData, expectedAttendees: parseInt(e.target.value) || null })}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Event Status</h3>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Approved">Approved (Public)</option>
                <option value="Pending">Pending Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}