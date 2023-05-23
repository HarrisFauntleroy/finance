import { Box, Title } from "@mantine/core";
import { Releases } from "./Releases";

export function Changelog() {
  return (
    <Box h="100%" w="100%" p="lg">
      <Title order={1} mb="16px">
        Changelog
      </Title>
      <Releases />
    </Box>
  );
}
