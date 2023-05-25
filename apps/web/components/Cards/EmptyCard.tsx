import { Box } from "@chakra-ui/react";

export function EmptyCard() {
  return (
    <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent" />
  );
}
