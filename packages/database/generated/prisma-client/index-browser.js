Object.defineProperty(exports, '__esModule', { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
} = require('./runtime/index-browser');

const Prisma = {};

exports.Prisma = Prisma;

/**
 * Prisma Client JS version: 4.10.1
 * Query Engine version: aead147aa326ccb985dcfed5b065b4fdabd44b19
 */
Prisma.prismaVersion = {
  client: '4.10.1',
  engine: 'aead147aa326ccb985dcfed5b065b4fdabd44b19',
};

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.validator = () => (val) => val;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) {
  return x;
}

exports.Prisma.AccountScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
});

exports.Prisma.AssetLabelScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  assetId: 'assetId',
});

exports.Prisma.AssetScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  institution: 'institution',
  currency: 'currency',
  apiKey: 'apiKey',
  apiSecret: 'apiSecret',
  walletAddress: 'walletAddress',
  balance: 'balance',
  costBasis: 'costBasis',
  realisedGain: 'realisedGain',
  targetBalance: 'targetBalance',
  interestBearingBalance: 'interestBearingBalance',
  incomeRate: 'incomeRate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  account: 'account',
  category: 'category',
  categoryId: 'categoryId',
  marketId: 'marketId',
  parentId: 'parentId',
  userId: 'userId',
  status: 'status',
});

exports.Prisma.AssetTransactionScalarFieldEnum = makeEnum({
  id: 'id',
  timestamp: 'timestamp',
  pricePerUnit: 'pricePerUnit',
  baseCurrency: 'baseCurrency',
  quantity: 'quantity',
  quantityFilled: 'quantityFilled',
  fee: 'fee',
  valueInBaseCurrency: 'valueInBaseCurrency',
  fromAsset: 'fromAsset',
  toAsset: 'toAsset',
  market: 'market',
  transactionType: 'transactionType',
  expiry: 'expiry',
  status: 'status',
  transactionHash: 'transactionHash',
  description: 'description',
  memo: 'memo',
  relatedAssetId: 'relatedAssetId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.BudgetEnvelopeScalarFieldEnum = makeEnum({
  id: 'id',
  budgetId: 'budgetId',
  name: 'name',
  remainingAmount: 'remainingAmount',
  totalAmount: 'totalAmount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.BudgetScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  userId: 'userId',
  totalBalance: 'totalBalance',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.BudgetTransactionScalarFieldEnum = makeEnum({
  id: 'id',
  timestamp: 'timestamp',
  pricePerUnit: 'pricePerUnit',
  baseCurrency: 'baseCurrency',
  quantity: 'quantity',
  quantityFilled: 'quantityFilled',
  fee: 'fee',
  valueInBaseCurrency: 'valueInBaseCurrency',
  fromAsset: 'fromAsset',
  toAsset: 'toAsset',
  market: 'market',
  transactionType: 'transactionType',
  expiry: 'expiry',
  status: 'status',
  transactionHash: 'transactionHash',
  description: 'description',
  memo: 'memo',
  imageUrl: 'imageUrl',
  imageName: 'imageName',
  imageId: 'imageId',
  budgetEnvelopeId: 'budgetEnvelopeId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.CashSnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  currency: 'currency',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.CryptoSnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  currency: 'currency',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.CryptocurrencyScalarFieldEnum = makeEnum({
  id: 'id',
  displayName: 'displayName',
  currency: 'currency',
  balance: 'balance',
  costBasis: 'costBasis',
  realisedGain: 'realisedGain',
  apiKey: 'apiKey',
  apiSecret: 'apiSecret',
  walletAddress: 'walletAddress',
  targetBalance: 'targetBalance',
  interestBearingBalance: 'interestBearingBalance',
  incomeRate: 'incomeRate',
  accountConnection: 'accountConnection',
  marketId: 'marketId',
  parentId: 'parentId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.CustomAssetCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.IncomeScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  payFrequency: 'payFrequency',
  grossAmount: 'grossAmount',
  grossFrequency: 'grossFrequency',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.LogScalarFieldEnum = makeEnum({
  id: 'id',
  type: 'type',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.MarketScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  ticker: 'ticker',
  description: 'description',
  currency: 'currency',
  price: 'price',
  priceChange24h: 'priceChange24h',
  priceChange24hPercent: 'priceChange24hPercent',
  marketCap: 'marketCap',
  marketCapRank: 'marketCapRank',
  type: 'type',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.PortfolioSnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  currency: 'currency',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.PropertySnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  currency: 'currency',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive',
});

exports.Prisma.SecuritySnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  currency: 'currency',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
});

exports.Prisma.SettingsScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  preferredColorScheme: 'preferredColorScheme',
  userCurrency: 'userCurrency',
  userLanguage: 'userLanguage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc',
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  role: 'role',
});

exports.Prisma.VerificationTokenScalarFieldEnum = makeEnum({
  identifier: 'identifier',
  token: 'token',
  expires: 'expires',
});
exports.AccountConnection = makeEnum({
  NONE: 'NONE',
  SWYFTX: 'SWYFTX',
  COINSPOT: 'COINSPOT',
});

exports.AssetStatus = makeEnum({
  CONNECTED: 'CONNECTED',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  DISCONNECTED: 'DISCONNECTED',
  PENDING_CONNECTION: 'PENDING_CONNECTION',
  ERROR: 'ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  MAINTENANCE: 'MAINTENANCE',
  BLOCKED: 'BLOCKED',
  UNKNOWN: 'UNKNOWN',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

exports.Category = makeEnum({
  LOAN: 'LOAN',
  CASH: 'CASH',
  CUSTOM: 'CUSTOM',
  MORTGAGE: 'MORTGAGE',
  PROPERTY: 'PROPERTY',
  INVESTMENT: 'INVESTMENT',
  CREDIT: 'CREDIT',
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  SUPERANNUATION: 'SUPERANNUATION',
});

exports.ColorScheme = makeEnum({
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  TBA: 'TBA',
});

exports.LogType = makeEnum({
  info: 'info',
  warn: 'warn',
  error: 'error',
  trace: 'trace',
  debug: 'debug',
});

exports.MarketType = makeEnum({
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  STOCK: 'STOCK',
  ETF: 'ETF',
  METAL: 'METAL',
  OTHER: 'OTHER',
  CASH: 'CASH',
});

exports.Role = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN',
});

exports.Prisma.ModelName = makeEnum({
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Settings: 'Settings',
  Log: 'Log',
  Income: 'Income',
  Budget: 'Budget',
  BudgetEnvelope: 'BudgetEnvelope',
  BudgetTransaction: 'BudgetTransaction',
  CustomAssetCategory: 'CustomAssetCategory',
  AssetLabel: 'AssetLabel',
  Asset: 'Asset',
  AssetTransaction: 'AssetTransaction',
  PortfolioSnapshot: 'PortfolioSnapshot',
  CryptoSnapshot: 'CryptoSnapshot',
  CashSnapshot: 'CashSnapshot',
  PropertySnapshot: 'PropertySnapshot',
  SecuritySnapshot: 'SecuritySnapshot',
  Cryptocurrency: 'Cryptocurrency',
  Market: 'Market',
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    );
  }
}
exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
