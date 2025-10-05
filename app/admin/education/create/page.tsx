"use client";

import { useAuth } from "@/contexts/AuthContext";
import { educationAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CreateEducationPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    year: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await educationAPI.create(token, formData);
      toast.success("Education created successfully");
      router.push("/admin/education");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Education</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">
            Degree <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">
            Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.institution}
            onChange={(e) =>
              setFormData({ ...formData, institution: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="University Name, Location"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="Sep 2020 – Jun 2024"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Display Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) })
            }
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="0"
          />
          <p className="text-gray-500 text-sm mt-1">
            Lower numbers appear first
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Education"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
