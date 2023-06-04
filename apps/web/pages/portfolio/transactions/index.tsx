import { SimpleGrid } from "@mantine/core";
import { ControlBar } from "../../../components/Portfolio/Transactions/ControlBar";
import { TransactionsList } from "../../../components/Portfolio/Transactions/TransactionList";

function Transactions() {
  return (
    <SimpleGrid cols={1}>
      <ControlBar />
      <TransactionsList />
    </SimpleGrid>
  );
}

Transactions.auth = true;
export default Transactions;
