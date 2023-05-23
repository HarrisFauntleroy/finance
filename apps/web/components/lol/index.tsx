import { logger } from 'common';
import { AccountConnection, Asset } from 'database/generated/prisma-client';
import { Table } from '../Table';

import { trpc } from '../../utils/trpc';

import { CopyContent } from './CopyContent';

import { Text, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/table-core';
import { useSession } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';

const columns: ColumnDef<Asset>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({
      row: {
        original: { id },
      },
    }) => <Text>{id}</Text>,
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({
      row: {
        original: { name },
      },
    }) => <Text>{name}</Text>,
  },
  {
    header: 'Institution',
    accessorKey: 'institution',
    cell: ({
      row: {
        original: { institution },
      },
    }) => <Text>{institution || 'N/A'}</Text>,
  },
  {
    header: 'Currency',
    accessorKey: 'currency',
    cell: ({
      row: {
        original: { currency },
      },
    }) => <Text>{currency}</Text>,
  },
  {
    header: 'API Key',
    accessorKey: 'apiKey',
    cell: ({
      row: {
        original: { apiKey },
      },
    }) => <CopyContent content={apiKey} />,
  },
  {
    header: 'API Secret',
    accessorKey: 'apiSecret',
    cell: ({
      row: {
        original: { apiSecret },
      },
    }) => <CopyContent content={apiSecret} />,
  },
  {
    header: 'Wallet Address',
    accessorKey: 'walletAddress',
    cell: ({
      row: {
        original: { walletAddress },
      },
    }) => <CopyContent content={walletAddress} />,
  },
  {
    header: 'Balance',
    accessorKey: 'balance',
    cell: ({
      row: {
        original: { balance },
      },
    }) => <Text>{balance}</Text>,
  },
  {
    header: 'Cost Basis',
    accessorKey: 'costBasis',
    cell: ({
      row: {
        original: { costBasis },
      },
    }) => <Text>{costBasis}</Text>,
  },
  {
    header: 'Realised Gains',
    accessorKey: 'realisedGain',
    cell: ({
      row: {
        original: { realisedGain },
      },
    }) => <Text>{realisedGain}</Text>,
  },
  {
    header: 'Target Balance',
    accessorKey: 'targetBalance',
    cell: ({
      row: {
        original: { targetBalance },
      },
    }) => <Text>{targetBalance || 'N/A'}</Text>,
  },
  {
    header: 'Interest Bearing Balance',
    accessorKey: 'interestBearingBalance',
    cell: ({
      row: {
        original: { interestBearingBalance },
      },
    }) => <Text>{interestBearingBalance || 'N/A'}</Text>,
  },
  {
    header: 'Income Rate',
    accessorKey: 'incomeRate',
    cell: ({
      row: {
        original: { incomeRate },
      },
    }) => <Text>{incomeRate || 'N/A'}</Text>,
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({
      row: {
        original: { createdAt },
      },
    }) => <Text>{createdAt.toLocaleDateString()}</Text>,
  },
  {
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({
      row: {
        original: { updatedAt },
      },
    }) => <Text>{updatedAt.toLocaleDateString()}</Text>,
  },
  {
    header: 'Deleted',
    accessorKey: 'deleted',
    cell: ({
      row: {
        original: { deleted },
      },
    }) => <Text>{deleted ? 'Yes' : 'No'}</Text>,
  },
  {
    header: 'Deleted At',
    accessorKey: 'deletedAt',
    cell: ({
      row: {
        original: { deletedAt },
      },
    }) => <Text>{deletedAt?.toLocaleDateString() || 'N/A'}</Text>,
  },
  {
    header: 'Account Connection',
    accessorKey: 'account',
    cell: ({
      row: {
        original: { account },
      },
    }) => <Text>{account || AccountConnection.NONE}</Text>,
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: ({
      row: {
        original: { category },
      },
    }) => <Text>{category || 'N/A'}</Text>,
  },
  {
    header: 'Category ID',
    accessorKey: 'categoryId',
    cell: ({
      row: {
        original: { categoryId },
      },
    }) => <Text>{categoryId || 'N/A'}</Text>,
  },
  {
    header: 'Market ID',
    accessorKey: 'marketId',
    cell: ({
      row: {
        original: { marketId },
      },
    }) => <Text>{marketId || 'N/A'}</Text>,
  },
  {
    header: 'Parent ID',
    accessorKey: 'parentId',
    cell: ({
      row: {
        original: { parentId },
      },
    }) => <Text>{parentId || 'N/A'}</Text>,
  },
  {
    header: 'User ID',
    accessorKey: 'userId',
    cell: ({
      row: {
        original: { userId },
      },
    }) => <Text>{userId}</Text>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({
      row: {
        original: { status },
      },
    }) => <Text>{status || 'N/A'}</Text>,
  },
];

export function AssetTable() {
  const toast = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || '',
  });

  const createAsset = trpc.assets.create.useMutation();
  const updateAsset = trpc.assets.update.useMutation();

  console.log(userId);
  console.log(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValidSubmit: SubmitHandler<any> = (submitData) => {
    if (userId) {
      if (submitData?.id) {
        return updateAsset
          .mutateAsync(submitData)
          .then((asset) => {
            queryClient.invalidateQueries();
            toast({
              title: `Successfully updated account ${asset.name}`,
              status: 'success',
            });
          })
          .catch(logger.error);
      }
      return createAsset
        .mutateAsync(submitData)
        .then(({ name }) => {
          queryClient.invalidateQueries();
          toast({
            title: `Successfully created account ${name}`,
            status: 'success',
          });
        })
        .catch(logger.error);
    }
    return new Error('No userId provided');
  };

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
