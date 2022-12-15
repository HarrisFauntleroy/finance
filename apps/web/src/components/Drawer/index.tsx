import type { PropsWithChildren } from "react"
import React from "react"

import {
	Drawer as ChakraDrawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
} from "@chakra-ui/react"

interface DrawerProps extends PropsWithChildren {
	isOpen: boolean
	onClose: () => void
}

function Drawer({ children, onClose, isOpen }: DrawerProps) {
	return (
		<ChakraDrawer placement="right" onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				{children}
			</DrawerContent>
		</ChakraDrawer>
	)
}

export default Drawer
