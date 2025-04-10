
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Producer
 * 
 */
export type Producer = $Result.DefaultSelection<Prisma.$ProducerPayload>
/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model Crop
 * 
 */
export type Crop = $Result.DefaultSelection<Prisma.$CropPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const CropType: {
  SOYBEANS: 'SOYBEANS',
  CORN: 'CORN',
  COTTON: 'COTTON',
  COFFEE: 'COFFEE',
  SUGARCANE: 'SUGARCANE'
};

export type CropType = (typeof CropType)[keyof typeof CropType]


export const States: {
  AC: 'AC',
  AL: 'AL',
  AM: 'AM',
  AP: 'AP',
  BA: 'BA',
  CE: 'CE',
  DF: 'DF',
  ES: 'ES',
  GO: 'GO',
  MA: 'MA',
  MG: 'MG',
  MS: 'MS',
  MT: 'MT',
  PA: 'PA',
  PB: 'PB',
  PE: 'PE',
  PI: 'PI',
  PR: 'PR',
  RJ: 'RJ',
  RN: 'RN',
  RO: 'RO',
  RR: 'RR',
  RS: 'RS',
  SC: 'SC',
  SE: 'SE',
  SP: 'SP',
  TO: 'TO'
};

export type States = (typeof States)[keyof typeof States]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type CropType = $Enums.CropType

export const CropType: typeof $Enums.CropType

export type States = $Enums.States

