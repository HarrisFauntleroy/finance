/**
 *
 * Index page
 *
 */
import React from "react"

import { Center, Heading } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Card from "~/components/Cards"
import { Grid } from "~/components/Grid"
import Page from "~/components/Page"
import type { DefaultPage } from "~/pages/_app"

const NavLink = ({ href }: { href: string }) => (
	<Link href={href} key={href}>
		<Card
			as="button"
			display="flex"
			justifyContent="center"
			alignItems="center"
			shadow="2xl"
			padding="16px"
		>
			<Heading size="md">{href.replace("/", "").toUpperCase()}</Heading>
		</Card>
	</Link>
)

const Index: DefaultPage = () => {
	const session = useSession()
	const userName = session.data?.user?.name

	const links = [
		{ href: "/accounts" },
		{ href: "/markets" },
		{ href: "/budgets" },
		{ href: "/profile" },
	]
	return (
		<Page title="Home">
			<Center alignItems="center" padding="16px">
				<Heading>Welcome {userName}!</Heading>
			</Center>
			<Grid columns={2} padding="16px">
				{links.map(NavLink)}
			</Grid>
		</Page>
	)
}

Index.auth = false
export default Index
