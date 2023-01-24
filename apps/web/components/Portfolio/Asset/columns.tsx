import React from "react"

import {
	Avatar,
	AvatarBadge,
	AvatarGroup,
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
import { isNegative } from "common"
import formatDuration from "date-fns/formatDuration"
import intervalToDuration from "date-fns/intervalToDuration"
import Link from "next/link"
import { BsCurrencyDollar } from "react-icons/bs"
import { MdEdit, MdSync } from "react-icons/md"
import { FormattedNumber } from "react-intl"
import Currency from "~/components/Currency"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const assetColumns: ColumnDef<any>[] = [
	{
		header: "Display Name",
		accessorKey: "name",
		cell: ({
			row: {
				getToggleExpandedHandler,
				original: { name, market, Children, apiKey, apiSecret, walletAddress },
			},
		}) => (
			<Flex gap={1} alignItems="center">
				<AvatarGroup
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
						{name}
					</Text>
				</Link>
			</Flex>
		),
	},
	{
		header: "Institution",
		accessorKey: "institution",
		cell: ({
			row: {
				original: { institution },
			},
		}) => <Text>{institution}</Text>,
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
]
