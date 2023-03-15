import React from "react"

import { Button, ButtonProps } from "@chakra-ui/react"
import { Meta, Story } from "@storybook/react"

export default {
	title: "Button",
	component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
	variant: "outline",
	children: "Button",
}
