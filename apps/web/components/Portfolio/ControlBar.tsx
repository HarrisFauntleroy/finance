import { SettingsIcon } from "@chakra-ui/icons"
import {
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuDivider,
	MenuItemOption,
	MenuOptionGroup,
	Flex,
	Select,
} from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { FiEyeOff, FiEye } from "react-icons/fi"
import { MdExpand } from "react-icons/md"
import { PrivacyContext } from "~/providers/Privacy"

export const ControlBar = () => {
	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	const [toggleOverview, setToggleOverview] = useState(true)

	const handleClick = () => setToggleOverview(!toggleOverview)

	return (
		<Flex justify="space-between">
			<Button>ADD ACCOUNT</Button>
			<Menu closeOnSelect={false}>
				<MenuButton as={Button}>
					<SettingsIcon />
				</MenuButton>
				<MenuList minWidth="240px">
					<MenuOptionGroup defaultValue="asc" type="radio">
						<MenuItemOption>Hide zero balances</MenuItemOption>
						<MenuDivider />
						<MenuItemOption
							icon={privacy ? <FiEyeOff /> : <FiEye />}
							onClick={() => togglePrivacy()}
						>
							Privacy mode
						</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
			<Select placeholder="Sort by" width="max-content">
				<option>type</option>
			</Select>
			<Button onClick={handleClick}>
				<MdExpand />
			</Button>
		</Flex>
	)
}
