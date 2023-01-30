import React from "react"

import {
	Avatar,
	AvatarGroup,
	Badge,
	Flex,
	HStack,
	Stack,
	Text,
	Tooltip,
} from "@chakra-ui/react"
import type { ColumnDef } from "@tanstack/react-table"
import currency from "currency.js"
import { AssetStatus, Category } from "database/generated/prisma-client"
import formatDuration from "date-fns/formatDuration"
import intervalToDuration from "date-fns/intervalToDuration"
import Link from "next/link"
import { MdCompareArrows } from "react-icons/md"
import { FormattedNumber } from "react-intl"
import Currency from "~/components/Currency"
import type { RouterOutput } from "~/utils/trpc"

type ColumnInput = RouterOutput["assets"]["byUserId"]

export const overviewAccountsListColumns: ColumnDef<ColumnInput[0]>[] = [
	{
		header: "Display Name",
		accessorKey: "name",
		cell: ({
			row: {
				getToggleExpandedHandler,
				original: { name, market, subAssets },
			},
		}) => {
			return (
				<HStack>
					<AvatarGroup
						max={1}
						cursor="pointer"
						{...{
							onClick: getToggleExpandedHandler(),
						}}
					>
						<Avatar
							_hover={{ transform: "scale(1.05)" }}
							name={market?.name || ""}
							title={market?.name || ""}
							src={market?.image || ""}
						/>
						{subAssets?.map(({ id, market: childMarket }) => (
							<Avatar
								key={id}
								name={childMarket?.name || ""}
								title={childMarket?.name || ""}
								src={childMarket?.image || ""}
							/>
						))}
					</AvatarGroup>
					<Link
						href={{
							pathname: `/markets/crypto/${market?.name}`,
							query: {
								name: market?.name,
								ticker: market?.ticker,
							},
						}}
					>
						<Text
							maxW="128px"
							overflow="hidden"
							whiteSpace="nowrap"
							textOverflow="ellipsis"
						>
							{name}
						</Text>
					</Link>
				</HStack>
			)
		},
	},
	{
		header: "Category",
		accessorKey: "category",
		cell: ({
			row: {
				original: { category },
			},
		}) => {
			const renderBadge = () => {
				let props = {}
				switch (category) {
					case Category.CASH:
						return (props = {
							colorScheme: "cyan",
							...props,
						})
					case Category.CREDIT:
						return (props = {
							colorScheme: "blue",
							...props,
						})
					case Category.CRYPTOCURRENCY:
						return (props = {
							colorScheme: "purple",
							...props,
						})
					case Category.CUSTOM:
						return (props = {
							colorScheme: "orange",
							...props,
						})
					case Category.INVESTMENT:
						return (props = {
							colorScheme: "green",
							...props,
						})
					case Category.SUPERANNUATION:
						return (props = {
							colorScheme: "yellow",
							...props,
						})
					default:
						break
				}
			}
			const props = renderBadge()

			return (
				<Flex justify="right">
					<Badge {...props}> {category}</Badge>
				</Flex>
			)
		},
	},
	// {
	// 	header: "Institution",
	// 	accessorKey: "institution",
	// 	cell: ({
	// 		row: {
	// 			original: { institution },
	// 		},
	// 	}) => <Text>{institution}</Text>,
	// },
	{
		header: "Balance",
		accessorKey: "balance",
		cell: ({
			row: {
				original: { value, price, market, balance, category },
			},
		}) => {
			return (
				<Tooltip
					label={`${market?.ticker?.toUpperCase()} is trading at price: ${currency(
						price
					).format()}`}
				>
					<Stack textAlign="right">
						{category === Category.CRYPTOCURRENCY ? (
							<>
								<FormattedNumber value={Number(balance)} />
								<Flex gap={1} justify="right">
									<MdCompareArrows /> <Currency value={value} />
								</Flex>
							</>
						) : (
							<Currency value={value} />
						)}
					</Stack>
				</Tooltip>
			)
		},
	},
	// Perhaps in a more market related area
	// or the accounts page itself, just not overview
	// {
	// 	header: "ROI",
	// 	accessorKey: "unrealisedGain",
	// 	cell: ({
	// 		row: {
	// 			original: { unrealisedGainPercentage, unrealisedGain },
	// 		},
	// 	}) => (
	// 		<Stack
	// 			color={isNegative(unrealisedGainPercentage) ? "#E53E3E" : "#38A169"}
	// 		>
	// 			<Stat>
	// 				<StatArrow
	// 					type={
	// 						isNegative(unrealisedGainPercentage) ? "decrease" : "increase"
	// 					}
	// 				/>
	// 				<FormattedNumber
	// 					value={Number(unrealisedGainPercentage)}
	// 					style="percent"
	// 				/>
	// 			</Stat>
	// 			<Currency value={unrealisedGain} />
	// 		</Stack>
	// 	),
	// },
	// {
	// 	header: "Cost Basis",
	// 	accessorKey: "costBasis",
	// 	cell: ({
	// 		row: {
	// 			original: { market, costBasis, averageCost },
	// 		},
	// 	}) => (
	// 		<Stack>
	// 			<Currency value={costBasis?.toString()} /> /
	// 			<Flex gap={1}>
	// 				<MdCompareArrows />
	// 				<Currency value={averageCost} /> /
	// 				<Text>{market?.ticker.toUpperCase()}</Text>
	// 			</Flex>
	// 		</Stack>
	// 	),
	// },
	{
		header: "Last Update",
		cell: ({
			row: {
				original: { updatedAt },
			},
		}) => {
			return (
				<Text>
					{formatDuration(
						intervalToDuration({
							start: new Date(),
							end: updatedAt,
						}),
						{
							format: ["hours", "minutes"],
							delimiter: ", ",
						}
					) || "Less than a minutes ago"}
				</Text>
			)
		},
	},
	{
		header: "Status",
		cell: ({
			row: {
				original: { status },
			},
		}) => {
			const statusColor = () => {
				switch (status) {
					case AssetStatus.ACTIVE:
						return (
							<Badge colorScheme="green" variant="subtle">
								{status}
							</Badge>
						)
					case AssetStatus.CONNECTED:
						return (
							<Badge colorScheme="purple" variant="subtle">
								{status}
							</Badge>
						)
					case AssetStatus.ERROR:
						return (
							<Badge colorScheme="red" variant="subtle">
								{status}
							</Badge>
						)
					default:
						return <Badge variant="subtle">{status}</Badge>
				}
			}
			return statusColor()
		},
	},
]
