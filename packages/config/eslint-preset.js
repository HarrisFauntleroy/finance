module.exports = {
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "./tsconfig.json"
	},
	"plugins": ["@typescript-eslint", "import", "prettier"],
	"extends": [
		"airbnb-typescript/base",
		"prettier",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript"
	],
	"env": {
		"browser": true,
		"node": true,
		"jest": true,
		"es6": true
	},
	"settings": {
		"next": {
			"rootDir": ["apps/*/", "packages/*/"],
		},
	},
	"rules": {
		"@next/next/no-html-link-for-pages": "off",
		"react/jsx-key": "off",
	},
};
