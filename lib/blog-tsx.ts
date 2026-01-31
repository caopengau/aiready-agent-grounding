


import { posts as staticPosts } from '../../landing/content/blog-tsx/index';
import React from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readingTime: string;
  Content: React.ComponentType<any>;
};

export async function getAllPosts(): Promise<Omit<BlogPost, 'Content'>[]> {
  const metas = staticPosts.map(({ Content, ...meta }) => meta);
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return staticPosts.find((p) => p.slug === slug) || null;
}
