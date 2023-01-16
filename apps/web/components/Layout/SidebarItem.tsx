import React from "react"

import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { Role } from "database/generated/prisma-client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import type { IconType } from "react-icons"

type SidebarItemProps = {
	label: string
	icon: IconType
	href?: string
	drawer?: boolean
	role?: Role
}

export function SidebarItem({
	icon,
	label,
	drawer,
	href,
	role,
}: SidebarItemProps) {
	const { data } = useSession()
	const userRole = data?.user.role
	const color = useColorModeValue("gray.600", "gray.300")
	const bg = useColorModeValue("gray.100", "gray.800")

	const color2 = useColorModeValue("inherit", "gray.400")
	const color3 = useColorModeValue("gray.900", "gray.200")

	const router = useRouter()
	const isActive = router.pathname === href

	return (
		<React.Fragment>
			{(role === Role.ADMIN && userRole === role) ||
				(role === undefined && (
					<Link href={href || "#"}>
						<Flex
							align="center"
							justify={{ base: drawer ? "left" : "center", lg: "left" }}
							cursor="pointer"
							padding="8px"
							height="64px"
							role="group"
							fontWeight="semibold"
							transition=".15s ease"
							bg={isActive ? bg : "inherit"}
							color={color2}
							_hover={{
								bg,
								color: color3,
							}}
						>
							{icon && (
								<Icon
									mx="2"
									boxSize="4"
									_groupHover={{
										color,
									}}
									as={icon}
									transition="300ms ease transform"
									transform={isActive ? "scale(1.5)" : "scale(1)"}
								/>
							)}
							<Text display={{ base: drawer ? "unset" : "none", lg: "unset" }}>
								{label}
							</Text>
						</Flex>
					</Link>
				))}
		</React.Fragment>
	)
}
