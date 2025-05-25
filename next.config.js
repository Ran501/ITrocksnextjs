/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  reactStrictMode: true,
  // Optimize build process
  swcMinify: true,
  experimental: {
    // Reduce memory usage during build
    optimizeCss: true,
    // Optimize build traces
    turbotrace: {
      logLevel: 'error',
      logDetail: false,
      memoryLimit: 4096
    }
  },
  // Increase build memory limit
  webpack: (config, { isServer }) => {
    // Increase memory limit for build
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic'
    }
    return config
  },
  // Handle static page generation
  output: 'standalone',
  // Disable static optimization for error pages
  staticPageGenerationTimeout: 120,
  // Configure error pages
  async redirects() {
    return []
  },
  async headers() {
    return []
  }
}

module.exports = nextConfig 