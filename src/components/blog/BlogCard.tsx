// components/blog/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  category: string;
  image: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="group">
      <article className="cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
          <span className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded shadow-sm">
            {post.category}
          </span>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">by {post.author}</span>
          <span>•</span>
          <time>{post.date}</time>
        </div>
      </article>
    </Link>
  );
}
