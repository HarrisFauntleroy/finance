import React from "react";

import {
	Avatar,
	HStack,
	Icon,
	Stack,
	Stat,
	StatArrow,
	Text,
} from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { isNegative } from "common";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import Link from "next/link";
import { BsFileMinus, BsPlus } from "react-icons/bs";
import type { RouterOutput } from "~/components/Accounts/Overview";
import Currency from "~/components/Currency";

// Extracts the type of an array element
export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Column definitions for markets page */
export const cryptocurrencyColumns: ColumnDef<
	RouterOutput["markets"]["cryptocurrency"]
>[] = [
	{
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<HStack>
				<Icon
					{...{
						onClick: row.getToggleExpandedHandler(),
						style: { cursor: "pointer" },
						as: row.getIsExpanded() ? BsFileMinus : BsPlus,
						height: 8,
						width: 8,
					}}
				/>
				<Link
					href={{
						pathname: `/markets/crypto/${row.original.name}`,
						query: {
							name: row.original.name,
							ticker: row.original.ticker,
						},
					}}
					passHref
				>
					<Avatar
						size="sm"
						src={row.original.image || ""}
						backgroundColor="transparent
								"
					/>
				</Link>
				<Text>{row.original.ticker?.toUpperCase()}</Text>
			</HStack>
		),
	},
	{
		header: "Price",
		accessorKey: "price",
		cell: ({ row: { original: { price } } }) => (
			<Currency value={Number(price)} />
		),
	},
	{
		header: "24h",
		accessorKey: "priceChange24hPercent",
		cell: ({ row }) => (
			<Stack
				color={
					isNegative(Number(row.original.priceChange24hPercent))
						? "#E53E3E"
						: "#38A169"
				}
			>
				<Stat>
					<StatArrow
						type={
							isNegative(Number(row.original.priceChange24hPercent))
								? "decrease"
								: "increase"
						}
					/>
					{`${Number(row.original.priceChange24hPercent)}%`}
				</Stat>
				<Currency value={row.original.priceChange24h?.toString()} />
			</Stack>
		),
	},
	{
		header: "Last Update",
		cell: ({ row }) =>
			row.original?.updatedAt
				? formatDuration(
						intervalToDuration({
							start: new Date(),
							end: new Date(row.original?.updatedAt),
						}),
						{
							format: ["hours", "minutes"],
							delimiter: ", ",
						},
				  )
				: "",
	},
];
