import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type BodyProps = {
  children?: ReactNode;
};

export const Body = ({ children }: BodyProps) => {
  return (
    <Box transition=".3s ease" padding={{ base: '16px' }}>
      <>{children}</>
    </Box>
  );
};
