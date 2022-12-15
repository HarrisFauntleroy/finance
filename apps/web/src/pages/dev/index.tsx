/**
 *
 * Index page
 *
 */
import React from "react"

import { Stack } from "@chakra-ui/react"
import Link from "next/link"
import Page from "~/components/Page"
import { Body } from "~/components/Page/Body"
import type { DefaultPage } from "~/pages/_app"

const Index: DefaultPage = () => {
	return (
		<Page title="Developer portal">
			<Body>
				<Stack>
					<Link href="/dev/docs">Swagger API documentation</Link>
					<Link href="/dev/roadmap">Development Roadmap</Link>
					<Link href="/dev/stack">Technology stack</Link>
				</Stack>
			</Body>
		</Page>
	)
}

Index.auth = false
export default Index
