"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  average: () => average,
  calculateAverageGain: () => calculateAverageGain,
  calculateAverageLoss: () => calculateAverageLoss,
  calculateBollingerBands: () => calculateBollingerBands,
  calculateCryptoIncome: () => calculateCryptoIncome,
  calculateCryptoOverview: () => calculateCryptoOverview,
  calculateCryptoSummary: () => calculateCryptoSummary,
  calculateEMA: () => calculateEMA,
  calculateFibonacciResistance: () => calculateFibonacciResistance,
  calculateMACD: () => calculateMACD,
  calculateManyCrypto: () => calculateManyCrypto,
  calculateOneCrypto: () => calculateOneCrypto,
  calculateRSI: () => calculateRSI,
  calculateSMA: () => calculateSMA,
  calculateStandardDeviation: () => calculateStandardDeviation,
  convertCurrency: () => convertCurrency,
  debugLog: () => debugLog,
  fetchCryptoPriceHistory: () => fetchCryptoPriceHistory,
  findSimpleMovingAverage: () => findSimpleMovingAverage,
  flat: () => flat,
  flattenArrToObj: () => flattenArrToObj,
  getConversionRate: () => getConversionRate,
  getExchangeRates: () => getExchangeRates,
  isClient: () => isClient,
  isDebug: () => isDebug,
  isDev: () => isDev,
  isNegative: () => isNegative,
  isNumeric: () => isNumeric,
  logger: () => logger,
  mapAsync: () => mapAsync,
  money: () => money,
  percentageChange: () => percentageChange,
  percentageDifference: () => percentageDifference,
  sumArrayByKey: () => sumArrayByKey,
  timeStamp: () => timeStamp,
  whatPercentOfXIsY: () => whatPercentOfXIsY
});
module.exports = __toCommonJS(src_exports);

// src/finance/cryptocurrency/coingecko/index.ts
var fetchCryptoPriceHistory = (name, days) => fetch(
  `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=aud&days=max&interval=daily`
).then((data) => data.json()).then(
  ({ prices }) => prices.slice(days).map((item) => item[1])
);

// src/finance/helpers/averageGain.ts
function calculateAverageGain(prices, days) {
  const gainPrices = prices.slice(0, days);
  let totalGain = 0;
  let numDays = 0;
  gainPrices.forEach((currentPrice, index) => {
    const nextPrice = prices[index + 1];
    if (nextPrice && currentPrice > nextPrice) {
      totalGain += currentPrice - nextPrice;
      numDays++;
    }
  });
  if (numDays === 0) {
    return 1;
  } else {
    return totalGain / numDays;
  }
}

// src/finance/helpers/averageLoss.ts
function calculateAverageLoss(prices, days) {
  if (prices.length === 0) {
    return 0;
  }
  if (days > prices.length) {
    days = prices.length;
  }
  const lossPrices = prices.slice(0, days);
  let totalLoss = 0;
  let numDays = 0;
  lossPrices.forEach((currentPrice, index) => {
    const nextPrice = prices[index + 1];
    if (nextPrice && currentPrice > nextPrice) {
      totalLoss += currentPrice - nextPrice;
      numDays++;
    }
  });
  if (numDays === 0) {
    return 0;
  }
  return totalLoss / numDays;
}

// src/math/average/index.ts
function average(array) {
  return array.reduce((prev, next) => prev + next, 0) / array.length;
}

// src/math/percentageChange.ts
function percentageChange(initialValue, finalValue) {
  return (finalValue - initialValue) / initialValue * 100;
}

// src/math/percentageDifference.ts
function percentageDifference(value1, value2) {
  const range = value2 - value1;
  const average2 = (value2 + value1) / 2;
  return range / average2 * 100;
}

// src/math/whatPercentOfXisY.ts
var whatPercentOfXIsY = (x, y) => x / y * 100;

