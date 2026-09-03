
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
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentVersion
 * 
 */
export type DocumentVersion = $Result.DefaultSelection<Prisma.$DocumentVersionPayload>
/**
 * Model DocumentPage
 * 
 */
export type DocumentPage = $Result.DefaultSelection<Prisma.$DocumentPagePayload>
/**
 * Model CustomFieldDefinition
 * 
 */
export type CustomFieldDefinition = $Result.DefaultSelection<Prisma.$CustomFieldDefinitionPayload>
/**
 * Model Asset
 * 
 */
export type Asset = $Result.DefaultSelection<Prisma.$AssetPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentVersion`: Exposes CRUD operations for the **DocumentVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentVersions
    * const documentVersions = await prisma.documentVersion.findMany()
    * ```
    */
  get documentVersion(): Prisma.DocumentVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentPage`: Exposes CRUD operations for the **DocumentPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentPages
    * const documentPages = await prisma.documentPage.findMany()
    * ```
    */
  get documentPage(): Prisma.DocumentPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customFieldDefinition`: Exposes CRUD operations for the **CustomFieldDefinition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomFieldDefinitions
    * const customFieldDefinitions = await prisma.customFieldDefinition.findMany()
    * ```
    */
  get customFieldDefinition(): Prisma.CustomFieldDefinitionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.asset.findMany()
    * ```
    */
  get asset(): Prisma.AssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Document: 'Document',
    DocumentVersion: 'DocumentVersion',
    DocumentPage: 'DocumentPage',
    CustomFieldDefinition: 'CustomFieldDefinition',
    Asset: 'Asset',
    Submission: 'Submission'
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
      modelProps: "user" | "document" | "documentVersion" | "documentPage" | "customFieldDefinition" | "asset" | "submission"
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
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentVersion: {
        payload: Prisma.$DocumentVersionPayload<ExtArgs>
        fields: Prisma.DocumentVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          findFirst: {
            args: Prisma.DocumentVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          findMany: {
            args: Prisma.DocumentVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>[]
          }
          create: {
            args: Prisma.DocumentVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          createMany: {
            args: Prisma.DocumentVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>[]
          }
          delete: {
            args: Prisma.DocumentVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          update: {
            args: Prisma.DocumentVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          deleteMany: {
            args: Prisma.DocumentVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>[]
          }
          upsert: {
            args: Prisma.DocumentVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          aggregate: {
            args: Prisma.DocumentVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentVersion>
          }
          groupBy: {
            args: Prisma.DocumentVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentVersionCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentVersionCountAggregateOutputType> | number
          }
        }
      }
      DocumentPage: {
        payload: Prisma.$DocumentPagePayload<ExtArgs>
        fields: Prisma.DocumentPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          findFirst: {
            args: Prisma.DocumentPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          findMany: {
            args: Prisma.DocumentPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>[]
          }
          create: {
            args: Prisma.DocumentPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          createMany: {
            args: Prisma.DocumentPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>[]
          }
          delete: {
            args: Prisma.DocumentPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          update: {
            args: Prisma.DocumentPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          deleteMany: {
            args: Prisma.DocumentPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentPageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>[]
          }
          upsert: {
            args: Prisma.DocumentPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPagePayload>
          }
          aggregate: {
            args: Prisma.DocumentPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentPage>
          }
          groupBy: {
            args: Prisma.DocumentPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentPageCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentPageCountAggregateOutputType> | number
          }
        }
      }
      CustomFieldDefinition: {
        payload: Prisma.$CustomFieldDefinitionPayload<ExtArgs>
        fields: Prisma.CustomFieldDefinitionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomFieldDefinitionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomFieldDefinitionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          findFirst: {
            args: Prisma.CustomFieldDefinitionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomFieldDefinitionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          findMany: {
            args: Prisma.CustomFieldDefinitionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>[]
          }
          create: {
            args: Prisma.CustomFieldDefinitionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          createMany: {
            args: Prisma.CustomFieldDefinitionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomFieldDefinitionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>[]
          }
          delete: {
            args: Prisma.CustomFieldDefinitionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          update: {
            args: Prisma.CustomFieldDefinitionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          deleteMany: {
            args: Prisma.CustomFieldDefinitionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomFieldDefinitionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomFieldDefinitionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>[]
          }
          upsert: {
            args: Prisma.CustomFieldDefinitionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFieldDefinitionPayload>
          }
          aggregate: {
            args: Prisma.CustomFieldDefinitionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomFieldDefinition>
          }
          groupBy: {
            args: Prisma.CustomFieldDefinitionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomFieldDefinitionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomFieldDefinitionCountArgs<ExtArgs>
            result: $Utils.Optional<CustomFieldDefinitionCountAggregateOutputType> | number
          }
        }
      }
      Asset: {
        payload: Prisma.$AssetPayload<ExtArgs>
        fields: Prisma.AssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findFirst: {
            args: Prisma.AssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findMany: {
            args: Prisma.AssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          create: {
            args: Prisma.AssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          createMany: {
            args: Prisma.AssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          delete: {
            args: Prisma.AssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          update: {
            args: Prisma.AssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          deleteMany: {
            args: Prisma.AssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          upsert: {
            args: Prisma.AssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          aggregate: {
            args: Prisma.AssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsset>
          }
          groupBy: {
            args: Prisma.AssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    document?: DocumentOmit
    documentVersion?: DocumentVersionOmit
    documentPage?: DocumentPageOmit
    customFieldDefinition?: CustomFieldDefinitionOmit
    asset?: AssetOmit
    submission?: SubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    documents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
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
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    versions: number
    submissions: number
    assets: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | DocumentCountOutputTypeCountVersionsArgs
    submissions?: boolean | DocumentCountOutputTypeCountSubmissionsArgs
    assets?: boolean | DocumentCountOutputTypeCountAssetsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentVersionWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
  }


  /**
   * Count Type DocumentVersionCountOutputType
   */

  export type DocumentVersionCountOutputType = {
    pages: number
    submissions: number
  }

  export type DocumentVersionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | DocumentVersionCountOutputTypeCountPagesArgs
    submissions?: boolean | DocumentVersionCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * DocumentVersionCountOutputType without action
   */
  export type DocumentVersionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersionCountOutputType
     */
    select?: DocumentVersionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentVersionCountOutputType without action
   */
  export type DocumentVersionCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPageWhereInput
  }

  /**
   * DocumentVersionCountOutputType without action
   */
  export type DocumentVersionCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type AssetCountOutputType
   */

  export type AssetCountOutputType = {
    pages: number
    generatedSubmissions: number
  }

  export type AssetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pages?: boolean | AssetCountOutputTypeCountPagesArgs
    generatedSubmissions?: boolean | AssetCountOutputTypeCountGeneratedSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * AssetCountOutputType without action
   */
  export type AssetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCountOutputType
     */
    select?: AssetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssetCountOutputType without action
   */
  export type AssetCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPageWhereInput
  }

  /**
   * AssetCountOutputType without action
   */
  export type AssetCountOutputTypeCountGeneratedSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
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
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
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
    passwordHash: string
    role: string
    createdAt: Date
    updatedAt: Date
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
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | User$documentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | User$documentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: string
      createdAt: Date
      updatedAt: Date
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
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
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
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
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
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    publicToken: string | null
    publishedVersionId: string | null
    accessMode: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: string | null
    publicToken: string | null
    publishedVersionId: string | null
    accessMode: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    publicToken: number
    publishedVersionId: number
    accessMode: number
    createdById: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    publicToken?: true
    publishedVersionId?: true
    accessMode?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    publicToken?: true
    publishedVersionId?: true
    accessMode?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    publicToken?: true
    publishedVersionId?: true
    accessMode?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: string
    publicToken: string
    publishedVersionId: string | null
    accessMode: string
    createdById: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    publicToken?: boolean
    publishedVersionId?: boolean
    accessMode?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
    versions?: boolean | Document$versionsArgs<ExtArgs>
    submissions?: boolean | Document$submissionsArgs<ExtArgs>
    assets?: boolean | Document$assetsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    publicToken?: boolean
    publishedVersionId?: boolean
    accessMode?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    publicToken?: boolean
    publishedVersionId?: boolean
    accessMode?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    publicToken?: boolean
    publishedVersionId?: boolean
    accessMode?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "publicToken" | "publishedVersionId" | "accessMode" | "createdById" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
    versions?: boolean | Document$versionsArgs<ExtArgs>
    submissions?: boolean | Document$submissionsArgs<ExtArgs>
    assets?: boolean | Document$assetsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Document$createdByArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      versions: Prisma.$DocumentVersionPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      assets: Prisma.$AssetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: string
      publicToken: string
      publishedVersionId: string | null
      accessMode: string
      createdById: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Document$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Document$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    versions<T extends Document$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Document$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Document$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Document$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assets<T extends Document$assetsArgs<ExtArgs> = {}>(args?: Subset<T, Document$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly name: FieldRef<"Document", 'String'>
    readonly description: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'String'>
    readonly publicToken: FieldRef<"Document", 'String'>
    readonly publishedVersionId: FieldRef<"Document", 'String'>
    readonly accessMode: FieldRef<"Document", 'String'>
    readonly createdById: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly deletedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.createdBy
   */
  export type Document$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Document.versions
   */
  export type Document$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    where?: DocumentVersionWhereInput
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    cursor?: DocumentVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * Document.submissions
   */
  export type Document$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Document.assets
   */
  export type Document$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    cursor?: AssetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentVersion
   */

  export type AggregateDocumentVersion = {
    _count: DocumentVersionCountAggregateOutputType | null
    _avg: DocumentVersionAvgAggregateOutputType | null
    _sum: DocumentVersionSumAggregateOutputType | null
    _min: DocumentVersionMinAggregateOutputType | null
    _max: DocumentVersionMaxAggregateOutputType | null
  }

  export type DocumentVersionAvgAggregateOutputType = {
    versionNumber: number | null
  }

  export type DocumentVersionSumAggregateOutputType = {
    versionNumber: number | null
  }

  export type DocumentVersionMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    versionNumber: number | null
    status: string | null
    template: string | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type DocumentVersionMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    versionNumber: number | null
    status: string | null
    template: string | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type DocumentVersionCountAggregateOutputType = {
    id: number
    documentId: number
    versionNumber: number
    status: number
    template: number
    createdAt: number
    publishedAt: number
    _all: number
  }


  export type DocumentVersionAvgAggregateInputType = {
    versionNumber?: true
  }

  export type DocumentVersionSumAggregateInputType = {
    versionNumber?: true
  }

  export type DocumentVersionMinAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    status?: true
    template?: true
    createdAt?: true
    publishedAt?: true
  }

  export type DocumentVersionMaxAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    status?: true
    template?: true
    createdAt?: true
    publishedAt?: true
  }

  export type DocumentVersionCountAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    status?: true
    template?: true
    createdAt?: true
    publishedAt?: true
    _all?: true
  }

  export type DocumentVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentVersion to aggregate.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentVersions
    **/
    _count?: true | DocumentVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentVersionMaxAggregateInputType
  }

  export type GetDocumentVersionAggregateType<T extends DocumentVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentVersion[P]>
      : GetScalarType<T[P], AggregateDocumentVersion[P]>
  }




  export type DocumentVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentVersionWhereInput
    orderBy?: DocumentVersionOrderByWithAggregationInput | DocumentVersionOrderByWithAggregationInput[]
    by: DocumentVersionScalarFieldEnum[] | DocumentVersionScalarFieldEnum
    having?: DocumentVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentVersionCountAggregateInputType | true
    _avg?: DocumentVersionAvgAggregateInputType
    _sum?: DocumentVersionSumAggregateInputType
    _min?: DocumentVersionMinAggregateInputType
    _max?: DocumentVersionMaxAggregateInputType
  }

  export type DocumentVersionGroupByOutputType = {
    id: string
    documentId: string
    versionNumber: number
    status: string
    template: string
    createdAt: Date
    publishedAt: Date | null
    _count: DocumentVersionCountAggregateOutputType | null
    _avg: DocumentVersionAvgAggregateOutputType | null
    _sum: DocumentVersionSumAggregateOutputType | null
    _min: DocumentVersionMinAggregateOutputType | null
    _max: DocumentVersionMaxAggregateOutputType | null
  }

  type GetDocumentVersionGroupByPayload<T extends DocumentVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentVersionGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentVersionGroupByOutputType[P]>
        }
      >
    >


  export type DocumentVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    status?: boolean
    template?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    pages?: boolean | DocumentVersion$pagesArgs<ExtArgs>
    submissions?: boolean | DocumentVersion$submissionsArgs<ExtArgs>
    _count?: boolean | DocumentVersionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentVersion"]>

  export type DocumentVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    status?: boolean
    template?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentVersion"]>

  export type DocumentVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    status?: boolean
    template?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentVersion"]>

  export type DocumentVersionSelectScalar = {
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    status?: boolean
    template?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }

  export type DocumentVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "versionNumber" | "status" | "template" | "createdAt" | "publishedAt", ExtArgs["result"]["documentVersion"]>
  export type DocumentVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    pages?: boolean | DocumentVersion$pagesArgs<ExtArgs>
    submissions?: boolean | DocumentVersion$submissionsArgs<ExtArgs>
    _count?: boolean | DocumentVersionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentVersion"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      pages: Prisma.$DocumentPagePayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      versionNumber: number
      status: string
      template: string
      createdAt: Date
      publishedAt: Date | null
    }, ExtArgs["result"]["documentVersion"]>
    composites: {}
  }

  type DocumentVersionGetPayload<S extends boolean | null | undefined | DocumentVersionDefaultArgs> = $Result.GetResult<Prisma.$DocumentVersionPayload, S>

  type DocumentVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentVersionCountAggregateInputType | true
    }

  export interface DocumentVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentVersion'], meta: { name: 'DocumentVersion' } }
    /**
     * Find zero or one DocumentVersion that matches the filter.
     * @param {DocumentVersionFindUniqueArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentVersionFindUniqueArgs>(args: SelectSubset<T, DocumentVersionFindUniqueArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentVersionFindUniqueOrThrowArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindFirstArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentVersionFindFirstArgs>(args?: SelectSubset<T, DocumentVersionFindFirstArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindFirstOrThrowArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentVersions
     * const documentVersions = await prisma.documentVersion.findMany()
     * 
     * // Get first 10 DocumentVersions
     * const documentVersions = await prisma.documentVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentVersionWithIdOnly = await prisma.documentVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentVersionFindManyArgs>(args?: SelectSubset<T, DocumentVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentVersion.
     * @param {DocumentVersionCreateArgs} args - Arguments to create a DocumentVersion.
     * @example
     * // Create one DocumentVersion
     * const DocumentVersion = await prisma.documentVersion.create({
     *   data: {
     *     // ... data to create a DocumentVersion
     *   }
     * })
     * 
     */
    create<T extends DocumentVersionCreateArgs>(args: SelectSubset<T, DocumentVersionCreateArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentVersions.
     * @param {DocumentVersionCreateManyArgs} args - Arguments to create many DocumentVersions.
     * @example
     * // Create many DocumentVersions
     * const documentVersion = await prisma.documentVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentVersionCreateManyArgs>(args?: SelectSubset<T, DocumentVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentVersions and returns the data saved in the database.
     * @param {DocumentVersionCreateManyAndReturnArgs} args - Arguments to create many DocumentVersions.
     * @example
     * // Create many DocumentVersions
     * const documentVersion = await prisma.documentVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentVersions and only return the `id`
     * const documentVersionWithIdOnly = await prisma.documentVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentVersion.
     * @param {DocumentVersionDeleteArgs} args - Arguments to delete one DocumentVersion.
     * @example
     * // Delete one DocumentVersion
     * const DocumentVersion = await prisma.documentVersion.delete({
     *   where: {
     *     // ... filter to delete one DocumentVersion
     *   }
     * })
     * 
     */
    delete<T extends DocumentVersionDeleteArgs>(args: SelectSubset<T, DocumentVersionDeleteArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentVersion.
     * @param {DocumentVersionUpdateArgs} args - Arguments to update one DocumentVersion.
     * @example
     * // Update one DocumentVersion
     * const documentVersion = await prisma.documentVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentVersionUpdateArgs>(args: SelectSubset<T, DocumentVersionUpdateArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentVersions.
     * @param {DocumentVersionDeleteManyArgs} args - Arguments to filter DocumentVersions to delete.
     * @example
     * // Delete a few DocumentVersions
     * const { count } = await prisma.documentVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentVersionDeleteManyArgs>(args?: SelectSubset<T, DocumentVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentVersions
     * const documentVersion = await prisma.documentVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentVersionUpdateManyArgs>(args: SelectSubset<T, DocumentVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentVersions and returns the data updated in the database.
     * @param {DocumentVersionUpdateManyAndReturnArgs} args - Arguments to update many DocumentVersions.
     * @example
     * // Update many DocumentVersions
     * const documentVersion = await prisma.documentVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentVersions and only return the `id`
     * const documentVersionWithIdOnly = await prisma.documentVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentVersion.
     * @param {DocumentVersionUpsertArgs} args - Arguments to update or create a DocumentVersion.
     * @example
     * // Update or create a DocumentVersion
     * const documentVersion = await prisma.documentVersion.upsert({
     *   create: {
     *     // ... data to create a DocumentVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentVersion we want to update
     *   }
     * })
     */
    upsert<T extends DocumentVersionUpsertArgs>(args: SelectSubset<T, DocumentVersionUpsertArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionCountArgs} args - Arguments to filter DocumentVersions to count.
     * @example
     * // Count the number of DocumentVersions
     * const count = await prisma.documentVersion.count({
     *   where: {
     *     // ... the filter for the DocumentVersions we want to count
     *   }
     * })
    **/
    count<T extends DocumentVersionCountArgs>(
      args?: Subset<T, DocumentVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentVersionAggregateArgs>(args: Subset<T, DocumentVersionAggregateArgs>): Prisma.PrismaPromise<GetDocumentVersionAggregateType<T>>

    /**
     * Group by DocumentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionGroupByArgs} args - Group by arguments.
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
      T extends DocumentVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentVersionGroupByArgs['orderBy'] }
        : { orderBy?: DocumentVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentVersion model
   */
  readonly fields: DocumentVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pages<T extends DocumentVersion$pagesArgs<ExtArgs> = {}>(args?: Subset<T, DocumentVersion$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends DocumentVersion$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, DocumentVersion$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DocumentVersion model
   */
  interface DocumentVersionFieldRefs {
    readonly id: FieldRef<"DocumentVersion", 'String'>
    readonly documentId: FieldRef<"DocumentVersion", 'String'>
    readonly versionNumber: FieldRef<"DocumentVersion", 'Int'>
    readonly status: FieldRef<"DocumentVersion", 'String'>
    readonly template: FieldRef<"DocumentVersion", 'String'>
    readonly createdAt: FieldRef<"DocumentVersion", 'DateTime'>
    readonly publishedAt: FieldRef<"DocumentVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentVersion findUnique
   */
  export type DocumentVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion findUniqueOrThrow
   */
  export type DocumentVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion findFirst
   */
  export type DocumentVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentVersions.
     */
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion findFirstOrThrow
   */
  export type DocumentVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentVersions.
     */
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion findMany
   */
  export type DocumentVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersions to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion create
   */
  export type DocumentVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentVersion.
     */
    data: XOR<DocumentVersionCreateInput, DocumentVersionUncheckedCreateInput>
  }

  /**
   * DocumentVersion createMany
   */
  export type DocumentVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentVersions.
     */
    data: DocumentVersionCreateManyInput | DocumentVersionCreateManyInput[]
  }

  /**
   * DocumentVersion createManyAndReturn
   */
  export type DocumentVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentVersions.
     */
    data: DocumentVersionCreateManyInput | DocumentVersionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentVersion update
   */
  export type DocumentVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentVersion.
     */
    data: XOR<DocumentVersionUpdateInput, DocumentVersionUncheckedUpdateInput>
    /**
     * Choose, which DocumentVersion to update.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion updateMany
   */
  export type DocumentVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentVersions.
     */
    data: XOR<DocumentVersionUpdateManyMutationInput, DocumentVersionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentVersions to update
     */
    where?: DocumentVersionWhereInput
    /**
     * Limit how many DocumentVersions to update.
     */
    limit?: number
  }

  /**
   * DocumentVersion updateManyAndReturn
   */
  export type DocumentVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * The data used to update DocumentVersions.
     */
    data: XOR<DocumentVersionUpdateManyMutationInput, DocumentVersionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentVersions to update
     */
    where?: DocumentVersionWhereInput
    /**
     * Limit how many DocumentVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentVersion upsert
   */
  export type DocumentVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentVersion to update in case it exists.
     */
    where: DocumentVersionWhereUniqueInput
    /**
     * In case the DocumentVersion found by the `where` argument doesn't exist, create a new DocumentVersion with this data.
     */
    create: XOR<DocumentVersionCreateInput, DocumentVersionUncheckedCreateInput>
    /**
     * In case the DocumentVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentVersionUpdateInput, DocumentVersionUncheckedUpdateInput>
  }

  /**
   * DocumentVersion delete
   */
  export type DocumentVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter which DocumentVersion to delete.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion deleteMany
   */
  export type DocumentVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentVersions to delete
     */
    where?: DocumentVersionWhereInput
    /**
     * Limit how many DocumentVersions to delete.
     */
    limit?: number
  }

  /**
   * DocumentVersion.pages
   */
  export type DocumentVersion$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    where?: DocumentPageWhereInput
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    cursor?: DocumentPageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentPageScalarFieldEnum | DocumentPageScalarFieldEnum[]
  }

  /**
   * DocumentVersion.submissions
   */
  export type DocumentVersion$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * DocumentVersion without action
   */
  export type DocumentVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentVersion
     */
    omit?: DocumentVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
  }


  /**
   * Model DocumentPage
   */

  export type AggregateDocumentPage = {
    _count: DocumentPageCountAggregateOutputType | null
    _avg: DocumentPageAvgAggregateOutputType | null
    _sum: DocumentPageSumAggregateOutputType | null
    _min: DocumentPageMinAggregateOutputType | null
    _max: DocumentPageMaxAggregateOutputType | null
  }

  export type DocumentPageAvgAggregateOutputType = {
    pageNumber: number | null
    width: number | null
    height: number | null
  }

  export type DocumentPageSumAggregateOutputType = {
    pageNumber: number | null
    width: number | null
    height: number | null
  }

  export type DocumentPageMinAggregateOutputType = {
    id: string | null
    documentVersionId: string | null
    pageNumber: number | null
    width: number | null
    height: number | null
    backgroundAssetId: string | null
    createdAt: Date | null
  }

  export type DocumentPageMaxAggregateOutputType = {
    id: string | null
    documentVersionId: string | null
    pageNumber: number | null
    width: number | null
    height: number | null
    backgroundAssetId: string | null
    createdAt: Date | null
  }

  export type DocumentPageCountAggregateOutputType = {
    id: number
    documentVersionId: number
    pageNumber: number
    width: number
    height: number
    backgroundAssetId: number
    createdAt: number
    _all: number
  }


  export type DocumentPageAvgAggregateInputType = {
    pageNumber?: true
    width?: true
    height?: true
  }

  export type DocumentPageSumAggregateInputType = {
    pageNumber?: true
    width?: true
    height?: true
  }

  export type DocumentPageMinAggregateInputType = {
    id?: true
    documentVersionId?: true
    pageNumber?: true
    width?: true
    height?: true
    backgroundAssetId?: true
    createdAt?: true
  }

  export type DocumentPageMaxAggregateInputType = {
    id?: true
    documentVersionId?: true
    pageNumber?: true
    width?: true
    height?: true
    backgroundAssetId?: true
    createdAt?: true
  }

  export type DocumentPageCountAggregateInputType = {
    id?: true
    documentVersionId?: true
    pageNumber?: true
    width?: true
    height?: true
    backgroundAssetId?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPage to aggregate.
     */
    where?: DocumentPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPages to fetch.
     */
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentPages
    **/
    _count?: true | DocumentPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentPageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentPageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentPageMaxAggregateInputType
  }

  export type GetDocumentPageAggregateType<T extends DocumentPageAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentPage[P]>
      : GetScalarType<T[P], AggregateDocumentPage[P]>
  }




  export type DocumentPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPageWhereInput
    orderBy?: DocumentPageOrderByWithAggregationInput | DocumentPageOrderByWithAggregationInput[]
    by: DocumentPageScalarFieldEnum[] | DocumentPageScalarFieldEnum
    having?: DocumentPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentPageCountAggregateInputType | true
    _avg?: DocumentPageAvgAggregateInputType
    _sum?: DocumentPageSumAggregateInputType
    _min?: DocumentPageMinAggregateInputType
    _max?: DocumentPageMaxAggregateInputType
  }

  export type DocumentPageGroupByOutputType = {
    id: string
    documentVersionId: string
    pageNumber: number
    width: number
    height: number
    backgroundAssetId: string | null
    createdAt: Date
    _count: DocumentPageCountAggregateOutputType | null
    _avg: DocumentPageAvgAggregateOutputType | null
    _sum: DocumentPageSumAggregateOutputType | null
    _min: DocumentPageMinAggregateOutputType | null
    _max: DocumentPageMaxAggregateOutputType | null
  }

  type GetDocumentPageGroupByPayload<T extends DocumentPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentPageGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentPageGroupByOutputType[P]>
        }
      >
    >


  export type DocumentPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentVersionId?: boolean
    pageNumber?: boolean
    width?: boolean
    height?: boolean
    backgroundAssetId?: boolean
    createdAt?: boolean
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }, ExtArgs["result"]["documentPage"]>

  export type DocumentPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentVersionId?: boolean
    pageNumber?: boolean
    width?: boolean
    height?: boolean
    backgroundAssetId?: boolean
    createdAt?: boolean
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }, ExtArgs["result"]["documentPage"]>

  export type DocumentPageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentVersionId?: boolean
    pageNumber?: boolean
    width?: boolean
    height?: boolean
    backgroundAssetId?: boolean
    createdAt?: boolean
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }, ExtArgs["result"]["documentPage"]>

  export type DocumentPageSelectScalar = {
    id?: boolean
    documentVersionId?: boolean
    pageNumber?: boolean
    width?: boolean
    height?: boolean
    backgroundAssetId?: boolean
    createdAt?: boolean
  }

  export type DocumentPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentVersionId" | "pageNumber" | "width" | "height" | "backgroundAssetId" | "createdAt", ExtArgs["result"]["documentPage"]>
  export type DocumentPageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }
  export type DocumentPageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }
  export type DocumentPageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    backgroundAsset?: boolean | DocumentPage$backgroundAssetArgs<ExtArgs>
  }

  export type $DocumentPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentPage"
    objects: {
      documentVersion: Prisma.$DocumentVersionPayload<ExtArgs>
      backgroundAsset: Prisma.$AssetPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentVersionId: string
      pageNumber: number
      width: number
      height: number
      backgroundAssetId: string | null
      createdAt: Date
    }, ExtArgs["result"]["documentPage"]>
    composites: {}
  }

  type DocumentPageGetPayload<S extends boolean | null | undefined | DocumentPageDefaultArgs> = $Result.GetResult<Prisma.$DocumentPagePayload, S>

  type DocumentPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentPageCountAggregateInputType | true
    }

  export interface DocumentPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentPage'], meta: { name: 'DocumentPage' } }
    /**
     * Find zero or one DocumentPage that matches the filter.
     * @param {DocumentPageFindUniqueArgs} args - Arguments to find a DocumentPage
     * @example
     * // Get one DocumentPage
     * const documentPage = await prisma.documentPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentPageFindUniqueArgs>(args: SelectSubset<T, DocumentPageFindUniqueArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentPageFindUniqueOrThrowArgs} args - Arguments to find a DocumentPage
     * @example
     * // Get one DocumentPage
     * const documentPage = await prisma.documentPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentPageFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageFindFirstArgs} args - Arguments to find a DocumentPage
     * @example
     * // Get one DocumentPage
     * const documentPage = await prisma.documentPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentPageFindFirstArgs>(args?: SelectSubset<T, DocumentPageFindFirstArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageFindFirstOrThrowArgs} args - Arguments to find a DocumentPage
     * @example
     * // Get one DocumentPage
     * const documentPage = await prisma.documentPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentPageFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentPages
     * const documentPages = await prisma.documentPage.findMany()
     * 
     * // Get first 10 DocumentPages
     * const documentPages = await prisma.documentPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentPageWithIdOnly = await prisma.documentPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentPageFindManyArgs>(args?: SelectSubset<T, DocumentPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentPage.
     * @param {DocumentPageCreateArgs} args - Arguments to create a DocumentPage.
     * @example
     * // Create one DocumentPage
     * const DocumentPage = await prisma.documentPage.create({
     *   data: {
     *     // ... data to create a DocumentPage
     *   }
     * })
     * 
     */
    create<T extends DocumentPageCreateArgs>(args: SelectSubset<T, DocumentPageCreateArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentPages.
     * @param {DocumentPageCreateManyArgs} args - Arguments to create many DocumentPages.
     * @example
     * // Create many DocumentPages
     * const documentPage = await prisma.documentPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentPageCreateManyArgs>(args?: SelectSubset<T, DocumentPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentPages and returns the data saved in the database.
     * @param {DocumentPageCreateManyAndReturnArgs} args - Arguments to create many DocumentPages.
     * @example
     * // Create many DocumentPages
     * const documentPage = await prisma.documentPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentPages and only return the `id`
     * const documentPageWithIdOnly = await prisma.documentPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentPageCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentPage.
     * @param {DocumentPageDeleteArgs} args - Arguments to delete one DocumentPage.
     * @example
     * // Delete one DocumentPage
     * const DocumentPage = await prisma.documentPage.delete({
     *   where: {
     *     // ... filter to delete one DocumentPage
     *   }
     * })
     * 
     */
    delete<T extends DocumentPageDeleteArgs>(args: SelectSubset<T, DocumentPageDeleteArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentPage.
     * @param {DocumentPageUpdateArgs} args - Arguments to update one DocumentPage.
     * @example
     * // Update one DocumentPage
     * const documentPage = await prisma.documentPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentPageUpdateArgs>(args: SelectSubset<T, DocumentPageUpdateArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentPages.
     * @param {DocumentPageDeleteManyArgs} args - Arguments to filter DocumentPages to delete.
     * @example
     * // Delete a few DocumentPages
     * const { count } = await prisma.documentPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentPageDeleteManyArgs>(args?: SelectSubset<T, DocumentPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentPages
     * const documentPage = await prisma.documentPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentPageUpdateManyArgs>(args: SelectSubset<T, DocumentPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPages and returns the data updated in the database.
     * @param {DocumentPageUpdateManyAndReturnArgs} args - Arguments to update many DocumentPages.
     * @example
     * // Update many DocumentPages
     * const documentPage = await prisma.documentPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentPages and only return the `id`
     * const documentPageWithIdOnly = await prisma.documentPage.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentPageUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentPageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentPage.
     * @param {DocumentPageUpsertArgs} args - Arguments to update or create a DocumentPage.
     * @example
     * // Update or create a DocumentPage
     * const documentPage = await prisma.documentPage.upsert({
     *   create: {
     *     // ... data to create a DocumentPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentPage we want to update
     *   }
     * })
     */
    upsert<T extends DocumentPageUpsertArgs>(args: SelectSubset<T, DocumentPageUpsertArgs<ExtArgs>>): Prisma__DocumentPageClient<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageCountArgs} args - Arguments to filter DocumentPages to count.
     * @example
     * // Count the number of DocumentPages
     * const count = await prisma.documentPage.count({
     *   where: {
     *     // ... the filter for the DocumentPages we want to count
     *   }
     * })
    **/
    count<T extends DocumentPageCountArgs>(
      args?: Subset<T, DocumentPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentPageAggregateArgs>(args: Subset<T, DocumentPageAggregateArgs>): Prisma.PrismaPromise<GetDocumentPageAggregateType<T>>

    /**
     * Group by DocumentPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPageGroupByArgs} args - Group by arguments.
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
      T extends DocumentPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentPageGroupByArgs['orderBy'] }
        : { orderBy?: DocumentPageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentPage model
   */
  readonly fields: DocumentPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documentVersion<T extends DocumentVersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentVersionDefaultArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    backgroundAsset<T extends DocumentPage$backgroundAssetArgs<ExtArgs> = {}>(args?: Subset<T, DocumentPage$backgroundAssetArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DocumentPage model
   */
  interface DocumentPageFieldRefs {
    readonly id: FieldRef<"DocumentPage", 'String'>
    readonly documentVersionId: FieldRef<"DocumentPage", 'String'>
    readonly pageNumber: FieldRef<"DocumentPage", 'Int'>
    readonly width: FieldRef<"DocumentPage", 'Float'>
    readonly height: FieldRef<"DocumentPage", 'Float'>
    readonly backgroundAssetId: FieldRef<"DocumentPage", 'String'>
    readonly createdAt: FieldRef<"DocumentPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentPage findUnique
   */
  export type DocumentPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPage to fetch.
     */
    where: DocumentPageWhereUniqueInput
  }

  /**
   * DocumentPage findUniqueOrThrow
   */
  export type DocumentPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPage to fetch.
     */
    where: DocumentPageWhereUniqueInput
  }

  /**
   * DocumentPage findFirst
   */
  export type DocumentPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPage to fetch.
     */
    where?: DocumentPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPages to fetch.
     */
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPages.
     */
    cursor?: DocumentPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPages.
     */
    distinct?: DocumentPageScalarFieldEnum | DocumentPageScalarFieldEnum[]
  }

  /**
   * DocumentPage findFirstOrThrow
   */
  export type DocumentPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPage to fetch.
     */
    where?: DocumentPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPages to fetch.
     */
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPages.
     */
    cursor?: DocumentPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPages.
     */
    distinct?: DocumentPageScalarFieldEnum | DocumentPageScalarFieldEnum[]
  }

  /**
   * DocumentPage findMany
   */
  export type DocumentPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPages to fetch.
     */
    where?: DocumentPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPages to fetch.
     */
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentPages.
     */
    cursor?: DocumentPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPages.
     */
    skip?: number
    distinct?: DocumentPageScalarFieldEnum | DocumentPageScalarFieldEnum[]
  }

  /**
   * DocumentPage create
   */
  export type DocumentPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentPage.
     */
    data: XOR<DocumentPageCreateInput, DocumentPageUncheckedCreateInput>
  }

  /**
   * DocumentPage createMany
   */
  export type DocumentPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentPages.
     */
    data: DocumentPageCreateManyInput | DocumentPageCreateManyInput[]
  }

  /**
   * DocumentPage createManyAndReturn
   */
  export type DocumentPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentPages.
     */
    data: DocumentPageCreateManyInput | DocumentPageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPage update
   */
  export type DocumentPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentPage.
     */
    data: XOR<DocumentPageUpdateInput, DocumentPageUncheckedUpdateInput>
    /**
     * Choose, which DocumentPage to update.
     */
    where: DocumentPageWhereUniqueInput
  }

  /**
   * DocumentPage updateMany
   */
  export type DocumentPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentPages.
     */
    data: XOR<DocumentPageUpdateManyMutationInput, DocumentPageUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPages to update
     */
    where?: DocumentPageWhereInput
    /**
     * Limit how many DocumentPages to update.
     */
    limit?: number
  }

  /**
   * DocumentPage updateManyAndReturn
   */
  export type DocumentPageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * The data used to update DocumentPages.
     */
    data: XOR<DocumentPageUpdateManyMutationInput, DocumentPageUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPages to update
     */
    where?: DocumentPageWhereInput
    /**
     * Limit how many DocumentPages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPage upsert
   */
  export type DocumentPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentPage to update in case it exists.
     */
    where: DocumentPageWhereUniqueInput
    /**
     * In case the DocumentPage found by the `where` argument doesn't exist, create a new DocumentPage with this data.
     */
    create: XOR<DocumentPageCreateInput, DocumentPageUncheckedCreateInput>
    /**
     * In case the DocumentPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentPageUpdateInput, DocumentPageUncheckedUpdateInput>
  }

  /**
   * DocumentPage delete
   */
  export type DocumentPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    /**
     * Filter which DocumentPage to delete.
     */
    where: DocumentPageWhereUniqueInput
  }

  /**
   * DocumentPage deleteMany
   */
  export type DocumentPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPages to delete
     */
    where?: DocumentPageWhereInput
    /**
     * Limit how many DocumentPages to delete.
     */
    limit?: number
  }

  /**
   * DocumentPage.backgroundAsset
   */
  export type DocumentPage$backgroundAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    where?: AssetWhereInput
  }

  /**
   * DocumentPage without action
   */
  export type DocumentPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
  }


  /**
   * Model CustomFieldDefinition
   */

  export type AggregateCustomFieldDefinition = {
    _count: CustomFieldDefinitionCountAggregateOutputType | null
    _min: CustomFieldDefinitionMinAggregateOutputType | null
    _max: CustomFieldDefinitionMaxAggregateOutputType | null
  }

  export type CustomFieldDefinitionMinAggregateOutputType = {
    id: string | null
    key: string | null
    label: string | null
    type: string | null
    inputMode: string | null
    validation: string | null
    formatting: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFieldDefinitionMaxAggregateOutputType = {
    id: string | null
    key: string | null
    label: string | null
    type: string | null
    inputMode: string | null
    validation: string | null
    formatting: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFieldDefinitionCountAggregateOutputType = {
    id: number
    key: number
    label: number
    type: number
    inputMode: number
    validation: number
    formatting: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomFieldDefinitionMinAggregateInputType = {
    id?: true
    key?: true
    label?: true
    type?: true
    inputMode?: true
    validation?: true
    formatting?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFieldDefinitionMaxAggregateInputType = {
    id?: true
    key?: true
    label?: true
    type?: true
    inputMode?: true
    validation?: true
    formatting?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFieldDefinitionCountAggregateInputType = {
    id?: true
    key?: true
    label?: true
    type?: true
    inputMode?: true
    validation?: true
    formatting?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomFieldDefinitionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFieldDefinition to aggregate.
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFieldDefinitions to fetch.
     */
    orderBy?: CustomFieldDefinitionOrderByWithRelationInput | CustomFieldDefinitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomFieldDefinitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFieldDefinitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFieldDefinitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomFieldDefinitions
    **/
    _count?: true | CustomFieldDefinitionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomFieldDefinitionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomFieldDefinitionMaxAggregateInputType
  }

  export type GetCustomFieldDefinitionAggregateType<T extends CustomFieldDefinitionAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomFieldDefinition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomFieldDefinition[P]>
      : GetScalarType<T[P], AggregateCustomFieldDefinition[P]>
  }




  export type CustomFieldDefinitionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFieldDefinitionWhereInput
    orderBy?: CustomFieldDefinitionOrderByWithAggregationInput | CustomFieldDefinitionOrderByWithAggregationInput[]
    by: CustomFieldDefinitionScalarFieldEnum[] | CustomFieldDefinitionScalarFieldEnum
    having?: CustomFieldDefinitionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomFieldDefinitionCountAggregateInputType | true
    _min?: CustomFieldDefinitionMinAggregateInputType
    _max?: CustomFieldDefinitionMaxAggregateInputType
  }

  export type CustomFieldDefinitionGroupByOutputType = {
    id: string
    key: string
    label: string
    type: string
    inputMode: string
    validation: string | null
    formatting: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomFieldDefinitionCountAggregateOutputType | null
    _min: CustomFieldDefinitionMinAggregateOutputType | null
    _max: CustomFieldDefinitionMaxAggregateOutputType | null
  }

  type GetCustomFieldDefinitionGroupByPayload<T extends CustomFieldDefinitionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomFieldDefinitionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomFieldDefinitionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomFieldDefinitionGroupByOutputType[P]>
            : GetScalarType<T[P], CustomFieldDefinitionGroupByOutputType[P]>
        }
      >
    >


  export type CustomFieldDefinitionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    type?: boolean
    inputMode?: boolean
    validation?: boolean
    formatting?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customFieldDefinition"]>

  export type CustomFieldDefinitionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    type?: boolean
    inputMode?: boolean
    validation?: boolean
    formatting?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customFieldDefinition"]>

  export type CustomFieldDefinitionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    type?: boolean
    inputMode?: boolean
    validation?: boolean
    formatting?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customFieldDefinition"]>

  export type CustomFieldDefinitionSelectScalar = {
    id?: boolean
    key?: boolean
    label?: boolean
    type?: boolean
    inputMode?: boolean
    validation?: boolean
    formatting?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomFieldDefinitionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "label" | "type" | "inputMode" | "validation" | "formatting" | "createdAt" | "updatedAt", ExtArgs["result"]["customFieldDefinition"]>

  export type $CustomFieldDefinitionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomFieldDefinition"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      label: string
      type: string
      inputMode: string
      validation: string | null
      formatting: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customFieldDefinition"]>
    composites: {}
  }

  type CustomFieldDefinitionGetPayload<S extends boolean | null | undefined | CustomFieldDefinitionDefaultArgs> = $Result.GetResult<Prisma.$CustomFieldDefinitionPayload, S>

  type CustomFieldDefinitionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomFieldDefinitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomFieldDefinitionCountAggregateInputType | true
    }

  export interface CustomFieldDefinitionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomFieldDefinition'], meta: { name: 'CustomFieldDefinition' } }
    /**
     * Find zero or one CustomFieldDefinition that matches the filter.
     * @param {CustomFieldDefinitionFindUniqueArgs} args - Arguments to find a CustomFieldDefinition
     * @example
     * // Get one CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomFieldDefinitionFindUniqueArgs>(args: SelectSubset<T, CustomFieldDefinitionFindUniqueArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomFieldDefinition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomFieldDefinitionFindUniqueOrThrowArgs} args - Arguments to find a CustomFieldDefinition
     * @example
     * // Get one CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomFieldDefinitionFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomFieldDefinitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFieldDefinition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionFindFirstArgs} args - Arguments to find a CustomFieldDefinition
     * @example
     * // Get one CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomFieldDefinitionFindFirstArgs>(args?: SelectSubset<T, CustomFieldDefinitionFindFirstArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFieldDefinition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionFindFirstOrThrowArgs} args - Arguments to find a CustomFieldDefinition
     * @example
     * // Get one CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomFieldDefinitionFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomFieldDefinitionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomFieldDefinitions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomFieldDefinitions
     * const customFieldDefinitions = await prisma.customFieldDefinition.findMany()
     * 
     * // Get first 10 CustomFieldDefinitions
     * const customFieldDefinitions = await prisma.customFieldDefinition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customFieldDefinitionWithIdOnly = await prisma.customFieldDefinition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomFieldDefinitionFindManyArgs>(args?: SelectSubset<T, CustomFieldDefinitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomFieldDefinition.
     * @param {CustomFieldDefinitionCreateArgs} args - Arguments to create a CustomFieldDefinition.
     * @example
     * // Create one CustomFieldDefinition
     * const CustomFieldDefinition = await prisma.customFieldDefinition.create({
     *   data: {
     *     // ... data to create a CustomFieldDefinition
     *   }
     * })
     * 
     */
    create<T extends CustomFieldDefinitionCreateArgs>(args: SelectSubset<T, CustomFieldDefinitionCreateArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomFieldDefinitions.
     * @param {CustomFieldDefinitionCreateManyArgs} args - Arguments to create many CustomFieldDefinitions.
     * @example
     * // Create many CustomFieldDefinitions
     * const customFieldDefinition = await prisma.customFieldDefinition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomFieldDefinitionCreateManyArgs>(args?: SelectSubset<T, CustomFieldDefinitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomFieldDefinitions and returns the data saved in the database.
     * @param {CustomFieldDefinitionCreateManyAndReturnArgs} args - Arguments to create many CustomFieldDefinitions.
     * @example
     * // Create many CustomFieldDefinitions
     * const customFieldDefinition = await prisma.customFieldDefinition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomFieldDefinitions and only return the `id`
     * const customFieldDefinitionWithIdOnly = await prisma.customFieldDefinition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomFieldDefinitionCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomFieldDefinitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomFieldDefinition.
     * @param {CustomFieldDefinitionDeleteArgs} args - Arguments to delete one CustomFieldDefinition.
     * @example
     * // Delete one CustomFieldDefinition
     * const CustomFieldDefinition = await prisma.customFieldDefinition.delete({
     *   where: {
     *     // ... filter to delete one CustomFieldDefinition
     *   }
     * })
     * 
     */
    delete<T extends CustomFieldDefinitionDeleteArgs>(args: SelectSubset<T, CustomFieldDefinitionDeleteArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomFieldDefinition.
     * @param {CustomFieldDefinitionUpdateArgs} args - Arguments to update one CustomFieldDefinition.
     * @example
     * // Update one CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomFieldDefinitionUpdateArgs>(args: SelectSubset<T, CustomFieldDefinitionUpdateArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomFieldDefinitions.
     * @param {CustomFieldDefinitionDeleteManyArgs} args - Arguments to filter CustomFieldDefinitions to delete.
     * @example
     * // Delete a few CustomFieldDefinitions
     * const { count } = await prisma.customFieldDefinition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomFieldDefinitionDeleteManyArgs>(args?: SelectSubset<T, CustomFieldDefinitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFieldDefinitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomFieldDefinitions
     * const customFieldDefinition = await prisma.customFieldDefinition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomFieldDefinitionUpdateManyArgs>(args: SelectSubset<T, CustomFieldDefinitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFieldDefinitions and returns the data updated in the database.
     * @param {CustomFieldDefinitionUpdateManyAndReturnArgs} args - Arguments to update many CustomFieldDefinitions.
     * @example
     * // Update many CustomFieldDefinitions
     * const customFieldDefinition = await prisma.customFieldDefinition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomFieldDefinitions and only return the `id`
     * const customFieldDefinitionWithIdOnly = await prisma.customFieldDefinition.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomFieldDefinitionUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomFieldDefinitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomFieldDefinition.
     * @param {CustomFieldDefinitionUpsertArgs} args - Arguments to update or create a CustomFieldDefinition.
     * @example
     * // Update or create a CustomFieldDefinition
     * const customFieldDefinition = await prisma.customFieldDefinition.upsert({
     *   create: {
     *     // ... data to create a CustomFieldDefinition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomFieldDefinition we want to update
     *   }
     * })
     */
    upsert<T extends CustomFieldDefinitionUpsertArgs>(args: SelectSubset<T, CustomFieldDefinitionUpsertArgs<ExtArgs>>): Prisma__CustomFieldDefinitionClient<$Result.GetResult<Prisma.$CustomFieldDefinitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomFieldDefinitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionCountArgs} args - Arguments to filter CustomFieldDefinitions to count.
     * @example
     * // Count the number of CustomFieldDefinitions
     * const count = await prisma.customFieldDefinition.count({
     *   where: {
     *     // ... the filter for the CustomFieldDefinitions we want to count
     *   }
     * })
    **/
    count<T extends CustomFieldDefinitionCountArgs>(
      args?: Subset<T, CustomFieldDefinitionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomFieldDefinitionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomFieldDefinition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomFieldDefinitionAggregateArgs>(args: Subset<T, CustomFieldDefinitionAggregateArgs>): Prisma.PrismaPromise<GetCustomFieldDefinitionAggregateType<T>>

    /**
     * Group by CustomFieldDefinition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFieldDefinitionGroupByArgs} args - Group by arguments.
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
      T extends CustomFieldDefinitionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomFieldDefinitionGroupByArgs['orderBy'] }
        : { orderBy?: CustomFieldDefinitionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomFieldDefinitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomFieldDefinitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomFieldDefinition model
   */
  readonly fields: CustomFieldDefinitionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomFieldDefinition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomFieldDefinitionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CustomFieldDefinition model
   */
  interface CustomFieldDefinitionFieldRefs {
    readonly id: FieldRef<"CustomFieldDefinition", 'String'>
    readonly key: FieldRef<"CustomFieldDefinition", 'String'>
    readonly label: FieldRef<"CustomFieldDefinition", 'String'>
    readonly type: FieldRef<"CustomFieldDefinition", 'String'>
    readonly inputMode: FieldRef<"CustomFieldDefinition", 'String'>
    readonly validation: FieldRef<"CustomFieldDefinition", 'String'>
    readonly formatting: FieldRef<"CustomFieldDefinition", 'String'>
    readonly createdAt: FieldRef<"CustomFieldDefinition", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomFieldDefinition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomFieldDefinition findUnique
   */
  export type CustomFieldDefinitionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter, which CustomFieldDefinition to fetch.
     */
    where: CustomFieldDefinitionWhereUniqueInput
  }

  /**
   * CustomFieldDefinition findUniqueOrThrow
   */
  export type CustomFieldDefinitionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter, which CustomFieldDefinition to fetch.
     */
    where: CustomFieldDefinitionWhereUniqueInput
  }

  /**
   * CustomFieldDefinition findFirst
   */
  export type CustomFieldDefinitionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter, which CustomFieldDefinition to fetch.
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFieldDefinitions to fetch.
     */
    orderBy?: CustomFieldDefinitionOrderByWithRelationInput | CustomFieldDefinitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFieldDefinitions.
     */
    cursor?: CustomFieldDefinitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFieldDefinitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFieldDefinitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFieldDefinitions.
     */
    distinct?: CustomFieldDefinitionScalarFieldEnum | CustomFieldDefinitionScalarFieldEnum[]
  }

  /**
   * CustomFieldDefinition findFirstOrThrow
   */
  export type CustomFieldDefinitionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter, which CustomFieldDefinition to fetch.
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFieldDefinitions to fetch.
     */
    orderBy?: CustomFieldDefinitionOrderByWithRelationInput | CustomFieldDefinitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFieldDefinitions.
     */
    cursor?: CustomFieldDefinitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFieldDefinitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFieldDefinitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFieldDefinitions.
     */
    distinct?: CustomFieldDefinitionScalarFieldEnum | CustomFieldDefinitionScalarFieldEnum[]
  }

  /**
   * CustomFieldDefinition findMany
   */
  export type CustomFieldDefinitionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter, which CustomFieldDefinitions to fetch.
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFieldDefinitions to fetch.
     */
    orderBy?: CustomFieldDefinitionOrderByWithRelationInput | CustomFieldDefinitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomFieldDefinitions.
     */
    cursor?: CustomFieldDefinitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFieldDefinitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFieldDefinitions.
     */
    skip?: number
    distinct?: CustomFieldDefinitionScalarFieldEnum | CustomFieldDefinitionScalarFieldEnum[]
  }

  /**
   * CustomFieldDefinition create
   */
  export type CustomFieldDefinitionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * The data needed to create a CustomFieldDefinition.
     */
    data: XOR<CustomFieldDefinitionCreateInput, CustomFieldDefinitionUncheckedCreateInput>
  }

  /**
   * CustomFieldDefinition createMany
   */
  export type CustomFieldDefinitionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomFieldDefinitions.
     */
    data: CustomFieldDefinitionCreateManyInput | CustomFieldDefinitionCreateManyInput[]
  }

  /**
   * CustomFieldDefinition createManyAndReturn
   */
  export type CustomFieldDefinitionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * The data used to create many CustomFieldDefinitions.
     */
    data: CustomFieldDefinitionCreateManyInput | CustomFieldDefinitionCreateManyInput[]
  }

  /**
   * CustomFieldDefinition update
   */
  export type CustomFieldDefinitionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * The data needed to update a CustomFieldDefinition.
     */
    data: XOR<CustomFieldDefinitionUpdateInput, CustomFieldDefinitionUncheckedUpdateInput>
    /**
     * Choose, which CustomFieldDefinition to update.
     */
    where: CustomFieldDefinitionWhereUniqueInput
  }

  /**
   * CustomFieldDefinition updateMany
   */
  export type CustomFieldDefinitionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomFieldDefinitions.
     */
    data: XOR<CustomFieldDefinitionUpdateManyMutationInput, CustomFieldDefinitionUncheckedUpdateManyInput>
    /**
     * Filter which CustomFieldDefinitions to update
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * Limit how many CustomFieldDefinitions to update.
     */
    limit?: number
  }

  /**
   * CustomFieldDefinition updateManyAndReturn
   */
  export type CustomFieldDefinitionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * The data used to update CustomFieldDefinitions.
     */
    data: XOR<CustomFieldDefinitionUpdateManyMutationInput, CustomFieldDefinitionUncheckedUpdateManyInput>
    /**
     * Filter which CustomFieldDefinitions to update
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * Limit how many CustomFieldDefinitions to update.
     */
    limit?: number
  }

  /**
   * CustomFieldDefinition upsert
   */
  export type CustomFieldDefinitionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * The filter to search for the CustomFieldDefinition to update in case it exists.
     */
    where: CustomFieldDefinitionWhereUniqueInput
    /**
     * In case the CustomFieldDefinition found by the `where` argument doesn't exist, create a new CustomFieldDefinition with this data.
     */
    create: XOR<CustomFieldDefinitionCreateInput, CustomFieldDefinitionUncheckedCreateInput>
    /**
     * In case the CustomFieldDefinition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomFieldDefinitionUpdateInput, CustomFieldDefinitionUncheckedUpdateInput>
  }

  /**
   * CustomFieldDefinition delete
   */
  export type CustomFieldDefinitionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
    /**
     * Filter which CustomFieldDefinition to delete.
     */
    where: CustomFieldDefinitionWhereUniqueInput
  }

  /**
   * CustomFieldDefinition deleteMany
   */
  export type CustomFieldDefinitionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFieldDefinitions to delete
     */
    where?: CustomFieldDefinitionWhereInput
    /**
     * Limit how many CustomFieldDefinitions to delete.
     */
    limit?: number
  }

  /**
   * CustomFieldDefinition without action
   */
  export type CustomFieldDefinitionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFieldDefinition
     */
    select?: CustomFieldDefinitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFieldDefinition
     */
    omit?: CustomFieldDefinitionOmit<ExtArgs> | null
  }


  /**
   * Model Asset
   */

  export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  export type AssetAvgAggregateOutputType = {
    size: number | null
  }

  export type AssetSumAggregateOutputType = {
    size: number | null
  }

  export type AssetMinAggregateOutputType = {
    id: string | null
    storageKey: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    url: string | null
    documentId: string | null
    createdAt: Date | null
  }

  export type AssetMaxAggregateOutputType = {
    id: string | null
    storageKey: string | null
    originalName: string | null
    mimeType: string | null
    size: number | null
    url: string | null
    documentId: string | null
    createdAt: Date | null
  }

  export type AssetCountAggregateOutputType = {
    id: number
    storageKey: number
    originalName: number
    mimeType: number
    size: number
    url: number
    documentId: number
    createdAt: number
    _all: number
  }


  export type AssetAvgAggregateInputType = {
    size?: true
  }

  export type AssetSumAggregateInputType = {
    size?: true
  }

  export type AssetMinAggregateInputType = {
    id?: true
    storageKey?: true
    originalName?: true
    mimeType?: true
    size?: true
    url?: true
    documentId?: true
    createdAt?: true
  }

  export type AssetMaxAggregateInputType = {
    id?: true
    storageKey?: true
    originalName?: true
    mimeType?: true
    size?: true
    url?: true
    documentId?: true
    createdAt?: true
  }

  export type AssetCountAggregateInputType = {
    id?: true
    storageKey?: true
    originalName?: true
    mimeType?: true
    size?: true
    url?: true
    documentId?: true
    createdAt?: true
    _all?: true
  }

  export type AssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType
  }

  export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset[P]>
      : GetScalarType<T[P], AggregateAsset[P]>
  }




  export type AssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithAggregationInput | AssetOrderByWithAggregationInput[]
    by: AssetScalarFieldEnum[] | AssetScalarFieldEnum
    having?: AssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCountAggregateInputType | true
    _avg?: AssetAvgAggregateInputType
    _sum?: AssetSumAggregateInputType
    _min?: AssetMinAggregateInputType
    _max?: AssetMaxAggregateInputType
  }

  export type AssetGroupByOutputType = {
    id: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url: string | null
    documentId: string | null
    createdAt: Date
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetGroupByOutputType[P]>
            : GetScalarType<T[P], AssetGroupByOutputType[P]>
        }
      >
    >


  export type AssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storageKey?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    documentId?: boolean
    createdAt?: boolean
    document?: boolean | Asset$documentArgs<ExtArgs>
    pages?: boolean | Asset$pagesArgs<ExtArgs>
    generatedSubmissions?: boolean | Asset$generatedSubmissionsArgs<ExtArgs>
    _count?: boolean | AssetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storageKey?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    documentId?: boolean
    createdAt?: boolean
    document?: boolean | Asset$documentArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storageKey?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    documentId?: boolean
    createdAt?: boolean
    document?: boolean | Asset$documentArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectScalar = {
    id?: boolean
    storageKey?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    url?: boolean
    documentId?: boolean
    createdAt?: boolean
  }

  export type AssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storageKey" | "originalName" | "mimeType" | "size" | "url" | "documentId" | "createdAt", ExtArgs["result"]["asset"]>
  export type AssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | Asset$documentArgs<ExtArgs>
    pages?: boolean | Asset$pagesArgs<ExtArgs>
    generatedSubmissions?: boolean | Asset$generatedSubmissionsArgs<ExtArgs>
    _count?: boolean | AssetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | Asset$documentArgs<ExtArgs>
  }
  export type AssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | Asset$documentArgs<ExtArgs>
  }

  export type $AssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asset"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs> | null
      pages: Prisma.$DocumentPagePayload<ExtArgs>[]
      generatedSubmissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storageKey: string
      originalName: string
      mimeType: string
      size: number
      url: string | null
      documentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["asset"]>
    composites: {}
  }

  type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = $Result.GetResult<Prisma.$AssetPayload, S>

  type AssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetCountAggregateInputType | true
    }

  export interface AssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asset'], meta: { name: 'Asset' } }
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFindManyArgs>(args?: SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     * 
     */
    create<T extends AssetCreateArgs>(args: SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCreateManyArgs>(args?: SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     * 
     */
    delete<T extends AssetDeleteArgs>(args: SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetUpdateArgs>(args: SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetUpdateManyArgs>(args: SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets and returns the data updated in the database.
     * @param {AssetUpdateManyAndReturnArgs} args - Arguments to update many Assets.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssetUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(
      args?: Subset<T, AssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetAggregateArgs>(args: Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>

    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
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
      T extends AssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetGroupByArgs['orderBy'] }
        : { orderBy?: AssetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asset model
   */
  readonly fields: AssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends Asset$documentArgs<ExtArgs> = {}>(args?: Subset<T, Asset$documentArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pages<T extends Asset$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Asset$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    generatedSubmissions<T extends Asset$generatedSubmissionsArgs<ExtArgs> = {}>(args?: Subset<T, Asset$generatedSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Asset model
   */
  interface AssetFieldRefs {
    readonly id: FieldRef<"Asset", 'String'>
    readonly storageKey: FieldRef<"Asset", 'String'>
    readonly originalName: FieldRef<"Asset", 'String'>
    readonly mimeType: FieldRef<"Asset", 'String'>
    readonly size: FieldRef<"Asset", 'Int'>
    readonly url: FieldRef<"Asset", 'String'>
    readonly documentId: FieldRef<"Asset", 'String'>
    readonly createdAt: FieldRef<"Asset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Asset findUnique
   */
  export type AssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findUniqueOrThrow
   */
  export type AssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findFirst
   */
  export type AssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findFirstOrThrow
   */
  export type AssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findMany
   */
  export type AssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Assets to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset create
   */
  export type AssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to create a Asset.
     */
    data: XOR<AssetCreateInput, AssetUncheckedCreateInput>
  }

  /**
   * Asset createMany
   */
  export type AssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
  }

  /**
   * Asset createManyAndReturn
   */
  export type AssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asset update
   */
  export type AssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to update a Asset.
     */
    data: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
    /**
     * Choose, which Asset to update.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset updateMany
   */
  export type AssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
  }

  /**
   * Asset updateManyAndReturn
   */
  export type AssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asset upsert
   */
  export type AssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: AssetWhereUniqueInput
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: XOR<AssetCreateInput, AssetUncheckedCreateInput>
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
  }

  /**
   * Asset delete
   */
  export type AssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter which Asset to delete.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset deleteMany
   */
  export type AssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: AssetWhereInput
    /**
     * Limit how many Assets to delete.
     */
    limit?: number
  }

  /**
   * Asset.document
   */
  export type Asset$documentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * Asset.pages
   */
  export type Asset$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPage
     */
    select?: DocumentPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPage
     */
    omit?: DocumentPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPageInclude<ExtArgs> | null
    where?: DocumentPageWhereInput
    orderBy?: DocumentPageOrderByWithRelationInput | DocumentPageOrderByWithRelationInput[]
    cursor?: DocumentPageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentPageScalarFieldEnum | DocumentPageScalarFieldEnum[]
  }

  /**
   * Asset.generatedSubmissions
   */
  export type Asset$generatedSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Asset without action
   */
  export type AssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    documentVersionId: string | null
    data: string | null
    status: string | null
    generatedAssetId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    documentVersionId: string | null
    data: string | null
    status: string | null
    generatedAssetId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    documentId: number
    documentVersionId: number
    data: number
    status: number
    generatedAssetId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionMinAggregateInputType = {
    id?: true
    documentId?: true
    documentVersionId?: true
    data?: true
    status?: true
    generatedAssetId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    documentId?: true
    documentVersionId?: true
    data?: true
    status?: true
    generatedAssetId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    documentId?: true
    documentVersionId?: true
    data?: true
    status?: true
    generatedAssetId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    documentId: string
    documentVersionId: string
    data: string
    status: string
    generatedAssetId: string | null
    createdAt: Date
    updatedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentVersionId?: boolean
    data?: boolean
    status?: boolean
    generatedAssetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentVersionId?: boolean
    data?: boolean
    status?: boolean
    generatedAssetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentVersionId?: boolean
    data?: boolean
    status?: boolean
    generatedAssetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    documentId?: boolean
    documentVersionId?: boolean
    data?: boolean
    status?: boolean
    generatedAssetId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "documentVersionId" | "data" | "status" | "generatedAssetId" | "createdAt" | "updatedAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    documentVersion?: boolean | DocumentVersionDefaultArgs<ExtArgs>
    generatedAsset?: boolean | Submission$generatedAssetArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      documentVersion: Prisma.$DocumentVersionPayload<ExtArgs>
      generatedAsset: Prisma.$AssetPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      documentVersionId: string
      data: string
      status: string
      generatedAssetId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
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
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documentVersion<T extends DocumentVersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentVersionDefaultArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    generatedAsset<T extends Submission$generatedAssetArgs<ExtArgs> = {}>(args?: Subset<T, Submission$generatedAssetArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly documentId: FieldRef<"Submission", 'String'>
    readonly documentVersionId: FieldRef<"Submission", 'String'>
    readonly data: FieldRef<"Submission", 'String'>
    readonly status: FieldRef<"Submission", 'String'>
    readonly generatedAssetId: FieldRef<"Submission", 'String'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly updatedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission.generatedAsset
   */
  export type Submission$generatedAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asset
     */
    omit?: AssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    where?: AssetWhereInput
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    publicToken: 'publicToken',
    publishedVersionId: 'publishedVersionId',
    accessMode: 'accessMode',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentVersionScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    versionNumber: 'versionNumber',
    status: 'status',
    template: 'template',
    createdAt: 'createdAt',
    publishedAt: 'publishedAt'
  };

  export type DocumentVersionScalarFieldEnum = (typeof DocumentVersionScalarFieldEnum)[keyof typeof DocumentVersionScalarFieldEnum]


  export const DocumentPageScalarFieldEnum: {
    id: 'id',
    documentVersionId: 'documentVersionId',
    pageNumber: 'pageNumber',
    width: 'width',
    height: 'height',
    backgroundAssetId: 'backgroundAssetId',
    createdAt: 'createdAt'
  };

  export type DocumentPageScalarFieldEnum = (typeof DocumentPageScalarFieldEnum)[keyof typeof DocumentPageScalarFieldEnum]


  export const CustomFieldDefinitionScalarFieldEnum: {
    id: 'id',
    key: 'key',
    label: 'label',
    type: 'type',
    inputMode: 'inputMode',
    validation: 'validation',
    formatting: 'formatting',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomFieldDefinitionScalarFieldEnum = (typeof CustomFieldDefinitionScalarFieldEnum)[keyof typeof CustomFieldDefinitionScalarFieldEnum]


  export const AssetScalarFieldEnum: {
    id: 'id',
    storageKey: 'storageKey',
    originalName: 'originalName',
    mimeType: 'mimeType',
    size: 'size',
    url: 'url',
    documentId: 'documentId',
    createdAt: 'createdAt'
  };

  export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    documentVersionId: 'documentVersionId',
    data: 'data',
    status: 'status',
    generatedAssetId: 'generatedAssetId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
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
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    publicToken?: StringFilter<"Document"> | string
    publishedVersionId?: StringNullableFilter<"Document"> | string | null
    accessMode?: StringFilter<"Document"> | string
    createdById?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    versions?: DocumentVersionListRelationFilter
    submissions?: SubmissionListRelationFilter
    assets?: AssetListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    publicToken?: SortOrder
    publishedVersionId?: SortOrderInput | SortOrder
    accessMode?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    versions?: DocumentVersionOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    assets?: AssetOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    publicToken?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    name?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    publishedVersionId?: StringNullableFilter<"Document"> | string | null
    accessMode?: StringFilter<"Document"> | string
    createdById?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    versions?: DocumentVersionListRelationFilter
    submissions?: SubmissionListRelationFilter
    assets?: AssetListRelationFilter
  }, "id" | "publicToken">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    publicToken?: SortOrder
    publishedVersionId?: SortOrderInput | SortOrder
    accessMode?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    name?: StringWithAggregatesFilter<"Document"> | string
    description?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: StringWithAggregatesFilter<"Document"> | string
    publicToken?: StringWithAggregatesFilter<"Document"> | string
    publishedVersionId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    accessMode?: StringWithAggregatesFilter<"Document"> | string
    createdById?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
  }

  export type DocumentVersionWhereInput = {
    AND?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    OR?: DocumentVersionWhereInput[]
    NOT?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    id?: StringFilter<"DocumentVersion"> | string
    documentId?: StringFilter<"DocumentVersion"> | string
    versionNumber?: IntFilter<"DocumentVersion"> | number
    status?: StringFilter<"DocumentVersion"> | string
    template?: StringFilter<"DocumentVersion"> | string
    createdAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    publishedAt?: DateTimeNullableFilter<"DocumentVersion"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    pages?: DocumentPageListRelationFilter
    submissions?: SubmissionListRelationFilter
  }

  export type DocumentVersionOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    status?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    document?: DocumentOrderByWithRelationInput
    pages?: DocumentPageOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type DocumentVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_versionNumber?: DocumentVersionDocumentIdVersionNumberCompoundUniqueInput
    AND?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    OR?: DocumentVersionWhereInput[]
    NOT?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    documentId?: StringFilter<"DocumentVersion"> | string
    versionNumber?: IntFilter<"DocumentVersion"> | number
    status?: StringFilter<"DocumentVersion"> | string
    template?: StringFilter<"DocumentVersion"> | string
    createdAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    publishedAt?: DateTimeNullableFilter<"DocumentVersion"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    pages?: DocumentPageListRelationFilter
    submissions?: SubmissionListRelationFilter
  }, "id" | "documentId_versionNumber">

  export type DocumentVersionOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    status?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    _count?: DocumentVersionCountOrderByAggregateInput
    _avg?: DocumentVersionAvgOrderByAggregateInput
    _max?: DocumentVersionMaxOrderByAggregateInput
    _min?: DocumentVersionMinOrderByAggregateInput
    _sum?: DocumentVersionSumOrderByAggregateInput
  }

  export type DocumentVersionScalarWhereWithAggregatesInput = {
    AND?: DocumentVersionScalarWhereWithAggregatesInput | DocumentVersionScalarWhereWithAggregatesInput[]
    OR?: DocumentVersionScalarWhereWithAggregatesInput[]
    NOT?: DocumentVersionScalarWhereWithAggregatesInput | DocumentVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentVersion"> | string
    documentId?: StringWithAggregatesFilter<"DocumentVersion"> | string
    versionNumber?: IntWithAggregatesFilter<"DocumentVersion"> | number
    status?: StringWithAggregatesFilter<"DocumentVersion"> | string
    template?: StringWithAggregatesFilter<"DocumentVersion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DocumentVersion"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"DocumentVersion"> | Date | string | null
  }

  export type DocumentPageWhereInput = {
    AND?: DocumentPageWhereInput | DocumentPageWhereInput[]
    OR?: DocumentPageWhereInput[]
    NOT?: DocumentPageWhereInput | DocumentPageWhereInput[]
    id?: StringFilter<"DocumentPage"> | string
    documentVersionId?: StringFilter<"DocumentPage"> | string
    pageNumber?: IntFilter<"DocumentPage"> | number
    width?: FloatFilter<"DocumentPage"> | number
    height?: FloatFilter<"DocumentPage"> | number
    backgroundAssetId?: StringNullableFilter<"DocumentPage"> | string | null
    createdAt?: DateTimeFilter<"DocumentPage"> | Date | string
    documentVersion?: XOR<DocumentVersionScalarRelationFilter, DocumentVersionWhereInput>
    backgroundAsset?: XOR<AssetNullableScalarRelationFilter, AssetWhereInput> | null
  }

  export type DocumentPageOrderByWithRelationInput = {
    id?: SortOrder
    documentVersionId?: SortOrder
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
    backgroundAssetId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    documentVersion?: DocumentVersionOrderByWithRelationInput
    backgroundAsset?: AssetOrderByWithRelationInput
  }

  export type DocumentPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentPageWhereInput | DocumentPageWhereInput[]
    OR?: DocumentPageWhereInput[]
    NOT?: DocumentPageWhereInput | DocumentPageWhereInput[]
    documentVersionId?: StringFilter<"DocumentPage"> | string
    pageNumber?: IntFilter<"DocumentPage"> | number
    width?: FloatFilter<"DocumentPage"> | number
    height?: FloatFilter<"DocumentPage"> | number
    backgroundAssetId?: StringNullableFilter<"DocumentPage"> | string | null
    createdAt?: DateTimeFilter<"DocumentPage"> | Date | string
    documentVersion?: XOR<DocumentVersionScalarRelationFilter, DocumentVersionWhereInput>
    backgroundAsset?: XOR<AssetNullableScalarRelationFilter, AssetWhereInput> | null
  }, "id">

  export type DocumentPageOrderByWithAggregationInput = {
    id?: SortOrder
    documentVersionId?: SortOrder
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
    backgroundAssetId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DocumentPageCountOrderByAggregateInput
    _avg?: DocumentPageAvgOrderByAggregateInput
    _max?: DocumentPageMaxOrderByAggregateInput
    _min?: DocumentPageMinOrderByAggregateInput
    _sum?: DocumentPageSumOrderByAggregateInput
  }

  export type DocumentPageScalarWhereWithAggregatesInput = {
    AND?: DocumentPageScalarWhereWithAggregatesInput | DocumentPageScalarWhereWithAggregatesInput[]
    OR?: DocumentPageScalarWhereWithAggregatesInput[]
    NOT?: DocumentPageScalarWhereWithAggregatesInput | DocumentPageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentPage"> | string
    documentVersionId?: StringWithAggregatesFilter<"DocumentPage"> | string
    pageNumber?: IntWithAggregatesFilter<"DocumentPage"> | number
    width?: FloatWithAggregatesFilter<"DocumentPage"> | number
    height?: FloatWithAggregatesFilter<"DocumentPage"> | number
    backgroundAssetId?: StringNullableWithAggregatesFilter<"DocumentPage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocumentPage"> | Date | string
  }

  export type CustomFieldDefinitionWhereInput = {
    AND?: CustomFieldDefinitionWhereInput | CustomFieldDefinitionWhereInput[]
    OR?: CustomFieldDefinitionWhereInput[]
    NOT?: CustomFieldDefinitionWhereInput | CustomFieldDefinitionWhereInput[]
    id?: StringFilter<"CustomFieldDefinition"> | string
    key?: StringFilter<"CustomFieldDefinition"> | string
    label?: StringFilter<"CustomFieldDefinition"> | string
    type?: StringFilter<"CustomFieldDefinition"> | string
    inputMode?: StringFilter<"CustomFieldDefinition"> | string
    validation?: StringNullableFilter<"CustomFieldDefinition"> | string | null
    formatting?: StringNullableFilter<"CustomFieldDefinition"> | string | null
    createdAt?: DateTimeFilter<"CustomFieldDefinition"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFieldDefinition"> | Date | string
  }

  export type CustomFieldDefinitionOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    type?: SortOrder
    inputMode?: SortOrder
    validation?: SortOrderInput | SortOrder
    formatting?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldDefinitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: CustomFieldDefinitionWhereInput | CustomFieldDefinitionWhereInput[]
    OR?: CustomFieldDefinitionWhereInput[]
    NOT?: CustomFieldDefinitionWhereInput | CustomFieldDefinitionWhereInput[]
    label?: StringFilter<"CustomFieldDefinition"> | string
    type?: StringFilter<"CustomFieldDefinition"> | string
    inputMode?: StringFilter<"CustomFieldDefinition"> | string
    validation?: StringNullableFilter<"CustomFieldDefinition"> | string | null
    formatting?: StringNullableFilter<"CustomFieldDefinition"> | string | null
    createdAt?: DateTimeFilter<"CustomFieldDefinition"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFieldDefinition"> | Date | string
  }, "id" | "key">

  export type CustomFieldDefinitionOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    type?: SortOrder
    inputMode?: SortOrder
    validation?: SortOrderInput | SortOrder
    formatting?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomFieldDefinitionCountOrderByAggregateInput
    _max?: CustomFieldDefinitionMaxOrderByAggregateInput
    _min?: CustomFieldDefinitionMinOrderByAggregateInput
  }

  export type CustomFieldDefinitionScalarWhereWithAggregatesInput = {
    AND?: CustomFieldDefinitionScalarWhereWithAggregatesInput | CustomFieldDefinitionScalarWhereWithAggregatesInput[]
    OR?: CustomFieldDefinitionScalarWhereWithAggregatesInput[]
    NOT?: CustomFieldDefinitionScalarWhereWithAggregatesInput | CustomFieldDefinitionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomFieldDefinition"> | string
    key?: StringWithAggregatesFilter<"CustomFieldDefinition"> | string
    label?: StringWithAggregatesFilter<"CustomFieldDefinition"> | string
    type?: StringWithAggregatesFilter<"CustomFieldDefinition"> | string
    inputMode?: StringWithAggregatesFilter<"CustomFieldDefinition"> | string
    validation?: StringNullableWithAggregatesFilter<"CustomFieldDefinition"> | string | null
    formatting?: StringNullableWithAggregatesFilter<"CustomFieldDefinition"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustomFieldDefinition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomFieldDefinition"> | Date | string
  }

  export type AssetWhereInput = {
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: StringFilter<"Asset"> | string
    storageKey?: StringFilter<"Asset"> | string
    originalName?: StringFilter<"Asset"> | string
    mimeType?: StringFilter<"Asset"> | string
    size?: IntFilter<"Asset"> | number
    url?: StringNullableFilter<"Asset"> | string | null
    documentId?: StringNullableFilter<"Asset"> | string | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    document?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    pages?: DocumentPageListRelationFilter
    generatedSubmissions?: SubmissionListRelationFilter
  }

  export type AssetOrderByWithRelationInput = {
    id?: SortOrder
    storageKey?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
    pages?: DocumentPageOrderByRelationAggregateInput
    generatedSubmissions?: SubmissionOrderByRelationAggregateInput
  }

  export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    storageKey?: StringFilter<"Asset"> | string
    originalName?: StringFilter<"Asset"> | string
    mimeType?: StringFilter<"Asset"> | string
    size?: IntFilter<"Asset"> | number
    url?: StringNullableFilter<"Asset"> | string | null
    documentId?: StringNullableFilter<"Asset"> | string | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
    document?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
    pages?: DocumentPageListRelationFilter
    generatedSubmissions?: SubmissionListRelationFilter
  }, "id">

  export type AssetOrderByWithAggregationInput = {
    id?: SortOrder
    storageKey?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AssetCountOrderByAggregateInput
    _avg?: AssetAvgOrderByAggregateInput
    _max?: AssetMaxOrderByAggregateInput
    _min?: AssetMinOrderByAggregateInput
    _sum?: AssetSumOrderByAggregateInput
  }

  export type AssetScalarWhereWithAggregatesInput = {
    AND?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    OR?: AssetScalarWhereWithAggregatesInput[]
    NOT?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Asset"> | string
    storageKey?: StringWithAggregatesFilter<"Asset"> | string
    originalName?: StringWithAggregatesFilter<"Asset"> | string
    mimeType?: StringWithAggregatesFilter<"Asset"> | string
    size?: IntWithAggregatesFilter<"Asset"> | number
    url?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    documentId?: StringNullableWithAggregatesFilter<"Asset"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Asset"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    documentId?: StringFilter<"Submission"> | string
    documentVersionId?: StringFilter<"Submission"> | string
    data?: StringFilter<"Submission"> | string
    status?: StringFilter<"Submission"> | string
    generatedAssetId?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    documentVersion?: XOR<DocumentVersionScalarRelationFilter, DocumentVersionWhereInput>
    generatedAsset?: XOR<AssetNullableScalarRelationFilter, AssetWhereInput> | null
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentVersionId?: SortOrder
    data?: SortOrder
    status?: SortOrder
    generatedAssetId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
    documentVersion?: DocumentVersionOrderByWithRelationInput
    generatedAsset?: AssetOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    documentId?: StringFilter<"Submission"> | string
    documentVersionId?: StringFilter<"Submission"> | string
    data?: StringFilter<"Submission"> | string
    status?: StringFilter<"Submission"> | string
    generatedAssetId?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    documentVersion?: XOR<DocumentVersionScalarRelationFilter, DocumentVersionWhereInput>
    generatedAsset?: XOR<AssetNullableScalarRelationFilter, AssetWhereInput> | null
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentVersionId?: SortOrder
    data?: SortOrder
    status?: SortOrder
    generatedAssetId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    documentId?: StringWithAggregatesFilter<"Submission"> | string
    documentVersionId?: StringWithAggregatesFilter<"Submission"> | string
    data?: StringWithAggregatesFilter<"Submission"> | string
    status?: StringWithAggregatesFilter<"Submission"> | string
    generatedAssetId?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutDocumentsInput
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentInput
    assets?: AssetCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentInput
    assets?: AssetUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutDocumentsNestedInput
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentNestedInput
    assets?: AssetUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentNestedInput
    assets?: AssetUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentVersionCreateInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    document: DocumentCreateNestedOneWithoutVersionsInput
    pages?: DocumentPageCreateNestedManyWithoutDocumentVersionInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionUncheckedCreateInput = {
    id?: string
    documentId: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    pages?: DocumentPageUncheckedCreateNestedManyWithoutDocumentVersionInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    document?: DocumentUpdateOneRequiredWithoutVersionsNestedInput
    pages?: DocumentPageUpdateManyWithoutDocumentVersionNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pages?: DocumentPageUncheckedUpdateManyWithoutDocumentVersionNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionCreateManyInput = {
    id?: string
    documentId: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type DocumentVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentPageCreateInput = {
    id?: string
    pageNumber: number
    width: number
    height: number
    createdAt?: Date | string
    documentVersion: DocumentVersionCreateNestedOneWithoutPagesInput
    backgroundAsset?: AssetCreateNestedOneWithoutPagesInput
  }

  export type DocumentPageUncheckedCreateInput = {
    id?: string
    documentVersionId: string
    pageNumber: number
    width: number
    height: number
    backgroundAssetId?: string | null
    createdAt?: Date | string
  }

  export type DocumentPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentVersion?: DocumentVersionUpdateOneRequiredWithoutPagesNestedInput
    backgroundAsset?: AssetUpdateOneWithoutPagesNestedInput
  }

  export type DocumentPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    backgroundAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageCreateManyInput = {
    id?: string
    documentVersionId: string
    pageNumber: number
    width: number
    height: number
    backgroundAssetId?: string | null
    createdAt?: Date | string
  }

  export type DocumentPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    backgroundAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldDefinitionCreateInput = {
    id?: string
    key: string
    label: string
    type?: string
    inputMode?: string
    validation?: string | null
    formatting?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldDefinitionUncheckedCreateInput = {
    id?: string
    key: string
    label: string
    type?: string
    inputMode?: string
    validation?: string | null
    formatting?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldDefinitionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inputMode?: StringFieldUpdateOperationsInput | string
    validation?: NullableStringFieldUpdateOperationsInput | string | null
    formatting?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldDefinitionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inputMode?: StringFieldUpdateOperationsInput | string
    validation?: NullableStringFieldUpdateOperationsInput | string | null
    formatting?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldDefinitionCreateManyInput = {
    id?: string
    key: string
    label: string
    type?: string
    inputMode?: string
    validation?: string | null
    formatting?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFieldDefinitionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inputMode?: StringFieldUpdateOperationsInput | string
    validation?: NullableStringFieldUpdateOperationsInput | string | null
    formatting?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFieldDefinitionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inputMode?: StringFieldUpdateOperationsInput | string
    validation?: NullableStringFieldUpdateOperationsInput | string | null
    formatting?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCreateInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
    document?: DocumentCreateNestedOneWithoutAssetsInput
    pages?: DocumentPageCreateNestedManyWithoutBackgroundAssetInput
    generatedSubmissions?: SubmissionCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetUncheckedCreateInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    documentId?: string | null
    createdAt?: Date | string
    pages?: DocumentPageUncheckedCreateNestedManyWithoutBackgroundAssetInput
    generatedSubmissions?: SubmissionUncheckedCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneWithoutAssetsNestedInput
    pages?: DocumentPageUpdateManyWithoutBackgroundAssetNestedInput
    generatedSubmissions?: SubmissionUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type AssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: DocumentPageUncheckedUpdateManyWithoutBackgroundAssetNestedInput
    generatedSubmissions?: SubmissionUncheckedUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type AssetCreateManyInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    documentId?: string | null
    createdAt?: Date | string
  }

  export type AssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutSubmissionsInput
    documentVersion: DocumentVersionCreateNestedOneWithoutSubmissionsInput
    generatedAsset?: AssetCreateNestedOneWithoutGeneratedSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    documentId: string
    documentVersionId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutSubmissionsNestedInput
    documentVersion?: DocumentVersionUpdateOneRequiredWithoutSubmissionsNestedInput
    generatedAsset?: AssetUpdateOneWithoutGeneratedSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: string
    documentId: string
    documentVersionId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DocumentVersionListRelationFilter = {
    every?: DocumentVersionWhereInput
    some?: DocumentVersionWhereInput
    none?: DocumentVersionWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type AssetListRelationFilter = {
    every?: AssetWhereInput
    some?: AssetWhereInput
    none?: AssetWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    publicToken?: SortOrder
    publishedVersionId?: SortOrder
    accessMode?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    publicToken?: SortOrder
    publishedVersionId?: SortOrder
    accessMode?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    publicToken?: SortOrder
    publishedVersionId?: SortOrder
    accessMode?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentPageListRelationFilter = {
    every?: DocumentPageWhereInput
    some?: DocumentPageWhereInput
    none?: DocumentPageWhereInput
  }

  export type DocumentPageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentVersionDocumentIdVersionNumberCompoundUniqueInput = {
    documentId: string
    versionNumber: number
  }

  export type DocumentVersionCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    status?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type DocumentVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type DocumentVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    status?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type DocumentVersionMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    status?: SortOrder
    template?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type DocumentVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DocumentVersionScalarRelationFilter = {
    is?: DocumentVersionWhereInput
    isNot?: DocumentVersionWhereInput
  }

  export type AssetNullableScalarRelationFilter = {
    is?: AssetWhereInput | null
    isNot?: AssetWhereInput | null
  }

  export type DocumentPageCountOrderByAggregateInput = {
    id?: SortOrder
    documentVersionId?: SortOrder
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
    backgroundAssetId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentPageAvgOrderByAggregateInput = {
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type DocumentPageMaxOrderByAggregateInput = {
    id?: SortOrder
    documentVersionId?: SortOrder
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
    backgroundAssetId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentPageMinOrderByAggregateInput = {
    id?: SortOrder
    documentVersionId?: SortOrder
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
    backgroundAssetId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentPageSumOrderByAggregateInput = {
    pageNumber?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CustomFieldDefinitionCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    type?: SortOrder
    inputMode?: SortOrder
    validation?: SortOrder
    formatting?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldDefinitionMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    type?: SortOrder
    inputMode?: SortOrder
    validation?: SortOrder
    formatting?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFieldDefinitionMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    type?: SortOrder
    inputMode?: SortOrder
    validation?: SortOrder
    formatting?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentNullableScalarRelationFilter = {
    is?: DocumentWhereInput | null
    isNot?: DocumentWhereInput | null
  }

  export type AssetCountOrderByAggregateInput = {
    id?: SortOrder
    storageKey?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssetAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type AssetMaxOrderByAggregateInput = {
    id?: SortOrder
    storageKey?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssetMinOrderByAggregateInput = {
    id?: SortOrder
    storageKey?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    url?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AssetSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentVersionId?: SortOrder
    data?: SortOrder
    status?: SortOrder
    generatedAssetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentVersionId?: SortOrder
    data?: SortOrder
    status?: SortOrder
    generatedAssetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentVersionId?: SortOrder
    data?: SortOrder
    status?: SortOrder
    generatedAssetId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput> | DocumentCreateWithoutCreatedByInput[] | DocumentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCreatedByInput | DocumentCreateOrConnectWithoutCreatedByInput[]
    createMany?: DocumentCreateManyCreatedByInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput> | DocumentCreateWithoutCreatedByInput[] | DocumentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCreatedByInput | DocumentCreateOrConnectWithoutCreatedByInput[]
    createMany?: DocumentCreateManyCreatedByInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DocumentUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput> | DocumentCreateWithoutCreatedByInput[] | DocumentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCreatedByInput | DocumentCreateOrConnectWithoutCreatedByInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCreatedByInput | DocumentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DocumentCreateManyCreatedByInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCreatedByInput | DocumentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCreatedByInput | DocumentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput> | DocumentCreateWithoutCreatedByInput[] | DocumentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCreatedByInput | DocumentCreateOrConnectWithoutCreatedByInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCreatedByInput | DocumentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DocumentCreateManyCreatedByInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCreatedByInput | DocumentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCreatedByInput | DocumentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentVersionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput> | SubmissionCreateWithoutDocumentInput[] | SubmissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentInput | SubmissionCreateOrConnectWithoutDocumentInput[]
    createMany?: SubmissionCreateManyDocumentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type AssetCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput> | AssetCreateWithoutDocumentInput[] | AssetUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutDocumentInput | AssetCreateOrConnectWithoutDocumentInput[]
    createMany?: AssetCreateManyDocumentInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput> | SubmissionCreateWithoutDocumentInput[] | SubmissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentInput | SubmissionCreateOrConnectWithoutDocumentInput[]
    createMany?: SubmissionCreateManyDocumentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type AssetUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput> | AssetCreateWithoutDocumentInput[] | AssetUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutDocumentInput | AssetCreateOrConnectWithoutDocumentInput[]
    createMany?: AssetCreateManyDocumentInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentVersionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput | DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    set?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    disconnect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    delete?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    update?: DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput | DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentVersionUpdateManyWithWhereWithoutDocumentInput | DocumentVersionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput> | SubmissionCreateWithoutDocumentInput[] | SubmissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentInput | SubmissionCreateOrConnectWithoutDocumentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutDocumentInput | SubmissionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SubmissionCreateManyDocumentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutDocumentInput | SubmissionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutDocumentInput | SubmissionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type AssetUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput> | AssetCreateWithoutDocumentInput[] | AssetUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutDocumentInput | AssetCreateOrConnectWithoutDocumentInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutDocumentInput | AssetUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AssetCreateManyDocumentInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutDocumentInput | AssetUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutDocumentInput | AssetUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput | DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    set?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    disconnect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    delete?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    update?: DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput | DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentVersionUpdateManyWithWhereWithoutDocumentInput | DocumentVersionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput> | SubmissionCreateWithoutDocumentInput[] | SubmissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentInput | SubmissionCreateOrConnectWithoutDocumentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutDocumentInput | SubmissionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SubmissionCreateManyDocumentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutDocumentInput | SubmissionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutDocumentInput | SubmissionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type AssetUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput> | AssetCreateWithoutDocumentInput[] | AssetUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutDocumentInput | AssetCreateOrConnectWithoutDocumentInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutDocumentInput | AssetUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AssetCreateManyDocumentInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutDocumentInput | AssetUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutDocumentInput | AssetUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutVersionsInput = {
    create?: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutVersionsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentPageCreateNestedManyWithoutDocumentVersionInput = {
    create?: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput> | DocumentPageCreateWithoutDocumentVersionInput[] | DocumentPageUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutDocumentVersionInput | DocumentPageCreateOrConnectWithoutDocumentVersionInput[]
    createMany?: DocumentPageCreateManyDocumentVersionInputEnvelope
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutDocumentVersionInput = {
    create?: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput> | SubmissionCreateWithoutDocumentVersionInput[] | SubmissionUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentVersionInput | SubmissionCreateOrConnectWithoutDocumentVersionInput[]
    createMany?: SubmissionCreateManyDocumentVersionInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type DocumentPageUncheckedCreateNestedManyWithoutDocumentVersionInput = {
    create?: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput> | DocumentPageCreateWithoutDocumentVersionInput[] | DocumentPageUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutDocumentVersionInput | DocumentPageCreateOrConnectWithoutDocumentVersionInput[]
    createMany?: DocumentPageCreateManyDocumentVersionInputEnvelope
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutDocumentVersionInput = {
    create?: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput> | SubmissionCreateWithoutDocumentVersionInput[] | SubmissionUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentVersionInput | SubmissionCreateOrConnectWithoutDocumentVersionInput[]
    createMany?: SubmissionCreateManyDocumentVersionInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutVersionsInput
    upsert?: DocumentUpsertWithoutVersionsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutVersionsInput, DocumentUpdateWithoutVersionsInput>, DocumentUncheckedUpdateWithoutVersionsInput>
  }

  export type DocumentPageUpdateManyWithoutDocumentVersionNestedInput = {
    create?: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput> | DocumentPageCreateWithoutDocumentVersionInput[] | DocumentPageUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutDocumentVersionInput | DocumentPageCreateOrConnectWithoutDocumentVersionInput[]
    upsert?: DocumentPageUpsertWithWhereUniqueWithoutDocumentVersionInput | DocumentPageUpsertWithWhereUniqueWithoutDocumentVersionInput[]
    createMany?: DocumentPageCreateManyDocumentVersionInputEnvelope
    set?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    disconnect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    delete?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    update?: DocumentPageUpdateWithWhereUniqueWithoutDocumentVersionInput | DocumentPageUpdateWithWhereUniqueWithoutDocumentVersionInput[]
    updateMany?: DocumentPageUpdateManyWithWhereWithoutDocumentVersionInput | DocumentPageUpdateManyWithWhereWithoutDocumentVersionInput[]
    deleteMany?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutDocumentVersionNestedInput = {
    create?: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput> | SubmissionCreateWithoutDocumentVersionInput[] | SubmissionUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentVersionInput | SubmissionCreateOrConnectWithoutDocumentVersionInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutDocumentVersionInput | SubmissionUpsertWithWhereUniqueWithoutDocumentVersionInput[]
    createMany?: SubmissionCreateManyDocumentVersionInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutDocumentVersionInput | SubmissionUpdateWithWhereUniqueWithoutDocumentVersionInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutDocumentVersionInput | SubmissionUpdateManyWithWhereWithoutDocumentVersionInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type DocumentPageUncheckedUpdateManyWithoutDocumentVersionNestedInput = {
    create?: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput> | DocumentPageCreateWithoutDocumentVersionInput[] | DocumentPageUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutDocumentVersionInput | DocumentPageCreateOrConnectWithoutDocumentVersionInput[]
    upsert?: DocumentPageUpsertWithWhereUniqueWithoutDocumentVersionInput | DocumentPageUpsertWithWhereUniqueWithoutDocumentVersionInput[]
    createMany?: DocumentPageCreateManyDocumentVersionInputEnvelope
    set?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    disconnect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    delete?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    update?: DocumentPageUpdateWithWhereUniqueWithoutDocumentVersionInput | DocumentPageUpdateWithWhereUniqueWithoutDocumentVersionInput[]
    updateMany?: DocumentPageUpdateManyWithWhereWithoutDocumentVersionInput | DocumentPageUpdateManyWithWhereWithoutDocumentVersionInput[]
    deleteMany?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutDocumentVersionNestedInput = {
    create?: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput> | SubmissionCreateWithoutDocumentVersionInput[] | SubmissionUncheckedCreateWithoutDocumentVersionInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutDocumentVersionInput | SubmissionCreateOrConnectWithoutDocumentVersionInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutDocumentVersionInput | SubmissionUpsertWithWhereUniqueWithoutDocumentVersionInput[]
    createMany?: SubmissionCreateManyDocumentVersionInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutDocumentVersionInput | SubmissionUpdateWithWhereUniqueWithoutDocumentVersionInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutDocumentVersionInput | SubmissionUpdateManyWithWhereWithoutDocumentVersionInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type DocumentVersionCreateNestedOneWithoutPagesInput = {
    create?: XOR<DocumentVersionCreateWithoutPagesInput, DocumentVersionUncheckedCreateWithoutPagesInput>
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutPagesInput
    connect?: DocumentVersionWhereUniqueInput
  }

  export type AssetCreateNestedOneWithoutPagesInput = {
    create?: XOR<AssetCreateWithoutPagesInput, AssetUncheckedCreateWithoutPagesInput>
    connectOrCreate?: AssetCreateOrConnectWithoutPagesInput
    connect?: AssetWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentVersionUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutPagesInput, DocumentVersionUncheckedCreateWithoutPagesInput>
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutPagesInput
    upsert?: DocumentVersionUpsertWithoutPagesInput
    connect?: DocumentVersionWhereUniqueInput
    update?: XOR<XOR<DocumentVersionUpdateToOneWithWhereWithoutPagesInput, DocumentVersionUpdateWithoutPagesInput>, DocumentVersionUncheckedUpdateWithoutPagesInput>
  }

  export type AssetUpdateOneWithoutPagesNestedInput = {
    create?: XOR<AssetCreateWithoutPagesInput, AssetUncheckedCreateWithoutPagesInput>
    connectOrCreate?: AssetCreateOrConnectWithoutPagesInput
    upsert?: AssetUpsertWithoutPagesInput
    disconnect?: AssetWhereInput | boolean
    delete?: AssetWhereInput | boolean
    connect?: AssetWhereUniqueInput
    update?: XOR<XOR<AssetUpdateToOneWithWhereWithoutPagesInput, AssetUpdateWithoutPagesInput>, AssetUncheckedUpdateWithoutPagesInput>
  }

  export type DocumentCreateNestedOneWithoutAssetsInput = {
    create?: XOR<DocumentCreateWithoutAssetsInput, DocumentUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAssetsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentPageCreateNestedManyWithoutBackgroundAssetInput = {
    create?: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput> | DocumentPageCreateWithoutBackgroundAssetInput[] | DocumentPageUncheckedCreateWithoutBackgroundAssetInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutBackgroundAssetInput | DocumentPageCreateOrConnectWithoutBackgroundAssetInput[]
    createMany?: DocumentPageCreateManyBackgroundAssetInputEnvelope
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutGeneratedAssetInput = {
    create?: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput> | SubmissionCreateWithoutGeneratedAssetInput[] | SubmissionUncheckedCreateWithoutGeneratedAssetInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGeneratedAssetInput | SubmissionCreateOrConnectWithoutGeneratedAssetInput[]
    createMany?: SubmissionCreateManyGeneratedAssetInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type DocumentPageUncheckedCreateNestedManyWithoutBackgroundAssetInput = {
    create?: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput> | DocumentPageCreateWithoutBackgroundAssetInput[] | DocumentPageUncheckedCreateWithoutBackgroundAssetInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutBackgroundAssetInput | DocumentPageCreateOrConnectWithoutBackgroundAssetInput[]
    createMany?: DocumentPageCreateManyBackgroundAssetInputEnvelope
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutGeneratedAssetInput = {
    create?: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput> | SubmissionCreateWithoutGeneratedAssetInput[] | SubmissionUncheckedCreateWithoutGeneratedAssetInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGeneratedAssetInput | SubmissionCreateOrConnectWithoutGeneratedAssetInput[]
    createMany?: SubmissionCreateManyGeneratedAssetInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type DocumentUpdateOneWithoutAssetsNestedInput = {
    create?: XOR<DocumentCreateWithoutAssetsInput, DocumentUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAssetsInput
    upsert?: DocumentUpsertWithoutAssetsInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutAssetsInput, DocumentUpdateWithoutAssetsInput>, DocumentUncheckedUpdateWithoutAssetsInput>
  }

  export type DocumentPageUpdateManyWithoutBackgroundAssetNestedInput = {
    create?: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput> | DocumentPageCreateWithoutBackgroundAssetInput[] | DocumentPageUncheckedCreateWithoutBackgroundAssetInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutBackgroundAssetInput | DocumentPageCreateOrConnectWithoutBackgroundAssetInput[]
    upsert?: DocumentPageUpsertWithWhereUniqueWithoutBackgroundAssetInput | DocumentPageUpsertWithWhereUniqueWithoutBackgroundAssetInput[]
    createMany?: DocumentPageCreateManyBackgroundAssetInputEnvelope
    set?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    disconnect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    delete?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    update?: DocumentPageUpdateWithWhereUniqueWithoutBackgroundAssetInput | DocumentPageUpdateWithWhereUniqueWithoutBackgroundAssetInput[]
    updateMany?: DocumentPageUpdateManyWithWhereWithoutBackgroundAssetInput | DocumentPageUpdateManyWithWhereWithoutBackgroundAssetInput[]
    deleteMany?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutGeneratedAssetNestedInput = {
    create?: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput> | SubmissionCreateWithoutGeneratedAssetInput[] | SubmissionUncheckedCreateWithoutGeneratedAssetInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGeneratedAssetInput | SubmissionCreateOrConnectWithoutGeneratedAssetInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutGeneratedAssetInput | SubmissionUpsertWithWhereUniqueWithoutGeneratedAssetInput[]
    createMany?: SubmissionCreateManyGeneratedAssetInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutGeneratedAssetInput | SubmissionUpdateWithWhereUniqueWithoutGeneratedAssetInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutGeneratedAssetInput | SubmissionUpdateManyWithWhereWithoutGeneratedAssetInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type DocumentPageUncheckedUpdateManyWithoutBackgroundAssetNestedInput = {
    create?: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput> | DocumentPageCreateWithoutBackgroundAssetInput[] | DocumentPageUncheckedCreateWithoutBackgroundAssetInput[]
    connectOrCreate?: DocumentPageCreateOrConnectWithoutBackgroundAssetInput | DocumentPageCreateOrConnectWithoutBackgroundAssetInput[]
    upsert?: DocumentPageUpsertWithWhereUniqueWithoutBackgroundAssetInput | DocumentPageUpsertWithWhereUniqueWithoutBackgroundAssetInput[]
    createMany?: DocumentPageCreateManyBackgroundAssetInputEnvelope
    set?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    disconnect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    delete?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    connect?: DocumentPageWhereUniqueInput | DocumentPageWhereUniqueInput[]
    update?: DocumentPageUpdateWithWhereUniqueWithoutBackgroundAssetInput | DocumentPageUpdateWithWhereUniqueWithoutBackgroundAssetInput[]
    updateMany?: DocumentPageUpdateManyWithWhereWithoutBackgroundAssetInput | DocumentPageUpdateManyWithWhereWithoutBackgroundAssetInput[]
    deleteMany?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutGeneratedAssetNestedInput = {
    create?: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput> | SubmissionCreateWithoutGeneratedAssetInput[] | SubmissionUncheckedCreateWithoutGeneratedAssetInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGeneratedAssetInput | SubmissionCreateOrConnectWithoutGeneratedAssetInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutGeneratedAssetInput | SubmissionUpsertWithWhereUniqueWithoutGeneratedAssetInput[]
    createMany?: SubmissionCreateManyGeneratedAssetInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutGeneratedAssetInput | SubmissionUpdateWithWhereUniqueWithoutGeneratedAssetInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutGeneratedAssetInput | SubmissionUpdateManyWithWhereWithoutGeneratedAssetInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<DocumentCreateWithoutSubmissionsInput, DocumentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSubmissionsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentVersionCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<DocumentVersionCreateWithoutSubmissionsInput, DocumentVersionUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutSubmissionsInput
    connect?: DocumentVersionWhereUniqueInput
  }

  export type AssetCreateNestedOneWithoutGeneratedSubmissionsInput = {
    create?: XOR<AssetCreateWithoutGeneratedSubmissionsInput, AssetUncheckedCreateWithoutGeneratedSubmissionsInput>
    connectOrCreate?: AssetCreateOrConnectWithoutGeneratedSubmissionsInput
    connect?: AssetWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<DocumentCreateWithoutSubmissionsInput, DocumentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSubmissionsInput
    upsert?: DocumentUpsertWithoutSubmissionsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutSubmissionsInput, DocumentUpdateWithoutSubmissionsInput>, DocumentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DocumentVersionUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutSubmissionsInput, DocumentVersionUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutSubmissionsInput
    upsert?: DocumentVersionUpsertWithoutSubmissionsInput
    connect?: DocumentVersionWhereUniqueInput
    update?: XOR<XOR<DocumentVersionUpdateToOneWithWhereWithoutSubmissionsInput, DocumentVersionUpdateWithoutSubmissionsInput>, DocumentVersionUncheckedUpdateWithoutSubmissionsInput>
  }

  export type AssetUpdateOneWithoutGeneratedSubmissionsNestedInput = {
    create?: XOR<AssetCreateWithoutGeneratedSubmissionsInput, AssetUncheckedCreateWithoutGeneratedSubmissionsInput>
    connectOrCreate?: AssetCreateOrConnectWithoutGeneratedSubmissionsInput
    upsert?: AssetUpsertWithoutGeneratedSubmissionsInput
    disconnect?: AssetWhereInput | boolean
    delete?: AssetWhereInput | boolean
    connect?: AssetWhereUniqueInput
    update?: XOR<XOR<AssetUpdateToOneWithWhereWithoutGeneratedSubmissionsInput, AssetUpdateWithoutGeneratedSubmissionsInput>, AssetUncheckedUpdateWithoutGeneratedSubmissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentInput
    assets?: AssetCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentInput
    assets?: AssetUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutCreatedByInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput>
  }

  export type DocumentCreateManyCreatedByInputEnvelope = {
    data: DocumentCreateManyCreatedByInput | DocumentCreateManyCreatedByInput[]
  }

  export type DocumentUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutCreatedByInput, DocumentUncheckedUpdateWithoutCreatedByInput>
    create: XOR<DocumentCreateWithoutCreatedByInput, DocumentUncheckedCreateWithoutCreatedByInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutCreatedByInput, DocumentUncheckedUpdateWithoutCreatedByInput>
  }

  export type DocumentUpdateManyWithWhereWithoutCreatedByInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    description?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    publicToken?: StringFilter<"Document"> | string
    publishedVersionId?: StringNullableFilter<"Document"> | string | null
    accessMode?: StringFilter<"Document"> | string
    createdById?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentVersionCreateWithoutDocumentInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    pages?: DocumentPageCreateNestedManyWithoutDocumentVersionInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionUncheckedCreateWithoutDocumentInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    pages?: DocumentPageUncheckedCreateNestedManyWithoutDocumentVersionInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionCreateOrConnectWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    create: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentVersionCreateManyDocumentInputEnvelope = {
    data: DocumentVersionCreateManyDocumentInput | DocumentVersionCreateManyDocumentInput[]
  }

  export type SubmissionCreateWithoutDocumentInput = {
    id?: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    documentVersion: DocumentVersionCreateNestedOneWithoutSubmissionsInput
    generatedAsset?: AssetCreateNestedOneWithoutGeneratedSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutDocumentInput = {
    id?: string
    documentVersionId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutDocumentInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput>
  }

  export type SubmissionCreateManyDocumentInputEnvelope = {
    data: SubmissionCreateManyDocumentInput | SubmissionCreateManyDocumentInput[]
  }

  export type AssetCreateWithoutDocumentInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
    pages?: DocumentPageCreateNestedManyWithoutBackgroundAssetInput
    generatedSubmissions?: SubmissionCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetUncheckedCreateWithoutDocumentInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
    pages?: DocumentPageUncheckedCreateNestedManyWithoutBackgroundAssetInput
    generatedSubmissions?: SubmissionUncheckedCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetCreateOrConnectWithoutDocumentInput = {
    where: AssetWhereUniqueInput
    create: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput>
  }

  export type AssetCreateManyDocumentInputEnvelope = {
    data: AssetCreateManyDocumentInput | AssetCreateManyDocumentInput[]
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    update: XOR<DocumentVersionUpdateWithoutDocumentInput, DocumentVersionUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    data: XOR<DocumentVersionUpdateWithoutDocumentInput, DocumentVersionUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentVersionUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentVersionScalarWhereInput
    data: XOR<DocumentVersionUpdateManyMutationInput, DocumentVersionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentVersionScalarWhereInput = {
    AND?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
    OR?: DocumentVersionScalarWhereInput[]
    NOT?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
    id?: StringFilter<"DocumentVersion"> | string
    documentId?: StringFilter<"DocumentVersion"> | string
    versionNumber?: IntFilter<"DocumentVersion"> | number
    status?: StringFilter<"DocumentVersion"> | string
    template?: StringFilter<"DocumentVersion"> | string
    createdAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    publishedAt?: DateTimeNullableFilter<"DocumentVersion"> | Date | string | null
  }

  export type SubmissionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutDocumentInput, SubmissionUncheckedUpdateWithoutDocumentInput>
    create: XOR<SubmissionCreateWithoutDocumentInput, SubmissionUncheckedCreateWithoutDocumentInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutDocumentInput, SubmissionUncheckedUpdateWithoutDocumentInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutDocumentInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    documentId?: StringFilter<"Submission"> | string
    documentVersionId?: StringFilter<"Submission"> | string
    data?: StringFilter<"Submission"> | string
    status?: StringFilter<"Submission"> | string
    generatedAssetId?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type AssetUpsertWithWhereUniqueWithoutDocumentInput = {
    where: AssetWhereUniqueInput
    update: XOR<AssetUpdateWithoutDocumentInput, AssetUncheckedUpdateWithoutDocumentInput>
    create: XOR<AssetCreateWithoutDocumentInput, AssetUncheckedCreateWithoutDocumentInput>
  }

  export type AssetUpdateWithWhereUniqueWithoutDocumentInput = {
    where: AssetWhereUniqueInput
    data: XOR<AssetUpdateWithoutDocumentInput, AssetUncheckedUpdateWithoutDocumentInput>
  }

  export type AssetUpdateManyWithWhereWithoutDocumentInput = {
    where: AssetScalarWhereInput
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyWithoutDocumentInput>
  }

  export type AssetScalarWhereInput = {
    AND?: AssetScalarWhereInput | AssetScalarWhereInput[]
    OR?: AssetScalarWhereInput[]
    NOT?: AssetScalarWhereInput | AssetScalarWhereInput[]
    id?: StringFilter<"Asset"> | string
    storageKey?: StringFilter<"Asset"> | string
    originalName?: StringFilter<"Asset"> | string
    mimeType?: StringFilter<"Asset"> | string
    size?: IntFilter<"Asset"> | number
    url?: StringNullableFilter<"Asset"> | string | null
    documentId?: StringNullableFilter<"Asset"> | string | null
    createdAt?: DateTimeFilter<"Asset"> | Date | string
  }

  export type DocumentCreateWithoutVersionsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutDocumentsInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentInput
    assets?: AssetCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutVersionsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentInput
    assets?: AssetUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutVersionsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
  }

  export type DocumentPageCreateWithoutDocumentVersionInput = {
    id?: string
    pageNumber: number
    width: number
    height: number
    createdAt?: Date | string
    backgroundAsset?: AssetCreateNestedOneWithoutPagesInput
  }

  export type DocumentPageUncheckedCreateWithoutDocumentVersionInput = {
    id?: string
    pageNumber: number
    width: number
    height: number
    backgroundAssetId?: string | null
    createdAt?: Date | string
  }

  export type DocumentPageCreateOrConnectWithoutDocumentVersionInput = {
    where: DocumentPageWhereUniqueInput
    create: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput>
  }

  export type DocumentPageCreateManyDocumentVersionInputEnvelope = {
    data: DocumentPageCreateManyDocumentVersionInput | DocumentPageCreateManyDocumentVersionInput[]
  }

  export type SubmissionCreateWithoutDocumentVersionInput = {
    id?: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutSubmissionsInput
    generatedAsset?: AssetCreateNestedOneWithoutGeneratedSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutDocumentVersionInput = {
    id?: string
    documentId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutDocumentVersionInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput>
  }

  export type SubmissionCreateManyDocumentVersionInputEnvelope = {
    data: SubmissionCreateManyDocumentVersionInput | SubmissionCreateManyDocumentVersionInput[]
  }

  export type DocumentUpsertWithoutVersionsInput = {
    update: XOR<DocumentUpdateWithoutVersionsInput, DocumentUncheckedUpdateWithoutVersionsInput>
    create: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutVersionsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutVersionsInput, DocumentUncheckedUpdateWithoutVersionsInput>
  }

  export type DocumentUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutDocumentsNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentNestedInput
    assets?: AssetUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentNestedInput
    assets?: AssetUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentPageUpsertWithWhereUniqueWithoutDocumentVersionInput = {
    where: DocumentPageWhereUniqueInput
    update: XOR<DocumentPageUpdateWithoutDocumentVersionInput, DocumentPageUncheckedUpdateWithoutDocumentVersionInput>
    create: XOR<DocumentPageCreateWithoutDocumentVersionInput, DocumentPageUncheckedCreateWithoutDocumentVersionInput>
  }

  export type DocumentPageUpdateWithWhereUniqueWithoutDocumentVersionInput = {
    where: DocumentPageWhereUniqueInput
    data: XOR<DocumentPageUpdateWithoutDocumentVersionInput, DocumentPageUncheckedUpdateWithoutDocumentVersionInput>
  }

  export type DocumentPageUpdateManyWithWhereWithoutDocumentVersionInput = {
    where: DocumentPageScalarWhereInput
    data: XOR<DocumentPageUpdateManyMutationInput, DocumentPageUncheckedUpdateManyWithoutDocumentVersionInput>
  }

  export type DocumentPageScalarWhereInput = {
    AND?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
    OR?: DocumentPageScalarWhereInput[]
    NOT?: DocumentPageScalarWhereInput | DocumentPageScalarWhereInput[]
    id?: StringFilter<"DocumentPage"> | string
    documentVersionId?: StringFilter<"DocumentPage"> | string
    pageNumber?: IntFilter<"DocumentPage"> | number
    width?: FloatFilter<"DocumentPage"> | number
    height?: FloatFilter<"DocumentPage"> | number
    backgroundAssetId?: StringNullableFilter<"DocumentPage"> | string | null
    createdAt?: DateTimeFilter<"DocumentPage"> | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutDocumentVersionInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutDocumentVersionInput, SubmissionUncheckedUpdateWithoutDocumentVersionInput>
    create: XOR<SubmissionCreateWithoutDocumentVersionInput, SubmissionUncheckedCreateWithoutDocumentVersionInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutDocumentVersionInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutDocumentVersionInput, SubmissionUncheckedUpdateWithoutDocumentVersionInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutDocumentVersionInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutDocumentVersionInput>
  }

  export type DocumentVersionCreateWithoutPagesInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    document: DocumentCreateNestedOneWithoutVersionsInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionUncheckedCreateWithoutPagesInput = {
    id?: string
    documentId: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionCreateOrConnectWithoutPagesInput = {
    where: DocumentVersionWhereUniqueInput
    create: XOR<DocumentVersionCreateWithoutPagesInput, DocumentVersionUncheckedCreateWithoutPagesInput>
  }

  export type AssetCreateWithoutPagesInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
    document?: DocumentCreateNestedOneWithoutAssetsInput
    generatedSubmissions?: SubmissionCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetUncheckedCreateWithoutPagesInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    documentId?: string | null
    createdAt?: Date | string
    generatedSubmissions?: SubmissionUncheckedCreateNestedManyWithoutGeneratedAssetInput
  }

  export type AssetCreateOrConnectWithoutPagesInput = {
    where: AssetWhereUniqueInput
    create: XOR<AssetCreateWithoutPagesInput, AssetUncheckedCreateWithoutPagesInput>
  }

  export type DocumentVersionUpsertWithoutPagesInput = {
    update: XOR<DocumentVersionUpdateWithoutPagesInput, DocumentVersionUncheckedUpdateWithoutPagesInput>
    create: XOR<DocumentVersionCreateWithoutPagesInput, DocumentVersionUncheckedCreateWithoutPagesInput>
    where?: DocumentVersionWhereInput
  }

  export type DocumentVersionUpdateToOneWithWhereWithoutPagesInput = {
    where?: DocumentVersionWhereInput
    data: XOR<DocumentVersionUpdateWithoutPagesInput, DocumentVersionUncheckedUpdateWithoutPagesInput>
  }

  export type DocumentVersionUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    document?: DocumentUpdateOneRequiredWithoutVersionsNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentVersionNestedInput
  }

  export type AssetUpsertWithoutPagesInput = {
    update: XOR<AssetUpdateWithoutPagesInput, AssetUncheckedUpdateWithoutPagesInput>
    create: XOR<AssetCreateWithoutPagesInput, AssetUncheckedCreateWithoutPagesInput>
    where?: AssetWhereInput
  }

  export type AssetUpdateToOneWithWhereWithoutPagesInput = {
    where?: AssetWhereInput
    data: XOR<AssetUpdateWithoutPagesInput, AssetUncheckedUpdateWithoutPagesInput>
  }

  export type AssetUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneWithoutAssetsNestedInput
    generatedSubmissions?: SubmissionUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type AssetUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedSubmissions?: SubmissionUncheckedUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type DocumentCreateWithoutAssetsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutDocumentsInput
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutAssetsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutAssetsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAssetsInput, DocumentUncheckedCreateWithoutAssetsInput>
  }

  export type DocumentPageCreateWithoutBackgroundAssetInput = {
    id?: string
    pageNumber: number
    width: number
    height: number
    createdAt?: Date | string
    documentVersion: DocumentVersionCreateNestedOneWithoutPagesInput
  }

  export type DocumentPageUncheckedCreateWithoutBackgroundAssetInput = {
    id?: string
    documentVersionId: string
    pageNumber: number
    width: number
    height: number
    createdAt?: Date | string
  }

  export type DocumentPageCreateOrConnectWithoutBackgroundAssetInput = {
    where: DocumentPageWhereUniqueInput
    create: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput>
  }

  export type DocumentPageCreateManyBackgroundAssetInputEnvelope = {
    data: DocumentPageCreateManyBackgroundAssetInput | DocumentPageCreateManyBackgroundAssetInput[]
  }

  export type SubmissionCreateWithoutGeneratedAssetInput = {
    id?: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutSubmissionsInput
    documentVersion: DocumentVersionCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutGeneratedAssetInput = {
    id?: string
    documentId: string
    documentVersionId: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutGeneratedAssetInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput>
  }

  export type SubmissionCreateManyGeneratedAssetInputEnvelope = {
    data: SubmissionCreateManyGeneratedAssetInput | SubmissionCreateManyGeneratedAssetInput[]
  }

  export type DocumentUpsertWithoutAssetsInput = {
    update: XOR<DocumentUpdateWithoutAssetsInput, DocumentUncheckedUpdateWithoutAssetsInput>
    create: XOR<DocumentCreateWithoutAssetsInput, DocumentUncheckedCreateWithoutAssetsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutAssetsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutAssetsInput, DocumentUncheckedUpdateWithoutAssetsInput>
  }

  export type DocumentUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutDocumentsNestedInput
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentPageUpsertWithWhereUniqueWithoutBackgroundAssetInput = {
    where: DocumentPageWhereUniqueInput
    update: XOR<DocumentPageUpdateWithoutBackgroundAssetInput, DocumentPageUncheckedUpdateWithoutBackgroundAssetInput>
    create: XOR<DocumentPageCreateWithoutBackgroundAssetInput, DocumentPageUncheckedCreateWithoutBackgroundAssetInput>
  }

  export type DocumentPageUpdateWithWhereUniqueWithoutBackgroundAssetInput = {
    where: DocumentPageWhereUniqueInput
    data: XOR<DocumentPageUpdateWithoutBackgroundAssetInput, DocumentPageUncheckedUpdateWithoutBackgroundAssetInput>
  }

  export type DocumentPageUpdateManyWithWhereWithoutBackgroundAssetInput = {
    where: DocumentPageScalarWhereInput
    data: XOR<DocumentPageUpdateManyMutationInput, DocumentPageUncheckedUpdateManyWithoutBackgroundAssetInput>
  }

  export type SubmissionUpsertWithWhereUniqueWithoutGeneratedAssetInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutGeneratedAssetInput, SubmissionUncheckedUpdateWithoutGeneratedAssetInput>
    create: XOR<SubmissionCreateWithoutGeneratedAssetInput, SubmissionUncheckedCreateWithoutGeneratedAssetInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutGeneratedAssetInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutGeneratedAssetInput, SubmissionUncheckedUpdateWithoutGeneratedAssetInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutGeneratedAssetInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutGeneratedAssetInput>
  }

  export type DocumentCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    createdBy?: UserCreateNestedOneWithoutDocumentsInput
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
    assets?: AssetCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
    assets?: AssetUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutSubmissionsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutSubmissionsInput, DocumentUncheckedCreateWithoutSubmissionsInput>
  }

  export type DocumentVersionCreateWithoutSubmissionsInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    document: DocumentCreateNestedOneWithoutVersionsInput
    pages?: DocumentPageCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    documentId: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
    pages?: DocumentPageUncheckedCreateNestedManyWithoutDocumentVersionInput
  }

  export type DocumentVersionCreateOrConnectWithoutSubmissionsInput = {
    where: DocumentVersionWhereUniqueInput
    create: XOR<DocumentVersionCreateWithoutSubmissionsInput, DocumentVersionUncheckedCreateWithoutSubmissionsInput>
  }

  export type AssetCreateWithoutGeneratedSubmissionsInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
    document?: DocumentCreateNestedOneWithoutAssetsInput
    pages?: DocumentPageCreateNestedManyWithoutBackgroundAssetInput
  }

  export type AssetUncheckedCreateWithoutGeneratedSubmissionsInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    documentId?: string | null
    createdAt?: Date | string
    pages?: DocumentPageUncheckedCreateNestedManyWithoutBackgroundAssetInput
  }

  export type AssetCreateOrConnectWithoutGeneratedSubmissionsInput = {
    where: AssetWhereUniqueInput
    create: XOR<AssetCreateWithoutGeneratedSubmissionsInput, AssetUncheckedCreateWithoutGeneratedSubmissionsInput>
  }

  export type DocumentUpsertWithoutSubmissionsInput = {
    update: XOR<DocumentUpdateWithoutSubmissionsInput, DocumentUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<DocumentCreateWithoutSubmissionsInput, DocumentUncheckedCreateWithoutSubmissionsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutSubmissionsInput, DocumentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DocumentUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: UserUpdateOneWithoutDocumentsNestedInput
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
    assets?: AssetUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
    assets?: AssetUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentVersionUpsertWithoutSubmissionsInput = {
    update: XOR<DocumentVersionUpdateWithoutSubmissionsInput, DocumentVersionUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<DocumentVersionCreateWithoutSubmissionsInput, DocumentVersionUncheckedCreateWithoutSubmissionsInput>
    where?: DocumentVersionWhereInput
  }

  export type DocumentVersionUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: DocumentVersionWhereInput
    data: XOR<DocumentVersionUpdateWithoutSubmissionsInput, DocumentVersionUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DocumentVersionUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    document?: DocumentUpdateOneRequiredWithoutVersionsNestedInput
    pages?: DocumentPageUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pages?: DocumentPageUncheckedUpdateManyWithoutDocumentVersionNestedInput
  }

  export type AssetUpsertWithoutGeneratedSubmissionsInput = {
    update: XOR<AssetUpdateWithoutGeneratedSubmissionsInput, AssetUncheckedUpdateWithoutGeneratedSubmissionsInput>
    create: XOR<AssetCreateWithoutGeneratedSubmissionsInput, AssetUncheckedCreateWithoutGeneratedSubmissionsInput>
    where?: AssetWhereInput
  }

  export type AssetUpdateToOneWithWhereWithoutGeneratedSubmissionsInput = {
    where?: AssetWhereInput
    data: XOR<AssetUpdateWithoutGeneratedSubmissionsInput, AssetUncheckedUpdateWithoutGeneratedSubmissionsInput>
  }

  export type AssetUpdateWithoutGeneratedSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneWithoutAssetsNestedInput
    pages?: DocumentPageUpdateManyWithoutBackgroundAssetNestedInput
  }

  export type AssetUncheckedUpdateWithoutGeneratedSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: DocumentPageUncheckedUpdateManyWithoutBackgroundAssetNestedInput
  }

  export type DocumentCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    publicToken: string
    publishedVersionId?: string | null
    accessMode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DocumentUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentNestedInput
    assets?: AssetUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentNestedInput
    assets?: AssetUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    publicToken?: StringFieldUpdateOperationsInput | string
    publishedVersionId?: NullableStringFieldUpdateOperationsInput | string | null
    accessMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentVersionCreateManyDocumentInput = {
    id?: string
    versionNumber: number
    status?: string
    template: string
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type SubmissionCreateManyDocumentInput = {
    id?: string
    documentVersionId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetCreateManyDocumentInput = {
    id?: string
    storageKey: string
    originalName: string
    mimeType: string
    size: number
    url?: string | null
    createdAt?: Date | string
  }

  export type DocumentVersionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pages?: DocumentPageUpdateManyWithoutDocumentVersionNestedInput
    submissions?: SubmissionUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pages?: DocumentPageUncheckedUpdateManyWithoutDocumentVersionNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutDocumentVersionNestedInput
  }

  export type DocumentVersionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubmissionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentVersion?: DocumentVersionUpdateOneRequiredWithoutSubmissionsNestedInput
    generatedAsset?: AssetUpdateOneWithoutGeneratedSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: DocumentPageUpdateManyWithoutBackgroundAssetNestedInput
    generatedSubmissions?: SubmissionUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type AssetUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: DocumentPageUncheckedUpdateManyWithoutBackgroundAssetNestedInput
    generatedSubmissions?: SubmissionUncheckedUpdateManyWithoutGeneratedAssetNestedInput
  }

  export type AssetUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageCreateManyDocumentVersionInput = {
    id?: string
    pageNumber: number
    width: number
    height: number
    backgroundAssetId?: string | null
    createdAt?: Date | string
  }

  export type SubmissionCreateManyDocumentVersionInput = {
    id?: string
    documentId: string
    data: string
    status?: string
    generatedAssetId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentPageUpdateWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundAsset?: AssetUpdateOneWithoutPagesNestedInput
  }

  export type DocumentPageUncheckedUpdateWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    backgroundAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageUncheckedUpdateManyWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    backgroundAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutSubmissionsNestedInput
    generatedAsset?: AssetUpdateOneWithoutGeneratedSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutDocumentVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    generatedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageCreateManyBackgroundAssetInput = {
    id?: string
    documentVersionId: string
    pageNumber: number
    width: number
    height: number
    createdAt?: Date | string
  }

  export type SubmissionCreateManyGeneratedAssetInput = {
    id?: string
    documentId: string
    documentVersionId: string
    data: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentPageUpdateWithoutBackgroundAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentVersion?: DocumentVersionUpdateOneRequiredWithoutPagesNestedInput
  }

  export type DocumentPageUncheckedUpdateWithoutBackgroundAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentPageUncheckedUpdateManyWithoutBackgroundAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    pageNumber?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutGeneratedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutSubmissionsNestedInput
    documentVersion?: DocumentVersionUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutGeneratedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutGeneratedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    documentVersionId?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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