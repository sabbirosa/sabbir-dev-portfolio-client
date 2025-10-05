"use client";

import { useAuth } from "@/contexts/AuthContext";
import { educationAPI } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Education {
  _id: string;
  degree: string;
  institution: string;
  year: string;
  order: number;
}

export default function EducationListPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data as unknown as Education[]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      await educationAPI.delete(token, id);
      toast.success("Education deleted successfully");
      fetchEducation();
    } catch {
      toast.error("Failed to delete education");
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
        <h1 className="text-3xl font-bold text-white">Manage Education</h1>
        <Link
          href="/admin/education/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add New Education
        </Link>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Institution
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
            {education.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No education entries found. Add your first one!
                </td>
              </tr>
            ) : (
              education.map((edu) => (
                <tr key={edu._id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-white">{edu.degree}</td>
                  <td className="px-6 py-4 text-gray-400">{edu.institution}</td>
                  <td className="px-6 py-4 text-gray-400">{edu.year}</td>
                  <td className="px-6 py-4 text-gray-400">{edu.order}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() =>
                        router.push(`/admin/education/edit/${edu._id}`)
                      }
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id)}
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
