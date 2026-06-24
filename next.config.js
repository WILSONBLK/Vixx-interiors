const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // AVIF removed: encoding takes 10-20s per image in dev, killing performance.
    // WebP gives 80-90% file size reduction with instant encoding.
    formats: ['image/webp'],
    minimumCacheTTL: 31536000, // 1 year — images are immutable once built
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Static image files: cache 1 year — filenames include content hash on Vercel
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Production: content-hashed filenames make 1-year immutable safe.
        // Dev: filenames don't change between restarts, so no-cache prevents stale JS.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: process.env.NODE_ENV === 'production' ? 'public, max-age=31536000, immutable' : 'no-cache, no-store, must-revalidate' }],
      },
    ]
  },
}

module.exports = nextConfig
