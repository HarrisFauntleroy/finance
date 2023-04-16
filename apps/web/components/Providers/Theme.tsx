import { theme } from '../../styles/theme';

import { GlobalStyle, ChakraProvider as Provider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export default function ChakraProvider<T>({ children }: PropsWithChildren<T>) {
  return (
    <Provider theme={theme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
}
