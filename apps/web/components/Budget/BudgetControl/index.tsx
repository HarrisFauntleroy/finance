import type { BudgetFormInputs } from './BudgetForm';
import { BudgetForm } from './BudgetForm';
import { DeleteBudget } from './DeleteBudget';

type BudgetControlProps = {
  variant?: 'delete';
  defaultValues?: BudgetFormInputs;
};

export const BudgetControl = ({
  defaultValues,
  variant,
}: BudgetControlProps) => {
  return variant === 'delete' ? (
    <DeleteBudget id={defaultValues?.id} />
  ) : (
    <BudgetForm defaultValues={defaultValues} />
  );
};
