import React from 'react';

import { Page } from 'ui';

import Accounts from './accounts';
import Overview from './overview';
import Statistics from './statistics';
import Transactions from './transactions';

import { Stack, Tabs } from '@mantine/core';

const Portfolio = () => {
  return (
    <Page title="Portfolio">
      <Stack h="100%">
        <Tabs h="100%" p="8px">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="accounts">Accounts</Tabs.Tab>
            <Tabs.Tab value="transactions">Transactions</Tabs.Tab>
            <Tabs.Tab value="statistics">Statistics</Tabs.Tab>
          </Tabs.List>
          <Tabs.List h="100%" p="8px">
            <Tabs.Panel value="overview" p={0} h="100%">
              <Stack py="8px">
                <Overview />
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="accounts" p={0} h="100%">
              <Stack py="8px">
                <Accounts />
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="transactions" p={0} h="100%">
              <Stack py="8px">
                <Transactions />
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="statistics" p={0} h="100%">
              <Stack py="8px">
                <Statistics />
              </Stack>
            </Tabs.Panel>
          </Tabs.List>
        </Tabs>
      </Stack>
    </Page>
  );
};

Portfolio.auth = true;
export default Portfolio;
