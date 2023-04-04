import { Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { transactionsListColumns } from 'components/Budget/Transactions/columns';
import { useSession } from 'next-auth/react';

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.budgetTransactions.byUserId.useQuery({
    userId: userId || '',
  });

  return (
    <Table
      id="budgetOverview"
      data={data || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  );
};
