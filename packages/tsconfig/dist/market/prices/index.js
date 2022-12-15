"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
const util_1 = require("../../util");
const axios_1 = __importDefault(require("axios"));
const common_1 = require("common");
const database_1 = require("database");
const prisma_client_1 = require("database/generated/prisma-client");
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
                price: (0, util_1.toDecimal)(crypto.current_price).toDecimalPlaces(10),
                priceChange24h: (0, util_1.toDecimal)(crypto.price_change_24h),
                priceChange24hPercent: (0, util_1.toDecimal)(crypto.price_change_percentage_24h),
                image: crypto.image,
                marketCap: (0, util_1.toDecimal)(crypto.market_cap),
                marketCapRank: (0, util_1.toDecimal)(crypto.market_cap_rank),
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
const fetchAndParseJSON = async (url) => axios_1.default
    .get(url)
    .then((res) => res.data)
    .catch(console.error);
const updateMarketsCrypto = async () => {
    /** Limit results per page */
    const resultsPerPage = 250;
    /** How many pages to fetch */
    const pages = 8;
    /** Loop through the page array and fetch results */
    for (let page = pages; page > 0; page--) {
        /** Base url */
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`;
        /** Fetch and update */
        await fetchAndParseJSON(url)
            .then(upsertManyPosts)
            .catch(common_1.logger.error)
            .then(() => common_1.logger.info(page));
    }
};
exports.default = updateMarketsCrypto;
