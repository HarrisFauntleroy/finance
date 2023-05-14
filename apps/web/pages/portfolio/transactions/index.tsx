import React from 'react';

import { Stack } from '@chakra-ui/react';
import { JSONObjectViewer } from 'ui';

function Transactions() {
  return (
    <Stack direction="column" paddingY="8px" height="100%">
      <JSONObjectViewer
        data={JSON.stringify({
          id: '1',
        })}
      />
    </Stack>
  );
}

Transactions.auth = true;
export default Transactions;
