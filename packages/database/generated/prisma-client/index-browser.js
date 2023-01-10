
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.1.1
 * Query Engine version: 8d8414deb360336e4698a65aa45a1fbaf1ce13d8
 */
Prisma.prismaVersion = {
  client: "4.1.1",
  engine: "8d8414deb360336e4698a65aa45a1fbaf1ce13d8"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

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
  session_state: 'session_state'
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
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
  role: 'role'
});

exports.Prisma.LogScalarFieldEnum = makeEnum({
  id: 'id',
  type: 'type',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.VerificationTokenScalarFieldEnum = makeEnum({
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
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
  deletedAt: 'deletedAt'
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
  rateOfIncome: 'rateOfIncome',
  accountConnection: 'accountConnection',
  marketId: 'marketId',
  userId: 'userId',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
});

exports.Prisma.BudgetScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.BudgetAssetScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  type: 'type',
  amount: 'amount',
  frequency: 'frequency',
  budgetId: 'budgetId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.UserCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.UserLabelScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  assetId: 'assetId'
});

exports.Prisma.AssetScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  value: 'value',
  currency: 'currency',
  category: 'category',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
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
  deletedAt: 'deletedAt'
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
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
  memo: 'memo'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.Role = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

exports.LogType = makeEnum({
  info: 'info',
  warn: 'warn',
  error: 'error',
  trace: 'trace',
  debug: 'debug'
});

exports.ColorScheme = makeEnum({
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  TBA: 'TBA'
});

exports.AccountConnection = makeEnum({
  NONE: 'NONE',
  SWYFTX: 'SWYFTX',
  COINSPOT: 'COINSPOT'
});

exports.MarketType = makeEnum({
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  STOCK: 'STOCK',
  ETF: 'ETF',
  METAL: 'METAL',
  OTHER: 'OTHER',
  CASH: 'CASH'
});

exports.Category = makeEnum({
  LOAN: 'LOAN',
  CASH: 'CASH',
  CUSTOM: 'CUSTOM',
  MORTGAGE: 'MORTGAGE',
  PROPERTY: 'PROPERTY',
  SECURITY: 'SECURITY',
  CREDIT_CARD: 'CREDIT_CARD',
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  SUPERANNUATION: 'SUPERANNUATION'
});

exports.Prisma.ModelName = makeEnum({
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  Log: 'Log',
  VerificationToken: 'VerificationToken',
  Settings: 'Settings',
  Cryptocurrency: 'Cryptocurrency',
  Market: 'Market',
  Income: 'Income',
  Budget: 'Budget',
  BudgetAsset: 'BudgetAsset',
  UserCategory: 'UserCategory',
  UserLabel: 'UserLabel',
  Asset: 'Asset',
  PortfolioSnapshot: 'PortfolioSnapshot',
  CryptoSnapshot: 'CryptoSnapshot',
  CashSnapshot: 'CashSnapshot',
  PropertySnapshot: 'PropertySnapshot',
  SecuritySnapshot: 'SecuritySnapshot',
  Transaction: 'Transaction'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
