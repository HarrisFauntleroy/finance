import * as currency from 'currency.js';
import currency__default from 'currency.js';
import { Decimal } from 'database/generated/prisma-client/runtime';
import { Cryptocurrency as Cryptocurrency$1, Market } from 'database/generated/prisma-client';

/**
 *
 * @param name of cryptocurrency
 * @param days how many days to fetch price data for
 * @returns (string | number)[] array of prices sorted newest last
 */
declare const fetchCryptoPriceHistory: (name: string, days: number) => Promise<any>;

declare type ExchangeRates = {
    [x: string]: string;
};
declare type GetExchangeRatesInput = {
    price: Decimal;
    currency: string;
    name: string;
    ticker: string;
};
declare const getExchangeRates: (markets: GetExchangeRatesInput[]) => ExchangeRates;

declare type CryptoComplete = Cryptocurrency$1 & {
    user?: {
        settings: {
            userCurrency: string;
        } | null;
    };
    market?: Market | null;
    Children: CryptoCompleteChild[];
};
declare type CryptoCompleteChild = Cryptocurrency$1 & {
    user?: {
        settings: {
            userCurrency: string;
        } | null;
    };
    market?: Market | null;
};
declare type ChildrenOmitChildren = Omit<CryptoComplete, "Children">;
/** Extends cryptocurrency type with all relations */
interface CryptoAndChildrenComplete extends Omit<CryptoComplete, "Children"> {
    Children?: ChildrenOmitChildren[];
}
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
declare type CryptoOmitCostBasisAndChildren = Omit<CryptoComplete, "costBasis" | "Children">;
/** Calculated values */
interface CryptoSummaryOutput extends CryptoOmitCostBasisAndChildren {
    unrealisedGainPercentage: string;
    estimatedStakingYield: string;
    estimatedYearlyReturn: string;
    belowTargetBalance: boolean;
    unrealisedGain: string;
    saleableValue: string;
    amountStaked: string;
    averageCost: string;
    costBasis: string;
    shouldSell: boolean;
    Children?: CryptoOmitCostBasisAndChildren[];
    saleable: string;
    value: string;
    price: string;
}
declare function calculateCryptoSummary(crypto: ChildrenOmitChildren, exchangeRates: ExchangeRates, toCurrency?: string): CryptoSummaryOutput;
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
interface CalculateOneCryptoInput {
    crypto: CryptoComplete;
    exchangeRates: ExchangeRates;
    userCurrency: string;
}
declare function calculateOneCrypto({ crypto, exchangeRates, userCurrency, }: CalculateOneCryptoInput): CryptoSummaryOutput;
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
interface CryptoSummaryInput {
    data: CryptoComplete[];
    exchangeRates: ExchangeRates;
    userCurrency: string;
}
declare function calculateManyCrypto({ data, userCurrency, exchangeRates, }: CryptoSummaryInput): CryptoSummaryOutput[];
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
declare function calculateCryptoOverview({ data, }: {
    data: CryptoSummaryOutput[];
}): {
    totalValue: string;
    saleableValue: string;
    totalCostBasis: string;
    unrealisedGain: currency;
    totalEstimatedYearlyReturn: string;
};
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
declare function calculateCryptoIncome(): void;

/** Extends cryptocurrency type with all relations */
interface Cryptocurrency extends Cryptocurrency$1 {
    market: Market | null;
    Children?: Cryptocurrency[];
}
/** The calculated output with additional values */
interface CalculatedCryptocurrency extends Omit<Cryptocurrency$1, "costBasis"> {
    market: Market | null;
    /** Children are only calculated one level deep */
    Children?: Omit<CalculatedCryptocurrency, "Children">[];
    value: string;
    price: string;
    costBasis: string;
    saleable: string;
    saleableValue: string;
    unrealisedGain: string;
    averageCost: string;
    unrealisedGainPercentage: string;
    amountStaked: string;
    estimatedStakingYield: string;
    estimatedYearlyReturn: string;
    /** Is targetBalance higher or lower than saleable amount */
    belowTargetBalance: boolean;
    /** Is average price lower than current price */
    shouldSell: boolean;
}

