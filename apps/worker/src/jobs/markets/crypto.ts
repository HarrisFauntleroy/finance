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

export class MarketUpdater {
  private baseUrl = "https://api.coingecko.com/api/v3";

  private baseCurrency = "USD";

  private resultsPerPage = 200;

  private pages = 10;

  private async fetchFromCoingecko(page: number): Promise<CoinGeckoResponse[]> {
    return axios
      .get(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: this.baseCurrency,
          order: "market_cap_desc",
          per_page: this.resultsPerPage,
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

  public parseExchangeRateResponse(
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
        id: `${symbol.toUpperCase()}-${this.baseCurrency.toUpperCase()}`,
        name: id,
        type: MarketType.CRYPTOCURRENCY,
        ticker: symbol,
        currency: this.baseCurrency.toUpperCase(),
        price: String(current_price),
        priceChange24h: String(price_change_24h),
        priceChange24hPercent: String(price_change_percentage_24h),
        image: image,
        marketCap: String(market_cap),
        marketCapRank: String(market_cap_rank),
      })
    );
  }

  private async upsertCryptoMarkets(response: CoinGeckoResponse[]) {
    const parsed = this.parseExchangeRateResponse(response);

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
        .catch((err) => logger.error("error", `${crypto.ticker} ${err}`));
    }
  }

  // Method to update the markets for cryptocurrencies
  public async updateCryptoMarkets() {
    const progress = new Progress(this.pages);
    progress.start("Cryptocurrency");

    for (let page = this.pages; page > 0; page--) {
      try {
        const markets = await this.fetchFromCoingecko(page);
        await this.upsertCryptoMarkets(markets);
        progress.increment();
      } catch (error) {
        logger.error(error);
      }
    }

    progress.stop("Cryptocurrency");
    return new Date();
  }
}

const marketUpdater = new MarketUpdater();

export const updateCryptoMarkets = async () => {
  return marketUpdater.updateCryptoMarkets().catch(logger.error);
};
