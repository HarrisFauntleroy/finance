import React from "react"

import { Button } from "./Button"
import { storiesOf } from "@storybook/react"

storiesOf("Button", module)
	.add("with text", () => <Button>Hello Button</Button>)
	.add("with emoji", () => (
		<Button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</Button>
	))
	.add("with custom styles", () => (
		<Button fontWeight="bold" color="blue.500">
			Custom styles
		</Button>
	))
