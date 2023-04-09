import { logger } from 'common';
import {
  AccountConnection,
  type Asset,
} from 'database/generated/prisma-client';
import { Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { CopyContent } from './CopyContent';

import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/table-core';
import { useSession } from 'next-auth/react';

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

  const handleValidSubmit = (submitData: Asset) => {
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

  const columnHelper = createColumnHelper<Asset>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('institution', {
      header: 'Institution',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('apiKey', {
      header: 'API Key',
      cell: ({ getValue }) => <CopyContent content={getValue()} /> || 'N/A',
    }),
    columnHelper.accessor('apiSecret', {
      header: 'API Secret',
      cell: ({ getValue }) => <CopyContent content={getValue()} /> || 'N/A',
    }),
    columnHelper.accessor('walletAddress', {
      header: 'Wallet Address',
      cell: ({ getValue }) => <CopyContent content={getValue()} /> || 'N/A',
    }),
    columnHelper.accessor('balance', {
      header: 'Balance',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('costBasis', {
      header: 'Cost Basis',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('realisedGain', {
      header: 'Realised Gains',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('targetBalance', {
      header: 'Target Balance',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('interestBearingBalance', {
      header: 'Interest Bearing Balance',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('incomeRate', {
      header: 'Income Rate',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: ({ getValue }) => getValue().toLocaleDateString(),
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Updated At',
      cell: ({ getValue }) => getValue().toLocaleDateString(),
    }),
    columnHelper.accessor('deleted', {
      header: 'Deleted',
      cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    }),
    columnHelper.accessor('deletedAt', {
      header: 'Deleted At',
      cell: ({ getValue }) => getValue()?.toLocaleDateString() || 'N/A',
    }),
    columnHelper.accessor('account', {
      header: 'Account Connection',
      cell: ({ getValue }) => getValue() || AccountConnection.NONE,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('categoryId', {
      header: 'Category ID',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('marketId', {
      header: 'Market ID',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('parentId', {
      header: 'Parent ID',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
    columnHelper.accessor('userId', {
      header: 'User ID',
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => getValue() || 'N/A',
    }),
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
