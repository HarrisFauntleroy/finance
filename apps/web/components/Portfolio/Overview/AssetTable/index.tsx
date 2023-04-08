import { Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { columns } from './columns';
import { useAssetActions } from './hooks';

import { useSession } from 'next-auth/react';

export function AssetTable() {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || '',
  });

  const { handleValidSubmit } = useAssetActions(userId);

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
