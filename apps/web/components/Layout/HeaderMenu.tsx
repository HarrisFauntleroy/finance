import React from "react"

import { LockIcon } from "@chakra-ui/icons"
import {
	Avatar,
	Button,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react"
import { Role } from "database/generated/prisma-client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { BsPerson } from "react-icons/bs"
import { MdLightMode, MdLogin, MdLogout, MdNightsStay } from "react-icons/md"

export const HeaderMenuMobile = () => {
	const { data: session } = useSession()
	const user = session?.user
	const role = user?.role

	const { colorMode, toggleColorMode } = useColorMode()
	const bg = useColorModeValue("white", "gray.800")



	return (
		<Menu>
			<MenuButton
				as={Button}
				rounded="full"
				variant="link"
				cursor="pointer"
				minW={0}
				_hover={{ transform: "scale(1.1)" }}
			>
				<Avatar
					referrerPolicy="no-referrer"
					src={user?.image || ""}
					size="sm"
					name={user?.name || "User"}
					cursor="pointer"
				/>
			</MenuButton>
			<MenuList bg={bg} gap={2}>
				{role === Role.ADMIN && (
					<Link href="/admin">
						<MenuItem icon={<LockIcon />}>Admin</MenuItem>
					</Link>
				)}
				<Link href="/profile">
					<MenuItem icon={<BsPerson />}>Profile</MenuItem>
				</Link>
				<MenuItem
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <MdLightMode /> : <MdNightsStay />}
				>
					Theme
				</MenuItem>
				{session ? (
					<MenuItem
						icon={<MdLogout />}
						onClick={() => signOut({ callbackUrl: "/" })}
					>
						Log out
					</MenuItem>
				) : (
					<MenuItem icon={<MdLogin />} onClick={async () => signIn()}>
						Log in
					</MenuItem>
				)}
			</MenuList>
		</Menu>
	)
}

export const HeaderMenuDesktop = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	const { data: session } = useSession()
	const user = session?.user

	return (
		<Flex align="center" gap="8px">
			<IconButton
				size="sm"
				onClick={toggleColorMode}
				icon={colorMode === "light" ? <MdLightMode /> : <MdNightsStay />}
				cursor="pointer"
				aria-label={""}
			/>
			{session ? (
				<Button
					size="sm"
					leftIcon={<MdLogout />}
					onClick={() => signOut({ callbackUrl: "/" })}
					cursor="pointer"
				>
					Log out
				</Button>
			) : (
				<Button
					size="sm"
					leftIcon={<MdLogin />}
					onClick={async () => signIn()}
					cursor="pointer"
				>
					Log in
				</Button>
			)}
			<Link href="/profile">
				<Avatar
					referrerPolicy="no-referrer"
					src={user?.image || ""}
					size="sm"
					name={user?.name || "User"}
					cursor="pointer"
					_hover={{ transform: "scale(0.9)" }}
				/>
			</Link>
		</Flex>
	)
}
