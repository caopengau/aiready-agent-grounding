import { getPostBySlug, getAllPosts } from "@/lib/blog-tsx";
import { notFound } from "next/navigation";
import { BlogPostClient } from "@/components/BlogPostClient";

interface Params {
  params: { slug: string };
}

export default async function Page({ params }: Params) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // Render the post content on the server and pass it into the client component
  // as a ReactNode to avoid passing component functions to client components.
  const content = <post.Content />;

  // Only pass serializable post metadata to the client component —
  // omit the Content function to avoid sending functions to client.
  const postMeta = {
    title: post.title,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    readingTime: post.readingTime,
    tags: post.tags,
  };

  return <BlogPostClient post={postMeta} content={content} />;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
