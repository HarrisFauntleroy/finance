import { Table } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { useAssetActions } from "./hooks";

export function AssetTable() {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assets.byUserId.useQuery({
    userId: userId || "",
  });

  const { handleValidSubmit } = useAssetActions(userId);

  return (
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
              <button onClick={() => handleValidSubmit(asset.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
