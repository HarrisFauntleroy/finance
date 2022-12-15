import React from "react"

import { FormLabel, Input, chakra } from "@chakra-ui/react"
import { logger } from "common"
import { useForm } from "react-hook-form"

const EmailAuth = () => {
	const { handleSubmit } = useForm<{ email: string }>()

	return (
		<chakra.form
			method="post"
			action="/api/auth/signin/email"
			onSubmit={handleSubmit(logger.info)}
		>
			<FormLabel>
				Email address
				<Input type="email" id="email" name="email" />
			</FormLabel>
		</chakra.form>
	)
}

export default EmailAuth
