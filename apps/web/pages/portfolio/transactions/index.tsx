import React from 'react';

import { Stack } from '@chakra-ui/react';
import { AssetTransactionControl } from 'components/Portfolio/AssetTransactionControl';
import { TransactionsList } from 'components/Portfolio/Transactions/TransactionList';

function Transactions() {
  return (
    <Stack direction="column" paddingY="8px" height="100%">
      <AssetTransactionControl />
      <TransactionsList />
    </Stack>
  );
}

Transactions.auth = true;
export default Transactions;
