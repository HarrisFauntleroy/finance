import React from "react"

import { DeleteTransaction } from "./DeleteTransaction"
import type { BudgetFormInputs } from "./TransactionForm"
import { BudgetForm } from "./TransactionForm"

interface BudgetControlProps {
	variant?: "delete"
	defaultValues?: BudgetFormInputs
}

export const BudgetControl = ({
	defaultValues,
	variant,
}: BudgetControlProps) => {
	return variant === "delete" ? (
		<DeleteTransaction id={defaultValues?.id} />
	) : (
		<BudgetForm defaultValues={defaultValues} />
	)
}
