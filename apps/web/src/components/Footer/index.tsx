/**
 *
 * Footer
 *
 */
import React from "react"

import { Button, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { MdDeveloperMode } from "react-icons/md"

export default function Footer() {
	return (
		<Flex justifyContent="center" alignItems="center" height="32px">
			<Text
				fontSize="small"
				textAlign="center"
				padding="8px"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				Harris Fauntleroy © 2022 All rights reserved
			</Text>
			<Link href="/dev" passHref>
				<Button
					variant="link"
					size="xs"
					leftIcon={<MdDeveloperMode />}
					aria-label=""
				>
					developer
				</Button>
			</Link>
		</Flex>
	)
}
