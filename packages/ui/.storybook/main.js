const { mergeConfig } = require("vite")
const { default: tsconfigPaths } = require('vite-tsconfig-paths')
const svgr = require('vite-plugin-svgr')

process.noDeprecation = true

module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions"
	],
	"framework": "@storybook/react",
	"core": {
		"builder": "@storybook/builder-vite"
	},
	"features": {
		"storyStoreV7": true
	},
	viteFinal(config, { configType }) {
		return mergeConfig(config, {
			plugins: [
				tsconfigPaths(),
				svgr({ exportAsDefault: true })
			]
		})
	},
	babel: async (options) => {
		options.plugins.push('babel-plugin-inline-react-svg');
		return options;
	}
}

