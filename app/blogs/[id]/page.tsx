import { blogAPI } from "@/lib/api";
import Link from "next/link";

export const revalidate = 60; // ISR revalidation

export async function generateStaticParams() {
  try {
    const response = await blogAPI.getAll(true);
    return response.data.map((blog: Record<string, unknown>) => ({
      id: blog._id as string,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  let blog: Record<string, unknown> | null = null;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {String(blog.title)}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <time dateTime={String(blog.date)}>
              {formatDate(String(blog.date))}
            </time>
            <span>•</span>
            <span>{String(blog.readTime)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.isArray(blog.tags) &&
              blog.tags.map((tag: unknown) => (
                <span
                  key={String(tag)}
                  className="px-3 py-1 text-sm bg-[#7C3AED]/20 text-[#7C3AED] rounded-full"
                >
                  {String(tag)}
                </span>
              ))}
          </div>
        </header>

        {/* Description */}
        <div className="text-xl text-gray-300 mb-8 leading-relaxed">
          {String(blog.description)}
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
            prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-purple-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
            prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-300
            prose-li:mb-2
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6"
          dangerouslySetInnerHTML={{ __html: String(blog.content) }}
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
