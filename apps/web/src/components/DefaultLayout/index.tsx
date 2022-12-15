/**
 *
 * Default layout
 * Style: Golden Ratio
 *
 */
import type { PropsWithChildren } from "react"
import React from "react"

import {
	Grid,
	GridItem,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react"
import { BsWallet } from "react-icons/bs"
import { MdMultilineChart, MdSavings } from "react-icons/md"
// import { ReactQueryDevtools } from "react-query/devtools"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Sidebar from "~/components/Sidebar"

export default function Layout({ children }: PropsWithChildren) {
	const disclosure = useDisclosure()

	const links = [
		{ href: "/accounts", icon: BsWallet, label: "Accounts" },
		{ href: "/markets", icon: MdMultilineChart, label: "Markets" },
		{ href: "/budgets", icon: MdSavings, label: "Budgets" },
	]

	return (
		<Grid
			minHeight="100vh"
			templateAreas={{
				md: `"header header"
							"nav main"
							"nav footer"`,
				sm: `"header header"
							"nav main"
							"nav footer"`,
				base: `"header"
								"main"
								"footer"`,
			}}
			gridTemplateRows={"64px 1fr 32px"}
			gridTemplateColumns={{
				md: "200px calc(100vw - 200px)",
				sm: "64px calc(100vw - 64px)",
				base: "100vw",
			}}
			bg={useColorModeValue("background.light", "background.dark")}
			color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
		>
			<GridItem area={"header"}>
				<Header {...disclosure} />
			</GridItem>
			<GridItem area={"nav"}>
				<Sidebar {...disclosure} links={links} />
			</GridItem>
			<GridItem area={"main"}>{children}</GridItem>
			<GridItem area={"footer"}>
				<Footer />
			</GridItem>
			{/* {process.env.NODE_ENV === "development" && (
				// <ReactQueryDevtools initialIsOpen={false} />
			)} */}
		</Grid>
	)
}
