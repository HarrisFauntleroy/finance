import { logger } from "common";
import { prisma } from "database";
import { Category } from "database/generated/prisma-client";

import axios from "axios";
import { Bar, Presets } from "cli-progress";

type ExchangeRate = {
  id: string;
  price: string;
  name: string;
};

type OpenExchangeRates = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, string>;
};

class MarketUpdater {
  private baseUrl = "https://openexchangerates.org/api";

  private parseExchangeRateResponse(exchangeRates: ExchangeRate[]) {
    return exchangeRates.map((exchangeRate) => {
      const { id, price, name } = exchangeRate;
      return {
        // This API only supports USD as base currency with its free tier
        id: `${id.toUpperCase()}-USD`,
        name: name,
        type: Category.CASH,
        ticker: id.toUpperCase(),
        currency: "USD",
        price: String(price),
      };
    });
  }

  private async upsertExchangeRates(exchangeRates: ExchangeRate[]) {
    const progress = new Bar({}, Presets.shades_classic);
    progress.start(exchangeRates.length, 0);
    const parsed = this.parseExchangeRateResponse(exchangeRates);

    for await (const cash of parsed) {
      await prisma.market
        .upsert({
          where: {
            ticker_currency: {
              ticker: cash?.ticker,
              currency: cash.currency,
            },
          },
          create: cash,
          update: cash,
        })
        .then(() => progress.update(1))
        .catch((error) => logger.error("Error: upsertExchangeRates: ", error));
    }

    progress.stop();
  }

  private async fetchFromOpenExchangeRates(url: string) {
    return axios
      .get(this.baseUrl + url, {
        headers: {
          "Accept-Encoding": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${process.env.OER_APP_ID}`,
        },
      })
      .then(({ data }) => data)
      .catch((error) =>
        logger.error("Error: fetchFromOpenExchangeRates: ", error)
      );
  }

  // Method to update the markets for cryptocurrencies
  public async updateExchangeRates() {
    try {
      const name: Record<string, string> =
        await this.fetchFromOpenExchangeRates(
          "/currencies.json?show_alternative=false"
        );
      const { rates }: OpenExchangeRates =
        await this.fetchFromOpenExchangeRates(
          "/latest.json?show_alternative=false"
        );

      const exchangeRates = Object.entries(rates).map(([id, price]) => ({
        id,
        price,
        name: name[id],
      }));

      await this.upsertExchangeRates(exchangeRates);
    } catch (error) {
      logger.error("Error: updateExchangeRates: ", error);
    }

    return {
      status: 200,
      message: "Exchange Rates Updated",
    };
  }
}

const marketUpdater = new MarketUpdater();

export const updateExchangeRates = async () => {
  return marketUpdater.updateExchangeRates();
};
