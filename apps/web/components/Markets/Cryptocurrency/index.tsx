import { Card } from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { cryptocurrencyColumns } from "../../Markets/Cryptocurrency/columns";
import { Table } from "../../Table";

export const Cryptocurrency = () => {
  const { data } = trpc.markets.cryptocurrency.useQuery();

  return (
    <Card>
      <Table
        id="Cryptocurrency"
        data={data || []}
        columns={cryptocurrencyColumns}
        canExpandRows
        paginationEnabled
      />
    </Card>
  );
};
