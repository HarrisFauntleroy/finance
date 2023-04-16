import { AssetWithCalculatedValues } from 'common';
import { Table } from 'ui';

import { trpc } from '../../../../utils/trpc';

import { useAssetActions } from './hooks';

import { ColumnDef } from '@tanstack/table-core';
import { useSession } from 'next-auth/react';

export function AssetTable() {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || '',
  });

  const { handleValidSubmit } = useAssetActions(userId);

  const columns: ColumnDef<AssetWithCalculatedValues>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({
        row: {
          original: { id },
        },
      }) => {
        return id;
      },
    },
  ];

  return (
    <Table
      id="editableTable"
      data={data || []}
      columns={columns}
      filterEnabled={false}
      paginationEnabled={false}
      onValidSubmit={handleValidSubmit}
    />
  );
}
