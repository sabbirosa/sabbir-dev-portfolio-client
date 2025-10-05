"use client";

import { useAuth } from "@/contexts/AuthContext";
import { experienceAPI } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Experience {
  _id: string;
  position: string;
  company: string;
  year: string;
  description?: string;
  order: number;
}

export default function ExperienceListPage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperience(response.data as unknown as Experience[]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this experience entry?"))
      return;

    try {
      await experienceAPI.delete(token, id);
      toast.success("Experience deleted successfully");
      fetchExperience();
    } catch {
      toast.error("Failed to delete experience");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Experience</h1>
        <Link
          href="/admin/experience/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add New Experience
        </Link>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {experience.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No experience entries found. Add your first one!
                </td>
              </tr>
            ) : (
              experience.map((exp) => (
                <tr key={exp._id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-white">{exp.position}</td>
                  <td className="px-6 py-4 text-gray-400">{exp.company}</td>
                  <td className="px-6 py-4 text-gray-400">{exp.year}</td>
                  <td className="px-6 py-4 text-gray-400">{exp.order}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() =>
                        router.push(`/admin/experience/edit/${exp._id}`)
                      }
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
