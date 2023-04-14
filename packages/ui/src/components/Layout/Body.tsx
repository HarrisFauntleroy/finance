import { PropsWithChildren } from 'react';

import { Box } from '@chakra-ui/react';

type BodyProps<T> = PropsWithChildren<T>;

export function Body<T>({ children }: BodyProps<T>) {
  return (
    <Box transition=".3s ease" padding={{ base: '16px' }}>
      <>{children}</>
    </Box>
  );
}
