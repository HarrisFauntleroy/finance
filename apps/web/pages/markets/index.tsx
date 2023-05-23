/**
 *
 * Markets page
 *
 */
import React from "react";

import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import CryptoComparison from "../../components/Markets/CryptoComparison";
import { Cryptocurrency } from "../../components/Markets/Cryptocurrency";
import { Forex } from "../../components/Markets/Forex";
import { Page } from "../../components/Layout/Page";

const Markets = () => {
  return (
    <Page title="Markets">
      <Stack height="100%">
        <Tabs height="100%" padding="8px">
          <TabList>
            <Tab>Cryptocurrency</Tab>
            <Tab>Forex</Tab>
            <Tab>Compare</Tab>
          </TabList>
          <TabPanels height="100%">
            <TabPanel padding={0} height="100%">
              <Stack paddingY="8px">
                <Cryptocurrency />
              </Stack>
            </TabPanel>
            <TabPanel padding={0} height="100%">
              <Stack paddingY="8px">
                <Forex />
              </Stack>
            </TabPanel>
            <TabPanel padding={0} height="100%">
              <Stack paddingY="8px">
                <CryptoComparison />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Page>
  );
};

Markets.auth = false;
export default Markets;
