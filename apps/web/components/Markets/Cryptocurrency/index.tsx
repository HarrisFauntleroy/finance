import { Table } from "../../Table";

import { trpc } from "../../../utils/trpc";

import { cryptocurrencyColumns } from "../../Markets/Cryptocurrency/columns";
import { Card } from "@mantine/core";

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
