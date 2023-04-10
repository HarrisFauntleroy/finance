import { ControlBar } from '../../ControlBar';
import { AssetTable } from '../AssetTable';

import { Stack } from '@chakra-ui/react';

export const OverviewAccountsList = () => {
  return (
    <Stack>
      <ControlBar />
      <AssetTable />
    </Stack>
  );
};
