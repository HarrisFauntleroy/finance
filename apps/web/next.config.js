/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

module.exports = {
  transpilePackages: ['database'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
    ],
  },
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /prisma-client\/index\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'config.dirname = dirname',
        replace: `config.dirname = '${path.dirname(
          require.resolve('database/generated/prisma-client'),
        )}'`,
      },
    });
    return config;
  },
};
