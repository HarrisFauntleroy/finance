import { Decimal } from "database/generated/prisma-client/runtime";
import { flattenArrToObj } from "../../helpers";

export type ExchangeRates = { [x: string]: string };

type GetExchangeRatesInput = {
  price: Decimal;
  currency: string;
  name: string;
  ticker: string;
};

export const getExchangeRates = (
  markets: GetExchangeRatesInput[]
): ExchangeRates => {
  const market = markets?.map(({ price, ...rest }) => {
    return {
      ...rest,
      price: price.toString(),
    };
  });
  return flattenArrToObj(market, "ticker", "price");
};
