import React, { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { updateProfileImage } from "@/services/dashboard";

interface ProfileImageUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string | null;
  onUpdateSuccess: (newAvatar: string) => void; // Updated to pass new avatar
}

const ProfileImageUpdateModal: React.FC<ProfileImageUpdateModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onUpdateSuccess,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError(null);
    setSelectedImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await updateProfileImage(selectedImage);
      
      if (result && result.status) {
        // Get the new avatar URL from response
        const newAvatar = result.data.avatar;
        
        // Clear the form
        setSelectedImage(null);
        setPreviewUrl(null);
        
        // Call success callback with new avatar URL
        onUpdateSuccess(newAvatar);
        
        // Close modal
        onClose();
      } else {
        setError(result?.message || "Failed to update profile image. Please try again.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-99999 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6">
          <h3 className="text-lg font-semibold">Update Profile Picture</h3>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Current Image */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Current Picture</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt="Current Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-8 h-8 text-gray-400"><ImageIcon /></div>';
                      }
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  This is your current profile picture
                </p>
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">New Picture</p>
            
            {previewUrl ? (
              <div className="relative">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isUploading 
                    ? 'border-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 hover:border-[#39B54A]'
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload new image
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, GIF, WEBP up to 5MB
                </p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Upload Progress (optional) */}
          {isUploading && (
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#39B54A]" />
                <p className="text-sm text-gray-600">Uploading image...</p>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedImage}
              className="px-4 py-2 bg-[#39B54A] text-white rounded-lg hover:bg-[#188727] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Update Profile Picture"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpdateModal;