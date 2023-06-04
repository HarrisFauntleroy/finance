import { trpc } from "../../../utils/trpc";
import { Card } from "../../Layout/Card";
import { Table } from "../../Table";
import { forexColumns } from "./columns";

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
