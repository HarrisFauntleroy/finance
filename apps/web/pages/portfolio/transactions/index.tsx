import React from "react"

import { Stack } from "@chakra-ui/react"
import { AccountsList } from "~/components/Portfolio/AccountsList"
import { AssetTransactionControl } from "~/components/Portfolio/AssetTransactionControl"

function Transactions() {
	return (
		<Stack direction="column" paddingY="8px" height="100%">
			<AssetTransactionControl />
			<AccountsList />
		</Stack>
	)
}

Transactions.auth = true
export default Transactions
