// components/blog/BlogSection.tsx
import Link from "next/link";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: string;
  category: string;
  image: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-12 px-4 md:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              Our Blog
            </h2>
            <p className="text-gray-600">Some of our recent blog</p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-emerald-600 font-medium hover:gap-3 transition-all"
          >
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}