import BlogPreview from "@/components/blog/BlogPreview";
import HomeHero from "@/components/home/HomeHero";
import Skills from "@/components/home/Skills";
import FeaturedWork from "@/components/projects/FeaturedWork";
import { blogAPI, projectAPI } from "@/lib/api";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function Home() {
  let projects = [];
  let blogs = [];

  try {
    // Fetch featured projects and published blogs
    const projectsRes = await projectAPI.getAll(true);
    const blogsRes = await blogAPI.getAll(true);

    projects = projectsRes.data.slice(0, 3);
    blogs = blogsRes.data.slice(0, 3);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <HomeHero />
      <Skills />
      {projects.length > 0 && <FeaturedWork projects={projects} />}
      {blogs.length > 0 && <BlogPreview blogs={blogs} />}
    </>
  );
}
