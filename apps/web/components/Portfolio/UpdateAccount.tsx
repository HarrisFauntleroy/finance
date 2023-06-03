import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Asset } from "database/generated/prisma-client";
import { AssetForm } from "./CreateAccount";

type UpdateAccountProps = {
  asset: Asset;
};

export const UpdateAccount = ({ asset }: UpdateAccountProps) => {
  return (
    <Button
      color="green"
      onClick={() => {
        modals.open({
          id: "create-asset",
          title: "Add new asset",
          children: <AssetForm asset={asset} />,
        });
      }}
    >
      Edit
    </Button>
  );
};
