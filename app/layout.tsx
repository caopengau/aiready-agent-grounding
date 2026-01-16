import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aiready - Make Your Codebase AI-Ready",
  description: "Free tools to optimize your codebase for AI collaboration. Detect semantic duplicates, analyze context windows, and maintain consistency that AI models understand.",
  keywords: "AI, codebase, optimization, semantic analysis, context window, consistency, TypeScript, JavaScript, developer tools",
  authors: [{ name: "aiready Team" }],
  creator: "aiready",
  publisher: "aiready",
  openGraph: {
    title: "AIReady - Make Your Codebase AI-Ready",
    description: "Free tools to optimize your codebase for AI collaboration. Detect semantic duplicates, analyze context windows, and maintain consistency.",
    url: "https://getaiready.dev",
    siteName: "aiready",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "aiready - AI-Ready Codebase Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aiready - Make Your Codebase AI-Ready",
    description: "Free tools to optimize your codebase for AI collaboration. Detect semantic duplicates, analyze context windows, and maintain consistency that AI models understand.",
    images: ["/og-image.png"],
    creator: "@aireadytools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
