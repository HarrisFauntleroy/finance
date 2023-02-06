import type { SyntheticEvent } from "react"
import React from "react"

import { MdOutlineContentCopy } from "react-icons/md"

interface Props {
	children: JSX.Element
	codeText: string
}

const CopyButton = ({ children, codeText }: Props) => {
	const handleClick = (_e: SyntheticEvent) => {
		navigator.clipboard.writeText(codeText)
	}

	return (
		<div>
			<span className="text-white absolute right-2 top-1 hover:cursor-pointer transition hover:scale-150">
				<MdOutlineContentCopy onClick={handleClick} />
			</span>
			{children}
		</div>
	)
}

export default CopyButton
