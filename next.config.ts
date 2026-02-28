import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
        pathname: '/images/**',
      },
    ],
    // Allow unoptimized for badges since we use unoptimized={true}
    unoptimized: false,
  },
};

export default nextConfig;
