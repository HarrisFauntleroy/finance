import React, { useContext } from "react"

import { LinkIcon } from "@chakra-ui/icons"
import {
	ButtonGroup,
	HStack,
	IconButton,
	Skeleton,
	Stack,
	Switch,
	Text,
} from "@chakra-ui/react"
import type { CalculatedCryptocurrency } from "common"
import { useSession } from "next-auth/react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { MdRefresh } from "react-icons/md"
import { Card, Loading, Table } from "ui"
import { PrivacyContext } from "~/components/Context/Privacy"
import { CryptoForm } from "~/components/Cryptocurrency/Form"
import TableSubComponent from "~/components/Cryptocurrency/SubRow"
import { cryptoColumns } from "~/components/Cryptocurrency/columns"
import { trpc } from "~/utils/trpc"

export const AccountsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	const { data, status } = trpc.cryptocurrency.byUserId.useQuery({
		userId: userId || "",
	})

	if (status === "loading") {
		return <Loading />
	}

	return (
		<Card>
			<Skeleton rounded="xl" isLoaded={!!data}>
				<Table
					id="cryptocurrencyOverview"
					data={(data as CalculatedCryptocurrency[]) || []}
					columns={cryptoColumns}
					getRowCanExpand
					filterEnabled
					paginationEnabled
					// If children show them as sub table
					renderSubComponent={(props) =>
						(props?.row?.original?.Children?.length || 0) > 0 ? (
							<Stack>
								<Table
									id="cryptocurrencyOverview"
									data={props?.row?.original?.Children || []}
									columns={cryptoColumns}
									getRowCanExpand
									renderSubComponent={TableSubComponent}
									paginationEnabled
								/>
								<TableSubComponent row={props.row} />
							</Stack>
						) : (
							<TableSubComponent row={props.row} />
						)
					}
				>
					<HStack overflowX="scroll">
						<Text
							variant="h3"
							fontSize={{ base: "lg", sm: "2xl" }}
							fontWeight="bold"
							lineHeight="1.2"
						>
							Assets
						</Text>
						<ButtonGroup alignItems="center">
							<CryptoForm mode="add" />
							<IconButton
								size="sm"
								icon={<MdRefresh />}
								aria-label=""
								onClick={() => fetch("api/market/prices")}
							/>
							<IconButton
								size="sm"
								icon={<LinkIcon />}
								aria-label=""
								onClick={() => fetch("api/swyftx")}
							/>
							<IconButton
								size="sm"
								icon={privacy ? <FiEyeOff /> : <FiEye />}
								aria-label=""
								onClick={() => togglePrivacy()}
							/>
							<Switch size="sm" width="max-content">
								Display zero balances
							</Switch>
						</ButtonGroup>
					</HStack>
				</Table>
			</Skeleton>
		</Card>
	)
}
