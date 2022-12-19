
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.1.1
 * Query Engine version: 272861e07ab64f234d3ffc4094e32bd61775599c
 */
Prisma.prismaVersion = {
  client: "4.1.1",
  engine: "272861e07ab64f234d3ffc4094e32bd61775599c"
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
  deleted: 'deleted'
});

exports.Prisma.CryptoSnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.CashSnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  totalValue: 'totalValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.PropertySnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  totalValue: 'totalValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.SecuritySnapshotScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  totalValue: 'totalValue',
  costBasis: 'costBasis',
  unrealisedGain: 'unrealisedGain',
  realisedGain: 'realisedGain',
  saleableValue: 'saleableValue',
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
  walletAddress: 'walletAddress',
  targetBalance: 'targetBalance',
  interestBearingBalance: 'interestBearingBalance',
  rateOfIncome: 'rateOfIncome',
  accountConnection: 'accountConnection',
  apiKey: 'apiKey',
  apiSecret: 'apiSecret',
  marketId: 'marketId',
  userId: 'userId',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
});

exports.Prisma.MarketScalarFieldEnum = makeEnum({
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

exports.Prisma.BudgetItemScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  category: 'category',
  amount: 'amount',
  frequency: 'frequency',
  budgetId: 'budgetId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
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

exports.Prisma.ModelName = makeEnum({
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  Log: 'Log',
  CryptoSnapshot: 'CryptoSnapshot',
  CashSnapshot: 'CashSnapshot',
  PropertySnapshot: 'PropertySnapshot',
  SecuritySnapshot: 'SecuritySnapshot',
  PortfolioSnapshot: 'PortfolioSnapshot',
  VerificationToken: 'VerificationToken',
  Settings: 'Settings',
  Cryptocurrency: 'Cryptocurrency',
  Market: 'Market',
  Income: 'Income',
  Budget: 'Budget',
  BudgetItem: 'BudgetItem'
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
