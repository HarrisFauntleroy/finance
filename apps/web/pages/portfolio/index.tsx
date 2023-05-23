import React from 'react';

import { Page } from '../../components/Layout/Page';

import Accounts from './accounts';
import Overview from './overview';
import Statistics from './statistics';
import Transactions from './transactions';

import { Tabs } from '@mantine/core';
import { ChartPieSlice, Gauge, Receipt, Wallet } from '@phosphor-icons/react';

const Portfolio = () => {
  return (
    <Page title="Portfolio">
      <Tabs h="100%" defaultValue="overview">
        <Tabs.List grow>
          <Tabs.Tab icon={<Gauge />} value="overview">
            Overview
          </Tabs.Tab>
          <Tabs.Tab icon={<Wallet />} value="accounts">
            Accounts
          </Tabs.Tab>
          <Tabs.Tab icon={<Receipt />} value="transactions">
            Transactions
          </Tabs.Tab>
          <Tabs.Tab icon={<ChartPieSlice />} value="statistics">
            Statistics
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.List h="100%">
          <Tabs.Panel value="overview">
            <Overview />
          </Tabs.Panel>
          <Tabs.Panel value="accounts">
            <Accounts />
          </Tabs.Panel>
          <Tabs.Panel value="transactions">
            <Transactions />
          </Tabs.Panel>
          <Tabs.Panel value="statistics">
            <Statistics />
          </Tabs.Panel>
        </Tabs.List>
      </Tabs>
    </Page>
  );
};

Portfolio.auth = true;
export default Portfolio;
