import React, { useCallback, useEffect } from "react"

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
	const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
		initialDoc: initialDoc,
		onChange: handleChange,
	})

	useEffect(() => {
		// eslint-disable-next-line sonarjs/no-all-duplicated-branches
		if (editorView) {
			// Do nothing for now
		} else {
			// loading editor
		}
	}, [editorView])

	return <div ref={refContainer} />
}

export default Editor
