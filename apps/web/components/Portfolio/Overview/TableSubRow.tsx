import { percentageChange } from 'common';
import { Card, Debug, Grid, inDev } from 'ui';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Stat as ChakraStat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import type { Row } from '@tanstack/react-table';
import currency from 'currency.js';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <Card>
    <ChakraStat style={{ padding: '8px' }}>
      <Stack>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stack>
    </ChakraStat>
  </Card>
);

interface TableSubComponentProps<TData> {
  row: Row<TData>;
}

function TableSubComponent<TData extends Record<string, string>>({
  row: {
    original: { averageCost, price, ...original },
  },
}: TableSubComponentProps<TData>) {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem maxW="100vw">
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Suggestions
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack>
            <Grid>
              <Stat
                label="Average Price"
                value={currency(averageCost).format()}
              />
              <Stat label="Price" value={currency(price).format()} />
              <Stat
                label="Gain/Loss from Price %"
                value={`${percentageChange(
                  currency(averageCost).value,
                  currency(price).value,
                ).toFixed(2)}%`}
              />
            </Grid>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      {inDev() && (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Debug data
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Debug data={original} />
          </AccordionPanel>
        </AccordionItem>
      )}
    </Accordion>
  );
}

export default TableSubComponent;
