import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Asset } from "database/generated/prisma-client";
import { AssetForm } from "./AssetForm";

type UpdateAccountProperties = {
  asset: Asset;
};

export const UpdateAccount = ({ asset }: UpdateAccountProperties) => {
  const openUpdateAccountModal = () => {
    modals.open({
      id: "update-account",
      title: "Update account",
      centered: true,
      children: <AssetForm asset={asset} />,
    });
  };

  return (
    <Button color="green" onClick={openUpdateAccountModal}>
      Edit
    </Button>
  );
};
