"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarketsCrypto = void 0;
/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
const common_1 = require("common");
const prisma_client_1 = require("database/generated/prisma-client");
const database_1 = require("database");
const runtime_1 = require("database/generated/prisma-client/runtime");
// Base currency is USD app-wide
// Mainly cause I don't want to pay for exchange rates lol
const baseCurrency = "USD";
const upsertManyPosts = async (response) => {
    // Loop through all the response items
    for (const crypto of response) {
        try {
            // Create an object containing the data to upsert into the database
            const parsed = {
                name: crypto.id,
                type: prisma_client_1.MarketType.CRYPTOCURRENCY,
                ticker: crypto.symbol,
                currency: baseCurrency.toLowerCase(),
                price: new runtime_1.Decimal(crypto.current_price).toDecimalPlaces(10),
                priceChange24h: new runtime_1.Decimal(crypto.price_change_24h),
                priceChange24hPercent: new runtime_1.Decimal(crypto.price_change_percentage_24h),
                image: crypto.image,
                marketCap: new runtime_1.Decimal(crypto.market_cap),
                marketCapRank: new runtime_1.Decimal(crypto.market_cap_rank),
                description: "",
            };
            // Upsert the data
            await database_1.prisma.market.upsert({
                where: { ticker: parsed.ticker },
                create: parsed,
                update: parsed,
            });
        }
        catch (error) {
            // Log any errors
            common_1.logger.error(error);
        }
    }
};
/** Fetch and return json, log failures */
const fetchAndParseJSON = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (error) {
        common_1.logger.error(error);
    }
};
const updateMarketsCrypto = async () => {
    /** Limit results per page */
    const resultsPerPage = 250;
    /** How many pages to fetch */
    const pages = 8;
    /** Loop through the page array and fetch results */
    for (let page = pages; page > 0; page--) {
        /** Base url */
        const url = new URL(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`);
        /** Fetch and update */
        await fetchAndParseJSON(url)
            .then(upsertManyPosts)
            .catch(common_1.logger.error)
            .then(() => common_1.logger.info(page));
    }
};
exports.updateMarketsCrypto = updateMarketsCrypto;
/**
 * @swagger
 * /api/market/prices:
 *   get:
 *     description: Updates all markets
 *     responses:
 *       200:
 *         description: example
 */
const prices = async (_request, res) => (0, exports.updateMarketsCrypto)()
    .then(() => res.json({ status: res.statusCode }))
    .catch(res.json);
exports.default = prices;
