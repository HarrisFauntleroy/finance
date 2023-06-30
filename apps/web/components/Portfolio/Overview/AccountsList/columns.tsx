import {
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  HStack,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/table-core";
import {
  Asset,
  AssetStatus,
  AssetTransaction,
  Category,
  Market,
} from "database/generated/prisma-client";
import { formatDuration, intervalToDuration } from "date-fns";
import Link from "next/link";
import { FormattedNumber } from "react-intl";

const renderCategoryBadge = (category: Category | null) => {
  let properties = {};
  switch (category) {
    case Category.CASH: {
      properties = {
        colorScheme: "cyan",
        ...properties,
      };
      break;
    }
    case Category.CREDIT: {
      properties = {
        colorScheme: "blue",
        ...properties,
      };
      break;
    }
    case Category.CRYPTOCURRENCY: {
      properties = {
        colorScheme: "purple",
        ...properties,
      };
      break;
    }
    case Category.CUSTOM: {
      properties = {
        colorScheme: "orange",
        ...properties,
      };
      break;
    }
    case Category.INVESTMENT: {
      properties = {
        colorScheme: "green",
        ...properties,
      };
      break;
    }
    case Category.SUPERANNUATION: {
      properties = {
        colorScheme: "yellow",
        ...properties,
      };
      break;
    }
    default: {
      break;
    }
  }
  return <Badge {...properties}>{category}</Badge>;
};

const statusColor = (status: AssetStatus | null) => {
  switch (status) {
    case AssetStatus.ACTIVE: {
      return (
        <Badge colorScheme="green" variant="subtle">
          {status}
        </Badge>
      );
    }
    case AssetStatus.CONNECTED: {
      return (
        <Badge colorScheme="purple" variant="subtle">
          {status}
        </Badge>
      );
    }
    case AssetStatus.ERROR: {
      return (
        <Badge colorScheme="red" variant="subtle">
          {status}
        </Badge>
      );
    }
    default: {
      return <Badge variant="subtle">{status}</Badge>;
    }
  }
};

export const portfolioOverviewAssetsColumns: ColumnDef<
  Asset & {
    subAssets: Asset[];
    transactions: AssetTransaction[];
    user: { settings: { userCurrency: string } | null };
    market: Market | null;
  }
>[] = [
  {
    header: "Display Name",
    accessorKey: "name",
    cell: ({
      row: {
        getToggleExpandedHandler,
        original: { name, market },
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
      );
    },
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({
      row: {
        original: { category },
      },
    }) => <Flex justify="right">{renderCategoryBadge(category)}</Flex>,
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
        original: { balance, category },
      },
    }) => {
      return (
        <Tooltip
        //   label={`${market?.ticker?.toUpperCase()} is trading at price: ${currency(
        //     price,
        //   ).format()}`}
        >
          <Stack textAlign="right" gap="8px">
            {category === Category.CRYPTOCURRENCY && (
              <FormattedNumber value={Number(balance)} />
            )}
            <Flex gap={1} justify="right">
              {/* <MdCompareArrows /> <Currency value={saleableValue || value} /> */}
            </Flex>
          </Stack>
        </Tooltip>
      );
    },
  },
  {
    header: "Calculated Value",
    accessorKey: "balance",
    cell: () => {
      return (
        <Tooltip
        // label={`${market?.ticker?.toUpperCase()} is trading at price: ${currency(
        //   price,
        // ).format()}`}
        >
          <Stack textAlign="right" gap="8px">
            <Flex gap={1} justify="right">
              {/* <MdCompareArrows /> <Currency value={saleableValue} /> */}
            </Flex>
          </Stack>
        </Tooltip>
      );
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
      );
    },
  },
  {
    header: "Status",
    cell: ({
      row: {
        original: { status },
      },
    }) => statusColor(status),
  },
];
