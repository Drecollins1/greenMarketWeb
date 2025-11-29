'use client';

import { useState } from 'react';

export default function NewProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Agrochemical',
    price: '',
    description: '',
    state: 'Lagos State',
    locality: 'Agege',
    busStop: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'freemium' | 'top' | 'premium'>('freemium');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'title field is mandatory';
    if (!formData.price) newErrors.price = 'enter a price';
    if (!formData.description) newErrors.description = 'Enter a description for this product';
    if (formData.tags.length === 0) newErrors.tags = 'Must attach a tag, E.g: Fruit. Press Enter!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show promote modal after validation passes
    setShowPromoteModal(true);
  };

  const handlePostAd = () => {
    console.log('Form submitted:', formData);
    console.log('Selected plan:', selectedPlan);
    console.log('Duration:', selectedDuration);
    setShowPromoteModal(false);
    // Handle form submission
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
        setErrors({ ...errors, tags: '' });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Product</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-12 h-0.5 bg-[#39B54A]"></div>
              <svg className="w-5 h-5 text-[#39B54A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="w-12 h-0.5 bg-[#39B54A]"></div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#39B54A] hover:bg-[#39B54A] text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Submit
          </button>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">PRODUCT DETAILS</h2>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Product Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setErrors({ ...errors, title: '' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A]"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">CATEGORY</h2>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] appearance-none bg-white"
                  >
                    <option>Agrochemical</option>
                    <option>Seeds</option>
                    <option>Equipment</option>
                    <option>Fertilizer</option>
                  </select>
                </div>
              </div>

              {/* Price Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">PRICE DETAILS</h2>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      setErrors({ ...errors, price: '' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A]"
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">DESCRIPTION</h2>
                <div>
                  <label className="text-xs text-gray-900 mb-2 block">Product Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      setErrors({ ...errors, description: '' });
                    }}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] resize-none"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Media */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">MEDIA</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <p className="text-xs text-gray-400 mb-2">Select file to upload</p>
                  <p className="text-sm text-gray-400 mb-2">OR</p>
                  <p className="text-xs text-gray-400">drag and drop</p>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">TAGS</h2>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Type a word and press enter  E.g.: Fruit"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
                        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
                        setTagInput('');
                        setErrors({ ...errors, tags: '' });
                      }
                    }}
                    className="bg-[#39B54A] hover:bg-[#39B54A] text-white px-4 py-2 rounded-md transition-colors"
                  >
                    +
                  </button>
                </div>
                {errors.tags && (
                  <p className="text-xs text-red-500 mb-2">{errors.tags}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-[#39B54A] hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Nearest Location */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4">NEAREST LOCATION</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] appearance-none bg-white"
                    >
                      <option>Lagos State</option>
                      <option>Ogun State</option>
                      <option>Abuja</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Locality</label>
                    <select
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] appearance-none bg-white"
                    >
                      <option>Agege</option>
                      <option>Ikeja</option>
                      <option>Victoria Island</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Nearest Bus Stop</label>
                    <input
                      type="text"
                      value={formData.busStop}
                      onChange={(e) => setFormData({ ...formData, busStop: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-[#39B54A] hover:bg-[#39B54A] text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Promote Modal */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Promote your ad
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Select your Ad plan from list below area.
            </p>

            <div className="space-y-4">
              {/* Freemium Plan */}
              <div
                onClick={() => {
                  setSelectedPlan('freemium');
                  setSelectedDuration(null);
                }}
                className={`relative rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === 'freemium'
                    ? 'bg-green-100 border-2 border-[#39B54A]'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'freemium' ? 'border-[#39B54A]' : 'border-gray-300'
                    }`}>
                      {selectedPlan === 'freemium' && (
                        <div className="w-3 h-3 rounded-full bg-[#39B54A]"></div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">Freemium plan</span>
                  </div>
                  <span className="bg-[#39B54A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Free
                  </span>
                </div>
              </div>

              {/* Top Section */}
              <div 
                onClick={() => setSelectedPlan('top')}
                className={`rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === 'top'
                    ? 'bg-white border-2 border-[#39B54A]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Top</h3>
                  <span className="text-[#39B54A] font-bold text-lg">₦ 230.00</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['1 Day', '7 Days', '14 Days', '30 Days'].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan('top');
                        setSelectedDuration(duration);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPlan === 'top' && selectedDuration === duration
                          ? 'bg-[#39B54A] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Section */}
              <div 
                onClick={() => setSelectedPlan('premium')}
                className={`rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === 'premium'
                    ? 'bg-white border-2 border-[#39B54A]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Premium</h3>
                  <span className="text-[#39B54A] font-bold text-lg">₦ 14,999.00</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['1 Month', '6 Months'].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan('premium');
                        setSelectedDuration(duration);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPlan === 'premium' && selectedDuration === duration
                          ? 'bg-[#39B54A] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Post AD Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handlePostAd}
                className="bg-[#39B54A] hover:bg-[#39B54A] text-white px-12 py-3 rounded-full font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
              >
                Post AD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}