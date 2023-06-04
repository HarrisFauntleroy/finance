
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.15.0
 * Query Engine version: 8fbc245156db7124f997f4cecdd8d1219e360944
 */
Prisma.prismaVersion = {
  client: "4.15.0",
  engine: "8fbc245156db7124f997f4cecdd8d1219e360944"
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

exports.Prisma.AccountScalarFieldEnum = {
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
};

exports.Prisma.AssetLabelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  assetId: 'assetId'
};

exports.Prisma.AssetScalarFieldEnum = {
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
  status: 'status'
};

exports.Prisma.AssetTransactionScalarFieldEnum = {
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
  deletedAt: 'deletedAt'
};

exports.Prisma.BudgetEnvelopeScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  name: 'name',
  remainingAmount: 'remainingAmount',
  totalAmount: 'totalAmount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
};

exports.Prisma.BudgetScalarFieldEnum = {
  id: 'id',
  name: 'name',
  userId: 'userId',
  totalBalance: 'totalBalance',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
};

exports.Prisma.BudgetTransactionScalarFieldEnum = {
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
  deletedAt: 'deletedAt'
};

exports.Prisma.CashSnapshotScalarFieldEnum = {
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
};

exports.Prisma.CryptoSnapshotScalarFieldEnum = {
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
};

exports.Prisma.CryptocurrencyScalarFieldEnum = {
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
  deletedAt: 'deletedAt'
};

exports.Prisma.CustomAssetCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
};

exports.Prisma.IncomeScalarFieldEnum = {
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
};

exports.Prisma.LogScalarFieldEnum = {
  id: 'id',
  type: 'type',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
};

exports.Prisma.MarketScalarFieldEnum = {
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
};

exports.Prisma.PortfolioSnapshotScalarFieldEnum = {
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
};

exports.Prisma.PropertySnapshotScalarFieldEnum = {
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
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.SecuritySnapshotScalarFieldEnum = {
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
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.SettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  preferredColorScheme: 'preferredColorScheme',
  userCurrency: 'userCurrency',
  userLanguage: 'userLanguage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  deletedAt: 'deletedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
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
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};
exports.AccountConnection = {
  NONE: 'NONE',
  SWYFTX: 'SWYFTX',
  COINSPOT: 'COINSPOT'
};

exports.AssetStatus = {
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
  INACTIVE: 'INACTIVE'
};

exports.Category = {
  LOAN: 'LOAN',
  CASH: 'CASH',
  CUSTOM: 'CUSTOM',
  MORTGAGE: 'MORTGAGE',
  PROPERTY: 'PROPERTY',
  INVESTMENT: 'INVESTMENT',
  CREDIT: 'CREDIT',
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  SUPERANNUATION: 'SUPERANNUATION'
};

exports.ColorScheme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  TBA: 'TBA'
};

exports.LogType = {
  info: 'info',
  warn: 'warn',
  error: 'error',
  trace: 'trace',
  debug: 'debug'
};

exports.MarketType = {
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  STOCK: 'STOCK',
  ETF: 'ETF',
  METAL: 'METAL',
  OTHER: 'OTHER',
  CASH: 'CASH'
};

exports.Role = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.Prisma.ModelName = {
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
  Market: 'Market'
};

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
