import BlogPreview from "@/components/blog/BlogPreview";
import AboutIntroHome from "@/components/home/AboutIntroHome";
import ExpertiseTicker from "@/components/home/ExpertiseTicker";
import HomeHero from "@/components/home/HomeHero";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import Skills from "@/components/home/Skills";
import FeaturedWork from "@/components/projects/FeaturedWork";
import { blogAPI, projectAPI } from "@/lib/api";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function Home() {
  let projects: Record<string, unknown>[] = [];
  let blogs: Record<string, unknown>[] = [];

  try {
    // Fetch featured projects and published blogs
    const projectsRes = await projectAPI.getAll(true);
    const blogsRes = await blogAPI.getAll(true);

    projects = (projectsRes.data as Record<string, unknown>[]).slice(0, 3);
    blogs = (blogsRes.data as Record<string, unknown>[]).slice(0, 3);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <HomeHero />
      <ExpertiseTicker />
      <AboutIntroHome />
      {projects.length > 0 && (
        <FeaturedWork
          projects={
            projects as unknown as Parameters<
              typeof FeaturedWork
            >[0]["projects"]
          }
        />
      )}
      <ServiceHighlights />
      <Skills />
      {blogs.length > 0 && (
        <BlogPreview
          blogs={blogs as unknown as Parameters<typeof BlogPreview>[0]["blogs"]}
        />
      )}
    </>
  );
}
