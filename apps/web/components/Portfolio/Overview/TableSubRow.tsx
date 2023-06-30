import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stat as ChakraStat,
  Stack,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import type { Row } from "@tanstack/react-table";
import { percentageChange } from "common";
import currency from "currency.js";
import {
  Debug,
  isDevEnvironment as isDevelopmentEnvironment,
} from "../../Debug";
import { Grid } from "../../Grid";
import { Card } from "../../Layout/Card";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <Card>
    <ChakraStat style={{ padding: "8px" }}>
      <Stack>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stack>
    </ChakraStat>
  </Card>
);

type TableSubComponentProperties<TData> = {
  row: Row<TData>;
};

function TableSubComponent<TData extends Record<string, string>>({
  row: {
    original: { averageCost, price, ...original },
  },
}: TableSubComponentProperties<TData>) {
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
                  currency(price).value
                ).toFixed(2)}%`}
              />
            </Grid>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      {isDevelopmentEnvironment() && (
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
