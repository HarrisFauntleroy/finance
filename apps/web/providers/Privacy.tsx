/**
 *
 * Privacy provider
 * Adds global context for showing and hiding monetary values
 *
 */
import React, { type PropsWithChildren } from "react"

import { useLocalStorage } from "ui"

type PrivacyContextType = {
	privacy: boolean
	togglePrivacy: () => void
}

const defaultValues = {
	privacy: false,
	togglePrivacy: () => null,
}

export const PrivacyContext =
	React.createContext<PrivacyContextType>(defaultValues)

export function PrivacyProvider({ children }: PropsWithChildren) {
	const [privacy, setPrivacy] = useLocalStorage("privacy", false)

	const togglePrivacy = () => setPrivacy((prevValue) => !prevValue)

	return (
		<PrivacyContext.Provider value={{ privacy, togglePrivacy }}>
			{children}
		</PrivacyContext.Provider>
	)
}
