import React, { useContext } from "react"

import { forexColumns } from "./columns"
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
import { Card, Table } from "ui"
import { PrivacyContext } from "~/providers/Privacy"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

export const Forex = () => {
	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	/** Toasts */
	const toast = useToast()

	const { data, error } = trpc.markets.forex.useQuery()
	if (error) {
		return (
			<NextError
				title={error.message}
				statusCode={error.data?.httpStatus ?? 500}
			/>
		)
	}

	return (
		<Stack>
			<Card>
				<Skeleton rounded="xl" isLoaded={!!data}>
					<Table
						id="Forex"
						data={data || []}
						columns={forexColumns}
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