// src/finance/helpers/sma.ts
function calculateSMA(prices, days) {
  const smaPrices = prices.slice(0, days);
  return average(smaPrices);
}

// src/finance/helpers/sd.ts
function calculateStandardDeviation(prices, days) {
  const sma = calculateSMA(prices, days);
  let sumSquaredDifferences = 0;
  prices.forEach((price) => {
    sumSquaredDifferences += (price - sma) ** 2;
  });
  return Math.sqrt(sumSquaredDifferences / days);
}

// src/finance/helpers/bollinger.ts
function calculateBollingerBands(prices) {
  const sma = calculateSMA(prices, 20);
  const standardDeviation = calculateStandardDeviation(prices, 20);
  return {
    upper: sma + 2 * standardDeviation,
    lower: sma - 2 * standardDeviation
  };
}

// src/finance/helpers/currency.ts
var import_currency = __toESM(require("currency.js"));
var money = (value) => (0, import_currency.default)(String(value));
function findSimpleMovingAverage(inputArray) {
  if (!inputArray) {
    return 0;
  }
  const sum = inputArray.reduce(
    (accumulator, nextValue) => accumulator + Number(nextValue),
    0
  );
  return sum / inputArray.length;
}
function getConversionRate(rates, fromCurrency, toCurrency) {
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  if (!fromRate) {
    return { value: "0", error: `Invalid from currency: ${fromCurrency}` };
  }
  if (!toRate) {
    return { value: "0", error: `Invalid to currency: ${toCurrency}` };
  }
  return { value: (0, import_currency.default)(toRate).divide(fromRate).toString() };
}
function convertCurrency({
  exchangeRates,
  fromCurrency,
  toCurrency,
  amount
}) {
  const { value: conversionRate } = getConversionRate(
    exchangeRates,
    fromCurrency,
    toCurrency
  );
  return money(amount).multiply(conversionRate);
}

// src/finance/helpers/ema.ts
function calculateEMA(prices, days) {
  const multiplier = 2 / (days + 1);
  let ema = average(prices.slice(0, days));
  prices.slice(days).forEach((price) => {
    ema = (price - ema) * multiplier + ema;
  });
  return ema;
}

// src/finance/helpers/fibonacci.ts
function calculateFibonacciResistance(prices) {
  if (prices.length === 0) {
    return 0;
  }
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);
  const fibonacciLevels = [
    lowestPrice + (highestPrice - lowestPrice) * 0.236,
    lowestPrice + (highestPrice - lowestPrice) * 0.382,
    lowestPrice + (highestPrice - lowestPrice) * 0.5,
    lowestPrice + (highestPrice - lowestPrice) * 0.618,
    lowestPrice + (highestPrice - lowestPrice) * 0.786
  ];
  return Math.max(...fibonacciLevels);
}

// src/finance/helpers/macd.ts
function calculateMACD(prices) {
  const ema26 = calculateEMA(prices, 26);
  const ema12 = calculateEMA(prices, 12);
  return ema26 - ema12;
}

// src/finance/helpers/rsi.ts
function calculateRSI(prices) {
  const averageGain = calculateAverageGain(prices, 14);
  const averageLoss = calculateAverageLoss(prices, 14);
  const relativeStrength = averageGain / averageLoss;
  return 100 - 100 / (1 + relativeStrength);
}

// src/helpers/flatten/index.ts
function flat(obj) {
  const result = /* @__PURE__ */ new Map();
  function flatten(obj2, prefix = "") {
    for (const [key, value] of Object.entries(obj2)) {
      if (typeof value === "object") {
        flatten(value, `${prefix}${key}.`);
      } else {
        result.set(prefix + key, value);
      }
    }
  }
  flatten(obj);
  return Object.fromEntries(result);
}

// src/helpers/isNegative.ts
var isNegative = (number) => Math.sign(Number(number)) === -1;

// src/helpers/isNumeric.ts
var isNumeric = (value) => value != null && value !== "" && !isNaN(Number(value.toString()));

