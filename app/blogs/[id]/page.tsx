import { blogAPI } from "@/lib/api";
import Link from "next/link";

export const revalidate = 60; // ISR revalidation

export async function generateStaticParams() {
  try {
    const response = await blogAPI.getAll(true);
    return response.data.map((blog: any) => ({
      id: blog._id,
    }));
  } catch (error) {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  let blog: any = null;

  try {
    const response = await blogAPI.getById(params.id);
    blog = response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  if (!blog) {
    return (
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <Link href="/blogs" className="text-[#7C3AED] hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="py-16 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="text-[#7C3AED] hover:underline mb-6 inline-block"
        >
          ← Back to Blogs
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-[#7C3AED]/20 text-[#7C3AED] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Description */}
        <div className="text-xl text-gray-300 mb-8 leading-relaxed">
          {blog.description}
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <Link
            href="/blogs"
            className="text-[#7C3AED] hover:underline font-medium inline-flex items-center"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}

