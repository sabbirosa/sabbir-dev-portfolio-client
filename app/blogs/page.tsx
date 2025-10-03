import { blogAPI } from "@/lib/api";
import Link from "next/link";

export const revalidate = 60; // ISR revalidation

export default async function BlogsPage() {
  let blogs = [];

  try {
    const response = await blogAPI.getAll(true);
    blogs = response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Blog Posts
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Explore my thoughts on web development, React, and modern web
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <article
              key={blog._id}
              className="blog-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="blog-tag px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#7C3AED] transition-colors">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="opacity-80 mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm opacity-70 mb-4">
                  <span>{formatDate(blog.date)}</span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Read More Button */}
                <Link
                  href={`/blogs/${blog._id}`}
                  className="inline-flex items-center text-[#7C3AED] hover:opacity-80 font-medium transition-colors group-hover:translate-x-1 duration-200"
                >
                  Read More
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No blog posts found.
          </p>
        )}
      </div>
    </div>
  );
}