// src/helpers/logger.ts
var isDev = process.env.NODE_ENV === "development";
var isClient = !(typeof process === "object");
var isDebug = () => isDev && isClient;
var logger = (() => {
  const customLogText = `%c ${isClient ? "CLIENT" : "SERVER"}:`;
  const print = (type, ...messages) => {
    if (process.env.NEXT_PUBLIC_LOGS_ENABLED || isDev) {
      switch (type) {
        case "info":
          console.info(
            customLogText,
            "background: #4299E1; color: #000000;",
            ...messages
          );
          break;
        case "warn":
          console.warn(
            customLogText,
            "background: #ED8936; color: #000000;",
            ...messages
          );
          break;
        case "error":
          console.error(
            `${customLogText}\u274C`,
            "background: #F56565; color: #000000;",
            ...messages
          );
          break;
        case "trace":
          console.trace(
            customLogText,
            "background: #A0AEC0; color: #000000;",
            ...messages
          );
          break;
        case "debug":
        default:
          console.log(
            customLogText,
            "background: #48BB78; color: #000000;",
            ...messages
          );
      }
    }
  };
  return {
    debug: print.bind(null, "debug"),
    info: print.bind(null, "info"),
    warn: print.bind(null, "warn"),
    error: print.bind(null, "error"),
    trace: print.bind(null, "trace")
  };
})();
var timeStamp = (...args) => {
  logger.info(`[${new Date().toISOString().slice(11, 23)}] -`, ...args);
};
var debugLog = (...args) => {
  if (process.env.DEBUG === "1") {
    timeStamp(...args);
  }
};

// src/helpers/mapAsync.ts
var mapAsync = async (array, callbackfn) => Promise.all(array.map(callbackfn));
var flattenArrToObj = (arr, key, value) => arr.reduce(
  (acc, val) => ({
    ...acc,
    [`${val[key]}`]: val[value]
  }),
  {}
);

// src/helpers/array.ts
var import_currency2 = __toESM(require("currency.js"));
function sumArrayByKey(input, key, precision = 2) {
  return input.reduce(
    (acc, next) => acc.add((0, import_currency2.default)(next[key], { precision })),
    (0, import_currency2.default)(0, { precision })
  ).toString();
}

