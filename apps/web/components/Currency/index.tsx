import { useContext } from "react"

import { chakra } from "@chakra-ui/react"
import currency from "currency.js"
import { useSession } from "next-auth/react"
import { PrivacyContext } from "~/components/Providers/Privacy"
import { trpc } from "~/utils/trpc"

interface CurrencyProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any
	minimumFractionDigits?: number
	maximumFractionDigits?: number
}

/** Formatted currency display */
function Currency({ value }: CurrencyProps) {
	const { privacy: hidden } = useContext(PrivacyContext)

	const { data: session } = useSession()
	const userId = session?.userId || ""

	/** Fetch list of assets for form autocomplete */
	const { data, status } = trpc.settings.byUserId.useQuery({
		userId: userId || "",
	})

	// Get local from browser
	/** 
	const userLocale =
		navigator.languages && navigator.languages.length
			? navigator.languages[0]
			: navigator.language
	*/

	const userCurrency = data?.userCurrency

	const finalValue = new Intl.NumberFormat("ja-JP", {
		style: "currency",
		currency: userCurrency || "usd",
		maximumFractionDigits: 10,
	})
		.format(currency(String(value)).value)
		.replace("BTC", "₿")
		.replace("SAT", "丰")
		.replace("ETH", "⟠")

	if (!session) {
		return <>Not signed in...</>
	}

	if (status !== "success") {
		return <>Loading...</>
	}

	return (
		<chakra.span
			style={
				hidden
					? {
							borderRadius: "4px",
							filter: "blur(8px)",
					  }
					: {}
			}
		>
			{finalValue ? finalValue : "-"}
		</chakra.span>
	)
}

export default Currency
