import { logger } from "common";
import { prisma } from "database";
import { MarketType } from "database/generated/prisma-client";
import { Progress } from "../../util";
import axios from "axios";

type CoinGeckoResponse = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: 72.61;
  atl_change_percentage: number;
  atl_date: string;
  roi: undefined;
  last_updated: string;
};

type ParsedCrypto = {
  id: string;
  name: string;
  type: "CRYPTOCURRENCY";
  ticker: string;
  currency: string;
  price: string;
  priceChange24h: string;
  priceChange24hPercent: string;
  image: string;
  marketCap: string;
  marketCapRank: string;
};

const baseUrl = "https://api.coingecko.com/api/v3";
const baseCurrency = "USD";
const resultsPerPage = 200;
const pages = 10;

async function fetchFromCoingecko(page: number): Promise<CoinGeckoResponse[]> {
  return axios
    .get(`${baseUrl}/coins/markets`, {
      params: {
        vs_currency: baseCurrency,
        order: "market_cap_desc",
        per_page: resultsPerPage,
        page: page,
        sparkline: false,
      },
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((res) => res.data)
    .catch(logger.error);
}

function parseExchangeRateResponse(
  response: CoinGeckoResponse[]
): ParsedCrypto[] {
  return response?.map(
    ({
      id,
      symbol,
      current_price,
      price_change_24h,
      price_change_percentage_24h,
      image,
      market_cap,
      market_cap_rank,
    }) => ({
      id: `${symbol.toUpperCase()}-${baseCurrency.toUpperCase()}`,
      name: id,
      type: MarketType.CRYPTOCURRENCY,
      ticker: symbol,
      currency: baseCurrency.toUpperCase(),
      price: String(current_price),
      priceChange24h: String(price_change_24h),
      priceChange24hPercent: String(price_change_percentage_24h),
      image: image,
      marketCap: String(market_cap),
      marketCapRank: String(market_cap_rank),
    })
  );
}

async function upsertCryptoMarkets(response: CoinGeckoResponse[]) {
  const parsed = parseExchangeRateResponse(response);

  for await (const crypto of parsed) {
    await prisma.market
      .upsert({
        where: {
          ticker_currency: {
            ticker: crypto.ticker,
            currency: crypto.currency,
          },
        },
        create: crypto,
        update: crypto,
      })
      .catch((error) => logger.error("error", `${crypto.ticker} ${error}`));
  }
}

// Method to update the markets for cryptocurrencies
export async function updateCryptoMarkets() {
  const progress = new Progress(pages);
  progress.start("Cryptocurrency");

  for (let page = pages; page > 0; page--) {
    try {
      const markets = await fetchFromCoingecko(page);
      await upsertCryptoMarkets(markets);
      progress.increment();
    } catch (error) {
      logger.error(error);
    }
  }

  progress.stop("Cryptocurrency");
  return new Date();
}
