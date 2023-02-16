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
import { Role } from "database/generated/prisma-client"
import { BsBank } from "react-icons/bs"
import {
	MdAdminPanelSettings,
	MdMultilineChart,
	MdSavings,
} from "react-icons/md"
import { Footer } from "ui"
import Header from "~/components/Layout/Header"
import Sidebar from "~/components/Layout/Sidebar"

export default function Layout({ children }: PropsWithChildren) {
	const disclosure = useDisclosure()

	const links = [
		{ href: "/portfolio", icon: BsBank, label: "Accounts" },
		{ href: "/budgets", icon: MdSavings, label: "Budgets" },
		{
			href: "/markets",
			icon: MdMultilineChart,
			label: "Markets",
		},
		{
			href: "/admin",
			icon: MdAdminPanelSettings,
			label: "Admin",
			role: Role.ADMIN,
		},
	]

	return (
		<Grid
			height="100%"
			templateAreas={{
				lg: `"header header"
							"nav main"
							"nav footer"`,
				sm: `"header header"
							"nav main"
							"nav footer"`,
				base: `"header"
								"main"
								"footer"`,
			}}
			gridTemplateRows={{ base: "64px 1fr 32px" }}
			gridTemplateColumns={{
				lg: "200px calc(100vw - 200px)",
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
		</Grid>
	)
}
