/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('next').NextConfig}
 */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

module.exports = {
  transpilePackages: ["database", "ui", "common"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
  experimental: {
    appDir: true,
    esmExternals: "loose",
  },
  webpack: function (config, { isServer }) {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};