declare function calculateAverageGain(prices: number[], days: number): number;

declare function calculateAverageLoss(prices: number[], days: number): number;

declare function calculateBollingerBands(prices: number[]): {
    upper: number;
    lower: number;
};

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/** currency but automatic transformation */
declare const money: (value?: any) => currency__default;
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
declare function findSimpleMovingAverage(inputArray: (string | number)[]): number;
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
declare function getConversionRate(rates: {
    [key: string]: string;
}, fromCurrency: string, toCurrency: string): {
    value: string;
    error?: string;
};
/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
declare function convertCurrency({ exchangeRates, fromCurrency, toCurrency, amount, }: {
    exchangeRates: ExchangeRates;
    fromCurrency: string;
    toCurrency: string;
    amount?: string;
}): currency__default;

/**
 * Exponential Moving Average
 * The standard exponential moving average formula
 * converts the time to a fraction
 * EMA% = 2/(n + 1) where n is the number of days
 * For example, the EMA% for 14 days is 2/(14 days +1) = 13.3%.
 */
declare function calculateEMA(prices: number[], days: number): number;

declare function calculateFibonacciResistance(prices: number[]): number | null;

declare function calculateMACD(prices: number[]): number;

declare function calculateRSI(prices: number[]): number;

declare function calculateStandardDeviation(prices: number[], days: number): number;

declare function calculateSMA(prices: number[], days: number): number;

/** Arithmetic mean or Average */
declare function average(array: number[]): number;

/**
 * Percentage change identifies the percentage
 * between the two numbers
 */
declare function percentageChange(initialValue: number, finalValue: number): number;

/**
 * Percentage difference seeks to understand
 * the percentage of the difference when compared to
 * the average between two numbers.
 *
 * When to use? When there is no obvious way of choosing
 * which value is the "reference" value.
 */
declare function percentageDifference(value1: number, value2: number): number;

declare const whatPercentOfXIsY: (x: number, y: number) => number;

/**
 * Flattens an object by moving all keys from nested objects to the top level of the output object.
 * @param object The object to flatten.
 * @returns A flattened version of the input object.
 */
declare function flat(obj: any): Record<string, unknown>;

declare const isNegative: (number?: any) => boolean;

declare const isNumeric: (value: string | number) => boolean;

declare type LogType = "info" | "warn" | "error" | "trace" | "debug";
declare const isDev: boolean;
declare const isClient: boolean;
declare const isDebug: () => boolean;
declare const logger: {
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    trace: (...args: unknown[]) => void;
};
declare const timeStamp: (...args: unknown[]) => void;
declare const debugLog: (...args: unknown[]) => void;

declare const mapAsync: (array: unknown[], callbackfn: () => void) => Promise<void[]>;
declare const flattenArrToObj: (arr: Record<string, any>[], key: string | number, value: string) => Record<string, any>;

declare type Nullable<T> = {
    [K in keyof T]: T[K] | undefined;
};
declare type DeepNullable<T> = {
    [K in keyof T]: DeepNullable<T[K]> | undefined;
};

/**
 * sumArrayByKey function takes an array of objects, a key to use for summing values, and an optional precision parameter
 */
declare function sumArrayByKey(input: Record<string, any>[], key: string, precision?: number): string;

export { CalculatedCryptocurrency, CryptoAndChildrenComplete, CryptoComplete, CryptoCompleteChild, Cryptocurrency, DeepNullable, ExchangeRates, LogType, Nullable, average, calculateAverageGain, calculateAverageLoss, calculateBollingerBands, calculateCryptoIncome, calculateCryptoOverview, calculateCryptoSummary, calculateEMA, calculateFibonacciResistance, calculateMACD, calculateManyCrypto, calculateOneCrypto, calculateRSI, calculateSMA, calculateStandardDeviation, convertCurrency, debugLog, fetchCryptoPriceHistory, findSimpleMovingAverage, flat, flattenArrToObj, getConversionRate, getExchangeRates, isClient, isDebug, isDev, isNegative, isNumeric, logger, mapAsync, money, percentageChange, percentageDifference, sumArrayByKey, timeStamp, whatPercentOfXIsY };
