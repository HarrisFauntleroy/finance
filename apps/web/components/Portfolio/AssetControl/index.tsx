import React from "react"

import type { AssetFormInputs } from "./AccountForm"
import { AssetForm } from "./AccountForm"
import { DeleteAsset } from "./DeleteAccount"

interface AssetControlProps {
	variant?: "delete"
	defaultValues?: AssetFormInputs
}

export const AssetControl = ({ defaultValues, variant }: AssetControlProps) => {
	return variant === "delete" ? (
		<DeleteAsset id={defaultValues?.id} />
	) : (
		<AssetForm defaultValues={defaultValues} />
	)
}
