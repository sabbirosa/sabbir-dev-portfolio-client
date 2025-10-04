"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { blogAPI } from "@/lib/api";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  published: boolean;
  tags: string[];
  readTime: string;
}

export default function BlogsPage() {
  return (
    <ProtectedRoute>
      <BlogsContent />
    </ProtectedRoute>
  );
}

function BlogsContent() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      setBlogs(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await blogAPI.delete(token!, id);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
      console.error(error);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "published") return blog.published;
    if (filter === "draft") return !blog.published;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
            <p className="text-gray-400">Manage your blog content</p>
          </div>
          <button
            onClick={() => toast.info("Create blog feature coming soon!")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            Create Blog
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All ({blogs.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "published"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Published ({blogs.filter((b) => b.published).length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "draft"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Drafts ({blogs.filter((b) => !b.published).length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <p className="text-gray-400 mb-4">No blogs found</p>
            <button
              onClick={() => toast.info("Create blog feature coming soon!")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {blog.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          blog.published
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatDate(blog.date)}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                      {blog.tags && blog.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-2">
                            {blog.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-purple-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/blogs/${blog._id}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
