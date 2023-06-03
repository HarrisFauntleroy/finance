import {
  Asset,
  AssetStatus,
  AssetTransaction,
  Category,
  Market,
} from "database/generated/prisma-client";
import { Table } from "../../Table";

import type { RouterOutput } from "../../../utils/trpc";
import { trpc } from "../../../utils/trpc";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  HStack,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { AssetWithCalculatedValues } from "common";
import currency from "currency.js";
import { formatDuration, intervalToDuration } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdCompareArrows } from "react-icons/md";
import { FormattedNumber } from "react-intl";
import Currency from "../../Currency";

const badgeColors: Record<Category, string> = {
  [Category.CASH]: "cyan",
  [Category.CREDIT]: "blue",
  [Category.CRYPTOCURRENCY]: "purple",
  [Category.CUSTOM]: "orange",
  [Category.INVESTMENT]: "green",
  [Category.SUPERANNUATION]: "yellow",
  LOAN: "",
  MORTGAGE: "",
  PROPERTY: "",
};

const statusColors: Record<AssetStatus, string> = {
  [AssetStatus.ACTIVE]: "green",
  [AssetStatus.CONNECTED]: "purple",
  [AssetStatus.ERROR]: "red",
  CONNECTION_FAILED: "",
  DISCONNECTED: "",
  PENDING_CONNECTION: "",
  UNAUTHORIZED: "",
  MAINTENANCE: "",
  BLOCKED: "",
  UNKNOWN: "",
  INACTIVE: "",
};

const StatusBadge = ({ status }: { status: AssetStatus | null }) => {
  const colorScheme = status ? statusColors[status] : "";
  return (
    <Badge colorScheme={colorScheme} variant="subtle">
      {status || ""}
    </Badge>
  );
};

const CategoryBadge = ({ category }: { category: Category | null }) => {
  const colorScheme = category ? badgeColors[category] : "";
  return <Badge colorScheme={colorScheme}>{category}</Badge>;
};

const assetsColumns: ColumnDef<AssetWithCalculatedValues>[] = [
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
            {subAssets?.map((subAsset) => (
              <Avatar
                key={subAsset?.id}
                name={subAsset?.market?.name || ""}
                title={subAsset?.market?.name || ""}
                src={subAsset?.market?.image || ""}
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
    }) => {
      return <CategoryBadge category={category} />;
    },
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
              <Currency value={balance} />
            )}
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
    }) => {
      return <StatusBadge status={status} />;
    },
  },
];

const subAssetsColumns: ColumnDef<
  Asset & {
    user: { settings: { userCurrency: string } | null };
    market: Market | null;
    transactions: AssetTransaction[];
  }
>[] = [
  {
    header: "Display Name",
    accessorKey: "name",
    cell: ({
      row: {
        getToggleExpandedHandler,
        original: { name, market, transactions },
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
            {transactions?.map((transaction) => (
              <ul key={transaction.id}>
                <li>Transaction</li>
                <li>{transaction.id}</li>
              </ul>
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
    }) => {
      return <CategoryBadge category={category} />;
    },
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
    }) => {
      return <StatusBadge status={status} />;
    },
  },
];

export type AssetsByUserIdQueryOutput = RouterOutput["assets"]["byUserId"];

export const AccountsList = () => {
  const toast = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || "",
  });

  const createAsset = trpc.assets.createOrUpdate.useMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValidSubmit = (submitData: any) => {
    if (userId) {
      if (submitData?.id) {
        return createAsset.mutateAsync(submitData).then((asset) => {
          queryClient.invalidateQueries();
          toast({
            title: `Successfully updated account ${asset.name}`,
            status: "success",
          });
        });
      }
      return createAsset.mutateAsync(submitData).then(({ name }) => {
        queryClient.invalidateQueries();
        toast({
          title: `Successfully created account ${name}`,
          status: "success",
        });
      });
    }
    return new Error("No userId provided");
  };

  return (
    <Table
      id="assetsOverview"
      data={data || []}
      columns={assetsColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
      onValidSubmit={onValidSubmit}
      renderExpandedRow={({ row }) =>
        (row?.original?.subAssets?.length || 0) > 0 && (
          <Table
            id="subAssetsOverview"
            data={row?.original?.subAssets}
            columns={subAssetsColumns}
            canExpandRows
            paginationEnabled
          />
        )
      }
    />
  );
};
