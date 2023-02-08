module.exports = {
	stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@chakra-ui/storybook-addon",
	],
	features: {
		emotionAlias: false,
	},
	framework: "@storybook/react",
};
