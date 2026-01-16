# AIReady Landing Page

A modern, responsive landing page for AIReady - tools to optimize your codebase for AI collaboration.

## Features

- **AI-Ready Codebase Tools**: Detect semantic duplicates, analyze context windows, and maintain consistency that AI models understand
- **Free & Open Source**: All tools are completely free with no hidden costs
- **Instant Results**: Get analysis results in under 1 second
- **High Accuracy**: 95% detection accuracy for code issues
- **Lead Capture**: Contact form for requesting detailed reports

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: AWS (S3 + CloudFront) with SST
- **Domain**: getaiready.dev

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```env
# Contact form submission endpoint (provided by SST deployment)
NEXT_PUBLIC_REQUEST_URL=your-api-endpoint-url
```

## Deployment

This project is configured for deployment with SST (Serverless Stack) to AWS. The deployment configuration is in `sst.config.ts` (not included in this public repo).

For local development, you can run:

```bash
npx sst dev
```

## Contributing

This is the landing page for AIReady. For contributions to the core tools, see the main [aiready repository](https://github.com/caopengau/aiready).

## License

MIT License - see LICENSE file for details.
