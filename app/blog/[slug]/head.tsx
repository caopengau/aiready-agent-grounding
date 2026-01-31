import React from 'react';
import { getPostBySlug } from '@/lib/blog-tsx';

interface Props {
  params: { slug: string };
}

export default async function Head({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? 'AIReady';
  const description = post?.excerpt ?? 'AIReady blog post';

  const imageMap: Record<string, string> = {
    'ai-code-debt-tsunami': '/series-1-the-ai-code-debt-tsunami.png',
    'invisible-codebase': '/series-2-invisible-to-ai.png',
    'metrics-that-actually-matter': '/series-3-metrics-that-matters.png',
  };

  const image = imageMap[slug] ?? '/og-image.png';

  return (
    <>
      <title>{title} — AIReady</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
