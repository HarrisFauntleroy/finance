import { Table } from 'ui';

import { trpc } from '../../../utils/trpc';

import { useSession } from 'next-auth/react';
import { transactionsListColumns } from '../..//Portfolio/Transactions/columns';

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assetTransactions.byUserId.useQuery({
    userId: userId || '',
  });

  return (
    <Table
      id="assetOverview"
      data={data || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  );
};
