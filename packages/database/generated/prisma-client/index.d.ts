
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Account
 * 
 */
export type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

/**
 * Model Session
 * 
 */
export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
  role: Role
}

/**
 * Model Log
 * 
 */
export type Log = {
  id: string
  type: LogType
  message: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
}

/**
 * Model CryptoSnapshot
 * 
 */
export type CryptoSnapshot = {
  id: string
  userId: string
  totalValue: Prisma.Decimal
  costBasis: Prisma.Decimal
  unrealisedGain: Prisma.Decimal
  realisedGain: Prisma.Decimal
  saleableValue: Prisma.Decimal
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model CashSnapshot
 * 
 */
export type CashSnapshot = {
  id: string
  userId: string
  totalValue: Prisma.Decimal
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model PropertySnapshot
 * 
 */
export type PropertySnapshot = {
  id: string
  userId: string
  totalValue: Prisma.Decimal
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model SecuritySnapshot
 * 
 */
export type SecuritySnapshot = {
  id: string
  userId: string
  totalValue: Prisma.Decimal
  costBasis: Prisma.Decimal
  unrealisedGain: Prisma.Decimal
  realisedGain: Prisma.Decimal
  saleableValue: Prisma.Decimal
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model PortfolioSnapshot
 * 
 */
export type PortfolioSnapshot = {
  id: string
  currency: string
  totalValue: Prisma.Decimal
  costBasis: Prisma.Decimal
  unrealisedGain: Prisma.Decimal
  realisedGain: Prisma.Decimal
  saleableValue: Prisma.Decimal
  userId: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}

/**
 * Model Settings
 * 
 */
export type Settings = {
  id: string
  userId: string
  preferredColorScheme: ColorScheme | null
  userCurrency: string
  userLanguage: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model Cryptocurrency
 * 
 */
export type Cryptocurrency = {
  id: string
  displayName: string
  currency: string
  balance: Prisma.Decimal
  costBasis: Prisma.Decimal
  realisedGain: Prisma.Decimal
  walletAddress: string | null
  targetBalance: Prisma.Decimal
  interestBearingBalance: Prisma.Decimal
  rateOfIncome: Prisma.Decimal
  accountConnection: AccountConnection | null
  apiKey: string | null
  apiSecret: string | null
  marketId: string | null
  userId: string
  parentId: string | null
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model Market
 * 
 */
export type Market = {
  name: string
  ticker: string
  description: string | null
  currency: string
  price: Prisma.Decimal
  priceChange24h: Prisma.Decimal
  priceChange24hPercent: Prisma.Decimal
  marketCap: Prisma.Decimal
  marketCapRank: Prisma.Decimal
  type: MarketType
  image: string | null
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model Income
 * 
 */
export type Income = {
  id: string
  name: string
  payFrequency: string
  grossAmount: string
  grossFrequency: string
  userId: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model Budget
 * 
 */
export type Budget = {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}

/**
 * Model BudgetItem
 * 
 */
export type BudgetItem = {
  id: string
  name: string
  category: string
  amount: string
  frequency: string
  budgetId: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt: Date | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const LogType: {
  info: 'info',
  warn: 'warn',
  error: 'error',
  trace: 'trace',
  debug: 'debug'
};

export type LogType = (typeof LogType)[keyof typeof LogType]


export const ColorScheme: {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  TBA: 'TBA'
};

export type ColorScheme = (typeof ColorScheme)[keyof typeof ColorScheme]


export const AccountConnection: {
  NONE: 'NONE',
  SWYFTX: 'SWYFTX',
  COINSPOT: 'COINSPOT'
};

export type AccountConnection = (typeof AccountConnection)[keyof typeof AccountConnection]


export const MarketType: {
  CRYPTOCURRENCY: 'CRYPTOCURRENCY',
  STOCK: 'STOCK',
  ETF: 'ETF',
  METAL: 'METAL',
  OTHER: 'OTHER',
  CASH: 'CASH'
};

export type MarketType = (typeof MarketType)[keyof typeof MarketType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.log`: Exposes CRUD operations for the **Log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logs
    * const logs = await prisma.log.findMany()
    * ```
    */
  get log(): Prisma.LogDelegate<GlobalReject>;

  /**
   * `prisma.cryptoSnapshot`: Exposes CRUD operations for the **CryptoSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CryptoSnapshots
    * const cryptoSnapshots = await prisma.cryptoSnapshot.findMany()
    * ```
    */
  get cryptoSnapshot(): Prisma.CryptoSnapshotDelegate<GlobalReject>;

  /**
   * `prisma.cashSnapshot`: Exposes CRUD operations for the **CashSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashSnapshots
    * const cashSnapshots = await prisma.cashSnapshot.findMany()
    * ```
    */
  get cashSnapshot(): Prisma.CashSnapshotDelegate<GlobalReject>;

  /**
   * `prisma.propertySnapshot`: Exposes CRUD operations for the **PropertySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertySnapshots
    * const propertySnapshots = await prisma.propertySnapshot.findMany()
    * ```
    */
  get propertySnapshot(): Prisma.PropertySnapshotDelegate<GlobalReject>;

  /**
   * `prisma.securitySnapshot`: Exposes CRUD operations for the **SecuritySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecuritySnapshots
    * const securitySnapshots = await prisma.securitySnapshot.findMany()
    * ```
    */
  get securitySnapshot(): Prisma.SecuritySnapshotDelegate<GlobalReject>;

  /**
   * `prisma.portfolioSnapshot`: Exposes CRUD operations for the **PortfolioSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioSnapshots
    * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany()
    * ```
    */
  get portfolioSnapshot(): Prisma.PortfolioSnapshotDelegate<GlobalReject>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<GlobalReject>;

  /**
   * `prisma.cryptocurrency`: Exposes CRUD operations for the **Cryptocurrency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cryptocurrencies
    * const cryptocurrencies = await prisma.cryptocurrency.findMany()
    * ```
    */
  get cryptocurrency(): Prisma.CryptocurrencyDelegate<GlobalReject>;

  /**
   * `prisma.market`: Exposes CRUD operations for the **Market** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Markets
    * const markets = await prisma.market.findMany()
    * ```
    */
  get market(): Prisma.MarketDelegate<GlobalReject>;

  /**
   * `prisma.income`: Exposes CRUD operations for the **Income** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incomes
    * const incomes = await prisma.income.findMany()
    * ```
    */
  get income(): Prisma.IncomeDelegate<GlobalReject>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<GlobalReject>;

  /**
   * `prisma.budgetItem`: Exposes CRUD operations for the **BudgetItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BudgetItems
    * const budgetItems = await prisma.budgetItem.findMany()
    * ```
    */
  get budgetItem(): Prisma.BudgetItemDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.1.1
   * Query Engine version: 272861e07ab64f234d3ffc4094e32bd61775599c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    budget: number
    cryptocurrency: number
    sessions: number
    portfolioSnapshot: number
    cryptoSnapshots: number
    cashSnapshots: number
    propertySnapshots: number
    securitySnapshots: number
  }

  export type UserCountOutputTypeSelect = {
    accounts?: boolean
    budget?: boolean
    cryptocurrency?: boolean
    sessions?: boolean
    portfolioSnapshot?: boolean
    cryptoSnapshots?: boolean
    cashSnapshots?: boolean
    propertySnapshots?: boolean
    securitySnapshots?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type CryptocurrencyCountOutputType
   */


  export type CryptocurrencyCountOutputType = {
    Children: number
  }

  export type CryptocurrencyCountOutputTypeSelect = {
    Children?: boolean
  }

  export type CryptocurrencyCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CryptocurrencyCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CryptocurrencyCountOutputType
    : S extends undefined
    ? never
    : S extends CryptocurrencyCountOutputTypeArgs
    ?'include' extends U
    ? CryptocurrencyCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CryptocurrencyCountOutputType ? CryptocurrencyCountOutputType[P] : never
  } 
    : CryptocurrencyCountOutputType
  : CryptocurrencyCountOutputType




  // Custom InputTypes

  /**
   * CryptocurrencyCountOutputType without action
   */
  export type CryptocurrencyCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CryptocurrencyCountOutputType
     * 
    **/
    select?: CryptocurrencyCountOutputTypeSelect | null
  }



  /**
   * Count Type MarketCountOutputType
   */


  export type MarketCountOutputType = {
    Cryptocurrency: number
  }

  export type MarketCountOutputTypeSelect = {
    Cryptocurrency?: boolean
  }

  export type MarketCountOutputTypeGetPayload<
    S extends boolean | null | undefined | MarketCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? MarketCountOutputType
    : S extends undefined
    ? never
    : S extends MarketCountOutputTypeArgs
    ?'include' extends U
    ? MarketCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof MarketCountOutputType ? MarketCountOutputType[P] : never
  } 
    : MarketCountOutputType
  : MarketCountOutputType




  // Custom InputTypes

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the MarketCountOutputType
     * 
    **/
    select?: MarketCountOutputTypeSelect | null
  }



  /**
   * Count Type BudgetCountOutputType
   */


  export type BudgetCountOutputType = {
    Children: number
    income: number
  }

  export type BudgetCountOutputTypeSelect = {
    Children?: boolean
    income?: boolean
  }

  export type BudgetCountOutputTypeGetPayload<
    S extends boolean | null | undefined | BudgetCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? BudgetCountOutputType
    : S extends undefined
    ? never
    : S extends BudgetCountOutputTypeArgs
    ?'include' extends U
    ? BudgetCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof BudgetCountOutputType ? BudgetCountOutputType[P] : never
  } 
    : BudgetCountOutputType
  : BudgetCountOutputType




  // Custom InputTypes

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the BudgetCountOutputType
     * 
    **/
    select?: BudgetCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs = {
    /**
     * Filter which Account to aggregate.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: Array<AccountScalarFieldEnum>
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserArgs
  }

  export type AccountInclude = {
    user?: boolean | UserArgs
  }

  export type AccountGetPayload<
    S extends boolean | null | undefined | AccountArgs,
    U = keyof S
      > = S extends true
        ? Account
    : S extends undefined
    ? never
    : S extends AccountArgs | AccountFindManyArgs
    ?'include' extends U
    ? Account  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Account ? Account[P] : never
  } 
    : Account
  : Account


  type AccountCountArgs = Merge<
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }
  >

  export interface AccountDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>> : CheckSelect<T, Prisma__AccountClient<Account | null >, Prisma__AccountClient<AccountGetPayload<T> | null >>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>> : CheckSelect<T, Prisma__AccountClient<Account | null >, Prisma__AccountClient<AccountGetPayload<T> | null >>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Account>>, PrismaPromise<Array<AccountGetPayload<T>>>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Find one Account that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where: AccountWhereUniqueInput
  }

  /**
   * Account: findUnique
   */
  export interface AccountFindUniqueArgs extends AccountFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     * 
    **/
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account: findFirst
   */
  export interface AccountFindFirstArgs extends AccountFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findMany
   */
  export type AccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Accounts to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to create a Account.
     * 
    **/
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs = {
    /**
     * The data used to create many Accounts.
     * 
    **/
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to update a Account.
     * 
    **/
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs = {
    /**
     * The data used to update Accounts.
     * 
    **/
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The filter to search for the Account to update in case it exists.
     * 
    **/
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     * 
    **/
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter which Account to delete.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs = {
    /**
     * Filter which Accounts to delete
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account: findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs = AccountFindUniqueArgsBase
      

  /**
   * Account: findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs = AccountFindFirstArgsBase
      

  /**
   * Account without action
   */
  export type AccountArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: Array<SessionScalarFieldEnum>
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserArgs
  }

  export type SessionInclude = {
    user?: boolean | UserArgs
  }

  export type SessionGetPayload<
    S extends boolean | null | undefined | SessionArgs,
    U = keyof S
      > = S extends true
        ? Session
    : S extends undefined
    ? never
    : S extends SessionArgs | SessionFindManyArgs
    ?'include' extends U
    ? Session  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Session ? Session[P] : never
  } 
    : Session
  : Session


  type SessionCountArgs = Merge<
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface SessionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null >, Prisma__SessionClient<SessionGetPayload<T> | null >>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null >, Prisma__SessionClient<SessionGetPayload<T> | null >>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find one Session that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }

  /**
   * Session: findUnique
   */
  export interface SessionFindUniqueArgs extends SessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session: findFirst
   */
  export interface SessionFindFirstArgs extends SessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     * 
    **/
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    /**
     * The data used to create many Sessions.
     * 
    **/
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     * 
    **/
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    /**
     * The data used to update Sessions.
     * 
    **/
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     * 
    **/
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     * 
    **/
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    /**
     * Filter which Sessions to delete
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session: findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs = SessionFindUniqueArgsBase
      

  /**
   * Session: findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs = SessionFindFirstArgsBase
      

  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
    role: Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
    role: Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    role: Role
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
    role?: boolean
    accounts?: boolean | AccountFindManyArgs
    budget?: boolean | BudgetFindManyArgs
    cryptocurrency?: boolean | CryptocurrencyFindManyArgs
    sessions?: boolean | SessionFindManyArgs
    settings?: boolean | SettingsArgs
    portfolioSnapshot?: boolean | PortfolioSnapshotFindManyArgs
    cryptoSnapshots?: boolean | CryptoSnapshotFindManyArgs
    cashSnapshots?: boolean | CashSnapshotFindManyArgs
    propertySnapshots?: boolean | PropertySnapshotFindManyArgs
    securitySnapshots?: boolean | SecuritySnapshotFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    accounts?: boolean | AccountFindManyArgs
    budget?: boolean | BudgetFindManyArgs
    cryptocurrency?: boolean | CryptocurrencyFindManyArgs
    sessions?: boolean | SessionFindManyArgs
    settings?: boolean | SettingsArgs
    portfolioSnapshot?: boolean | PortfolioSnapshotFindManyArgs
    cryptoSnapshots?: boolean | CryptoSnapshotFindManyArgs
    cashSnapshots?: boolean | CashSnapshotFindManyArgs
    propertySnapshots?: boolean | PropertySnapshotFindManyArgs
    securitySnapshots?: boolean | SecuritySnapshotFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['include'][P]>>  :
        P extends 'budget' ? Array < BudgetGetPayload<S['include'][P]>>  :
        P extends 'cryptocurrency' ? Array < CryptocurrencyGetPayload<S['include'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['include'][P]>>  :
        P extends 'settings' ? SettingsGetPayload<S['include'][P]> | null :
        P extends 'portfolioSnapshot' ? Array < PortfolioSnapshotGetPayload<S['include'][P]>>  :
        P extends 'cryptoSnapshots' ? Array < CryptoSnapshotGetPayload<S['include'][P]>>  :
        P extends 'cashSnapshots' ? Array < CashSnapshotGetPayload<S['include'][P]>>  :
        P extends 'propertySnapshots' ? Array < PropertySnapshotGetPayload<S['include'][P]>>  :
        P extends 'securitySnapshots' ? Array < SecuritySnapshotGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['select'][P]>>  :
        P extends 'budget' ? Array < BudgetGetPayload<S['select'][P]>>  :
        P extends 'cryptocurrency' ? Array < CryptocurrencyGetPayload<S['select'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['select'][P]>>  :
        P extends 'settings' ? SettingsGetPayload<S['select'][P]> | null :
        P extends 'portfolioSnapshot' ? Array < PortfolioSnapshotGetPayload<S['select'][P]>>  :
        P extends 'cryptoSnapshots' ? Array < CryptoSnapshotGetPayload<S['select'][P]>>  :
        P extends 'cashSnapshots' ? Array < CashSnapshotGetPayload<S['select'][P]>>  :
        P extends 'propertySnapshots' ? Array < PropertySnapshotGetPayload<S['select'][P]>>  :
        P extends 'securitySnapshots' ? Array < SecuritySnapshotGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    accounts<T extends AccountFindManyArgs = {}>(args?: Subset<T, AccountFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Account>>, PrismaPromise<Array<AccountGetPayload<T>>>>;

    budget<T extends BudgetFindManyArgs = {}>(args?: Subset<T, BudgetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Budget>>, PrismaPromise<Array<BudgetGetPayload<T>>>>;

    cryptocurrency<T extends CryptocurrencyFindManyArgs = {}>(args?: Subset<T, CryptocurrencyFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Cryptocurrency>>, PrismaPromise<Array<CryptocurrencyGetPayload<T>>>>;

    sessions<T extends SessionFindManyArgs = {}>(args?: Subset<T, SessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>;

    settings<T extends SettingsArgs = {}>(args?: Subset<T, SettingsArgs>): CheckSelect<T, Prisma__SettingsClient<Settings | null >, Prisma__SettingsClient<SettingsGetPayload<T> | null >>;

    portfolioSnapshot<T extends PortfolioSnapshotFindManyArgs = {}>(args?: Subset<T, PortfolioSnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PortfolioSnapshot>>, PrismaPromise<Array<PortfolioSnapshotGetPayload<T>>>>;

    cryptoSnapshots<T extends CryptoSnapshotFindManyArgs = {}>(args?: Subset<T, CryptoSnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CryptoSnapshot>>, PrismaPromise<Array<CryptoSnapshotGetPayload<T>>>>;

    cashSnapshots<T extends CashSnapshotFindManyArgs = {}>(args?: Subset<T, CashSnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CashSnapshot>>, PrismaPromise<Array<CashSnapshotGetPayload<T>>>>;

    propertySnapshots<T extends PropertySnapshotFindManyArgs = {}>(args?: Subset<T, PropertySnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PropertySnapshot>>, PrismaPromise<Array<PropertySnapshotGetPayload<T>>>>;

    securitySnapshots<T extends SecuritySnapshotFindManyArgs = {}>(args?: Subset<T, SecuritySnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<SecuritySnapshot>>, PrismaPromise<Array<SecuritySnapshotGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Log
   */


  export type AggregateLog = {
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  export type LogMinAggregateOutputType = {
    id: string | null
    type: LogType | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
  }

  export type LogMaxAggregateOutputType = {
    id: string | null
    type: LogType | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
  }

  export type LogCountAggregateOutputType = {
    id: number
    type: number
    message: number
    createdAt: number
    updatedAt: number
    deleted: number
    _all: number
  }


  export type LogMinAggregateInputType = {
    id?: true
    type?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
  }

  export type LogMaxAggregateInputType = {
    id?: true
    type?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
  }

  export type LogCountAggregateInputType = {
    id?: true
    type?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    _all?: true
  }

  export type LogAggregateArgs = {
    /**
     * Filter which Log to aggregate.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Logs
    **/
    _count?: true | LogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogMaxAggregateInputType
  }

  export type GetLogAggregateType<T extends LogAggregateArgs> = {
        [P in keyof T & keyof AggregateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog[P]>
      : GetScalarType<T[P], AggregateLog[P]>
  }




  export type LogGroupByArgs = {
    where?: LogWhereInput
    orderBy?: Enumerable<LogOrderByWithAggregationInput>
    by: Array<LogScalarFieldEnum>
    having?: LogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogCountAggregateInputType | true
    _min?: LogMinAggregateInputType
    _max?: LogMaxAggregateInputType
  }


  export type LogGroupByOutputType = {
    id: string
    type: LogType
    message: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  type GetLogGroupByPayload<T extends LogGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogGroupByOutputType[P]>
            : GetScalarType<T[P], LogGroupByOutputType[P]>
        }
      >
    >


  export type LogSelect = {
    id?: boolean
    type?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
  }

  export type LogGetPayload<
    S extends boolean | null | undefined | LogArgs,
    U = keyof S
      > = S extends true
        ? Log
    : S extends undefined
    ? never
    : S extends LogArgs | LogFindManyArgs
    ?'include' extends U
    ? Log 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Log ? Log[P] : never
  } 
    : Log
  : Log


  type LogCountArgs = Merge<
    Omit<LogFindManyArgs, 'select' | 'include'> & {
      select?: LogCountAggregateInputType | true
    }
  >

  export interface LogDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Log that matches the filter.
     * @param {LogFindUniqueArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LogFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LogFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Log'> extends True ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>> : CheckSelect<T, Prisma__LogClient<Log | null >, Prisma__LogClient<LogGetPayload<T> | null >>

    /**
     * Find the first Log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LogFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LogFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Log'> extends True ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>> : CheckSelect<T, Prisma__LogClient<Log | null >, Prisma__LogClient<LogGetPayload<T> | null >>

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.log.findMany()
     * 
     * // Get first 10 Logs
     * const logs = await prisma.log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logWithIdOnly = await prisma.log.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LogFindManyArgs>(
      args?: SelectSubset<T, LogFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Log>>, PrismaPromise<Array<LogGetPayload<T>>>>

    /**
     * Create a Log.
     * @param {LogCreateArgs} args - Arguments to create a Log.
     * @example
     * // Create one Log
     * const Log = await prisma.log.create({
     *   data: {
     *     // ... data to create a Log
     *   }
     * })
     * 
    **/
    create<T extends LogCreateArgs>(
      args: SelectSubset<T, LogCreateArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Create many Logs.
     *     @param {LogCreateManyArgs} args - Arguments to create many Logs.
     *     @example
     *     // Create many Logs
     *     const log = await prisma.log.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LogCreateManyArgs>(
      args?: SelectSubset<T, LogCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Log.
     * @param {LogDeleteArgs} args - Arguments to delete one Log.
     * @example
     * // Delete one Log
     * const Log = await prisma.log.delete({
     *   where: {
     *     // ... filter to delete one Log
     *   }
     * })
     * 
    **/
    delete<T extends LogDeleteArgs>(
      args: SelectSubset<T, LogDeleteArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Update one Log.
     * @param {LogUpdateArgs} args - Arguments to update one Log.
     * @example
     * // Update one Log
     * const log = await prisma.log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LogUpdateArgs>(
      args: SelectSubset<T, LogUpdateArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Delete zero or more Logs.
     * @param {LogDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LogDeleteManyArgs>(
      args?: SelectSubset<T, LogDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LogUpdateManyArgs>(
      args: SelectSubset<T, LogUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Log.
     * @param {LogUpsertArgs} args - Arguments to update or create a Log.
     * @example
     * // Update or create a Log
     * const log = await prisma.log.upsert({
     *   create: {
     *     // ... data to create a Log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log we want to update
     *   }
     * })
    **/
    upsert<T extends LogUpsertArgs>(
      args: SelectSubset<T, LogUpsertArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Find one Log that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LogFindUniqueOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LogFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LogFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Find the first Log that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LogFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.log.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
    **/
    count<T extends LogCountArgs>(
      args?: Subset<T, LogCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogAggregateArgs>(args: Subset<T, LogAggregateArgs>): PrismaPromise<GetLogAggregateType<T>>

    /**
     * Group by Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogGroupByArgs['orderBy'] }
        : { orderBy?: LogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LogClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Log base type for findUnique actions
   */
  export type LogFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Filter, which Log to fetch.
     * 
    **/
    where: LogWhereUniqueInput
  }

  /**
   * Log: findUnique
   */
  export interface LogFindUniqueArgs extends LogFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Log base type for findFirst actions
   */
  export type LogFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Filter, which Log to fetch.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     * 
    **/
    distinct?: Enumerable<LogScalarFieldEnum>
  }

  /**
   * Log: findFirst
   */
  export interface LogFindFirstArgs extends LogFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Log findMany
   */
  export type LogFindManyArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Filter, which Logs to fetch.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Logs.
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LogScalarFieldEnum>
  }


  /**
   * Log create
   */
  export type LogCreateArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * The data needed to create a Log.
     * 
    **/
    data: XOR<LogCreateInput, LogUncheckedCreateInput>
  }


  /**
   * Log createMany
   */
  export type LogCreateManyArgs = {
    /**
     * The data used to create many Logs.
     * 
    **/
    data: Enumerable<LogCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Log update
   */
  export type LogUpdateArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * The data needed to update a Log.
     * 
    **/
    data: XOR<LogUpdateInput, LogUncheckedUpdateInput>
    /**
     * Choose, which Log to update.
     * 
    **/
    where: LogWhereUniqueInput
  }


  /**
   * Log updateMany
   */
  export type LogUpdateManyArgs = {
    /**
     * The data used to update Logs.
     * 
    **/
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>
    /**
     * Filter which Logs to update
     * 
    **/
    where?: LogWhereInput
  }


  /**
   * Log upsert
   */
  export type LogUpsertArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * The filter to search for the Log to update in case it exists.
     * 
    **/
    where: LogWhereUniqueInput
    /**
     * In case the Log found by the `where` argument doesn't exist, create a new Log with this data.
     * 
    **/
    create: XOR<LogCreateInput, LogUncheckedCreateInput>
    /**
     * In case the Log was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LogUpdateInput, LogUncheckedUpdateInput>
  }


  /**
   * Log delete
   */
  export type LogDeleteArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Filter which Log to delete.
     * 
    **/
    where: LogWhereUniqueInput
  }


  /**
   * Log deleteMany
   */
  export type LogDeleteManyArgs = {
    /**
     * Filter which Logs to delete
     * 
    **/
    where?: LogWhereInput
  }


  /**
   * Log: findUniqueOrThrow
   */
  export type LogFindUniqueOrThrowArgs = LogFindUniqueArgsBase
      

  /**
   * Log: findFirstOrThrow
   */
  export type LogFindFirstOrThrowArgs = LogFindFirstArgsBase
      

  /**
   * Log without action
   */
  export type LogArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
  }



  /**
   * Model CryptoSnapshot
   */


  export type AggregateCryptoSnapshot = {
    _count: CryptoSnapshotCountAggregateOutputType | null
    _avg: CryptoSnapshotAvgAggregateOutputType | null
    _sum: CryptoSnapshotSumAggregateOutputType | null
    _min: CryptoSnapshotMinAggregateOutputType | null
    _max: CryptoSnapshotMaxAggregateOutputType | null
  }

  export type CryptoSnapshotAvgAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type CryptoSnapshotSumAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type CryptoSnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CryptoSnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CryptoSnapshotCountAggregateOutputType = {
    id: number
    userId: number
    totalValue: number
    costBasis: number
    unrealisedGain: number
    realisedGain: number
    saleableValue: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type CryptoSnapshotAvgAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type CryptoSnapshotSumAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type CryptoSnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CryptoSnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CryptoSnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type CryptoSnapshotAggregateArgs = {
    /**
     * Filter which CryptoSnapshot to aggregate.
     * 
    **/
    where?: CryptoSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptoSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CryptoSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CryptoSnapshots
    **/
    _count?: true | CryptoSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CryptoSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CryptoSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CryptoSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CryptoSnapshotMaxAggregateInputType
  }

  export type GetCryptoSnapshotAggregateType<T extends CryptoSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateCryptoSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCryptoSnapshot[P]>
      : GetScalarType<T[P], AggregateCryptoSnapshot[P]>
  }




  export type CryptoSnapshotGroupByArgs = {
    where?: CryptoSnapshotWhereInput
    orderBy?: Enumerable<CryptoSnapshotOrderByWithAggregationInput>
    by: Array<CryptoSnapshotScalarFieldEnum>
    having?: CryptoSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CryptoSnapshotCountAggregateInputType | true
    _avg?: CryptoSnapshotAvgAggregateInputType
    _sum?: CryptoSnapshotSumAggregateInputType
    _min?: CryptoSnapshotMinAggregateInputType
    _max?: CryptoSnapshotMaxAggregateInputType
  }


  export type CryptoSnapshotGroupByOutputType = {
    id: string
    userId: string
    totalValue: Decimal
    costBasis: Decimal
    unrealisedGain: Decimal
    realisedGain: Decimal
    saleableValue: Decimal
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: CryptoSnapshotCountAggregateOutputType | null
    _avg: CryptoSnapshotAvgAggregateOutputType | null
    _sum: CryptoSnapshotSumAggregateOutputType | null
    _min: CryptoSnapshotMinAggregateOutputType | null
    _max: CryptoSnapshotMaxAggregateOutputType | null
  }

  type GetCryptoSnapshotGroupByPayload<T extends CryptoSnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CryptoSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CryptoSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CryptoSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], CryptoSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type CryptoSnapshotSelect = {
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    costBasis?: boolean
    unrealisedGain?: boolean
    realisedGain?: boolean
    saleableValue?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type CryptoSnapshotInclude = {
    user?: boolean | UserArgs
  }

  export type CryptoSnapshotGetPayload<
    S extends boolean | null | undefined | CryptoSnapshotArgs,
    U = keyof S
      > = S extends true
        ? CryptoSnapshot
    : S extends undefined
    ? never
    : S extends CryptoSnapshotArgs | CryptoSnapshotFindManyArgs
    ?'include' extends U
    ? CryptoSnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof CryptoSnapshot ? CryptoSnapshot[P] : never
  } 
    : CryptoSnapshot
  : CryptoSnapshot


  type CryptoSnapshotCountArgs = Merge<
    Omit<CryptoSnapshotFindManyArgs, 'select' | 'include'> & {
      select?: CryptoSnapshotCountAggregateInputType | true
    }
  >

  export interface CryptoSnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CryptoSnapshot that matches the filter.
     * @param {CryptoSnapshotFindUniqueArgs} args - Arguments to find a CryptoSnapshot
     * @example
     * // Get one CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CryptoSnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CryptoSnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CryptoSnapshot'> extends True ? CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot | null >, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T> | null >>

    /**
     * Find the first CryptoSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotFindFirstArgs} args - Arguments to find a CryptoSnapshot
     * @example
     * // Get one CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CryptoSnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CryptoSnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CryptoSnapshot'> extends True ? CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot | null >, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T> | null >>

    /**
     * Find zero or more CryptoSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CryptoSnapshots
     * const cryptoSnapshots = await prisma.cryptoSnapshot.findMany()
     * 
     * // Get first 10 CryptoSnapshots
     * const cryptoSnapshots = await prisma.cryptoSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cryptoSnapshotWithIdOnly = await prisma.cryptoSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CryptoSnapshotFindManyArgs>(
      args?: SelectSubset<T, CryptoSnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CryptoSnapshot>>, PrismaPromise<Array<CryptoSnapshotGetPayload<T>>>>

    /**
     * Create a CryptoSnapshot.
     * @param {CryptoSnapshotCreateArgs} args - Arguments to create a CryptoSnapshot.
     * @example
     * // Create one CryptoSnapshot
     * const CryptoSnapshot = await prisma.cryptoSnapshot.create({
     *   data: {
     *     // ... data to create a CryptoSnapshot
     *   }
     * })
     * 
    **/
    create<T extends CryptoSnapshotCreateArgs>(
      args: SelectSubset<T, CryptoSnapshotCreateArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Create many CryptoSnapshots.
     *     @param {CryptoSnapshotCreateManyArgs} args - Arguments to create many CryptoSnapshots.
     *     @example
     *     // Create many CryptoSnapshots
     *     const cryptoSnapshot = await prisma.cryptoSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CryptoSnapshotCreateManyArgs>(
      args?: SelectSubset<T, CryptoSnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CryptoSnapshot.
     * @param {CryptoSnapshotDeleteArgs} args - Arguments to delete one CryptoSnapshot.
     * @example
     * // Delete one CryptoSnapshot
     * const CryptoSnapshot = await prisma.cryptoSnapshot.delete({
     *   where: {
     *     // ... filter to delete one CryptoSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends CryptoSnapshotDeleteArgs>(
      args: SelectSubset<T, CryptoSnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Update one CryptoSnapshot.
     * @param {CryptoSnapshotUpdateArgs} args - Arguments to update one CryptoSnapshot.
     * @example
     * // Update one CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CryptoSnapshotUpdateArgs>(
      args: SelectSubset<T, CryptoSnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Delete zero or more CryptoSnapshots.
     * @param {CryptoSnapshotDeleteManyArgs} args - Arguments to filter CryptoSnapshots to delete.
     * @example
     * // Delete a few CryptoSnapshots
     * const { count } = await prisma.cryptoSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CryptoSnapshotDeleteManyArgs>(
      args?: SelectSubset<T, CryptoSnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CryptoSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CryptoSnapshots
     * const cryptoSnapshot = await prisma.cryptoSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CryptoSnapshotUpdateManyArgs>(
      args: SelectSubset<T, CryptoSnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CryptoSnapshot.
     * @param {CryptoSnapshotUpsertArgs} args - Arguments to update or create a CryptoSnapshot.
     * @example
     * // Update or create a CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.upsert({
     *   create: {
     *     // ... data to create a CryptoSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CryptoSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends CryptoSnapshotUpsertArgs>(
      args: SelectSubset<T, CryptoSnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Find one CryptoSnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CryptoSnapshotFindUniqueOrThrowArgs} args - Arguments to find a CryptoSnapshot
     * @example
     * // Get one CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CryptoSnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CryptoSnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Find the first CryptoSnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotFindFirstOrThrowArgs} args - Arguments to find a CryptoSnapshot
     * @example
     * // Get one CryptoSnapshot
     * const cryptoSnapshot = await prisma.cryptoSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CryptoSnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CryptoSnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CryptoSnapshotClient<CryptoSnapshot>, Prisma__CryptoSnapshotClient<CryptoSnapshotGetPayload<T>>>

    /**
     * Count the number of CryptoSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotCountArgs} args - Arguments to filter CryptoSnapshots to count.
     * @example
     * // Count the number of CryptoSnapshots
     * const count = await prisma.cryptoSnapshot.count({
     *   where: {
     *     // ... the filter for the CryptoSnapshots we want to count
     *   }
     * })
    **/
    count<T extends CryptoSnapshotCountArgs>(
      args?: Subset<T, CryptoSnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CryptoSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CryptoSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CryptoSnapshotAggregateArgs>(args: Subset<T, CryptoSnapshotAggregateArgs>): PrismaPromise<GetCryptoSnapshotAggregateType<T>>

    /**
     * Group by CryptoSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CryptoSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CryptoSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: CryptoSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CryptoSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCryptoSnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CryptoSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CryptoSnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CryptoSnapshot base type for findUnique actions
   */
  export type CryptoSnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * Filter, which CryptoSnapshot to fetch.
     * 
    **/
    where: CryptoSnapshotWhereUniqueInput
  }

  /**
   * CryptoSnapshot: findUnique
   */
  export interface CryptoSnapshotFindUniqueArgs extends CryptoSnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CryptoSnapshot base type for findFirst actions
   */
  export type CryptoSnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * Filter, which CryptoSnapshot to fetch.
     * 
    **/
    where?: CryptoSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptoSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CryptoSnapshots.
     * 
    **/
    cursor?: CryptoSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CryptoSnapshots.
     * 
    **/
    distinct?: Enumerable<CryptoSnapshotScalarFieldEnum>
  }

  /**
   * CryptoSnapshot: findFirst
   */
  export interface CryptoSnapshotFindFirstArgs extends CryptoSnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CryptoSnapshot findMany
   */
  export type CryptoSnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * Filter, which CryptoSnapshots to fetch.
     * 
    **/
    where?: CryptoSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptoSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CryptoSnapshots.
     * 
    **/
    cursor?: CryptoSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoSnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CryptoSnapshotScalarFieldEnum>
  }


  /**
   * CryptoSnapshot create
   */
  export type CryptoSnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * The data needed to create a CryptoSnapshot.
     * 
    **/
    data: XOR<CryptoSnapshotCreateInput, CryptoSnapshotUncheckedCreateInput>
  }


  /**
   * CryptoSnapshot createMany
   */
  export type CryptoSnapshotCreateManyArgs = {
    /**
     * The data used to create many CryptoSnapshots.
     * 
    **/
    data: Enumerable<CryptoSnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CryptoSnapshot update
   */
  export type CryptoSnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * The data needed to update a CryptoSnapshot.
     * 
    **/
    data: XOR<CryptoSnapshotUpdateInput, CryptoSnapshotUncheckedUpdateInput>
    /**
     * Choose, which CryptoSnapshot to update.
     * 
    **/
    where: CryptoSnapshotWhereUniqueInput
  }


  /**
   * CryptoSnapshot updateMany
   */
  export type CryptoSnapshotUpdateManyArgs = {
    /**
     * The data used to update CryptoSnapshots.
     * 
    **/
    data: XOR<CryptoSnapshotUpdateManyMutationInput, CryptoSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which CryptoSnapshots to update
     * 
    **/
    where?: CryptoSnapshotWhereInput
  }


  /**
   * CryptoSnapshot upsert
   */
  export type CryptoSnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * The filter to search for the CryptoSnapshot to update in case it exists.
     * 
    **/
    where: CryptoSnapshotWhereUniqueInput
    /**
     * In case the CryptoSnapshot found by the `where` argument doesn't exist, create a new CryptoSnapshot with this data.
     * 
    **/
    create: XOR<CryptoSnapshotCreateInput, CryptoSnapshotUncheckedCreateInput>
    /**
     * In case the CryptoSnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CryptoSnapshotUpdateInput, CryptoSnapshotUncheckedUpdateInput>
  }


  /**
   * CryptoSnapshot delete
   */
  export type CryptoSnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
    /**
     * Filter which CryptoSnapshot to delete.
     * 
    **/
    where: CryptoSnapshotWhereUniqueInput
  }


  /**
   * CryptoSnapshot deleteMany
   */
  export type CryptoSnapshotDeleteManyArgs = {
    /**
     * Filter which CryptoSnapshots to delete
     * 
    **/
    where?: CryptoSnapshotWhereInput
  }


  /**
   * CryptoSnapshot: findUniqueOrThrow
   */
  export type CryptoSnapshotFindUniqueOrThrowArgs = CryptoSnapshotFindUniqueArgsBase
      

  /**
   * CryptoSnapshot: findFirstOrThrow
   */
  export type CryptoSnapshotFindFirstOrThrowArgs = CryptoSnapshotFindFirstArgsBase
      

  /**
   * CryptoSnapshot without action
   */
  export type CryptoSnapshotArgs = {
    /**
     * Select specific fields to fetch from the CryptoSnapshot
     * 
    **/
    select?: CryptoSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptoSnapshotInclude | null
  }



  /**
   * Model CashSnapshot
   */


  export type AggregateCashSnapshot = {
    _count: CashSnapshotCountAggregateOutputType | null
    _avg: CashSnapshotAvgAggregateOutputType | null
    _sum: CashSnapshotSumAggregateOutputType | null
    _min: CashSnapshotMinAggregateOutputType | null
    _max: CashSnapshotMaxAggregateOutputType | null
  }

  export type CashSnapshotAvgAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type CashSnapshotSumAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type CashSnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CashSnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CashSnapshotCountAggregateOutputType = {
    id: number
    userId: number
    totalValue: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type CashSnapshotAvgAggregateInputType = {
    totalValue?: true
  }

  export type CashSnapshotSumAggregateInputType = {
    totalValue?: true
  }

  export type CashSnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CashSnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CashSnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type CashSnapshotAggregateArgs = {
    /**
     * Filter which CashSnapshot to aggregate.
     * 
    **/
    where?: CashSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CashSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CashSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CashSnapshots
    **/
    _count?: true | CashSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashSnapshotMaxAggregateInputType
  }

  export type GetCashSnapshotAggregateType<T extends CashSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateCashSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashSnapshot[P]>
      : GetScalarType<T[P], AggregateCashSnapshot[P]>
  }




  export type CashSnapshotGroupByArgs = {
    where?: CashSnapshotWhereInput
    orderBy?: Enumerable<CashSnapshotOrderByWithAggregationInput>
    by: Array<CashSnapshotScalarFieldEnum>
    having?: CashSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashSnapshotCountAggregateInputType | true
    _avg?: CashSnapshotAvgAggregateInputType
    _sum?: CashSnapshotSumAggregateInputType
    _min?: CashSnapshotMinAggregateInputType
    _max?: CashSnapshotMaxAggregateInputType
  }


  export type CashSnapshotGroupByOutputType = {
    id: string
    userId: string
    totalValue: Decimal
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: CashSnapshotCountAggregateOutputType | null
    _avg: CashSnapshotAvgAggregateOutputType | null
    _sum: CashSnapshotSumAggregateOutputType | null
    _min: CashSnapshotMinAggregateOutputType | null
    _max: CashSnapshotMaxAggregateOutputType | null
  }

  type GetCashSnapshotGroupByPayload<T extends CashSnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CashSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], CashSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type CashSnapshotSelect = {
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type CashSnapshotInclude = {
    user?: boolean | UserArgs
  }

  export type CashSnapshotGetPayload<
    S extends boolean | null | undefined | CashSnapshotArgs,
    U = keyof S
      > = S extends true
        ? CashSnapshot
    : S extends undefined
    ? never
    : S extends CashSnapshotArgs | CashSnapshotFindManyArgs
    ?'include' extends U
    ? CashSnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof CashSnapshot ? CashSnapshot[P] : never
  } 
    : CashSnapshot
  : CashSnapshot


  type CashSnapshotCountArgs = Merge<
    Omit<CashSnapshotFindManyArgs, 'select' | 'include'> & {
      select?: CashSnapshotCountAggregateInputType | true
    }
  >

  export interface CashSnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CashSnapshot that matches the filter.
     * @param {CashSnapshotFindUniqueArgs} args - Arguments to find a CashSnapshot
     * @example
     * // Get one CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CashSnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CashSnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CashSnapshot'> extends True ? CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot | null >, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T> | null >>

    /**
     * Find the first CashSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotFindFirstArgs} args - Arguments to find a CashSnapshot
     * @example
     * // Get one CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CashSnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CashSnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CashSnapshot'> extends True ? CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot | null >, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T> | null >>

    /**
     * Find zero or more CashSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashSnapshots
     * const cashSnapshots = await prisma.cashSnapshot.findMany()
     * 
     * // Get first 10 CashSnapshots
     * const cashSnapshots = await prisma.cashSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cashSnapshotWithIdOnly = await prisma.cashSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CashSnapshotFindManyArgs>(
      args?: SelectSubset<T, CashSnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CashSnapshot>>, PrismaPromise<Array<CashSnapshotGetPayload<T>>>>

    /**
     * Create a CashSnapshot.
     * @param {CashSnapshotCreateArgs} args - Arguments to create a CashSnapshot.
     * @example
     * // Create one CashSnapshot
     * const CashSnapshot = await prisma.cashSnapshot.create({
     *   data: {
     *     // ... data to create a CashSnapshot
     *   }
     * })
     * 
    **/
    create<T extends CashSnapshotCreateArgs>(
      args: SelectSubset<T, CashSnapshotCreateArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Create many CashSnapshots.
     *     @param {CashSnapshotCreateManyArgs} args - Arguments to create many CashSnapshots.
     *     @example
     *     // Create many CashSnapshots
     *     const cashSnapshot = await prisma.cashSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CashSnapshotCreateManyArgs>(
      args?: SelectSubset<T, CashSnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CashSnapshot.
     * @param {CashSnapshotDeleteArgs} args - Arguments to delete one CashSnapshot.
     * @example
     * // Delete one CashSnapshot
     * const CashSnapshot = await prisma.cashSnapshot.delete({
     *   where: {
     *     // ... filter to delete one CashSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends CashSnapshotDeleteArgs>(
      args: SelectSubset<T, CashSnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Update one CashSnapshot.
     * @param {CashSnapshotUpdateArgs} args - Arguments to update one CashSnapshot.
     * @example
     * // Update one CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CashSnapshotUpdateArgs>(
      args: SelectSubset<T, CashSnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Delete zero or more CashSnapshots.
     * @param {CashSnapshotDeleteManyArgs} args - Arguments to filter CashSnapshots to delete.
     * @example
     * // Delete a few CashSnapshots
     * const { count } = await prisma.cashSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CashSnapshotDeleteManyArgs>(
      args?: SelectSubset<T, CashSnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashSnapshots
     * const cashSnapshot = await prisma.cashSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CashSnapshotUpdateManyArgs>(
      args: SelectSubset<T, CashSnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CashSnapshot.
     * @param {CashSnapshotUpsertArgs} args - Arguments to update or create a CashSnapshot.
     * @example
     * // Update or create a CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.upsert({
     *   create: {
     *     // ... data to create a CashSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends CashSnapshotUpsertArgs>(
      args: SelectSubset<T, CashSnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Find one CashSnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CashSnapshotFindUniqueOrThrowArgs} args - Arguments to find a CashSnapshot
     * @example
     * // Get one CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CashSnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CashSnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Find the first CashSnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotFindFirstOrThrowArgs} args - Arguments to find a CashSnapshot
     * @example
     * // Get one CashSnapshot
     * const cashSnapshot = await prisma.cashSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CashSnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CashSnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CashSnapshotClient<CashSnapshot>, Prisma__CashSnapshotClient<CashSnapshotGetPayload<T>>>

    /**
     * Count the number of CashSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotCountArgs} args - Arguments to filter CashSnapshots to count.
     * @example
     * // Count the number of CashSnapshots
     * const count = await prisma.cashSnapshot.count({
     *   where: {
     *     // ... the filter for the CashSnapshots we want to count
     *   }
     * })
    **/
    count<T extends CashSnapshotCountArgs>(
      args?: Subset<T, CashSnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CashSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashSnapshotAggregateArgs>(args: Subset<T, CashSnapshotAggregateArgs>): PrismaPromise<GetCashSnapshotAggregateType<T>>

    /**
     * Group by CashSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CashSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: CashSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CashSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashSnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CashSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CashSnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CashSnapshot base type for findUnique actions
   */
  export type CashSnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * Filter, which CashSnapshot to fetch.
     * 
    **/
    where: CashSnapshotWhereUniqueInput
  }

  /**
   * CashSnapshot: findUnique
   */
  export interface CashSnapshotFindUniqueArgs extends CashSnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CashSnapshot base type for findFirst actions
   */
  export type CashSnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * Filter, which CashSnapshot to fetch.
     * 
    **/
    where?: CashSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CashSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashSnapshots.
     * 
    **/
    cursor?: CashSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashSnapshots.
     * 
    **/
    distinct?: Enumerable<CashSnapshotScalarFieldEnum>
  }

  /**
   * CashSnapshot: findFirst
   */
  export interface CashSnapshotFindFirstArgs extends CashSnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CashSnapshot findMany
   */
  export type CashSnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * Filter, which CashSnapshots to fetch.
     * 
    **/
    where?: CashSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<CashSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CashSnapshots.
     * 
    **/
    cursor?: CashSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashSnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CashSnapshotScalarFieldEnum>
  }


  /**
   * CashSnapshot create
   */
  export type CashSnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * The data needed to create a CashSnapshot.
     * 
    **/
    data: XOR<CashSnapshotCreateInput, CashSnapshotUncheckedCreateInput>
  }


  /**
   * CashSnapshot createMany
   */
  export type CashSnapshotCreateManyArgs = {
    /**
     * The data used to create many CashSnapshots.
     * 
    **/
    data: Enumerable<CashSnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CashSnapshot update
   */
  export type CashSnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * The data needed to update a CashSnapshot.
     * 
    **/
    data: XOR<CashSnapshotUpdateInput, CashSnapshotUncheckedUpdateInput>
    /**
     * Choose, which CashSnapshot to update.
     * 
    **/
    where: CashSnapshotWhereUniqueInput
  }


  /**
   * CashSnapshot updateMany
   */
  export type CashSnapshotUpdateManyArgs = {
    /**
     * The data used to update CashSnapshots.
     * 
    **/
    data: XOR<CashSnapshotUpdateManyMutationInput, CashSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which CashSnapshots to update
     * 
    **/
    where?: CashSnapshotWhereInput
  }


  /**
   * CashSnapshot upsert
   */
  export type CashSnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * The filter to search for the CashSnapshot to update in case it exists.
     * 
    **/
    where: CashSnapshotWhereUniqueInput
    /**
     * In case the CashSnapshot found by the `where` argument doesn't exist, create a new CashSnapshot with this data.
     * 
    **/
    create: XOR<CashSnapshotCreateInput, CashSnapshotUncheckedCreateInput>
    /**
     * In case the CashSnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CashSnapshotUpdateInput, CashSnapshotUncheckedUpdateInput>
  }


  /**
   * CashSnapshot delete
   */
  export type CashSnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
    /**
     * Filter which CashSnapshot to delete.
     * 
    **/
    where: CashSnapshotWhereUniqueInput
  }


  /**
   * CashSnapshot deleteMany
   */
  export type CashSnapshotDeleteManyArgs = {
    /**
     * Filter which CashSnapshots to delete
     * 
    **/
    where?: CashSnapshotWhereInput
  }


  /**
   * CashSnapshot: findUniqueOrThrow
   */
  export type CashSnapshotFindUniqueOrThrowArgs = CashSnapshotFindUniqueArgsBase
      

  /**
   * CashSnapshot: findFirstOrThrow
   */
  export type CashSnapshotFindFirstOrThrowArgs = CashSnapshotFindFirstArgsBase
      

  /**
   * CashSnapshot without action
   */
  export type CashSnapshotArgs = {
    /**
     * Select specific fields to fetch from the CashSnapshot
     * 
    **/
    select?: CashSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CashSnapshotInclude | null
  }



  /**
   * Model PropertySnapshot
   */


  export type AggregatePropertySnapshot = {
    _count: PropertySnapshotCountAggregateOutputType | null
    _avg: PropertySnapshotAvgAggregateOutputType | null
    _sum: PropertySnapshotSumAggregateOutputType | null
    _min: PropertySnapshotMinAggregateOutputType | null
    _max: PropertySnapshotMaxAggregateOutputType | null
  }

  export type PropertySnapshotAvgAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type PropertySnapshotSumAggregateOutputType = {
    totalValue: Decimal | null
  }

  export type PropertySnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type PropertySnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type PropertySnapshotCountAggregateOutputType = {
    id: number
    userId: number
    totalValue: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type PropertySnapshotAvgAggregateInputType = {
    totalValue?: true
  }

  export type PropertySnapshotSumAggregateInputType = {
    totalValue?: true
  }

  export type PropertySnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type PropertySnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type PropertySnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type PropertySnapshotAggregateArgs = {
    /**
     * Filter which PropertySnapshot to aggregate.
     * 
    **/
    where?: PropertySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PropertySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PropertySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertySnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertySnapshots
    **/
    _count?: true | PropertySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertySnapshotMaxAggregateInputType
  }

  export type GetPropertySnapshotAggregateType<T extends PropertySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertySnapshot[P]>
      : GetScalarType<T[P], AggregatePropertySnapshot[P]>
  }




  export type PropertySnapshotGroupByArgs = {
    where?: PropertySnapshotWhereInput
    orderBy?: Enumerable<PropertySnapshotOrderByWithAggregationInput>
    by: Array<PropertySnapshotScalarFieldEnum>
    having?: PropertySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertySnapshotCountAggregateInputType | true
    _avg?: PropertySnapshotAvgAggregateInputType
    _sum?: PropertySnapshotSumAggregateInputType
    _min?: PropertySnapshotMinAggregateInputType
    _max?: PropertySnapshotMaxAggregateInputType
  }


  export type PropertySnapshotGroupByOutputType = {
    id: string
    userId: string
    totalValue: Decimal
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: PropertySnapshotCountAggregateOutputType | null
    _avg: PropertySnapshotAvgAggregateOutputType | null
    _sum: PropertySnapshotSumAggregateOutputType | null
    _min: PropertySnapshotMinAggregateOutputType | null
    _max: PropertySnapshotMaxAggregateOutputType | null
  }

  type GetPropertySnapshotGroupByPayload<T extends PropertySnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PropertySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PropertySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PropertySnapshotSelect = {
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type PropertySnapshotInclude = {
    user?: boolean | UserArgs
  }

  export type PropertySnapshotGetPayload<
    S extends boolean | null | undefined | PropertySnapshotArgs,
    U = keyof S
      > = S extends true
        ? PropertySnapshot
    : S extends undefined
    ? never
    : S extends PropertySnapshotArgs | PropertySnapshotFindManyArgs
    ?'include' extends U
    ? PropertySnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof PropertySnapshot ? PropertySnapshot[P] : never
  } 
    : PropertySnapshot
  : PropertySnapshot


  type PropertySnapshotCountArgs = Merge<
    Omit<PropertySnapshotFindManyArgs, 'select' | 'include'> & {
      select?: PropertySnapshotCountAggregateInputType | true
    }
  >

  export interface PropertySnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PropertySnapshot that matches the filter.
     * @param {PropertySnapshotFindUniqueArgs} args - Arguments to find a PropertySnapshot
     * @example
     * // Get one PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PropertySnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PropertySnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PropertySnapshot'> extends True ? CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot | null >, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T> | null >>

    /**
     * Find the first PropertySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotFindFirstArgs} args - Arguments to find a PropertySnapshot
     * @example
     * // Get one PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PropertySnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PropertySnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PropertySnapshot'> extends True ? CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot | null >, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T> | null >>

    /**
     * Find zero or more PropertySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertySnapshots
     * const propertySnapshots = await prisma.propertySnapshot.findMany()
     * 
     * // Get first 10 PropertySnapshots
     * const propertySnapshots = await prisma.propertySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertySnapshotWithIdOnly = await prisma.propertySnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PropertySnapshotFindManyArgs>(
      args?: SelectSubset<T, PropertySnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PropertySnapshot>>, PrismaPromise<Array<PropertySnapshotGetPayload<T>>>>

    /**
     * Create a PropertySnapshot.
     * @param {PropertySnapshotCreateArgs} args - Arguments to create a PropertySnapshot.
     * @example
     * // Create one PropertySnapshot
     * const PropertySnapshot = await prisma.propertySnapshot.create({
     *   data: {
     *     // ... data to create a PropertySnapshot
     *   }
     * })
     * 
    **/
    create<T extends PropertySnapshotCreateArgs>(
      args: SelectSubset<T, PropertySnapshotCreateArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Create many PropertySnapshots.
     *     @param {PropertySnapshotCreateManyArgs} args - Arguments to create many PropertySnapshots.
     *     @example
     *     // Create many PropertySnapshots
     *     const propertySnapshot = await prisma.propertySnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PropertySnapshotCreateManyArgs>(
      args?: SelectSubset<T, PropertySnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PropertySnapshot.
     * @param {PropertySnapshotDeleteArgs} args - Arguments to delete one PropertySnapshot.
     * @example
     * // Delete one PropertySnapshot
     * const PropertySnapshot = await prisma.propertySnapshot.delete({
     *   where: {
     *     // ... filter to delete one PropertySnapshot
     *   }
     * })
     * 
    **/
    delete<T extends PropertySnapshotDeleteArgs>(
      args: SelectSubset<T, PropertySnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Update one PropertySnapshot.
     * @param {PropertySnapshotUpdateArgs} args - Arguments to update one PropertySnapshot.
     * @example
     * // Update one PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PropertySnapshotUpdateArgs>(
      args: SelectSubset<T, PropertySnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Delete zero or more PropertySnapshots.
     * @param {PropertySnapshotDeleteManyArgs} args - Arguments to filter PropertySnapshots to delete.
     * @example
     * // Delete a few PropertySnapshots
     * const { count } = await prisma.propertySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PropertySnapshotDeleteManyArgs>(
      args?: SelectSubset<T, PropertySnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertySnapshots
     * const propertySnapshot = await prisma.propertySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PropertySnapshotUpdateManyArgs>(
      args: SelectSubset<T, PropertySnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PropertySnapshot.
     * @param {PropertySnapshotUpsertArgs} args - Arguments to update or create a PropertySnapshot.
     * @example
     * // Update or create a PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.upsert({
     *   create: {
     *     // ... data to create a PropertySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertySnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends PropertySnapshotUpsertArgs>(
      args: SelectSubset<T, PropertySnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Find one PropertySnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PropertySnapshotFindUniqueOrThrowArgs} args - Arguments to find a PropertySnapshot
     * @example
     * // Get one PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PropertySnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PropertySnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Find the first PropertySnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotFindFirstOrThrowArgs} args - Arguments to find a PropertySnapshot
     * @example
     * // Get one PropertySnapshot
     * const propertySnapshot = await prisma.propertySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PropertySnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PropertySnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PropertySnapshotClient<PropertySnapshot>, Prisma__PropertySnapshotClient<PropertySnapshotGetPayload<T>>>

    /**
     * Count the number of PropertySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotCountArgs} args - Arguments to filter PropertySnapshots to count.
     * @example
     * // Count the number of PropertySnapshots
     * const count = await prisma.propertySnapshot.count({
     *   where: {
     *     // ... the filter for the PropertySnapshots we want to count
     *   }
     * })
    **/
    count<T extends PropertySnapshotCountArgs>(
      args?: Subset<T, PropertySnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertySnapshotAggregateArgs>(args: Subset<T, PropertySnapshotAggregateArgs>): PrismaPromise<GetPropertySnapshotAggregateType<T>>

    /**
     * Group by PropertySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertySnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PropertySnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertySnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PropertySnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PropertySnapshot base type for findUnique actions
   */
  export type PropertySnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * Filter, which PropertySnapshot to fetch.
     * 
    **/
    where: PropertySnapshotWhereUniqueInput
  }

  /**
   * PropertySnapshot: findUnique
   */
  export interface PropertySnapshotFindUniqueArgs extends PropertySnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PropertySnapshot base type for findFirst actions
   */
  export type PropertySnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * Filter, which PropertySnapshot to fetch.
     * 
    **/
    where?: PropertySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PropertySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertySnapshots.
     * 
    **/
    cursor?: PropertySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertySnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertySnapshots.
     * 
    **/
    distinct?: Enumerable<PropertySnapshotScalarFieldEnum>
  }

  /**
   * PropertySnapshot: findFirst
   */
  export interface PropertySnapshotFindFirstArgs extends PropertySnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PropertySnapshot findMany
   */
  export type PropertySnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * Filter, which PropertySnapshots to fetch.
     * 
    **/
    where?: PropertySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PropertySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertySnapshots.
     * 
    **/
    cursor?: PropertySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertySnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PropertySnapshotScalarFieldEnum>
  }


  /**
   * PropertySnapshot create
   */
  export type PropertySnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * The data needed to create a PropertySnapshot.
     * 
    **/
    data: XOR<PropertySnapshotCreateInput, PropertySnapshotUncheckedCreateInput>
  }


  /**
   * PropertySnapshot createMany
   */
  export type PropertySnapshotCreateManyArgs = {
    /**
     * The data used to create many PropertySnapshots.
     * 
    **/
    data: Enumerable<PropertySnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PropertySnapshot update
   */
  export type PropertySnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * The data needed to update a PropertySnapshot.
     * 
    **/
    data: XOR<PropertySnapshotUpdateInput, PropertySnapshotUncheckedUpdateInput>
    /**
     * Choose, which PropertySnapshot to update.
     * 
    **/
    where: PropertySnapshotWhereUniqueInput
  }


  /**
   * PropertySnapshot updateMany
   */
  export type PropertySnapshotUpdateManyArgs = {
    /**
     * The data used to update PropertySnapshots.
     * 
    **/
    data: XOR<PropertySnapshotUpdateManyMutationInput, PropertySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PropertySnapshots to update
     * 
    **/
    where?: PropertySnapshotWhereInput
  }


  /**
   * PropertySnapshot upsert
   */
  export type PropertySnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * The filter to search for the PropertySnapshot to update in case it exists.
     * 
    **/
    where: PropertySnapshotWhereUniqueInput
    /**
     * In case the PropertySnapshot found by the `where` argument doesn't exist, create a new PropertySnapshot with this data.
     * 
    **/
    create: XOR<PropertySnapshotCreateInput, PropertySnapshotUncheckedCreateInput>
    /**
     * In case the PropertySnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PropertySnapshotUpdateInput, PropertySnapshotUncheckedUpdateInput>
  }


  /**
   * PropertySnapshot delete
   */
  export type PropertySnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
    /**
     * Filter which PropertySnapshot to delete.
     * 
    **/
    where: PropertySnapshotWhereUniqueInput
  }


  /**
   * PropertySnapshot deleteMany
   */
  export type PropertySnapshotDeleteManyArgs = {
    /**
     * Filter which PropertySnapshots to delete
     * 
    **/
    where?: PropertySnapshotWhereInput
  }


  /**
   * PropertySnapshot: findUniqueOrThrow
   */
  export type PropertySnapshotFindUniqueOrThrowArgs = PropertySnapshotFindUniqueArgsBase
      

  /**
   * PropertySnapshot: findFirstOrThrow
   */
  export type PropertySnapshotFindFirstOrThrowArgs = PropertySnapshotFindFirstArgsBase
      

  /**
   * PropertySnapshot without action
   */
  export type PropertySnapshotArgs = {
    /**
     * Select specific fields to fetch from the PropertySnapshot
     * 
    **/
    select?: PropertySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PropertySnapshotInclude | null
  }



  /**
   * Model SecuritySnapshot
   */


  export type AggregateSecuritySnapshot = {
    _count: SecuritySnapshotCountAggregateOutputType | null
    _avg: SecuritySnapshotAvgAggregateOutputType | null
    _sum: SecuritySnapshotSumAggregateOutputType | null
    _min: SecuritySnapshotMinAggregateOutputType | null
    _max: SecuritySnapshotMaxAggregateOutputType | null
  }

  export type SecuritySnapshotAvgAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type SecuritySnapshotSumAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type SecuritySnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type SecuritySnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type SecuritySnapshotCountAggregateOutputType = {
    id: number
    userId: number
    totalValue: number
    costBasis: number
    unrealisedGain: number
    realisedGain: number
    saleableValue: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type SecuritySnapshotAvgAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type SecuritySnapshotSumAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type SecuritySnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type SecuritySnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type SecuritySnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type SecuritySnapshotAggregateArgs = {
    /**
     * Filter which SecuritySnapshot to aggregate.
     * 
    **/
    where?: SecuritySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecuritySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<SecuritySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SecuritySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecuritySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecuritySnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecuritySnapshots
    **/
    _count?: true | SecuritySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SecuritySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SecuritySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecuritySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecuritySnapshotMaxAggregateInputType
  }

  export type GetSecuritySnapshotAggregateType<T extends SecuritySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateSecuritySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecuritySnapshot[P]>
      : GetScalarType<T[P], AggregateSecuritySnapshot[P]>
  }




  export type SecuritySnapshotGroupByArgs = {
    where?: SecuritySnapshotWhereInput
    orderBy?: Enumerable<SecuritySnapshotOrderByWithAggregationInput>
    by: Array<SecuritySnapshotScalarFieldEnum>
    having?: SecuritySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecuritySnapshotCountAggregateInputType | true
    _avg?: SecuritySnapshotAvgAggregateInputType
    _sum?: SecuritySnapshotSumAggregateInputType
    _min?: SecuritySnapshotMinAggregateInputType
    _max?: SecuritySnapshotMaxAggregateInputType
  }


  export type SecuritySnapshotGroupByOutputType = {
    id: string
    userId: string
    totalValue: Decimal
    costBasis: Decimal
    unrealisedGain: Decimal
    realisedGain: Decimal
    saleableValue: Decimal
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: SecuritySnapshotCountAggregateOutputType | null
    _avg: SecuritySnapshotAvgAggregateOutputType | null
    _sum: SecuritySnapshotSumAggregateOutputType | null
    _min: SecuritySnapshotMinAggregateOutputType | null
    _max: SecuritySnapshotMaxAggregateOutputType | null
  }

  type GetSecuritySnapshotGroupByPayload<T extends SecuritySnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SecuritySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecuritySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecuritySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], SecuritySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type SecuritySnapshotSelect = {
    id?: boolean
    userId?: boolean
    totalValue?: boolean
    costBasis?: boolean
    unrealisedGain?: boolean
    realisedGain?: boolean
    saleableValue?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type SecuritySnapshotInclude = {
    user?: boolean | UserArgs
  }

  export type SecuritySnapshotGetPayload<
    S extends boolean | null | undefined | SecuritySnapshotArgs,
    U = keyof S
      > = S extends true
        ? SecuritySnapshot
    : S extends undefined
    ? never
    : S extends SecuritySnapshotArgs | SecuritySnapshotFindManyArgs
    ?'include' extends U
    ? SecuritySnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof SecuritySnapshot ? SecuritySnapshot[P] : never
  } 
    : SecuritySnapshot
  : SecuritySnapshot


  type SecuritySnapshotCountArgs = Merge<
    Omit<SecuritySnapshotFindManyArgs, 'select' | 'include'> & {
      select?: SecuritySnapshotCountAggregateInputType | true
    }
  >

  export interface SecuritySnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one SecuritySnapshot that matches the filter.
     * @param {SecuritySnapshotFindUniqueArgs} args - Arguments to find a SecuritySnapshot
     * @example
     * // Get one SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SecuritySnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SecuritySnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SecuritySnapshot'> extends True ? CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>> : CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot | null >, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T> | null >>

    /**
     * Find the first SecuritySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotFindFirstArgs} args - Arguments to find a SecuritySnapshot
     * @example
     * // Get one SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SecuritySnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SecuritySnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SecuritySnapshot'> extends True ? CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>> : CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot | null >, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T> | null >>

    /**
     * Find zero or more SecuritySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecuritySnapshots
     * const securitySnapshots = await prisma.securitySnapshot.findMany()
     * 
     * // Get first 10 SecuritySnapshots
     * const securitySnapshots = await prisma.securitySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securitySnapshotWithIdOnly = await prisma.securitySnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SecuritySnapshotFindManyArgs>(
      args?: SelectSubset<T, SecuritySnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<SecuritySnapshot>>, PrismaPromise<Array<SecuritySnapshotGetPayload<T>>>>

    /**
     * Create a SecuritySnapshot.
     * @param {SecuritySnapshotCreateArgs} args - Arguments to create a SecuritySnapshot.
     * @example
     * // Create one SecuritySnapshot
     * const SecuritySnapshot = await prisma.securitySnapshot.create({
     *   data: {
     *     // ... data to create a SecuritySnapshot
     *   }
     * })
     * 
    **/
    create<T extends SecuritySnapshotCreateArgs>(
      args: SelectSubset<T, SecuritySnapshotCreateArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Create many SecuritySnapshots.
     *     @param {SecuritySnapshotCreateManyArgs} args - Arguments to create many SecuritySnapshots.
     *     @example
     *     // Create many SecuritySnapshots
     *     const securitySnapshot = await prisma.securitySnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SecuritySnapshotCreateManyArgs>(
      args?: SelectSubset<T, SecuritySnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a SecuritySnapshot.
     * @param {SecuritySnapshotDeleteArgs} args - Arguments to delete one SecuritySnapshot.
     * @example
     * // Delete one SecuritySnapshot
     * const SecuritySnapshot = await prisma.securitySnapshot.delete({
     *   where: {
     *     // ... filter to delete one SecuritySnapshot
     *   }
     * })
     * 
    **/
    delete<T extends SecuritySnapshotDeleteArgs>(
      args: SelectSubset<T, SecuritySnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Update one SecuritySnapshot.
     * @param {SecuritySnapshotUpdateArgs} args - Arguments to update one SecuritySnapshot.
     * @example
     * // Update one SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SecuritySnapshotUpdateArgs>(
      args: SelectSubset<T, SecuritySnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Delete zero or more SecuritySnapshots.
     * @param {SecuritySnapshotDeleteManyArgs} args - Arguments to filter SecuritySnapshots to delete.
     * @example
     * // Delete a few SecuritySnapshots
     * const { count } = await prisma.securitySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SecuritySnapshotDeleteManyArgs>(
      args?: SelectSubset<T, SecuritySnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecuritySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecuritySnapshots
     * const securitySnapshot = await prisma.securitySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SecuritySnapshotUpdateManyArgs>(
      args: SelectSubset<T, SecuritySnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one SecuritySnapshot.
     * @param {SecuritySnapshotUpsertArgs} args - Arguments to update or create a SecuritySnapshot.
     * @example
     * // Update or create a SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.upsert({
     *   create: {
     *     // ... data to create a SecuritySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecuritySnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends SecuritySnapshotUpsertArgs>(
      args: SelectSubset<T, SecuritySnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Find one SecuritySnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SecuritySnapshotFindUniqueOrThrowArgs} args - Arguments to find a SecuritySnapshot
     * @example
     * // Get one SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SecuritySnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SecuritySnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Find the first SecuritySnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotFindFirstOrThrowArgs} args - Arguments to find a SecuritySnapshot
     * @example
     * // Get one SecuritySnapshot
     * const securitySnapshot = await prisma.securitySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SecuritySnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SecuritySnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SecuritySnapshotClient<SecuritySnapshot>, Prisma__SecuritySnapshotClient<SecuritySnapshotGetPayload<T>>>

    /**
     * Count the number of SecuritySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotCountArgs} args - Arguments to filter SecuritySnapshots to count.
     * @example
     * // Count the number of SecuritySnapshots
     * const count = await prisma.securitySnapshot.count({
     *   where: {
     *     // ... the filter for the SecuritySnapshots we want to count
     *   }
     * })
    **/
    count<T extends SecuritySnapshotCountArgs>(
      args?: Subset<T, SecuritySnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecuritySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecuritySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecuritySnapshotAggregateArgs>(args: Subset<T, SecuritySnapshotAggregateArgs>): PrismaPromise<GetSecuritySnapshotAggregateType<T>>

    /**
     * Group by SecuritySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecuritySnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecuritySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecuritySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: SecuritySnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecuritySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecuritySnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecuritySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SecuritySnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * SecuritySnapshot base type for findUnique actions
   */
  export type SecuritySnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * Filter, which SecuritySnapshot to fetch.
     * 
    **/
    where: SecuritySnapshotWhereUniqueInput
  }

  /**
   * SecuritySnapshot: findUnique
   */
  export interface SecuritySnapshotFindUniqueArgs extends SecuritySnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SecuritySnapshot base type for findFirst actions
   */
  export type SecuritySnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * Filter, which SecuritySnapshot to fetch.
     * 
    **/
    where?: SecuritySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecuritySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<SecuritySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecuritySnapshots.
     * 
    **/
    cursor?: SecuritySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecuritySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecuritySnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecuritySnapshots.
     * 
    **/
    distinct?: Enumerable<SecuritySnapshotScalarFieldEnum>
  }

  /**
   * SecuritySnapshot: findFirst
   */
  export interface SecuritySnapshotFindFirstArgs extends SecuritySnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SecuritySnapshot findMany
   */
  export type SecuritySnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * Filter, which SecuritySnapshots to fetch.
     * 
    **/
    where?: SecuritySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecuritySnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<SecuritySnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecuritySnapshots.
     * 
    **/
    cursor?: SecuritySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecuritySnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecuritySnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SecuritySnapshotScalarFieldEnum>
  }


  /**
   * SecuritySnapshot create
   */
  export type SecuritySnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * The data needed to create a SecuritySnapshot.
     * 
    **/
    data: XOR<SecuritySnapshotCreateInput, SecuritySnapshotUncheckedCreateInput>
  }


  /**
   * SecuritySnapshot createMany
   */
  export type SecuritySnapshotCreateManyArgs = {
    /**
     * The data used to create many SecuritySnapshots.
     * 
    **/
    data: Enumerable<SecuritySnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * SecuritySnapshot update
   */
  export type SecuritySnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * The data needed to update a SecuritySnapshot.
     * 
    **/
    data: XOR<SecuritySnapshotUpdateInput, SecuritySnapshotUncheckedUpdateInput>
    /**
     * Choose, which SecuritySnapshot to update.
     * 
    **/
    where: SecuritySnapshotWhereUniqueInput
  }


  /**
   * SecuritySnapshot updateMany
   */
  export type SecuritySnapshotUpdateManyArgs = {
    /**
     * The data used to update SecuritySnapshots.
     * 
    **/
    data: XOR<SecuritySnapshotUpdateManyMutationInput, SecuritySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SecuritySnapshots to update
     * 
    **/
    where?: SecuritySnapshotWhereInput
  }


  /**
   * SecuritySnapshot upsert
   */
  export type SecuritySnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * The filter to search for the SecuritySnapshot to update in case it exists.
     * 
    **/
    where: SecuritySnapshotWhereUniqueInput
    /**
     * In case the SecuritySnapshot found by the `where` argument doesn't exist, create a new SecuritySnapshot with this data.
     * 
    **/
    create: XOR<SecuritySnapshotCreateInput, SecuritySnapshotUncheckedCreateInput>
    /**
     * In case the SecuritySnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SecuritySnapshotUpdateInput, SecuritySnapshotUncheckedUpdateInput>
  }


  /**
   * SecuritySnapshot delete
   */
  export type SecuritySnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
    /**
     * Filter which SecuritySnapshot to delete.
     * 
    **/
    where: SecuritySnapshotWhereUniqueInput
  }


  /**
   * SecuritySnapshot deleteMany
   */
  export type SecuritySnapshotDeleteManyArgs = {
    /**
     * Filter which SecuritySnapshots to delete
     * 
    **/
    where?: SecuritySnapshotWhereInput
  }


  /**
   * SecuritySnapshot: findUniqueOrThrow
   */
  export type SecuritySnapshotFindUniqueOrThrowArgs = SecuritySnapshotFindUniqueArgsBase
      

  /**
   * SecuritySnapshot: findFirstOrThrow
   */
  export type SecuritySnapshotFindFirstOrThrowArgs = SecuritySnapshotFindFirstArgsBase
      

  /**
   * SecuritySnapshot without action
   */
  export type SecuritySnapshotArgs = {
    /**
     * Select specific fields to fetch from the SecuritySnapshot
     * 
    **/
    select?: SecuritySnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SecuritySnapshotInclude | null
  }



  /**
   * Model PortfolioSnapshot
   */


  export type AggregatePortfolioSnapshot = {
    _count: PortfolioSnapshotCountAggregateOutputType | null
    _avg: PortfolioSnapshotAvgAggregateOutputType | null
    _sum: PortfolioSnapshotSumAggregateOutputType | null
    _min: PortfolioSnapshotMinAggregateOutputType | null
    _max: PortfolioSnapshotMaxAggregateOutputType | null
  }

  export type PortfolioSnapshotAvgAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type PortfolioSnapshotSumAggregateOutputType = {
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
  }

  export type PortfolioSnapshotMinAggregateOutputType = {
    id: string | null
    currency: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type PortfolioSnapshotMaxAggregateOutputType = {
    id: string | null
    currency: string | null
    totalValue: Decimal | null
    costBasis: Decimal | null
    unrealisedGain: Decimal | null
    realisedGain: Decimal | null
    saleableValue: Decimal | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type PortfolioSnapshotCountAggregateOutputType = {
    id: number
    currency: number
    totalValue: number
    costBasis: number
    unrealisedGain: number
    realisedGain: number
    saleableValue: number
    userId: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type PortfolioSnapshotAvgAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type PortfolioSnapshotSumAggregateInputType = {
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
  }

  export type PortfolioSnapshotMinAggregateInputType = {
    id?: true
    currency?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type PortfolioSnapshotMaxAggregateInputType = {
    id?: true
    currency?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type PortfolioSnapshotCountAggregateInputType = {
    id?: true
    currency?: true
    totalValue?: true
    costBasis?: true
    unrealisedGain?: true
    realisedGain?: true
    saleableValue?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type PortfolioSnapshotAggregateArgs = {
    /**
     * Filter which PortfolioSnapshot to aggregate.
     * 
    **/
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PortfolioSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioSnapshots
    **/
    _count?: true | PortfolioSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioSnapshotMaxAggregateInputType
  }

  export type GetPortfolioSnapshotAggregateType<T extends PortfolioSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioSnapshot[P]>
      : GetScalarType<T[P], AggregatePortfolioSnapshot[P]>
  }




  export type PortfolioSnapshotGroupByArgs = {
    where?: PortfolioSnapshotWhereInput
    orderBy?: Enumerable<PortfolioSnapshotOrderByWithAggregationInput>
    by: Array<PortfolioSnapshotScalarFieldEnum>
    having?: PortfolioSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioSnapshotCountAggregateInputType | true
    _avg?: PortfolioSnapshotAvgAggregateInputType
    _sum?: PortfolioSnapshotSumAggregateInputType
    _min?: PortfolioSnapshotMinAggregateInputType
    _max?: PortfolioSnapshotMaxAggregateInputType
  }


  export type PortfolioSnapshotGroupByOutputType = {
    id: string
    currency: string
    totalValue: Decimal
    costBasis: Decimal
    unrealisedGain: Decimal
    realisedGain: Decimal
    saleableValue: Decimal
    userId: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: PortfolioSnapshotCountAggregateOutputType | null
    _avg: PortfolioSnapshotAvgAggregateOutputType | null
    _sum: PortfolioSnapshotSumAggregateOutputType | null
    _min: PortfolioSnapshotMinAggregateOutputType | null
    _max: PortfolioSnapshotMaxAggregateOutputType | null
  }

  type GetPortfolioSnapshotGroupByPayload<T extends PortfolioSnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PortfolioSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSnapshotSelect = {
    id?: boolean
    currency?: boolean
    totalValue?: boolean
    costBasis?: boolean
    unrealisedGain?: boolean
    realisedGain?: boolean
    saleableValue?: boolean
    userId?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type PortfolioSnapshotInclude = {
    user?: boolean | UserArgs
  }

  export type PortfolioSnapshotGetPayload<
    S extends boolean | null | undefined | PortfolioSnapshotArgs,
    U = keyof S
      > = S extends true
        ? PortfolioSnapshot
    : S extends undefined
    ? never
    : S extends PortfolioSnapshotArgs | PortfolioSnapshotFindManyArgs
    ?'include' extends U
    ? PortfolioSnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof PortfolioSnapshot ? PortfolioSnapshot[P] : never
  } 
    : PortfolioSnapshot
  : PortfolioSnapshot


  type PortfolioSnapshotCountArgs = Merge<
    Omit<PortfolioSnapshotFindManyArgs, 'select' | 'include'> & {
      select?: PortfolioSnapshotCountAggregateInputType | true
    }
  >

  export interface PortfolioSnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PortfolioSnapshot that matches the filter.
     * @param {PortfolioSnapshotFindUniqueArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PortfolioSnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PortfolioSnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PortfolioSnapshot'> extends True ? CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot | null >, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T> | null >>

    /**
     * Find the first PortfolioSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindFirstArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PortfolioSnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PortfolioSnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PortfolioSnapshot'> extends True ? CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot | null >, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T> | null >>

    /**
     * Find zero or more PortfolioSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioSnapshots
     * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany()
     * 
     * // Get first 10 PortfolioSnapshots
     * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioSnapshotWithIdOnly = await prisma.portfolioSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PortfolioSnapshotFindManyArgs>(
      args?: SelectSubset<T, PortfolioSnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PortfolioSnapshot>>, PrismaPromise<Array<PortfolioSnapshotGetPayload<T>>>>

    /**
     * Create a PortfolioSnapshot.
     * @param {PortfolioSnapshotCreateArgs} args - Arguments to create a PortfolioSnapshot.
     * @example
     * // Create one PortfolioSnapshot
     * const PortfolioSnapshot = await prisma.portfolioSnapshot.create({
     *   data: {
     *     // ... data to create a PortfolioSnapshot
     *   }
     * })
     * 
    **/
    create<T extends PortfolioSnapshotCreateArgs>(
      args: SelectSubset<T, PortfolioSnapshotCreateArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Create many PortfolioSnapshots.
     *     @param {PortfolioSnapshotCreateManyArgs} args - Arguments to create many PortfolioSnapshots.
     *     @example
     *     // Create many PortfolioSnapshots
     *     const portfolioSnapshot = await prisma.portfolioSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PortfolioSnapshotCreateManyArgs>(
      args?: SelectSubset<T, PortfolioSnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PortfolioSnapshot.
     * @param {PortfolioSnapshotDeleteArgs} args - Arguments to delete one PortfolioSnapshot.
     * @example
     * // Delete one PortfolioSnapshot
     * const PortfolioSnapshot = await prisma.portfolioSnapshot.delete({
     *   where: {
     *     // ... filter to delete one PortfolioSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends PortfolioSnapshotDeleteArgs>(
      args: SelectSubset<T, PortfolioSnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Update one PortfolioSnapshot.
     * @param {PortfolioSnapshotUpdateArgs} args - Arguments to update one PortfolioSnapshot.
     * @example
     * // Update one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PortfolioSnapshotUpdateArgs>(
      args: SelectSubset<T, PortfolioSnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Delete zero or more PortfolioSnapshots.
     * @param {PortfolioSnapshotDeleteManyArgs} args - Arguments to filter PortfolioSnapshots to delete.
     * @example
     * // Delete a few PortfolioSnapshots
     * const { count } = await prisma.portfolioSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PortfolioSnapshotDeleteManyArgs>(
      args?: SelectSubset<T, PortfolioSnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioSnapshots
     * const portfolioSnapshot = await prisma.portfolioSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PortfolioSnapshotUpdateManyArgs>(
      args: SelectSubset<T, PortfolioSnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PortfolioSnapshot.
     * @param {PortfolioSnapshotUpsertArgs} args - Arguments to update or create a PortfolioSnapshot.
     * @example
     * // Update or create a PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.upsert({
     *   create: {
     *     // ... data to create a PortfolioSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends PortfolioSnapshotUpsertArgs>(
      args: SelectSubset<T, PortfolioSnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Find one PortfolioSnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PortfolioSnapshotFindUniqueOrThrowArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PortfolioSnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PortfolioSnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Find the first PortfolioSnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindFirstOrThrowArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PortfolioSnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PortfolioSnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PortfolioSnapshotClient<PortfolioSnapshot>, Prisma__PortfolioSnapshotClient<PortfolioSnapshotGetPayload<T>>>

    /**
     * Count the number of PortfolioSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotCountArgs} args - Arguments to filter PortfolioSnapshots to count.
     * @example
     * // Count the number of PortfolioSnapshots
     * const count = await prisma.portfolioSnapshot.count({
     *   where: {
     *     // ... the filter for the PortfolioSnapshots we want to count
     *   }
     * })
    **/
    count<T extends PortfolioSnapshotCountArgs>(
      args?: Subset<T, PortfolioSnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioSnapshotAggregateArgs>(args: Subset<T, PortfolioSnapshotAggregateArgs>): PrismaPromise<GetPortfolioSnapshotAggregateType<T>>

    /**
     * Group by PortfolioSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioSnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PortfolioSnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PortfolioSnapshot base type for findUnique actions
   */
  export type PortfolioSnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     * 
    **/
    where: PortfolioSnapshotWhereUniqueInput
  }

  /**
   * PortfolioSnapshot: findUnique
   */
  export interface PortfolioSnapshotFindUniqueArgs extends PortfolioSnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PortfolioSnapshot base type for findFirst actions
   */
  export type PortfolioSnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     * 
    **/
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PortfolioSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioSnapshots.
     * 
    **/
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioSnapshots.
     * 
    **/
    distinct?: Enumerable<PortfolioSnapshotScalarFieldEnum>
  }

  /**
   * PortfolioSnapshot: findFirst
   */
  export interface PortfolioSnapshotFindFirstArgs extends PortfolioSnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PortfolioSnapshot findMany
   */
  export type PortfolioSnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * Filter, which PortfolioSnapshots to fetch.
     * 
    **/
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PortfolioSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioSnapshots.
     * 
    **/
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PortfolioSnapshotScalarFieldEnum>
  }


  /**
   * PortfolioSnapshot create
   */
  export type PortfolioSnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * The data needed to create a PortfolioSnapshot.
     * 
    **/
    data: XOR<PortfolioSnapshotCreateInput, PortfolioSnapshotUncheckedCreateInput>
  }


  /**
   * PortfolioSnapshot createMany
   */
  export type PortfolioSnapshotCreateManyArgs = {
    /**
     * The data used to create many PortfolioSnapshots.
     * 
    **/
    data: Enumerable<PortfolioSnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PortfolioSnapshot update
   */
  export type PortfolioSnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * The data needed to update a PortfolioSnapshot.
     * 
    **/
    data: XOR<PortfolioSnapshotUpdateInput, PortfolioSnapshotUncheckedUpdateInput>
    /**
     * Choose, which PortfolioSnapshot to update.
     * 
    **/
    where: PortfolioSnapshotWhereUniqueInput
  }


  /**
   * PortfolioSnapshot updateMany
   */
  export type PortfolioSnapshotUpdateManyArgs = {
    /**
     * The data used to update PortfolioSnapshots.
     * 
    **/
    data: XOR<PortfolioSnapshotUpdateManyMutationInput, PortfolioSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioSnapshots to update
     * 
    **/
    where?: PortfolioSnapshotWhereInput
  }


  /**
   * PortfolioSnapshot upsert
   */
  export type PortfolioSnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * The filter to search for the PortfolioSnapshot to update in case it exists.
     * 
    **/
    where: PortfolioSnapshotWhereUniqueInput
    /**
     * In case the PortfolioSnapshot found by the `where` argument doesn't exist, create a new PortfolioSnapshot with this data.
     * 
    **/
    create: XOR<PortfolioSnapshotCreateInput, PortfolioSnapshotUncheckedCreateInput>
    /**
     * In case the PortfolioSnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PortfolioSnapshotUpdateInput, PortfolioSnapshotUncheckedUpdateInput>
  }


  /**
   * PortfolioSnapshot delete
   */
  export type PortfolioSnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
    /**
     * Filter which PortfolioSnapshot to delete.
     * 
    **/
    where: PortfolioSnapshotWhereUniqueInput
  }


  /**
   * PortfolioSnapshot deleteMany
   */
  export type PortfolioSnapshotDeleteManyArgs = {
    /**
     * Filter which PortfolioSnapshots to delete
     * 
    **/
    where?: PortfolioSnapshotWhereInput
  }


  /**
   * PortfolioSnapshot: findUniqueOrThrow
   */
  export type PortfolioSnapshotFindUniqueOrThrowArgs = PortfolioSnapshotFindUniqueArgsBase
      

  /**
   * PortfolioSnapshot: findFirstOrThrow
   */
  export type PortfolioSnapshotFindFirstOrThrowArgs = PortfolioSnapshotFindFirstArgsBase
      

  /**
   * PortfolioSnapshot without action
   */
  export type PortfolioSnapshotArgs = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     * 
    **/
    select?: PortfolioSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PortfolioSnapshotInclude | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs = {
    /**
     * Filter which VerificationToken to aggregate.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: Array<VerificationTokenScalarFieldEnum>
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenArgs,
    U = keyof S
      > = S extends true
        ? VerificationToken
    : S extends undefined
    ? never
    : S extends VerificationTokenArgs | VerificationTokenFindManyArgs
    ?'include' extends U
    ? VerificationToken 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof VerificationToken ? VerificationToken[P] : never
  } 
    : VerificationToken
  : VerificationToken


  type VerificationTokenCountArgs = Merge<
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }
  >

  export interface VerificationTokenDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>> : CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken | null >, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null >>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>> : CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken | null >, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null >>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<VerificationToken>>, PrismaPromise<Array<VerificationTokenGetPayload<T>>>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Find one VerificationToken that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken: findUnique
   */
  export interface VerificationTokenFindUniqueArgs extends VerificationTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     * 
    **/
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken: findFirst
   */
  export interface VerificationTokenFindFirstArgs extends VerificationTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationTokens to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to create a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs = {
    /**
     * The data used to create many VerificationTokens.
     * 
    **/
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to update a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs = {
    /**
     * The data used to update VerificationTokens.
     * 
    **/
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     * 
    **/
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter which VerificationToken to delete.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs = {
    /**
     * Filter which VerificationTokens to delete
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken: findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs = VerificationTokenFindUniqueArgsBase
      

  /**
   * VerificationToken: findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs = VerificationTokenFindFirstArgsBase
      

  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
  }



  /**
   * Model Settings
   */


  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    preferredColorScheme: ColorScheme | null
    userCurrency: string | null
    userLanguage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    preferredColorScheme: ColorScheme | null
    userCurrency: string | null
    userLanguage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    userId: number
    preferredColorScheme: number
    userCurrency: number
    userLanguage: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type SettingsMinAggregateInputType = {
    id?: true
    userId?: true
    preferredColorScheme?: true
    userCurrency?: true
    userLanguage?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    preferredColorScheme?: true
    userCurrency?: true
    userLanguage?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    userId?: true
    preferredColorScheme?: true
    userCurrency?: true
    userLanguage?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs = {
    /**
     * Filter which Settings to aggregate.
     * 
    **/
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     * 
    **/
    orderBy?: Enumerable<SettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs = {
    where?: SettingsWhereInput
    orderBy?: Enumerable<SettingsOrderByWithAggregationInput>
    by: Array<SettingsScalarFieldEnum>
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }


  export type SettingsGroupByOutputType = {
    id: string
    userId: string
    preferredColorScheme: ColorScheme | null
    userCurrency: string
    userLanguage: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect = {
    id?: boolean
    userId?: boolean
    preferredColorScheme?: boolean
    userCurrency?: boolean
    userLanguage?: boolean
    user?: boolean | UserArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type SettingsInclude = {
    user?: boolean | UserArgs
  }

  export type SettingsGetPayload<
    S extends boolean | null | undefined | SettingsArgs,
    U = keyof S
      > = S extends true
        ? Settings
    : S extends undefined
    ? never
    : S extends SettingsArgs | SettingsFindManyArgs
    ?'include' extends U
    ? Settings  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Settings ? Settings[P] : never
  } 
    : Settings
  : Settings


  type SettingsCountArgs = Merge<
    Omit<SettingsFindManyArgs, 'select' | 'include'> & {
      select?: SettingsCountAggregateInputType | true
    }
  >

  export interface SettingsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SettingsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SettingsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Settings'> extends True ? CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>> : CheckSelect<T, Prisma__SettingsClient<Settings | null >, Prisma__SettingsClient<SettingsGetPayload<T> | null >>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SettingsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SettingsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Settings'> extends True ? CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>> : CheckSelect<T, Prisma__SettingsClient<Settings | null >, Prisma__SettingsClient<SettingsGetPayload<T> | null >>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SettingsFindManyArgs>(
      args?: SelectSubset<T, SettingsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Settings>>, PrismaPromise<Array<SettingsGetPayload<T>>>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
    **/
    create<T extends SettingsCreateArgs>(
      args: SelectSubset<T, SettingsCreateArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Create many Settings.
     *     @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     *     @example
     *     // Create many Settings
     *     const settings = await prisma.settings.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SettingsCreateManyArgs>(
      args?: SelectSubset<T, SettingsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
    **/
    delete<T extends SettingsDeleteArgs>(
      args: SelectSubset<T, SettingsDeleteArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SettingsUpdateArgs>(
      args: SelectSubset<T, SettingsUpdateArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SettingsDeleteManyArgs>(
      args?: SelectSubset<T, SettingsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SettingsUpdateManyArgs>(
      args: SelectSubset<T, SettingsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
    **/
    upsert<T extends SettingsUpsertArgs>(
      args: SelectSubset<T, SettingsUpsertArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Find one Settings that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SettingsFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Find the first Settings that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SettingsFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SettingsClient<Settings>, Prisma__SettingsClient<SettingsGetPayload<T>>>

    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SettingsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Settings base type for findUnique actions
   */
  export type SettingsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * Filter, which Settings to fetch.
     * 
    **/
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings: findUnique
   */
  export interface SettingsFindUniqueArgs extends SettingsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Settings base type for findFirst actions
   */
  export type SettingsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * Filter, which Settings to fetch.
     * 
    **/
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     * 
    **/
    orderBy?: Enumerable<SettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     * 
    **/
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     * 
    **/
    distinct?: Enumerable<SettingsScalarFieldEnum>
  }

  /**
   * Settings: findFirst
   */
  export interface SettingsFindFirstArgs extends SettingsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * Filter, which Settings to fetch.
     * 
    **/
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     * 
    **/
    orderBy?: Enumerable<SettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     * 
    **/
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SettingsScalarFieldEnum>
  }


  /**
   * Settings create
   */
  export type SettingsCreateArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * The data needed to create a Settings.
     * 
    **/
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }


  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs = {
    /**
     * The data used to create many Settings.
     * 
    **/
    data: Enumerable<SettingsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Settings update
   */
  export type SettingsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * The data needed to update a Settings.
     * 
    **/
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     * 
    **/
    where: SettingsWhereUniqueInput
  }


  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs = {
    /**
     * The data used to update Settings.
     * 
    **/
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     * 
    **/
    where?: SettingsWhereInput
  }


  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * The filter to search for the Settings to update in case it exists.
     * 
    **/
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     * 
    **/
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }


  /**
   * Settings delete
   */
  export type SettingsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
    /**
     * Filter which Settings to delete.
     * 
    **/
    where: SettingsWhereUniqueInput
  }


  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs = {
    /**
     * Filter which Settings to delete
     * 
    **/
    where?: SettingsWhereInput
  }


  /**
   * Settings: findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs = SettingsFindUniqueArgsBase
      

  /**
   * Settings: findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs = SettingsFindFirstArgsBase
      

  /**
   * Settings without action
   */
  export type SettingsArgs = {
    /**
     * Select specific fields to fetch from the Settings
     * 
    **/
    select?: SettingsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SettingsInclude | null
  }



  /**
   * Model Cryptocurrency
   */


  export type AggregateCryptocurrency = {
    _count: CryptocurrencyCountAggregateOutputType | null
    _avg: CryptocurrencyAvgAggregateOutputType | null
    _sum: CryptocurrencySumAggregateOutputType | null
    _min: CryptocurrencyMinAggregateOutputType | null
    _max: CryptocurrencyMaxAggregateOutputType | null
  }

  export type CryptocurrencyAvgAggregateOutputType = {
    balance: Decimal | null
    costBasis: Decimal | null
    realisedGain: Decimal | null
    targetBalance: Decimal | null
    interestBearingBalance: Decimal | null
    rateOfIncome: Decimal | null
  }

  export type CryptocurrencySumAggregateOutputType = {
    balance: Decimal | null
    costBasis: Decimal | null
    realisedGain: Decimal | null
    targetBalance: Decimal | null
    interestBearingBalance: Decimal | null
    rateOfIncome: Decimal | null
  }

  export type CryptocurrencyMinAggregateOutputType = {
    id: string | null
    displayName: string | null
    currency: string | null
    balance: Decimal | null
    costBasis: Decimal | null
    realisedGain: Decimal | null
    walletAddress: string | null
    targetBalance: Decimal | null
    interestBearingBalance: Decimal | null
    rateOfIncome: Decimal | null
    accountConnection: AccountConnection | null
    apiKey: string | null
    apiSecret: string | null
    marketId: string | null
    userId: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CryptocurrencyMaxAggregateOutputType = {
    id: string | null
    displayName: string | null
    currency: string | null
    balance: Decimal | null
    costBasis: Decimal | null
    realisedGain: Decimal | null
    walletAddress: string | null
    targetBalance: Decimal | null
    interestBearingBalance: Decimal | null
    rateOfIncome: Decimal | null
    accountConnection: AccountConnection | null
    apiKey: string | null
    apiSecret: string | null
    marketId: string | null
    userId: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type CryptocurrencyCountAggregateOutputType = {
    id: number
    displayName: number
    currency: number
    balance: number
    costBasis: number
    realisedGain: number
    walletAddress: number
    targetBalance: number
    interestBearingBalance: number
    rateOfIncome: number
    accountConnection: number
    apiKey: number
    apiSecret: number
    marketId: number
    userId: number
    parentId: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type CryptocurrencyAvgAggregateInputType = {
    balance?: true
    costBasis?: true
    realisedGain?: true
    targetBalance?: true
    interestBearingBalance?: true
    rateOfIncome?: true
  }

  export type CryptocurrencySumAggregateInputType = {
    balance?: true
    costBasis?: true
    realisedGain?: true
    targetBalance?: true
    interestBearingBalance?: true
    rateOfIncome?: true
  }

  export type CryptocurrencyMinAggregateInputType = {
    id?: true
    displayName?: true
    currency?: true
    balance?: true
    costBasis?: true
    realisedGain?: true
    walletAddress?: true
    targetBalance?: true
    interestBearingBalance?: true
    rateOfIncome?: true
    accountConnection?: true
    apiKey?: true
    apiSecret?: true
    marketId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CryptocurrencyMaxAggregateInputType = {
    id?: true
    displayName?: true
    currency?: true
    balance?: true
    costBasis?: true
    realisedGain?: true
    walletAddress?: true
    targetBalance?: true
    interestBearingBalance?: true
    rateOfIncome?: true
    accountConnection?: true
    apiKey?: true
    apiSecret?: true
    marketId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type CryptocurrencyCountAggregateInputType = {
    id?: true
    displayName?: true
    currency?: true
    balance?: true
    costBasis?: true
    realisedGain?: true
    walletAddress?: true
    targetBalance?: true
    interestBearingBalance?: true
    rateOfIncome?: true
    accountConnection?: true
    apiKey?: true
    apiSecret?: true
    marketId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type CryptocurrencyAggregateArgs = {
    /**
     * Filter which Cryptocurrency to aggregate.
     * 
    **/
    where?: CryptocurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cryptocurrencies to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptocurrencyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CryptocurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cryptocurrencies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cryptocurrencies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cryptocurrencies
    **/
    _count?: true | CryptocurrencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CryptocurrencyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CryptocurrencySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CryptocurrencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CryptocurrencyMaxAggregateInputType
  }

  export type GetCryptocurrencyAggregateType<T extends CryptocurrencyAggregateArgs> = {
        [P in keyof T & keyof AggregateCryptocurrency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCryptocurrency[P]>
      : GetScalarType<T[P], AggregateCryptocurrency[P]>
  }




  export type CryptocurrencyGroupByArgs = {
    where?: CryptocurrencyWhereInput
    orderBy?: Enumerable<CryptocurrencyOrderByWithAggregationInput>
    by: Array<CryptocurrencyScalarFieldEnum>
    having?: CryptocurrencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CryptocurrencyCountAggregateInputType | true
    _avg?: CryptocurrencyAvgAggregateInputType
    _sum?: CryptocurrencySumAggregateInputType
    _min?: CryptocurrencyMinAggregateInputType
    _max?: CryptocurrencyMaxAggregateInputType
  }


  export type CryptocurrencyGroupByOutputType = {
    id: string
    displayName: string
    currency: string
    balance: Decimal
    costBasis: Decimal
    realisedGain: Decimal
    walletAddress: string | null
    targetBalance: Decimal
    interestBearingBalance: Decimal
    rateOfIncome: Decimal
    accountConnection: AccountConnection | null
    apiKey: string | null
    apiSecret: string | null
    marketId: string | null
    userId: string
    parentId: string | null
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: CryptocurrencyCountAggregateOutputType | null
    _avg: CryptocurrencyAvgAggregateOutputType | null
    _sum: CryptocurrencySumAggregateOutputType | null
    _min: CryptocurrencyMinAggregateOutputType | null
    _max: CryptocurrencyMaxAggregateOutputType | null
  }

  type GetCryptocurrencyGroupByPayload<T extends CryptocurrencyGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CryptocurrencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CryptocurrencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CryptocurrencyGroupByOutputType[P]>
            : GetScalarType<T[P], CryptocurrencyGroupByOutputType[P]>
        }
      >
    >


  export type CryptocurrencySelect = {
    id?: boolean
    displayName?: boolean
    currency?: boolean
    balance?: boolean
    costBasis?: boolean
    realisedGain?: boolean
    walletAddress?: boolean
    targetBalance?: boolean
    interestBearingBalance?: boolean
    rateOfIncome?: boolean
    accountConnection?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    marketId?: boolean
    userId?: boolean
    parentId?: boolean
    market?: boolean | MarketArgs
    parent?: boolean | CryptocurrencyArgs
    user?: boolean | UserArgs
    Children?: boolean | CryptocurrencyFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
    _count?: boolean | CryptocurrencyCountOutputTypeArgs
  }

  export type CryptocurrencyInclude = {
    market?: boolean | MarketArgs
    parent?: boolean | CryptocurrencyArgs
    user?: boolean | UserArgs
    Children?: boolean | CryptocurrencyFindManyArgs
    _count?: boolean | CryptocurrencyCountOutputTypeArgs
  }

  export type CryptocurrencyGetPayload<
    S extends boolean | null | undefined | CryptocurrencyArgs,
    U = keyof S
      > = S extends true
        ? Cryptocurrency
    : S extends undefined
    ? never
    : S extends CryptocurrencyArgs | CryptocurrencyFindManyArgs
    ?'include' extends U
    ? Cryptocurrency  & {
    [P in TrueKeys<S['include']>]:
        P extends 'market' ? MarketGetPayload<S['include'][P]> | null :
        P extends 'parent' ? CryptocurrencyGetPayload<S['include'][P]> | null :
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'Children' ? Array < CryptocurrencyGetPayload<S['include'][P]>>  :
        P extends '_count' ? CryptocurrencyCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'market' ? MarketGetPayload<S['select'][P]> | null :
        P extends 'parent' ? CryptocurrencyGetPayload<S['select'][P]> | null :
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'Children' ? Array < CryptocurrencyGetPayload<S['select'][P]>>  :
        P extends '_count' ? CryptocurrencyCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Cryptocurrency ? Cryptocurrency[P] : never
  } 
    : Cryptocurrency
  : Cryptocurrency


  type CryptocurrencyCountArgs = Merge<
    Omit<CryptocurrencyFindManyArgs, 'select' | 'include'> & {
      select?: CryptocurrencyCountAggregateInputType | true
    }
  >

  export interface CryptocurrencyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Cryptocurrency that matches the filter.
     * @param {CryptocurrencyFindUniqueArgs} args - Arguments to find a Cryptocurrency
     * @example
     * // Get one Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CryptocurrencyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CryptocurrencyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Cryptocurrency'> extends True ? CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>> : CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency | null >, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T> | null >>

    /**
     * Find the first Cryptocurrency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyFindFirstArgs} args - Arguments to find a Cryptocurrency
     * @example
     * // Get one Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CryptocurrencyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CryptocurrencyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Cryptocurrency'> extends True ? CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>> : CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency | null >, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T> | null >>

    /**
     * Find zero or more Cryptocurrencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cryptocurrencies
     * const cryptocurrencies = await prisma.cryptocurrency.findMany()
     * 
     * // Get first 10 Cryptocurrencies
     * const cryptocurrencies = await prisma.cryptocurrency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cryptocurrencyWithIdOnly = await prisma.cryptocurrency.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CryptocurrencyFindManyArgs>(
      args?: SelectSubset<T, CryptocurrencyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Cryptocurrency>>, PrismaPromise<Array<CryptocurrencyGetPayload<T>>>>

    /**
     * Create a Cryptocurrency.
     * @param {CryptocurrencyCreateArgs} args - Arguments to create a Cryptocurrency.
     * @example
     * // Create one Cryptocurrency
     * const Cryptocurrency = await prisma.cryptocurrency.create({
     *   data: {
     *     // ... data to create a Cryptocurrency
     *   }
     * })
     * 
    **/
    create<T extends CryptocurrencyCreateArgs>(
      args: SelectSubset<T, CryptocurrencyCreateArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Create many Cryptocurrencies.
     *     @param {CryptocurrencyCreateManyArgs} args - Arguments to create many Cryptocurrencies.
     *     @example
     *     // Create many Cryptocurrencies
     *     const cryptocurrency = await prisma.cryptocurrency.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CryptocurrencyCreateManyArgs>(
      args?: SelectSubset<T, CryptocurrencyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Cryptocurrency.
     * @param {CryptocurrencyDeleteArgs} args - Arguments to delete one Cryptocurrency.
     * @example
     * // Delete one Cryptocurrency
     * const Cryptocurrency = await prisma.cryptocurrency.delete({
     *   where: {
     *     // ... filter to delete one Cryptocurrency
     *   }
     * })
     * 
    **/
    delete<T extends CryptocurrencyDeleteArgs>(
      args: SelectSubset<T, CryptocurrencyDeleteArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Update one Cryptocurrency.
     * @param {CryptocurrencyUpdateArgs} args - Arguments to update one Cryptocurrency.
     * @example
     * // Update one Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CryptocurrencyUpdateArgs>(
      args: SelectSubset<T, CryptocurrencyUpdateArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Delete zero or more Cryptocurrencies.
     * @param {CryptocurrencyDeleteManyArgs} args - Arguments to filter Cryptocurrencies to delete.
     * @example
     * // Delete a few Cryptocurrencies
     * const { count } = await prisma.cryptocurrency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CryptocurrencyDeleteManyArgs>(
      args?: SelectSubset<T, CryptocurrencyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cryptocurrencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cryptocurrencies
     * const cryptocurrency = await prisma.cryptocurrency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CryptocurrencyUpdateManyArgs>(
      args: SelectSubset<T, CryptocurrencyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Cryptocurrency.
     * @param {CryptocurrencyUpsertArgs} args - Arguments to update or create a Cryptocurrency.
     * @example
     * // Update or create a Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.upsert({
     *   create: {
     *     // ... data to create a Cryptocurrency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cryptocurrency we want to update
     *   }
     * })
    **/
    upsert<T extends CryptocurrencyUpsertArgs>(
      args: SelectSubset<T, CryptocurrencyUpsertArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Find one Cryptocurrency that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CryptocurrencyFindUniqueOrThrowArgs} args - Arguments to find a Cryptocurrency
     * @example
     * // Get one Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CryptocurrencyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CryptocurrencyFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Find the first Cryptocurrency that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyFindFirstOrThrowArgs} args - Arguments to find a Cryptocurrency
     * @example
     * // Get one Cryptocurrency
     * const cryptocurrency = await prisma.cryptocurrency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CryptocurrencyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CryptocurrencyFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency>, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T>>>

    /**
     * Count the number of Cryptocurrencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyCountArgs} args - Arguments to filter Cryptocurrencies to count.
     * @example
     * // Count the number of Cryptocurrencies
     * const count = await prisma.cryptocurrency.count({
     *   where: {
     *     // ... the filter for the Cryptocurrencies we want to count
     *   }
     * })
    **/
    count<T extends CryptocurrencyCountArgs>(
      args?: Subset<T, CryptocurrencyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CryptocurrencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cryptocurrency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CryptocurrencyAggregateArgs>(args: Subset<T, CryptocurrencyAggregateArgs>): PrismaPromise<GetCryptocurrencyAggregateType<T>>

    /**
     * Group by Cryptocurrency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptocurrencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CryptocurrencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CryptocurrencyGroupByArgs['orderBy'] }
        : { orderBy?: CryptocurrencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CryptocurrencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCryptocurrencyGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cryptocurrency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CryptocurrencyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    market<T extends MarketArgs = {}>(args?: Subset<T, MarketArgs>): CheckSelect<T, Prisma__MarketClient<Market | null >, Prisma__MarketClient<MarketGetPayload<T> | null >>;

    parent<T extends CryptocurrencyArgs = {}>(args?: Subset<T, CryptocurrencyArgs>): CheckSelect<T, Prisma__CryptocurrencyClient<Cryptocurrency | null >, Prisma__CryptocurrencyClient<CryptocurrencyGetPayload<T> | null >>;

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    Children<T extends CryptocurrencyFindManyArgs = {}>(args?: Subset<T, CryptocurrencyFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Cryptocurrency>>, PrismaPromise<Array<CryptocurrencyGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Cryptocurrency base type for findUnique actions
   */
  export type CryptocurrencyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * Filter, which Cryptocurrency to fetch.
     * 
    **/
    where: CryptocurrencyWhereUniqueInput
  }

  /**
   * Cryptocurrency: findUnique
   */
  export interface CryptocurrencyFindUniqueArgs extends CryptocurrencyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Cryptocurrency base type for findFirst actions
   */
  export type CryptocurrencyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * Filter, which Cryptocurrency to fetch.
     * 
    **/
    where?: CryptocurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cryptocurrencies to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptocurrencyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cryptocurrencies.
     * 
    **/
    cursor?: CryptocurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cryptocurrencies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cryptocurrencies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cryptocurrencies.
     * 
    **/
    distinct?: Enumerable<CryptocurrencyScalarFieldEnum>
  }

  /**
   * Cryptocurrency: findFirst
   */
  export interface CryptocurrencyFindFirstArgs extends CryptocurrencyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Cryptocurrency findMany
   */
  export type CryptocurrencyFindManyArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * Filter, which Cryptocurrencies to fetch.
     * 
    **/
    where?: CryptocurrencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cryptocurrencies to fetch.
     * 
    **/
    orderBy?: Enumerable<CryptocurrencyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cryptocurrencies.
     * 
    **/
    cursor?: CryptocurrencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cryptocurrencies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cryptocurrencies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CryptocurrencyScalarFieldEnum>
  }


  /**
   * Cryptocurrency create
   */
  export type CryptocurrencyCreateArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * The data needed to create a Cryptocurrency.
     * 
    **/
    data: XOR<CryptocurrencyCreateInput, CryptocurrencyUncheckedCreateInput>
  }


  /**
   * Cryptocurrency createMany
   */
  export type CryptocurrencyCreateManyArgs = {
    /**
     * The data used to create many Cryptocurrencies.
     * 
    **/
    data: Enumerable<CryptocurrencyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Cryptocurrency update
   */
  export type CryptocurrencyUpdateArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * The data needed to update a Cryptocurrency.
     * 
    **/
    data: XOR<CryptocurrencyUpdateInput, CryptocurrencyUncheckedUpdateInput>
    /**
     * Choose, which Cryptocurrency to update.
     * 
    **/
    where: CryptocurrencyWhereUniqueInput
  }


  /**
   * Cryptocurrency updateMany
   */
  export type CryptocurrencyUpdateManyArgs = {
    /**
     * The data used to update Cryptocurrencies.
     * 
    **/
    data: XOR<CryptocurrencyUpdateManyMutationInput, CryptocurrencyUncheckedUpdateManyInput>
    /**
     * Filter which Cryptocurrencies to update
     * 
    **/
    where?: CryptocurrencyWhereInput
  }


  /**
   * Cryptocurrency upsert
   */
  export type CryptocurrencyUpsertArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * The filter to search for the Cryptocurrency to update in case it exists.
     * 
    **/
    where: CryptocurrencyWhereUniqueInput
    /**
     * In case the Cryptocurrency found by the `where` argument doesn't exist, create a new Cryptocurrency with this data.
     * 
    **/
    create: XOR<CryptocurrencyCreateInput, CryptocurrencyUncheckedCreateInput>
    /**
     * In case the Cryptocurrency was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CryptocurrencyUpdateInput, CryptocurrencyUncheckedUpdateInput>
  }


  /**
   * Cryptocurrency delete
   */
  export type CryptocurrencyDeleteArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
    /**
     * Filter which Cryptocurrency to delete.
     * 
    **/
    where: CryptocurrencyWhereUniqueInput
  }


  /**
   * Cryptocurrency deleteMany
   */
  export type CryptocurrencyDeleteManyArgs = {
    /**
     * Filter which Cryptocurrencies to delete
     * 
    **/
    where?: CryptocurrencyWhereInput
  }


  /**
   * Cryptocurrency: findUniqueOrThrow
   */
  export type CryptocurrencyFindUniqueOrThrowArgs = CryptocurrencyFindUniqueArgsBase
      

  /**
   * Cryptocurrency: findFirstOrThrow
   */
  export type CryptocurrencyFindFirstOrThrowArgs = CryptocurrencyFindFirstArgsBase
      

  /**
   * Cryptocurrency without action
   */
  export type CryptocurrencyArgs = {
    /**
     * Select specific fields to fetch from the Cryptocurrency
     * 
    **/
    select?: CryptocurrencySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CryptocurrencyInclude | null
  }



  /**
   * Model Market
   */


  export type AggregateMarket = {
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  export type MarketAvgAggregateOutputType = {
    price: Decimal | null
    priceChange24h: Decimal | null
    priceChange24hPercent: Decimal | null
    marketCap: Decimal | null
    marketCapRank: Decimal | null
  }

  export type MarketSumAggregateOutputType = {
    price: Decimal | null
    priceChange24h: Decimal | null
    priceChange24hPercent: Decimal | null
    marketCap: Decimal | null
    marketCapRank: Decimal | null
  }

  export type MarketMinAggregateOutputType = {
    name: string | null
    ticker: string | null
    description: string | null
    currency: string | null
    price: Decimal | null
    priceChange24h: Decimal | null
    priceChange24hPercent: Decimal | null
    marketCap: Decimal | null
    marketCapRank: Decimal | null
    type: MarketType | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type MarketMaxAggregateOutputType = {
    name: string | null
    ticker: string | null
    description: string | null
    currency: string | null
    price: Decimal | null
    priceChange24h: Decimal | null
    priceChange24hPercent: Decimal | null
    marketCap: Decimal | null
    marketCapRank: Decimal | null
    type: MarketType | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type MarketCountAggregateOutputType = {
    name: number
    ticker: number
    description: number
    currency: number
    price: number
    priceChange24h: number
    priceChange24hPercent: number
    marketCap: number
    marketCapRank: number
    type: number
    image: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type MarketAvgAggregateInputType = {
    price?: true
    priceChange24h?: true
    priceChange24hPercent?: true
    marketCap?: true
    marketCapRank?: true
  }

  export type MarketSumAggregateInputType = {
    price?: true
    priceChange24h?: true
    priceChange24hPercent?: true
    marketCap?: true
    marketCapRank?: true
  }

  export type MarketMinAggregateInputType = {
    name?: true
    ticker?: true
    description?: true
    currency?: true
    price?: true
    priceChange24h?: true
    priceChange24hPercent?: true
    marketCap?: true
    marketCapRank?: true
    type?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type MarketMaxAggregateInputType = {
    name?: true
    ticker?: true
    description?: true
    currency?: true
    price?: true
    priceChange24h?: true
    priceChange24hPercent?: true
    marketCap?: true
    marketCapRank?: true
    type?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type MarketCountAggregateInputType = {
    name?: true
    ticker?: true
    description?: true
    currency?: true
    price?: true
    priceChange24h?: true
    priceChange24hPercent?: true
    marketCap?: true
    marketCapRank?: true
    type?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type MarketAggregateArgs = {
    /**
     * Filter which Market to aggregate.
     * 
    **/
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     * 
    **/
    orderBy?: Enumerable<MarketOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Markets
    **/
    _count?: true | MarketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketMaxAggregateInputType
  }

  export type GetMarketAggregateType<T extends MarketAggregateArgs> = {
        [P in keyof T & keyof AggregateMarket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarket[P]>
      : GetScalarType<T[P], AggregateMarket[P]>
  }




  export type MarketGroupByArgs = {
    where?: MarketWhereInput
    orderBy?: Enumerable<MarketOrderByWithAggregationInput>
    by: Array<MarketScalarFieldEnum>
    having?: MarketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketCountAggregateInputType | true
    _avg?: MarketAvgAggregateInputType
    _sum?: MarketSumAggregateInputType
    _min?: MarketMinAggregateInputType
    _max?: MarketMaxAggregateInputType
  }


  export type MarketGroupByOutputType = {
    name: string
    ticker: string
    description: string | null
    currency: string
    price: Decimal
    priceChange24h: Decimal
    priceChange24hPercent: Decimal
    marketCap: Decimal
    marketCapRank: Decimal
    type: MarketType
    image: string | null
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  type GetMarketGroupByPayload<T extends MarketGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MarketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketGroupByOutputType[P]>
            : GetScalarType<T[P], MarketGroupByOutputType[P]>
        }
      >
    >


  export type MarketSelect = {
    name?: boolean
    ticker?: boolean
    description?: boolean
    currency?: boolean
    price?: boolean
    priceChange24h?: boolean
    priceChange24hPercent?: boolean
    marketCap?: boolean
    marketCapRank?: boolean
    type?: boolean
    image?: boolean
    Cryptocurrency?: boolean | CryptocurrencyFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
    _count?: boolean | MarketCountOutputTypeArgs
  }

  export type MarketInclude = {
    Cryptocurrency?: boolean | CryptocurrencyFindManyArgs
    _count?: boolean | MarketCountOutputTypeArgs
  }

  export type MarketGetPayload<
    S extends boolean | null | undefined | MarketArgs,
    U = keyof S
      > = S extends true
        ? Market
    : S extends undefined
    ? never
    : S extends MarketArgs | MarketFindManyArgs
    ?'include' extends U
    ? Market  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Cryptocurrency' ? Array < CryptocurrencyGetPayload<S['include'][P]>>  :
        P extends '_count' ? MarketCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Cryptocurrency' ? Array < CryptocurrencyGetPayload<S['select'][P]>>  :
        P extends '_count' ? MarketCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Market ? Market[P] : never
  } 
    : Market
  : Market


  type MarketCountArgs = Merge<
    Omit<MarketFindManyArgs, 'select' | 'include'> & {
      select?: MarketCountAggregateInputType | true
    }
  >

  export interface MarketDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Market that matches the filter.
     * @param {MarketFindUniqueArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MarketFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MarketFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Market'> extends True ? CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>> : CheckSelect<T, Prisma__MarketClient<Market | null >, Prisma__MarketClient<MarketGetPayload<T> | null >>

    /**
     * Find the first Market that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MarketFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MarketFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Market'> extends True ? CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>> : CheckSelect<T, Prisma__MarketClient<Market | null >, Prisma__MarketClient<MarketGetPayload<T> | null >>

    /**
     * Find zero or more Markets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Markets
     * const markets = await prisma.market.findMany()
     * 
     * // Get first 10 Markets
     * const markets = await prisma.market.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const marketWithNameOnly = await prisma.market.findMany({ select: { name: true } })
     * 
    **/
    findMany<T extends MarketFindManyArgs>(
      args?: SelectSubset<T, MarketFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Market>>, PrismaPromise<Array<MarketGetPayload<T>>>>

    /**
     * Create a Market.
     * @param {MarketCreateArgs} args - Arguments to create a Market.
     * @example
     * // Create one Market
     * const Market = await prisma.market.create({
     *   data: {
     *     // ... data to create a Market
     *   }
     * })
     * 
    **/
    create<T extends MarketCreateArgs>(
      args: SelectSubset<T, MarketCreateArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Create many Markets.
     *     @param {MarketCreateManyArgs} args - Arguments to create many Markets.
     *     @example
     *     // Create many Markets
     *     const market = await prisma.market.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MarketCreateManyArgs>(
      args?: SelectSubset<T, MarketCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Market.
     * @param {MarketDeleteArgs} args - Arguments to delete one Market.
     * @example
     * // Delete one Market
     * const Market = await prisma.market.delete({
     *   where: {
     *     // ... filter to delete one Market
     *   }
     * })
     * 
    **/
    delete<T extends MarketDeleteArgs>(
      args: SelectSubset<T, MarketDeleteArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Update one Market.
     * @param {MarketUpdateArgs} args - Arguments to update one Market.
     * @example
     * // Update one Market
     * const market = await prisma.market.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MarketUpdateArgs>(
      args: SelectSubset<T, MarketUpdateArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Delete zero or more Markets.
     * @param {MarketDeleteManyArgs} args - Arguments to filter Markets to delete.
     * @example
     * // Delete a few Markets
     * const { count } = await prisma.market.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MarketDeleteManyArgs>(
      args?: SelectSubset<T, MarketDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MarketUpdateManyArgs>(
      args: SelectSubset<T, MarketUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Market.
     * @param {MarketUpsertArgs} args - Arguments to update or create a Market.
     * @example
     * // Update or create a Market
     * const market = await prisma.market.upsert({
     *   create: {
     *     // ... data to create a Market
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Market we want to update
     *   }
     * })
    **/
    upsert<T extends MarketUpsertArgs>(
      args: SelectSubset<T, MarketUpsertArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Find one Market that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {MarketFindUniqueOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MarketFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MarketFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Find the first Market that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MarketFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MarketFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__MarketClient<Market>, Prisma__MarketClient<MarketGetPayload<T>>>

    /**
     * Count the number of Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketCountArgs} args - Arguments to filter Markets to count.
     * @example
     * // Count the number of Markets
     * const count = await prisma.market.count({
     *   where: {
     *     // ... the filter for the Markets we want to count
     *   }
     * })
    **/
    count<T extends MarketCountArgs>(
      args?: Subset<T, MarketCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketAggregateArgs>(args: Subset<T, MarketAggregateArgs>): PrismaPromise<GetMarketAggregateType<T>>

    /**
     * Group by Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketGroupByArgs['orderBy'] }
        : { orderBy?: MarketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Market.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MarketClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Cryptocurrency<T extends CryptocurrencyFindManyArgs = {}>(args?: Subset<T, CryptocurrencyFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Cryptocurrency>>, PrismaPromise<Array<CryptocurrencyGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Market base type for findUnique actions
   */
  export type MarketFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * Filter, which Market to fetch.
     * 
    **/
    where: MarketWhereUniqueInput
  }

  /**
   * Market: findUnique
   */
  export interface MarketFindUniqueArgs extends MarketFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Market base type for findFirst actions
   */
  export type MarketFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * Filter, which Market to fetch.
     * 
    **/
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     * 
    **/
    orderBy?: Enumerable<MarketOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     * 
    **/
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     * 
    **/
    distinct?: Enumerable<MarketScalarFieldEnum>
  }

  /**
   * Market: findFirst
   */
  export interface MarketFindFirstArgs extends MarketFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Market findMany
   */
  export type MarketFindManyArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * Filter, which Markets to fetch.
     * 
    **/
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     * 
    **/
    orderBy?: Enumerable<MarketOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Markets.
     * 
    **/
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MarketScalarFieldEnum>
  }


  /**
   * Market create
   */
  export type MarketCreateArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * The data needed to create a Market.
     * 
    **/
    data: XOR<MarketCreateInput, MarketUncheckedCreateInput>
  }


  /**
   * Market createMany
   */
  export type MarketCreateManyArgs = {
    /**
     * The data used to create many Markets.
     * 
    **/
    data: Enumerable<MarketCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Market update
   */
  export type MarketUpdateArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * The data needed to update a Market.
     * 
    **/
    data: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
    /**
     * Choose, which Market to update.
     * 
    **/
    where: MarketWhereUniqueInput
  }


  /**
   * Market updateMany
   */
  export type MarketUpdateManyArgs = {
    /**
     * The data used to update Markets.
     * 
    **/
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     * 
    **/
    where?: MarketWhereInput
  }


  /**
   * Market upsert
   */
  export type MarketUpsertArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * The filter to search for the Market to update in case it exists.
     * 
    **/
    where: MarketWhereUniqueInput
    /**
     * In case the Market found by the `where` argument doesn't exist, create a new Market with this data.
     * 
    **/
    create: XOR<MarketCreateInput, MarketUncheckedCreateInput>
    /**
     * In case the Market was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
  }


  /**
   * Market delete
   */
  export type MarketDeleteArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
    /**
     * Filter which Market to delete.
     * 
    **/
    where: MarketWhereUniqueInput
  }


  /**
   * Market deleteMany
   */
  export type MarketDeleteManyArgs = {
    /**
     * Filter which Markets to delete
     * 
    **/
    where?: MarketWhereInput
  }


  /**
   * Market: findUniqueOrThrow
   */
  export type MarketFindUniqueOrThrowArgs = MarketFindUniqueArgsBase
      

  /**
   * Market: findFirstOrThrow
   */
  export type MarketFindFirstOrThrowArgs = MarketFindFirstArgsBase
      

  /**
   * Market without action
   */
  export type MarketArgs = {
    /**
     * Select specific fields to fetch from the Market
     * 
    **/
    select?: MarketSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MarketInclude | null
  }



  /**
   * Model Income
   */


  export type AggregateIncome = {
    _count: IncomeCountAggregateOutputType | null
    _min: IncomeMinAggregateOutputType | null
    _max: IncomeMaxAggregateOutputType | null
  }

  export type IncomeMinAggregateOutputType = {
    id: string | null
    name: string | null
    payFrequency: string | null
    grossAmount: string | null
    grossFrequency: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type IncomeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    payFrequency: string | null
    grossAmount: string | null
    grossFrequency: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type IncomeCountAggregateOutputType = {
    id: number
    name: number
    payFrequency: number
    grossAmount: number
    grossFrequency: number
    userId: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type IncomeMinAggregateInputType = {
    id?: true
    name?: true
    payFrequency?: true
    grossAmount?: true
    grossFrequency?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type IncomeMaxAggregateInputType = {
    id?: true
    name?: true
    payFrequency?: true
    grossAmount?: true
    grossFrequency?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type IncomeCountAggregateInputType = {
    id?: true
    name?: true
    payFrequency?: true
    grossAmount?: true
    grossFrequency?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type IncomeAggregateArgs = {
    /**
     * Filter which Income to aggregate.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Incomes
    **/
    _count?: true | IncomeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeMaxAggregateInputType
  }

  export type GetIncomeAggregateType<T extends IncomeAggregateArgs> = {
        [P in keyof T & keyof AggregateIncome]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncome[P]>
      : GetScalarType<T[P], AggregateIncome[P]>
  }




  export type IncomeGroupByArgs = {
    where?: IncomeWhereInput
    orderBy?: Enumerable<IncomeOrderByWithAggregationInput>
    by: Array<IncomeScalarFieldEnum>
    having?: IncomeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeCountAggregateInputType | true
    _min?: IncomeMinAggregateInputType
    _max?: IncomeMaxAggregateInputType
  }


  export type IncomeGroupByOutputType = {
    id: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency: string
    userId: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: IncomeCountAggregateOutputType | null
    _min: IncomeMinAggregateOutputType | null
    _max: IncomeMaxAggregateOutputType | null
  }

  type GetIncomeGroupByPayload<T extends IncomeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IncomeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncomeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncomeGroupByOutputType[P]>
            : GetScalarType<T[P], IncomeGroupByOutputType[P]>
        }
      >
    >


  export type IncomeSelect = {
    id?: boolean
    name?: boolean
    payFrequency?: boolean
    grossAmount?: boolean
    grossFrequency?: boolean
    userId?: boolean
    budget?: boolean | BudgetArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type IncomeInclude = {
    budget?: boolean | BudgetArgs
  }

  export type IncomeGetPayload<
    S extends boolean | null | undefined | IncomeArgs,
    U = keyof S
      > = S extends true
        ? Income
    : S extends undefined
    ? never
    : S extends IncomeArgs | IncomeFindManyArgs
    ?'include' extends U
    ? Income  & {
    [P in TrueKeys<S['include']>]:
        P extends 'budget' ? BudgetGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'budget' ? BudgetGetPayload<S['select'][P]> :  P extends keyof Income ? Income[P] : never
  } 
    : Income
  : Income


  type IncomeCountArgs = Merge<
    Omit<IncomeFindManyArgs, 'select' | 'include'> & {
      select?: IncomeCountAggregateInputType | true
    }
  >

  export interface IncomeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Income that matches the filter.
     * @param {IncomeFindUniqueArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Income'> extends True ? CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>> : CheckSelect<T, Prisma__IncomeClient<Income | null >, Prisma__IncomeClient<IncomeGetPayload<T> | null >>

    /**
     * Find the first Income that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindFirstArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Income'> extends True ? CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>> : CheckSelect<T, Prisma__IncomeClient<Income | null >, Prisma__IncomeClient<IncomeGetPayload<T> | null >>

    /**
     * Find zero or more Incomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incomes
     * const incomes = await prisma.income.findMany()
     * 
     * // Get first 10 Incomes
     * const incomes = await prisma.income.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeWithIdOnly = await prisma.income.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeFindManyArgs>(
      args?: SelectSubset<T, IncomeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Income>>, PrismaPromise<Array<IncomeGetPayload<T>>>>

    /**
     * Create a Income.
     * @param {IncomeCreateArgs} args - Arguments to create a Income.
     * @example
     * // Create one Income
     * const Income = await prisma.income.create({
     *   data: {
     *     // ... data to create a Income
     *   }
     * })
     * 
    **/
    create<T extends IncomeCreateArgs>(
      args: SelectSubset<T, IncomeCreateArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Create many Incomes.
     *     @param {IncomeCreateManyArgs} args - Arguments to create many Incomes.
     *     @example
     *     // Create many Incomes
     *     const income = await prisma.income.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeCreateManyArgs>(
      args?: SelectSubset<T, IncomeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Income.
     * @param {IncomeDeleteArgs} args - Arguments to delete one Income.
     * @example
     * // Delete one Income
     * const Income = await prisma.income.delete({
     *   where: {
     *     // ... filter to delete one Income
     *   }
     * })
     * 
    **/
    delete<T extends IncomeDeleteArgs>(
      args: SelectSubset<T, IncomeDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Update one Income.
     * @param {IncomeUpdateArgs} args - Arguments to update one Income.
     * @example
     * // Update one Income
     * const income = await prisma.income.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeUpdateArgs>(
      args: SelectSubset<T, IncomeUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Delete zero or more Incomes.
     * @param {IncomeDeleteManyArgs} args - Arguments to filter Incomes to delete.
     * @example
     * // Delete a few Incomes
     * const { count } = await prisma.income.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeDeleteManyArgs>(
      args?: SelectSubset<T, IncomeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incomes
     * const income = await prisma.income.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeUpdateManyArgs>(
      args: SelectSubset<T, IncomeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Income.
     * @param {IncomeUpsertArgs} args - Arguments to update or create a Income.
     * @example
     * // Update or create a Income
     * const income = await prisma.income.upsert({
     *   create: {
     *     // ... data to create a Income
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Income we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeUpsertArgs>(
      args: SelectSubset<T, IncomeUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Find one Income that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {IncomeFindUniqueOrThrowArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IncomeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IncomeFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Find the first Income that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindFirstOrThrowArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IncomeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IncomeFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Count the number of Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCountArgs} args - Arguments to filter Incomes to count.
     * @example
     * // Count the number of Incomes
     * const count = await prisma.income.count({
     *   where: {
     *     // ... the filter for the Incomes we want to count
     *   }
     * })
    **/
    count<T extends IncomeCountArgs>(
      args?: Subset<T, IncomeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncomeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Income.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncomeAggregateArgs>(args: Subset<T, IncomeAggregateArgs>): PrismaPromise<GetIncomeAggregateType<T>>

    /**
     * Group by Income.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IncomeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncomeGroupByArgs['orderBy'] }
        : { orderBy?: IncomeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IncomeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Income.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__IncomeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    budget<T extends BudgetArgs = {}>(args?: Subset<T, BudgetArgs>): CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Income base type for findUnique actions
   */
  export type IncomeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Income to fetch.
     * 
    **/
    where: IncomeWhereUniqueInput
  }

  /**
   * Income: findUnique
   */
  export interface IncomeFindUniqueArgs extends IncomeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Income base type for findFirst actions
   */
  export type IncomeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Income to fetch.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incomes.
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incomes.
     * 
    **/
    distinct?: Enumerable<IncomeScalarFieldEnum>
  }

  /**
   * Income: findFirst
   */
  export interface IncomeFindFirstArgs extends IncomeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Income findMany
   */
  export type IncomeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Incomes to fetch.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Incomes.
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IncomeScalarFieldEnum>
  }


  /**
   * Income create
   */
  export type IncomeCreateArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The data needed to create a Income.
     * 
    **/
    data: XOR<IncomeCreateInput, IncomeUncheckedCreateInput>
  }


  /**
   * Income createMany
   */
  export type IncomeCreateManyArgs = {
    /**
     * The data used to create many Incomes.
     * 
    **/
    data: Enumerable<IncomeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Income update
   */
  export type IncomeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The data needed to update a Income.
     * 
    **/
    data: XOR<IncomeUpdateInput, IncomeUncheckedUpdateInput>
    /**
     * Choose, which Income to update.
     * 
    **/
    where: IncomeWhereUniqueInput
  }


  /**
   * Income updateMany
   */
  export type IncomeUpdateManyArgs = {
    /**
     * The data used to update Incomes.
     * 
    **/
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyInput>
    /**
     * Filter which Incomes to update
     * 
    **/
    where?: IncomeWhereInput
  }


  /**
   * Income upsert
   */
  export type IncomeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The filter to search for the Income to update in case it exists.
     * 
    **/
    where: IncomeWhereUniqueInput
    /**
     * In case the Income found by the `where` argument doesn't exist, create a new Income with this data.
     * 
    **/
    create: XOR<IncomeCreateInput, IncomeUncheckedCreateInput>
    /**
     * In case the Income was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IncomeUpdateInput, IncomeUncheckedUpdateInput>
  }


  /**
   * Income delete
   */
  export type IncomeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter which Income to delete.
     * 
    **/
    where: IncomeWhereUniqueInput
  }


  /**
   * Income deleteMany
   */
  export type IncomeDeleteManyArgs = {
    /**
     * Filter which Incomes to delete
     * 
    **/
    where?: IncomeWhereInput
  }


  /**
   * Income: findUniqueOrThrow
   */
  export type IncomeFindUniqueOrThrowArgs = IncomeFindUniqueArgsBase
      

  /**
   * Income: findFirstOrThrow
   */
  export type IncomeFindFirstOrThrowArgs = IncomeFindFirstArgsBase
      

  /**
   * Income without action
   */
  export type IncomeArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
  }



  /**
   * Model Budget
   */


  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type BudgetMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type BudgetAggregateArgs = {
    /**
     * Filter which Budget to aggregate.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs = {
    where?: BudgetWhereInput
    orderBy?: Enumerable<BudgetOrderByWithAggregationInput>
    by: Array<BudgetScalarFieldEnum>
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }


  export type BudgetGroupByOutputType = {
    id: string
    name: string
    userId: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: BudgetCountAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect = {
    id?: boolean
    name?: boolean
    userId?: boolean
    User?: boolean | UserArgs
    Children?: boolean | BudgetItemFindManyArgs
    income?: boolean | IncomeFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
    _count?: boolean | BudgetCountOutputTypeArgs
  }

  export type BudgetInclude = {
    User?: boolean | UserArgs
    Children?: boolean | BudgetItemFindManyArgs
    income?: boolean | IncomeFindManyArgs
    _count?: boolean | BudgetCountOutputTypeArgs
  }

  export type BudgetGetPayload<
    S extends boolean | null | undefined | BudgetArgs,
    U = keyof S
      > = S extends true
        ? Budget
    : S extends undefined
    ? never
    : S extends BudgetArgs | BudgetFindManyArgs
    ?'include' extends U
    ? Budget  & {
    [P in TrueKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'Children' ? Array < BudgetItemGetPayload<S['include'][P]>>  :
        P extends 'income' ? Array < IncomeGetPayload<S['include'][P]>>  :
        P extends '_count' ? BudgetCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'Children' ? Array < BudgetItemGetPayload<S['select'][P]>>  :
        P extends 'income' ? Array < IncomeGetPayload<S['select'][P]>>  :
        P extends '_count' ? BudgetCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Budget ? Budget[P] : never
  } 
    : Budget
  : Budget


  type BudgetCountArgs = Merge<
    Omit<BudgetFindManyArgs, 'select' | 'include'> & {
      select?: BudgetCountAggregateInputType | true
    }
  >

  export interface BudgetDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BudgetFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BudgetFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BudgetFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BudgetFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BudgetFindManyArgs>(
      args?: SelectSubset<T, BudgetFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Budget>>, PrismaPromise<Array<BudgetGetPayload<T>>>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
    **/
    create<T extends BudgetCreateArgs>(
      args: SelectSubset<T, BudgetCreateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Create many Budgets.
     *     @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     *     @example
     *     // Create many Budgets
     *     const budget = await prisma.budget.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BudgetCreateManyArgs>(
      args?: SelectSubset<T, BudgetCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
    **/
    delete<T extends BudgetDeleteArgs>(
      args: SelectSubset<T, BudgetDeleteArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BudgetUpdateArgs>(
      args: SelectSubset<T, BudgetUpdateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BudgetDeleteManyArgs>(
      args?: SelectSubset<T, BudgetDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BudgetUpdateManyArgs>(
      args: SelectSubset<T, BudgetUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
    **/
    upsert<T extends BudgetUpsertArgs>(
      args: SelectSubset<T, BudgetUpsertArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Find one Budget that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BudgetFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Find the first Budget that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BudgetFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BudgetClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    Children<T extends BudgetItemFindManyArgs = {}>(args?: Subset<T, BudgetItemFindManyArgs>): CheckSelect<T, PrismaPromise<Array<BudgetItem>>, PrismaPromise<Array<BudgetItemGetPayload<T>>>>;

    income<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income>>, PrismaPromise<Array<IncomeGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Budget base type for findUnique actions
   */
  export type BudgetFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budget to fetch.
     * 
    **/
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget: findUnique
   */
  export interface BudgetFindUniqueArgs extends BudgetFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Budget base type for findFirst actions
   */
  export type BudgetFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budget to fetch.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     * 
    **/
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }

  /**
   * Budget: findFirst
   */
  export interface BudgetFindFirstArgs extends BudgetFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budgets to fetch.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }


  /**
   * Budget create
   */
  export type BudgetCreateArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to create a Budget.
     * 
    **/
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }


  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs = {
    /**
     * The data used to create many Budgets.
     * 
    **/
    data: Enumerable<BudgetCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Budget update
   */
  export type BudgetUpdateArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to update a Budget.
     * 
    **/
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     * 
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs = {
    /**
     * The data used to update Budgets.
     * 
    **/
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     * 
    **/
    where?: BudgetWhereInput
  }


  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The filter to search for the Budget to update in case it exists.
     * 
    **/
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     * 
    **/
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }


  /**
   * Budget delete
   */
  export type BudgetDeleteArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter which Budget to delete.
     * 
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs = {
    /**
     * Filter which Budgets to delete
     * 
    **/
    where?: BudgetWhereInput
  }


  /**
   * Budget: findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs = BudgetFindUniqueArgsBase
      

  /**
   * Budget: findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs = BudgetFindFirstArgsBase
      

  /**
   * Budget without action
   */
  export type BudgetArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
  }



  /**
   * Model BudgetItem
   */


  export type AggregateBudgetItem = {
    _count: BudgetItemCountAggregateOutputType | null
    _min: BudgetItemMinAggregateOutputType | null
    _max: BudgetItemMaxAggregateOutputType | null
  }

  export type BudgetItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    amount: string | null
    frequency: string | null
    budgetId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type BudgetItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    amount: string | null
    frequency: string | null
    budgetId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deleted: boolean | null
    deletedAt: Date | null
  }

  export type BudgetItemCountAggregateOutputType = {
    id: number
    name: number
    category: number
    amount: number
    frequency: number
    budgetId: number
    createdAt: number
    updatedAt: number
    deleted: number
    deletedAt: number
    _all: number
  }


  export type BudgetItemMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    amount?: true
    frequency?: true
    budgetId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type BudgetItemMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    amount?: true
    frequency?: true
    budgetId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
  }

  export type BudgetItemCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    amount?: true
    frequency?: true
    budgetId?: true
    createdAt?: true
    updatedAt?: true
    deleted?: true
    deletedAt?: true
    _all?: true
  }

  export type BudgetItemAggregateArgs = {
    /**
     * Filter which BudgetItem to aggregate.
     * 
    **/
    where?: BudgetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetItems to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BudgetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BudgetItems
    **/
    _count?: true | BudgetItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetItemMaxAggregateInputType
  }

  export type GetBudgetItemAggregateType<T extends BudgetItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgetItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgetItem[P]>
      : GetScalarType<T[P], AggregateBudgetItem[P]>
  }




  export type BudgetItemGroupByArgs = {
    where?: BudgetItemWhereInput
    orderBy?: Enumerable<BudgetItemOrderByWithAggregationInput>
    by: Array<BudgetItemScalarFieldEnum>
    having?: BudgetItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetItemCountAggregateInputType | true
    _min?: BudgetItemMinAggregateInputType
    _max?: BudgetItemMaxAggregateInputType
  }


  export type BudgetItemGroupByOutputType = {
    id: string
    name: string
    category: string
    amount: string
    frequency: string
    budgetId: string
    createdAt: Date
    updatedAt: Date
    deleted: boolean
    deletedAt: Date | null
    _count: BudgetItemCountAggregateOutputType | null
    _min: BudgetItemMinAggregateOutputType | null
    _max: BudgetItemMaxAggregateOutputType | null
  }

  type GetBudgetItemGroupByPayload<T extends BudgetItemGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BudgetItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetItemGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetItemGroupByOutputType[P]>
        }
      >
    >


  export type BudgetItemSelect = {
    id?: boolean
    name?: boolean
    category?: boolean
    amount?: boolean
    frequency?: boolean
    budgetId?: boolean
    budget?: boolean | BudgetArgs
    createdAt?: boolean
    updatedAt?: boolean
    deleted?: boolean
    deletedAt?: boolean
  }

  export type BudgetItemInclude = {
    budget?: boolean | BudgetArgs
  }

  export type BudgetItemGetPayload<
    S extends boolean | null | undefined | BudgetItemArgs,
    U = keyof S
      > = S extends true
        ? BudgetItem
    : S extends undefined
    ? never
    : S extends BudgetItemArgs | BudgetItemFindManyArgs
    ?'include' extends U
    ? BudgetItem  & {
    [P in TrueKeys<S['include']>]:
        P extends 'budget' ? BudgetGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'budget' ? BudgetGetPayload<S['select'][P]> :  P extends keyof BudgetItem ? BudgetItem[P] : never
  } 
    : BudgetItem
  : BudgetItem


  type BudgetItemCountArgs = Merge<
    Omit<BudgetItemFindManyArgs, 'select' | 'include'> & {
      select?: BudgetItemCountAggregateInputType | true
    }
  >

  export interface BudgetItemDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one BudgetItem that matches the filter.
     * @param {BudgetItemFindUniqueArgs} args - Arguments to find a BudgetItem
     * @example
     * // Get one BudgetItem
     * const budgetItem = await prisma.budgetItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BudgetItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BudgetItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'BudgetItem'> extends True ? CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>> : CheckSelect<T, Prisma__BudgetItemClient<BudgetItem | null >, Prisma__BudgetItemClient<BudgetItemGetPayload<T> | null >>

    /**
     * Find the first BudgetItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemFindFirstArgs} args - Arguments to find a BudgetItem
     * @example
     * // Get one BudgetItem
     * const budgetItem = await prisma.budgetItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BudgetItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BudgetItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'BudgetItem'> extends True ? CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>> : CheckSelect<T, Prisma__BudgetItemClient<BudgetItem | null >, Prisma__BudgetItemClient<BudgetItemGetPayload<T> | null >>

    /**
     * Find zero or more BudgetItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BudgetItems
     * const budgetItems = await prisma.budgetItem.findMany()
     * 
     * // Get first 10 BudgetItems
     * const budgetItems = await prisma.budgetItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetItemWithIdOnly = await prisma.budgetItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BudgetItemFindManyArgs>(
      args?: SelectSubset<T, BudgetItemFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<BudgetItem>>, PrismaPromise<Array<BudgetItemGetPayload<T>>>>

    /**
     * Create a BudgetItem.
     * @param {BudgetItemCreateArgs} args - Arguments to create a BudgetItem.
     * @example
     * // Create one BudgetItem
     * const BudgetItem = await prisma.budgetItem.create({
     *   data: {
     *     // ... data to create a BudgetItem
     *   }
     * })
     * 
    **/
    create<T extends BudgetItemCreateArgs>(
      args: SelectSubset<T, BudgetItemCreateArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Create many BudgetItems.
     *     @param {BudgetItemCreateManyArgs} args - Arguments to create many BudgetItems.
     *     @example
     *     // Create many BudgetItems
     *     const budgetItem = await prisma.budgetItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BudgetItemCreateManyArgs>(
      args?: SelectSubset<T, BudgetItemCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a BudgetItem.
     * @param {BudgetItemDeleteArgs} args - Arguments to delete one BudgetItem.
     * @example
     * // Delete one BudgetItem
     * const BudgetItem = await prisma.budgetItem.delete({
     *   where: {
     *     // ... filter to delete one BudgetItem
     *   }
     * })
     * 
    **/
    delete<T extends BudgetItemDeleteArgs>(
      args: SelectSubset<T, BudgetItemDeleteArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Update one BudgetItem.
     * @param {BudgetItemUpdateArgs} args - Arguments to update one BudgetItem.
     * @example
     * // Update one BudgetItem
     * const budgetItem = await prisma.budgetItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BudgetItemUpdateArgs>(
      args: SelectSubset<T, BudgetItemUpdateArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Delete zero or more BudgetItems.
     * @param {BudgetItemDeleteManyArgs} args - Arguments to filter BudgetItems to delete.
     * @example
     * // Delete a few BudgetItems
     * const { count } = await prisma.budgetItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BudgetItemDeleteManyArgs>(
      args?: SelectSubset<T, BudgetItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BudgetItems
     * const budgetItem = await prisma.budgetItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BudgetItemUpdateManyArgs>(
      args: SelectSubset<T, BudgetItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one BudgetItem.
     * @param {BudgetItemUpsertArgs} args - Arguments to update or create a BudgetItem.
     * @example
     * // Update or create a BudgetItem
     * const budgetItem = await prisma.budgetItem.upsert({
     *   create: {
     *     // ... data to create a BudgetItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BudgetItem we want to update
     *   }
     * })
    **/
    upsert<T extends BudgetItemUpsertArgs>(
      args: SelectSubset<T, BudgetItemUpsertArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Find one BudgetItem that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BudgetItemFindUniqueOrThrowArgs} args - Arguments to find a BudgetItem
     * @example
     * // Get one BudgetItem
     * const budgetItem = await prisma.budgetItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BudgetItemFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BudgetItemFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Find the first BudgetItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemFindFirstOrThrowArgs} args - Arguments to find a BudgetItem
     * @example
     * // Get one BudgetItem
     * const budgetItem = await prisma.budgetItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BudgetItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BudgetItemFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetItemClient<BudgetItem>, Prisma__BudgetItemClient<BudgetItemGetPayload<T>>>

    /**
     * Count the number of BudgetItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemCountArgs} args - Arguments to filter BudgetItems to count.
     * @example
     * // Count the number of BudgetItems
     * const count = await prisma.budgetItem.count({
     *   where: {
     *     // ... the filter for the BudgetItems we want to count
     *   }
     * })
    **/
    count<T extends BudgetItemCountArgs>(
      args?: Subset<T, BudgetItemCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BudgetItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetItemAggregateArgs>(args: Subset<T, BudgetItemAggregateArgs>): PrismaPromise<GetBudgetItemAggregateType<T>>

    /**
     * Group by BudgetItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetItemGroupByArgs['orderBy'] }
        : { orderBy?: BudgetItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetItemGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for BudgetItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BudgetItemClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    budget<T extends BudgetArgs = {}>(args?: Subset<T, BudgetArgs>): CheckSelect<T, Prisma__BudgetClient<Budget | null >, Prisma__BudgetClient<BudgetGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * BudgetItem base type for findUnique actions
   */
  export type BudgetItemFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * Filter, which BudgetItem to fetch.
     * 
    **/
    where: BudgetItemWhereUniqueInput
  }

  /**
   * BudgetItem: findUnique
   */
  export interface BudgetItemFindUniqueArgs extends BudgetItemFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BudgetItem base type for findFirst actions
   */
  export type BudgetItemFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * Filter, which BudgetItem to fetch.
     * 
    **/
    where?: BudgetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetItems to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetItems.
     * 
    **/
    cursor?: BudgetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetItems.
     * 
    **/
    distinct?: Enumerable<BudgetItemScalarFieldEnum>
  }

  /**
   * BudgetItem: findFirst
   */
  export interface BudgetItemFindFirstArgs extends BudgetItemFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BudgetItem findMany
   */
  export type BudgetItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * Filter, which BudgetItems to fetch.
     * 
    **/
    where?: BudgetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetItems to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BudgetItems.
     * 
    **/
    cursor?: BudgetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetItems.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BudgetItemScalarFieldEnum>
  }


  /**
   * BudgetItem create
   */
  export type BudgetItemCreateArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * The data needed to create a BudgetItem.
     * 
    **/
    data: XOR<BudgetItemCreateInput, BudgetItemUncheckedCreateInput>
  }


  /**
   * BudgetItem createMany
   */
  export type BudgetItemCreateManyArgs = {
    /**
     * The data used to create many BudgetItems.
     * 
    **/
    data: Enumerable<BudgetItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * BudgetItem update
   */
  export type BudgetItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * The data needed to update a BudgetItem.
     * 
    **/
    data: XOR<BudgetItemUpdateInput, BudgetItemUncheckedUpdateInput>
    /**
     * Choose, which BudgetItem to update.
     * 
    **/
    where: BudgetItemWhereUniqueInput
  }


  /**
   * BudgetItem updateMany
   */
  export type BudgetItemUpdateManyArgs = {
    /**
     * The data used to update BudgetItems.
     * 
    **/
    data: XOR<BudgetItemUpdateManyMutationInput, BudgetItemUncheckedUpdateManyInput>
    /**
     * Filter which BudgetItems to update
     * 
    **/
    where?: BudgetItemWhereInput
  }


  /**
   * BudgetItem upsert
   */
  export type BudgetItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * The filter to search for the BudgetItem to update in case it exists.
     * 
    **/
    where: BudgetItemWhereUniqueInput
    /**
     * In case the BudgetItem found by the `where` argument doesn't exist, create a new BudgetItem with this data.
     * 
    **/
    create: XOR<BudgetItemCreateInput, BudgetItemUncheckedCreateInput>
    /**
     * In case the BudgetItem was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BudgetItemUpdateInput, BudgetItemUncheckedUpdateInput>
  }


  /**
   * BudgetItem delete
   */
  export type BudgetItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
    /**
     * Filter which BudgetItem to delete.
     * 
    **/
    where: BudgetItemWhereUniqueInput
  }


  /**
   * BudgetItem deleteMany
   */
  export type BudgetItemDeleteManyArgs = {
    /**
     * Filter which BudgetItems to delete
     * 
    **/
    where?: BudgetItemWhereInput
  }


  /**
   * BudgetItem: findUniqueOrThrow
   */
  export type BudgetItemFindUniqueOrThrowArgs = BudgetItemFindUniqueArgsBase
      

  /**
   * BudgetItem: findFirstOrThrow
   */
  export type BudgetItemFindFirstOrThrowArgs = BudgetItemFindFirstArgsBase
      

  /**
   * BudgetItem without action
   */
  export type BudgetItemArgs = {
    /**
     * Select specific fields to fetch from the BudgetItem
     * 
    **/
    select?: BudgetItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetItemInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountScalarFieldEnum: {
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

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleted: 'deleted'
  };

  export type LogScalarFieldEnum = (typeof LogScalarFieldEnum)[keyof typeof LogScalarFieldEnum]


  export const CryptoSnapshotScalarFieldEnum: {
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
  };

  export type CryptoSnapshotScalarFieldEnum = (typeof CryptoSnapshotScalarFieldEnum)[keyof typeof CryptoSnapshotScalarFieldEnum]


  export const CashSnapshotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalValue: 'totalValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleted: 'deleted',
    deletedAt: 'deletedAt'
  };

  export type CashSnapshotScalarFieldEnum = (typeof CashSnapshotScalarFieldEnum)[keyof typeof CashSnapshotScalarFieldEnum]


  export const PropertySnapshotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalValue: 'totalValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleted: 'deleted',
    deletedAt: 'deletedAt'
  };

  export type PropertySnapshotScalarFieldEnum = (typeof PropertySnapshotScalarFieldEnum)[keyof typeof PropertySnapshotScalarFieldEnum]


  export const SecuritySnapshotScalarFieldEnum: {
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
  };

  export type SecuritySnapshotScalarFieldEnum = (typeof SecuritySnapshotScalarFieldEnum)[keyof typeof SecuritySnapshotScalarFieldEnum]


  export const PortfolioSnapshotScalarFieldEnum: {
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

  export type PortfolioSnapshotScalarFieldEnum = (typeof PortfolioSnapshotScalarFieldEnum)[keyof typeof PortfolioSnapshotScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
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

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const CryptocurrencyScalarFieldEnum: {
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
  };

  export type CryptocurrencyScalarFieldEnum = (typeof CryptocurrencyScalarFieldEnum)[keyof typeof CryptocurrencyScalarFieldEnum]


  export const MarketScalarFieldEnum: {
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

  export type MarketScalarFieldEnum = (typeof MarketScalarFieldEnum)[keyof typeof MarketScalarFieldEnum]


  export const IncomeScalarFieldEnum: {
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

  export type IncomeScalarFieldEnum = (typeof IncomeScalarFieldEnum)[keyof typeof IncomeScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleted: 'deleted',
    deletedAt: 'deletedAt'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const BudgetItemScalarFieldEnum: {
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
  };

  export type BudgetItemScalarFieldEnum = (typeof BudgetItemScalarFieldEnum)[keyof typeof BudgetItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
    session_state?: StringNullableWithAggregatesFilter | string | null
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = {
    id?: string
    sessionToken?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sessionToken?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
    role?: EnumRoleFilter | Role
    accounts?: AccountListRelationFilter
    budget?: BudgetListRelationFilter
    cryptocurrency?: CryptocurrencyListRelationFilter
    sessions?: SessionListRelationFilter
    settings?: XOR<SettingsRelationFilter, SettingsWhereInput> | null
    portfolioSnapshot?: PortfolioSnapshotListRelationFilter
    cryptoSnapshots?: CryptoSnapshotListRelationFilter
    cashSnapshots?: CashSnapshotListRelationFilter
    propertySnapshots?: PropertySnapshotListRelationFilter
    securitySnapshots?: SecuritySnapshotListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    role?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    budget?: BudgetOrderByRelationAggregateInput
    cryptocurrency?: CryptocurrencyOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    settings?: SettingsOrderByWithRelationInput
    portfolioSnapshot?: PortfolioSnapshotOrderByRelationAggregateInput
    cryptoSnapshots?: CryptoSnapshotOrderByRelationAggregateInput
    cashSnapshots?: CashSnapshotOrderByRelationAggregateInput
    propertySnapshots?: PropertySnapshotOrderByRelationAggregateInput
    securitySnapshots?: SecuritySnapshotOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    role?: EnumRoleWithAggregatesFilter | Role
  }

  export type LogWhereInput = {
    AND?: Enumerable<LogWhereInput>
    OR?: Enumerable<LogWhereInput>
    NOT?: Enumerable<LogWhereInput>
    id?: StringFilter | string
    type?: EnumLogTypeFilter | LogType
    message?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
  }

  export type LogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
  }

  export type LogWhereUniqueInput = {
    id?: string
  }

  export type LogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    _count?: LogCountOrderByAggregateInput
    _max?: LogMaxOrderByAggregateInput
    _min?: LogMinOrderByAggregateInput
  }

  export type LogScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LogScalarWhereWithAggregatesInput>
    OR?: Enumerable<LogScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LogScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    type?: EnumLogTypeWithAggregatesFilter | LogType
    message?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
  }

  export type CryptoSnapshotWhereInput = {
    AND?: Enumerable<CryptoSnapshotWhereInput>
    OR?: Enumerable<CryptoSnapshotWhereInput>
    NOT?: Enumerable<CryptoSnapshotWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CryptoSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptoSnapshotWhereUniqueInput = {
    id?: string
  }

  export type CryptoSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: CryptoSnapshotCountOrderByAggregateInput
    _avg?: CryptoSnapshotAvgOrderByAggregateInput
    _max?: CryptoSnapshotMaxOrderByAggregateInput
    _min?: CryptoSnapshotMinOrderByAggregateInput
    _sum?: CryptoSnapshotSumOrderByAggregateInput
  }

  export type CryptoSnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CryptoSnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<CryptoSnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CryptoSnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    totalValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type CashSnapshotWhereInput = {
    AND?: Enumerable<CashSnapshotWhereInput>
    OR?: Enumerable<CashSnapshotWhereInput>
    NOT?: Enumerable<CashSnapshotWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CashSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CashSnapshotWhereUniqueInput = {
    id?: string
  }

  export type CashSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: CashSnapshotCountOrderByAggregateInput
    _avg?: CashSnapshotAvgOrderByAggregateInput
    _max?: CashSnapshotMaxOrderByAggregateInput
    _min?: CashSnapshotMinOrderByAggregateInput
    _sum?: CashSnapshotSumOrderByAggregateInput
  }

  export type CashSnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CashSnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<CashSnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CashSnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    totalValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type PropertySnapshotWhereInput = {
    AND?: Enumerable<PropertySnapshotWhereInput>
    OR?: Enumerable<PropertySnapshotWhereInput>
    NOT?: Enumerable<PropertySnapshotWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type PropertySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PropertySnapshotWhereUniqueInput = {
    id?: string
  }

  export type PropertySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: PropertySnapshotCountOrderByAggregateInput
    _avg?: PropertySnapshotAvgOrderByAggregateInput
    _max?: PropertySnapshotMaxOrderByAggregateInput
    _min?: PropertySnapshotMinOrderByAggregateInput
    _sum?: PropertySnapshotSumOrderByAggregateInput
  }

  export type PropertySnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PropertySnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<PropertySnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PropertySnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    totalValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type SecuritySnapshotWhereInput = {
    AND?: Enumerable<SecuritySnapshotWhereInput>
    OR?: Enumerable<SecuritySnapshotWhereInput>
    NOT?: Enumerable<SecuritySnapshotWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type SecuritySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SecuritySnapshotWhereUniqueInput = {
    id?: string
  }

  export type SecuritySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: SecuritySnapshotCountOrderByAggregateInput
    _avg?: SecuritySnapshotAvgOrderByAggregateInput
    _max?: SecuritySnapshotMaxOrderByAggregateInput
    _min?: SecuritySnapshotMinOrderByAggregateInput
    _sum?: SecuritySnapshotSumOrderByAggregateInput
  }

  export type SecuritySnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SecuritySnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<SecuritySnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SecuritySnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    totalValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type PortfolioSnapshotWhereInput = {
    AND?: Enumerable<PortfolioSnapshotWhereInput>
    OR?: Enumerable<PortfolioSnapshotWhereInput>
    NOT?: Enumerable<PortfolioSnapshotWhereInput>
    id?: StringFilter | string
    currency?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type PortfolioSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    currency?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PortfolioSnapshotWhereUniqueInput = {
    id?: string
    createdAt_userId?: PortfolioSnapshotCreatedAtUserIdCompoundUniqueInput
  }

  export type PortfolioSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    currency?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: PortfolioSnapshotCountOrderByAggregateInput
    _avg?: PortfolioSnapshotAvgOrderByAggregateInput
    _max?: PortfolioSnapshotMaxOrderByAggregateInput
    _min?: PortfolioSnapshotMinOrderByAggregateInput
    _sum?: PortfolioSnapshotSumOrderByAggregateInput
  }

  export type PortfolioSnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PortfolioSnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<PortfolioSnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PortfolioSnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    currency?: StringWithAggregatesFilter | string
    totalValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    userId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type SettingsWhereInput = {
    AND?: Enumerable<SettingsWhereInput>
    OR?: Enumerable<SettingsWhereInput>
    NOT?: Enumerable<SettingsWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    preferredColorScheme?: EnumColorSchemeNullableFilter | ColorScheme | null
    userCurrency?: StringFilter | string
    userLanguage?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    preferredColorScheme?: SortOrder
    userCurrency?: SortOrder
    userLanguage?: SortOrder
    user?: UserOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = {
    id?: string
    userId?: string
    id_userId?: SettingsIdUserIdCompoundUniqueInput
  }

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    preferredColorScheme?: SortOrder
    userCurrency?: SortOrder
    userLanguage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SettingsScalarWhereWithAggregatesInput>
    OR?: Enumerable<SettingsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SettingsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    preferredColorScheme?: EnumColorSchemeNullableWithAggregatesFilter | ColorScheme | null
    userCurrency?: StringWithAggregatesFilter | string
    userLanguage?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type CryptocurrencyWhereInput = {
    AND?: Enumerable<CryptocurrencyWhereInput>
    OR?: Enumerable<CryptocurrencyWhereInput>
    NOT?: Enumerable<CryptocurrencyWhereInput>
    id?: StringFilter | string
    displayName?: StringFilter | string
    currency?: StringFilter | string
    balance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    walletAddress?: StringNullableFilter | string | null
    targetBalance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFilter | Decimal | DecimalJsLike | number | string
    accountConnection?: EnumAccountConnectionNullableFilter | AccountConnection | null
    apiKey?: StringNullableFilter | string | null
    apiSecret?: StringNullableFilter | string | null
    marketId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    parentId?: StringNullableFilter | string | null
    market?: XOR<MarketRelationFilter, MarketWhereInput> | null
    parent?: XOR<CryptocurrencyRelationFilter, CryptocurrencyWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    Children?: CryptocurrencyListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CryptocurrencyOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    walletAddress?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
    accountConnection?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    marketId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    market?: MarketOrderByWithRelationInput
    parent?: CryptocurrencyOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    Children?: CryptocurrencyOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptocurrencyWhereUniqueInput = {
    id?: string
  }

  export type CryptocurrencyOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    walletAddress?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
    accountConnection?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    marketId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: CryptocurrencyCountOrderByAggregateInput
    _avg?: CryptocurrencyAvgOrderByAggregateInput
    _max?: CryptocurrencyMaxOrderByAggregateInput
    _min?: CryptocurrencyMinOrderByAggregateInput
    _sum?: CryptocurrencySumOrderByAggregateInput
  }

  export type CryptocurrencyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CryptocurrencyScalarWhereWithAggregatesInput>
    OR?: Enumerable<CryptocurrencyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CryptocurrencyScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    displayName?: StringWithAggregatesFilter | string
    currency?: StringWithAggregatesFilter | string
    balance?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    walletAddress?: StringNullableWithAggregatesFilter | string | null
    targetBalance?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    accountConnection?: EnumAccountConnectionNullableWithAggregatesFilter | AccountConnection | null
    apiKey?: StringNullableWithAggregatesFilter | string | null
    apiSecret?: StringNullableWithAggregatesFilter | string | null
    marketId?: StringNullableWithAggregatesFilter | string | null
    userId?: StringWithAggregatesFilter | string
    parentId?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type MarketWhereInput = {
    AND?: Enumerable<MarketWhereInput>
    OR?: Enumerable<MarketWhereInput>
    NOT?: Enumerable<MarketWhereInput>
    name?: StringFilter | string
    ticker?: StringFilter | string
    description?: StringNullableFilter | string | null
    currency?: StringFilter | string
    price?: DecimalFilter | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFilter | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFilter | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFilter | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFilter | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFilter | MarketType
    image?: StringNullableFilter | string | null
    Cryptocurrency?: CryptocurrencyListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type MarketOrderByWithRelationInput = {
    name?: SortOrder
    ticker?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
    type?: SortOrder
    image?: SortOrder
    Cryptocurrency?: CryptocurrencyOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type MarketWhereUniqueInput = {
    ticker?: string
    name_ticker_type?: MarketNameTickerTypeCompoundUniqueInput
  }

  export type MarketOrderByWithAggregationInput = {
    name?: SortOrder
    ticker?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
    type?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: MarketCountOrderByAggregateInput
    _avg?: MarketAvgOrderByAggregateInput
    _max?: MarketMaxOrderByAggregateInput
    _min?: MarketMinOrderByAggregateInput
    _sum?: MarketSumOrderByAggregateInput
  }

  export type MarketScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MarketScalarWhereWithAggregatesInput>
    OR?: Enumerable<MarketScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MarketScalarWhereWithAggregatesInput>
    name?: StringWithAggregatesFilter | string
    ticker?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    currency?: StringWithAggregatesFilter | string
    price?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeWithAggregatesFilter | MarketType
    image?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type IncomeWhereInput = {
    AND?: Enumerable<IncomeWhereInput>
    OR?: Enumerable<IncomeWhereInput>
    NOT?: Enumerable<IncomeWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    payFrequency?: StringFilter | string
    grossAmount?: StringFilter | string
    grossFrequency?: StringFilter | string
    userId?: StringFilter | string
    budget?: XOR<BudgetRelationFilter, BudgetWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type IncomeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    payFrequency?: SortOrder
    grossAmount?: SortOrder
    grossFrequency?: SortOrder
    userId?: SortOrder
    budget?: BudgetOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type IncomeWhereUniqueInput = {
    id?: string
  }

  export type IncomeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    payFrequency?: SortOrder
    grossAmount?: SortOrder
    grossFrequency?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: IncomeCountOrderByAggregateInput
    _max?: IncomeMaxOrderByAggregateInput
    _min?: IncomeMinOrderByAggregateInput
  }

  export type IncomeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    payFrequency?: StringWithAggregatesFilter | string
    grossAmount?: StringWithAggregatesFilter | string
    grossFrequency?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type BudgetWhereInput = {
    AND?: Enumerable<BudgetWhereInput>
    OR?: Enumerable<BudgetWhereInput>
    NOT?: Enumerable<BudgetWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    userId?: StringFilter | string
    User?: XOR<UserRelationFilter, UserWhereInput>
    Children?: BudgetItemListRelationFilter
    income?: IncomeListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
    Children?: BudgetItemOrderByRelationAggregateInput
    income?: IncomeOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetWhereUniqueInput = {
    id?: string
  }

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    OR?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type BudgetItemWhereInput = {
    AND?: Enumerable<BudgetItemWhereInput>
    OR?: Enumerable<BudgetItemWhereInput>
    NOT?: Enumerable<BudgetItemWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    category?: StringFilter | string
    amount?: StringFilter | string
    frequency?: StringFilter | string
    budgetId?: StringFilter | string
    budget?: XOR<BudgetRelationFilter, BudgetWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type BudgetItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    budgetId?: SortOrder
    budget?: BudgetOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetItemWhereUniqueInput = {
    id?: string
  }

  export type BudgetItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    budgetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    _count?: BudgetItemCountOrderByAggregateInput
    _max?: BudgetItemMaxOrderByAggregateInput
    _min?: BudgetItemMinOrderByAggregateInput
  }

  export type BudgetItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BudgetItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<BudgetItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BudgetItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    category?: StringWithAggregatesFilter | string
    amount?: StringWithAggregatesFilter | string
    frequency?: StringWithAggregatesFilter | string
    budgetId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deleted?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
  }

  export type LogCreateInput = {
    id?: string
    type: LogType
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
  }

  export type LogUncheckedCreateInput = {
    id?: string
    type: LogType
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
  }

  export type LogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumLogTypeFieldUpdateOperationsInput | LogType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumLogTypeFieldUpdateOperationsInput | LogType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogCreateManyInput = {
    id?: string
    type: LogType
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
  }

  export type LogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumLogTypeFieldUpdateOperationsInput | LogType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumLogTypeFieldUpdateOperationsInput | LogType
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CryptoSnapshotCreateInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutCryptoSnapshotsInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutCryptoSnapshotsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotCreateManyInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotCreateInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutCashSnapshotsInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutCashSnapshotsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotCreateManyInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotCreateInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutPropertySnapshotsInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutPropertySnapshotsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotCreateManyInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotCreateInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutSecuritySnapshotsInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutSecuritySnapshotsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotCreateManyInput = {
    id?: string
    userId: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotCreateInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutPortfolioSnapshotInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PortfolioSnapshotUncheckedCreateInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PortfolioSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutPortfolioSnapshotNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotCreateManyInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PortfolioSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateInput = {
    id?: string
    preferredColorScheme?: ColorScheme | null
    userCurrency?: string
    userLanguage?: string
    user: UserCreateNestedOneWithoutSettingsInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    userId: string
    preferredColorScheme?: ColorScheme | null
    userCurrency?: string
    userLanguage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SettingsCreateManyInput = {
    id?: string
    userId: string
    preferredColorScheme?: ColorScheme | null
    userCurrency?: string
    userLanguage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyCreateInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    market?: MarketCreateNestedOneWithoutCryptocurrencyInput
    parent?: CryptocurrencyCreateNestedOneWithoutChildrenInput
    user: UserCreateNestedOneWithoutCryptocurrencyInput
    Children?: CryptocurrencyCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUncheckedCreateInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    userId: string
    parentId?: string | null
    Children?: CryptocurrencyUncheckedCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    market?: MarketUpdateOneWithoutCryptocurrencyNestedInput
    parent?: CryptocurrencyUpdateOneWithoutChildrenNestedInput
    user?: UserUpdateOneRequiredWithoutCryptocurrencyNestedInput
    Children?: CryptocurrencyUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    Children?: CryptocurrencyUncheckedUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyCreateManyInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MarketCreateInput = {
    name: string
    ticker: string
    description?: string | null
    currency: string
    price?: Decimal | DecimalJsLike | number | string
    priceChange24h?: Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: Decimal | DecimalJsLike | number | string
    marketCap?: Decimal | DecimalJsLike | number | string
    marketCapRank?: Decimal | DecimalJsLike | number | string
    type: MarketType
    image?: string | null
    Cryptocurrency?: CryptocurrencyCreateNestedManyWithoutMarketInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type MarketUncheckedCreateInput = {
    name: string
    ticker: string
    description?: string | null
    currency: string
    price?: Decimal | DecimalJsLike | number | string
    priceChange24h?: Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: Decimal | DecimalJsLike | number | string
    marketCap?: Decimal | DecimalJsLike | number | string
    marketCapRank?: Decimal | DecimalJsLike | number | string
    type: MarketType
    image?: string | null
    Cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutMarketInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type MarketUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    Cryptocurrency?: CryptocurrencyUpdateManyWithoutMarketNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MarketUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    Cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutMarketNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MarketCreateManyInput = {
    name: string
    ticker: string
    description?: string | null
    currency: string
    price?: Decimal | DecimalJsLike | number | string
    priceChange24h?: Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: Decimal | DecimalJsLike | number | string
    marketCap?: Decimal | DecimalJsLike | number | string
    marketCapRank?: Decimal | DecimalJsLike | number | string
    type: MarketType
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type MarketUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MarketUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeCreateInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    budget: BudgetCreateNestedOneWithoutIncomeInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeUncheckedCreateInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    budget?: BudgetUpdateOneRequiredWithoutIncomeNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeCreateManyInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetCreateInput = {
    id?: string
    name: string
    User: UserCreateNestedOneWithoutBudgetInput
    Children?: BudgetItemCreateNestedManyWithoutBudgetInput
    income?: IncomeCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    Children?: BudgetItemUncheckedCreateNestedManyWithoutBudgetInput
    income?: IncomeUncheckedCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutBudgetNestedInput
    Children?: BudgetItemUpdateManyWithoutBudgetNestedInput
    income?: IncomeUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Children?: BudgetItemUncheckedUpdateManyWithoutBudgetNestedInput
    income?: IncomeUncheckedUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetCreateManyInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemCreateInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    budget: BudgetCreateNestedOneWithoutChildrenInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    budgetId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    budget?: BudgetUpdateOneRequiredWithoutChildrenNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemCreateManyInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    budgetId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type CryptocurrencyListRelationFilter = {
    every?: CryptocurrencyWhereInput
    some?: CryptocurrencyWhereInput
    none?: CryptocurrencyWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SettingsRelationFilter = {
    is?: SettingsWhereInput | null
    isNot?: SettingsWhereInput | null
  }

  export type PortfolioSnapshotListRelationFilter = {
    every?: PortfolioSnapshotWhereInput
    some?: PortfolioSnapshotWhereInput
    none?: PortfolioSnapshotWhereInput
  }

  export type CryptoSnapshotListRelationFilter = {
    every?: CryptoSnapshotWhereInput
    some?: CryptoSnapshotWhereInput
    none?: CryptoSnapshotWhereInput
  }

  export type CashSnapshotListRelationFilter = {
    every?: CashSnapshotWhereInput
    some?: CashSnapshotWhereInput
    none?: CashSnapshotWhereInput
  }

  export type PropertySnapshotListRelationFilter = {
    every?: PropertySnapshotWhereInput
    some?: PropertySnapshotWhereInput
    none?: PropertySnapshotWhereInput
  }

  export type SecuritySnapshotListRelationFilter = {
    every?: SecuritySnapshotWhereInput
    some?: SecuritySnapshotWhereInput
    none?: SecuritySnapshotWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CryptocurrencyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CryptoSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CashSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertySnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SecuritySnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
    role?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type EnumLogTypeFilter = {
    equals?: LogType
    in?: Enumerable<LogType>
    notIn?: Enumerable<LogType>
    not?: NestedEnumLogTypeFilter | LogType
  }

  export type LogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
  }

  export type LogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
  }

  export type LogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
  }

  export type EnumLogTypeWithAggregatesFilter = {
    equals?: LogType
    in?: Enumerable<LogType>
    notIn?: Enumerable<LogType>
    not?: NestedEnumLogTypeWithAggregatesFilter | LogType
    _count?: NestedIntFilter
    _min?: NestedEnumLogTypeFilter
    _max?: NestedEnumLogTypeFilter
  }

  export type DecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type CryptoSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptoSnapshotAvgOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type CryptoSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptoSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptoSnapshotSumOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type DecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type CashSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CashSnapshotAvgOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type CashSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CashSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CashSnapshotSumOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type PropertySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PropertySnapshotAvgOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type PropertySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PropertySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PropertySnapshotSumOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type SecuritySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SecuritySnapshotAvgOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type SecuritySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SecuritySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SecuritySnapshotSumOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type PortfolioSnapshotCreatedAtUserIdCompoundUniqueInput = {
    createdAt: Date | string
    userId: string
  }

  export type PortfolioSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    currency?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PortfolioSnapshotAvgOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type PortfolioSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    currency?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PortfolioSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    currency?: SortOrder
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type PortfolioSnapshotSumOrderByAggregateInput = {
    totalValue?: SortOrder
    costBasis?: SortOrder
    unrealisedGain?: SortOrder
    realisedGain?: SortOrder
    saleableValue?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type EnumColorSchemeNullableFilter = {
    equals?: ColorScheme | null
    in?: Enumerable<ColorScheme> | null
    notIn?: Enumerable<ColorScheme> | null
    not?: NestedEnumColorSchemeNullableFilter | ColorScheme | null
  }

  export type SettingsIdUserIdCompoundUniqueInput = {
    id: string
    userId: string
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    preferredColorScheme?: SortOrder
    userCurrency?: SortOrder
    userLanguage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    preferredColorScheme?: SortOrder
    userCurrency?: SortOrder
    userLanguage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    preferredColorScheme?: SortOrder
    userCurrency?: SortOrder
    userLanguage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type EnumColorSchemeNullableWithAggregatesFilter = {
    equals?: ColorScheme | null
    in?: Enumerable<ColorScheme> | null
    notIn?: Enumerable<ColorScheme> | null
    not?: NestedEnumColorSchemeNullableWithAggregatesFilter | ColorScheme | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumColorSchemeNullableFilter
    _max?: NestedEnumColorSchemeNullableFilter
  }

  export type EnumAccountConnectionNullableFilter = {
    equals?: AccountConnection | null
    in?: Enumerable<AccountConnection> | null
    notIn?: Enumerable<AccountConnection> | null
    not?: NestedEnumAccountConnectionNullableFilter | AccountConnection | null
  }

  export type MarketRelationFilter = {
    is?: MarketWhereInput | null
    isNot?: MarketWhereInput | null
  }

  export type CryptocurrencyRelationFilter = {
    is?: CryptocurrencyWhereInput | null
    isNot?: CryptocurrencyWhereInput | null
  }

  export type CryptocurrencyCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    walletAddress?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
    accountConnection?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    marketId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptocurrencyAvgOrderByAggregateInput = {
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
  }

  export type CryptocurrencyMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    walletAddress?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
    accountConnection?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    marketId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptocurrencyMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    currency?: SortOrder
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    walletAddress?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
    accountConnection?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    marketId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type CryptocurrencySumOrderByAggregateInput = {
    balance?: SortOrder
    costBasis?: SortOrder
    realisedGain?: SortOrder
    targetBalance?: SortOrder
    interestBearingBalance?: SortOrder
    rateOfIncome?: SortOrder
  }

  export type EnumAccountConnectionNullableWithAggregatesFilter = {
    equals?: AccountConnection | null
    in?: Enumerable<AccountConnection> | null
    notIn?: Enumerable<AccountConnection> | null
    not?: NestedEnumAccountConnectionNullableWithAggregatesFilter | AccountConnection | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumAccountConnectionNullableFilter
    _max?: NestedEnumAccountConnectionNullableFilter
  }

  export type EnumMarketTypeFilter = {
    equals?: MarketType
    in?: Enumerable<MarketType>
    notIn?: Enumerable<MarketType>
    not?: NestedEnumMarketTypeFilter | MarketType
  }

  export type MarketNameTickerTypeCompoundUniqueInput = {
    name: string
    ticker: string
    type: MarketType
  }

  export type MarketCountOrderByAggregateInput = {
    name?: SortOrder
    ticker?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
    type?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type MarketAvgOrderByAggregateInput = {
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
  }

  export type MarketMaxOrderByAggregateInput = {
    name?: SortOrder
    ticker?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
    type?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type MarketMinOrderByAggregateInput = {
    name?: SortOrder
    ticker?: SortOrder
    description?: SortOrder
    currency?: SortOrder
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
    type?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type MarketSumOrderByAggregateInput = {
    price?: SortOrder
    priceChange24h?: SortOrder
    priceChange24hPercent?: SortOrder
    marketCap?: SortOrder
    marketCapRank?: SortOrder
  }

  export type EnumMarketTypeWithAggregatesFilter = {
    equals?: MarketType
    in?: Enumerable<MarketType>
    notIn?: Enumerable<MarketType>
    not?: NestedEnumMarketTypeWithAggregatesFilter | MarketType
    _count?: NestedIntFilter
    _min?: NestedEnumMarketTypeFilter
    _max?: NestedEnumMarketTypeFilter
  }

  export type BudgetRelationFilter = {
    is?: BudgetWhereInput
    isNot?: BudgetWhereInput
  }

  export type IncomeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    payFrequency?: SortOrder
    grossAmount?: SortOrder
    grossFrequency?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type IncomeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    payFrequency?: SortOrder
    grossAmount?: SortOrder
    grossFrequency?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type IncomeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    payFrequency?: SortOrder
    grossAmount?: SortOrder
    grossFrequency?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetItemListRelationFilter = {
    every?: BudgetItemWhereInput
    some?: BudgetItemWhereInput
    none?: BudgetItemWhereInput
  }

  export type IncomeListRelationFilter = {
    every?: IncomeWhereInput
    some?: IncomeWhereInput
    none?: IncomeWhereInput
  }

  export type BudgetItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IncomeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    budgetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    budgetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type BudgetItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    frequency?: SortOrder
    budgetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deleted?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BudgetCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  export type CryptocurrencyCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutUserInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutUserInput>
    createMany?: CryptocurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type SettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    connect?: SettingsWhereUniqueInput
  }

  export type PortfolioSnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PortfolioSnapshotCreateWithoutUserInput>, Enumerable<PortfolioSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PortfolioSnapshotCreateOrConnectWithoutUserInput>
    createMany?: PortfolioSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
  }

  export type CryptoSnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CryptoSnapshotCreateWithoutUserInput>, Enumerable<CryptoSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptoSnapshotCreateOrConnectWithoutUserInput>
    createMany?: CryptoSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<CryptoSnapshotWhereUniqueInput>
  }

  export type CashSnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CashSnapshotCreateWithoutUserInput>, Enumerable<CashSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CashSnapshotCreateOrConnectWithoutUserInput>
    createMany?: CashSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<CashSnapshotWhereUniqueInput>
  }

  export type PropertySnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PropertySnapshotCreateWithoutUserInput>, Enumerable<PropertySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PropertySnapshotCreateOrConnectWithoutUserInput>
    createMany?: PropertySnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<PropertySnapshotWhereUniqueInput>
  }

  export type SecuritySnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SecuritySnapshotCreateWithoutUserInput>, Enumerable<SecuritySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SecuritySnapshotCreateOrConnectWithoutUserInput>
    createMany?: SecuritySnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<SecuritySnapshotWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  export type CryptocurrencyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutUserInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutUserInput>
    createMany?: CryptocurrencyCreateManyUserInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type SettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    connect?: SettingsWhereUniqueInput
  }

  export type PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PortfolioSnapshotCreateWithoutUserInput>, Enumerable<PortfolioSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PortfolioSnapshotCreateOrConnectWithoutUserInput>
    createMany?: PortfolioSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
  }

  export type CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CryptoSnapshotCreateWithoutUserInput>, Enumerable<CryptoSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptoSnapshotCreateOrConnectWithoutUserInput>
    createMany?: CryptoSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<CryptoSnapshotWhereUniqueInput>
  }

  export type CashSnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CashSnapshotCreateWithoutUserInput>, Enumerable<CashSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CashSnapshotCreateOrConnectWithoutUserInput>
    createMany?: CashSnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<CashSnapshotWhereUniqueInput>
  }

  export type PropertySnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PropertySnapshotCreateWithoutUserInput>, Enumerable<PropertySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PropertySnapshotCreateOrConnectWithoutUserInput>
    createMany?: PropertySnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<PropertySnapshotWhereUniqueInput>
  }

  export type SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SecuritySnapshotCreateWithoutUserInput>, Enumerable<SecuritySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SecuritySnapshotCreateOrConnectWithoutUserInput>
    createMany?: SecuritySnapshotCreateManyUserInputEnvelope
    connect?: Enumerable<SecuritySnapshotWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type BudgetUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  export type CryptocurrencyUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutUserInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CryptocurrencyCreateManyUserInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type SettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    upsert?: SettingsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: SettingsWhereUniqueInput
    update?: XOR<SettingsUpdateWithoutUserInput, SettingsUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioSnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PortfolioSnapshotCreateWithoutUserInput>, Enumerable<PortfolioSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PortfolioSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PortfolioSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PortfolioSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    disconnect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    delete?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    connect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    update?: Enumerable<PortfolioSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PortfolioSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PortfolioSnapshotScalarWhereInput>
  }

  export type CryptoSnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CryptoSnapshotCreateWithoutUserInput>, Enumerable<CryptoSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptoSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CryptoSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CryptoSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<CryptoSnapshotWhereUniqueInput>
    disconnect?: Enumerable<CryptoSnapshotWhereUniqueInput>
    delete?: Enumerable<CryptoSnapshotWhereUniqueInput>
    connect?: Enumerable<CryptoSnapshotWhereUniqueInput>
    update?: Enumerable<CryptoSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CryptoSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CryptoSnapshotScalarWhereInput>
  }

  export type CashSnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CashSnapshotCreateWithoutUserInput>, Enumerable<CashSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CashSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CashSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CashSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<CashSnapshotWhereUniqueInput>
    disconnect?: Enumerable<CashSnapshotWhereUniqueInput>
    delete?: Enumerable<CashSnapshotWhereUniqueInput>
    connect?: Enumerable<CashSnapshotWhereUniqueInput>
    update?: Enumerable<CashSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CashSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CashSnapshotScalarWhereInput>
  }

  export type PropertySnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PropertySnapshotCreateWithoutUserInput>, Enumerable<PropertySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PropertySnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PropertySnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PropertySnapshotCreateManyUserInputEnvelope
    set?: Enumerable<PropertySnapshotWhereUniqueInput>
    disconnect?: Enumerable<PropertySnapshotWhereUniqueInput>
    delete?: Enumerable<PropertySnapshotWhereUniqueInput>
    connect?: Enumerable<PropertySnapshotWhereUniqueInput>
    update?: Enumerable<PropertySnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PropertySnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PropertySnapshotScalarWhereInput>
  }

  export type SecuritySnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SecuritySnapshotCreateWithoutUserInput>, Enumerable<SecuritySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SecuritySnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SecuritySnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SecuritySnapshotCreateManyUserInputEnvelope
    set?: Enumerable<SecuritySnapshotWhereUniqueInput>
    disconnect?: Enumerable<SecuritySnapshotWhereUniqueInput>
    delete?: Enumerable<SecuritySnapshotWhereUniqueInput>
    connect?: Enumerable<SecuritySnapshotWhereUniqueInput>
    update?: Enumerable<SecuritySnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SecuritySnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SecuritySnapshotScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type BudgetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  export type CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutUserInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CryptocurrencyCreateManyUserInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type SettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    upsert?: SettingsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: SettingsWhereUniqueInput
    update?: XOR<SettingsUpdateWithoutUserInput, SettingsUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PortfolioSnapshotCreateWithoutUserInput>, Enumerable<PortfolioSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PortfolioSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PortfolioSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PortfolioSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    disconnect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    delete?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    connect?: Enumerable<PortfolioSnapshotWhereUniqueInput>
    update?: Enumerable<PortfolioSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PortfolioSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PortfolioSnapshotScalarWhereInput>
  }

  export type CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CryptoSnapshotCreateWithoutUserInput>, Enumerable<CryptoSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CryptoSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CryptoSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CryptoSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<CryptoSnapshotWhereUniqueInput>
    disconnect?: Enumerable<CryptoSnapshotWhereUniqueInput>
    delete?: Enumerable<CryptoSnapshotWhereUniqueInput>
    connect?: Enumerable<CryptoSnapshotWhereUniqueInput>
    update?: Enumerable<CryptoSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CryptoSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CryptoSnapshotScalarWhereInput>
  }

  export type CashSnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CashSnapshotCreateWithoutUserInput>, Enumerable<CashSnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CashSnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CashSnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CashSnapshotCreateManyUserInputEnvelope
    set?: Enumerable<CashSnapshotWhereUniqueInput>
    disconnect?: Enumerable<CashSnapshotWhereUniqueInput>
    delete?: Enumerable<CashSnapshotWhereUniqueInput>
    connect?: Enumerable<CashSnapshotWhereUniqueInput>
    update?: Enumerable<CashSnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CashSnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CashSnapshotScalarWhereInput>
  }

  export type PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PropertySnapshotCreateWithoutUserInput>, Enumerable<PropertySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PropertySnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PropertySnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PropertySnapshotCreateManyUserInputEnvelope
    set?: Enumerable<PropertySnapshotWhereUniqueInput>
    disconnect?: Enumerable<PropertySnapshotWhereUniqueInput>
    delete?: Enumerable<PropertySnapshotWhereUniqueInput>
    connect?: Enumerable<PropertySnapshotWhereUniqueInput>
    update?: Enumerable<PropertySnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PropertySnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PropertySnapshotScalarWhereInput>
  }

  export type SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SecuritySnapshotCreateWithoutUserInput>, Enumerable<SecuritySnapshotUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SecuritySnapshotCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SecuritySnapshotUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SecuritySnapshotCreateManyUserInputEnvelope
    set?: Enumerable<SecuritySnapshotWhereUniqueInput>
    disconnect?: Enumerable<SecuritySnapshotWhereUniqueInput>
    delete?: Enumerable<SecuritySnapshotWhereUniqueInput>
    connect?: Enumerable<SecuritySnapshotWhereUniqueInput>
    update?: Enumerable<SecuritySnapshotUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SecuritySnapshotUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SecuritySnapshotScalarWhereInput>
  }

  export type EnumLogTypeFieldUpdateOperationsInput = {
    set?: LogType
  }

  export type UserCreateNestedOneWithoutCryptoSnapshotsInput = {
    create?: XOR<UserCreateWithoutCryptoSnapshotsInput, UserUncheckedCreateWithoutCryptoSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptoSnapshotsInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutCryptoSnapshotsNestedInput = {
    create?: XOR<UserCreateWithoutCryptoSnapshotsInput, UserUncheckedCreateWithoutCryptoSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptoSnapshotsInput
    upsert?: UserUpsertWithoutCryptoSnapshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCryptoSnapshotsInput, UserUncheckedUpdateWithoutCryptoSnapshotsInput>
  }

  export type UserCreateNestedOneWithoutCashSnapshotsInput = {
    create?: XOR<UserCreateWithoutCashSnapshotsInput, UserUncheckedCreateWithoutCashSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCashSnapshotsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCashSnapshotsNestedInput = {
    create?: XOR<UserCreateWithoutCashSnapshotsInput, UserUncheckedCreateWithoutCashSnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCashSnapshotsInput
    upsert?: UserUpsertWithoutCashSnapshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCashSnapshotsInput, UserUncheckedUpdateWithoutCashSnapshotsInput>
  }

  export type UserCreateNestedOneWithoutPropertySnapshotsInput = {
    create?: XOR<UserCreateWithoutPropertySnapshotsInput, UserUncheckedCreateWithoutPropertySnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertySnapshotsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPropertySnapshotsNestedInput = {
    create?: XOR<UserCreateWithoutPropertySnapshotsInput, UserUncheckedCreateWithoutPropertySnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertySnapshotsInput
    upsert?: UserUpsertWithoutPropertySnapshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPropertySnapshotsInput, UserUncheckedUpdateWithoutPropertySnapshotsInput>
  }

  export type UserCreateNestedOneWithoutSecuritySnapshotsInput = {
    create?: XOR<UserCreateWithoutSecuritySnapshotsInput, UserUncheckedCreateWithoutSecuritySnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecuritySnapshotsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSecuritySnapshotsNestedInput = {
    create?: XOR<UserCreateWithoutSecuritySnapshotsInput, UserUncheckedCreateWithoutSecuritySnapshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecuritySnapshotsInput
    upsert?: UserUpsertWithoutSecuritySnapshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSecuritySnapshotsInput, UserUncheckedUpdateWithoutSecuritySnapshotsInput>
  }

  export type UserCreateNestedOneWithoutPortfolioSnapshotInput = {
    create?: XOR<UserCreateWithoutPortfolioSnapshotInput, UserUncheckedCreateWithoutPortfolioSnapshotInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfolioSnapshotInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPortfolioSnapshotNestedInput = {
    create?: XOR<UserCreateWithoutPortfolioSnapshotInput, UserUncheckedCreateWithoutPortfolioSnapshotInput>
    connectOrCreate?: UserCreateOrConnectWithoutPortfolioSnapshotInput
    upsert?: UserUpsertWithoutPortfolioSnapshotInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPortfolioSnapshotInput, UserUncheckedUpdateWithoutPortfolioSnapshotInput>
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumColorSchemeFieldUpdateOperationsInput = {
    set?: ColorScheme | null
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type MarketCreateNestedOneWithoutCryptocurrencyInput = {
    create?: XOR<MarketCreateWithoutCryptocurrencyInput, MarketUncheckedCreateWithoutCryptocurrencyInput>
    connectOrCreate?: MarketCreateOrConnectWithoutCryptocurrencyInput
    connect?: MarketWhereUniqueInput
  }

  export type CryptocurrencyCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CryptocurrencyCreateWithoutChildrenInput, CryptocurrencyUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CryptocurrencyCreateOrConnectWithoutChildrenInput
    connect?: CryptocurrencyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCryptocurrencyInput = {
    create?: XOR<UserCreateWithoutCryptocurrencyInput, UserUncheckedCreateWithoutCryptocurrencyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptocurrencyInput
    connect?: UserWhereUniqueInput
  }

  export type CryptocurrencyCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutParentInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutParentInput>
    createMany?: CryptocurrencyCreateManyParentInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type CryptocurrencyUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutParentInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutParentInput>
    createMany?: CryptocurrencyCreateManyParentInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type NullableEnumAccountConnectionFieldUpdateOperationsInput = {
    set?: AccountConnection | null
  }

  export type MarketUpdateOneWithoutCryptocurrencyNestedInput = {
    create?: XOR<MarketCreateWithoutCryptocurrencyInput, MarketUncheckedCreateWithoutCryptocurrencyInput>
    connectOrCreate?: MarketCreateOrConnectWithoutCryptocurrencyInput
    upsert?: MarketUpsertWithoutCryptocurrencyInput
    disconnect?: boolean
    delete?: boolean
    connect?: MarketWhereUniqueInput
    update?: XOR<MarketUpdateWithoutCryptocurrencyInput, MarketUncheckedUpdateWithoutCryptocurrencyInput>
  }

  export type CryptocurrencyUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CryptocurrencyCreateWithoutChildrenInput, CryptocurrencyUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CryptocurrencyCreateOrConnectWithoutChildrenInput
    upsert?: CryptocurrencyUpsertWithoutChildrenInput
    disconnect?: boolean
    delete?: boolean
    connect?: CryptocurrencyWhereUniqueInput
    update?: XOR<CryptocurrencyUpdateWithoutChildrenInput, CryptocurrencyUncheckedUpdateWithoutChildrenInput>
  }

  export type UserUpdateOneRequiredWithoutCryptocurrencyNestedInput = {
    create?: XOR<UserCreateWithoutCryptocurrencyInput, UserUncheckedCreateWithoutCryptocurrencyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptocurrencyInput
    upsert?: UserUpsertWithoutCryptocurrencyInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCryptocurrencyInput, UserUncheckedUpdateWithoutCryptocurrencyInput>
  }

  export type CryptocurrencyUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutParentInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutParentInput>
    createMany?: CryptocurrencyCreateManyParentInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type CryptocurrencyUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutParentInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutParentInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutParentInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutParentInput>
    createMany?: CryptocurrencyCreateManyParentInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutParentInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutParentInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type CryptocurrencyCreateNestedManyWithoutMarketInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutMarketInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutMarketInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutMarketInput>
    createMany?: CryptocurrencyCreateManyMarketInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type CryptocurrencyUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutMarketInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutMarketInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutMarketInput>
    createMany?: CryptocurrencyCreateManyMarketInputEnvelope
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
  }

  export type EnumMarketTypeFieldUpdateOperationsInput = {
    set?: MarketType
  }

  export type CryptocurrencyUpdateManyWithoutMarketNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutMarketInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutMarketInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutMarketInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutMarketInput>
    createMany?: CryptocurrencyCreateManyMarketInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutMarketInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutMarketInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type CryptocurrencyUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<Enumerable<CryptocurrencyCreateWithoutMarketInput>, Enumerable<CryptocurrencyUncheckedCreateWithoutMarketInput>>
    connectOrCreate?: Enumerable<CryptocurrencyCreateOrConnectWithoutMarketInput>
    upsert?: Enumerable<CryptocurrencyUpsertWithWhereUniqueWithoutMarketInput>
    createMany?: CryptocurrencyCreateManyMarketInputEnvelope
    set?: Enumerable<CryptocurrencyWhereUniqueInput>
    disconnect?: Enumerable<CryptocurrencyWhereUniqueInput>
    delete?: Enumerable<CryptocurrencyWhereUniqueInput>
    connect?: Enumerable<CryptocurrencyWhereUniqueInput>
    update?: Enumerable<CryptocurrencyUpdateWithWhereUniqueWithoutMarketInput>
    updateMany?: Enumerable<CryptocurrencyUpdateManyWithWhereWithoutMarketInput>
    deleteMany?: Enumerable<CryptocurrencyScalarWhereInput>
  }

  export type BudgetCreateNestedOneWithoutIncomeInput = {
    create?: XOR<BudgetCreateWithoutIncomeInput, BudgetUncheckedCreateWithoutIncomeInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutIncomeInput
    connect?: BudgetWhereUniqueInput
  }

  export type BudgetUpdateOneRequiredWithoutIncomeNestedInput = {
    create?: XOR<BudgetCreateWithoutIncomeInput, BudgetUncheckedCreateWithoutIncomeInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutIncomeInput
    upsert?: BudgetUpsertWithoutIncomeInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<BudgetUpdateWithoutIncomeInput, BudgetUncheckedUpdateWithoutIncomeInput>
  }

  export type UserCreateNestedOneWithoutBudgetInput = {
    create?: XOR<UserCreateWithoutBudgetInput, UserUncheckedCreateWithoutBudgetInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetInput
    connect?: UserWhereUniqueInput
  }

  export type BudgetItemCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<BudgetItemCreateWithoutBudgetInput>, Enumerable<BudgetItemUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<BudgetItemCreateOrConnectWithoutBudgetInput>
    createMany?: BudgetItemCreateManyBudgetInputEnvelope
    connect?: Enumerable<BudgetItemWhereUniqueInput>
  }

  export type IncomeCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutBudgetInput>, Enumerable<IncomeUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutBudgetInput>
    createMany?: IncomeCreateManyBudgetInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  export type BudgetItemUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<BudgetItemCreateWithoutBudgetInput>, Enumerable<BudgetItemUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<BudgetItemCreateOrConnectWithoutBudgetInput>
    createMany?: BudgetItemCreateManyBudgetInputEnvelope
    connect?: Enumerable<BudgetItemWhereUniqueInput>
  }

  export type IncomeUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutBudgetInput>, Enumerable<IncomeUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutBudgetInput>
    createMany?: IncomeCreateManyBudgetInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutBudgetNestedInput = {
    create?: XOR<UserCreateWithoutBudgetInput, UserUncheckedCreateWithoutBudgetInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetInput
    upsert?: UserUpsertWithoutBudgetInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBudgetInput, UserUncheckedUpdateWithoutBudgetInput>
  }

  export type BudgetItemUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<Enumerable<BudgetItemCreateWithoutBudgetInput>, Enumerable<BudgetItemUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<BudgetItemCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<BudgetItemUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: BudgetItemCreateManyBudgetInputEnvelope
    set?: Enumerable<BudgetItemWhereUniqueInput>
    disconnect?: Enumerable<BudgetItemWhereUniqueInput>
    delete?: Enumerable<BudgetItemWhereUniqueInput>
    connect?: Enumerable<BudgetItemWhereUniqueInput>
    update?: Enumerable<BudgetItemUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<BudgetItemUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<BudgetItemScalarWhereInput>
  }

  export type IncomeUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutBudgetInput>, Enumerable<IncomeUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: IncomeCreateManyBudgetInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  export type BudgetItemUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<Enumerable<BudgetItemCreateWithoutBudgetInput>, Enumerable<BudgetItemUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<BudgetItemCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<BudgetItemUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: BudgetItemCreateManyBudgetInputEnvelope
    set?: Enumerable<BudgetItemWhereUniqueInput>
    disconnect?: Enumerable<BudgetItemWhereUniqueInput>
    delete?: Enumerable<BudgetItemWhereUniqueInput>
    connect?: Enumerable<BudgetItemWhereUniqueInput>
    update?: Enumerable<BudgetItemUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<BudgetItemUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<BudgetItemScalarWhereInput>
  }

  export type IncomeUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutBudgetInput>, Enumerable<IncomeUncheckedCreateWithoutBudgetInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutBudgetInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutBudgetInput>
    createMany?: IncomeCreateManyBudgetInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutBudgetInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutBudgetInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  export type BudgetCreateNestedOneWithoutChildrenInput = {
    create?: XOR<BudgetCreateWithoutChildrenInput, BudgetUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutChildrenInput
    connect?: BudgetWhereUniqueInput
  }

  export type BudgetUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<BudgetCreateWithoutChildrenInput, BudgetUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutChildrenInput
    upsert?: BudgetUpsertWithoutChildrenInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<BudgetUpdateWithoutChildrenInput, BudgetUncheckedUpdateWithoutChildrenInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedEnumLogTypeFilter = {
    equals?: LogType
    in?: Enumerable<LogType>
    notIn?: Enumerable<LogType>
    not?: NestedEnumLogTypeFilter | LogType
  }

  export type NestedEnumLogTypeWithAggregatesFilter = {
    equals?: LogType
    in?: Enumerable<LogType>
    notIn?: Enumerable<LogType>
    not?: NestedEnumLogTypeWithAggregatesFilter | LogType
    _count?: NestedIntFilter
    _min?: NestedEnumLogTypeFilter
    _max?: NestedEnumLogTypeFilter
  }

  export type NestedDecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type NestedEnumColorSchemeNullableFilter = {
    equals?: ColorScheme | null
    in?: Enumerable<ColorScheme> | null
    notIn?: Enumerable<ColorScheme> | null
    not?: NestedEnumColorSchemeNullableFilter | ColorScheme | null
  }

  export type NestedEnumColorSchemeNullableWithAggregatesFilter = {
    equals?: ColorScheme | null
    in?: Enumerable<ColorScheme> | null
    notIn?: Enumerable<ColorScheme> | null
    not?: NestedEnumColorSchemeNullableWithAggregatesFilter | ColorScheme | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumColorSchemeNullableFilter
    _max?: NestedEnumColorSchemeNullableFilter
  }

  export type NestedEnumAccountConnectionNullableFilter = {
    equals?: AccountConnection | null
    in?: Enumerable<AccountConnection> | null
    notIn?: Enumerable<AccountConnection> | null
    not?: NestedEnumAccountConnectionNullableFilter | AccountConnection | null
  }

  export type NestedEnumAccountConnectionNullableWithAggregatesFilter = {
    equals?: AccountConnection | null
    in?: Enumerable<AccountConnection> | null
    notIn?: Enumerable<AccountConnection> | null
    not?: NestedEnumAccountConnectionNullableWithAggregatesFilter | AccountConnection | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumAccountConnectionNullableFilter
    _max?: NestedEnumAccountConnectionNullableFilter
  }

  export type NestedEnumMarketTypeFilter = {
    equals?: MarketType
    in?: Enumerable<MarketType>
    notIn?: Enumerable<MarketType>
    not?: NestedEnumMarketTypeFilter | MarketType
  }

  export type NestedEnumMarketTypeWithAggregatesFilter = {
    equals?: MarketType
    in?: Enumerable<MarketType>
    notIn?: Enumerable<MarketType>
    not?: NestedEnumMarketTypeWithAggregatesFilter | MarketType
    _count?: NestedIntFilter
    _min?: NestedEnumMarketTypeFilter
    _max?: NestedEnumMarketTypeFilter
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type BudgetCreateWithoutUserInput = {
    id?: string
    name: string
    Children?: BudgetItemCreateNestedManyWithoutBudgetInput
    income?: IncomeCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    Children?: BudgetItemUncheckedCreateNestedManyWithoutBudgetInput
    income?: IncomeUncheckedCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetCreateOrConnectWithoutUserInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetCreateManyUserInputEnvelope = {
    data: Enumerable<BudgetCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CryptocurrencyCreateWithoutUserInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    market?: MarketCreateNestedOneWithoutCryptocurrencyInput
    parent?: CryptocurrencyCreateNestedOneWithoutChildrenInput
    Children?: CryptocurrencyCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUncheckedCreateWithoutUserInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    parentId?: string | null
    Children?: CryptocurrencyUncheckedCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyCreateOrConnectWithoutUserInput = {
    where: CryptocurrencyWhereUniqueInput
    create: XOR<CryptocurrencyCreateWithoutUserInput, CryptocurrencyUncheckedCreateWithoutUserInput>
  }

  export type CryptocurrencyCreateManyUserInputEnvelope = {
    data: Enumerable<CryptocurrencyCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SettingsCreateWithoutUserInput = {
    id?: string
    preferredColorScheme?: ColorScheme | null
    userCurrency?: string
    userLanguage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SettingsUncheckedCreateWithoutUserInput = {
    id?: string
    preferredColorScheme?: ColorScheme | null
    userCurrency?: string
    userLanguage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SettingsCreateOrConnectWithoutUserInput = {
    where: SettingsWhereUniqueInput
    create: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
  }

  export type PortfolioSnapshotCreateWithoutUserInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PortfolioSnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PortfolioSnapshotCreateOrConnectWithoutUserInput = {
    where: PortfolioSnapshotWhereUniqueInput
    create: XOR<PortfolioSnapshotCreateWithoutUserInput, PortfolioSnapshotUncheckedCreateWithoutUserInput>
  }

  export type PortfolioSnapshotCreateManyUserInputEnvelope = {
    data: Enumerable<PortfolioSnapshotCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CryptoSnapshotCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotCreateOrConnectWithoutUserInput = {
    where: CryptoSnapshotWhereUniqueInput
    create: XOR<CryptoSnapshotCreateWithoutUserInput, CryptoSnapshotUncheckedCreateWithoutUserInput>
  }

  export type CryptoSnapshotCreateManyUserInputEnvelope = {
    data: Enumerable<CryptoSnapshotCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CashSnapshotCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotCreateOrConnectWithoutUserInput = {
    where: CashSnapshotWhereUniqueInput
    create: XOR<CashSnapshotCreateWithoutUserInput, CashSnapshotUncheckedCreateWithoutUserInput>
  }

  export type CashSnapshotCreateManyUserInputEnvelope = {
    data: Enumerable<CashSnapshotCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PropertySnapshotCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotCreateOrConnectWithoutUserInput = {
    where: PropertySnapshotWhereUniqueInput
    create: XOR<PropertySnapshotCreateWithoutUserInput, PropertySnapshotUncheckedCreateWithoutUserInput>
  }

  export type PropertySnapshotCreateManyUserInputEnvelope = {
    data: Enumerable<PropertySnapshotCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SecuritySnapshotCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotCreateOrConnectWithoutUserInput = {
    where: SecuritySnapshotWhereUniqueInput
    create: XOR<SecuritySnapshotCreateWithoutUserInput, SecuritySnapshotUncheckedCreateWithoutUserInput>
  }

  export type SecuritySnapshotCreateManyUserInputEnvelope = {
    data: Enumerable<SecuritySnapshotCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
  }

  export type BudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
  }

  export type BudgetUpdateManyWithWhereWithoutUserInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutBudgetInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: Enumerable<BudgetScalarWhereInput>
    OR?: Enumerable<BudgetScalarWhereInput>
    NOT?: Enumerable<BudgetScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    userId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CryptocurrencyUpsertWithWhereUniqueWithoutUserInput = {
    where: CryptocurrencyWhereUniqueInput
    update: XOR<CryptocurrencyUpdateWithoutUserInput, CryptocurrencyUncheckedUpdateWithoutUserInput>
    create: XOR<CryptocurrencyCreateWithoutUserInput, CryptocurrencyUncheckedCreateWithoutUserInput>
  }

  export type CryptocurrencyUpdateWithWhereUniqueWithoutUserInput = {
    where: CryptocurrencyWhereUniqueInput
    data: XOR<CryptocurrencyUpdateWithoutUserInput, CryptocurrencyUncheckedUpdateWithoutUserInput>
  }

  export type CryptocurrencyUpdateManyWithWhereWithoutUserInput = {
    where: CryptocurrencyScalarWhereInput
    data: XOR<CryptocurrencyUpdateManyMutationInput, CryptocurrencyUncheckedUpdateManyWithoutCryptocurrencyInput>
  }

  export type CryptocurrencyScalarWhereInput = {
    AND?: Enumerable<CryptocurrencyScalarWhereInput>
    OR?: Enumerable<CryptocurrencyScalarWhereInput>
    NOT?: Enumerable<CryptocurrencyScalarWhereInput>
    id?: StringFilter | string
    displayName?: StringFilter | string
    currency?: StringFilter | string
    balance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    walletAddress?: StringNullableFilter | string | null
    targetBalance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFilter | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFilter | Decimal | DecimalJsLike | number | string
    accountConnection?: EnumAccountConnectionNullableFilter | AccountConnection | null
    apiKey?: StringNullableFilter | string | null
    apiSecret?: StringNullableFilter | string | null
    marketId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    parentId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type SettingsUpsertWithoutUserInput = {
    update: XOR<SettingsUpdateWithoutUserInput, SettingsUncheckedUpdateWithoutUserInput>
    create: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
  }

  export type SettingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SettingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    preferredColorScheme?: NullableEnumColorSchemeFieldUpdateOperationsInput | ColorScheme | null
    userCurrency?: StringFieldUpdateOperationsInput | string
    userLanguage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: PortfolioSnapshotWhereUniqueInput
    update: XOR<PortfolioSnapshotUpdateWithoutUserInput, PortfolioSnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<PortfolioSnapshotCreateWithoutUserInput, PortfolioSnapshotUncheckedCreateWithoutUserInput>
  }

  export type PortfolioSnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: PortfolioSnapshotWhereUniqueInput
    data: XOR<PortfolioSnapshotUpdateWithoutUserInput, PortfolioSnapshotUncheckedUpdateWithoutUserInput>
  }

  export type PortfolioSnapshotUpdateManyWithWhereWithoutUserInput = {
    where: PortfolioSnapshotScalarWhereInput
    data: XOR<PortfolioSnapshotUpdateManyMutationInput, PortfolioSnapshotUncheckedUpdateManyWithoutPortfolioSnapshotInput>
  }

  export type PortfolioSnapshotScalarWhereInput = {
    AND?: Enumerable<PortfolioSnapshotScalarWhereInput>
    OR?: Enumerable<PortfolioSnapshotScalarWhereInput>
    NOT?: Enumerable<PortfolioSnapshotScalarWhereInput>
    id?: StringFilter | string
    currency?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    userId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CryptoSnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: CryptoSnapshotWhereUniqueInput
    update: XOR<CryptoSnapshotUpdateWithoutUserInput, CryptoSnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<CryptoSnapshotCreateWithoutUserInput, CryptoSnapshotUncheckedCreateWithoutUserInput>
  }

  export type CryptoSnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: CryptoSnapshotWhereUniqueInput
    data: XOR<CryptoSnapshotUpdateWithoutUserInput, CryptoSnapshotUncheckedUpdateWithoutUserInput>
  }

  export type CryptoSnapshotUpdateManyWithWhereWithoutUserInput = {
    where: CryptoSnapshotScalarWhereInput
    data: XOR<CryptoSnapshotUpdateManyMutationInput, CryptoSnapshotUncheckedUpdateManyWithoutCryptoSnapshotsInput>
  }

  export type CryptoSnapshotScalarWhereInput = {
    AND?: Enumerable<CryptoSnapshotScalarWhereInput>
    OR?: Enumerable<CryptoSnapshotScalarWhereInput>
    NOT?: Enumerable<CryptoSnapshotScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type CashSnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: CashSnapshotWhereUniqueInput
    update: XOR<CashSnapshotUpdateWithoutUserInput, CashSnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<CashSnapshotCreateWithoutUserInput, CashSnapshotUncheckedCreateWithoutUserInput>
  }

  export type CashSnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: CashSnapshotWhereUniqueInput
    data: XOR<CashSnapshotUpdateWithoutUserInput, CashSnapshotUncheckedUpdateWithoutUserInput>
  }

  export type CashSnapshotUpdateManyWithWhereWithoutUserInput = {
    where: CashSnapshotScalarWhereInput
    data: XOR<CashSnapshotUpdateManyMutationInput, CashSnapshotUncheckedUpdateManyWithoutCashSnapshotsInput>
  }

  export type CashSnapshotScalarWhereInput = {
    AND?: Enumerable<CashSnapshotScalarWhereInput>
    OR?: Enumerable<CashSnapshotScalarWhereInput>
    NOT?: Enumerable<CashSnapshotScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type PropertySnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: PropertySnapshotWhereUniqueInput
    update: XOR<PropertySnapshotUpdateWithoutUserInput, PropertySnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<PropertySnapshotCreateWithoutUserInput, PropertySnapshotUncheckedCreateWithoutUserInput>
  }

  export type PropertySnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: PropertySnapshotWhereUniqueInput
    data: XOR<PropertySnapshotUpdateWithoutUserInput, PropertySnapshotUncheckedUpdateWithoutUserInput>
  }

  export type PropertySnapshotUpdateManyWithWhereWithoutUserInput = {
    where: PropertySnapshotScalarWhereInput
    data: XOR<PropertySnapshotUpdateManyMutationInput, PropertySnapshotUncheckedUpdateManyWithoutPropertySnapshotsInput>
  }

  export type PropertySnapshotScalarWhereInput = {
    AND?: Enumerable<PropertySnapshotScalarWhereInput>
    OR?: Enumerable<PropertySnapshotScalarWhereInput>
    NOT?: Enumerable<PropertySnapshotScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type SecuritySnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: SecuritySnapshotWhereUniqueInput
    update: XOR<SecuritySnapshotUpdateWithoutUserInput, SecuritySnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<SecuritySnapshotCreateWithoutUserInput, SecuritySnapshotUncheckedCreateWithoutUserInput>
  }

  export type SecuritySnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: SecuritySnapshotWhereUniqueInput
    data: XOR<SecuritySnapshotUpdateWithoutUserInput, SecuritySnapshotUncheckedUpdateWithoutUserInput>
  }

  export type SecuritySnapshotUpdateManyWithWhereWithoutUserInput = {
    where: SecuritySnapshotScalarWhereInput
    data: XOR<SecuritySnapshotUpdateManyMutationInput, SecuritySnapshotUncheckedUpdateManyWithoutSecuritySnapshotsInput>
  }

  export type SecuritySnapshotScalarWhereInput = {
    AND?: Enumerable<SecuritySnapshotScalarWhereInput>
    OR?: Enumerable<SecuritySnapshotScalarWhereInput>
    NOT?: Enumerable<SecuritySnapshotScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    totalValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFilter | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFilter | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFilter | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type UserCreateWithoutCryptoSnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCryptoSnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCryptoSnapshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCryptoSnapshotsInput, UserUncheckedCreateWithoutCryptoSnapshotsInput>
  }

  export type UserUpsertWithoutCryptoSnapshotsInput = {
    update: XOR<UserUpdateWithoutCryptoSnapshotsInput, UserUncheckedUpdateWithoutCryptoSnapshotsInput>
    create: XOR<UserCreateWithoutCryptoSnapshotsInput, UserUncheckedCreateWithoutCryptoSnapshotsInput>
  }

  export type UserUpdateWithoutCryptoSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCryptoSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCashSnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCashSnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCashSnapshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCashSnapshotsInput, UserUncheckedCreateWithoutCashSnapshotsInput>
  }

  export type UserUpsertWithoutCashSnapshotsInput = {
    update: XOR<UserUpdateWithoutCashSnapshotsInput, UserUncheckedUpdateWithoutCashSnapshotsInput>
    create: XOR<UserCreateWithoutCashSnapshotsInput, UserUncheckedCreateWithoutCashSnapshotsInput>
  }

  export type UserUpdateWithoutCashSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCashSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPropertySnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPropertySnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPropertySnapshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPropertySnapshotsInput, UserUncheckedCreateWithoutPropertySnapshotsInput>
  }

  export type UserUpsertWithoutPropertySnapshotsInput = {
    update: XOR<UserUpdateWithoutPropertySnapshotsInput, UserUncheckedUpdateWithoutPropertySnapshotsInput>
    create: XOR<UserCreateWithoutPropertySnapshotsInput, UserUncheckedCreateWithoutPropertySnapshotsInput>
  }

  export type UserUpdateWithoutPropertySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPropertySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSecuritySnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSecuritySnapshotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSecuritySnapshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSecuritySnapshotsInput, UserUncheckedCreateWithoutSecuritySnapshotsInput>
  }

  export type UserUpsertWithoutSecuritySnapshotsInput = {
    update: XOR<UserUpdateWithoutSecuritySnapshotsInput, UserUncheckedUpdateWithoutSecuritySnapshotsInput>
    create: XOR<UserCreateWithoutSecuritySnapshotsInput, UserUncheckedCreateWithoutSecuritySnapshotsInput>
  }

  export type UserUpdateWithoutSecuritySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSecuritySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPortfolioSnapshotInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPortfolioSnapshotInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPortfolioSnapshotInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPortfolioSnapshotInput, UserUncheckedCreateWithoutPortfolioSnapshotInput>
  }

  export type UserUpsertWithoutPortfolioSnapshotInput = {
    update: XOR<UserUpdateWithoutPortfolioSnapshotInput, UserUncheckedUpdateWithoutPortfolioSnapshotInput>
    create: XOR<UserCreateWithoutPortfolioSnapshotInput, UserUncheckedCreateWithoutPortfolioSnapshotInput>
  }

  export type UserUpdateWithoutPortfolioSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPortfolioSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSettingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MarketCreateWithoutCryptocurrencyInput = {
    name: string
    ticker: string
    description?: string | null
    currency: string
    price?: Decimal | DecimalJsLike | number | string
    priceChange24h?: Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: Decimal | DecimalJsLike | number | string
    marketCap?: Decimal | DecimalJsLike | number | string
    marketCapRank?: Decimal | DecimalJsLike | number | string
    type: MarketType
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type MarketUncheckedCreateWithoutCryptocurrencyInput = {
    name: string
    ticker: string
    description?: string | null
    currency: string
    price?: Decimal | DecimalJsLike | number | string
    priceChange24h?: Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: Decimal | DecimalJsLike | number | string
    marketCap?: Decimal | DecimalJsLike | number | string
    marketCapRank?: Decimal | DecimalJsLike | number | string
    type: MarketType
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type MarketCreateOrConnectWithoutCryptocurrencyInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutCryptocurrencyInput, MarketUncheckedCreateWithoutCryptocurrencyInput>
  }

  export type CryptocurrencyCreateWithoutChildrenInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    market?: MarketCreateNestedOneWithoutCryptocurrencyInput
    parent?: CryptocurrencyCreateNestedOneWithoutChildrenInput
    user: UserCreateNestedOneWithoutCryptocurrencyInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUncheckedCreateWithoutChildrenInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyCreateOrConnectWithoutChildrenInput = {
    where: CryptocurrencyWhereUniqueInput
    create: XOR<CryptocurrencyCreateWithoutChildrenInput, CryptocurrencyUncheckedCreateWithoutChildrenInput>
  }

  export type UserCreateWithoutCryptocurrencyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    budget?: BudgetCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCryptocurrencyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    budget?: BudgetUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCryptocurrencyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCryptocurrencyInput, UserUncheckedCreateWithoutCryptocurrencyInput>
  }

  export type CryptocurrencyCreateWithoutParentInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    market?: MarketCreateNestedOneWithoutCryptocurrencyInput
    user: UserCreateNestedOneWithoutCryptocurrencyInput
    Children?: CryptocurrencyCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUncheckedCreateWithoutParentInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    userId: string
    Children?: CryptocurrencyUncheckedCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyCreateOrConnectWithoutParentInput = {
    where: CryptocurrencyWhereUniqueInput
    create: XOR<CryptocurrencyCreateWithoutParentInput, CryptocurrencyUncheckedCreateWithoutParentInput>
  }

  export type CryptocurrencyCreateManyParentInputEnvelope = {
    data: Enumerable<CryptocurrencyCreateManyParentInput>
    skipDuplicates?: boolean
  }

  export type MarketUpsertWithoutCryptocurrencyInput = {
    update: XOR<MarketUpdateWithoutCryptocurrencyInput, MarketUncheckedUpdateWithoutCryptocurrencyInput>
    create: XOR<MarketCreateWithoutCryptocurrencyInput, MarketUncheckedCreateWithoutCryptocurrencyInput>
  }

  export type MarketUpdateWithoutCryptocurrencyInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MarketUncheckedUpdateWithoutCryptocurrencyInput = {
    name?: StringFieldUpdateOperationsInput | string
    ticker?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    priceChange24hPercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCap?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    marketCapRank?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMarketTypeFieldUpdateOperationsInput | MarketType
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUpsertWithoutChildrenInput = {
    update: XOR<CryptocurrencyUpdateWithoutChildrenInput, CryptocurrencyUncheckedUpdateWithoutChildrenInput>
    create: XOR<CryptocurrencyCreateWithoutChildrenInput, CryptocurrencyUncheckedCreateWithoutChildrenInput>
  }

  export type CryptocurrencyUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    market?: MarketUpdateOneWithoutCryptocurrencyNestedInput
    parent?: CryptocurrencyUpdateOneWithoutChildrenNestedInput
    user?: UserUpdateOneRequiredWithoutCryptocurrencyNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutCryptocurrencyInput = {
    update: XOR<UserUpdateWithoutCryptocurrencyInput, UserUncheckedUpdateWithoutCryptocurrencyInput>
    create: XOR<UserCreateWithoutCryptocurrencyInput, UserUncheckedCreateWithoutCryptocurrencyInput>
  }

  export type UserUpdateWithoutCryptocurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    budget?: BudgetUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCryptocurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    budget?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CryptocurrencyUpsertWithWhereUniqueWithoutParentInput = {
    where: CryptocurrencyWhereUniqueInput
    update: XOR<CryptocurrencyUpdateWithoutParentInput, CryptocurrencyUncheckedUpdateWithoutParentInput>
    create: XOR<CryptocurrencyCreateWithoutParentInput, CryptocurrencyUncheckedCreateWithoutParentInput>
  }

  export type CryptocurrencyUpdateWithWhereUniqueWithoutParentInput = {
    where: CryptocurrencyWhereUniqueInput
    data: XOR<CryptocurrencyUpdateWithoutParentInput, CryptocurrencyUncheckedUpdateWithoutParentInput>
  }

  export type CryptocurrencyUpdateManyWithWhereWithoutParentInput = {
    where: CryptocurrencyScalarWhereInput
    data: XOR<CryptocurrencyUpdateManyMutationInput, CryptocurrencyUncheckedUpdateManyWithoutChildrenInput>
  }

  export type CryptocurrencyCreateWithoutMarketInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    parent?: CryptocurrencyCreateNestedOneWithoutChildrenInput
    user: UserCreateNestedOneWithoutCryptocurrencyInput
    Children?: CryptocurrencyCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUncheckedCreateWithoutMarketInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    userId: string
    parentId?: string | null
    Children?: CryptocurrencyUncheckedCreateNestedManyWithoutParentInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyCreateOrConnectWithoutMarketInput = {
    where: CryptocurrencyWhereUniqueInput
    create: XOR<CryptocurrencyCreateWithoutMarketInput, CryptocurrencyUncheckedCreateWithoutMarketInput>
  }

  export type CryptocurrencyCreateManyMarketInputEnvelope = {
    data: Enumerable<CryptocurrencyCreateManyMarketInput>
    skipDuplicates?: boolean
  }

  export type CryptocurrencyUpsertWithWhereUniqueWithoutMarketInput = {
    where: CryptocurrencyWhereUniqueInput
    update: XOR<CryptocurrencyUpdateWithoutMarketInput, CryptocurrencyUncheckedUpdateWithoutMarketInput>
    create: XOR<CryptocurrencyCreateWithoutMarketInput, CryptocurrencyUncheckedCreateWithoutMarketInput>
  }

  export type CryptocurrencyUpdateWithWhereUniqueWithoutMarketInput = {
    where: CryptocurrencyWhereUniqueInput
    data: XOR<CryptocurrencyUpdateWithoutMarketInput, CryptocurrencyUncheckedUpdateWithoutMarketInput>
  }

  export type CryptocurrencyUpdateManyWithWhereWithoutMarketInput = {
    where: CryptocurrencyScalarWhereInput
    data: XOR<CryptocurrencyUpdateManyMutationInput, CryptocurrencyUncheckedUpdateManyWithoutCryptocurrencyInput>
  }

  export type BudgetCreateWithoutIncomeInput = {
    id?: string
    name: string
    User: UserCreateNestedOneWithoutBudgetInput
    Children?: BudgetItemCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUncheckedCreateWithoutIncomeInput = {
    id?: string
    name: string
    userId: string
    Children?: BudgetItemUncheckedCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetCreateOrConnectWithoutIncomeInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutIncomeInput, BudgetUncheckedCreateWithoutIncomeInput>
  }

  export type BudgetUpsertWithoutIncomeInput = {
    update: XOR<BudgetUpdateWithoutIncomeInput, BudgetUncheckedUpdateWithoutIncomeInput>
    create: XOR<BudgetCreateWithoutIncomeInput, BudgetUncheckedCreateWithoutIncomeInput>
  }

  export type BudgetUpdateWithoutIncomeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutBudgetNestedInput
    Children?: BudgetItemUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateWithoutIncomeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Children?: BudgetItemUncheckedUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutBudgetInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    settings?: SettingsCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBudgetInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
    role?: Role
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    cryptocurrency?: CryptocurrencyUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedCreateNestedManyWithoutUserInput
    cryptoSnapshots?: CryptoSnapshotUncheckedCreateNestedManyWithoutUserInput
    cashSnapshots?: CashSnapshotUncheckedCreateNestedManyWithoutUserInput
    propertySnapshots?: PropertySnapshotUncheckedCreateNestedManyWithoutUserInput
    securitySnapshots?: SecuritySnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBudgetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBudgetInput, UserUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetItemCreateWithoutBudgetInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemUncheckedCreateWithoutBudgetInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemCreateOrConnectWithoutBudgetInput = {
    where: BudgetItemWhereUniqueInput
    create: XOR<BudgetItemCreateWithoutBudgetInput, BudgetItemUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetItemCreateManyBudgetInputEnvelope = {
    data: Enumerable<BudgetItemCreateManyBudgetInput>
    skipDuplicates?: boolean
  }

  export type IncomeCreateWithoutBudgetInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeUncheckedCreateWithoutBudgetInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeCreateOrConnectWithoutBudgetInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutBudgetInput, IncomeUncheckedCreateWithoutBudgetInput>
  }

  export type IncomeCreateManyBudgetInputEnvelope = {
    data: Enumerable<IncomeCreateManyBudgetInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBudgetInput = {
    update: XOR<UserUpdateWithoutBudgetInput, UserUncheckedUpdateWithoutBudgetInput>
    create: XOR<UserCreateWithoutBudgetInput, UserUncheckedCreateWithoutBudgetInput>
  }

  export type UserUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    settings?: SettingsUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    cryptocurrency?: CryptocurrencyUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    portfolioSnapshot?: PortfolioSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cryptoSnapshots?: CryptoSnapshotUncheckedUpdateManyWithoutUserNestedInput
    cashSnapshots?: CashSnapshotUncheckedUpdateManyWithoutUserNestedInput
    propertySnapshots?: PropertySnapshotUncheckedUpdateManyWithoutUserNestedInput
    securitySnapshots?: SecuritySnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BudgetItemUpsertWithWhereUniqueWithoutBudgetInput = {
    where: BudgetItemWhereUniqueInput
    update: XOR<BudgetItemUpdateWithoutBudgetInput, BudgetItemUncheckedUpdateWithoutBudgetInput>
    create: XOR<BudgetItemCreateWithoutBudgetInput, BudgetItemUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetItemUpdateWithWhereUniqueWithoutBudgetInput = {
    where: BudgetItemWhereUniqueInput
    data: XOR<BudgetItemUpdateWithoutBudgetInput, BudgetItemUncheckedUpdateWithoutBudgetInput>
  }

  export type BudgetItemUpdateManyWithWhereWithoutBudgetInput = {
    where: BudgetItemScalarWhereInput
    data: XOR<BudgetItemUpdateManyMutationInput, BudgetItemUncheckedUpdateManyWithoutChildrenInput>
  }

  export type BudgetItemScalarWhereInput = {
    AND?: Enumerable<BudgetItemScalarWhereInput>
    OR?: Enumerable<BudgetItemScalarWhereInput>
    NOT?: Enumerable<BudgetItemScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    category?: StringFilter | string
    amount?: StringFilter | string
    frequency?: StringFilter | string
    budgetId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type IncomeUpsertWithWhereUniqueWithoutBudgetInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutBudgetInput, IncomeUncheckedUpdateWithoutBudgetInput>
    create: XOR<IncomeCreateWithoutBudgetInput, IncomeUncheckedCreateWithoutBudgetInput>
  }

  export type IncomeUpdateWithWhereUniqueWithoutBudgetInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutBudgetInput, IncomeUncheckedUpdateWithoutBudgetInput>
  }

  export type IncomeUpdateManyWithWhereWithoutBudgetInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutIncomeInput>
  }

  export type IncomeScalarWhereInput = {
    AND?: Enumerable<IncomeScalarWhereInput>
    OR?: Enumerable<IncomeScalarWhereInput>
    NOT?: Enumerable<IncomeScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    payFrequency?: StringFilter | string
    grossAmount?: StringFilter | string
    grossFrequency?: StringFilter | string
    userId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deleted?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type BudgetCreateWithoutChildrenInput = {
    id?: string
    name: string
    User: UserCreateNestedOneWithoutBudgetInput
    income?: IncomeCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    userId: string
    income?: IncomeUncheckedCreateNestedManyWithoutBudgetInput
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetCreateOrConnectWithoutChildrenInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutChildrenInput, BudgetUncheckedCreateWithoutChildrenInput>
  }

  export type BudgetUpsertWithoutChildrenInput = {
    update: XOR<BudgetUpdateWithoutChildrenInput, BudgetUncheckedUpdateWithoutChildrenInput>
    create: XOR<BudgetCreateWithoutChildrenInput, BudgetUncheckedCreateWithoutChildrenInput>
  }

  export type BudgetUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutBudgetNestedInput
    income?: IncomeUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    income?: IncomeUncheckedUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type BudgetCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyCreateManyUserInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type PortfolioSnapshotCreateManyUserInput = {
    id?: string
    currency: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptoSnapshotCreateManyUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CashSnapshotCreateManyUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type PropertySnapshotCreateManyUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type SecuritySnapshotCreateManyUserInput = {
    id?: string
    totalValue: Decimal | DecimalJsLike | number | string
    costBasis: Decimal | DecimalJsLike | number | string
    unrealisedGain: Decimal | DecimalJsLike | number | string
    realisedGain: Decimal | DecimalJsLike | number | string
    saleableValue: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BudgetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    Children?: BudgetItemUpdateManyWithoutBudgetNestedInput
    income?: IncomeUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    Children?: BudgetItemUncheckedUpdateManyWithoutBudgetNestedInput
    income?: IncomeUncheckedUpdateManyWithoutBudgetNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetUncheckedUpdateManyWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    market?: MarketUpdateOneWithoutCryptocurrencyNestedInput
    parent?: CryptocurrencyUpdateOneWithoutChildrenNestedInput
    Children?: CryptocurrencyUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    Children?: CryptocurrencyUncheckedUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateManyWithoutCryptocurrencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioSnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateManyWithoutPortfolioSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptoSnapshotUncheckedUpdateManyWithoutCryptoSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CashSnapshotUncheckedUpdateManyWithoutCashSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertySnapshotUncheckedUpdateManyWithoutPropertySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SecuritySnapshotUncheckedUpdateManyWithoutSecuritySnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unrealisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    saleableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyCreateManyParentInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    marketId?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    market?: MarketUpdateOneWithoutCryptocurrencyNestedInput
    user?: UserUpdateOneRequiredWithoutCryptocurrencyNestedInput
    Children?: CryptocurrencyUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    Children?: CryptocurrencyUncheckedUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateManyWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    marketId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyCreateManyMarketInput = {
    id?: string
    displayName: string
    currency?: string
    balance?: Decimal | DecimalJsLike | number | string
    costBasis?: Decimal | DecimalJsLike | number | string
    realisedGain?: Decimal | DecimalJsLike | number | string
    walletAddress?: string | null
    targetBalance?: Decimal | DecimalJsLike | number | string
    interestBearingBalance?: Decimal | DecimalJsLike | number | string
    rateOfIncome?: Decimal | DecimalJsLike | number | string
    accountConnection?: AccountConnection | null
    apiKey?: string | null
    apiSecret?: string | null
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type CryptocurrencyUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: CryptocurrencyUpdateOneWithoutChildrenNestedInput
    user?: UserUpdateOneRequiredWithoutCryptocurrencyNestedInput
    Children?: CryptocurrencyUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CryptocurrencyUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    costBasis?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realisedGain?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interestBearingBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rateOfIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    accountConnection?: NullableEnumAccountConnectionFieldUpdateOperationsInput | AccountConnection | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    Children?: CryptocurrencyUncheckedUpdateManyWithoutParentNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemCreateManyBudgetInput = {
    id?: string
    name: string
    category: string
    amount: string
    frequency: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type IncomeCreateManyBudgetInput = {
    id?: string
    name: string
    payFrequency: string
    grossAmount: string
    grossFrequency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deleted?: boolean
    deletedAt?: Date | string | null
  }

  export type BudgetItemUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BudgetItemUncheckedUpdateManyWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IncomeUncheckedUpdateManyWithoutIncomeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payFrequency?: StringFieldUpdateOperationsInput | string
    grossAmount?: StringFieldUpdateOperationsInput | string
    grossFrequency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}