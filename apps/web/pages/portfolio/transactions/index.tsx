import { Stack } from "@chakra-ui/react";
import { JSONObjectViewer } from "../../../components/JSON";

function Transactions() {
  return (
    <Stack>
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
