import React from 'react';

import { theme } from '~/styles/theme';

import { ChakraProvider as Provider, GlobalStyle } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export default function ChakraProvider({ children }: PropsWithChildren) {
  return (
    <Provider theme={theme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
}
