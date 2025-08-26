import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Updated configuration to trigger restart
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Enable hot module replacement for development
      config.watchOptions = {
        aggregateTimeout: 200,
        poll: 1000,
      };
    }
    
    // Exclude z-ai-web-dev-sdk from client-side bundling
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push('z-ai-web-dev-sdk');
    }
    
    return config;
  },
  eslint: {
    // Don't ignore ESLint errors during builds
    ignoreDuringBuilds: false,
  },
  // Enable performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  // Images optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
