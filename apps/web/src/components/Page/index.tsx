import type { PropsWithChildren } from "react"
import React from "react"

import type { StackProps } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import Head from "next/head"

interface PageProps extends PropsWithChildren, StackProps {
	title?: string
}

/**
 * Simple page wrapper
 * Can adjust the Stacks styles
 * Optional title
 */
export default function Page({ title, children, ...props }: PageProps) {
	return (
		<Flex flexDirection="column" flex={1} {...props}>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{children}
		</Flex>
	)
}
