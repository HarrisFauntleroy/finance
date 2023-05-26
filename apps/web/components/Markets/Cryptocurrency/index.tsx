import { Table } from "../../Table";

import { trpc } from "../../../utils/trpc";

import { Card } from "@mantine/core";
import { cryptocurrencyColumns } from "../../Markets/Cryptocurrency/columns";

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
