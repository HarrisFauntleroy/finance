import { Card } from '../Cards';

import Currency from '../Currency';

import { Stat as ChakraStat, StatHelpText, StatNumber } from '@chakra-ui/react';
import type { Any } from 'currency.js';
import currency from 'currency.js';

type StatProps = {
  value?: Any;
  label?: string;
};

export const Stat = ({ value, label }: StatProps) => {
  return (
    <Card width="100%" height="100%" flex={1}>
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
