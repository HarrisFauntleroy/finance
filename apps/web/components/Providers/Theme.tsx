import { theme } from '../../styles/theme';

import { GlobalStyle, ChakraProvider as Provider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export default function ThemeProvider<T>({ children }: PropsWithChildren<T>) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* TODO: Remove old ChakraUI provider  */}
      <Provider theme={theme}>
        <GlobalStyle />
        {children}
      </Provider>
    </MantineProvider>
  );
}
