"use client";

import { useAuth } from "@/contexts/AuthContext";
import { extracurricularAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CreateExtracurricularPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
    year: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await extracurricularAPI.create(token, formData);
      toast.success("Extracurricular created successfully");
      router.push("/admin/extracurricular");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Add New Extracurricular
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="President, Volunteer, etc."
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">
            Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.organization}
            onChange={(e) =>
              setFormData({ ...formData, organization: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            placeholder="Club or Organization Name"
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
            placeholder="2023 – 2024"
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
            {loading ? "Creating..." : "Create Extracurricular"}
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
