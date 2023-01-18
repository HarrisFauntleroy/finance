import React from "react"

import { Stack } from "@chakra-ui/react"
import { AccountsList } from "~/components/Portfolio/AccountsList"
import { ControlBar } from "~/components/Portfolio/ControlBar"

function Transactions() {
	return (
		<Stack paddingY="8px">
			<ControlBar />
			<AccountsList />
		</Stack>
	)
}

Transactions.auth = true
export default Transactions
