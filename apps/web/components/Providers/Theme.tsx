import { theme } from '../../styles/theme';

import { ChakraProvider as Provider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export default function ThemeProvider<T>({ children }: PropsWithChildren<T>) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider theme={theme}>{children}</Provider>
    </MantineProvider>
  );
}