export const States: typeof $Enums.States

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producer`: Exposes CRUD operations for the **Producer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Producers
    * const producers = await prisma.producer.findMany()
    * ```
    */
  get producer(): Prisma.ProducerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crop`: Exposes CRUD operations for the **Crop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crops
    * const crops = await prisma.crop.findMany()
    * ```
    */
  get crop(): Prisma.CropDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Producer: 'Producer',
    Farm: 'Farm',
    Crop: 'Crop',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "producer" | "farm" | "crop" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Producer: {
        payload: Prisma.$ProducerPayload<ExtArgs>
        fields: Prisma.ProducerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProducerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProducerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          findFirst: {
            args: Prisma.ProducerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProducerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          findMany: {
            args: Prisma.ProducerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          create: {
            args: Prisma.ProducerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          createMany: {
            args: Prisma.ProducerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProducerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          delete: {
            args: Prisma.ProducerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          update: {
            args: Prisma.ProducerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          deleteMany: {
            args: Prisma.ProducerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProducerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProducerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          upsert: {
            args: Prisma.ProducerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          aggregate: {
            args: Prisma.ProducerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducer>
          }
          groupBy: {
            args: Prisma.ProducerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProducerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProducerCountArgs<ExtArgs>
            result: $Utils.Optional<ProducerCountAggregateOutputType> | number
          }
        }
      }
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      Crop: {
        payload: Prisma.$CropPayload<ExtArgs>
        fields: Prisma.CropFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CropFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CropFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          findFirst: {
            args: Prisma.CropFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CropFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          findMany: {
            args: Prisma.CropFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>[]
          }
          create: {
            args: Prisma.CropCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          createMany: {
            args: Prisma.CropCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CropCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>[]
          }
          delete: {
            args: Prisma.CropDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          update: {
            args: Prisma.CropUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          deleteMany: {
            args: Prisma.CropDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CropUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CropUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>[]
          }
          upsert: {
            args: Prisma.CropUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropPayload>
          }
          aggregate: {
            args: Prisma.CropAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrop>
          }
          groupBy: {
            args: Prisma.CropGroupByArgs<ExtArgs>
            result: $Utils.Optional<CropGroupByOutputType>[]
          }
          count: {
            args: Prisma.CropCountArgs<ExtArgs>
            result: $Utils.Optional<CropCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    producer?: ProducerOmit
    farm?: FarmOmit
    crop?: CropOmit
    notification?: NotificationOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type ProducerCountOutputType
   */

  export type ProducerCountOutputType = {
    farms: number
    Notification: number
  }

  export type ProducerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | ProducerCountOutputTypeCountFarmsArgs
    Notification?: boolean | ProducerCountOutputTypeCountNotificationArgs
  }

  // Custom InputTypes
  /**
   * ProducerCountOutputType without action
   */
  export type ProducerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProducerCountOutputType
     */
    select?: ProducerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProducerCountOutputType without action
   */
  export type ProducerCountOutputTypeCountFarmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
  }

  /**
   * ProducerCountOutputType without action
   */
  export type ProducerCountOutputTypeCountNotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    crops: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crops?: boolean | FarmCountOutputTypeCountCropsArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountCropsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropWhereInput
  }


  /**
   * Models
   */

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
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Producer
   */

  export type AggregateProducer = {
    _count: ProducerCountAggregateOutputType | null
    _min: ProducerMinAggregateOutputType | null
    _max: ProducerMaxAggregateOutputType | null
  }

  export type ProducerMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    document: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProducerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    document: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProducerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    document: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProducerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    document?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProducerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    document?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProducerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    document?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProducerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producer to aggregate.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Producers
    **/
    _count?: true | ProducerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProducerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProducerMaxAggregateInputType
  }

  export type GetProducerAggregateType<T extends ProducerAggregateArgs> = {
        [P in keyof T & keyof AggregateProducer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducer[P]>
      : GetScalarType<T[P], AggregateProducer[P]>
  }




  export type ProducerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProducerWhereInput
    orderBy?: ProducerOrderByWithAggregationInput | ProducerOrderByWithAggregationInput[]
    by: ProducerScalarFieldEnum[] | ProducerScalarFieldEnum
    having?: ProducerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProducerCountAggregateInputType | true
    _min?: ProducerMinAggregateInputType
    _max?: ProducerMaxAggregateInputType
  }

  export type ProducerGroupByOutputType = {
    id: string
    name: string
    email: string
    document: string
    createdAt: Date
    updatedAt: Date | null
    _count: ProducerCountAggregateOutputType | null
    _min: ProducerMinAggregateOutputType | null
    _max: ProducerMaxAggregateOutputType | null
  }

  type GetProducerGroupByPayload<T extends ProducerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProducerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProducerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProducerGroupByOutputType[P]>
            : GetScalarType<T[P], ProducerGroupByOutputType[P]>
        }
      >
    >


  export type ProducerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    document?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farms?: boolean | Producer$farmsArgs<ExtArgs>
    Notification?: boolean | Producer$NotificationArgs<ExtArgs>
    _count?: boolean | ProducerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    document?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    document?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    document?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProducerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "document" | "createdAt" | "updatedAt", ExtArgs["result"]["producer"]>
  export type ProducerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | Producer$farmsArgs<ExtArgs>
    Notification?: boolean | Producer$NotificationArgs<ExtArgs>
    _count?: boolean | ProducerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProducerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProducerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProducerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producer"
    objects: {
      farms: Prisma.$FarmPayload<ExtArgs>[]
      Notification: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      document: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["producer"]>
    composites: {}
  }

  type ProducerGetPayload<S extends boolean | null | undefined | ProducerDefaultArgs> = $Result.GetResult<Prisma.$ProducerPayload, S>

  type ProducerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProducerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProducerCountAggregateInputType | true
    }

  export interface ProducerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producer'], meta: { name: 'Producer' } }
    /**
     * Find zero or one Producer that matches the filter.
     * @param {ProducerFindUniqueArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProducerFindUniqueArgs>(args: SelectSubset<T, ProducerFindUniqueArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProducerFindUniqueOrThrowArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProducerFindUniqueOrThrowArgs>(args: SelectSubset<T, ProducerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindFirstArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProducerFindFirstArgs>(args?: SelectSubset<T, ProducerFindFirstArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindFirstOrThrowArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProducerFindFirstOrThrowArgs>(args?: SelectSubset<T, ProducerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Producers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Producers
     * const producers = await prisma.producer.findMany()
     * 
     * // Get first 10 Producers
     * const producers = await prisma.producer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const producerWithIdOnly = await prisma.producer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProducerFindManyArgs>(args?: SelectSubset<T, ProducerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producer.
     * @param {ProducerCreateArgs} args - Arguments to create a Producer.
     * @example
     * // Create one Producer
     * const Producer = await prisma.producer.create({
     *   data: {
     *     // ... data to create a Producer
     *   }
     * })
     * 
     */
    create<T extends ProducerCreateArgs>(args: SelectSubset<T, ProducerCreateArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Producers.
     * @param {ProducerCreateManyArgs} args - Arguments to create many Producers.
     * @example
     * // Create many Producers
     * const producer = await prisma.producer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProducerCreateManyArgs>(args?: SelectSubset<T, ProducerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Producers and returns the data saved in the database.
     * @param {ProducerCreateManyAndReturnArgs} args - Arguments to create many Producers.
     * @example
     * // Create many Producers
     * const producer = await prisma.producer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Producers and only return the `id`
     * const producerWithIdOnly = await prisma.producer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProducerCreateManyAndReturnArgs>(args?: SelectSubset<T, ProducerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producer.
     * @param {ProducerDeleteArgs} args - Arguments to delete one Producer.
     * @example
     * // Delete one Producer
     * const Producer = await prisma.producer.delete({
     *   where: {
     *     // ... filter to delete one Producer
     *   }
     * })
     * 
     */
    delete<T extends ProducerDeleteArgs>(args: SelectSubset<T, ProducerDeleteArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producer.
     * @param {ProducerUpdateArgs} args - Arguments to update one Producer.
     * @example
     * // Update one Producer
     * const producer = await prisma.producer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProducerUpdateArgs>(args: SelectSubset<T, ProducerUpdateArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Producers.
     * @param {ProducerDeleteManyArgs} args - Arguments to filter Producers to delete.
     * @example
     * // Delete a few Producers
     * const { count } = await prisma.producer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProducerDeleteManyArgs>(args?: SelectSubset<T, ProducerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Producers
     * const producer = await prisma.producer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProducerUpdateManyArgs>(args: SelectSubset<T, ProducerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producers and returns the data updated in the database.
     * @param {ProducerUpdateManyAndReturnArgs} args - Arguments to update many Producers.
     * @example
     * // Update many Producers
     * const producer = await prisma.producer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Producers and only return the `id`
     * const producerWithIdOnly = await prisma.producer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProducerUpdateManyAndReturnArgs>(args: SelectSubset<T, ProducerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producer.
     * @param {ProducerUpsertArgs} args - Arguments to update or create a Producer.
     * @example
     * // Update or create a Producer
     * const producer = await prisma.producer.upsert({
     *   create: {
     *     // ... data to create a Producer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producer we want to update
     *   }
     * })
     */
    upsert<T extends ProducerUpsertArgs>(args: SelectSubset<T, ProducerUpsertArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Producers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerCountArgs} args - Arguments to filter Producers to count.
     * @example
     * // Count the number of Producers
     * const count = await prisma.producer.count({
     *   where: {
     *     // ... the filter for the Producers we want to count
     *   }
     * })
    **/
    count<T extends ProducerCountArgs>(
      args?: Subset<T, ProducerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProducerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProducerAggregateArgs>(args: Subset<T, ProducerAggregateArgs>): Prisma.PrismaPromise<GetProducerAggregateType<T>>

    /**
     * Group by Producer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerGroupByArgs} args - Group by arguments.
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
      T extends ProducerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProducerGroupByArgs['orderBy'] }
        : { orderBy?: ProducerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProducerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProducerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producer model
   */
  readonly fields: ProducerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProducerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farms<T extends Producer$farmsArgs<ExtArgs> = {}>(args?: Subset<T, Producer$farmsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Notification<T extends Producer$NotificationArgs<ExtArgs> = {}>(args?: Subset<T, Producer$NotificationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producer model
   */
  interface ProducerFieldRefs {
    readonly id: FieldRef<"Producer", 'String'>
    readonly name: FieldRef<"Producer", 'String'>
    readonly email: FieldRef<"Producer", 'String'>
    readonly document: FieldRef<"Producer", 'String'>
    readonly createdAt: FieldRef<"Producer", 'DateTime'>
    readonly updatedAt: FieldRef<"Producer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Producer findUnique
   */
  export type ProducerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer findUniqueOrThrow
   */
  export type ProducerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer findFirst
   */
  export type ProducerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Producers.
     */
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer findFirstOrThrow
   */
  export type ProducerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Producers.
     */
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer findMany
   */
  export type ProducerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producers to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer create
   */
  export type ProducerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The data needed to create a Producer.
     */
    data: XOR<ProducerCreateInput, ProducerUncheckedCreateInput>
  }

  /**
   * Producer createMany
   */
  export type ProducerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Producers.
     */
    data: ProducerCreateManyInput | ProducerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producer createManyAndReturn
   */
  export type ProducerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * The data used to create many Producers.
     */
    data: ProducerCreateManyInput | ProducerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producer update
   */
  export type ProducerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The data needed to update a Producer.
     */
    data: XOR<ProducerUpdateInput, ProducerUncheckedUpdateInput>
    /**
     * Choose, which Producer to update.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer updateMany
   */
  export type ProducerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Producers.
     */
    data: XOR<ProducerUpdateManyMutationInput, ProducerUncheckedUpdateManyInput>
    /**
     * Filter which Producers to update
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to update.
     */
    limit?: number
  }

  /**
   * Producer updateManyAndReturn
   */
  export type ProducerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * The data used to update Producers.
     */
    data: XOR<ProducerUpdateManyMutationInput, ProducerUncheckedUpdateManyInput>
    /**
     * Filter which Producers to update
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to update.
     */
    limit?: number
  }

  /**
   * Producer upsert
   */
  export type ProducerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The filter to search for the Producer to update in case it exists.
     */
    where: ProducerWhereUniqueInput
    /**
     * In case the Producer found by the `where` argument doesn't exist, create a new Producer with this data.
     */
    create: XOR<ProducerCreateInput, ProducerUncheckedCreateInput>
    /**
     * In case the Producer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProducerUpdateInput, ProducerUncheckedUpdateInput>
  }

  /**
   * Producer delete
   */
  export type ProducerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter which Producer to delete.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer deleteMany
   */
  export type ProducerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producers to delete
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to delete.
     */
    limit?: number
  }

  /**
   * Producer.farms
   */
  export type Producer$farmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    cursor?: FarmWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Producer.Notification
   */
  export type Producer$NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Producer without action
   */
  export type ProducerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
  }


  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmMinAggregateOutputType = {
    ownerId: string | null
    id: string | null
    name: string | null
    city: string | null
    state: $Enums.States | null
    farmArea: string | null
    vegetationArea: string | null
    agriculturalArea: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    ownerId: string | null
    id: string | null
    name: string | null
    city: string | null
    state: $Enums.States | null
    farmArea: string | null
    vegetationArea: string | null
    agriculturalArea: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    ownerId: number
    id: number
    name: number
    city: number
    state: number
    farmArea: number
    vegetationArea: number
    agriculturalArea: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FarmMinAggregateInputType = {
    ownerId?: true
    id?: true
    name?: true
    city?: true
    state?: true
    farmArea?: true
    vegetationArea?: true
    agriculturalArea?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmMaxAggregateInputType = {
    ownerId?: true
    id?: true
    name?: true
    city?: true
    state?: true
    farmArea?: true
    vegetationArea?: true
    agriculturalArea?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmCountAggregateInputType = {
    ownerId?: true
    id?: true
    name?: true
    city?: true
    state?: true
    farmArea?: true
    vegetationArea?: true
    agriculturalArea?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    ownerId: string
    id: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt: Date
    updatedAt: Date | null
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerId?: boolean
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    farmArea?: boolean
    vegetationArea?: boolean
    agriculturalArea?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    crops?: boolean | Farm$cropsArgs<ExtArgs>
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerId?: boolean
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    farmArea?: boolean
    vegetationArea?: boolean
    agriculturalArea?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerId?: boolean
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    farmArea?: boolean
    vegetationArea?: boolean
    agriculturalArea?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    ownerId?: boolean
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    farmArea?: boolean
    vegetationArea?: boolean
    agriculturalArea?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FarmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ownerId" | "id" | "name" | "city" | "state" | "farmArea" | "vegetationArea" | "agriculturalArea" | "createdAt" | "updatedAt", ExtArgs["result"]["farm"]>
  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crops?: boolean | Farm$cropsArgs<ExtArgs>
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
  }
  export type FarmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | ProducerDefaultArgs<ExtArgs>
  }

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      crops: Prisma.$CropPayload<ExtArgs>[]
      owner: Prisma.$ProducerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ownerId: string
      id: string
      name: string
      city: string
      state: $Enums.States
      farmArea: string
      vegetationArea: string
      agriculturalArea: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `ownerId`
     * const farmWithOwnerIdOnly = await prisma.farm.findMany({ select: { ownerId: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `ownerId`
     * const farmWithOwnerIdOnly = await prisma.farm.createManyAndReturn({
     *   select: { ownerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms and returns the data updated in the database.
     * @param {FarmUpdateManyAndReturnArgs} args - Arguments to update many Farms.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Farms and only return the `ownerId`
     * const farmWithOwnerIdOnly = await prisma.farm.updateManyAndReturn({
     *   select: { ownerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FarmUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
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
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crops<T extends Farm$cropsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$cropsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    owner<T extends ProducerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProducerDefaultArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Farm model
   */
  interface FarmFieldRefs {
    readonly ownerId: FieldRef<"Farm", 'String'>
    readonly id: FieldRef<"Farm", 'String'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly city: FieldRef<"Farm", 'String'>
    readonly state: FieldRef<"Farm", 'States'>
    readonly farmArea: FieldRef<"Farm", 'String'>
    readonly vegetationArea: FieldRef<"Farm", 'String'>
    readonly agriculturalArea: FieldRef<"Farm", 'String'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
    readonly updatedAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm updateManyAndReturn
   */
  export type FarmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to delete.
     */
    limit?: number
  }

  /**
   * Farm.crops
   */
  export type Farm$cropsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    where?: CropWhereInput
    orderBy?: CropOrderByWithRelationInput | CropOrderByWithRelationInput[]
    cursor?: CropWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CropScalarFieldEnum | CropScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model Crop
   */

  export type AggregateCrop = {
    _count: CropCountAggregateOutputType | null
    _min: CropMinAggregateOutputType | null
    _max: CropMaxAggregateOutputType | null
  }

  export type CropMinAggregateOutputType = {
    landId: string | null
    id: string | null
    type: $Enums.CropType | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CropMaxAggregateOutputType = {
    landId: string | null
    id: string | null
    type: $Enums.CropType | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CropCountAggregateOutputType = {
    landId: number
    id: number
    type: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CropMinAggregateInputType = {
    landId?: true
    id?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CropMaxAggregateInputType = {
    landId?: true
    id?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CropCountAggregateInputType = {
    landId?: true
    id?: true
    type?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CropAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crop to aggregate.
     */
    where?: CropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropOrderByWithRelationInput | CropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Crops
    **/
    _count?: true | CropCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CropMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CropMaxAggregateInputType
  }

  export type GetCropAggregateType<T extends CropAggregateArgs> = {
        [P in keyof T & keyof AggregateCrop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrop[P]>
      : GetScalarType<T[P], AggregateCrop[P]>
  }




  export type CropGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropWhereInput
    orderBy?: CropOrderByWithAggregationInput | CropOrderByWithAggregationInput[]
    by: CropScalarFieldEnum[] | CropScalarFieldEnum
    having?: CropScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CropCountAggregateInputType | true
    _min?: CropMinAggregateInputType
    _max?: CropMaxAggregateInputType
  }

  export type CropGroupByOutputType = {
    landId: string
    id: string
    type: $Enums.CropType
    description: string
    createdAt: Date
    updatedAt: Date | null
    _count: CropCountAggregateOutputType | null
    _min: CropMinAggregateOutputType | null
    _max: CropMaxAggregateOutputType | null
  }

  type GetCropGroupByPayload<T extends CropGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CropGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CropGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CropGroupByOutputType[P]>
            : GetScalarType<T[P], CropGroupByOutputType[P]>
        }
      >
    >


  export type CropSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    landId?: boolean
    id?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crop"]>

  export type CropSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    landId?: boolean
    id?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crop"]>

  export type CropSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    landId?: boolean
    id?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crop"]>

  export type CropSelectScalar = {
    landId?: boolean
    id?: boolean
    type?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CropOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"landId" | "id" | "type" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["crop"]>
  export type CropInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type CropIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type CropIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    land?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $CropPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Crop"
    objects: {
      land: Prisma.$FarmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      landId: string
      id: string
      type: $Enums.CropType
      description: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["crop"]>
    composites: {}
  }

  type CropGetPayload<S extends boolean | null | undefined | CropDefaultArgs> = $Result.GetResult<Prisma.$CropPayload, S>

  type CropCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CropFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CropCountAggregateInputType | true
    }

  export interface CropDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Crop'], meta: { name: 'Crop' } }
    /**
     * Find zero or one Crop that matches the filter.
     * @param {CropFindUniqueArgs} args - Arguments to find a Crop
     * @example
     * // Get one Crop
     * const crop = await prisma.crop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CropFindUniqueArgs>(args: SelectSubset<T, CropFindUniqueArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Crop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CropFindUniqueOrThrowArgs} args - Arguments to find a Crop
     * @example
     * // Get one Crop
     * const crop = await prisma.crop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CropFindUniqueOrThrowArgs>(args: SelectSubset<T, CropFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Crop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropFindFirstArgs} args - Arguments to find a Crop
     * @example
     * // Get one Crop
     * const crop = await prisma.crop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CropFindFirstArgs>(args?: SelectSubset<T, CropFindFirstArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Crop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropFindFirstOrThrowArgs} args - Arguments to find a Crop
     * @example
     * // Get one Crop
     * const crop = await prisma.crop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CropFindFirstOrThrowArgs>(args?: SelectSubset<T, CropFindFirstOrThrowArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Crops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crops
     * const crops = await prisma.crop.findMany()
     * 
     * // Get first 10 Crops
     * const crops = await prisma.crop.findMany({ take: 10 })
     * 
     * // Only select the `landId`
     * const cropWithLandIdOnly = await prisma.crop.findMany({ select: { landId: true } })
     * 
     */
    findMany<T extends CropFindManyArgs>(args?: SelectSubset<T, CropFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Crop.
     * @param {CropCreateArgs} args - Arguments to create a Crop.
     * @example
     * // Create one Crop
     * const Crop = await prisma.crop.create({
     *   data: {
     *     // ... data to create a Crop
     *   }
     * })
     * 
     */
    create<T extends CropCreateArgs>(args: SelectSubset<T, CropCreateArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Crops.
     * @param {CropCreateManyArgs} args - Arguments to create many Crops.
     * @example
     * // Create many Crops
     * const crop = await prisma.crop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CropCreateManyArgs>(args?: SelectSubset<T, CropCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Crops and returns the data saved in the database.
     * @param {CropCreateManyAndReturnArgs} args - Arguments to create many Crops.
     * @example
     * // Create many Crops
     * const crop = await prisma.crop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Crops and only return the `landId`
     * const cropWithLandIdOnly = await prisma.crop.createManyAndReturn({
     *   select: { landId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CropCreateManyAndReturnArgs>(args?: SelectSubset<T, CropCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Crop.
     * @param {CropDeleteArgs} args - Arguments to delete one Crop.
     * @example
     * // Delete one Crop
     * const Crop = await prisma.crop.delete({
     *   where: {
     *     // ... filter to delete one Crop
     *   }
     * })
     * 
     */
    delete<T extends CropDeleteArgs>(args: SelectSubset<T, CropDeleteArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Crop.
     * @param {CropUpdateArgs} args - Arguments to update one Crop.
     * @example
     * // Update one Crop
     * const crop = await prisma.crop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CropUpdateArgs>(args: SelectSubset<T, CropUpdateArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Crops.
     * @param {CropDeleteManyArgs} args - Arguments to filter Crops to delete.
     * @example
     * // Delete a few Crops
     * const { count } = await prisma.crop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CropDeleteManyArgs>(args?: SelectSubset<T, CropDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crops
     * const crop = await prisma.crop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CropUpdateManyArgs>(args: SelectSubset<T, CropUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crops and returns the data updated in the database.
     * @param {CropUpdateManyAndReturnArgs} args - Arguments to update many Crops.
     * @example
     * // Update many Crops
     * const crop = await prisma.crop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Crops and only return the `landId`
     * const cropWithLandIdOnly = await prisma.crop.updateManyAndReturn({
     *   select: { landId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CropUpdateManyAndReturnArgs>(args: SelectSubset<T, CropUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Crop.
     * @param {CropUpsertArgs} args - Arguments to update or create a Crop.
     * @example
     * // Update or create a Crop
     * const crop = await prisma.crop.upsert({
     *   create: {
     *     // ... data to create a Crop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crop we want to update
     *   }
     * })
     */
    upsert<T extends CropUpsertArgs>(args: SelectSubset<T, CropUpsertArgs<ExtArgs>>): Prisma__CropClient<$Result.GetResult<Prisma.$CropPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCountArgs} args - Arguments to filter Crops to count.
     * @example
     * // Count the number of Crops
     * const count = await prisma.crop.count({
     *   where: {
     *     // ... the filter for the Crops we want to count
     *   }
     * })
    **/
    count<T extends CropCountArgs>(
      args?: Subset<T, CropCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CropCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CropAggregateArgs>(args: Subset<T, CropAggregateArgs>): Prisma.PrismaPromise<GetCropAggregateType<T>>

    /**
     * Group by Crop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropGroupByArgs} args - Group by arguments.
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
      T extends CropGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CropGroupByArgs['orderBy'] }
        : { orderBy?: CropGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, CropGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCropGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Crop model
   */
  readonly fields: CropFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Crop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CropClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    land<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Crop model
   */
  interface CropFieldRefs {
    readonly landId: FieldRef<"Crop", 'String'>
    readonly id: FieldRef<"Crop", 'String'>
    readonly type: FieldRef<"Crop", 'CropType'>
    readonly description: FieldRef<"Crop", 'String'>
    readonly createdAt: FieldRef<"Crop", 'DateTime'>
    readonly updatedAt: FieldRef<"Crop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Crop findUnique
   */
  export type CropFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter, which Crop to fetch.
     */
    where: CropWhereUniqueInput
  }

  /**
   * Crop findUniqueOrThrow
   */
  export type CropFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter, which Crop to fetch.
     */
    where: CropWhereUniqueInput
  }

  /**
   * Crop findFirst
   */
  export type CropFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter, which Crop to fetch.
     */
    where?: CropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropOrderByWithRelationInput | CropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crops.
     */
    cursor?: CropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crops.
     */
    distinct?: CropScalarFieldEnum | CropScalarFieldEnum[]
  }

  /**
   * Crop findFirstOrThrow
   */
  export type CropFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter, which Crop to fetch.
     */
    where?: CropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropOrderByWithRelationInput | CropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crops.
     */
    cursor?: CropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crops.
     */
    distinct?: CropScalarFieldEnum | CropScalarFieldEnum[]
  }

  /**
   * Crop findMany
   */
  export type CropFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where?: CropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropOrderByWithRelationInput | CropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Crops.
     */
    cursor?: CropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    distinct?: CropScalarFieldEnum | CropScalarFieldEnum[]
  }

  /**
   * Crop create
   */
  export type CropCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * The data needed to create a Crop.
     */
    data: XOR<CropCreateInput, CropUncheckedCreateInput>
  }

  /**
   * Crop createMany
   */
  export type CropCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Crops.
     */
    data: CropCreateManyInput | CropCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Crop createManyAndReturn
   */
  export type CropCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * The data used to create many Crops.
     */
    data: CropCreateManyInput | CropCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Crop update
   */
  export type CropUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * The data needed to update a Crop.
     */
    data: XOR<CropUpdateInput, CropUncheckedUpdateInput>
    /**
     * Choose, which Crop to update.
     */
    where: CropWhereUniqueInput
  }

  /**
   * Crop updateMany
   */
  export type CropUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Crops.
     */
    data: XOR<CropUpdateManyMutationInput, CropUncheckedUpdateManyInput>
    /**
     * Filter which Crops to update
     */
    where?: CropWhereInput
    /**
     * Limit how many Crops to update.
     */
    limit?: number
  }

  /**
   * Crop updateManyAndReturn
   */
  export type CropUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * The data used to update Crops.
     */
    data: XOR<CropUpdateManyMutationInput, CropUncheckedUpdateManyInput>
    /**
     * Filter which Crops to update
     */
    where?: CropWhereInput
    /**
     * Limit how many Crops to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Crop upsert
   */
  export type CropUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * The filter to search for the Crop to update in case it exists.
     */
    where: CropWhereUniqueInput
    /**
     * In case the Crop found by the `where` argument doesn't exist, create a new Crop with this data.
     */
    create: XOR<CropCreateInput, CropUncheckedCreateInput>
    /**
     * In case the Crop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CropUpdateInput, CropUncheckedUpdateInput>
  }

  /**
   * Crop delete
   */
  export type CropDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
    /**
     * Filter which Crop to delete.
     */
    where: CropWhereUniqueInput
  }

  /**
   * Crop deleteMany
   */
  export type CropDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crops to delete
     */
    where?: CropWhereInput
    /**
     * Limit how many Crops to delete.
     */
    limit?: number
  }

  /**
   * Crop without action
   */
  export type CropDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crop
     */
    select?: CropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crop
     */
    omit?: CropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    recipientId: string | null
    userId: string | null
    id: string | null
    title: string | null
    content: string | null
    readAt: Date | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    recipientId: string | null
    userId: string | null
    id: string | null
    title: string | null
    content: string | null
    readAt: Date | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    recipientId: number
    userId: number
    id: number
    title: number
    content: number
    readAt: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    recipientId?: true
    userId?: true
    id?: true
    title?: true
    content?: true
    readAt?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    recipientId?: true
    userId?: true
    id?: true
    title?: true
    content?: true
    readAt?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    recipientId?: true
    userId?: true
    id?: true
    title?: true
    content?: true
    readAt?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    recipientId: string
    userId: string | null
    id: string
    title: string
    content: string
    readAt: Date | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recipientId?: boolean
    userId?: boolean
    id?: boolean
    title?: boolean
    content?: boolean
    readAt?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recipientId?: boolean
    userId?: boolean
    id?: boolean
    title?: boolean
    content?: boolean
    readAt?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recipientId?: boolean
    userId?: boolean
    id?: boolean
    title?: boolean
    content?: boolean
    readAt?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    recipientId?: boolean
    userId?: boolean
    id?: boolean
    title?: boolean
    content?: boolean
    readAt?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"recipientId" | "userId" | "id" | "title" | "content" | "readAt" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    recipient?: boolean | ProducerDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      recipient: Prisma.$ProducerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      recipientId: string
      userId: string | null
      id: string
      title: string
      content: string
      readAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `recipientId`
     * const notificationWithRecipientIdOnly = await prisma.notification.findMany({ select: { recipientId: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `recipientId`
     * const notificationWithRecipientIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { recipientId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `recipientId`
     * const notificationWithRecipientIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { recipientId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Notification$userArgs<ExtArgs> = {}>(args?: Subset<T, Notification$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recipient<T extends ProducerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProducerDefaultArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly recipientId: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly readAt: FieldRef<"Notification", 'DateTime'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.user
   */
  export type Notification$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProducerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    document: 'document',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProducerScalarFieldEnum = (typeof ProducerScalarFieldEnum)[keyof typeof ProducerScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    ownerId: 'ownerId',
    id: 'id',
    name: 'name',
    city: 'city',
    state: 'state',
    farmArea: 'farmArea',
    vegetationArea: 'vegetationArea',
    agriculturalArea: 'agriculturalArea',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const CropScalarFieldEnum: {
    landId: 'landId',
    id: 'id',
    type: 'type',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CropScalarFieldEnum = (typeof CropScalarFieldEnum)[keyof typeof CropScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    recipientId: 'recipientId',
    userId: 'userId',
    id: 'id',
    title: 'title',
    content: 'content',
    readAt: 'readAt',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'States'
   */
  export type EnumStatesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'States'>
    


  /**
   * Reference to a field of type 'States[]'
   */
  export type ListEnumStatesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'States[]'>
    


  /**
   * Reference to a field of type 'CropType'
   */
  export type EnumCropTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CropType'>
    


  /**
   * Reference to a field of type 'CropType[]'
   */
  export type ListEnumCropTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CropType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    notifications?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ProducerWhereInput = {
    AND?: ProducerWhereInput | ProducerWhereInput[]
    OR?: ProducerWhereInput[]
    NOT?: ProducerWhereInput | ProducerWhereInput[]
    id?: StringFilter<"Producer"> | string
    name?: StringFilter<"Producer"> | string
    email?: StringFilter<"Producer"> | string
    document?: StringFilter<"Producer"> | string
    createdAt?: DateTimeFilter<"Producer"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Producer"> | Date | string | null
    farms?: FarmListRelationFilter
    Notification?: NotificationListRelationFilter
  }

  export type ProducerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    document?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    farms?: FarmOrderByRelationAggregateInput
    Notification?: NotificationOrderByRelationAggregateInput
  }

  export type ProducerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    document?: string
    AND?: ProducerWhereInput | ProducerWhereInput[]
    OR?: ProducerWhereInput[]
    NOT?: ProducerWhereInput | ProducerWhereInput[]
    name?: StringFilter<"Producer"> | string
    createdAt?: DateTimeFilter<"Producer"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Producer"> | Date | string | null
    farms?: FarmListRelationFilter
    Notification?: NotificationListRelationFilter
  }, "id" | "email" | "document">

  export type ProducerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    document?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ProducerCountOrderByAggregateInput
    _max?: ProducerMaxOrderByAggregateInput
    _min?: ProducerMinOrderByAggregateInput
  }

  export type ProducerScalarWhereWithAggregatesInput = {
    AND?: ProducerScalarWhereWithAggregatesInput | ProducerScalarWhereWithAggregatesInput[]
    OR?: ProducerScalarWhereWithAggregatesInput[]
    NOT?: ProducerScalarWhereWithAggregatesInput | ProducerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Producer"> | string
    name?: StringWithAggregatesFilter<"Producer"> | string
    email?: StringWithAggregatesFilter<"Producer"> | string
    document?: StringWithAggregatesFilter<"Producer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Producer"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Producer"> | Date | string | null
  }

  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    ownerId?: StringFilter<"Farm"> | string
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    city?: StringFilter<"Farm"> | string
    state?: EnumStatesFilter<"Farm"> | $Enums.States
    farmArea?: StringFilter<"Farm"> | string
    vegetationArea?: StringFilter<"Farm"> | string
    agriculturalArea?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Farm"> | Date | string | null
    crops?: CropListRelationFilter
    owner?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
  }

  export type FarmOrderByWithRelationInput = {
    ownerId?: SortOrder
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    farmArea?: SortOrder
    vegetationArea?: SortOrder
    agriculturalArea?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    crops?: CropOrderByRelationAggregateInput
    owner?: ProducerOrderByWithRelationInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    ownerId?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    city?: StringFilter<"Farm"> | string
    state?: EnumStatesFilter<"Farm"> | $Enums.States
    farmArea?: StringFilter<"Farm"> | string
    vegetationArea?: StringFilter<"Farm"> | string
    agriculturalArea?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Farm"> | Date | string | null
    crops?: CropListRelationFilter
    owner?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    ownerId?: SortOrder
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    farmArea?: SortOrder
    vegetationArea?: SortOrder
    agriculturalArea?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: FarmCountOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    ownerId?: StringWithAggregatesFilter<"Farm"> | string
    id?: StringWithAggregatesFilter<"Farm"> | string
    name?: StringWithAggregatesFilter<"Farm"> | string
    city?: StringWithAggregatesFilter<"Farm"> | string
    state?: EnumStatesWithAggregatesFilter<"Farm"> | $Enums.States
    farmArea?: StringWithAggregatesFilter<"Farm"> | string
    vegetationArea?: StringWithAggregatesFilter<"Farm"> | string
    agriculturalArea?: StringWithAggregatesFilter<"Farm"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Farm"> | Date | string | null
  }

  export type CropWhereInput = {
    AND?: CropWhereInput | CropWhereInput[]
    OR?: CropWhereInput[]
    NOT?: CropWhereInput | CropWhereInput[]
    landId?: StringFilter<"Crop"> | string
    id?: StringFilter<"Crop"> | string
    type?: EnumCropTypeFilter<"Crop"> | $Enums.CropType
    description?: StringFilter<"Crop"> | string
    createdAt?: DateTimeFilter<"Crop"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Crop"> | Date | string | null
    land?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }

  export type CropOrderByWithRelationInput = {
    landId?: SortOrder
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    land?: FarmOrderByWithRelationInput
  }

  export type CropWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CropWhereInput | CropWhereInput[]
    OR?: CropWhereInput[]
    NOT?: CropWhereInput | CropWhereInput[]
    landId?: StringFilter<"Crop"> | string
    type?: EnumCropTypeFilter<"Crop"> | $Enums.CropType
    description?: StringFilter<"Crop"> | string
    createdAt?: DateTimeFilter<"Crop"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Crop"> | Date | string | null
    land?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }, "id">

  export type CropOrderByWithAggregationInput = {
    landId?: SortOrder
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: CropCountOrderByAggregateInput
    _max?: CropMaxOrderByAggregateInput
    _min?: CropMinOrderByAggregateInput
  }

  export type CropScalarWhereWithAggregatesInput = {
    AND?: CropScalarWhereWithAggregatesInput | CropScalarWhereWithAggregatesInput[]
    OR?: CropScalarWhereWithAggregatesInput[]
    NOT?: CropScalarWhereWithAggregatesInput | CropScalarWhereWithAggregatesInput[]
    landId?: StringWithAggregatesFilter<"Crop"> | string
    id?: StringWithAggregatesFilter<"Crop"> | string
    type?: EnumCropTypeWithAggregatesFilter<"Crop"> | $Enums.CropType
    description?: StringWithAggregatesFilter<"Crop"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Crop"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Crop"> | Date | string | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    recipientId?: StringFilter<"Notification"> | string
    userId?: StringNullableFilter<"Notification"> | string | null
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recipient?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    recipientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    readAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    recipient?: ProducerOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    recipientId?: StringFilter<"Notification"> | string
    userId?: StringNullableFilter<"Notification"> | string | null
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recipient?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    recipientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    readAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    recipientId?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    id?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    content?: StringWithAggregatesFilter<"Notification"> | string
    readAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string | null
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProducerCreateInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    farms?: FarmCreateNestedManyWithoutOwnerInput
    Notification?: NotificationCreateNestedManyWithoutRecipientInput
  }

  export type ProducerUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    farms?: FarmUncheckedCreateNestedManyWithoutOwnerInput
    Notification?: NotificationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type ProducerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farms?: FarmUpdateManyWithoutOwnerNestedInput
    Notification?: NotificationUpdateManyWithoutRecipientNestedInput
  }

  export type ProducerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farms?: FarmUncheckedUpdateManyWithoutOwnerNestedInput
    Notification?: NotificationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type ProducerCreateManyInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type ProducerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProducerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FarmCreateInput = {
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    crops?: CropCreateNestedManyWithoutLandInput
    owner: ProducerCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateInput = {
    ownerId: string
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    crops?: CropUncheckedCreateNestedManyWithoutLandInput
  }

  export type FarmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crops?: CropUpdateManyWithoutLandNestedInput
    owner?: ProducerUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crops?: CropUncheckedUpdateManyWithoutLandNestedInput
  }

  export type FarmCreateManyInput = {
    ownerId: string
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type FarmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FarmUncheckedUpdateManyInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CropCreateInput = {
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    land: FarmCreateNestedOneWithoutCropsInput
  }

  export type CropUncheckedCreateInput = {
    landId: string
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CropUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    land?: FarmUpdateOneRequiredWithoutCropsNestedInput
  }

  export type CropUncheckedUpdateInput = {
    landId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CropCreateManyInput = {
    landId: string
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CropUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CropUncheckedUpdateManyInput = {
    landId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutNotificationsInput
    recipient: ProducerCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateInput = {
    recipientId: string
    userId?: string | null
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNotificationsNestedInput
    recipient?: ProducerUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    recipientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    recipientId: string
    userId?: string | null
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    recipientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FarmListRelationFilter = {
    every?: FarmWhereInput
    some?: FarmWhereInput
    none?: FarmWhereInput
  }

  export type FarmOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProducerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    document?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProducerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    document?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProducerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    document?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatesFilter<$PrismaModel = never> = {
    equals?: $Enums.States | EnumStatesFieldRefInput<$PrismaModel>
    in?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    notIn?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    not?: NestedEnumStatesFilter<$PrismaModel> | $Enums.States
  }

  export type CropListRelationFilter = {
    every?: CropWhereInput
    some?: CropWhereInput
    none?: CropWhereInput
  }

  export type ProducerScalarRelationFilter = {
    is?: ProducerWhereInput
    isNot?: ProducerWhereInput
  }

  export type CropOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    ownerId?: SortOrder
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    farmArea?: SortOrder
    vegetationArea?: SortOrder
    agriculturalArea?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    ownerId?: SortOrder
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    farmArea?: SortOrder
    vegetationArea?: SortOrder
    agriculturalArea?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    ownerId?: SortOrder
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    farmArea?: SortOrder
    vegetationArea?: SortOrder
    agriculturalArea?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.States | EnumStatesFieldRefInput<$PrismaModel>
    in?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    notIn?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    not?: NestedEnumStatesWithAggregatesFilter<$PrismaModel> | $Enums.States
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatesFilter<$PrismaModel>
    _max?: NestedEnumStatesFilter<$PrismaModel>
  }

  export type EnumCropTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeFilter<$PrismaModel> | $Enums.CropType
  }

  export type FarmScalarRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type CropCountOrderByAggregateInput = {
    landId?: SortOrder
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CropMaxOrderByAggregateInput = {
    landId?: SortOrder
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CropMinOrderByAggregateInput = {
    landId?: SortOrder
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCropTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeWithAggregatesFilter<$PrismaModel> | $Enums.CropType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCropTypeFilter<$PrismaModel>
    _max?: NestedEnumCropTypeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type NotificationCountOrderByAggregateInput = {
    recipientId?: SortOrder
    userId?: SortOrder
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    recipientId?: SortOrder
    userId?: SortOrder
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    recipientId?: SortOrder
    userId?: SortOrder
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    readAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type FarmCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutRecipientInput = {
    create?: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput> | NotificationCreateWithoutRecipientInput[] | NotificationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRecipientInput | NotificationCreateOrConnectWithoutRecipientInput[]
    createMany?: NotificationCreateManyRecipientInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type FarmUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutRecipientInput = {
    create?: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput> | NotificationCreateWithoutRecipientInput[] | NotificationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRecipientInput | NotificationCreateOrConnectWithoutRecipientInput[]
    createMany?: NotificationCreateManyRecipientInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type FarmUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutOwnerInput | FarmUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutOwnerInput | FarmUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutOwnerInput | FarmUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutRecipientNestedInput = {
    create?: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput> | NotificationCreateWithoutRecipientInput[] | NotificationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRecipientInput | NotificationCreateOrConnectWithoutRecipientInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRecipientInput | NotificationUpsertWithWhereUniqueWithoutRecipientInput[]
    createMany?: NotificationCreateManyRecipientInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRecipientInput | NotificationUpdateWithWhereUniqueWithoutRecipientInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRecipientInput | NotificationUpdateManyWithWhereWithoutRecipientInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type FarmUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutOwnerInput | FarmUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutOwnerInput | FarmUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutOwnerInput | FarmUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutRecipientNestedInput = {
    create?: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput> | NotificationCreateWithoutRecipientInput[] | NotificationUncheckedCreateWithoutRecipientInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRecipientInput | NotificationCreateOrConnectWithoutRecipientInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRecipientInput | NotificationUpsertWithWhereUniqueWithoutRecipientInput[]
    createMany?: NotificationCreateManyRecipientInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRecipientInput | NotificationUpdateWithWhereUniqueWithoutRecipientInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRecipientInput | NotificationUpdateManyWithWhereWithoutRecipientInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CropCreateNestedManyWithoutLandInput = {
    create?: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput> | CropCreateWithoutLandInput[] | CropUncheckedCreateWithoutLandInput[]
    connectOrCreate?: CropCreateOrConnectWithoutLandInput | CropCreateOrConnectWithoutLandInput[]
    createMany?: CropCreateManyLandInputEnvelope
    connect?: CropWhereUniqueInput | CropWhereUniqueInput[]
  }

  export type ProducerCreateNestedOneWithoutFarmsInput = {
    create?: XOR<ProducerCreateWithoutFarmsInput, ProducerUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutFarmsInput
    connect?: ProducerWhereUniqueInput
  }

  export type CropUncheckedCreateNestedManyWithoutLandInput = {
    create?: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput> | CropCreateWithoutLandInput[] | CropUncheckedCreateWithoutLandInput[]
    connectOrCreate?: CropCreateOrConnectWithoutLandInput | CropCreateOrConnectWithoutLandInput[]
    createMany?: CropCreateManyLandInputEnvelope
    connect?: CropWhereUniqueInput | CropWhereUniqueInput[]
  }

  export type EnumStatesFieldUpdateOperationsInput = {
    set?: $Enums.States
  }

  export type CropUpdateManyWithoutLandNestedInput = {
    create?: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput> | CropCreateWithoutLandInput[] | CropUncheckedCreateWithoutLandInput[]
    connectOrCreate?: CropCreateOrConnectWithoutLandInput | CropCreateOrConnectWithoutLandInput[]
    upsert?: CropUpsertWithWhereUniqueWithoutLandInput | CropUpsertWithWhereUniqueWithoutLandInput[]
    createMany?: CropCreateManyLandInputEnvelope
    set?: CropWhereUniqueInput | CropWhereUniqueInput[]
    disconnect?: CropWhereUniqueInput | CropWhereUniqueInput[]
    delete?: CropWhereUniqueInput | CropWhereUniqueInput[]
    connect?: CropWhereUniqueInput | CropWhereUniqueInput[]
    update?: CropUpdateWithWhereUniqueWithoutLandInput | CropUpdateWithWhereUniqueWithoutLandInput[]
    updateMany?: CropUpdateManyWithWhereWithoutLandInput | CropUpdateManyWithWhereWithoutLandInput[]
    deleteMany?: CropScalarWhereInput | CropScalarWhereInput[]
  }

  export type ProducerUpdateOneRequiredWithoutFarmsNestedInput = {
    create?: XOR<ProducerCreateWithoutFarmsInput, ProducerUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutFarmsInput
    upsert?: ProducerUpsertWithoutFarmsInput
    connect?: ProducerWhereUniqueInput
    update?: XOR<XOR<ProducerUpdateToOneWithWhereWithoutFarmsInput, ProducerUpdateWithoutFarmsInput>, ProducerUncheckedUpdateWithoutFarmsInput>
  }

  export type CropUncheckedUpdateManyWithoutLandNestedInput = {
    create?: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput> | CropCreateWithoutLandInput[] | CropUncheckedCreateWithoutLandInput[]
    connectOrCreate?: CropCreateOrConnectWithoutLandInput | CropCreateOrConnectWithoutLandInput[]
    upsert?: CropUpsertWithWhereUniqueWithoutLandInput | CropUpsertWithWhereUniqueWithoutLandInput[]
    createMany?: CropCreateManyLandInputEnvelope
    set?: CropWhereUniqueInput | CropWhereUniqueInput[]
    disconnect?: CropWhereUniqueInput | CropWhereUniqueInput[]
    delete?: CropWhereUniqueInput | CropWhereUniqueInput[]
    connect?: CropWhereUniqueInput | CropWhereUniqueInput[]
    update?: CropUpdateWithWhereUniqueWithoutLandInput | CropUpdateWithWhereUniqueWithoutLandInput[]
    updateMany?: CropUpdateManyWithWhereWithoutLandInput | CropUpdateManyWithWhereWithoutLandInput[]
    deleteMany?: CropScalarWhereInput | CropScalarWhereInput[]
  }

  export type FarmCreateNestedOneWithoutCropsInput = {
    create?: XOR<FarmCreateWithoutCropsInput, FarmUncheckedCreateWithoutCropsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutCropsInput
    connect?: FarmWhereUniqueInput
  }

  export type EnumCropTypeFieldUpdateOperationsInput = {
    set?: $Enums.CropType
  }

  export type FarmUpdateOneRequiredWithoutCropsNestedInput = {
    create?: XOR<FarmCreateWithoutCropsInput, FarmUncheckedCreateWithoutCropsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutCropsInput
    upsert?: FarmUpsertWithoutCropsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutCropsInput, FarmUpdateWithoutCropsInput>, FarmUncheckedUpdateWithoutCropsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type ProducerCreateNestedOneWithoutNotificationInput = {
    create?: XOR<ProducerCreateWithoutNotificationInput, ProducerUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutNotificationInput
    connect?: ProducerWhereUniqueInput
  }

  export type UserUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type ProducerUpdateOneRequiredWithoutNotificationNestedInput = {
    create?: XOR<ProducerCreateWithoutNotificationInput, ProducerUncheckedCreateWithoutNotificationInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutNotificationInput
    upsert?: ProducerUpsertWithoutNotificationInput
    connect?: ProducerWhereUniqueInput
    update?: XOR<XOR<ProducerUpdateToOneWithWhereWithoutNotificationInput, ProducerUpdateWithoutNotificationInput>, ProducerUncheckedUpdateWithoutNotificationInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatesFilter<$PrismaModel = never> = {
    equals?: $Enums.States | EnumStatesFieldRefInput<$PrismaModel>
    in?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    notIn?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    not?: NestedEnumStatesFilter<$PrismaModel> | $Enums.States
  }

  export type NestedEnumStatesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.States | EnumStatesFieldRefInput<$PrismaModel>
    in?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    notIn?: $Enums.States[] | ListEnumStatesFieldRefInput<$PrismaModel>
    not?: NestedEnumStatesWithAggregatesFilter<$PrismaModel> | $Enums.States
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatesFilter<$PrismaModel>
    _max?: NestedEnumStatesFilter<$PrismaModel>
  }

  export type NestedEnumCropTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeFilter<$PrismaModel> | $Enums.CropType
  }

  export type NestedEnumCropTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeWithAggregatesFilter<$PrismaModel> | $Enums.CropType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCropTypeFilter<$PrismaModel>
    _max?: NestedEnumCropTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
    recipient: ProducerCreateNestedOneWithoutNotificationInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    recipientId: string
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    recipientId?: StringFilter<"Notification"> | string
    userId?: StringNullableFilter<"Notification"> | string | null
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type FarmCreateWithoutOwnerInput = {
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    crops?: CropCreateNestedManyWithoutLandInput
  }

  export type FarmUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    crops?: CropUncheckedCreateNestedManyWithoutLandInput
  }

  export type FarmCreateOrConnectWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmCreateManyOwnerInputEnvelope = {
    data: FarmCreateManyOwnerInput | FarmCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutRecipientInput = {
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutRecipientInput = {
    userId?: string | null
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutRecipientInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput>
  }

  export type NotificationCreateManyRecipientInputEnvelope = {
    data: NotificationCreateManyRecipientInput | NotificationCreateManyRecipientInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    update: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmUpdateWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    data: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
  }

  export type FarmUpdateManyWithWhereWithoutOwnerInput = {
    where: FarmScalarWhereInput
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyWithoutOwnerInput>
  }

  export type FarmScalarWhereInput = {
    AND?: FarmScalarWhereInput | FarmScalarWhereInput[]
    OR?: FarmScalarWhereInput[]
    NOT?: FarmScalarWhereInput | FarmScalarWhereInput[]
    ownerId?: StringFilter<"Farm"> | string
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    city?: StringFilter<"Farm"> | string
    state?: EnumStatesFilter<"Farm"> | $Enums.States
    farmArea?: StringFilter<"Farm"> | string
    vegetationArea?: StringFilter<"Farm"> | string
    agriculturalArea?: StringFilter<"Farm"> | string
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Farm"> | Date | string | null
  }

  export type NotificationUpsertWithWhereUniqueWithoutRecipientInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutRecipientInput, NotificationUncheckedUpdateWithoutRecipientInput>
    create: XOR<NotificationCreateWithoutRecipientInput, NotificationUncheckedCreateWithoutRecipientInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutRecipientInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutRecipientInput, NotificationUncheckedUpdateWithoutRecipientInput>
  }

  export type NotificationUpdateManyWithWhereWithoutRecipientInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutRecipientInput>
  }

  export type CropCreateWithoutLandInput = {
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CropUncheckedCreateWithoutLandInput = {
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CropCreateOrConnectWithoutLandInput = {
    where: CropWhereUniqueInput
    create: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput>
  }

  export type CropCreateManyLandInputEnvelope = {
    data: CropCreateManyLandInput | CropCreateManyLandInput[]
    skipDuplicates?: boolean
  }

  export type ProducerCreateWithoutFarmsInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    Notification?: NotificationCreateNestedManyWithoutRecipientInput
  }

  export type ProducerUncheckedCreateWithoutFarmsInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    Notification?: NotificationUncheckedCreateNestedManyWithoutRecipientInput
  }

  export type ProducerCreateOrConnectWithoutFarmsInput = {
    where: ProducerWhereUniqueInput
    create: XOR<ProducerCreateWithoutFarmsInput, ProducerUncheckedCreateWithoutFarmsInput>
  }

  export type CropUpsertWithWhereUniqueWithoutLandInput = {
    where: CropWhereUniqueInput
    update: XOR<CropUpdateWithoutLandInput, CropUncheckedUpdateWithoutLandInput>
    create: XOR<CropCreateWithoutLandInput, CropUncheckedCreateWithoutLandInput>
  }

  export type CropUpdateWithWhereUniqueWithoutLandInput = {
    where: CropWhereUniqueInput
    data: XOR<CropUpdateWithoutLandInput, CropUncheckedUpdateWithoutLandInput>
  }

  export type CropUpdateManyWithWhereWithoutLandInput = {
    where: CropScalarWhereInput
    data: XOR<CropUpdateManyMutationInput, CropUncheckedUpdateManyWithoutLandInput>
  }

  export type CropScalarWhereInput = {
    AND?: CropScalarWhereInput | CropScalarWhereInput[]
    OR?: CropScalarWhereInput[]
    NOT?: CropScalarWhereInput | CropScalarWhereInput[]
    landId?: StringFilter<"Crop"> | string
    id?: StringFilter<"Crop"> | string
    type?: EnumCropTypeFilter<"Crop"> | $Enums.CropType
    description?: StringFilter<"Crop"> | string
    createdAt?: DateTimeFilter<"Crop"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Crop"> | Date | string | null
  }

  export type ProducerUpsertWithoutFarmsInput = {
    update: XOR<ProducerUpdateWithoutFarmsInput, ProducerUncheckedUpdateWithoutFarmsInput>
    create: XOR<ProducerCreateWithoutFarmsInput, ProducerUncheckedCreateWithoutFarmsInput>
    where?: ProducerWhereInput
  }

  export type ProducerUpdateToOneWithWhereWithoutFarmsInput = {
    where?: ProducerWhereInput
    data: XOR<ProducerUpdateWithoutFarmsInput, ProducerUncheckedUpdateWithoutFarmsInput>
  }

  export type ProducerUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Notification?: NotificationUpdateManyWithoutRecipientNestedInput
  }

  export type ProducerUncheckedUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Notification?: NotificationUncheckedUpdateManyWithoutRecipientNestedInput
  }

  export type FarmCreateWithoutCropsInput = {
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    owner: ProducerCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateWithoutCropsInput = {
    ownerId: string
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type FarmCreateOrConnectWithoutCropsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutCropsInput, FarmUncheckedCreateWithoutCropsInput>
  }

  export type FarmUpsertWithoutCropsInput = {
    update: XOR<FarmUpdateWithoutCropsInput, FarmUncheckedUpdateWithoutCropsInput>
    create: XOR<FarmCreateWithoutCropsInput, FarmUncheckedCreateWithoutCropsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutCropsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutCropsInput, FarmUncheckedUpdateWithoutCropsInput>
  }

  export type FarmUpdateWithoutCropsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: ProducerUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateWithoutCropsInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type ProducerCreateWithoutNotificationInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    farms?: FarmCreateNestedManyWithoutOwnerInput
  }

  export type ProducerUncheckedCreateWithoutNotificationInput = {
    id?: string
    name: string
    email: string
    document: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    farms?: FarmUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type ProducerCreateOrConnectWithoutNotificationInput = {
    where: ProducerWhereUniqueInput
    create: XOR<ProducerCreateWithoutNotificationInput, ProducerUncheckedCreateWithoutNotificationInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProducerUpsertWithoutNotificationInput = {
    update: XOR<ProducerUpdateWithoutNotificationInput, ProducerUncheckedUpdateWithoutNotificationInput>
    create: XOR<ProducerCreateWithoutNotificationInput, ProducerUncheckedCreateWithoutNotificationInput>
    where?: ProducerWhereInput
  }

  export type ProducerUpdateToOneWithWhereWithoutNotificationInput = {
    where?: ProducerWhereInput
    data: XOR<ProducerUpdateWithoutNotificationInput, ProducerUncheckedUpdateWithoutNotificationInput>
  }

  export type ProducerUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farms?: FarmUpdateManyWithoutOwnerNestedInput
  }

  export type ProducerUncheckedUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farms?: FarmUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type NotificationCreateManyUserInput = {
    recipientId: string
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipient?: ProducerUpdateOneRequiredWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    recipientId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    recipientId?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmCreateManyOwnerInput = {
    id?: string
    name: string
    city: string
    state: $Enums.States
    farmArea: string
    vegetationArea: string
    agriculturalArea: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type NotificationCreateManyRecipientInput = {
    userId?: string | null
    id?: string
    title: string
    content: string
    readAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FarmUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crops?: CropUpdateManyWithoutLandNestedInput
  }

  export type FarmUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crops?: CropUncheckedUpdateManyWithoutLandNestedInput
  }

  export type FarmUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumStatesFieldUpdateOperationsInput | $Enums.States
    farmArea?: StringFieldUpdateOperationsInput | string
    vegetationArea?: StringFieldUpdateOperationsInput | string
    agriculturalArea?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationUpdateWithoutRecipientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutRecipientInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutRecipientInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropCreateManyLandInput = {
    id?: string
    type: $Enums.CropType
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CropUpdateWithoutLandInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CropUncheckedUpdateWithoutLandInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CropUncheckedUpdateManyWithoutLandInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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