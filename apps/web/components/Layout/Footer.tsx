/**
 *
 * Footer
 *
 */
import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Flex justifyContent="center" alignItems="center" height="32px">
      <Text
        fontSize="small"
        textAlign="center"
        padding="8px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Harris Fauntleroy © {new Date().getFullYear().toString()} All rights
        reserved
      </Text>
    </Flex>
  );
}
