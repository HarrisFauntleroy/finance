import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AssetForm } from "./AssetForm";

export const CreateAccount = () => {
  const openUpdateAccountModal = () => {
    modals.open({
      id: "create-account",
      title: "Create account",
      centered: true,
      children: <AssetForm />,
    });
  };

  return (
    <Button color="green" onClick={openUpdateAccountModal}>
      Create
    </Button>
  );
};
