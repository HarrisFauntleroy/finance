import React from 'react';

import type { BudgetFormInputs } from './BudgetForm';
import { BudgetForm } from './BudgetForm';
import { DeleteBudget } from './DeleteBudget';

interface BudgetControlProps {
  variant?: 'delete';
  defaultValues?: BudgetFormInputs;
}

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
