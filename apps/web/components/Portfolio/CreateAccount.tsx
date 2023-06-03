import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AssetForm } from "./AccountForm";

export function CreateAccount() {
  return (
    <Button
      onClick={() => {
        modals.open({
          id: "create-asset",
          title: "Add new asset",
          children: <AssetForm />,
        });
      }}
    >
      Create
    </Button>
  );
}
