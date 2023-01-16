import React from "react"

import type { UseDisclosureProps } from "@chakra-ui/react"
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react"
import type { Role } from "database/generated/prisma-client"
import type { IconType } from "react-icons"
import { SidebarContent } from "~/components/Layout/SidebarContent"

export interface SidebarLink {
	href: string
	icon: IconType
	label: string
	role?: Role
}

interface SidebarProps extends Omit<UseDisclosureProps, "isOpen" | "onClose"> {
	links: SidebarLink[]
	isOpen: boolean
	onClose(): void
}

export default function Sidebar({ links, ...props }: SidebarProps) {
	return (
		<>
			<SidebarContent
				links={links}
				w={{ md: "64px", lg: "200px" }}
				borderRight="none"
				display={{ base: "none", md: "unset" }}
			/>
			<Drawer isOpen={props.isOpen} onClose={props.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent maxWidth="200px" aria-modal="true">
					<SidebarContent links={links} w="full" borderRight="none" drawer />
				</DrawerContent>
			</Drawer>
		</>
	)
}
