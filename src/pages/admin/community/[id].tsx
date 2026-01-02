'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Save, X, Upload } from 'lucide-react';

// Mock data (replace with real API later)
const getCommunityById = (id: string) => {
  const communities: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Livestock & Poultry Network',
      description: 'A community for farmers raising livestock and poultry to share knowledge, best practices, and market opportunities.',
      icon: '/assets/community1.png',
      cover: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
      rules: '• Be respectful\n• No spam\n• Share accurate information\n• Posts must be agriculture-related',
      status: 'Approved',
    },
    // Add more communities as needed
  };
  return communities[id] || null;
};

export default function EditCommunity() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<any>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const community = getCommunityById(id);
    if (community) {
      setFormData(community);
      setIconPreview(community.icon);
      setCoverPreview(community.cover);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading community...</div>;
  }

  if (!formData) {
    return <div className="p-8 text-center text-red-600">Community not found</div>;
  }

  // Unified image handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'icon' | 'cover'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === 'icon') {
      setIconPreview(previewUrl);
      setFormData({ ...formData, icon: file });
    } else if (type === 'cover') {
      setCoverPreview(previewUrl);
      setFormData({ ...formData, cover: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated community:', formData);
    alert('Community updated successfully!');
    // In real app: send to API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Community</h1>
            <p className="text-gray-600 mt-2">Update details, rules, and images</p>
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
            {/* Name & Description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Community Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-green-500 outline-none pb-4 mb-8"
                placeholder="Enter community name"
              />

              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-700 leading-relaxed"
                placeholder="Describe what this community is about..."
              />
            </div>

            {/* Community Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Community Rules
              </label>
              <textarea
                value={formData.rules}
                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                rows={8}
                placeholder="One rule per line...&#10;e.g. • Be respectful&#10;• No spam"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm text-gray-700"
              />
              <p className="text-xs text-gray-500 mt-3">Use • at the start of each line for bullet points</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Icon */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Community Icon</h3>
              <div className="flex flex-col items-center">
                {iconPreview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white mb-4">
                    <Image
                      src="/assets/refer.png"
                      alt="Community icon"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 border-4 border-white" />
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'icon')}
                    className="hidden"
                  />
                  <span className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                    <Upload className="w-5 h-5" />
                    Change Icon
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 text-center">Square image · 200×200px recommended</p>
              </div>
            </div>

            {/* Cover Photo */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Cover Photo</h3>
              <div className="space-y-4">
                {coverPreview ? (
                  <div className="relative max-w-full rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      width={800}
                      height={300}
                      className="w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverPreview(null);
                        setFormData({ ...formData, cover: null });
                      }}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="max-w-full aspect-[8/3] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <p className="text-gray-400">No cover image</p>
                  </div>
                )}

                <div className="text-center">
                  <label className="cursor-pointer inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload Cover
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Recommended: 1600×500px · JPG, PNG · Max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Community Status</h3>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending Review</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}