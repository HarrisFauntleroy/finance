import { useMemo } from 'react';

import { Card, Table } from 'ui';

import { trpc } from '~/utils/trpc';

import { historySnapshotColumns } from '../columns';

import { Stack, Text } from '@chakra-ui/react';
import Chart from 'components/Chart';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

function sortFn<T extends { createdAt: Date }>(a: T, b: T) {
  if (a.createdAt < b.createdAt) {
    return -1;
  } else {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }
}

export const HistorySnapshots = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.historyByUserId.useQuery({
    userId: userId || '',
  });

  const { data: historyData } = trpc.assets.historyByUserId.useQuery({
    userId: userId || '',
  });

  /** Make a copy of the data to allow mutation/reversal */
  const tableData =
    historyData?.portfolioSnapshot &&
    Array.from(historyData?.portfolioSnapshot);

  const barSeries = useMemo(
    () =>
      data?.portfolioSnapshot.map(({ totalValue, createdAt }) => ({
        y: totalValue,
        x: format(new Date(createdAt), 'dd MMM'),
      })),
    [data?.portfolioSnapshot],
  );

  const options = {
    chart: {
      title: 'hello',
      id: 'apexchart-example',
    },
  };

  return (
    <Card>
      <Stack>
        <Text
          variant="h3"
          fontSize={{ base: 'lg', sm: '2xl' }}
          fontWeight="bold"
          lineHeight="1.2"
        >
          History Snapshots
        </Text>
        <Table
          pageSize={4}
          columns={historySnapshotColumns}
          id={'history-portfolioSnapshot'}
          // ISO8601See General principles was designed for lexicographical sort. As such the ISO8601 string representation can be sorted like any other string, and this will give the expected order
          // https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
          // This only works if the date includes the timezone
          data={tableData?.sort(sortFn).reverse() || []}
        />
        <Chart type="bar" options={options} series={[{ data: barSeries }]} />
      </Stack>
    </Card>
  );
};
