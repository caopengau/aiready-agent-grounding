
import { getAllPosts } from "@/lib/blog-tsx";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPageClient } from "@/components/BlogPageClient";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-x-hidden">
      <Header />
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10 pointer-events-none" />
      <main className="relative z-10">
        <BlogPageClient posts={posts as any} />
      </main>
      <Footer />
    </div>
  );
}
