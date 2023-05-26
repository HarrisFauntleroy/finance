import { trpc } from "../../../utils/trpc";
import { Table } from "../../Table";

import { forexColumns } from "./columns";

import { Card } from "@mantine/core";

export const Forex = () => {
  const { data } = trpc.markets.forex.useQuery();

  return (
    <Card>
      <Table
        id="Forex"
        data={data || []}
        columns={forexColumns}
        canExpandRows
        paginationEnabled
      />
    </Card>
  );
};
