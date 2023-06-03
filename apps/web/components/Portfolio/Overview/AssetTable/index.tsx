import { Group, Stack, Table } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { Debug } from "../../../Debug";
import { DeleteAccount } from "../../../Portfolio/DeleteAccount";
import { UpdateAccount } from "../../../Portfolio/UpdateAccount";

export function AssetTable() {
  const session = useSession();
  const userId = session?.data?.userId || "";
  const { data } = trpc.assets.byUserId.useQuery({ userId });

  return (
    <Stack>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Price</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.currency}</td>
              <td>{asset.balance}</td>
              <td>{asset.price}</td>
              <td>{asset.value}</td>
              <td>
                <Group>
                  <UpdateAccount asset={asset} />
                  <DeleteAccount asset={asset} />
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Debug data={data} />
    </Stack>
  );
}
