import React from "react"

import type { AssetFormInputs } from "./AccountForm"
import { AssetForm } from "./AccountForm"
import { DeleteAsset } from "./DeleteAccount"

interface AccountControlProps {
	variant?: "delete"
	defaultValues?: AssetFormInputs
}

export const AccountControl = ({
	defaultValues,
	variant,
}: AccountControlProps) => {
	return variant === "delete" ? (
		<DeleteAsset id={defaultValues?.id} />
	) : (
		<AssetForm defaultValues={defaultValues} />
	)
}
