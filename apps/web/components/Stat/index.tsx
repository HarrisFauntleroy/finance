import { Stat as ChakraStat, StatHelpText, StatNumber } from "@chakra-ui/react";
import { Card } from "@mantine/core";
import type { Any } from "currency.js";
import currency from "currency.js";
import Currency from "../Currency";

type StatProps = {
  value?: Any;
  label?: string;
};

export const Stat = ({ value, label }: StatProps) => {
  return (
    <Card w="100%" h="100%">
      <ChakraStat
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatNumber textAlign="center">
          <Currency value={currency(String(value)).divide(365).toString()} />
        </StatNumber>
        <StatHelpText>{label}</StatHelpText>
      </ChakraStat>
    </Card>
  );
};
