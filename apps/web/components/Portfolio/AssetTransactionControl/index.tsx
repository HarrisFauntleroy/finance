import { DeleteTransaction } from "./DeleteTransaction";
import type { AssetTransactionFormInputs } from "./TransactionForm";
import { AssetTransactionForm } from "./TransactionForm";

type AssetTransactionControlProps = {
  variant?: "delete";
  defaultValues?: AssetTransactionFormInputs;
};

export const AssetTransactionControl = ({
  defaultValues,
  variant,
}: AssetTransactionControlProps) => {
  return variant === "delete" ? (
    <DeleteTransaction id={defaultValues?.id} />
  ) : (
    <AssetTransactionForm defaultValues={defaultValues} />
  );
};
