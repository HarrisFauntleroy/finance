import { Table } from 'ui';

import { trpc } from '../../../utils/trpc';

import { forexColumns } from './columns';

import { Stack } from '@chakra-ui/react';

export const Forex = () => {
  const { data } = trpc.markets.forex.useQuery();

  return (
    <Stack>
      <Table
        id="Forex"
        data={data || []}
        columns={forexColumns}
        canExpandRows
        paginationEnabled
      />
    </Stack>
  );
};
