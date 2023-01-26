import React from "react"

import { Flex, Stack } from "@chakra-ui/react"
import { AccountBreakdown } from "~/components/Portfolio/AccountBreakdown"
import { AccountsList } from "~/components/Portfolio/Accounts/AccountsList"
import { ControlBar } from "~/components/Portfolio/ControlBar"

function Accounts() {
	return (
		<Stack paddingY="8px" height="100%">
			<ControlBar />
			<Flex>
				<AccountsList />
				<AccountBreakdown />
			</Flex>
		</Stack>
	)
}

Accounts.auth = true
export default Accounts
