/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "ipfs.nirvanalabs.xyz",
      },
      {
        protocol: "https",
        hostname: "gateway.ipfscdn.io",
      },
    ],
  },
};

module.exports = nextConfig;
