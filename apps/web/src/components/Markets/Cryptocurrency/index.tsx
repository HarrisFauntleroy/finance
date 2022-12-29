import React, { useContext } from "react"

import {
	HStack,
	IconButton,
	Skeleton,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react"
import NextError from "next/error"
import Link from "next/link"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { MdRefresh } from "react-icons/md"
import { PrivacyContext } from "~/components/AppContext/Privacy"
import { Loading, Table, Card } from "ui"
import { cryptocurrencyColumns } from "~/components/Markets/Cryptocurrency/columns"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

export const Cryptocurrency = () => {
	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	/** Toasts */
	const toast = useToast()

	const { data, error, status } = trpc.markets.cryptocurrency.useQuery()

	if (error) {
		return (
			<NextError
				title={error.message}
				statusCode={error.data?.httpStatus ?? 500}
			/>
		)
	}

	if (status !== "success") {
		return <Loading />
	}
	return (
		<Stack>
			<Card>
				<Skeleton rounded="xl" isLoaded={!!data}>
					<Table
						id="Cryptocurrency"
						data={data || []}
						columns={cryptocurrencyColumns}
						getRowCanExpand
						paginationEnabled
					>
						<HStack>
							<IconButton
								icon={<MdRefresh />}
								aria-label=""
								onClick={() => {
									fetch("api/market/prices")
										.then(() =>
											toast({
												title: "Succesfully refreshed",
												status: "success",
												...defaultToast,
											})
										)
										.catch(() =>
											toast({
												title: "Failed to refresh",
												status: "error",
												...defaultToast,
											})
										)
								}}
							/>
							{privacy.toString()}
							<IconButton
								icon={privacy ? <FiEyeOff /> : <FiEye />}
								aria-label=""
								onClick={() => togglePrivacy()}
							/>
						</HStack>
					</Table>
				</Skeleton>
			</Card>
			<Text textAlign="center">
				Price data provided by{" "}
				<Link href="https://www.coingecko.com">CoinGecko</Link>
			</Text>
		</Stack>
	)
}
