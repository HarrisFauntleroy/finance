import React from 'react';

import { Stack } from '@chakra-ui/react';
import { AccountBreakdown } from 'components/Portfolio/AccountBreakdown';
import { AccountsList } from 'components/Portfolio/Accounts/AccountsList';
import { ControlBar } from 'components/Portfolio/ControlBar';

function Accounts() {
  return (
    <Stack paddingY="8px" height="100%" maxWidth="100%">
      <ControlBar />
      <Stack>
        <AccountsList />
        <AccountBreakdown />
      </Stack>
    </Stack>
  );
}

Accounts.auth = true;
export default Accounts;
