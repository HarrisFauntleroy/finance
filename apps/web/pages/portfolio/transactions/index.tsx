import { Stack } from "@chakra-ui/react";
import { Code } from "@mantine/core";

function Transactions() {
  return (
    <Stack>
      <Code block>
        {JSON.stringify({
          id: "1",
        })}
      </Code>
    </Stack>
  );
}

Transactions.auth = true;
export default Transactions;
