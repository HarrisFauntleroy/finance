import { Code, SimpleGrid } from "@mantine/core";
import { Card } from "../../../components/Layout/Card";

function Transactions() {
  return (
    <SimpleGrid cols={1}>
      <Card>
        <Code block>
          {JSON.stringify({
            id: "1",
          })}
        </Code>
      </Card>
    </SimpleGrid>
  );
}

Transactions.auth = true;
export default Transactions;