// src/finance/cryptocurrency/helpers/helpers.ts
function calculateCryptoSummary(crypto, exchangeRates, toCurrency = "usd") {
  var _a, _b;
  const price = convertCurrency({
    exchangeRates,
    fromCurrency: ((_a = crypto == null ? void 0 : crypto.market) == null ? void 0 : _a.currency) || crypto.currency,
    toCurrency,
    amount: (_b = crypto == null ? void 0 : crypto.market) == null ? void 0 : _b.price.toString()
  });
  const costBasis = convertCurrency({
    exchangeRates,
    fromCurrency: crypto.currency,
    toCurrency,
    amount: crypto.costBasis.toString()
  });
  const balance = money(crypto == null ? void 0 : crypto.balance);
  const targetBalance = money(crypto.targetBalance);
  const value = balance.multiply(price);
  const unrealisedGain = value.subtract(costBasis);
  const unrealisedGainPercentage = Number.isNaN(
    unrealisedGain.divide(costBasis).value
  ) ? "0" : unrealisedGain.divide(costBasis);
  const averageCost = costBasis.divide(balance);
  const saleable = balance.subtract(targetBalance);
  const saleableValue = saleable.multiply(price);
  const estimatedStakingYield = money(crypto.rateOfIncome).multiply(money(crypto.interestBearingBalance)).divide(100);
  const estimatedYearlyReturn = estimatedStakingYield.multiply(price);
  const amountStaked = money(crypto.interestBearingBalance);
  const belowTargetBalance = saleable.intValue < targetBalance.intValue;
  const shouldSell = averageCost < price;
  return {
    ...crypto,
    shouldSell,
    belowTargetBalance,
    value: value.toString(),
    price: price.toString(),
    currency: toCurrency,
    saleable: saleable.toString(),
    costBasis: costBasis.toString(),
    averageCost: averageCost.toString(),
    amountStaked: amountStaked.toString(),
    saleableValue: saleableValue.toString(),
    unrealisedGain: unrealisedGain.toString(),
    estimatedYearlyReturn: estimatedYearlyReturn.toString(),
    estimatedStakingYield: estimatedStakingYield.toString(),
    unrealisedGainPercentage: unrealisedGainPercentage.toString()
  };
}
function calculateNestedAccountTotals(Children) {
  const unrealisedGain = sumArrayByKey(Children, "unrealisedGain");
  const unrealisedGainPercentage = sumArrayByKey(
    Children,
    "unrealisedGainPercentage"
  );
  const averageCost = "0.00";
  const costBasis = sumArrayByKey(Children, "costBasis");
  const value = sumArrayByKey(Children, "value");
  const saleableValue = sumArrayByKey(Children, "saleableValue");
  return {
    value,
    Children,
    averageCost,
    costBasis,
    saleableValue,
    unrealisedGain,
    unrealisedGainPercentage
  };
}
function calculateOneCrypto({
  crypto,
  exchangeRates,
  userCurrency
}) {
  var _a;
  const finalData = calculateCryptoSummary(crypto, exchangeRates, userCurrency);
  const Children = (_a = crypto.Children) == null ? void 0 : _a.map(
    (child) => calculateCryptoSummary(child, exchangeRates, userCurrency)
  );
  if (Children !== void 0 && Children.length > 0) {
    return {
      ...finalData,
      ...calculateNestedAccountTotals(Children)
    };
  }
  return finalData;
}
function calculateManyCrypto({
  data,
  userCurrency,
  exchangeRates
}) {
  return data.map(
    (crypto) => calculateOneCrypto({ crypto, userCurrency, exchangeRates })
  );
}
function calculateCryptoOverview({
  data
}) {
  const totalValue = sumArrayByKey(data, "value");
  const totalCostBasis = sumArrayByKey(data, "costBasis");
  const unrealisedGain = money(totalValue).subtract(totalCostBasis);
  const saleableValue = sumArrayByKey(data, "saleableValue");
  const totalEstimatedYearlyReturn = sumArrayByKey(
    data,
    "estimatedYearlyReturn"
  );
  return {
    totalValue,
    saleableValue,
    totalCostBasis,
    unrealisedGain,
    totalEstimatedYearlyReturn
  };
}
function calculateCryptoIncome() {
  return console.log("TODO: calculate income summary");
}

// src/finance/forex/index.ts
var getExchangeRates = (markets) => {
  const market = markets == null ? void 0 : markets.map(({ price, ...rest }) => {
    return {
      ...rest,
      price: price.toString()
    };
  });
  return flattenArrToObj(market, "ticker", "price");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  average,
  calculateAverageGain,
  calculateAverageLoss,
  calculateBollingerBands,
  calculateCryptoIncome,
  calculateCryptoOverview,
  calculateCryptoSummary,
  calculateEMA,
  calculateFibonacciResistance,
  calculateMACD,
  calculateManyCrypto,
  calculateOneCrypto,
  calculateRSI,
  calculateSMA,
  calculateStandardDeviation,
  convertCurrency,
  debugLog,
  fetchCryptoPriceHistory,
  findSimpleMovingAverage,
  flat,
  flattenArrToObj,
  getConversionRate,
  getExchangeRates,
  isClient,
  isDebug,
  isDev,
  isNegative,
  isNumeric,
  logger,
  mapAsync,
  money,
  percentageChange,
  percentageDifference,
  sumArrayByKey,
  timeStamp,
  whatPercentOfXIsY
});
//# sourceMappingURL=index.js.map