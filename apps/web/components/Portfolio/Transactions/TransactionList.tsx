import React from 'react';

import { Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { transactionsListColumns } from 'components/Portfolio/Transactions/columns';
import { useSession } from 'next-auth/react';

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
      getRowCanExpand
      filterEnabled
      paginationEnabled
      renderSubRow={(props) =>
        props?.row?.original?.Children?.length > 0 && (
          <Table
            id="assetOverview"
            data={props?.row?.original?.Children}
            columns={transactionsListColumns}
            getRowCanExpand
            paginationEnabled
          />
        )
      }
    />
  );
};
