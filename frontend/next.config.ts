import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production builds
  output: 'standalone',
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
  
  // Configure webpack for better bundling
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Configure TypeScript
  typescript: {
    // Allow production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: false,
  },
  
  // Configure ESLint
  eslint: {
    // Allow production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
