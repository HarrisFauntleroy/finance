import { Table } from "../../Table";

import { trpc } from "../../../utils/trpc";

import { Stack } from "@chakra-ui/react";
import { cryptocurrencyColumns } from "../../Markets/Cryptocurrency/columns";

export const Cryptocurrency = () => {
  const { data } = trpc.markets.cryptocurrency.useQuery();

  return (
    <Stack>
      <Table
        id="Cryptocurrency"
        data={data || []}
        columns={cryptocurrencyColumns}
        canExpandRows
        paginationEnabled
      />
    </Stack>
  );
};
