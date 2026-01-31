"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants: any = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};


interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}


interface BlogPageClientProps {
  posts: BlogPostMeta[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32 relative">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto"
      >
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200 shadow-lg"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✍️
            </motion.span>
            <span>Insights on AI-Ready Development</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Practical insights on making your codebase work better with AI tools.
            <br />
            <span className="text-slate-500">Learn from real-world experiences and measurable results.</span>
          </motion.p>
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 h-full"
              >
                <div className="p-8">
                  {/* Post metadata */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <time dateTime={post.date} className="font-medium">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Post title */}
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h2>

                  {/* Post excerpt */}
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-lg">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap mb-6">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-slate-500 text-sm">+{post.tags.length - 3} more</span>
                    )}
                  </div>

                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Read full article</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Gradient accent on hover */}
                <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming soon section */}
        {posts.length < 10 && (
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 rounded-full border border-slate-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium">More articles coming soon</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
