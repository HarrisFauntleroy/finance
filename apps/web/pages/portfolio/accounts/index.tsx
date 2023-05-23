import { Stack } from '@chakra-ui/react';
import { AccountBreakdown } from '../../../components/Portfolio/AccountBreakdown';
import { AccountsList } from '../../../components/Portfolio/Accounts/AccountsList';
import { ControlBar } from '../../../components/Portfolio/ControlBar';

function Accounts() {
  return (
    <Stack paddingY="8px">
      <div>Accounts</div>
      <ControlBar />
      <AccountsList />
      <AccountBreakdown />
    </Stack>
  );
}

Accounts.auth = true;
export default Accounts;
