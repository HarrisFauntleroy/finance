import React from "react"

import { BudgetForm } from "./BudgetForm"
import { DeleteBudget } from "./DeleteBudget"
import type { Budget } from "database/generated/prisma-client"

interface BudgetControlProps {
	variant?: "delete"
	defaultValues?: Partial<Budget>
}

export const BudgetControl = ({
	defaultValues,
	variant,
}: BudgetControlProps) => {
	return variant === "delete" ? (
		<DeleteBudget id={defaultValues?.id} />
	) : (
		<BudgetForm defaultValues={defaultValues} />
	)
}
