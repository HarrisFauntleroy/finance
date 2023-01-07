/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('next').NextConfig}
 */
const path = require("path")

module.exports = {
	reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
	swcMinify: true,
	experimental: {
		// Required:
		appDir: true,
		esmExternals: "loose"
	},
	webpack: (config) => {
		config.module.rules.push({

			test: /prisma-client\/index\.js$/,
			loader: "string-replace-loader",
			options: {
				search: "config.dirname = dirname",
				replace: `config.dirname = '${path.dirname(
					require.resolve("database-notes/generated/prisma-client")
				)}'`,
			},
		})
		return config
	},
}
