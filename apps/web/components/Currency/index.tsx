import { chakra } from "@chakra-ui/react";
import currency from "currency.js";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { trpc } from "../../utils/trpc";
import { PrivacyContext } from "../Providers/Privacy";

type CurrencyProperties = {
  value?: string | number | null;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

function Currency({ value }: CurrencyProperties) {
  const { privacy: hidden } = useContext(PrivacyContext);

  const { data: session } = useSession();
  const userId = session?.userId || "";

  const { data } = trpc.settings.byUserId.useQuery({
    userId: userId || "",
  });

  const userLocale =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages[0]
      : navigator.language;

  const userCurrency = data?.userCurrency;

  const finalValue = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: userCurrency || "USD",
    maximumFractionDigits: 10,
  })
    .format(currency(String(value)).value)
    .replace("BTC", "₿")
    .replace("SAT", "丰")
    .replace("ETH", "⟠");

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
      {finalValue ?? "-"}
    </chakra.span>
  );
}

export default Currency;
