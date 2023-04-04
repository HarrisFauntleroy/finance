import { Table } from 'ui';

import { type RouterOutput, trpc } from '~/utils/trpc';

import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { portfolioOverviewColumns } from 'components/Portfolio/Accounts/columns';
import { useSession } from 'next-auth/react';
import { type SubmitHandler } from 'react-hook-form';

export type AssetsByUserIdQueryOutput = RouterOutput['assets']['byUserId'];

export const AccountsList = () => {
  const toast = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || '',
  });

  const createAsset = trpc.assets.create.useMutation();
  const updateAsset = trpc.assets.update.useMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValidSubmit: SubmitHandler<any> = (submitData) => {
    if (userId) {
      if (submitData?.id) {
        return updateAsset.mutateAsync(submitData).then((asset) => {
          queryClient.invalidateQueries();
          toast({
            title: `Successfully updated account ${asset.name}`,
            status: 'success',
          });
        });
      }
      return createAsset.mutateAsync(submitData).then(({ name }) => {
        queryClient.invalidateQueries();
        toast({
          title: `Successfully created account ${name}`,
          status: 'success',
        });
      });
    }
    return new Error('No userId provided');
  };

  return (
    <Table
      id="cryptocurrencyOverview"
      data={data || []}
      columns={portfolioOverviewColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
      onValidSubmit={onValidSubmit}
      renderExpandedRow={({ row }) =>
        (row?.original?.subAssets?.length || 0) > 0 && (
          <Table
            id="cryptocurrencyOverview"
            data={row?.original?.subAssets}
            columns={portfolioOverviewColumns}
            canExpandRows
            paginationEnabled
          />
        )
      }
    />
  );
};
