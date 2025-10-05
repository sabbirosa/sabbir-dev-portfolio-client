"use client";

import { useAuth } from "@/contexts/AuthContext";
import { uploadAPI } from "@/lib/api";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "blogs" | "projects" | "general";
  label?: string;
  helpText?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  label = "Upload Image",
  helpText = "PNG, JPG up to 5MB",
}: ImageUploadProps) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with value prop
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      setUploading(true);

      // Create temporary preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server (which uploads to Cloudinary)
      const response = await uploadAPI.uploadImage(token, file, folder);

      if (response.success && response.data?.url) {
        const cloudinaryUrl = response.data.url;

        // Update preview with actual Cloudinary URL
        setPreview(cloudinaryUrl);

        // Send URL to parent form
        onChange(cloudinaryUrl);

        toast.success("Image uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload image";
      toast.error(errorMessage);
      console.error(error);
      setPreview(value);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="flex items-start gap-4">
        {/* Preview or Upload Area */}
        <div
          className={`relative flex-1 rounded-lg border-2 border-dashed transition-colors ${
            preview
              ? "border-purple-500/50"
              : "border-gray-700 hover:border-gray-600"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {preview ? (
            // Image Preview
            <div className="relative group">
              <Image
                src={preview}
                alt="Preview"
                width={800}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
                unoptimized={preview.startsWith("data:")}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={uploading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={uploading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ) : (
            // Upload Area
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="w-full h-48 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-300 transition-colors p-6"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12" />
                  <div className="text-center">
                    <span className="text-sm font-medium">
                      Click to upload image
                    </span>
                    {helpText && (
                      <p className="text-xs text-gray-500 mt-1">{helpText}</p>
                    )}
                  </div>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
