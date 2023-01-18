import React from "react"

import { Flex, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { AccountBreakdown } from "~/components/Portfolio/AccountBreakdown"
import { AccountsList } from "~/components/Portfolio/AccountsList"
import { ControlBar } from "~/components/Portfolio/ControlBar"

function Accounts() {
	return (
		<Stack paddingY="8px">
			<ControlBar />
			<AccountsList />
			<Flex>
				<Table>
					<Thead>
						<Tr>
							<Th>Display Name</Th>
							<Th></Th>
							<Th>Balance (?)</Th>
							<Th>Last Updated</Th>
							<Th>Status</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Amex</Td>
							<Td>CREDIT</Td>
							<Td>$30,849.86</Td>
							<Td>3 minutes ago</Td>
							<Td>Active</Td>
							<Td>{">"}</Td>
						</Tr>
						<Tr>
							<Td>Swyftx</Td>
							<Td>CRYPTO</Td>
							<Td>$306</Td>
							<Td>2 minutes ago</Td>
							<Td>Active</Td>
							<Td>{">"}</Td>
						</Tr>
						<Tr>
							<Td>Bitcoin</Td>
							<Td>CRYPTO</Td>
							<Td>$27,849.86</Td>
							<Td>3 minutes ago</Td>
							<Td>Active</Td>
							<Td>{">"}</Td>
						</Tr>
						<Tr>
							<Td>VDHG</Td>
							<Td>STOCK</Td>
							<Td>$30,849.86</Td>
							<Td>3 minutes ago</Td>
							<Td>Active</Td>
							<Td>{">"}</Td>
						</Tr>
					</Tbody>
				</Table>
				<AccountBreakdown />
			</Flex>
		</Stack>
	)
}

Accounts.auth = true
export default Accounts
