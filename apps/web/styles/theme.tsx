import { extendTheme } from "@chakra-ui/react"
import type { GlobalStyleProps } from "@chakra-ui/theme-tools"
import { StepsStyleConfig as Steps } from "chakra-ui-steps"

const styles = {
	global: (_props: GlobalStyleProps) => ({
		"html, body, #__next": {
			fontKerning: "auto",
			fontSmooth: "antialiased",
			height: "100vh",
			maxWidth: "100vw",
			display: "flex",
			padding: 0,
			margin: 0,
		},
		".w-md-editor-show-preview": {
			boxShadow: "0px !important",
		},
		hr: {
			backgroundColor: "#4B0082",
		},
		".lagRadar": {
			position: "fixed",
			bottom: "0.5rem",
			right: "0.5rem",
		},
	}),
}

const activeLabelStyles = {
	transform: "scale(0.85) translateY(-24px)",
}

const colors = {}

const fonts = {
	body: "Arial, sans-serif",
	heading: "Lato",
	mono: "Menlo, monospace",
}

const breakpoints = {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px",
}

const components = {
	Avatar: {
		parts: ["container", "group"],
		variants: {
			square: {
				container: {
					borderRadius: "10px",
				},
			},
		},
	},
	// Variant primary makes drawer red, keeping for example
	Drawer: {
		parts: ["dialog", "header", "body"],
		variants: {
			primary: {
				dialog: {
					background: "red",
				},
			},
			secondary: {
				dialog: {
					background: "green",
				},
			},
		},
	},
	Steps,
	Form: {
		variants: {
			floating: {
				container: {
					_focusWithin: {
						label: {
							...activeLabelStyles,
						},
					},
					"input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
						{
							...activeLabelStyles,
						},
					label: {
						top: 0,
						left: 0,
						zIndex: 2,
						position: "absolute",
						backgroundColor: "var(--chakra-colors-chakra-body-bg)",
						pointerEvents: "none",
						mx: 3,
						px: 1,
						my: 2,
						transformOrigin: "left top",
					},
				},
			},
		},
	},
}

export const theme = extendTheme({
	fonts,
	colors,
	styles,
	components,
	breakpoints,
	useSystemColorMode: true,
})
