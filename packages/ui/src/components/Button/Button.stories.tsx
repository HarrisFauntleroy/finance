import React from "react"

import { Button } from "./Button"
import type { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
	title: "Button",
	component: Button,
} as ComponentMeta<typeof Button>

export const Primary: ComponentStory<typeof Button> = () => (
	<Button backgroundColor="#ff0">Button</Button>
)

export const Secondary: ComponentStory<typeof Button> = () => (
	<Button backgroundColor="#ff0">😄👍😍💯</Button>
)

export const Tertiary: ComponentStory<typeof Button> = () => (
	<Button backgroundColor="#ff0">📚📕📈🤓</Button>
)
