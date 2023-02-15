import React, { useCallback } from "react"

import type { EditorState } from "@codemirror/state"
import useCodeMirror from "~/hooks/useCodeMirror"

interface Props {
	initialDoc: string
	onChange: (doc: string) => void
}

const Editor = (props: Props) => {
	const { onChange, initialDoc } = props
	const handleChange = useCallback(
		(state: EditorState) => onChange(state.doc.toString()),
		[onChange]
	)
	const [refContainer] = useCodeMirror<HTMLDivElement>({
		initialDoc: initialDoc,
		onChange: handleChange,
	})

	return <div ref={refContainer} />
}

export default Editor
