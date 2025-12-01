'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getCategories } from "@/services/category";
import {getPlans} from "@/services/plan";
import Image from 'next/image';

type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  banner: string | null;
  color: string;
  products_count: number;
};

type ImageFile = {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
};

export default function NewProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    state: 'Lagos State',
    city: 'Agege',
    busStop: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'freemium' | 'top' | 'premium'>('freemium');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories();
        if (categories) {
          setCategories(categories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Validate form and disable button
  const isFormValid = () => {
    const requiredFields = ['title', 'category', 'price', 'description'];
    return requiredFields.every(field => formData[field as keyof typeof formData]) && 
           formData.tags.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'Title field is mandatory';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.price) newErrors.price = 'Enter a price';
    if (!formData.description) newErrors.description = 'Enter a description for this product';
    if (formData.tags.length === 0) newErrors.tags = 'Must attach at least one tag';
    if (images.length === 0) {
      newErrors.images = 'Please upload at least one image';
    } else {
      // Check image sizes
      const oversizedImages = images.filter(img => img.size > 2 * 1024 * 1024);
      if (oversizedImages.length > 0) {
        newErrors.images = 'Some images exceed 2MB limit';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show promote modal after validation passes
    setShowPromoteModal(true);
  };

  const handlePostAd = () => {
    // Prepare form data with images - This is where we format for API
    const submitData = {
      ...formData,
      // Format images for API: images[0], images[1], etc.
      images: images.map((img, index) => ({
        [`images[${index}]`]: img.file, // This creates images[0], images[1], etc.
      })),
      // Format tags for API: tags[0], tags[1], etc.
      tags: formData.tags.map((tag, index) => ({
        [`tags[${index}]`]: tag, // This creates tags[0], tags[1], etc.
      }))
    };
    
    // For actual API submission, you might need to format differently:
    const apiFormData = new FormData();
    
    // Add regular fields
    apiFormData.append('title', formData.title);
    apiFormData.append('category', formData.category);
    apiFormData.append('price', formData.price);
    apiFormData.append('description', formData.description);
    apiFormData.append('state', formData.state);
    apiFormData.append('city', formData.city);
    apiFormData.append('busStop', formData.busStop);
    
    // Add images as images[0], images[1], etc.
    images.forEach((img, index) => {
      apiFormData.append(`images[${index}]`, img.file);
    });
    
    // Add tags as tags[0], tags[1], etc.
    formData.tags.forEach((tag, index) => {
      apiFormData.append(`tags[${index}]`, tag);
    });
    
    console.log('Form submitted:', submitData);
    console.log('FormData for API:', apiFormData);
    console.log('Selected plan:', selectedPlan);
    console.log('Duration:', selectedDuration);
    setShowPromoteModal(false);
    
    // Handle form submission - you would send apiFormData to your API
    // Example: await fetch('/api/products', { method: 'POST', body: apiFormData });
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ 
        ...formData, 
        tags: [...formData.tags, tagInput.trim()] 
      });
      setErrors({ ...errors, tags: '' });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageFile[] = [];
    let hasError = false;

    // Check total images count
    if (images.length + files.length > 5) {
      setImageError('Cannot upload more than 5 images');
      return;
    }

    Array.from(files).forEach((file, index) => {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setImageError(`Image ${file.name} exceeds 2MB limit`);
        hasError = true;
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setImageError(`File ${file.name} is not an image`);
        hasError = true;
        return;
      }

      const imageId = `image_${Date.now()}_${index}`;
      const previewUrl = URL.createObjectURL(file);
      
      newImages.push({
        id: imageId,
        file,
        preview: previewUrl,
        name: file.name,
        size: file.size
      });
    });

    if (!hasError && newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      setImageError('');
      setErrors({ ...errors, images: '' });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const fakeEvent = {
        target: { files }
      } as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(fakeEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
            disabled={!isFormValid()}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isFormValid() 
                ? 'bg-[#39B54A] hover:bg-[#39B54A] text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      setErrors({ ...errors, category: '' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39B54A] appearance-none bg-white"
                  >
                    <option value="">Select a category</option>
                    {loading ? (
                      <option>Loading categories...</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                  )}
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
                
                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img, index) => (
                        <div key={img.id} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                            <img
                              src={img.preview}
                              alt={`Uploaded image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              title="Remove image"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          {/* Removed images[{index}] notation from UI */}
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            Image {index + 1} - {(img.size / 1024).toFixed(2)}KB
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    images.length >= 5 
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                      : 'border-gray-300 hover:border-[#39B54A] bg-gray-50'
                  }`}
                  onClick={() => {
                    if (images.length < 5 && fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                    disabled={images.length >= 5}
                  />
                  <div className="space-y-2">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      {images.length >= 5 ? 'Maximum 5 images reached' : 'Select files to upload'}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">OR</p>
                    <p className="text-sm text-gray-600">
                      {images.length >= 5 ? 'Cannot add more images' : 'drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      {images.length}/5 images uploaded
                    </p>
                  </div>
                </div>
                
                {/* Image error and note */}
                <div className="mt-3 space-y-2">
                  {imageError && (
                    <p className="text-xs text-red-500">{imageError}</p>
                  )}
                  {errors.images && (
                    <p className="text-xs text-red-500">{errors.images}</p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    NOTE: IMAGE SIZE SHOULD NOT BE MORE THAN 2MB
                  </p>
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
                    onClick={handleAddTag}
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
                      {tag} {/* Removed tags[{index}]: notation from UI */}
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
                    <label className="text-xs text-gray-400 mb-2 block">City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
            disabled={!isFormValid()}
            className={`mt-6 px-8 py-3 rounded-md font-medium transition-colors ${
              isFormValid() 
                ? 'bg-[#39B54A] hover:bg-[#39B54A] text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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