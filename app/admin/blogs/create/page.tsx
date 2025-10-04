"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { blogAPI } from "@/lib/api";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface BlogFormData {
  title: string;
  description: string;
  content: string;
  tags: string;
  readTime: string;
  published: boolean;
}

export default function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <CreateBlogContent />
    </ProtectedRoute>
  );
}

function CreateBlogContent() {
  const router = useRouter();
  const { token } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    content: "",
    tags: "",
    readTime: "",
    published: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Please enter content");
      return;
    }

    try {
      setSaving(true);

      const blogData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        date: new Date().toISOString(),
      };

      await blogAPI.create(token, blogData);
      toast.success("Blog created successfully");
      router.push("/admin/blogs");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create blog");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-6">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create New Blog
          </h1>
          <p className="text-gray-400">Write a new blog post</p>
        </div>
      </header>

      {/* Form */}
      <main className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter blog title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Brief description of the blog"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                placeholder="Blog content (supports markdown)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use markdown syntax for formatting (e.g., # for headings,
                **bold**, *italic*)
              </p>
            </div>

            {/* Tags and Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="react, nextjs, typescript (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="5 min read"
                />
              </div>
            </div>

            {/* Published Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                id="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="published" className="text-sm text-gray-300">
                Publish this blog immediately (visible to public)
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => router.push("/admin/blogs")}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Create Blog
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
