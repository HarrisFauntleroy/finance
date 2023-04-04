import React from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as ChakraTabs,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

type TabType = {
  title: string;
  page: ReactNode;
};

type TabsProps = {
  /** Table ID allows for persistent state on some table settings */
  id: string;
  pages: TabType[];
};

export function Tabs({ pages, id }: TabsProps) {
  const [tabIndex, setTabIndex] = useLocalStorage<number>(`tabs-${id}`, 0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <ChakraTabs index={tabIndex} onChange={handleTabsChange}>
      <TabList height="32px" bg={useColorModeValue('gray.50', 'gray.900')}>
        {pages?.map(({ title }, index) => (
          <Tab key={`tab-list-${id}-${index}`}>{title}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {pages?.map(({ page }, index) => (
          <TabPanel
            padding={{ base: 0, sm: '16px' }}
            key={`tab-panel-${id}-${index}`}
          >
            <>{page}</>
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
}
