import { Stack, Text } from "@mantine/core";

export const AccountBreakdown = () => {
  return (
    <Stack>
      <Text>Overview</Text>
      <ul>
        <ul>
          <li>CREDIT</li>
          <li>1 active account</li>
        </ul>
        <ul>
          <li>CRYPTO</li>
          <li>2 active account</li>
        </ul>
        <ul>
          <li>STOCK</li>
          <li>1 active account</li>
        </ul>
      </ul>
    </Stack>
  );
};
