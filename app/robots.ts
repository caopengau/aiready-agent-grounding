import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      // AI Search Engine Crawlers
      {
        userAgent: 'GPTBot', // OpenAI/ChatGPT
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Claude-Web', // Anthropic Claude
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Google-Extended', // Google Bard/Gemini
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'anthropic-ai', // Anthropic
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'YouBot', // You.com
        allow: '/',
        disallow: ['/api/'],
        crawlDelay: 0,
      },
    ],
    sitemap: [
      'https://getaiready.dev/sitemap.xml',
      'https://getaiready.dev/ai-readme.md', // AI-readable content
    ],
  }
}
