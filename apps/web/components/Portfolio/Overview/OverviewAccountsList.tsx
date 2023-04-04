import { Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { ControlBar } from '../ControlBar';
import { transactionsListColumns } from '../Transactions/columns';

import { Stack, Text } from '@chakra-ui/react';
import { overviewAccountsListColumns } from 'components/Portfolio/Overview/columns';
import TableSubComponent from 'components/Portfolio/Overview/TableSubRow';
import type {
  Asset,
  AssetTransaction,
  Market,
} from 'database/generated/prisma-client/index';
import { useSession } from 'next-auth/react';

const TransactionTable = ({
  transactions,
}: {
  transactions: AssetTransaction[];
}) => {
  return transactions.length > 0 ? (
    <Table
      id="portfolioOverviewAssetTransactions"
      data={transactions || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  ) : (
    <Text>No Transactions to display</Text>
  );
};

const AssetTable = ({
  assets,
}: {
  assets?: (Asset & {
    transactions: AssetTransaction[];
    user: {
      settings: {
        userCurrency: string;
      } | null;
    };
    market: Market | null;
  })[];
}) => {
  return assets && assets?.length > 0 ? (
    <Table
      id="portfolioOverviewAssets"
      data={assets || []}
      columns={overviewAccountsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
      renderExpandedRow={(props) => {
        return (
          <Stack>
            <AssetTable assets={props.row.original.subAssets} />
            <TransactionTable transactions={props.row.original.transactions} />
            {/* Optional debug stuff  */}
            <TableSubComponent row={props.row} />
          </Stack>
        );
      }}
    />
  ) : (
    <Text>No Assets to display</Text>
  );
};

export const OverviewAccountsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || '',
  });

  return (
    <Stack>
      <ControlBar />
      <AssetTable assets={data} />
    </Stack>
  );
};
