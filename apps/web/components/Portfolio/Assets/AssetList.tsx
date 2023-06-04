import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { Debug } from "../../Debug";
import { Card } from "../../Layout/Card";
import { Table } from "../../MantineTable";
import { DeleteAccount } from "./DeleteAsset";
import { UpdateAccount } from "./UpdateAsset";

export function AssetList() {
  const session = useSession();
  const userId = session?.data?.userId || "";
  const { data } = trpc.assets.byUserId.useQuery({ userId });

  return (
    <Card style={{ overflow: "scroll" }}>
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
                <Button.Group>
                  <UpdateAccount asset={asset} />
                  <DeleteAccount asset={asset} />
                </Button.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Debug data={data} />
    </Card>
  );
}
