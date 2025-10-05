"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  blogAPI,
  educationAPI,
  experienceAPI,
  extracurricularAPI,
  projectAPI,
} from "@/lib/api";
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  FolderOpen,
  Settings,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    featuredProjects: 0,
    totalEducation: 0,
    totalExperience: 0,
    totalExtracurricular: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          blogsRes,
          projectsRes,
          educationRes,
          experienceRes,
          extracurricularRes,
        ] = await Promise.all([
          blogAPI.getAll(),
          projectAPI.getAll(),
          educationAPI.getAll(),
          experienceAPI.getAll(),
          extracurricularAPI.getAll(),
        ]);

        setStats({
          totalBlogs: Array.isArray(blogsRes.data) ? blogsRes.data.length : 0,
          publishedBlogs: Array.isArray(blogsRes.data)
            ? blogsRes.data.filter(
                (b: Record<string, unknown>) => b.published === true
              ).length
            : 0,
          totalProjects: Array.isArray(projectsRes.data)
            ? projectsRes.data.length
            : 0,
          featuredProjects: Array.isArray(projectsRes.data)
            ? projectsRes.data.filter(
                (p: Record<string, unknown>) => p.featured === true
              ).length
            : 0,
          totalEducation: Array.isArray(educationRes.data)
            ? educationRes.data.length
            : 0,
          totalExperience: Array.isArray(experienceRes.data)
            ? experienceRes.data.length
            : 0,
          totalExtracurricular: Array.isArray(extracurricularRes.data)
            ? extracurricularRes.data.length
            : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split("@")[0]}!
          </h1>
          <p className="text-gray-400">
            Manage your portfolio content from this dashboard.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Blogs"
            value={loading ? "..." : stats.totalBlogs.toString()}
            subtitle={`${stats.publishedBlogs} published`}
            icon={FileText}
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Total Projects"
            value={loading ? "..." : stats.totalProjects.toString()}
            subtitle={`${stats.featuredProjects} featured`}
            icon={FolderOpen}
            iconColor="text-green-500"
          />
          <StatsCard
            title="Active Session"
            value="1"
            subtitle="Online now"
            icon={TrendingUp}
            iconColor="text-purple-500"
          />
          <StatsCard
            title="Site Status"
            value="Live"
            subtitle="All systems operational"
            icon={Settings}
            iconColor="text-yellow-500"
          />
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <QuickActionCard
              icon={FileText}
              title="Manage Blogs"
              description="Create, edit, and manage your blog posts"
              href="/admin/blogs"
              count={stats.totalBlogs}
            />
            <QuickActionCard
              icon={FolderOpen}
              title="Manage Projects"
              description="Showcase your projects and work"
              href="/admin/projects"
              count={stats.totalProjects}
            />
            <QuickActionCard
              icon={BookOpen}
              title="Manage Education"
              description="Update your educational background"
              href="/admin/education"
              count={stats.totalEducation}
            />
            <QuickActionCard
              icon={Briefcase}
              title="Manage Experience"
              description="Add and edit work experience"
              href="/admin/experience"
              count={stats.totalExperience}
            />
            <QuickActionCard
              icon={Award}
              title="Manage Extracurricular"
              description="Showcase your activities and leadership"
              href="/admin/extracurricular"
              count={stats.totalExtracurricular}
            />
            <QuickActionCard
              icon={Settings}
              title="Site Settings"
              description="Configure your portfolio settings"
              href="/admin/settings"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  count?: number;
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  count,
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 hover:bg-gray-750 transition-all cursor-pointer group">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <Icon className="h-8 w-8 text-purple-500 group-hover:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          {count !== undefined && (
            <div className="text-2xl font-bold text-purple-500">{count}</div>
          )}
        </div>
      </div>
    </Link>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
}

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}
