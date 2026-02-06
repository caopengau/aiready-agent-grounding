"use client";

import { useEffect, useState } from "react";

import MotionProgress from './MotionProgress';
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Comments } from "./Comments";
import styles from "./BlogPostClient.module.css";

interface BlogPost {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  readingTime?: string;
  tags?: string[];
  // Content is intentionally omitted here — the server page should render
  // the post's Content and pass it as a ReactNode to this client component.
}

export function BlogPostClient({ post, content }: { post: BlogPost; content: React.ReactNode }) {
  // MotionProgress is a client component; import directly to avoid next/dynamic bailout

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <>
      <Header />
      
      {/* Reading Progress Bar (dynamically loaded) */}
      <MotionProgress />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>

          {/* Hero Section */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {tag}
                </span>
              ))}
              <span className="text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-slate-500 dark:text-zinc-400 text-sm">{post.readingTime || '5 min read'}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 py-6 border-y border-slate-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {post.author[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{post.author}</div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="ml-auto flex gap-2">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-zinc-800 p-8 md:p-12 overflow-hidden">
              <section className={styles.proseContent}>
              {content}
            </section>
          </div>

          {/* Footer - Author Bio & Navigation */}
          <footer className="mt-16 pt-16 border-t border-slate-200 dark:border-zinc-800">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to prepare your codebase for AI?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl text-lg">
                  AIReady helps you identify and fix the structural issues that hold back AI productivity. Get a free report for your open source project today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/#scan" 
                    className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Run Free Scan
                  </Link>
                  <Link 
                    href="/docs" 
                    className="px-8 py-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-white font-bold rounded-xl hover:bg-blue-500/30 transition-colors"
                  >
                    Read Documentation
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/blog" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-2">
                View all articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </footer>

          {/* Comments Section */}
          <Comments slug={post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} title={post.title} />
        </article>
      </main>
      <Footer />
    </>
  );
}
