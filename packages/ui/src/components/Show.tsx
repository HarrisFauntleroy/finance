import React, { type ReactNode } from "react"

interface ShowProps {
	when: boolean
	children?: ReactNode
}

export function Show({ when, children }: ShowProps) {
	return <div style={{ display: when ? undefined : "none" }}>{children}</div>
}
