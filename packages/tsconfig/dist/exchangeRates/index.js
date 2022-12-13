"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExchangeRates = exports.fetchFromOpenExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const database_1 = require("database");
const prisma_client_1 = require("database/generated/prisma-client");
const runtime_1 = require("database/generated/prisma-client/runtime");
// Define the base URL for the Open Exchange Rates API
const baseUrl = "https://openexchangerates.org/api";
// Default GET request for Open Exchange Rates API
// Adds authorization token to the headers
const fetchFromOpenExchangeRates = (url) => axios_1.default
    .get(baseUrl + url, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.OER_APP_ID}`,
    },
})
    .then(({ data }) => data)
    .catch(console.error);
exports.fetchFromOpenExchangeRates = fetchFromOpenExchangeRates;
// Upsert many entries
const upsertManyPosts = async (data) => {
    // Reshape data and upsert each entry
    await Promise.all(data.map(async (response) => {
        const parsed = {
            name: String(response?.name),
            type: prisma_client_1.MarketType.CASH,
            ticker: String(response?.id).toLowerCase(),
            currency: String(response?.id),
            price: new runtime_1.Decimal(String(response?.price)),
        };
        await database_1.prisma.market.upsert({
            where: { ticker: parsed.ticker },
            create: parsed,
            update: parsed,
        });
    }));
};
const updateExchangeRates = async () => {
    // Get currency names and tickers
    const name = await (0, exports.fetchFromOpenExchangeRates)("/currencies.json?show_alternative=false");
    // Get exchange rates using USD as base
    const exchange = await (0, exports.fetchFromOpenExchangeRates)("/latest.json?show_alternative=false");
    exchange.disclaimer = undefined;
    exchange.license = undefined;
    const latest = Object.entries(exchange.rates).map(([id, price]) => ({
        id,
        price,
        name: name[id],
    }));
    await upsertManyPosts(latest);
    return latest;
};
exports.updateExchangeRates = updateExchangeRates;
/**
 * @swagger
 * /api/swyftx/exchangeRates:
 *   get:
 *     description: Returns the latest exchange rates from the Open Exchange Rates API
 *     responses:
 *       200:
 */
const exchangeRates = async (_req, res) => (0, exports.updateExchangeRates)().then(res.json).catch(res.json);
exports.default = exchangeRates;
