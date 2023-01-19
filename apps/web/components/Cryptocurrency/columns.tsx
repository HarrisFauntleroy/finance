import React from "react"

import {
	Avatar,
	AvatarBadge,
	AvatarGroup,
	Badge,
	Flex,
	List,
	ListIcon,
	ListItem,
	Stack,
	Stat,
	StatArrow,
	Text,
} from "@chakra-ui/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { CalculatedCryptocurrency } from "common"
import { isNegative } from "common"
import formatDuration from "date-fns/formatDuration"
import intervalToDuration from "date-fns/intervalToDuration"
import Link from "next/link"
import { BsCurrencyDollar } from "react-icons/bs"
import { MdEdit, MdSync } from "react-icons/md"
import { FormattedNumber } from "react-intl"
import { Show } from "ui"
import { CryptoForm } from "~/components/Cryptocurrency/Form"
import Currency from "~/components/Currency"

/** Column definitions for crypto page */
export const cryptoColumns: ColumnDef<CalculatedCryptocurrency>[] = [
	{
		header: "Name",
		accessorKey: "name",
		cell: ({
			row: {
				getToggleExpandedHandler,
				original: {
					displayName,
					market,
					Children,
					apiKey,
					apiSecret,
					walletAddress,
				},
			},
		}) => (
			<Flex gap={1} alignItems="center">
				<AvatarGroup
					variant=""
					max={1}
					cursor="pointer"
					{...{
						onClick: getToggleExpandedHandler(),
					}}
				>
					<Avatar
						_hover={{ transform: "scale(1.05)" }}
						name={market?.name}
						title={market?.name}
						src={market?.image || ""}
					>
						{(apiKey || apiSecret || walletAddress) && (
							<AvatarBadge fontSize={16} bgColor="white">
								<MdSync color="green" />
							</AvatarBadge>
						)}
					</Avatar>
					{Children?.map(({ id, market: childMarket }) => (
						<Avatar
							key={id}
							name={childMarket?.name}
							title={childMarket?.name}
							src={childMarket?.image || ""}
						></Avatar>
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
						{displayName}
					</Text>
				</Link>
			</Flex>
		),
	},
	{
		header: "Balance",
		accessorKey: "balance",
		cell: ({
			row: {
				original: { balance },
			},
		}) => <FormattedNumber value={Number(balance)} />,
	},
	{
		header: "Value",
		accessorKey: "value",
		cell: ({
			row: {
				original: { value, price, market },
			},
		}) => (
			<Stack>
				<Currency value={value} />
				<Flex gap={1}>
					= <Currency value={price?.toString()} /> /
					<Text>{market?.ticker.toUpperCase()}</Text>
				</Flex>
			</Stack>
		),
	},
	{
		header: "ROI",
		accessorKey: "unrealisedGain",
		cell: ({
			row: {
				original: { unrealisedGainPercentage, unrealisedGain },
			},
		}) => (
			<Stack
				color={isNegative(unrealisedGainPercentage) ? "#E53E3E" : "#38A169"}
			>
				<Stat>
					<StatArrow
						type={
							isNegative(unrealisedGainPercentage) ? "decrease" : "increase"
						}
					/>
					<FormattedNumber
						value={Number(unrealisedGainPercentage)}
						style="percent"
					/>
				</Stat>
				<Currency value={unrealisedGain} />
			</Stack>
		),
	},
	{
		header: "Cost Basis",
		accessorKey: "costBasis",
		cell: ({
			row: {
				original: { market, costBasis, averageCost },
			},
		}) => (
			<Stack>
				<Currency value={costBasis?.toString()} /> /
				<Flex gap={1}>
					≈ <Currency value={averageCost} /> /
					<Text>{market?.ticker.toUpperCase()}</Text>
				</Flex>
			</Stack>
		),
	},
	{
		header: "Staking",
		accessorKey: "incomeRate",
		cell: ({
			row: {
				original: { incomeRate, interestBearingBalance, estimatedYearlyReturn },
			},
		}) => (
			<Show when={Number(interestBearingBalance) > 0}>
				<Stack gap={1}>
					<Text>
						<>
							{interestBearingBalance} @ {incomeRate}%
						</>
					</Text>
					<Badge maxWidth="max-content" colorScheme="green">
						<Flex gap={1}>
							Yearly: <Currency value={estimatedYearlyReturn} />
						</Flex>
					</Badge>
				</Stack>
			</Show>
		),
	},
	{
		header: "24h",
		accessorKey: "markets.priceChange24hPercent",
		cell: ({
			row: {
				original: { market },
			},
		}) =>
			market && (
				<Stack
					color={
						isNegative(Number(market?.priceChange24hPercent))
							? "#E53E3E"
							: "#38A169"
					}
				>
					<Stat>
						<StatArrow
							type={
								isNegative(Number(market?.priceChange24hPercent))
									? "decrease"
									: "increase"
							}
						/>
						{`${Number(market?.priceChange24hPercent).toFixed(2)}%`}
					</Stat>
					<Currency value={market?.priceChange24h?.toString()} />
				</Stack>
			),
	},
	{
		header: "Last Update",
		cell: ({
			row: {
				original: { market, updatedAt },
			},
		}) => (
			<List>
				<ListItem>
					<ListIcon as={MdEdit} />
					{formatDuration(
						intervalToDuration({
							start: new Date(),
							end: updatedAt,
						}),
						{
							format: ["hours", "minutes", "seconds"],
							delimiter: ", ",
						}
					)}
				</ListItem>
				{market?.updatedAt && (
					<ListItem>
						<ListIcon as={BsCurrencyDollar} />
						{formatDuration(
							intervalToDuration({
								start: new Date(),
								end: market?.updatedAt,
							}),
							{
								format: ["hours", "minutes", "seconds"],
								delimiter: ", ",
							}
						)}
					</ListItem>
				)}
			</List>
		),
	},
	{
		header: "update",
		cell: ({
			row: {
				original: { id },
			},
		}) => <CryptoForm mode="update" id={id} />,
	},
]
