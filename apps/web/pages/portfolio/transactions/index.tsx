import React from "react";

import { Stack } from "@chakra-ui/react";
import { JSONObjectViewer } from "../../../components/JSON";

function Transactions() {
  return (
    <Stack paddingY="8px">
      <div>Transactions</div>
      <JSONObjectViewer
        data={JSON.stringify({
          id: "1",
        })}
      />
    </Stack>
  );
}

Transactions.auth = true;
export default Transactions;
