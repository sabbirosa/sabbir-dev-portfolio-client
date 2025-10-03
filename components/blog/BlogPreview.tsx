import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogPreviewProps {
  blogs: Blog[];
  limit?: number;
}

export default function BlogPreview({ blogs, limit = 3 }: BlogPreviewProps) {
  const recentBlogs = blogs.slice(0, limit);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest Insights</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Explore my latest thoughts on web development, React, and modern web technologies.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentBlogs.map((blog) => (
            <article
              key={blog._id}
              className="blog-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag) => (
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
                <p className="opacity-80 mb-4 line-clamp-3">{blog.description}</p>

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

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="blog-button inline-flex items-center px-8 py-3 font-semibold rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            View All Posts
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

