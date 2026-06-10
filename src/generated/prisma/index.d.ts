
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
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostTranslation
 * 
 */
export type PostTranslation = $Result.DefaultSelection<Prisma.$PostTranslationPayload>
/**
 * Model ServiceType
 * 
 */
export type ServiceType = $Result.DefaultSelection<Prisma.$ServiceTypePayload>
/**
 * Model ServiceTypeTranslation
 * 
 */
export type ServiceTypeTranslation = $Result.DefaultSelection<Prisma.$ServiceTypeTranslationPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ServiceTranslation
 * 
 */
export type ServiceTranslation = $Result.DefaultSelection<Prisma.$ServiceTranslationPayload>
/**
 * Model ServiceThumbnail
 * 
 */
export type ServiceThumbnail = $Result.DefaultSelection<Prisma.$ServiceThumbnailPayload>
/**
 * Model ServiceBackgroundCover
 * 
 */
export type ServiceBackgroundCover = $Result.DefaultSelection<Prisma.$ServiceBackgroundCoverPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Language: {
  EN: 'EN',
  VI: 'VI'
};

export type Language = (typeof Language)[keyof typeof Language]


export const ServiceThumbnailType: {
  ImagePng: 'ImagePng',
  VideoGif: 'VideoGif'
};

export type ServiceThumbnailType = (typeof ServiceThumbnailType)[keyof typeof ServiceThumbnailType]

}

export type Language = $Enums.Language

export const Language: typeof $Enums.Language

export type ServiceThumbnailType = $Enums.ServiceThumbnailType

export const ServiceThumbnailType: typeof $Enums.ServiceThumbnailType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
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
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
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
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postTranslation`: Exposes CRUD operations for the **PostTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostTranslations
    * const postTranslations = await prisma.postTranslation.findMany()
    * ```
    */
  get postTranslation(): Prisma.PostTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceType`: Exposes CRUD operations for the **ServiceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceTypes
    * const serviceTypes = await prisma.serviceType.findMany()
    * ```
    */
  get serviceType(): Prisma.ServiceTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceTypeTranslation`: Exposes CRUD operations for the **ServiceTypeTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceTypeTranslations
    * const serviceTypeTranslations = await prisma.serviceTypeTranslation.findMany()
    * ```
    */
  get serviceTypeTranslation(): Prisma.ServiceTypeTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceTranslation`: Exposes CRUD operations for the **ServiceTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceTranslations
    * const serviceTranslations = await prisma.serviceTranslation.findMany()
    * ```
    */
  get serviceTranslation(): Prisma.ServiceTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceThumbnail`: Exposes CRUD operations for the **ServiceThumbnail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceThumbnails
    * const serviceThumbnails = await prisma.serviceThumbnail.findMany()
    * ```
    */
  get serviceThumbnail(): Prisma.ServiceThumbnailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceBackgroundCover`: Exposes CRUD operations for the **ServiceBackgroundCover** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceBackgroundCovers
    * const serviceBackgroundCovers = await prisma.serviceBackgroundCover.findMany()
    * ```
    */
  get serviceBackgroundCover(): Prisma.ServiceBackgroundCoverDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.2
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
    Post: 'Post',
    PostTranslation: 'PostTranslation',
    ServiceType: 'ServiceType',
    ServiceTypeTranslation: 'ServiceTypeTranslation',
    Service: 'Service',
    ServiceTranslation: 'ServiceTranslation',
    ServiceThumbnail: 'ServiceThumbnail',
    ServiceBackgroundCover: 'ServiceBackgroundCover'
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
      modelProps: "post" | "postTranslation" | "serviceType" | "serviceTypeTranslation" | "service" | "serviceTranslation" | "serviceThumbnail" | "serviceBackgroundCover"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostTranslation: {
        payload: Prisma.$PostTranslationPayload<ExtArgs>
        fields: Prisma.PostTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          findFirst: {
            args: Prisma.PostTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          findMany: {
            args: Prisma.PostTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>[]
          }
          create: {
            args: Prisma.PostTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          createMany: {
            args: Prisma.PostTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>[]
          }
          delete: {
            args: Prisma.PostTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          update: {
            args: Prisma.PostTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          deleteMany: {
            args: Prisma.PostTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>[]
          }
          upsert: {
            args: Prisma.PostTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTranslationPayload>
          }
          aggregate: {
            args: Prisma.PostTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostTranslation>
          }
          groupBy: {
            args: Prisma.PostTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<PostTranslationCountAggregateOutputType> | number
          }
        }
      }
      ServiceType: {
        payload: Prisma.$ServiceTypePayload<ExtArgs>
        fields: Prisma.ServiceTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          findFirst: {
            args: Prisma.ServiceTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          findMany: {
            args: Prisma.ServiceTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>[]
          }
          create: {
            args: Prisma.ServiceTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          createMany: {
            args: Prisma.ServiceTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>[]
          }
          delete: {
            args: Prisma.ServiceTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          update: {
            args: Prisma.ServiceTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          deleteMany: {
            args: Prisma.ServiceTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>[]
          }
          upsert: {
            args: Prisma.ServiceTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypePayload>
          }
          aggregate: {
            args: Prisma.ServiceTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceType>
          }
          groupBy: {
            args: Prisma.ServiceTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceTypeCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceTypeCountAggregateOutputType> | number
          }
        }
      }
      ServiceTypeTranslation: {
        payload: Prisma.$ServiceTypeTranslationPayload<ExtArgs>
        fields: Prisma.ServiceTypeTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceTypeTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceTypeTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          findFirst: {
            args: Prisma.ServiceTypeTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceTypeTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          findMany: {
            args: Prisma.ServiceTypeTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>[]
          }
          create: {
            args: Prisma.ServiceTypeTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          createMany: {
            args: Prisma.ServiceTypeTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceTypeTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>[]
          }
          delete: {
            args: Prisma.ServiceTypeTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          update: {
            args: Prisma.ServiceTypeTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          deleteMany: {
            args: Prisma.ServiceTypeTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceTypeTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceTypeTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>[]
          }
          upsert: {
            args: Prisma.ServiceTypeTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTypeTranslationPayload>
          }
          aggregate: {
            args: Prisma.ServiceTypeTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceTypeTranslation>
          }
          groupBy: {
            args: Prisma.ServiceTypeTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceTypeTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceTypeTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceTypeTranslationCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      ServiceTranslation: {
        payload: Prisma.$ServiceTranslationPayload<ExtArgs>
        fields: Prisma.ServiceTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          findFirst: {
            args: Prisma.ServiceTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          findMany: {
            args: Prisma.ServiceTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>[]
          }
          create: {
            args: Prisma.ServiceTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          createMany: {
            args: Prisma.ServiceTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>[]
          }
          delete: {
            args: Prisma.ServiceTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          update: {
            args: Prisma.ServiceTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          deleteMany: {
            args: Prisma.ServiceTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>[]
          }
          upsert: {
            args: Prisma.ServiceTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceTranslationPayload>
          }
          aggregate: {
            args: Prisma.ServiceTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceTranslation>
          }
          groupBy: {
            args: Prisma.ServiceTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceTranslationCountAggregateOutputType> | number
          }
        }
      }
      ServiceThumbnail: {
        payload: Prisma.$ServiceThumbnailPayload<ExtArgs>
        fields: Prisma.ServiceThumbnailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceThumbnailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceThumbnailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          findFirst: {
            args: Prisma.ServiceThumbnailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceThumbnailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          findMany: {
            args: Prisma.ServiceThumbnailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>[]
          }
          create: {
            args: Prisma.ServiceThumbnailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          createMany: {
            args: Prisma.ServiceThumbnailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceThumbnailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>[]
          }
          delete: {
            args: Prisma.ServiceThumbnailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          update: {
            args: Prisma.ServiceThumbnailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          deleteMany: {
            args: Prisma.ServiceThumbnailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceThumbnailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceThumbnailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>[]
          }
          upsert: {
            args: Prisma.ServiceThumbnailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceThumbnailPayload>
          }
          aggregate: {
            args: Prisma.ServiceThumbnailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceThumbnail>
          }
          groupBy: {
            args: Prisma.ServiceThumbnailGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceThumbnailGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceThumbnailCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceThumbnailCountAggregateOutputType> | number
          }
        }
      }
      ServiceBackgroundCover: {
        payload: Prisma.$ServiceBackgroundCoverPayload<ExtArgs>
        fields: Prisma.ServiceBackgroundCoverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceBackgroundCoverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceBackgroundCoverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          findFirst: {
            args: Prisma.ServiceBackgroundCoverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceBackgroundCoverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          findMany: {
            args: Prisma.ServiceBackgroundCoverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>[]
          }
          create: {
            args: Prisma.ServiceBackgroundCoverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          createMany: {
            args: Prisma.ServiceBackgroundCoverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceBackgroundCoverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>[]
          }
          delete: {
            args: Prisma.ServiceBackgroundCoverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          update: {
            args: Prisma.ServiceBackgroundCoverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          deleteMany: {
            args: Prisma.ServiceBackgroundCoverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceBackgroundCoverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceBackgroundCoverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>[]
          }
          upsert: {
            args: Prisma.ServiceBackgroundCoverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceBackgroundCoverPayload>
          }
          aggregate: {
            args: Prisma.ServiceBackgroundCoverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceBackgroundCover>
          }
          groupBy: {
            args: Prisma.ServiceBackgroundCoverGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceBackgroundCoverGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceBackgroundCoverCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceBackgroundCoverCountAggregateOutputType> | number
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
    post?: PostOmit
    postTranslation?: PostTranslationOmit
    serviceType?: ServiceTypeOmit
    serviceTypeTranslation?: ServiceTypeTranslationOmit
    service?: ServiceOmit
    serviceTranslation?: ServiceTranslationOmit
    serviceThumbnail?: ServiceThumbnailOmit
    serviceBackgroundCover?: ServiceBackgroundCoverOmit
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
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    translations: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | PostCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTranslationWhereInput
  }


  /**
   * Count Type ServiceTypeCountOutputType
   */

  export type ServiceTypeCountOutputType = {
    services: number
    translations: number
  }

  export type ServiceTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceTypeCountOutputTypeCountServicesArgs
    translations?: boolean | ServiceTypeCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * ServiceTypeCountOutputType without action
   */
  export type ServiceTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeCountOutputType
     */
    select?: ServiceTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceTypeCountOutputType without action
   */
  export type ServiceTypeCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * ServiceTypeCountOutputType without action
   */
  export type ServiceTypeCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceTypeTranslationWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    translations: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | ServiceCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceTranslationWhereInput
  }


  /**
   * Count Type ServiceThumbnailCountOutputType
   */

  export type ServiceThumbnailCountOutputType = {
    services: number
  }

  export type ServiceThumbnailCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceThumbnailCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceThumbnailCountOutputType without action
   */
  export type ServiceThumbnailCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnailCountOutputType
     */
    select?: ServiceThumbnailCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceThumbnailCountOutputType without action
   */
  export type ServiceThumbnailCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type ServiceBackgroundCoverCountOutputType
   */

  export type ServiceBackgroundCoverCountOutputType = {
    services: number
  }

  export type ServiceBackgroundCoverCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceBackgroundCoverCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceBackgroundCoverCountOutputType without action
   */
  export type ServiceBackgroundCoverCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCoverCountOutputType
     */
    select?: ServiceBackgroundCoverCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceBackgroundCoverCountOutputType without action
   */
  export type ServiceBackgroundCoverCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    countView: number | null
  }

  export type PostSumAggregateOutputType = {
    countView: number | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    thumbnailUrl: string | null
    bgCoverUrl: string | null
    countView: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    thumbnailUrl: string | null
    bgCoverUrl: string | null
    countView: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    thumbnailUrl: number
    bgCoverUrl: number
    countView: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    countView?: true
  }

  export type PostSumAggregateInputType = {
    countView?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    thumbnailUrl?: true
    bgCoverUrl?: true
    countView?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    thumbnailUrl?: true
    bgCoverUrl?: true
    countView?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    thumbnailUrl?: true
    bgCoverUrl?: true
    countView?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    thumbnailUrl: string
    bgCoverUrl: string | null
    countView: number
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    thumbnailUrl?: boolean
    bgCoverUrl?: boolean
    countView?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    translations?: boolean | Post$translationsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    thumbnailUrl?: boolean
    bgCoverUrl?: boolean
    countView?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    thumbnailUrl?: boolean
    bgCoverUrl?: boolean
    countView?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    thumbnailUrl?: boolean
    bgCoverUrl?: boolean
    countView?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "thumbnailUrl" | "bgCoverUrl" | "countView" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Post$translationsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      translations: Prisma.$PostTranslationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      thumbnailUrl: string
      bgCoverUrl: string | null
      countView: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
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
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Post$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Post$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly thumbnailUrl: FieldRef<"Post", 'String'>
    readonly bgCoverUrl: FieldRef<"Post", 'String'>
    readonly countView: FieldRef<"Post", 'Int'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.translations
   */
  export type Post$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    where?: PostTranslationWhereInput
    orderBy?: PostTranslationOrderByWithRelationInput | PostTranslationOrderByWithRelationInput[]
    cursor?: PostTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostTranslationScalarFieldEnum | PostTranslationScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostTranslation
   */

  export type AggregatePostTranslation = {
    _count: PostTranslationCountAggregateOutputType | null
    _min: PostTranslationMinAggregateOutputType | null
    _max: PostTranslationMaxAggregateOutputType | null
  }

  export type PostTranslationMinAggregateOutputType = {
    id: string | null
    postId: string | null
    language: $Enums.Language | null
    slug: string | null
    title: string | null
    shortDescription: string | null
    content: string | null
    seoTitle: string | null
    seoDescription: string | null
  }

  export type PostTranslationMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    language: $Enums.Language | null
    slug: string | null
    title: string | null
    shortDescription: string | null
    content: string | null
    seoTitle: string | null
    seoDescription: string | null
  }

  export type PostTranslationCountAggregateOutputType = {
    id: number
    postId: number
    language: number
    slug: number
    title: number
    shortDescription: number
    content: number
    tags: number
    seoTitle: number
    seoDescription: number
    seoKeywords: number
    _all: number
  }


  export type PostTranslationMinAggregateInputType = {
    id?: true
    postId?: true
    language?: true
    slug?: true
    title?: true
    shortDescription?: true
    content?: true
    seoTitle?: true
    seoDescription?: true
  }

  export type PostTranslationMaxAggregateInputType = {
    id?: true
    postId?: true
    language?: true
    slug?: true
    title?: true
    shortDescription?: true
    content?: true
    seoTitle?: true
    seoDescription?: true
  }

  export type PostTranslationCountAggregateInputType = {
    id?: true
    postId?: true
    language?: true
    slug?: true
    title?: true
    shortDescription?: true
    content?: true
    tags?: true
    seoTitle?: true
    seoDescription?: true
    seoKeywords?: true
    _all?: true
  }

  export type PostTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTranslation to aggregate.
     */
    where?: PostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTranslations to fetch.
     */
    orderBy?: PostTranslationOrderByWithRelationInput | PostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostTranslations
    **/
    _count?: true | PostTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostTranslationMaxAggregateInputType
  }

  export type GetPostTranslationAggregateType<T extends PostTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregatePostTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostTranslation[P]>
      : GetScalarType<T[P], AggregatePostTranslation[P]>
  }




  export type PostTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTranslationWhereInput
    orderBy?: PostTranslationOrderByWithAggregationInput | PostTranslationOrderByWithAggregationInput[]
    by: PostTranslationScalarFieldEnum[] | PostTranslationScalarFieldEnum
    having?: PostTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostTranslationCountAggregateInputType | true
    _min?: PostTranslationMinAggregateInputType
    _max?: PostTranslationMaxAggregateInputType
  }

  export type PostTranslationGroupByOutputType = {
    id: string
    postId: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription: string | null
    content: string
    tags: string[]
    seoTitle: string | null
    seoDescription: string | null
    seoKeywords: string[]
    _count: PostTranslationCountAggregateOutputType | null
    _min: PostTranslationMinAggregateOutputType | null
    _max: PostTranslationMaxAggregateOutputType | null
  }

  type GetPostTranslationGroupByPayload<T extends PostTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], PostTranslationGroupByOutputType[P]>
        }
      >
    >


  export type PostTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    shortDescription?: boolean
    content?: boolean
    tags?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTranslation"]>

  export type PostTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    shortDescription?: boolean
    content?: boolean
    tags?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTranslation"]>

  export type PostTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    shortDescription?: boolean
    content?: boolean
    tags?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTranslation"]>

  export type PostTranslationSelectScalar = {
    id?: boolean
    postId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    shortDescription?: boolean
    content?: boolean
    tags?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
  }

  export type PostTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "language" | "slug" | "title" | "shortDescription" | "content" | "tags" | "seoTitle" | "seoDescription" | "seoKeywords", ExtArgs["result"]["postTranslation"]>
  export type PostTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostTranslation"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      language: $Enums.Language
      slug: string
      title: string
      shortDescription: string | null
      content: string
      tags: string[]
      seoTitle: string | null
      seoDescription: string | null
      seoKeywords: string[]
    }, ExtArgs["result"]["postTranslation"]>
    composites: {}
  }

  type PostTranslationGetPayload<S extends boolean | null | undefined | PostTranslationDefaultArgs> = $Result.GetResult<Prisma.$PostTranslationPayload, S>

  type PostTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostTranslationCountAggregateInputType | true
    }

  export interface PostTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostTranslation'], meta: { name: 'PostTranslation' } }
    /**
     * Find zero or one PostTranslation that matches the filter.
     * @param {PostTranslationFindUniqueArgs} args - Arguments to find a PostTranslation
     * @example
     * // Get one PostTranslation
     * const postTranslation = await prisma.postTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostTranslationFindUniqueArgs>(args: SelectSubset<T, PostTranslationFindUniqueArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostTranslationFindUniqueOrThrowArgs} args - Arguments to find a PostTranslation
     * @example
     * // Get one PostTranslation
     * const postTranslation = await prisma.postTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, PostTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationFindFirstArgs} args - Arguments to find a PostTranslation
     * @example
     * // Get one PostTranslation
     * const postTranslation = await prisma.postTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostTranslationFindFirstArgs>(args?: SelectSubset<T, PostTranslationFindFirstArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationFindFirstOrThrowArgs} args - Arguments to find a PostTranslation
     * @example
     * // Get one PostTranslation
     * const postTranslation = await prisma.postTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, PostTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostTranslations
     * const postTranslations = await prisma.postTranslation.findMany()
     * 
     * // Get first 10 PostTranslations
     * const postTranslations = await prisma.postTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postTranslationWithIdOnly = await prisma.postTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostTranslationFindManyArgs>(args?: SelectSubset<T, PostTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostTranslation.
     * @param {PostTranslationCreateArgs} args - Arguments to create a PostTranslation.
     * @example
     * // Create one PostTranslation
     * const PostTranslation = await prisma.postTranslation.create({
     *   data: {
     *     // ... data to create a PostTranslation
     *   }
     * })
     * 
     */
    create<T extends PostTranslationCreateArgs>(args: SelectSubset<T, PostTranslationCreateArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostTranslations.
     * @param {PostTranslationCreateManyArgs} args - Arguments to create many PostTranslations.
     * @example
     * // Create many PostTranslations
     * const postTranslation = await prisma.postTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostTranslationCreateManyArgs>(args?: SelectSubset<T, PostTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostTranslations and returns the data saved in the database.
     * @param {PostTranslationCreateManyAndReturnArgs} args - Arguments to create many PostTranslations.
     * @example
     * // Create many PostTranslations
     * const postTranslation = await prisma.postTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostTranslations and only return the `id`
     * const postTranslationWithIdOnly = await prisma.postTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, PostTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostTranslation.
     * @param {PostTranslationDeleteArgs} args - Arguments to delete one PostTranslation.
     * @example
     * // Delete one PostTranslation
     * const PostTranslation = await prisma.postTranslation.delete({
     *   where: {
     *     // ... filter to delete one PostTranslation
     *   }
     * })
     * 
     */
    delete<T extends PostTranslationDeleteArgs>(args: SelectSubset<T, PostTranslationDeleteArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostTranslation.
     * @param {PostTranslationUpdateArgs} args - Arguments to update one PostTranslation.
     * @example
     * // Update one PostTranslation
     * const postTranslation = await prisma.postTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostTranslationUpdateArgs>(args: SelectSubset<T, PostTranslationUpdateArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostTranslations.
     * @param {PostTranslationDeleteManyArgs} args - Arguments to filter PostTranslations to delete.
     * @example
     * // Delete a few PostTranslations
     * const { count } = await prisma.postTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostTranslationDeleteManyArgs>(args?: SelectSubset<T, PostTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostTranslations
     * const postTranslation = await prisma.postTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostTranslationUpdateManyArgs>(args: SelectSubset<T, PostTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTranslations and returns the data updated in the database.
     * @param {PostTranslationUpdateManyAndReturnArgs} args - Arguments to update many PostTranslations.
     * @example
     * // Update many PostTranslations
     * const postTranslation = await prisma.postTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostTranslations and only return the `id`
     * const postTranslationWithIdOnly = await prisma.postTranslation.updateManyAndReturn({
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
    updateManyAndReturn<T extends PostTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, PostTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostTranslation.
     * @param {PostTranslationUpsertArgs} args - Arguments to update or create a PostTranslation.
     * @example
     * // Update or create a PostTranslation
     * const postTranslation = await prisma.postTranslation.upsert({
     *   create: {
     *     // ... data to create a PostTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostTranslation we want to update
     *   }
     * })
     */
    upsert<T extends PostTranslationUpsertArgs>(args: SelectSubset<T, PostTranslationUpsertArgs<ExtArgs>>): Prisma__PostTranslationClient<$Result.GetResult<Prisma.$PostTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationCountArgs} args - Arguments to filter PostTranslations to count.
     * @example
     * // Count the number of PostTranslations
     * const count = await prisma.postTranslation.count({
     *   where: {
     *     // ... the filter for the PostTranslations we want to count
     *   }
     * })
    **/
    count<T extends PostTranslationCountArgs>(
      args?: Subset<T, PostTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostTranslationAggregateArgs>(args: Subset<T, PostTranslationAggregateArgs>): Prisma.PrismaPromise<GetPostTranslationAggregateType<T>>

    /**
     * Group by PostTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTranslationGroupByArgs} args - Group by arguments.
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
      T extends PostTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostTranslationGroupByArgs['orderBy'] }
        : { orderBy?: PostTranslationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostTranslation model
   */
  readonly fields: PostTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PostTranslation model
   */
  interface PostTranslationFieldRefs {
    readonly id: FieldRef<"PostTranslation", 'String'>
    readonly postId: FieldRef<"PostTranslation", 'String'>
    readonly language: FieldRef<"PostTranslation", 'Language'>
    readonly slug: FieldRef<"PostTranslation", 'String'>
    readonly title: FieldRef<"PostTranslation", 'String'>
    readonly shortDescription: FieldRef<"PostTranslation", 'String'>
    readonly content: FieldRef<"PostTranslation", 'String'>
    readonly tags: FieldRef<"PostTranslation", 'String[]'>
    readonly seoTitle: FieldRef<"PostTranslation", 'String'>
    readonly seoDescription: FieldRef<"PostTranslation", 'String'>
    readonly seoKeywords: FieldRef<"PostTranslation", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * PostTranslation findUnique
   */
  export type PostTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which PostTranslation to fetch.
     */
    where: PostTranslationWhereUniqueInput
  }

  /**
   * PostTranslation findUniqueOrThrow
   */
  export type PostTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which PostTranslation to fetch.
     */
    where: PostTranslationWhereUniqueInput
  }

  /**
   * PostTranslation findFirst
   */
  export type PostTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which PostTranslation to fetch.
     */
    where?: PostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTranslations to fetch.
     */
    orderBy?: PostTranslationOrderByWithRelationInput | PostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTranslations.
     */
    cursor?: PostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTranslations.
     */
    distinct?: PostTranslationScalarFieldEnum | PostTranslationScalarFieldEnum[]
  }

  /**
   * PostTranslation findFirstOrThrow
   */
  export type PostTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which PostTranslation to fetch.
     */
    where?: PostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTranslations to fetch.
     */
    orderBy?: PostTranslationOrderByWithRelationInput | PostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTranslations.
     */
    cursor?: PostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTranslations.
     */
    distinct?: PostTranslationScalarFieldEnum | PostTranslationScalarFieldEnum[]
  }

  /**
   * PostTranslation findMany
   */
  export type PostTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which PostTranslations to fetch.
     */
    where?: PostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTranslations to fetch.
     */
    orderBy?: PostTranslationOrderByWithRelationInput | PostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostTranslations.
     */
    cursor?: PostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTranslations.
     */
    skip?: number
    distinct?: PostTranslationScalarFieldEnum | PostTranslationScalarFieldEnum[]
  }

  /**
   * PostTranslation create
   */
  export type PostTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a PostTranslation.
     */
    data: XOR<PostTranslationCreateInput, PostTranslationUncheckedCreateInput>
  }

  /**
   * PostTranslation createMany
   */
  export type PostTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostTranslations.
     */
    data: PostTranslationCreateManyInput | PostTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostTranslation createManyAndReturn
   */
  export type PostTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many PostTranslations.
     */
    data: PostTranslationCreateManyInput | PostTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostTranslation update
   */
  export type PostTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a PostTranslation.
     */
    data: XOR<PostTranslationUpdateInput, PostTranslationUncheckedUpdateInput>
    /**
     * Choose, which PostTranslation to update.
     */
    where: PostTranslationWhereUniqueInput
  }

  /**
   * PostTranslation updateMany
   */
  export type PostTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostTranslations.
     */
    data: XOR<PostTranslationUpdateManyMutationInput, PostTranslationUncheckedUpdateManyInput>
    /**
     * Filter which PostTranslations to update
     */
    where?: PostTranslationWhereInput
    /**
     * Limit how many PostTranslations to update.
     */
    limit?: number
  }

  /**
   * PostTranslation updateManyAndReturn
   */
  export type PostTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * The data used to update PostTranslations.
     */
    data: XOR<PostTranslationUpdateManyMutationInput, PostTranslationUncheckedUpdateManyInput>
    /**
     * Filter which PostTranslations to update
     */
    where?: PostTranslationWhereInput
    /**
     * Limit how many PostTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostTranslation upsert
   */
  export type PostTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the PostTranslation to update in case it exists.
     */
    where: PostTranslationWhereUniqueInput
    /**
     * In case the PostTranslation found by the `where` argument doesn't exist, create a new PostTranslation with this data.
     */
    create: XOR<PostTranslationCreateInput, PostTranslationUncheckedCreateInput>
    /**
     * In case the PostTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostTranslationUpdateInput, PostTranslationUncheckedUpdateInput>
  }

  /**
   * PostTranslation delete
   */
  export type PostTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
    /**
     * Filter which PostTranslation to delete.
     */
    where: PostTranslationWhereUniqueInput
  }

  /**
   * PostTranslation deleteMany
   */
  export type PostTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTranslations to delete
     */
    where?: PostTranslationWhereInput
    /**
     * Limit how many PostTranslations to delete.
     */
    limit?: number
  }

  /**
   * PostTranslation without action
   */
  export type PostTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTranslation
     */
    select?: PostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTranslation
     */
    omit?: PostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTranslationInclude<ExtArgs> | null
  }


  /**
   * Model ServiceType
   */

  export type AggregateServiceType = {
    _count: ServiceTypeCountAggregateOutputType | null
    _min: ServiceTypeMinAggregateOutputType | null
    _max: ServiceTypeMaxAggregateOutputType | null
  }

  export type ServiceTypeMinAggregateOutputType = {
    id: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceTypeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceTypeCountAggregateOutputType = {
    id: number
    code: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceTypeMinAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceTypeMaxAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceTypeCountAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceType to aggregate.
     */
    where?: ServiceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypes to fetch.
     */
    orderBy?: ServiceTypeOrderByWithRelationInput | ServiceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceTypes
    **/
    _count?: true | ServiceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceTypeMaxAggregateInputType
  }

  export type GetServiceTypeAggregateType<T extends ServiceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceType[P]>
      : GetScalarType<T[P], AggregateServiceType[P]>
  }




  export type ServiceTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceTypeWhereInput
    orderBy?: ServiceTypeOrderByWithAggregationInput | ServiceTypeOrderByWithAggregationInput[]
    by: ServiceTypeScalarFieldEnum[] | ServiceTypeScalarFieldEnum
    having?: ServiceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceTypeCountAggregateInputType | true
    _min?: ServiceTypeMinAggregateInputType
    _max?: ServiceTypeMaxAggregateInputType
  }

  export type ServiceTypeGroupByOutputType = {
    id: string
    code: string
    createdAt: Date
    updatedAt: Date
    _count: ServiceTypeCountAggregateOutputType | null
    _min: ServiceTypeMinAggregateOutputType | null
    _max: ServiceTypeMaxAggregateOutputType | null
  }

  type GetServiceTypeGroupByPayload<T extends ServiceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceTypeGroupByOutputType[P]>
        }
      >
    >


  export type ServiceTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    services?: boolean | ServiceType$servicesArgs<ExtArgs>
    translations?: boolean | ServiceType$translationsArgs<ExtArgs>
    _count?: boolean | ServiceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceType"]>

  export type ServiceTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceType"]>

  export type ServiceTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceType"]>

  export type ServiceTypeSelectScalar = {
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceType"]>
  export type ServiceTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceType$servicesArgs<ExtArgs>
    translations?: boolean | ServiceType$translationsArgs<ExtArgs>
    _count?: boolean | ServiceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceType"
    objects: {
      services: Prisma.$ServicePayload<ExtArgs>[]
      translations: Prisma.$ServiceTypeTranslationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceType"]>
    composites: {}
  }

  type ServiceTypeGetPayload<S extends boolean | null | undefined | ServiceTypeDefaultArgs> = $Result.GetResult<Prisma.$ServiceTypePayload, S>

  type ServiceTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceTypeCountAggregateInputType | true
    }

  export interface ServiceTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceType'], meta: { name: 'ServiceType' } }
    /**
     * Find zero or one ServiceType that matches the filter.
     * @param {ServiceTypeFindUniqueArgs} args - Arguments to find a ServiceType
     * @example
     * // Get one ServiceType
     * const serviceType = await prisma.serviceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceTypeFindUniqueArgs>(args: SelectSubset<T, ServiceTypeFindUniqueArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceTypeFindUniqueOrThrowArgs} args - Arguments to find a ServiceType
     * @example
     * // Get one ServiceType
     * const serviceType = await prisma.serviceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeFindFirstArgs} args - Arguments to find a ServiceType
     * @example
     * // Get one ServiceType
     * const serviceType = await prisma.serviceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceTypeFindFirstArgs>(args?: SelectSubset<T, ServiceTypeFindFirstArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeFindFirstOrThrowArgs} args - Arguments to find a ServiceType
     * @example
     * // Get one ServiceType
     * const serviceType = await prisma.serviceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceTypes
     * const serviceTypes = await prisma.serviceType.findMany()
     * 
     * // Get first 10 ServiceTypes
     * const serviceTypes = await prisma.serviceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceTypeWithIdOnly = await prisma.serviceType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceTypeFindManyArgs>(args?: SelectSubset<T, ServiceTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceType.
     * @param {ServiceTypeCreateArgs} args - Arguments to create a ServiceType.
     * @example
     * // Create one ServiceType
     * const ServiceType = await prisma.serviceType.create({
     *   data: {
     *     // ... data to create a ServiceType
     *   }
     * })
     * 
     */
    create<T extends ServiceTypeCreateArgs>(args: SelectSubset<T, ServiceTypeCreateArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceTypes.
     * @param {ServiceTypeCreateManyArgs} args - Arguments to create many ServiceTypes.
     * @example
     * // Create many ServiceTypes
     * const serviceType = await prisma.serviceType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceTypeCreateManyArgs>(args?: SelectSubset<T, ServiceTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceTypes and returns the data saved in the database.
     * @param {ServiceTypeCreateManyAndReturnArgs} args - Arguments to create many ServiceTypes.
     * @example
     * // Create many ServiceTypes
     * const serviceType = await prisma.serviceType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceTypes and only return the `id`
     * const serviceTypeWithIdOnly = await prisma.serviceType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceType.
     * @param {ServiceTypeDeleteArgs} args - Arguments to delete one ServiceType.
     * @example
     * // Delete one ServiceType
     * const ServiceType = await prisma.serviceType.delete({
     *   where: {
     *     // ... filter to delete one ServiceType
     *   }
     * })
     * 
     */
    delete<T extends ServiceTypeDeleteArgs>(args: SelectSubset<T, ServiceTypeDeleteArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceType.
     * @param {ServiceTypeUpdateArgs} args - Arguments to update one ServiceType.
     * @example
     * // Update one ServiceType
     * const serviceType = await prisma.serviceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceTypeUpdateArgs>(args: SelectSubset<T, ServiceTypeUpdateArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceTypes.
     * @param {ServiceTypeDeleteManyArgs} args - Arguments to filter ServiceTypes to delete.
     * @example
     * // Delete a few ServiceTypes
     * const { count } = await prisma.serviceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceTypeDeleteManyArgs>(args?: SelectSubset<T, ServiceTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceTypes
     * const serviceType = await prisma.serviceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceTypeUpdateManyArgs>(args: SelectSubset<T, ServiceTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTypes and returns the data updated in the database.
     * @param {ServiceTypeUpdateManyAndReturnArgs} args - Arguments to update many ServiceTypes.
     * @example
     * // Update many ServiceTypes
     * const serviceType = await prisma.serviceType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceTypes and only return the `id`
     * const serviceTypeWithIdOnly = await prisma.serviceType.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceType.
     * @param {ServiceTypeUpsertArgs} args - Arguments to update or create a ServiceType.
     * @example
     * // Update or create a ServiceType
     * const serviceType = await prisma.serviceType.upsert({
     *   create: {
     *     // ... data to create a ServiceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceType we want to update
     *   }
     * })
     */
    upsert<T extends ServiceTypeUpsertArgs>(args: SelectSubset<T, ServiceTypeUpsertArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeCountArgs} args - Arguments to filter ServiceTypes to count.
     * @example
     * // Count the number of ServiceTypes
     * const count = await prisma.serviceType.count({
     *   where: {
     *     // ... the filter for the ServiceTypes we want to count
     *   }
     * })
    **/
    count<T extends ServiceTypeCountArgs>(
      args?: Subset<T, ServiceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceTypeAggregateArgs>(args: Subset<T, ServiceTypeAggregateArgs>): Prisma.PrismaPromise<GetServiceTypeAggregateType<T>>

    /**
     * Group by ServiceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeGroupByArgs} args - Group by arguments.
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
      T extends ServiceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceTypeGroupByArgs['orderBy'] }
        : { orderBy?: ServiceTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceType model
   */
  readonly fields: ServiceTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    services<T extends ServiceType$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceType$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    translations<T extends ServiceType$translationsArgs<ExtArgs> = {}>(args?: Subset<T, ServiceType$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceType model
   */
  interface ServiceTypeFieldRefs {
    readonly id: FieldRef<"ServiceType", 'String'>
    readonly code: FieldRef<"ServiceType", 'String'>
    readonly createdAt: FieldRef<"ServiceType", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceType findUnique
   */
  export type ServiceTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ServiceType to fetch.
     */
    where: ServiceTypeWhereUniqueInput
  }

  /**
   * ServiceType findUniqueOrThrow
   */
  export type ServiceTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ServiceType to fetch.
     */
    where: ServiceTypeWhereUniqueInput
  }

  /**
   * ServiceType findFirst
   */
  export type ServiceTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ServiceType to fetch.
     */
    where?: ServiceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypes to fetch.
     */
    orderBy?: ServiceTypeOrderByWithRelationInput | ServiceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTypes.
     */
    cursor?: ServiceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTypes.
     */
    distinct?: ServiceTypeScalarFieldEnum | ServiceTypeScalarFieldEnum[]
  }

  /**
   * ServiceType findFirstOrThrow
   */
  export type ServiceTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ServiceType to fetch.
     */
    where?: ServiceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypes to fetch.
     */
    orderBy?: ServiceTypeOrderByWithRelationInput | ServiceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTypes.
     */
    cursor?: ServiceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTypes.
     */
    distinct?: ServiceTypeScalarFieldEnum | ServiceTypeScalarFieldEnum[]
  }

  /**
   * ServiceType findMany
   */
  export type ServiceTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypes to fetch.
     */
    where?: ServiceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypes to fetch.
     */
    orderBy?: ServiceTypeOrderByWithRelationInput | ServiceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceTypes.
     */
    cursor?: ServiceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypes.
     */
    skip?: number
    distinct?: ServiceTypeScalarFieldEnum | ServiceTypeScalarFieldEnum[]
  }

  /**
   * ServiceType create
   */
  export type ServiceTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceType.
     */
    data: XOR<ServiceTypeCreateInput, ServiceTypeUncheckedCreateInput>
  }

  /**
   * ServiceType createMany
   */
  export type ServiceTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceTypes.
     */
    data: ServiceTypeCreateManyInput | ServiceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceType createManyAndReturn
   */
  export type ServiceTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceTypes.
     */
    data: ServiceTypeCreateManyInput | ServiceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceType update
   */
  export type ServiceTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceType.
     */
    data: XOR<ServiceTypeUpdateInput, ServiceTypeUncheckedUpdateInput>
    /**
     * Choose, which ServiceType to update.
     */
    where: ServiceTypeWhereUniqueInput
  }

  /**
   * ServiceType updateMany
   */
  export type ServiceTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceTypes.
     */
    data: XOR<ServiceTypeUpdateManyMutationInput, ServiceTypeUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTypes to update
     */
    where?: ServiceTypeWhereInput
    /**
     * Limit how many ServiceTypes to update.
     */
    limit?: number
  }

  /**
   * ServiceType updateManyAndReturn
   */
  export type ServiceTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * The data used to update ServiceTypes.
     */
    data: XOR<ServiceTypeUpdateManyMutationInput, ServiceTypeUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTypes to update
     */
    where?: ServiceTypeWhereInput
    /**
     * Limit how many ServiceTypes to update.
     */
    limit?: number
  }

  /**
   * ServiceType upsert
   */
  export type ServiceTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceType to update in case it exists.
     */
    where: ServiceTypeWhereUniqueInput
    /**
     * In case the ServiceType found by the `where` argument doesn't exist, create a new ServiceType with this data.
     */
    create: XOR<ServiceTypeCreateInput, ServiceTypeUncheckedCreateInput>
    /**
     * In case the ServiceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceTypeUpdateInput, ServiceTypeUncheckedUpdateInput>
  }

  /**
   * ServiceType delete
   */
  export type ServiceTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    /**
     * Filter which ServiceType to delete.
     */
    where: ServiceTypeWhereUniqueInput
  }

  /**
   * ServiceType deleteMany
   */
  export type ServiceTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceTypes to delete
     */
    where?: ServiceTypeWhereInput
    /**
     * Limit how many ServiceTypes to delete.
     */
    limit?: number
  }

  /**
   * ServiceType.services
   */
  export type ServiceType$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * ServiceType.translations
   */
  export type ServiceType$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    where?: ServiceTypeTranslationWhereInput
    orderBy?: ServiceTypeTranslationOrderByWithRelationInput | ServiceTypeTranslationOrderByWithRelationInput[]
    cursor?: ServiceTypeTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceTypeTranslationScalarFieldEnum | ServiceTypeTranslationScalarFieldEnum[]
  }

  /**
   * ServiceType without action
   */
  export type ServiceTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
  }


  /**
   * Model ServiceTypeTranslation
   */

  export type AggregateServiceTypeTranslation = {
    _count: ServiceTypeTranslationCountAggregateOutputType | null
    _min: ServiceTypeTranslationMinAggregateOutputType | null
    _max: ServiceTypeTranslationMaxAggregateOutputType | null
  }

  export type ServiceTypeTranslationMinAggregateOutputType = {
    id: string | null
    serviceTypeId: string | null
    language: $Enums.Language | null
    displayName: string | null
    description: string | null
    brochureUrl: string | null
  }

  export type ServiceTypeTranslationMaxAggregateOutputType = {
    id: string | null
    serviceTypeId: string | null
    language: $Enums.Language | null
    displayName: string | null
    description: string | null
    brochureUrl: string | null
  }

  export type ServiceTypeTranslationCountAggregateOutputType = {
    id: number
    serviceTypeId: number
    language: number
    displayName: number
    description: number
    brochureUrl: number
    _all: number
  }


  export type ServiceTypeTranslationMinAggregateInputType = {
    id?: true
    serviceTypeId?: true
    language?: true
    displayName?: true
    description?: true
    brochureUrl?: true
  }

  export type ServiceTypeTranslationMaxAggregateInputType = {
    id?: true
    serviceTypeId?: true
    language?: true
    displayName?: true
    description?: true
    brochureUrl?: true
  }

  export type ServiceTypeTranslationCountAggregateInputType = {
    id?: true
    serviceTypeId?: true
    language?: true
    displayName?: true
    description?: true
    brochureUrl?: true
    _all?: true
  }

  export type ServiceTypeTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceTypeTranslation to aggregate.
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypeTranslations to fetch.
     */
    orderBy?: ServiceTypeTranslationOrderByWithRelationInput | ServiceTypeTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceTypeTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypeTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypeTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceTypeTranslations
    **/
    _count?: true | ServiceTypeTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceTypeTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceTypeTranslationMaxAggregateInputType
  }

  export type GetServiceTypeTranslationAggregateType<T extends ServiceTypeTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceTypeTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceTypeTranslation[P]>
      : GetScalarType<T[P], AggregateServiceTypeTranslation[P]>
  }




  export type ServiceTypeTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceTypeTranslationWhereInput
    orderBy?: ServiceTypeTranslationOrderByWithAggregationInput | ServiceTypeTranslationOrderByWithAggregationInput[]
    by: ServiceTypeTranslationScalarFieldEnum[] | ServiceTypeTranslationScalarFieldEnum
    having?: ServiceTypeTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceTypeTranslationCountAggregateInputType | true
    _min?: ServiceTypeTranslationMinAggregateInputType
    _max?: ServiceTypeTranslationMaxAggregateInputType
  }

  export type ServiceTypeTranslationGroupByOutputType = {
    id: string
    serviceTypeId: string
    language: $Enums.Language
    displayName: string
    description: string | null
    brochureUrl: string | null
    _count: ServiceTypeTranslationCountAggregateOutputType | null
    _min: ServiceTypeTranslationMinAggregateOutputType | null
    _max: ServiceTypeTranslationMaxAggregateOutputType | null
  }

  type GetServiceTypeTranslationGroupByPayload<T extends ServiceTypeTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceTypeTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceTypeTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceTypeTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceTypeTranslationGroupByOutputType[P]>
        }
      >
    >


  export type ServiceTypeTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceTypeId?: boolean
    language?: boolean
    displayName?: boolean
    description?: boolean
    brochureUrl?: boolean
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTypeTranslation"]>

  export type ServiceTypeTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceTypeId?: boolean
    language?: boolean
    displayName?: boolean
    description?: boolean
    brochureUrl?: boolean
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTypeTranslation"]>

  export type ServiceTypeTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceTypeId?: boolean
    language?: boolean
    displayName?: boolean
    description?: boolean
    brochureUrl?: boolean
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTypeTranslation"]>

  export type ServiceTypeTranslationSelectScalar = {
    id?: boolean
    serviceTypeId?: boolean
    language?: boolean
    displayName?: boolean
    description?: boolean
    brochureUrl?: boolean
  }

  export type ServiceTypeTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceTypeId" | "language" | "displayName" | "description" | "brochureUrl", ExtArgs["result"]["serviceTypeTranslation"]>
  export type ServiceTypeTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }
  export type ServiceTypeTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }
  export type ServiceTypeTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | ServiceTypeDefaultArgs<ExtArgs>
  }

  export type $ServiceTypeTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceTypeTranslation"
    objects: {
      serviceType: Prisma.$ServiceTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceTypeId: string
      language: $Enums.Language
      displayName: string
      description: string | null
      brochureUrl: string | null
    }, ExtArgs["result"]["serviceTypeTranslation"]>
    composites: {}
  }

  type ServiceTypeTranslationGetPayload<S extends boolean | null | undefined | ServiceTypeTranslationDefaultArgs> = $Result.GetResult<Prisma.$ServiceTypeTranslationPayload, S>

  type ServiceTypeTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceTypeTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceTypeTranslationCountAggregateInputType | true
    }

  export interface ServiceTypeTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceTypeTranslation'], meta: { name: 'ServiceTypeTranslation' } }
    /**
     * Find zero or one ServiceTypeTranslation that matches the filter.
     * @param {ServiceTypeTranslationFindUniqueArgs} args - Arguments to find a ServiceTypeTranslation
     * @example
     * // Get one ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceTypeTranslationFindUniqueArgs>(args: SelectSubset<T, ServiceTypeTranslationFindUniqueArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceTypeTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceTypeTranslationFindUniqueOrThrowArgs} args - Arguments to find a ServiceTypeTranslation
     * @example
     * // Get one ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceTypeTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceTypeTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceTypeTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationFindFirstArgs} args - Arguments to find a ServiceTypeTranslation
     * @example
     * // Get one ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceTypeTranslationFindFirstArgs>(args?: SelectSubset<T, ServiceTypeTranslationFindFirstArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceTypeTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationFindFirstOrThrowArgs} args - Arguments to find a ServiceTypeTranslation
     * @example
     * // Get one ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceTypeTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceTypeTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceTypeTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceTypeTranslations
     * const serviceTypeTranslations = await prisma.serviceTypeTranslation.findMany()
     * 
     * // Get first 10 ServiceTypeTranslations
     * const serviceTypeTranslations = await prisma.serviceTypeTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceTypeTranslationWithIdOnly = await prisma.serviceTypeTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceTypeTranslationFindManyArgs>(args?: SelectSubset<T, ServiceTypeTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceTypeTranslation.
     * @param {ServiceTypeTranslationCreateArgs} args - Arguments to create a ServiceTypeTranslation.
     * @example
     * // Create one ServiceTypeTranslation
     * const ServiceTypeTranslation = await prisma.serviceTypeTranslation.create({
     *   data: {
     *     // ... data to create a ServiceTypeTranslation
     *   }
     * })
     * 
     */
    create<T extends ServiceTypeTranslationCreateArgs>(args: SelectSubset<T, ServiceTypeTranslationCreateArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceTypeTranslations.
     * @param {ServiceTypeTranslationCreateManyArgs} args - Arguments to create many ServiceTypeTranslations.
     * @example
     * // Create many ServiceTypeTranslations
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceTypeTranslationCreateManyArgs>(args?: SelectSubset<T, ServiceTypeTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceTypeTranslations and returns the data saved in the database.
     * @param {ServiceTypeTranslationCreateManyAndReturnArgs} args - Arguments to create many ServiceTypeTranslations.
     * @example
     * // Create many ServiceTypeTranslations
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceTypeTranslations and only return the `id`
     * const serviceTypeTranslationWithIdOnly = await prisma.serviceTypeTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceTypeTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceTypeTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceTypeTranslation.
     * @param {ServiceTypeTranslationDeleteArgs} args - Arguments to delete one ServiceTypeTranslation.
     * @example
     * // Delete one ServiceTypeTranslation
     * const ServiceTypeTranslation = await prisma.serviceTypeTranslation.delete({
     *   where: {
     *     // ... filter to delete one ServiceTypeTranslation
     *   }
     * })
     * 
     */
    delete<T extends ServiceTypeTranslationDeleteArgs>(args: SelectSubset<T, ServiceTypeTranslationDeleteArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceTypeTranslation.
     * @param {ServiceTypeTranslationUpdateArgs} args - Arguments to update one ServiceTypeTranslation.
     * @example
     * // Update one ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceTypeTranslationUpdateArgs>(args: SelectSubset<T, ServiceTypeTranslationUpdateArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceTypeTranslations.
     * @param {ServiceTypeTranslationDeleteManyArgs} args - Arguments to filter ServiceTypeTranslations to delete.
     * @example
     * // Delete a few ServiceTypeTranslations
     * const { count } = await prisma.serviceTypeTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceTypeTranslationDeleteManyArgs>(args?: SelectSubset<T, ServiceTypeTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTypeTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceTypeTranslations
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceTypeTranslationUpdateManyArgs>(args: SelectSubset<T, ServiceTypeTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTypeTranslations and returns the data updated in the database.
     * @param {ServiceTypeTranslationUpdateManyAndReturnArgs} args - Arguments to update many ServiceTypeTranslations.
     * @example
     * // Update many ServiceTypeTranslations
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceTypeTranslations and only return the `id`
     * const serviceTypeTranslationWithIdOnly = await prisma.serviceTypeTranslation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceTypeTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceTypeTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceTypeTranslation.
     * @param {ServiceTypeTranslationUpsertArgs} args - Arguments to update or create a ServiceTypeTranslation.
     * @example
     * // Update or create a ServiceTypeTranslation
     * const serviceTypeTranslation = await prisma.serviceTypeTranslation.upsert({
     *   create: {
     *     // ... data to create a ServiceTypeTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceTypeTranslation we want to update
     *   }
     * })
     */
    upsert<T extends ServiceTypeTranslationUpsertArgs>(args: SelectSubset<T, ServiceTypeTranslationUpsertArgs<ExtArgs>>): Prisma__ServiceTypeTranslationClient<$Result.GetResult<Prisma.$ServiceTypeTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceTypeTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationCountArgs} args - Arguments to filter ServiceTypeTranslations to count.
     * @example
     * // Count the number of ServiceTypeTranslations
     * const count = await prisma.serviceTypeTranslation.count({
     *   where: {
     *     // ... the filter for the ServiceTypeTranslations we want to count
     *   }
     * })
    **/
    count<T extends ServiceTypeTranslationCountArgs>(
      args?: Subset<T, ServiceTypeTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceTypeTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceTypeTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceTypeTranslationAggregateArgs>(args: Subset<T, ServiceTypeTranslationAggregateArgs>): Prisma.PrismaPromise<GetServiceTypeTranslationAggregateType<T>>

    /**
     * Group by ServiceTypeTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTypeTranslationGroupByArgs} args - Group by arguments.
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
      T extends ServiceTypeTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceTypeTranslationGroupByArgs['orderBy'] }
        : { orderBy?: ServiceTypeTranslationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceTypeTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceTypeTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceTypeTranslation model
   */
  readonly fields: ServiceTypeTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceTypeTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceTypeTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceType<T extends ServiceTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceTypeDefaultArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ServiceTypeTranslation model
   */
  interface ServiceTypeTranslationFieldRefs {
    readonly id: FieldRef<"ServiceTypeTranslation", 'String'>
    readonly serviceTypeId: FieldRef<"ServiceTypeTranslation", 'String'>
    readonly language: FieldRef<"ServiceTypeTranslation", 'Language'>
    readonly displayName: FieldRef<"ServiceTypeTranslation", 'String'>
    readonly description: FieldRef<"ServiceTypeTranslation", 'String'>
    readonly brochureUrl: FieldRef<"ServiceTypeTranslation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServiceTypeTranslation findUnique
   */
  export type ServiceTypeTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypeTranslation to fetch.
     */
    where: ServiceTypeTranslationWhereUniqueInput
  }

  /**
   * ServiceTypeTranslation findUniqueOrThrow
   */
  export type ServiceTypeTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypeTranslation to fetch.
     */
    where: ServiceTypeTranslationWhereUniqueInput
  }

  /**
   * ServiceTypeTranslation findFirst
   */
  export type ServiceTypeTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypeTranslation to fetch.
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypeTranslations to fetch.
     */
    orderBy?: ServiceTypeTranslationOrderByWithRelationInput | ServiceTypeTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTypeTranslations.
     */
    cursor?: ServiceTypeTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypeTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypeTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTypeTranslations.
     */
    distinct?: ServiceTypeTranslationScalarFieldEnum | ServiceTypeTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTypeTranslation findFirstOrThrow
   */
  export type ServiceTypeTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypeTranslation to fetch.
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypeTranslations to fetch.
     */
    orderBy?: ServiceTypeTranslationOrderByWithRelationInput | ServiceTypeTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTypeTranslations.
     */
    cursor?: ServiceTypeTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypeTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypeTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTypeTranslations.
     */
    distinct?: ServiceTypeTranslationScalarFieldEnum | ServiceTypeTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTypeTranslation findMany
   */
  export type ServiceTypeTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTypeTranslations to fetch.
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTypeTranslations to fetch.
     */
    orderBy?: ServiceTypeTranslationOrderByWithRelationInput | ServiceTypeTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceTypeTranslations.
     */
    cursor?: ServiceTypeTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTypeTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTypeTranslations.
     */
    skip?: number
    distinct?: ServiceTypeTranslationScalarFieldEnum | ServiceTypeTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTypeTranslation create
   */
  export type ServiceTypeTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceTypeTranslation.
     */
    data: XOR<ServiceTypeTranslationCreateInput, ServiceTypeTranslationUncheckedCreateInput>
  }

  /**
   * ServiceTypeTranslation createMany
   */
  export type ServiceTypeTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceTypeTranslations.
     */
    data: ServiceTypeTranslationCreateManyInput | ServiceTypeTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceTypeTranslation createManyAndReturn
   */
  export type ServiceTypeTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceTypeTranslations.
     */
    data: ServiceTypeTranslationCreateManyInput | ServiceTypeTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceTypeTranslation update
   */
  export type ServiceTypeTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceTypeTranslation.
     */
    data: XOR<ServiceTypeTranslationUpdateInput, ServiceTypeTranslationUncheckedUpdateInput>
    /**
     * Choose, which ServiceTypeTranslation to update.
     */
    where: ServiceTypeTranslationWhereUniqueInput
  }

  /**
   * ServiceTypeTranslation updateMany
   */
  export type ServiceTypeTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceTypeTranslations.
     */
    data: XOR<ServiceTypeTranslationUpdateManyMutationInput, ServiceTypeTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTypeTranslations to update
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * Limit how many ServiceTypeTranslations to update.
     */
    limit?: number
  }

  /**
   * ServiceTypeTranslation updateManyAndReturn
   */
  export type ServiceTypeTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * The data used to update ServiceTypeTranslations.
     */
    data: XOR<ServiceTypeTranslationUpdateManyMutationInput, ServiceTypeTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTypeTranslations to update
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * Limit how many ServiceTypeTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceTypeTranslation upsert
   */
  export type ServiceTypeTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceTypeTranslation to update in case it exists.
     */
    where: ServiceTypeTranslationWhereUniqueInput
    /**
     * In case the ServiceTypeTranslation found by the `where` argument doesn't exist, create a new ServiceTypeTranslation with this data.
     */
    create: XOR<ServiceTypeTranslationCreateInput, ServiceTypeTranslationUncheckedCreateInput>
    /**
     * In case the ServiceTypeTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceTypeTranslationUpdateInput, ServiceTypeTranslationUncheckedUpdateInput>
  }

  /**
   * ServiceTypeTranslation delete
   */
  export type ServiceTypeTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
    /**
     * Filter which ServiceTypeTranslation to delete.
     */
    where: ServiceTypeTranslationWhereUniqueInput
  }

  /**
   * ServiceTypeTranslation deleteMany
   */
  export type ServiceTypeTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceTypeTranslations to delete
     */
    where?: ServiceTypeTranslationWhereInput
    /**
     * Limit how many ServiceTypeTranslations to delete.
     */
    limit?: number
  }

  /**
   * ServiceTypeTranslation without action
   */
  export type ServiceTypeTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTypeTranslation
     */
    select?: ServiceTypeTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTypeTranslation
     */
    omit?: ServiceTypeTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeTranslationInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    orderNumber: number | null
  }

  export type ServiceSumAggregateOutputType = {
    orderNumber: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    orderNumber: number | null
    serviceTypeId: string | null
    thumbnailId: string | null
    backgroundCoverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    orderNumber: number | null
    serviceTypeId: string | null
    thumbnailId: string | null
    backgroundCoverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    orderNumber: number
    serviceTypeId: number
    thumbnailId: number
    backgroundCoverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    orderNumber?: true
  }

  export type ServiceSumAggregateInputType = {
    orderNumber?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    orderNumber?: true
    serviceTypeId?: true
    thumbnailId?: true
    backgroundCoverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    serviceTypeId?: true
    thumbnailId?: true
    backgroundCoverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    orderNumber?: true
    serviceTypeId?: true
    thumbnailId?: true
    backgroundCoverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    orderNumber: number
    serviceTypeId: string | null
    thumbnailId: string | null
    backgroundCoverId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    serviceTypeId?: boolean
    thumbnailId?: boolean
    backgroundCoverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    translations?: boolean | Service$translationsArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    serviceTypeId?: boolean
    thumbnailId?: boolean
    backgroundCoverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    serviceTypeId?: boolean
    thumbnailId?: boolean
    backgroundCoverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    serviceTypeId?: boolean
    thumbnailId?: boolean
    backgroundCoverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "serviceTypeId" | "thumbnailId" | "backgroundCoverId" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    translations?: boolean | Service$translationsArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceType?: boolean | Service$serviceTypeArgs<ExtArgs>
    thumbnail?: boolean | Service$thumbnailArgs<ExtArgs>
    backgroundCover?: boolean | Service$backgroundCoverArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      serviceType: Prisma.$ServiceTypePayload<ExtArgs> | null
      translations: Prisma.$ServiceTranslationPayload<ExtArgs>[]
      thumbnail: Prisma.$ServiceThumbnailPayload<ExtArgs> | null
      backgroundCover: Prisma.$ServiceBackgroundCoverPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: number
      serviceTypeId: string | null
      thumbnailId: string | null
      backgroundCoverId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceType<T extends Service$serviceTypeArgs<ExtArgs> = {}>(args?: Subset<T, Service$serviceTypeArgs<ExtArgs>>): Prisma__ServiceTypeClient<$Result.GetResult<Prisma.$ServiceTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    translations<T extends Service$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Service$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    thumbnail<T extends Service$thumbnailArgs<ExtArgs> = {}>(args?: Subset<T, Service$thumbnailArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    backgroundCover<T extends Service$backgroundCoverArgs<ExtArgs> = {}>(args?: Subset<T, Service$backgroundCoverArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly orderNumber: FieldRef<"Service", 'Int'>
    readonly serviceTypeId: FieldRef<"Service", 'String'>
    readonly thumbnailId: FieldRef<"Service", 'String'>
    readonly backgroundCoverId: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.serviceType
   */
  export type Service$serviceTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceType
     */
    select?: ServiceTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceType
     */
    omit?: ServiceTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTypeInclude<ExtArgs> | null
    where?: ServiceTypeWhereInput
  }

  /**
   * Service.translations
   */
  export type Service$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    where?: ServiceTranslationWhereInput
    orderBy?: ServiceTranslationOrderByWithRelationInput | ServiceTranslationOrderByWithRelationInput[]
    cursor?: ServiceTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceTranslationScalarFieldEnum | ServiceTranslationScalarFieldEnum[]
  }

  /**
   * Service.thumbnail
   */
  export type Service$thumbnailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    where?: ServiceThumbnailWhereInput
  }

  /**
   * Service.backgroundCover
   */
  export type Service$backgroundCoverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    where?: ServiceBackgroundCoverWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model ServiceTranslation
   */

  export type AggregateServiceTranslation = {
    _count: ServiceTranslationCountAggregateOutputType | null
    _min: ServiceTranslationMinAggregateOutputType | null
    _max: ServiceTranslationMaxAggregateOutputType | null
  }

  export type ServiceTranslationMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    language: $Enums.Language | null
    slug: string | null
    title: string | null
    description: string | null
    shortDescription: string | null
    content: string | null
    seoTitle: string | null
    seoDescription: string | null
  }

  export type ServiceTranslationMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    language: $Enums.Language | null
    slug: string | null
    title: string | null
    description: string | null
    shortDescription: string | null
    content: string | null
    seoTitle: string | null
    seoDescription: string | null
  }

  export type ServiceTranslationCountAggregateOutputType = {
    id: number
    serviceId: number
    language: number
    slug: number
    title: number
    description: number
    shortDescription: number
    content: number
    seoTitle: number
    seoDescription: number
    seoKeywords: number
    _all: number
  }


  export type ServiceTranslationMinAggregateInputType = {
    id?: true
    serviceId?: true
    language?: true
    slug?: true
    title?: true
    description?: true
    shortDescription?: true
    content?: true
    seoTitle?: true
    seoDescription?: true
  }

  export type ServiceTranslationMaxAggregateInputType = {
    id?: true
    serviceId?: true
    language?: true
    slug?: true
    title?: true
    description?: true
    shortDescription?: true
    content?: true
    seoTitle?: true
    seoDescription?: true
  }

  export type ServiceTranslationCountAggregateInputType = {
    id?: true
    serviceId?: true
    language?: true
    slug?: true
    title?: true
    description?: true
    shortDescription?: true
    content?: true
    seoTitle?: true
    seoDescription?: true
    seoKeywords?: true
    _all?: true
  }

  export type ServiceTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceTranslation to aggregate.
     */
    where?: ServiceTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTranslations to fetch.
     */
    orderBy?: ServiceTranslationOrderByWithRelationInput | ServiceTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceTranslations
    **/
    _count?: true | ServiceTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceTranslationMaxAggregateInputType
  }

  export type GetServiceTranslationAggregateType<T extends ServiceTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceTranslation[P]>
      : GetScalarType<T[P], AggregateServiceTranslation[P]>
  }




  export type ServiceTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceTranslationWhereInput
    orderBy?: ServiceTranslationOrderByWithAggregationInput | ServiceTranslationOrderByWithAggregationInput[]
    by: ServiceTranslationScalarFieldEnum[] | ServiceTranslationScalarFieldEnum
    having?: ServiceTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceTranslationCountAggregateInputType | true
    _min?: ServiceTranslationMinAggregateInputType
    _max?: ServiceTranslationMaxAggregateInputType
  }

  export type ServiceTranslationGroupByOutputType = {
    id: string
    serviceId: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle: string | null
    seoDescription: string | null
    seoKeywords: string[]
    _count: ServiceTranslationCountAggregateOutputType | null
    _min: ServiceTranslationMinAggregateOutputType | null
    _max: ServiceTranslationMaxAggregateOutputType | null
  }

  type GetServiceTranslationGroupByPayload<T extends ServiceTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceTranslationGroupByOutputType[P]>
        }
      >
    >


  export type ServiceTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    shortDescription?: boolean
    content?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTranslation"]>

  export type ServiceTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    shortDescription?: boolean
    content?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTranslation"]>

  export type ServiceTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    shortDescription?: boolean
    content?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceTranslation"]>

  export type ServiceTranslationSelectScalar = {
    id?: boolean
    serviceId?: boolean
    language?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    shortDescription?: boolean
    content?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    seoKeywords?: boolean
  }

  export type ServiceTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceId" | "language" | "slug" | "title" | "description" | "shortDescription" | "content" | "seoTitle" | "seoDescription" | "seoKeywords", ExtArgs["result"]["serviceTranslation"]>
  export type ServiceTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceTranslation"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      language: $Enums.Language
      slug: string
      title: string
      description: string
      shortDescription: string
      content: string
      seoTitle: string | null
      seoDescription: string | null
      seoKeywords: string[]
    }, ExtArgs["result"]["serviceTranslation"]>
    composites: {}
  }

  type ServiceTranslationGetPayload<S extends boolean | null | undefined | ServiceTranslationDefaultArgs> = $Result.GetResult<Prisma.$ServiceTranslationPayload, S>

  type ServiceTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceTranslationCountAggregateInputType | true
    }

  export interface ServiceTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceTranslation'], meta: { name: 'ServiceTranslation' } }
    /**
     * Find zero or one ServiceTranslation that matches the filter.
     * @param {ServiceTranslationFindUniqueArgs} args - Arguments to find a ServiceTranslation
     * @example
     * // Get one ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceTranslationFindUniqueArgs>(args: SelectSubset<T, ServiceTranslationFindUniqueArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceTranslationFindUniqueOrThrowArgs} args - Arguments to find a ServiceTranslation
     * @example
     * // Get one ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationFindFirstArgs} args - Arguments to find a ServiceTranslation
     * @example
     * // Get one ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceTranslationFindFirstArgs>(args?: SelectSubset<T, ServiceTranslationFindFirstArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationFindFirstOrThrowArgs} args - Arguments to find a ServiceTranslation
     * @example
     * // Get one ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceTranslations
     * const serviceTranslations = await prisma.serviceTranslation.findMany()
     * 
     * // Get first 10 ServiceTranslations
     * const serviceTranslations = await prisma.serviceTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceTranslationWithIdOnly = await prisma.serviceTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceTranslationFindManyArgs>(args?: SelectSubset<T, ServiceTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceTranslation.
     * @param {ServiceTranslationCreateArgs} args - Arguments to create a ServiceTranslation.
     * @example
     * // Create one ServiceTranslation
     * const ServiceTranslation = await prisma.serviceTranslation.create({
     *   data: {
     *     // ... data to create a ServiceTranslation
     *   }
     * })
     * 
     */
    create<T extends ServiceTranslationCreateArgs>(args: SelectSubset<T, ServiceTranslationCreateArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceTranslations.
     * @param {ServiceTranslationCreateManyArgs} args - Arguments to create many ServiceTranslations.
     * @example
     * // Create many ServiceTranslations
     * const serviceTranslation = await prisma.serviceTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceTranslationCreateManyArgs>(args?: SelectSubset<T, ServiceTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceTranslations and returns the data saved in the database.
     * @param {ServiceTranslationCreateManyAndReturnArgs} args - Arguments to create many ServiceTranslations.
     * @example
     * // Create many ServiceTranslations
     * const serviceTranslation = await prisma.serviceTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceTranslations and only return the `id`
     * const serviceTranslationWithIdOnly = await prisma.serviceTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceTranslation.
     * @param {ServiceTranslationDeleteArgs} args - Arguments to delete one ServiceTranslation.
     * @example
     * // Delete one ServiceTranslation
     * const ServiceTranslation = await prisma.serviceTranslation.delete({
     *   where: {
     *     // ... filter to delete one ServiceTranslation
     *   }
     * })
     * 
     */
    delete<T extends ServiceTranslationDeleteArgs>(args: SelectSubset<T, ServiceTranslationDeleteArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceTranslation.
     * @param {ServiceTranslationUpdateArgs} args - Arguments to update one ServiceTranslation.
     * @example
     * // Update one ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceTranslationUpdateArgs>(args: SelectSubset<T, ServiceTranslationUpdateArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceTranslations.
     * @param {ServiceTranslationDeleteManyArgs} args - Arguments to filter ServiceTranslations to delete.
     * @example
     * // Delete a few ServiceTranslations
     * const { count } = await prisma.serviceTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceTranslationDeleteManyArgs>(args?: SelectSubset<T, ServiceTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceTranslations
     * const serviceTranslation = await prisma.serviceTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceTranslationUpdateManyArgs>(args: SelectSubset<T, ServiceTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceTranslations and returns the data updated in the database.
     * @param {ServiceTranslationUpdateManyAndReturnArgs} args - Arguments to update many ServiceTranslations.
     * @example
     * // Update many ServiceTranslations
     * const serviceTranslation = await prisma.serviceTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceTranslations and only return the `id`
     * const serviceTranslationWithIdOnly = await prisma.serviceTranslation.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceTranslation.
     * @param {ServiceTranslationUpsertArgs} args - Arguments to update or create a ServiceTranslation.
     * @example
     * // Update or create a ServiceTranslation
     * const serviceTranslation = await prisma.serviceTranslation.upsert({
     *   create: {
     *     // ... data to create a ServiceTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceTranslation we want to update
     *   }
     * })
     */
    upsert<T extends ServiceTranslationUpsertArgs>(args: SelectSubset<T, ServiceTranslationUpsertArgs<ExtArgs>>): Prisma__ServiceTranslationClient<$Result.GetResult<Prisma.$ServiceTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationCountArgs} args - Arguments to filter ServiceTranslations to count.
     * @example
     * // Count the number of ServiceTranslations
     * const count = await prisma.serviceTranslation.count({
     *   where: {
     *     // ... the filter for the ServiceTranslations we want to count
     *   }
     * })
    **/
    count<T extends ServiceTranslationCountArgs>(
      args?: Subset<T, ServiceTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceTranslationAggregateArgs>(args: Subset<T, ServiceTranslationAggregateArgs>): Prisma.PrismaPromise<GetServiceTranslationAggregateType<T>>

    /**
     * Group by ServiceTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceTranslationGroupByArgs} args - Group by arguments.
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
      T extends ServiceTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceTranslationGroupByArgs['orderBy'] }
        : { orderBy?: ServiceTranslationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceTranslation model
   */
  readonly fields: ServiceTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ServiceTranslation model
   */
  interface ServiceTranslationFieldRefs {
    readonly id: FieldRef<"ServiceTranslation", 'String'>
    readonly serviceId: FieldRef<"ServiceTranslation", 'String'>
    readonly language: FieldRef<"ServiceTranslation", 'Language'>
    readonly slug: FieldRef<"ServiceTranslation", 'String'>
    readonly title: FieldRef<"ServiceTranslation", 'String'>
    readonly description: FieldRef<"ServiceTranslation", 'String'>
    readonly shortDescription: FieldRef<"ServiceTranslation", 'String'>
    readonly content: FieldRef<"ServiceTranslation", 'String'>
    readonly seoTitle: FieldRef<"ServiceTranslation", 'String'>
    readonly seoDescription: FieldRef<"ServiceTranslation", 'String'>
    readonly seoKeywords: FieldRef<"ServiceTranslation", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * ServiceTranslation findUnique
   */
  export type ServiceTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTranslation to fetch.
     */
    where: ServiceTranslationWhereUniqueInput
  }

  /**
   * ServiceTranslation findUniqueOrThrow
   */
  export type ServiceTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTranslation to fetch.
     */
    where: ServiceTranslationWhereUniqueInput
  }

  /**
   * ServiceTranslation findFirst
   */
  export type ServiceTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTranslation to fetch.
     */
    where?: ServiceTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTranslations to fetch.
     */
    orderBy?: ServiceTranslationOrderByWithRelationInput | ServiceTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTranslations.
     */
    cursor?: ServiceTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTranslations.
     */
    distinct?: ServiceTranslationScalarFieldEnum | ServiceTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTranslation findFirstOrThrow
   */
  export type ServiceTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTranslation to fetch.
     */
    where?: ServiceTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTranslations to fetch.
     */
    orderBy?: ServiceTranslationOrderByWithRelationInput | ServiceTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceTranslations.
     */
    cursor?: ServiceTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceTranslations.
     */
    distinct?: ServiceTranslationScalarFieldEnum | ServiceTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTranslation findMany
   */
  export type ServiceTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ServiceTranslations to fetch.
     */
    where?: ServiceTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceTranslations to fetch.
     */
    orderBy?: ServiceTranslationOrderByWithRelationInput | ServiceTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceTranslations.
     */
    cursor?: ServiceTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceTranslations.
     */
    skip?: number
    distinct?: ServiceTranslationScalarFieldEnum | ServiceTranslationScalarFieldEnum[]
  }

  /**
   * ServiceTranslation create
   */
  export type ServiceTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceTranslation.
     */
    data: XOR<ServiceTranslationCreateInput, ServiceTranslationUncheckedCreateInput>
  }

  /**
   * ServiceTranslation createMany
   */
  export type ServiceTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceTranslations.
     */
    data: ServiceTranslationCreateManyInput | ServiceTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceTranslation createManyAndReturn
   */
  export type ServiceTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceTranslations.
     */
    data: ServiceTranslationCreateManyInput | ServiceTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceTranslation update
   */
  export type ServiceTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceTranslation.
     */
    data: XOR<ServiceTranslationUpdateInput, ServiceTranslationUncheckedUpdateInput>
    /**
     * Choose, which ServiceTranslation to update.
     */
    where: ServiceTranslationWhereUniqueInput
  }

  /**
   * ServiceTranslation updateMany
   */
  export type ServiceTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceTranslations.
     */
    data: XOR<ServiceTranslationUpdateManyMutationInput, ServiceTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTranslations to update
     */
    where?: ServiceTranslationWhereInput
    /**
     * Limit how many ServiceTranslations to update.
     */
    limit?: number
  }

  /**
   * ServiceTranslation updateManyAndReturn
   */
  export type ServiceTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * The data used to update ServiceTranslations.
     */
    data: XOR<ServiceTranslationUpdateManyMutationInput, ServiceTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ServiceTranslations to update
     */
    where?: ServiceTranslationWhereInput
    /**
     * Limit how many ServiceTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceTranslation upsert
   */
  export type ServiceTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceTranslation to update in case it exists.
     */
    where: ServiceTranslationWhereUniqueInput
    /**
     * In case the ServiceTranslation found by the `where` argument doesn't exist, create a new ServiceTranslation with this data.
     */
    create: XOR<ServiceTranslationCreateInput, ServiceTranslationUncheckedCreateInput>
    /**
     * In case the ServiceTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceTranslationUpdateInput, ServiceTranslationUncheckedUpdateInput>
  }

  /**
   * ServiceTranslation delete
   */
  export type ServiceTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
    /**
     * Filter which ServiceTranslation to delete.
     */
    where: ServiceTranslationWhereUniqueInput
  }

  /**
   * ServiceTranslation deleteMany
   */
  export type ServiceTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceTranslations to delete
     */
    where?: ServiceTranslationWhereInput
    /**
     * Limit how many ServiceTranslations to delete.
     */
    limit?: number
  }

  /**
   * ServiceTranslation without action
   */
  export type ServiceTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceTranslation
     */
    select?: ServiceTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceTranslation
     */
    omit?: ServiceTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceTranslationInclude<ExtArgs> | null
  }


  /**
   * Model ServiceThumbnail
   */

  export type AggregateServiceThumbnail = {
    _count: ServiceThumbnailCountAggregateOutputType | null
    _min: ServiceThumbnailMinAggregateOutputType | null
    _max: ServiceThumbnailMaxAggregateOutputType | null
  }

  export type ServiceThumbnailMinAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ServiceThumbnailType | null
  }

  export type ServiceThumbnailMaxAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ServiceThumbnailType | null
  }

  export type ServiceThumbnailCountAggregateOutputType = {
    id: number
    url: number
    type: number
    _all: number
  }


  export type ServiceThumbnailMinAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ServiceThumbnailMaxAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ServiceThumbnailCountAggregateInputType = {
    id?: true
    url?: true
    type?: true
    _all?: true
  }

  export type ServiceThumbnailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceThumbnail to aggregate.
     */
    where?: ServiceThumbnailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceThumbnails to fetch.
     */
    orderBy?: ServiceThumbnailOrderByWithRelationInput | ServiceThumbnailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceThumbnailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceThumbnails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceThumbnails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceThumbnails
    **/
    _count?: true | ServiceThumbnailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceThumbnailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceThumbnailMaxAggregateInputType
  }

  export type GetServiceThumbnailAggregateType<T extends ServiceThumbnailAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceThumbnail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceThumbnail[P]>
      : GetScalarType<T[P], AggregateServiceThumbnail[P]>
  }




  export type ServiceThumbnailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceThumbnailWhereInput
    orderBy?: ServiceThumbnailOrderByWithAggregationInput | ServiceThumbnailOrderByWithAggregationInput[]
    by: ServiceThumbnailScalarFieldEnum[] | ServiceThumbnailScalarFieldEnum
    having?: ServiceThumbnailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceThumbnailCountAggregateInputType | true
    _min?: ServiceThumbnailMinAggregateInputType
    _max?: ServiceThumbnailMaxAggregateInputType
  }

  export type ServiceThumbnailGroupByOutputType = {
    id: string
    url: string
    type: $Enums.ServiceThumbnailType
    _count: ServiceThumbnailCountAggregateOutputType | null
    _min: ServiceThumbnailMinAggregateOutputType | null
    _max: ServiceThumbnailMaxAggregateOutputType | null
  }

  type GetServiceThumbnailGroupByPayload<T extends ServiceThumbnailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceThumbnailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceThumbnailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceThumbnailGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceThumbnailGroupByOutputType[P]>
        }
      >
    >


  export type ServiceThumbnailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
    services?: boolean | ServiceThumbnail$servicesArgs<ExtArgs>
    _count?: boolean | ServiceThumbnailCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceThumbnail"]>

  export type ServiceThumbnailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["serviceThumbnail"]>

  export type ServiceThumbnailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["serviceThumbnail"]>

  export type ServiceThumbnailSelectScalar = {
    id?: boolean
    url?: boolean
    type?: boolean
  }

  export type ServiceThumbnailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "type", ExtArgs["result"]["serviceThumbnail"]>
  export type ServiceThumbnailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceThumbnail$servicesArgs<ExtArgs>
    _count?: boolean | ServiceThumbnailCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceThumbnailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceThumbnailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceThumbnailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceThumbnail"
    objects: {
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      type: $Enums.ServiceThumbnailType
    }, ExtArgs["result"]["serviceThumbnail"]>
    composites: {}
  }

  type ServiceThumbnailGetPayload<S extends boolean | null | undefined | ServiceThumbnailDefaultArgs> = $Result.GetResult<Prisma.$ServiceThumbnailPayload, S>

  type ServiceThumbnailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceThumbnailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceThumbnailCountAggregateInputType | true
    }

  export interface ServiceThumbnailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceThumbnail'], meta: { name: 'ServiceThumbnail' } }
    /**
     * Find zero or one ServiceThumbnail that matches the filter.
     * @param {ServiceThumbnailFindUniqueArgs} args - Arguments to find a ServiceThumbnail
     * @example
     * // Get one ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceThumbnailFindUniqueArgs>(args: SelectSubset<T, ServiceThumbnailFindUniqueArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceThumbnail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceThumbnailFindUniqueOrThrowArgs} args - Arguments to find a ServiceThumbnail
     * @example
     * // Get one ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceThumbnailFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceThumbnailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceThumbnail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailFindFirstArgs} args - Arguments to find a ServiceThumbnail
     * @example
     * // Get one ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceThumbnailFindFirstArgs>(args?: SelectSubset<T, ServiceThumbnailFindFirstArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceThumbnail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailFindFirstOrThrowArgs} args - Arguments to find a ServiceThumbnail
     * @example
     * // Get one ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceThumbnailFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceThumbnailFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceThumbnails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceThumbnails
     * const serviceThumbnails = await prisma.serviceThumbnail.findMany()
     * 
     * // Get first 10 ServiceThumbnails
     * const serviceThumbnails = await prisma.serviceThumbnail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceThumbnailWithIdOnly = await prisma.serviceThumbnail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceThumbnailFindManyArgs>(args?: SelectSubset<T, ServiceThumbnailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceThumbnail.
     * @param {ServiceThumbnailCreateArgs} args - Arguments to create a ServiceThumbnail.
     * @example
     * // Create one ServiceThumbnail
     * const ServiceThumbnail = await prisma.serviceThumbnail.create({
     *   data: {
     *     // ... data to create a ServiceThumbnail
     *   }
     * })
     * 
     */
    create<T extends ServiceThumbnailCreateArgs>(args: SelectSubset<T, ServiceThumbnailCreateArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceThumbnails.
     * @param {ServiceThumbnailCreateManyArgs} args - Arguments to create many ServiceThumbnails.
     * @example
     * // Create many ServiceThumbnails
     * const serviceThumbnail = await prisma.serviceThumbnail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceThumbnailCreateManyArgs>(args?: SelectSubset<T, ServiceThumbnailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceThumbnails and returns the data saved in the database.
     * @param {ServiceThumbnailCreateManyAndReturnArgs} args - Arguments to create many ServiceThumbnails.
     * @example
     * // Create many ServiceThumbnails
     * const serviceThumbnail = await prisma.serviceThumbnail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceThumbnails and only return the `id`
     * const serviceThumbnailWithIdOnly = await prisma.serviceThumbnail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceThumbnailCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceThumbnailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceThumbnail.
     * @param {ServiceThumbnailDeleteArgs} args - Arguments to delete one ServiceThumbnail.
     * @example
     * // Delete one ServiceThumbnail
     * const ServiceThumbnail = await prisma.serviceThumbnail.delete({
     *   where: {
     *     // ... filter to delete one ServiceThumbnail
     *   }
     * })
     * 
     */
    delete<T extends ServiceThumbnailDeleteArgs>(args: SelectSubset<T, ServiceThumbnailDeleteArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceThumbnail.
     * @param {ServiceThumbnailUpdateArgs} args - Arguments to update one ServiceThumbnail.
     * @example
     * // Update one ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceThumbnailUpdateArgs>(args: SelectSubset<T, ServiceThumbnailUpdateArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceThumbnails.
     * @param {ServiceThumbnailDeleteManyArgs} args - Arguments to filter ServiceThumbnails to delete.
     * @example
     * // Delete a few ServiceThumbnails
     * const { count } = await prisma.serviceThumbnail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceThumbnailDeleteManyArgs>(args?: SelectSubset<T, ServiceThumbnailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceThumbnails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceThumbnails
     * const serviceThumbnail = await prisma.serviceThumbnail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceThumbnailUpdateManyArgs>(args: SelectSubset<T, ServiceThumbnailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceThumbnails and returns the data updated in the database.
     * @param {ServiceThumbnailUpdateManyAndReturnArgs} args - Arguments to update many ServiceThumbnails.
     * @example
     * // Update many ServiceThumbnails
     * const serviceThumbnail = await prisma.serviceThumbnail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceThumbnails and only return the `id`
     * const serviceThumbnailWithIdOnly = await prisma.serviceThumbnail.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceThumbnailUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceThumbnailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceThumbnail.
     * @param {ServiceThumbnailUpsertArgs} args - Arguments to update or create a ServiceThumbnail.
     * @example
     * // Update or create a ServiceThumbnail
     * const serviceThumbnail = await prisma.serviceThumbnail.upsert({
     *   create: {
     *     // ... data to create a ServiceThumbnail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceThumbnail we want to update
     *   }
     * })
     */
    upsert<T extends ServiceThumbnailUpsertArgs>(args: SelectSubset<T, ServiceThumbnailUpsertArgs<ExtArgs>>): Prisma__ServiceThumbnailClient<$Result.GetResult<Prisma.$ServiceThumbnailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceThumbnails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailCountArgs} args - Arguments to filter ServiceThumbnails to count.
     * @example
     * // Count the number of ServiceThumbnails
     * const count = await prisma.serviceThumbnail.count({
     *   where: {
     *     // ... the filter for the ServiceThumbnails we want to count
     *   }
     * })
    **/
    count<T extends ServiceThumbnailCountArgs>(
      args?: Subset<T, ServiceThumbnailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceThumbnailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceThumbnail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceThumbnailAggregateArgs>(args: Subset<T, ServiceThumbnailAggregateArgs>): Prisma.PrismaPromise<GetServiceThumbnailAggregateType<T>>

    /**
     * Group by ServiceThumbnail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceThumbnailGroupByArgs} args - Group by arguments.
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
      T extends ServiceThumbnailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceThumbnailGroupByArgs['orderBy'] }
        : { orderBy?: ServiceThumbnailGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceThumbnailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceThumbnailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceThumbnail model
   */
  readonly fields: ServiceThumbnailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceThumbnail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceThumbnailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    services<T extends ServiceThumbnail$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceThumbnail$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceThumbnail model
   */
  interface ServiceThumbnailFieldRefs {
    readonly id: FieldRef<"ServiceThumbnail", 'String'>
    readonly url: FieldRef<"ServiceThumbnail", 'String'>
    readonly type: FieldRef<"ServiceThumbnail", 'ServiceThumbnailType'>
  }
    

  // Custom InputTypes
  /**
   * ServiceThumbnail findUnique
   */
  export type ServiceThumbnailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter, which ServiceThumbnail to fetch.
     */
    where: ServiceThumbnailWhereUniqueInput
  }

  /**
   * ServiceThumbnail findUniqueOrThrow
   */
  export type ServiceThumbnailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter, which ServiceThumbnail to fetch.
     */
    where: ServiceThumbnailWhereUniqueInput
  }

  /**
   * ServiceThumbnail findFirst
   */
  export type ServiceThumbnailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter, which ServiceThumbnail to fetch.
     */
    where?: ServiceThumbnailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceThumbnails to fetch.
     */
    orderBy?: ServiceThumbnailOrderByWithRelationInput | ServiceThumbnailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceThumbnails.
     */
    cursor?: ServiceThumbnailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceThumbnails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceThumbnails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceThumbnails.
     */
    distinct?: ServiceThumbnailScalarFieldEnum | ServiceThumbnailScalarFieldEnum[]
  }

  /**
   * ServiceThumbnail findFirstOrThrow
   */
  export type ServiceThumbnailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter, which ServiceThumbnail to fetch.
     */
    where?: ServiceThumbnailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceThumbnails to fetch.
     */
    orderBy?: ServiceThumbnailOrderByWithRelationInput | ServiceThumbnailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceThumbnails.
     */
    cursor?: ServiceThumbnailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceThumbnails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceThumbnails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceThumbnails.
     */
    distinct?: ServiceThumbnailScalarFieldEnum | ServiceThumbnailScalarFieldEnum[]
  }

  /**
   * ServiceThumbnail findMany
   */
  export type ServiceThumbnailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter, which ServiceThumbnails to fetch.
     */
    where?: ServiceThumbnailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceThumbnails to fetch.
     */
    orderBy?: ServiceThumbnailOrderByWithRelationInput | ServiceThumbnailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceThumbnails.
     */
    cursor?: ServiceThumbnailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceThumbnails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceThumbnails.
     */
    skip?: number
    distinct?: ServiceThumbnailScalarFieldEnum | ServiceThumbnailScalarFieldEnum[]
  }

  /**
   * ServiceThumbnail create
   */
  export type ServiceThumbnailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceThumbnail.
     */
    data: XOR<ServiceThumbnailCreateInput, ServiceThumbnailUncheckedCreateInput>
  }

  /**
   * ServiceThumbnail createMany
   */
  export type ServiceThumbnailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceThumbnails.
     */
    data: ServiceThumbnailCreateManyInput | ServiceThumbnailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceThumbnail createManyAndReturn
   */
  export type ServiceThumbnailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceThumbnails.
     */
    data: ServiceThumbnailCreateManyInput | ServiceThumbnailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceThumbnail update
   */
  export type ServiceThumbnailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceThumbnail.
     */
    data: XOR<ServiceThumbnailUpdateInput, ServiceThumbnailUncheckedUpdateInput>
    /**
     * Choose, which ServiceThumbnail to update.
     */
    where: ServiceThumbnailWhereUniqueInput
  }

  /**
   * ServiceThumbnail updateMany
   */
  export type ServiceThumbnailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceThumbnails.
     */
    data: XOR<ServiceThumbnailUpdateManyMutationInput, ServiceThumbnailUncheckedUpdateManyInput>
    /**
     * Filter which ServiceThumbnails to update
     */
    where?: ServiceThumbnailWhereInput
    /**
     * Limit how many ServiceThumbnails to update.
     */
    limit?: number
  }

  /**
   * ServiceThumbnail updateManyAndReturn
   */
  export type ServiceThumbnailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * The data used to update ServiceThumbnails.
     */
    data: XOR<ServiceThumbnailUpdateManyMutationInput, ServiceThumbnailUncheckedUpdateManyInput>
    /**
     * Filter which ServiceThumbnails to update
     */
    where?: ServiceThumbnailWhereInput
    /**
     * Limit how many ServiceThumbnails to update.
     */
    limit?: number
  }

  /**
   * ServiceThumbnail upsert
   */
  export type ServiceThumbnailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceThumbnail to update in case it exists.
     */
    where: ServiceThumbnailWhereUniqueInput
    /**
     * In case the ServiceThumbnail found by the `where` argument doesn't exist, create a new ServiceThumbnail with this data.
     */
    create: XOR<ServiceThumbnailCreateInput, ServiceThumbnailUncheckedCreateInput>
    /**
     * In case the ServiceThumbnail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceThumbnailUpdateInput, ServiceThumbnailUncheckedUpdateInput>
  }

  /**
   * ServiceThumbnail delete
   */
  export type ServiceThumbnailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
    /**
     * Filter which ServiceThumbnail to delete.
     */
    where: ServiceThumbnailWhereUniqueInput
  }

  /**
   * ServiceThumbnail deleteMany
   */
  export type ServiceThumbnailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceThumbnails to delete
     */
    where?: ServiceThumbnailWhereInput
    /**
     * Limit how many ServiceThumbnails to delete.
     */
    limit?: number
  }

  /**
   * ServiceThumbnail.services
   */
  export type ServiceThumbnail$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * ServiceThumbnail without action
   */
  export type ServiceThumbnailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceThumbnail
     */
    select?: ServiceThumbnailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceThumbnail
     */
    omit?: ServiceThumbnailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceThumbnailInclude<ExtArgs> | null
  }


  /**
   * Model ServiceBackgroundCover
   */

  export type AggregateServiceBackgroundCover = {
    _count: ServiceBackgroundCoverCountAggregateOutputType | null
    _min: ServiceBackgroundCoverMinAggregateOutputType | null
    _max: ServiceBackgroundCoverMaxAggregateOutputType | null
  }

  export type ServiceBackgroundCoverMinAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ServiceThumbnailType | null
  }

  export type ServiceBackgroundCoverMaxAggregateOutputType = {
    id: string | null
    url: string | null
    type: $Enums.ServiceThumbnailType | null
  }

  export type ServiceBackgroundCoverCountAggregateOutputType = {
    id: number
    url: number
    type: number
    _all: number
  }


  export type ServiceBackgroundCoverMinAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ServiceBackgroundCoverMaxAggregateInputType = {
    id?: true
    url?: true
    type?: true
  }

  export type ServiceBackgroundCoverCountAggregateInputType = {
    id?: true
    url?: true
    type?: true
    _all?: true
  }

  export type ServiceBackgroundCoverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceBackgroundCover to aggregate.
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceBackgroundCovers to fetch.
     */
    orderBy?: ServiceBackgroundCoverOrderByWithRelationInput | ServiceBackgroundCoverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceBackgroundCoverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceBackgroundCovers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceBackgroundCovers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceBackgroundCovers
    **/
    _count?: true | ServiceBackgroundCoverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceBackgroundCoverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceBackgroundCoverMaxAggregateInputType
  }

  export type GetServiceBackgroundCoverAggregateType<T extends ServiceBackgroundCoverAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceBackgroundCover]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceBackgroundCover[P]>
      : GetScalarType<T[P], AggregateServiceBackgroundCover[P]>
  }




  export type ServiceBackgroundCoverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceBackgroundCoverWhereInput
    orderBy?: ServiceBackgroundCoverOrderByWithAggregationInput | ServiceBackgroundCoverOrderByWithAggregationInput[]
    by: ServiceBackgroundCoverScalarFieldEnum[] | ServiceBackgroundCoverScalarFieldEnum
    having?: ServiceBackgroundCoverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceBackgroundCoverCountAggregateInputType | true
    _min?: ServiceBackgroundCoverMinAggregateInputType
    _max?: ServiceBackgroundCoverMaxAggregateInputType
  }

  export type ServiceBackgroundCoverGroupByOutputType = {
    id: string
    url: string
    type: $Enums.ServiceThumbnailType
    _count: ServiceBackgroundCoverCountAggregateOutputType | null
    _min: ServiceBackgroundCoverMinAggregateOutputType | null
    _max: ServiceBackgroundCoverMaxAggregateOutputType | null
  }

  type GetServiceBackgroundCoverGroupByPayload<T extends ServiceBackgroundCoverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceBackgroundCoverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceBackgroundCoverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceBackgroundCoverGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceBackgroundCoverGroupByOutputType[P]>
        }
      >
    >


  export type ServiceBackgroundCoverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
    services?: boolean | ServiceBackgroundCover$servicesArgs<ExtArgs>
    _count?: boolean | ServiceBackgroundCoverCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceBackgroundCover"]>

  export type ServiceBackgroundCoverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["serviceBackgroundCover"]>

  export type ServiceBackgroundCoverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
  }, ExtArgs["result"]["serviceBackgroundCover"]>

  export type ServiceBackgroundCoverSelectScalar = {
    id?: boolean
    url?: boolean
    type?: boolean
  }

  export type ServiceBackgroundCoverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "type", ExtArgs["result"]["serviceBackgroundCover"]>
  export type ServiceBackgroundCoverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceBackgroundCover$servicesArgs<ExtArgs>
    _count?: boolean | ServiceBackgroundCoverCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceBackgroundCoverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceBackgroundCoverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceBackgroundCoverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceBackgroundCover"
    objects: {
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      type: $Enums.ServiceThumbnailType
    }, ExtArgs["result"]["serviceBackgroundCover"]>
    composites: {}
  }

  type ServiceBackgroundCoverGetPayload<S extends boolean | null | undefined | ServiceBackgroundCoverDefaultArgs> = $Result.GetResult<Prisma.$ServiceBackgroundCoverPayload, S>

  type ServiceBackgroundCoverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceBackgroundCoverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceBackgroundCoverCountAggregateInputType | true
    }

  export interface ServiceBackgroundCoverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceBackgroundCover'], meta: { name: 'ServiceBackgroundCover' } }
    /**
     * Find zero or one ServiceBackgroundCover that matches the filter.
     * @param {ServiceBackgroundCoverFindUniqueArgs} args - Arguments to find a ServiceBackgroundCover
     * @example
     * // Get one ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceBackgroundCoverFindUniqueArgs>(args: SelectSubset<T, ServiceBackgroundCoverFindUniqueArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceBackgroundCover that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceBackgroundCoverFindUniqueOrThrowArgs} args - Arguments to find a ServiceBackgroundCover
     * @example
     * // Get one ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceBackgroundCoverFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceBackgroundCoverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceBackgroundCover that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverFindFirstArgs} args - Arguments to find a ServiceBackgroundCover
     * @example
     * // Get one ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceBackgroundCoverFindFirstArgs>(args?: SelectSubset<T, ServiceBackgroundCoverFindFirstArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceBackgroundCover that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverFindFirstOrThrowArgs} args - Arguments to find a ServiceBackgroundCover
     * @example
     * // Get one ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceBackgroundCoverFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceBackgroundCoverFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceBackgroundCovers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceBackgroundCovers
     * const serviceBackgroundCovers = await prisma.serviceBackgroundCover.findMany()
     * 
     * // Get first 10 ServiceBackgroundCovers
     * const serviceBackgroundCovers = await prisma.serviceBackgroundCover.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceBackgroundCoverWithIdOnly = await prisma.serviceBackgroundCover.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceBackgroundCoverFindManyArgs>(args?: SelectSubset<T, ServiceBackgroundCoverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceBackgroundCover.
     * @param {ServiceBackgroundCoverCreateArgs} args - Arguments to create a ServiceBackgroundCover.
     * @example
     * // Create one ServiceBackgroundCover
     * const ServiceBackgroundCover = await prisma.serviceBackgroundCover.create({
     *   data: {
     *     // ... data to create a ServiceBackgroundCover
     *   }
     * })
     * 
     */
    create<T extends ServiceBackgroundCoverCreateArgs>(args: SelectSubset<T, ServiceBackgroundCoverCreateArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceBackgroundCovers.
     * @param {ServiceBackgroundCoverCreateManyArgs} args - Arguments to create many ServiceBackgroundCovers.
     * @example
     * // Create many ServiceBackgroundCovers
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceBackgroundCoverCreateManyArgs>(args?: SelectSubset<T, ServiceBackgroundCoverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceBackgroundCovers and returns the data saved in the database.
     * @param {ServiceBackgroundCoverCreateManyAndReturnArgs} args - Arguments to create many ServiceBackgroundCovers.
     * @example
     * // Create many ServiceBackgroundCovers
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceBackgroundCovers and only return the `id`
     * const serviceBackgroundCoverWithIdOnly = await prisma.serviceBackgroundCover.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceBackgroundCoverCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceBackgroundCoverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceBackgroundCover.
     * @param {ServiceBackgroundCoverDeleteArgs} args - Arguments to delete one ServiceBackgroundCover.
     * @example
     * // Delete one ServiceBackgroundCover
     * const ServiceBackgroundCover = await prisma.serviceBackgroundCover.delete({
     *   where: {
     *     // ... filter to delete one ServiceBackgroundCover
     *   }
     * })
     * 
     */
    delete<T extends ServiceBackgroundCoverDeleteArgs>(args: SelectSubset<T, ServiceBackgroundCoverDeleteArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceBackgroundCover.
     * @param {ServiceBackgroundCoverUpdateArgs} args - Arguments to update one ServiceBackgroundCover.
     * @example
     * // Update one ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceBackgroundCoverUpdateArgs>(args: SelectSubset<T, ServiceBackgroundCoverUpdateArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceBackgroundCovers.
     * @param {ServiceBackgroundCoverDeleteManyArgs} args - Arguments to filter ServiceBackgroundCovers to delete.
     * @example
     * // Delete a few ServiceBackgroundCovers
     * const { count } = await prisma.serviceBackgroundCover.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceBackgroundCoverDeleteManyArgs>(args?: SelectSubset<T, ServiceBackgroundCoverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceBackgroundCovers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceBackgroundCovers
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceBackgroundCoverUpdateManyArgs>(args: SelectSubset<T, ServiceBackgroundCoverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceBackgroundCovers and returns the data updated in the database.
     * @param {ServiceBackgroundCoverUpdateManyAndReturnArgs} args - Arguments to update many ServiceBackgroundCovers.
     * @example
     * // Update many ServiceBackgroundCovers
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceBackgroundCovers and only return the `id`
     * const serviceBackgroundCoverWithIdOnly = await prisma.serviceBackgroundCover.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceBackgroundCoverUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceBackgroundCoverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceBackgroundCover.
     * @param {ServiceBackgroundCoverUpsertArgs} args - Arguments to update or create a ServiceBackgroundCover.
     * @example
     * // Update or create a ServiceBackgroundCover
     * const serviceBackgroundCover = await prisma.serviceBackgroundCover.upsert({
     *   create: {
     *     // ... data to create a ServiceBackgroundCover
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceBackgroundCover we want to update
     *   }
     * })
     */
    upsert<T extends ServiceBackgroundCoverUpsertArgs>(args: SelectSubset<T, ServiceBackgroundCoverUpsertArgs<ExtArgs>>): Prisma__ServiceBackgroundCoverClient<$Result.GetResult<Prisma.$ServiceBackgroundCoverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceBackgroundCovers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverCountArgs} args - Arguments to filter ServiceBackgroundCovers to count.
     * @example
     * // Count the number of ServiceBackgroundCovers
     * const count = await prisma.serviceBackgroundCover.count({
     *   where: {
     *     // ... the filter for the ServiceBackgroundCovers we want to count
     *   }
     * })
    **/
    count<T extends ServiceBackgroundCoverCountArgs>(
      args?: Subset<T, ServiceBackgroundCoverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceBackgroundCoverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceBackgroundCover.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceBackgroundCoverAggregateArgs>(args: Subset<T, ServiceBackgroundCoverAggregateArgs>): Prisma.PrismaPromise<GetServiceBackgroundCoverAggregateType<T>>

    /**
     * Group by ServiceBackgroundCover.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceBackgroundCoverGroupByArgs} args - Group by arguments.
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
      T extends ServiceBackgroundCoverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceBackgroundCoverGroupByArgs['orderBy'] }
        : { orderBy?: ServiceBackgroundCoverGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceBackgroundCoverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceBackgroundCoverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceBackgroundCover model
   */
  readonly fields: ServiceBackgroundCoverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceBackgroundCover.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceBackgroundCoverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    services<T extends ServiceBackgroundCover$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceBackgroundCover$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceBackgroundCover model
   */
  interface ServiceBackgroundCoverFieldRefs {
    readonly id: FieldRef<"ServiceBackgroundCover", 'String'>
    readonly url: FieldRef<"ServiceBackgroundCover", 'String'>
    readonly type: FieldRef<"ServiceBackgroundCover", 'ServiceThumbnailType'>
  }
    

  // Custom InputTypes
  /**
   * ServiceBackgroundCover findUnique
   */
  export type ServiceBackgroundCoverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter, which ServiceBackgroundCover to fetch.
     */
    where: ServiceBackgroundCoverWhereUniqueInput
  }

  /**
   * ServiceBackgroundCover findUniqueOrThrow
   */
  export type ServiceBackgroundCoverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter, which ServiceBackgroundCover to fetch.
     */
    where: ServiceBackgroundCoverWhereUniqueInput
  }

  /**
   * ServiceBackgroundCover findFirst
   */
  export type ServiceBackgroundCoverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter, which ServiceBackgroundCover to fetch.
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceBackgroundCovers to fetch.
     */
    orderBy?: ServiceBackgroundCoverOrderByWithRelationInput | ServiceBackgroundCoverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceBackgroundCovers.
     */
    cursor?: ServiceBackgroundCoverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceBackgroundCovers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceBackgroundCovers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceBackgroundCovers.
     */
    distinct?: ServiceBackgroundCoverScalarFieldEnum | ServiceBackgroundCoverScalarFieldEnum[]
  }

  /**
   * ServiceBackgroundCover findFirstOrThrow
   */
  export type ServiceBackgroundCoverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter, which ServiceBackgroundCover to fetch.
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceBackgroundCovers to fetch.
     */
    orderBy?: ServiceBackgroundCoverOrderByWithRelationInput | ServiceBackgroundCoverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceBackgroundCovers.
     */
    cursor?: ServiceBackgroundCoverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceBackgroundCovers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceBackgroundCovers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceBackgroundCovers.
     */
    distinct?: ServiceBackgroundCoverScalarFieldEnum | ServiceBackgroundCoverScalarFieldEnum[]
  }

  /**
   * ServiceBackgroundCover findMany
   */
  export type ServiceBackgroundCoverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter, which ServiceBackgroundCovers to fetch.
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceBackgroundCovers to fetch.
     */
    orderBy?: ServiceBackgroundCoverOrderByWithRelationInput | ServiceBackgroundCoverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceBackgroundCovers.
     */
    cursor?: ServiceBackgroundCoverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceBackgroundCovers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceBackgroundCovers.
     */
    skip?: number
    distinct?: ServiceBackgroundCoverScalarFieldEnum | ServiceBackgroundCoverScalarFieldEnum[]
  }

  /**
   * ServiceBackgroundCover create
   */
  export type ServiceBackgroundCoverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceBackgroundCover.
     */
    data: XOR<ServiceBackgroundCoverCreateInput, ServiceBackgroundCoverUncheckedCreateInput>
  }

  /**
   * ServiceBackgroundCover createMany
   */
  export type ServiceBackgroundCoverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceBackgroundCovers.
     */
    data: ServiceBackgroundCoverCreateManyInput | ServiceBackgroundCoverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceBackgroundCover createManyAndReturn
   */
  export type ServiceBackgroundCoverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceBackgroundCovers.
     */
    data: ServiceBackgroundCoverCreateManyInput | ServiceBackgroundCoverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceBackgroundCover update
   */
  export type ServiceBackgroundCoverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceBackgroundCover.
     */
    data: XOR<ServiceBackgroundCoverUpdateInput, ServiceBackgroundCoverUncheckedUpdateInput>
    /**
     * Choose, which ServiceBackgroundCover to update.
     */
    where: ServiceBackgroundCoverWhereUniqueInput
  }

  /**
   * ServiceBackgroundCover updateMany
   */
  export type ServiceBackgroundCoverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceBackgroundCovers.
     */
    data: XOR<ServiceBackgroundCoverUpdateManyMutationInput, ServiceBackgroundCoverUncheckedUpdateManyInput>
    /**
     * Filter which ServiceBackgroundCovers to update
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * Limit how many ServiceBackgroundCovers to update.
     */
    limit?: number
  }

  /**
   * ServiceBackgroundCover updateManyAndReturn
   */
  export type ServiceBackgroundCoverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * The data used to update ServiceBackgroundCovers.
     */
    data: XOR<ServiceBackgroundCoverUpdateManyMutationInput, ServiceBackgroundCoverUncheckedUpdateManyInput>
    /**
     * Filter which ServiceBackgroundCovers to update
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * Limit how many ServiceBackgroundCovers to update.
     */
    limit?: number
  }

  /**
   * ServiceBackgroundCover upsert
   */
  export type ServiceBackgroundCoverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceBackgroundCover to update in case it exists.
     */
    where: ServiceBackgroundCoverWhereUniqueInput
    /**
     * In case the ServiceBackgroundCover found by the `where` argument doesn't exist, create a new ServiceBackgroundCover with this data.
     */
    create: XOR<ServiceBackgroundCoverCreateInput, ServiceBackgroundCoverUncheckedCreateInput>
    /**
     * In case the ServiceBackgroundCover was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceBackgroundCoverUpdateInput, ServiceBackgroundCoverUncheckedUpdateInput>
  }

  /**
   * ServiceBackgroundCover delete
   */
  export type ServiceBackgroundCoverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
    /**
     * Filter which ServiceBackgroundCover to delete.
     */
    where: ServiceBackgroundCoverWhereUniqueInput
  }

  /**
   * ServiceBackgroundCover deleteMany
   */
  export type ServiceBackgroundCoverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceBackgroundCovers to delete
     */
    where?: ServiceBackgroundCoverWhereInput
    /**
     * Limit how many ServiceBackgroundCovers to delete.
     */
    limit?: number
  }

  /**
   * ServiceBackgroundCover.services
   */
  export type ServiceBackgroundCover$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * ServiceBackgroundCover without action
   */
  export type ServiceBackgroundCoverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceBackgroundCover
     */
    select?: ServiceBackgroundCoverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceBackgroundCover
     */
    omit?: ServiceBackgroundCoverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceBackgroundCoverInclude<ExtArgs> | null
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


  export const PostScalarFieldEnum: {
    id: 'id',
    thumbnailUrl: 'thumbnailUrl',
    bgCoverUrl: 'bgCoverUrl',
    countView: 'countView',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostTranslationScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    language: 'language',
    slug: 'slug',
    title: 'title',
    shortDescription: 'shortDescription',
    content: 'content',
    tags: 'tags',
    seoTitle: 'seoTitle',
    seoDescription: 'seoDescription',
    seoKeywords: 'seoKeywords'
  };

  export type PostTranslationScalarFieldEnum = (typeof PostTranslationScalarFieldEnum)[keyof typeof PostTranslationScalarFieldEnum]


  export const ServiceTypeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceTypeScalarFieldEnum = (typeof ServiceTypeScalarFieldEnum)[keyof typeof ServiceTypeScalarFieldEnum]


  export const ServiceTypeTranslationScalarFieldEnum: {
    id: 'id',
    serviceTypeId: 'serviceTypeId',
    language: 'language',
    displayName: 'displayName',
    description: 'description',
    brochureUrl: 'brochureUrl'
  };

  export type ServiceTypeTranslationScalarFieldEnum = (typeof ServiceTypeTranslationScalarFieldEnum)[keyof typeof ServiceTypeTranslationScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    serviceTypeId: 'serviceTypeId',
    thumbnailId: 'thumbnailId',
    backgroundCoverId: 'backgroundCoverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ServiceTranslationScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    language: 'language',
    slug: 'slug',
    title: 'title',
    description: 'description',
    shortDescription: 'shortDescription',
    content: 'content',
    seoTitle: 'seoTitle',
    seoDescription: 'seoDescription',
    seoKeywords: 'seoKeywords'
  };

  export type ServiceTranslationScalarFieldEnum = (typeof ServiceTranslationScalarFieldEnum)[keyof typeof ServiceTranslationScalarFieldEnum]


  export const ServiceThumbnailScalarFieldEnum: {
    id: 'id',
    url: 'url',
    type: 'type'
  };

  export type ServiceThumbnailScalarFieldEnum = (typeof ServiceThumbnailScalarFieldEnum)[keyof typeof ServiceThumbnailScalarFieldEnum]


  export const ServiceBackgroundCoverScalarFieldEnum: {
    id: 'id',
    url: 'url',
    type: 'type'
  };

  export type ServiceBackgroundCoverScalarFieldEnum = (typeof ServiceBackgroundCoverScalarFieldEnum)[keyof typeof ServiceBackgroundCoverScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Language'
   */
  export type EnumLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Language'>
    


  /**
   * Reference to a field of type 'Language[]'
   */
  export type ListEnumLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Language[]'>
    


  /**
   * Reference to a field of type 'ServiceThumbnailType'
   */
  export type EnumServiceThumbnailTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceThumbnailType'>
    


  /**
   * Reference to a field of type 'ServiceThumbnailType[]'
   */
  export type ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceThumbnailType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    thumbnailUrl?: StringFilter<"Post"> | string
    bgCoverUrl?: StringNullableFilter<"Post"> | string | null
    countView?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    translations?: PostTranslationListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    thumbnailUrl?: SortOrder
    bgCoverUrl?: SortOrderInput | SortOrder
    countView?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    translations?: PostTranslationOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    thumbnailUrl?: StringFilter<"Post"> | string
    bgCoverUrl?: StringNullableFilter<"Post"> | string | null
    countView?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    translations?: PostTranslationListRelationFilter
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    thumbnailUrl?: SortOrder
    bgCoverUrl?: SortOrderInput | SortOrder
    countView?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    thumbnailUrl?: StringWithAggregatesFilter<"Post"> | string
    bgCoverUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    countView?: IntWithAggregatesFilter<"Post"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type PostTranslationWhereInput = {
    AND?: PostTranslationWhereInput | PostTranslationWhereInput[]
    OR?: PostTranslationWhereInput[]
    NOT?: PostTranslationWhereInput | PostTranslationWhereInput[]
    id?: StringFilter<"PostTranslation"> | string
    postId?: StringFilter<"PostTranslation"> | string
    language?: EnumLanguageFilter<"PostTranslation"> | $Enums.Language
    slug?: StringFilter<"PostTranslation"> | string
    title?: StringFilter<"PostTranslation"> | string
    shortDescription?: StringNullableFilter<"PostTranslation"> | string | null
    content?: StringFilter<"PostTranslation"> | string
    tags?: StringNullableListFilter<"PostTranslation">
    seoTitle?: StringNullableFilter<"PostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"PostTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"PostTranslation">
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostTranslationOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrderInput | SortOrder
    content?: SortOrder
    tags?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    seoKeywords?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type PostTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    postId_language?: PostTranslationPostIdLanguageCompoundUniqueInput
    AND?: PostTranslationWhereInput | PostTranslationWhereInput[]
    OR?: PostTranslationWhereInput[]
    NOT?: PostTranslationWhereInput | PostTranslationWhereInput[]
    postId?: StringFilter<"PostTranslation"> | string
    language?: EnumLanguageFilter<"PostTranslation"> | $Enums.Language
    title?: StringFilter<"PostTranslation"> | string
    shortDescription?: StringNullableFilter<"PostTranslation"> | string | null
    content?: StringFilter<"PostTranslation"> | string
    tags?: StringNullableListFilter<"PostTranslation">
    seoTitle?: StringNullableFilter<"PostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"PostTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"PostTranslation">
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id" | "slug" | "postId_language">

  export type PostTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrderInput | SortOrder
    content?: SortOrder
    tags?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    seoKeywords?: SortOrder
    _count?: PostTranslationCountOrderByAggregateInput
    _max?: PostTranslationMaxOrderByAggregateInput
    _min?: PostTranslationMinOrderByAggregateInput
  }

  export type PostTranslationScalarWhereWithAggregatesInput = {
    AND?: PostTranslationScalarWhereWithAggregatesInput | PostTranslationScalarWhereWithAggregatesInput[]
    OR?: PostTranslationScalarWhereWithAggregatesInput[]
    NOT?: PostTranslationScalarWhereWithAggregatesInput | PostTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostTranslation"> | string
    postId?: StringWithAggregatesFilter<"PostTranslation"> | string
    language?: EnumLanguageWithAggregatesFilter<"PostTranslation"> | $Enums.Language
    slug?: StringWithAggregatesFilter<"PostTranslation"> | string
    title?: StringWithAggregatesFilter<"PostTranslation"> | string
    shortDescription?: StringNullableWithAggregatesFilter<"PostTranslation"> | string | null
    content?: StringWithAggregatesFilter<"PostTranslation"> | string
    tags?: StringNullableListFilter<"PostTranslation">
    seoTitle?: StringNullableWithAggregatesFilter<"PostTranslation"> | string | null
    seoDescription?: StringNullableWithAggregatesFilter<"PostTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"PostTranslation">
  }

  export type ServiceTypeWhereInput = {
    AND?: ServiceTypeWhereInput | ServiceTypeWhereInput[]
    OR?: ServiceTypeWhereInput[]
    NOT?: ServiceTypeWhereInput | ServiceTypeWhereInput[]
    id?: StringFilter<"ServiceType"> | string
    code?: StringFilter<"ServiceType"> | string
    createdAt?: DateTimeFilter<"ServiceType"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceType"> | Date | string
    services?: ServiceListRelationFilter
    translations?: ServiceTypeTranslationListRelationFilter
  }

  export type ServiceTypeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    translations?: ServiceTypeTranslationOrderByRelationAggregateInput
  }

  export type ServiceTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ServiceTypeWhereInput | ServiceTypeWhereInput[]
    OR?: ServiceTypeWhereInput[]
    NOT?: ServiceTypeWhereInput | ServiceTypeWhereInput[]
    createdAt?: DateTimeFilter<"ServiceType"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceType"> | Date | string
    services?: ServiceListRelationFilter
    translations?: ServiceTypeTranslationListRelationFilter
  }, "id" | "code">

  export type ServiceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceTypeCountOrderByAggregateInput
    _max?: ServiceTypeMaxOrderByAggregateInput
    _min?: ServiceTypeMinOrderByAggregateInput
  }

  export type ServiceTypeScalarWhereWithAggregatesInput = {
    AND?: ServiceTypeScalarWhereWithAggregatesInput | ServiceTypeScalarWhereWithAggregatesInput[]
    OR?: ServiceTypeScalarWhereWithAggregatesInput[]
    NOT?: ServiceTypeScalarWhereWithAggregatesInput | ServiceTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceType"> | string
    code?: StringWithAggregatesFilter<"ServiceType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceType"> | Date | string
  }

  export type ServiceTypeTranslationWhereInput = {
    AND?: ServiceTypeTranslationWhereInput | ServiceTypeTranslationWhereInput[]
    OR?: ServiceTypeTranslationWhereInput[]
    NOT?: ServiceTypeTranslationWhereInput | ServiceTypeTranslationWhereInput[]
    id?: StringFilter<"ServiceTypeTranslation"> | string
    serviceTypeId?: StringFilter<"ServiceTypeTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTypeTranslation"> | $Enums.Language
    displayName?: StringFilter<"ServiceTypeTranslation"> | string
    description?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
    brochureUrl?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
    serviceType?: XOR<ServiceTypeScalarRelationFilter, ServiceTypeWhereInput>
  }

  export type ServiceTypeTranslationOrderByWithRelationInput = {
    id?: SortOrder
    serviceTypeId?: SortOrder
    language?: SortOrder
    displayName?: SortOrder
    description?: SortOrderInput | SortOrder
    brochureUrl?: SortOrderInput | SortOrder
    serviceType?: ServiceTypeOrderByWithRelationInput
  }

  export type ServiceTypeTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serviceTypeId_language?: ServiceTypeTranslationServiceTypeIdLanguageCompoundUniqueInput
    AND?: ServiceTypeTranslationWhereInput | ServiceTypeTranslationWhereInput[]
    OR?: ServiceTypeTranslationWhereInput[]
    NOT?: ServiceTypeTranslationWhereInput | ServiceTypeTranslationWhereInput[]
    serviceTypeId?: StringFilter<"ServiceTypeTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTypeTranslation"> | $Enums.Language
    displayName?: StringFilter<"ServiceTypeTranslation"> | string
    description?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
    brochureUrl?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
    serviceType?: XOR<ServiceTypeScalarRelationFilter, ServiceTypeWhereInput>
  }, "id" | "serviceTypeId_language">

  export type ServiceTypeTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    serviceTypeId?: SortOrder
    language?: SortOrder
    displayName?: SortOrder
    description?: SortOrderInput | SortOrder
    brochureUrl?: SortOrderInput | SortOrder
    _count?: ServiceTypeTranslationCountOrderByAggregateInput
    _max?: ServiceTypeTranslationMaxOrderByAggregateInput
    _min?: ServiceTypeTranslationMinOrderByAggregateInput
  }

  export type ServiceTypeTranslationScalarWhereWithAggregatesInput = {
    AND?: ServiceTypeTranslationScalarWhereWithAggregatesInput | ServiceTypeTranslationScalarWhereWithAggregatesInput[]
    OR?: ServiceTypeTranslationScalarWhereWithAggregatesInput[]
    NOT?: ServiceTypeTranslationScalarWhereWithAggregatesInput | ServiceTypeTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceTypeTranslation"> | string
    serviceTypeId?: StringWithAggregatesFilter<"ServiceTypeTranslation"> | string
    language?: EnumLanguageWithAggregatesFilter<"ServiceTypeTranslation"> | $Enums.Language
    displayName?: StringWithAggregatesFilter<"ServiceTypeTranslation"> | string
    description?: StringNullableWithAggregatesFilter<"ServiceTypeTranslation"> | string | null
    brochureUrl?: StringNullableWithAggregatesFilter<"ServiceTypeTranslation"> | string | null
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    orderNumber?: IntFilter<"Service"> | number
    serviceTypeId?: StringNullableFilter<"Service"> | string | null
    thumbnailId?: StringNullableFilter<"Service"> | string | null
    backgroundCoverId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    serviceType?: XOR<ServiceTypeNullableScalarRelationFilter, ServiceTypeWhereInput> | null
    translations?: ServiceTranslationListRelationFilter
    thumbnail?: XOR<ServiceThumbnailNullableScalarRelationFilter, ServiceThumbnailWhereInput> | null
    backgroundCover?: XOR<ServiceBackgroundCoverNullableScalarRelationFilter, ServiceBackgroundCoverWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    serviceTypeId?: SortOrderInput | SortOrder
    thumbnailId?: SortOrderInput | SortOrder
    backgroundCoverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    serviceType?: ServiceTypeOrderByWithRelationInput
    translations?: ServiceTranslationOrderByRelationAggregateInput
    thumbnail?: ServiceThumbnailOrderByWithRelationInput
    backgroundCover?: ServiceBackgroundCoverOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNumber?: number
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    serviceTypeId?: StringNullableFilter<"Service"> | string | null
    thumbnailId?: StringNullableFilter<"Service"> | string | null
    backgroundCoverId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    serviceType?: XOR<ServiceTypeNullableScalarRelationFilter, ServiceTypeWhereInput> | null
    translations?: ServiceTranslationListRelationFilter
    thumbnail?: XOR<ServiceThumbnailNullableScalarRelationFilter, ServiceThumbnailWhereInput> | null
    backgroundCover?: XOR<ServiceBackgroundCoverNullableScalarRelationFilter, ServiceBackgroundCoverWhereInput> | null
  }, "id" | "orderNumber">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    serviceTypeId?: SortOrderInput | SortOrder
    thumbnailId?: SortOrderInput | SortOrder
    backgroundCoverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    orderNumber?: IntWithAggregatesFilter<"Service"> | number
    serviceTypeId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    thumbnailId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    backgroundCoverId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type ServiceTranslationWhereInput = {
    AND?: ServiceTranslationWhereInput | ServiceTranslationWhereInput[]
    OR?: ServiceTranslationWhereInput[]
    NOT?: ServiceTranslationWhereInput | ServiceTranslationWhereInput[]
    id?: StringFilter<"ServiceTranslation"> | string
    serviceId?: StringFilter<"ServiceTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTranslation"> | $Enums.Language
    slug?: StringFilter<"ServiceTranslation"> | string
    title?: StringFilter<"ServiceTranslation"> | string
    description?: StringFilter<"ServiceTranslation"> | string
    shortDescription?: StringFilter<"ServiceTranslation"> | string
    content?: StringFilter<"ServiceTranslation"> | string
    seoTitle?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoDescription?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"ServiceTranslation">
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ServiceTranslationOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    seoKeywords?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    serviceId_language?: ServiceTranslationServiceIdLanguageCompoundUniqueInput
    AND?: ServiceTranslationWhereInput | ServiceTranslationWhereInput[]
    OR?: ServiceTranslationWhereInput[]
    NOT?: ServiceTranslationWhereInput | ServiceTranslationWhereInput[]
    serviceId?: StringFilter<"ServiceTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTranslation"> | $Enums.Language
    title?: StringFilter<"ServiceTranslation"> | string
    description?: StringFilter<"ServiceTranslation"> | string
    shortDescription?: StringFilter<"ServiceTranslation"> | string
    content?: StringFilter<"ServiceTranslation"> | string
    seoTitle?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoDescription?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"ServiceTranslation">
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id" | "slug" | "serviceId_language">

  export type ServiceTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    seoKeywords?: SortOrder
    _count?: ServiceTranslationCountOrderByAggregateInput
    _max?: ServiceTranslationMaxOrderByAggregateInput
    _min?: ServiceTranslationMinOrderByAggregateInput
  }

  export type ServiceTranslationScalarWhereWithAggregatesInput = {
    AND?: ServiceTranslationScalarWhereWithAggregatesInput | ServiceTranslationScalarWhereWithAggregatesInput[]
    OR?: ServiceTranslationScalarWhereWithAggregatesInput[]
    NOT?: ServiceTranslationScalarWhereWithAggregatesInput | ServiceTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    serviceId?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    language?: EnumLanguageWithAggregatesFilter<"ServiceTranslation"> | $Enums.Language
    slug?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    title?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    description?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    shortDescription?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    content?: StringWithAggregatesFilter<"ServiceTranslation"> | string
    seoTitle?: StringNullableWithAggregatesFilter<"ServiceTranslation"> | string | null
    seoDescription?: StringNullableWithAggregatesFilter<"ServiceTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"ServiceTranslation">
  }

  export type ServiceThumbnailWhereInput = {
    AND?: ServiceThumbnailWhereInput | ServiceThumbnailWhereInput[]
    OR?: ServiceThumbnailWhereInput[]
    NOT?: ServiceThumbnailWhereInput | ServiceThumbnailWhereInput[]
    id?: StringFilter<"ServiceThumbnail"> | string
    url?: StringFilter<"ServiceThumbnail"> | string
    type?: EnumServiceThumbnailTypeFilter<"ServiceThumbnail"> | $Enums.ServiceThumbnailType
    services?: ServiceListRelationFilter
  }

  export type ServiceThumbnailOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
  }

  export type ServiceThumbnailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceThumbnailWhereInput | ServiceThumbnailWhereInput[]
    OR?: ServiceThumbnailWhereInput[]
    NOT?: ServiceThumbnailWhereInput | ServiceThumbnailWhereInput[]
    url?: StringFilter<"ServiceThumbnail"> | string
    type?: EnumServiceThumbnailTypeFilter<"ServiceThumbnail"> | $Enums.ServiceThumbnailType
    services?: ServiceListRelationFilter
  }, "id">

  export type ServiceThumbnailOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    _count?: ServiceThumbnailCountOrderByAggregateInput
    _max?: ServiceThumbnailMaxOrderByAggregateInput
    _min?: ServiceThumbnailMinOrderByAggregateInput
  }

  export type ServiceThumbnailScalarWhereWithAggregatesInput = {
    AND?: ServiceThumbnailScalarWhereWithAggregatesInput | ServiceThumbnailScalarWhereWithAggregatesInput[]
    OR?: ServiceThumbnailScalarWhereWithAggregatesInput[]
    NOT?: ServiceThumbnailScalarWhereWithAggregatesInput | ServiceThumbnailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceThumbnail"> | string
    url?: StringWithAggregatesFilter<"ServiceThumbnail"> | string
    type?: EnumServiceThumbnailTypeWithAggregatesFilter<"ServiceThumbnail"> | $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverWhereInput = {
    AND?: ServiceBackgroundCoverWhereInput | ServiceBackgroundCoverWhereInput[]
    OR?: ServiceBackgroundCoverWhereInput[]
    NOT?: ServiceBackgroundCoverWhereInput | ServiceBackgroundCoverWhereInput[]
    id?: StringFilter<"ServiceBackgroundCover"> | string
    url?: StringFilter<"ServiceBackgroundCover"> | string
    type?: EnumServiceThumbnailTypeFilter<"ServiceBackgroundCover"> | $Enums.ServiceThumbnailType
    services?: ServiceListRelationFilter
  }

  export type ServiceBackgroundCoverOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
  }

  export type ServiceBackgroundCoverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceBackgroundCoverWhereInput | ServiceBackgroundCoverWhereInput[]
    OR?: ServiceBackgroundCoverWhereInput[]
    NOT?: ServiceBackgroundCoverWhereInput | ServiceBackgroundCoverWhereInput[]
    url?: StringFilter<"ServiceBackgroundCover"> | string
    type?: EnumServiceThumbnailTypeFilter<"ServiceBackgroundCover"> | $Enums.ServiceThumbnailType
    services?: ServiceListRelationFilter
  }, "id">

  export type ServiceBackgroundCoverOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    _count?: ServiceBackgroundCoverCountOrderByAggregateInput
    _max?: ServiceBackgroundCoverMaxOrderByAggregateInput
    _min?: ServiceBackgroundCoverMinOrderByAggregateInput
  }

  export type ServiceBackgroundCoverScalarWhereWithAggregatesInput = {
    AND?: ServiceBackgroundCoverScalarWhereWithAggregatesInput | ServiceBackgroundCoverScalarWhereWithAggregatesInput[]
    OR?: ServiceBackgroundCoverScalarWhereWithAggregatesInput[]
    NOT?: ServiceBackgroundCoverScalarWhereWithAggregatesInput | ServiceBackgroundCoverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceBackgroundCover"> | string
    url?: StringWithAggregatesFilter<"ServiceBackgroundCover"> | string
    type?: EnumServiceThumbnailTypeWithAggregatesFilter<"ServiceBackgroundCover"> | $Enums.ServiceThumbnailType
  }

  export type PostCreateInput = {
    id?: string
    thumbnailUrl: string
    bgCoverUrl?: string | null
    countView?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: PostTranslationCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    thumbnailUrl: string
    bgCoverUrl?: string | null
    countView?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: PostTranslationUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: PostTranslationUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: PostTranslationUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    thumbnailUrl: string
    bgCoverUrl?: string | null
    countView?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostTranslationCreateInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
    post: PostCreateNestedOneWithoutTranslationsInput
  }

  export type PostTranslationUncheckedCreateInput = {
    id?: string
    postId: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
  }

  export type PostTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
    post?: PostUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type PostTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type PostTranslationCreateManyInput = {
    id?: string
    postId: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
  }

  export type PostTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type PostTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceTypeCreateInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutServiceTypeInput
    translations?: ServiceTypeTranslationCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeUncheckedCreateInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutServiceTypeInput
    translations?: ServiceTypeTranslationUncheckedCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutServiceTypeNestedInput
    translations?: ServiceTypeTranslationUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutServiceTypeNestedInput
    translations?: ServiceTypeTranslationUncheckedUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTypeCreateManyInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceTypeTranslationCreateInput = {
    id?: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
    serviceType: ServiceTypeCreateNestedOneWithoutTranslationsInput
  }

  export type ServiceTypeTranslationUncheckedCreateInput = {
    id?: string
    serviceTypeId: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
  }

  export type ServiceTypeTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    serviceType?: ServiceTypeUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type ServiceTypeTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceTypeId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceTypeTranslationCreateManyInput = {
    id?: string
    serviceTypeId: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
  }

  export type ServiceTypeTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceTypeTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceTypeId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceCreateInput = {
    id?: string
    orderNumber: number
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceType?: ServiceTypeCreateNestedOneWithoutServicesInput
    translations?: ServiceTranslationCreateNestedManyWithoutServiceInput
    thumbnail?: ServiceThumbnailCreateNestedOneWithoutServicesInput
    backgroundCover?: ServiceBackgroundCoverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    thumbnailId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTranslationUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceType?: ServiceTypeUpdateOneWithoutServicesNestedInput
    translations?: ServiceTranslationUpdateManyWithoutServiceNestedInput
    thumbnail?: ServiceThumbnailUpdateOneWithoutServicesNestedInput
    backgroundCover?: ServiceBackgroundCoverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTranslationUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    thumbnailId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceTranslationCreateInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
    service: ServiceCreateNestedOneWithoutTranslationsInput
  }

  export type ServiceTranslationUncheckedCreateInput = {
    id?: string
    serviceId: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
    service?: ServiceUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type ServiceTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceTranslationCreateManyInput = {
    id?: string
    serviceId: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceThumbnailCreateInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
    services?: ServiceCreateNestedManyWithoutThumbnailInput
  }

  export type ServiceThumbnailUncheckedCreateInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
    services?: ServiceUncheckedCreateNestedManyWithoutThumbnailInput
  }

  export type ServiceThumbnailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
    services?: ServiceUpdateManyWithoutThumbnailNestedInput
  }

  export type ServiceThumbnailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
    services?: ServiceUncheckedUpdateManyWithoutThumbnailNestedInput
  }

  export type ServiceThumbnailCreateManyInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverCreateInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
    services?: ServiceCreateNestedManyWithoutBackgroundCoverInput
  }

  export type ServiceBackgroundCoverUncheckedCreateInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
    services?: ServiceUncheckedCreateNestedManyWithoutBackgroundCoverInput
  }

  export type ServiceBackgroundCoverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
    services?: ServiceUpdateManyWithoutBackgroundCoverNestedInput
  }

  export type ServiceBackgroundCoverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
    services?: ServiceUncheckedUpdateManyWithoutBackgroundCoverNestedInput
  }

  export type ServiceBackgroundCoverCreateManyInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type PostTranslationListRelationFilter = {
    every?: PostTranslationWhereInput
    some?: PostTranslationWhereInput
    none?: PostTranslationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    thumbnailUrl?: SortOrder
    bgCoverUrl?: SortOrder
    countView?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    countView?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    thumbnailUrl?: SortOrder
    bgCoverUrl?: SortOrder
    countView?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    thumbnailUrl?: SortOrder
    bgCoverUrl?: SortOrder
    countView?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    countView?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageFilter<$PrismaModel> | $Enums.Language
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostTranslationPostIdLanguageCompoundUniqueInput = {
    postId: string
    language: $Enums.Language
  }

  export type PostTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    tags?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    seoKeywords?: SortOrder
  }

  export type PostTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
  }

  export type PostTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
  }

  export type EnumLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageWithAggregatesFilter<$PrismaModel> | $Enums.Language
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLanguageFilter<$PrismaModel>
    _max?: NestedEnumLanguageFilter<$PrismaModel>
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type ServiceTypeTranslationListRelationFilter = {
    every?: ServiceTypeTranslationWhereInput
    some?: ServiceTypeTranslationWhereInput
    none?: ServiceTypeTranslationWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceTypeTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceTypeScalarRelationFilter = {
    is?: ServiceTypeWhereInput
    isNot?: ServiceTypeWhereInput
  }

  export type ServiceTypeTranslationServiceTypeIdLanguageCompoundUniqueInput = {
    serviceTypeId: string
    language: $Enums.Language
  }

  export type ServiceTypeTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    serviceTypeId?: SortOrder
    language?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    brochureUrl?: SortOrder
  }

  export type ServiceTypeTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceTypeId?: SortOrder
    language?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    brochureUrl?: SortOrder
  }

  export type ServiceTypeTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    serviceTypeId?: SortOrder
    language?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    brochureUrl?: SortOrder
  }

  export type ServiceTypeNullableScalarRelationFilter = {
    is?: ServiceTypeWhereInput | null
    isNot?: ServiceTypeWhereInput | null
  }

  export type ServiceTranslationListRelationFilter = {
    every?: ServiceTranslationWhereInput
    some?: ServiceTranslationWhereInput
    none?: ServiceTranslationWhereInput
  }

  export type ServiceThumbnailNullableScalarRelationFilter = {
    is?: ServiceThumbnailWhereInput | null
    isNot?: ServiceThumbnailWhereInput | null
  }

  export type ServiceBackgroundCoverNullableScalarRelationFilter = {
    is?: ServiceBackgroundCoverWhereInput | null
    isNot?: ServiceBackgroundCoverWhereInput | null
  }

  export type ServiceTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    serviceTypeId?: SortOrder
    thumbnailId?: SortOrder
    backgroundCoverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    orderNumber?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    serviceTypeId?: SortOrder
    thumbnailId?: SortOrder
    backgroundCoverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    serviceTypeId?: SortOrder
    thumbnailId?: SortOrder
    backgroundCoverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    orderNumber?: SortOrder
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ServiceTranslationServiceIdLanguageCompoundUniqueInput = {
    serviceId: string
    language: $Enums.Language
  }

  export type ServiceTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    seoKeywords?: SortOrder
  }

  export type ServiceTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
  }

  export type ServiceTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    language?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    shortDescription?: SortOrder
    content?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
  }

  export type EnumServiceThumbnailTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceThumbnailType | EnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel> | $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ServiceThumbnailMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ServiceThumbnailMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type EnumServiceThumbnailTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceThumbnailType | EnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceThumbnailTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceThumbnailType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel>
  }

  export type ServiceBackgroundCoverCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ServiceBackgroundCoverMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type ServiceBackgroundCoverMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
  }

  export type PostTranslationCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput> | PostTranslationCreateWithoutPostInput[] | PostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTranslationCreateOrConnectWithoutPostInput | PostTranslationCreateOrConnectWithoutPostInput[]
    createMany?: PostTranslationCreateManyPostInputEnvelope
    connect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
  }

  export type PostTranslationUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput> | PostTranslationCreateWithoutPostInput[] | PostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTranslationCreateOrConnectWithoutPostInput | PostTranslationCreateOrConnectWithoutPostInput[]
    createMany?: PostTranslationCreateManyPostInputEnvelope
    connect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostTranslationUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput> | PostTranslationCreateWithoutPostInput[] | PostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTranslationCreateOrConnectWithoutPostInput | PostTranslationCreateOrConnectWithoutPostInput[]
    upsert?: PostTranslationUpsertWithWhereUniqueWithoutPostInput | PostTranslationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTranslationCreateManyPostInputEnvelope
    set?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    disconnect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    delete?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    connect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    update?: PostTranslationUpdateWithWhereUniqueWithoutPostInput | PostTranslationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTranslationUpdateManyWithWhereWithoutPostInput | PostTranslationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTranslationScalarWhereInput | PostTranslationScalarWhereInput[]
  }

  export type PostTranslationUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput> | PostTranslationCreateWithoutPostInput[] | PostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTranslationCreateOrConnectWithoutPostInput | PostTranslationCreateOrConnectWithoutPostInput[]
    upsert?: PostTranslationUpsertWithWhereUniqueWithoutPostInput | PostTranslationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTranslationCreateManyPostInputEnvelope
    set?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    disconnect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    delete?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    connect?: PostTranslationWhereUniqueInput | PostTranslationWhereUniqueInput[]
    update?: PostTranslationUpdateWithWhereUniqueWithoutPostInput | PostTranslationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTranslationUpdateManyWithWhereWithoutPostInput | PostTranslationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTranslationScalarWhereInput | PostTranslationScalarWhereInput[]
  }

  export type PostTranslationCreatetagsInput = {
    set: string[]
  }

  export type PostTranslationCreateseoKeywordsInput = {
    set: string[]
  }

  export type PostCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<PostCreateWithoutTranslationsInput, PostUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: PostCreateOrConnectWithoutTranslationsInput
    connect?: PostWhereUniqueInput
  }

  export type EnumLanguageFieldUpdateOperationsInput = {
    set?: $Enums.Language
  }

  export type PostTranslationUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PostTranslationUpdateseoKeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PostUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<PostCreateWithoutTranslationsInput, PostUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: PostCreateOrConnectWithoutTranslationsInput
    upsert?: PostUpsertWithoutTranslationsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutTranslationsInput, PostUpdateWithoutTranslationsInput>, PostUncheckedUpdateWithoutTranslationsInput>
  }

  export type ServiceCreateNestedManyWithoutServiceTypeInput = {
    create?: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput> | ServiceCreateWithoutServiceTypeInput[] | ServiceUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceTypeInput | ServiceCreateOrConnectWithoutServiceTypeInput[]
    createMany?: ServiceCreateManyServiceTypeInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceTypeTranslationCreateNestedManyWithoutServiceTypeInput = {
    create?: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput> | ServiceTypeTranslationCreateWithoutServiceTypeInput[] | ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput | ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput[]
    createMany?: ServiceTypeTranslationCreateManyServiceTypeInputEnvelope
    connect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutServiceTypeInput = {
    create?: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput> | ServiceCreateWithoutServiceTypeInput[] | ServiceUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceTypeInput | ServiceCreateOrConnectWithoutServiceTypeInput[]
    createMany?: ServiceCreateManyServiceTypeInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceTypeTranslationUncheckedCreateNestedManyWithoutServiceTypeInput = {
    create?: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput> | ServiceTypeTranslationCreateWithoutServiceTypeInput[] | ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput | ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput[]
    createMany?: ServiceTypeTranslationCreateManyServiceTypeInputEnvelope
    connect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
  }

  export type ServiceUpdateManyWithoutServiceTypeNestedInput = {
    create?: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput> | ServiceCreateWithoutServiceTypeInput[] | ServiceUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceTypeInput | ServiceCreateOrConnectWithoutServiceTypeInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutServiceTypeInput | ServiceUpsertWithWhereUniqueWithoutServiceTypeInput[]
    createMany?: ServiceCreateManyServiceTypeInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutServiceTypeInput | ServiceUpdateWithWhereUniqueWithoutServiceTypeInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutServiceTypeInput | ServiceUpdateManyWithWhereWithoutServiceTypeInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceTypeTranslationUpdateManyWithoutServiceTypeNestedInput = {
    create?: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput> | ServiceTypeTranslationCreateWithoutServiceTypeInput[] | ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput | ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput[]
    upsert?: ServiceTypeTranslationUpsertWithWhereUniqueWithoutServiceTypeInput | ServiceTypeTranslationUpsertWithWhereUniqueWithoutServiceTypeInput[]
    createMany?: ServiceTypeTranslationCreateManyServiceTypeInputEnvelope
    set?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    disconnect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    delete?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    connect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    update?: ServiceTypeTranslationUpdateWithWhereUniqueWithoutServiceTypeInput | ServiceTypeTranslationUpdateWithWhereUniqueWithoutServiceTypeInput[]
    updateMany?: ServiceTypeTranslationUpdateManyWithWhereWithoutServiceTypeInput | ServiceTypeTranslationUpdateManyWithWhereWithoutServiceTypeInput[]
    deleteMany?: ServiceTypeTranslationScalarWhereInput | ServiceTypeTranslationScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutServiceTypeNestedInput = {
    create?: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput> | ServiceCreateWithoutServiceTypeInput[] | ServiceUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutServiceTypeInput | ServiceCreateOrConnectWithoutServiceTypeInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutServiceTypeInput | ServiceUpsertWithWhereUniqueWithoutServiceTypeInput[]
    createMany?: ServiceCreateManyServiceTypeInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutServiceTypeInput | ServiceUpdateWithWhereUniqueWithoutServiceTypeInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutServiceTypeInput | ServiceUpdateManyWithWhereWithoutServiceTypeInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceTypeTranslationUncheckedUpdateManyWithoutServiceTypeNestedInput = {
    create?: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput> | ServiceTypeTranslationCreateWithoutServiceTypeInput[] | ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput[]
    connectOrCreate?: ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput | ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput[]
    upsert?: ServiceTypeTranslationUpsertWithWhereUniqueWithoutServiceTypeInput | ServiceTypeTranslationUpsertWithWhereUniqueWithoutServiceTypeInput[]
    createMany?: ServiceTypeTranslationCreateManyServiceTypeInputEnvelope
    set?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    disconnect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    delete?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    connect?: ServiceTypeTranslationWhereUniqueInput | ServiceTypeTranslationWhereUniqueInput[]
    update?: ServiceTypeTranslationUpdateWithWhereUniqueWithoutServiceTypeInput | ServiceTypeTranslationUpdateWithWhereUniqueWithoutServiceTypeInput[]
    updateMany?: ServiceTypeTranslationUpdateManyWithWhereWithoutServiceTypeInput | ServiceTypeTranslationUpdateManyWithWhereWithoutServiceTypeInput[]
    deleteMany?: ServiceTypeTranslationScalarWhereInput | ServiceTypeTranslationScalarWhereInput[]
  }

  export type ServiceTypeCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<ServiceTypeCreateWithoutTranslationsInput, ServiceTypeUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ServiceTypeCreateOrConnectWithoutTranslationsInput
    connect?: ServiceTypeWhereUniqueInput
  }

  export type ServiceTypeUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<ServiceTypeCreateWithoutTranslationsInput, ServiceTypeUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ServiceTypeCreateOrConnectWithoutTranslationsInput
    upsert?: ServiceTypeUpsertWithoutTranslationsInput
    connect?: ServiceTypeWhereUniqueInput
    update?: XOR<XOR<ServiceTypeUpdateToOneWithWhereWithoutTranslationsInput, ServiceTypeUpdateWithoutTranslationsInput>, ServiceTypeUncheckedUpdateWithoutTranslationsInput>
  }

  export type ServiceTypeCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceTypeCreateWithoutServicesInput, ServiceTypeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceTypeCreateOrConnectWithoutServicesInput
    connect?: ServiceTypeWhereUniqueInput
  }

  export type ServiceTranslationCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput> | ServiceTranslationCreateWithoutServiceInput[] | ServiceTranslationUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceTranslationCreateOrConnectWithoutServiceInput | ServiceTranslationCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceTranslationCreateManyServiceInputEnvelope
    connect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
  }

  export type ServiceThumbnailCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceThumbnailCreateWithoutServicesInput, ServiceThumbnailUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceThumbnailCreateOrConnectWithoutServicesInput
    connect?: ServiceThumbnailWhereUniqueInput
  }

  export type ServiceBackgroundCoverCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceBackgroundCoverCreateWithoutServicesInput, ServiceBackgroundCoverUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceBackgroundCoverCreateOrConnectWithoutServicesInput
    connect?: ServiceBackgroundCoverWhereUniqueInput
  }

  export type ServiceTranslationUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput> | ServiceTranslationCreateWithoutServiceInput[] | ServiceTranslationUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceTranslationCreateOrConnectWithoutServiceInput | ServiceTranslationCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceTranslationCreateManyServiceInputEnvelope
    connect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
  }

  export type ServiceTypeUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ServiceTypeCreateWithoutServicesInput, ServiceTypeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceTypeCreateOrConnectWithoutServicesInput
    upsert?: ServiceTypeUpsertWithoutServicesInput
    disconnect?: ServiceTypeWhereInput | boolean
    delete?: ServiceTypeWhereInput | boolean
    connect?: ServiceTypeWhereUniqueInput
    update?: XOR<XOR<ServiceTypeUpdateToOneWithWhereWithoutServicesInput, ServiceTypeUpdateWithoutServicesInput>, ServiceTypeUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceTranslationUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput> | ServiceTranslationCreateWithoutServiceInput[] | ServiceTranslationUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceTranslationCreateOrConnectWithoutServiceInput | ServiceTranslationCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceTranslationUpsertWithWhereUniqueWithoutServiceInput | ServiceTranslationUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceTranslationCreateManyServiceInputEnvelope
    set?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    disconnect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    delete?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    connect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    update?: ServiceTranslationUpdateWithWhereUniqueWithoutServiceInput | ServiceTranslationUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceTranslationUpdateManyWithWhereWithoutServiceInput | ServiceTranslationUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceTranslationScalarWhereInput | ServiceTranslationScalarWhereInput[]
  }

  export type ServiceThumbnailUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ServiceThumbnailCreateWithoutServicesInput, ServiceThumbnailUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceThumbnailCreateOrConnectWithoutServicesInput
    upsert?: ServiceThumbnailUpsertWithoutServicesInput
    disconnect?: ServiceThumbnailWhereInput | boolean
    delete?: ServiceThumbnailWhereInput | boolean
    connect?: ServiceThumbnailWhereUniqueInput
    update?: XOR<XOR<ServiceThumbnailUpdateToOneWithWhereWithoutServicesInput, ServiceThumbnailUpdateWithoutServicesInput>, ServiceThumbnailUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceBackgroundCoverUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ServiceBackgroundCoverCreateWithoutServicesInput, ServiceBackgroundCoverUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceBackgroundCoverCreateOrConnectWithoutServicesInput
    upsert?: ServiceBackgroundCoverUpsertWithoutServicesInput
    disconnect?: ServiceBackgroundCoverWhereInput | boolean
    delete?: ServiceBackgroundCoverWhereInput | boolean
    connect?: ServiceBackgroundCoverWhereUniqueInput
    update?: XOR<XOR<ServiceBackgroundCoverUpdateToOneWithWhereWithoutServicesInput, ServiceBackgroundCoverUpdateWithoutServicesInput>, ServiceBackgroundCoverUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceTranslationUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput> | ServiceTranslationCreateWithoutServiceInput[] | ServiceTranslationUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceTranslationCreateOrConnectWithoutServiceInput | ServiceTranslationCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceTranslationUpsertWithWhereUniqueWithoutServiceInput | ServiceTranslationUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceTranslationCreateManyServiceInputEnvelope
    set?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    disconnect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    delete?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    connect?: ServiceTranslationWhereUniqueInput | ServiceTranslationWhereUniqueInput[]
    update?: ServiceTranslationUpdateWithWhereUniqueWithoutServiceInput | ServiceTranslationUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceTranslationUpdateManyWithWhereWithoutServiceInput | ServiceTranslationUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceTranslationScalarWhereInput | ServiceTranslationScalarWhereInput[]
  }

  export type ServiceTranslationCreateseoKeywordsInput = {
    set: string[]
  }

  export type ServiceCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<ServiceCreateWithoutTranslationsInput, ServiceUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutTranslationsInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceTranslationUpdateseoKeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ServiceUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<ServiceCreateWithoutTranslationsInput, ServiceUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutTranslationsInput
    upsert?: ServiceUpsertWithoutTranslationsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutTranslationsInput, ServiceUpdateWithoutTranslationsInput>, ServiceUncheckedUpdateWithoutTranslationsInput>
  }

  export type ServiceCreateNestedManyWithoutThumbnailInput = {
    create?: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput> | ServiceCreateWithoutThumbnailInput[] | ServiceUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutThumbnailInput | ServiceCreateOrConnectWithoutThumbnailInput[]
    createMany?: ServiceCreateManyThumbnailInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutThumbnailInput = {
    create?: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput> | ServiceCreateWithoutThumbnailInput[] | ServiceUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutThumbnailInput | ServiceCreateOrConnectWithoutThumbnailInput[]
    createMany?: ServiceCreateManyThumbnailInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EnumServiceThumbnailTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceThumbnailType
  }

  export type ServiceUpdateManyWithoutThumbnailNestedInput = {
    create?: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput> | ServiceCreateWithoutThumbnailInput[] | ServiceUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutThumbnailInput | ServiceCreateOrConnectWithoutThumbnailInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutThumbnailInput | ServiceUpsertWithWhereUniqueWithoutThumbnailInput[]
    createMany?: ServiceCreateManyThumbnailInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutThumbnailInput | ServiceUpdateWithWhereUniqueWithoutThumbnailInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutThumbnailInput | ServiceUpdateManyWithWhereWithoutThumbnailInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutThumbnailNestedInput = {
    create?: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput> | ServiceCreateWithoutThumbnailInput[] | ServiceUncheckedCreateWithoutThumbnailInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutThumbnailInput | ServiceCreateOrConnectWithoutThumbnailInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutThumbnailInput | ServiceUpsertWithWhereUniqueWithoutThumbnailInput[]
    createMany?: ServiceCreateManyThumbnailInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutThumbnailInput | ServiceUpdateWithWhereUniqueWithoutThumbnailInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutThumbnailInput | ServiceUpdateManyWithWhereWithoutThumbnailInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceCreateNestedManyWithoutBackgroundCoverInput = {
    create?: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput> | ServiceCreateWithoutBackgroundCoverInput[] | ServiceUncheckedCreateWithoutBackgroundCoverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBackgroundCoverInput | ServiceCreateOrConnectWithoutBackgroundCoverInput[]
    createMany?: ServiceCreateManyBackgroundCoverInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutBackgroundCoverInput = {
    create?: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput> | ServiceCreateWithoutBackgroundCoverInput[] | ServiceUncheckedCreateWithoutBackgroundCoverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBackgroundCoverInput | ServiceCreateOrConnectWithoutBackgroundCoverInput[]
    createMany?: ServiceCreateManyBackgroundCoverInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUpdateManyWithoutBackgroundCoverNestedInput = {
    create?: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput> | ServiceCreateWithoutBackgroundCoverInput[] | ServiceUncheckedCreateWithoutBackgroundCoverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBackgroundCoverInput | ServiceCreateOrConnectWithoutBackgroundCoverInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBackgroundCoverInput | ServiceUpsertWithWhereUniqueWithoutBackgroundCoverInput[]
    createMany?: ServiceCreateManyBackgroundCoverInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBackgroundCoverInput | ServiceUpdateWithWhereUniqueWithoutBackgroundCoverInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBackgroundCoverInput | ServiceUpdateManyWithWhereWithoutBackgroundCoverInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutBackgroundCoverNestedInput = {
    create?: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput> | ServiceCreateWithoutBackgroundCoverInput[] | ServiceUncheckedCreateWithoutBackgroundCoverInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBackgroundCoverInput | ServiceCreateOrConnectWithoutBackgroundCoverInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBackgroundCoverInput | ServiceUpsertWithWhereUniqueWithoutBackgroundCoverInput[]
    createMany?: ServiceCreateManyBackgroundCoverInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBackgroundCoverInput | ServiceUpdateWithWhereUniqueWithoutBackgroundCoverInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBackgroundCoverInput | ServiceUpdateManyWithWhereWithoutBackgroundCoverInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedEnumLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageFilter<$PrismaModel> | $Enums.Language
  }

  export type NestedEnumLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageWithAggregatesFilter<$PrismaModel> | $Enums.Language
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLanguageFilter<$PrismaModel>
    _max?: NestedEnumLanguageFilter<$PrismaModel>
  }

  export type NestedEnumServiceThumbnailTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceThumbnailType | EnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel> | $Enums.ServiceThumbnailType
  }

  export type NestedEnumServiceThumbnailTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceThumbnailType | EnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceThumbnailType[] | ListEnumServiceThumbnailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceThumbnailTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceThumbnailType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceThumbnailTypeFilter<$PrismaModel>
  }

  export type PostTranslationCreateWithoutPostInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
  }

  export type PostTranslationUncheckedCreateWithoutPostInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
  }

  export type PostTranslationCreateOrConnectWithoutPostInput = {
    where: PostTranslationWhereUniqueInput
    create: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput>
  }

  export type PostTranslationCreateManyPostInputEnvelope = {
    data: PostTranslationCreateManyPostInput | PostTranslationCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostTranslationUpsertWithWhereUniqueWithoutPostInput = {
    where: PostTranslationWhereUniqueInput
    update: XOR<PostTranslationUpdateWithoutPostInput, PostTranslationUncheckedUpdateWithoutPostInput>
    create: XOR<PostTranslationCreateWithoutPostInput, PostTranslationUncheckedCreateWithoutPostInput>
  }

  export type PostTranslationUpdateWithWhereUniqueWithoutPostInput = {
    where: PostTranslationWhereUniqueInput
    data: XOR<PostTranslationUpdateWithoutPostInput, PostTranslationUncheckedUpdateWithoutPostInput>
  }

  export type PostTranslationUpdateManyWithWhereWithoutPostInput = {
    where: PostTranslationScalarWhereInput
    data: XOR<PostTranslationUpdateManyMutationInput, PostTranslationUncheckedUpdateManyWithoutPostInput>
  }

  export type PostTranslationScalarWhereInput = {
    AND?: PostTranslationScalarWhereInput | PostTranslationScalarWhereInput[]
    OR?: PostTranslationScalarWhereInput[]
    NOT?: PostTranslationScalarWhereInput | PostTranslationScalarWhereInput[]
    id?: StringFilter<"PostTranslation"> | string
    postId?: StringFilter<"PostTranslation"> | string
    language?: EnumLanguageFilter<"PostTranslation"> | $Enums.Language
    slug?: StringFilter<"PostTranslation"> | string
    title?: StringFilter<"PostTranslation"> | string
    shortDescription?: StringNullableFilter<"PostTranslation"> | string | null
    content?: StringFilter<"PostTranslation"> | string
    tags?: StringNullableListFilter<"PostTranslation">
    seoTitle?: StringNullableFilter<"PostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"PostTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"PostTranslation">
  }

  export type PostCreateWithoutTranslationsInput = {
    id?: string
    thumbnailUrl: string
    bgCoverUrl?: string | null
    countView?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateWithoutTranslationsInput = {
    id?: string
    thumbnailUrl: string
    bgCoverUrl?: string | null
    countView?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateOrConnectWithoutTranslationsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutTranslationsInput, PostUncheckedCreateWithoutTranslationsInput>
  }

  export type PostUpsertWithoutTranslationsInput = {
    update: XOR<PostUpdateWithoutTranslationsInput, PostUncheckedUpdateWithoutTranslationsInput>
    create: XOR<PostCreateWithoutTranslationsInput, PostUncheckedCreateWithoutTranslationsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutTranslationsInput, PostUncheckedUpdateWithoutTranslationsInput>
  }

  export type PostUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    thumbnailUrl?: StringFieldUpdateOperationsInput | string
    bgCoverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countView?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateWithoutServiceTypeInput = {
    id?: string
    orderNumber: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTranslationCreateNestedManyWithoutServiceInput
    thumbnail?: ServiceThumbnailCreateNestedOneWithoutServicesInput
    backgroundCover?: ServiceBackgroundCoverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutServiceTypeInput = {
    id?: string
    orderNumber: number
    thumbnailId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTranslationUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutServiceTypeInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput>
  }

  export type ServiceCreateManyServiceTypeInputEnvelope = {
    data: ServiceCreateManyServiceTypeInput | ServiceCreateManyServiceTypeInput[]
    skipDuplicates?: boolean
  }

  export type ServiceTypeTranslationCreateWithoutServiceTypeInput = {
    id?: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
  }

  export type ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput = {
    id?: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
  }

  export type ServiceTypeTranslationCreateOrConnectWithoutServiceTypeInput = {
    where: ServiceTypeTranslationWhereUniqueInput
    create: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput>
  }

  export type ServiceTypeTranslationCreateManyServiceTypeInputEnvelope = {
    data: ServiceTypeTranslationCreateManyServiceTypeInput | ServiceTypeTranslationCreateManyServiceTypeInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutServiceTypeInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutServiceTypeInput, ServiceUncheckedUpdateWithoutServiceTypeInput>
    create: XOR<ServiceCreateWithoutServiceTypeInput, ServiceUncheckedCreateWithoutServiceTypeInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutServiceTypeInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutServiceTypeInput, ServiceUncheckedUpdateWithoutServiceTypeInput>
  }

  export type ServiceUpdateManyWithWhereWithoutServiceTypeInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServiceTypeInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    orderNumber?: IntFilter<"Service"> | number
    serviceTypeId?: StringNullableFilter<"Service"> | string | null
    thumbnailId?: StringNullableFilter<"Service"> | string | null
    backgroundCoverId?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type ServiceTypeTranslationUpsertWithWhereUniqueWithoutServiceTypeInput = {
    where: ServiceTypeTranslationWhereUniqueInput
    update: XOR<ServiceTypeTranslationUpdateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedUpdateWithoutServiceTypeInput>
    create: XOR<ServiceTypeTranslationCreateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedCreateWithoutServiceTypeInput>
  }

  export type ServiceTypeTranslationUpdateWithWhereUniqueWithoutServiceTypeInput = {
    where: ServiceTypeTranslationWhereUniqueInput
    data: XOR<ServiceTypeTranslationUpdateWithoutServiceTypeInput, ServiceTypeTranslationUncheckedUpdateWithoutServiceTypeInput>
  }

  export type ServiceTypeTranslationUpdateManyWithWhereWithoutServiceTypeInput = {
    where: ServiceTypeTranslationScalarWhereInput
    data: XOR<ServiceTypeTranslationUpdateManyMutationInput, ServiceTypeTranslationUncheckedUpdateManyWithoutServiceTypeInput>
  }

  export type ServiceTypeTranslationScalarWhereInput = {
    AND?: ServiceTypeTranslationScalarWhereInput | ServiceTypeTranslationScalarWhereInput[]
    OR?: ServiceTypeTranslationScalarWhereInput[]
    NOT?: ServiceTypeTranslationScalarWhereInput | ServiceTypeTranslationScalarWhereInput[]
    id?: StringFilter<"ServiceTypeTranslation"> | string
    serviceTypeId?: StringFilter<"ServiceTypeTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTypeTranslation"> | $Enums.Language
    displayName?: StringFilter<"ServiceTypeTranslation"> | string
    description?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
    brochureUrl?: StringNullableFilter<"ServiceTypeTranslation"> | string | null
  }

  export type ServiceTypeCreateWithoutTranslationsInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeUncheckedCreateWithoutTranslationsInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeCreateOrConnectWithoutTranslationsInput = {
    where: ServiceTypeWhereUniqueInput
    create: XOR<ServiceTypeCreateWithoutTranslationsInput, ServiceTypeUncheckedCreateWithoutTranslationsInput>
  }

  export type ServiceTypeUpsertWithoutTranslationsInput = {
    update: XOR<ServiceTypeUpdateWithoutTranslationsInput, ServiceTypeUncheckedUpdateWithoutTranslationsInput>
    create: XOR<ServiceTypeCreateWithoutTranslationsInput, ServiceTypeUncheckedCreateWithoutTranslationsInput>
    where?: ServiceTypeWhereInput
  }

  export type ServiceTypeUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: ServiceTypeWhereInput
    data: XOR<ServiceTypeUpdateWithoutTranslationsInput, ServiceTypeUncheckedUpdateWithoutTranslationsInput>
  }

  export type ServiceTypeUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTypeUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTypeCreateWithoutServicesInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTypeTranslationCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeUncheckedCreateWithoutServicesInput = {
    id?: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTypeTranslationUncheckedCreateNestedManyWithoutServiceTypeInput
  }

  export type ServiceTypeCreateOrConnectWithoutServicesInput = {
    where: ServiceTypeWhereUniqueInput
    create: XOR<ServiceTypeCreateWithoutServicesInput, ServiceTypeUncheckedCreateWithoutServicesInput>
  }

  export type ServiceTranslationCreateWithoutServiceInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUncheckedCreateWithoutServiceInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
  }

  export type ServiceTranslationCreateOrConnectWithoutServiceInput = {
    where: ServiceTranslationWhereUniqueInput
    create: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput>
  }

  export type ServiceTranslationCreateManyServiceInputEnvelope = {
    data: ServiceTranslationCreateManyServiceInput | ServiceTranslationCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ServiceThumbnailCreateWithoutServicesInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailUncheckedCreateWithoutServicesInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailCreateOrConnectWithoutServicesInput = {
    where: ServiceThumbnailWhereUniqueInput
    create: XOR<ServiceThumbnailCreateWithoutServicesInput, ServiceThumbnailUncheckedCreateWithoutServicesInput>
  }

  export type ServiceBackgroundCoverCreateWithoutServicesInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverUncheckedCreateWithoutServicesInput = {
    id?: string
    url: string
    type?: $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverCreateOrConnectWithoutServicesInput = {
    where: ServiceBackgroundCoverWhereUniqueInput
    create: XOR<ServiceBackgroundCoverCreateWithoutServicesInput, ServiceBackgroundCoverUncheckedCreateWithoutServicesInput>
  }

  export type ServiceTypeUpsertWithoutServicesInput = {
    update: XOR<ServiceTypeUpdateWithoutServicesInput, ServiceTypeUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceTypeCreateWithoutServicesInput, ServiceTypeUncheckedCreateWithoutServicesInput>
    where?: ServiceTypeWhereInput
  }

  export type ServiceTypeUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceTypeWhereInput
    data: XOR<ServiceTypeUpdateWithoutServicesInput, ServiceTypeUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceTypeUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTypeTranslationUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTypeUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTypeTranslationUncheckedUpdateManyWithoutServiceTypeNestedInput
  }

  export type ServiceTranslationUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceTranslationWhereUniqueInput
    update: XOR<ServiceTranslationUpdateWithoutServiceInput, ServiceTranslationUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceTranslationCreateWithoutServiceInput, ServiceTranslationUncheckedCreateWithoutServiceInput>
  }

  export type ServiceTranslationUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceTranslationWhereUniqueInput
    data: XOR<ServiceTranslationUpdateWithoutServiceInput, ServiceTranslationUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceTranslationUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceTranslationScalarWhereInput
    data: XOR<ServiceTranslationUpdateManyMutationInput, ServiceTranslationUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceTranslationScalarWhereInput = {
    AND?: ServiceTranslationScalarWhereInput | ServiceTranslationScalarWhereInput[]
    OR?: ServiceTranslationScalarWhereInput[]
    NOT?: ServiceTranslationScalarWhereInput | ServiceTranslationScalarWhereInput[]
    id?: StringFilter<"ServiceTranslation"> | string
    serviceId?: StringFilter<"ServiceTranslation"> | string
    language?: EnumLanguageFilter<"ServiceTranslation"> | $Enums.Language
    slug?: StringFilter<"ServiceTranslation"> | string
    title?: StringFilter<"ServiceTranslation"> | string
    description?: StringFilter<"ServiceTranslation"> | string
    shortDescription?: StringFilter<"ServiceTranslation"> | string
    content?: StringFilter<"ServiceTranslation"> | string
    seoTitle?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoDescription?: StringNullableFilter<"ServiceTranslation"> | string | null
    seoKeywords?: StringNullableListFilter<"ServiceTranslation">
  }

  export type ServiceThumbnailUpsertWithoutServicesInput = {
    update: XOR<ServiceThumbnailUpdateWithoutServicesInput, ServiceThumbnailUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceThumbnailCreateWithoutServicesInput, ServiceThumbnailUncheckedCreateWithoutServicesInput>
    where?: ServiceThumbnailWhereInput
  }

  export type ServiceThumbnailUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceThumbnailWhereInput
    data: XOR<ServiceThumbnailUpdateWithoutServicesInput, ServiceThumbnailUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceThumbnailUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceThumbnailUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverUpsertWithoutServicesInput = {
    update: XOR<ServiceBackgroundCoverUpdateWithoutServicesInput, ServiceBackgroundCoverUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceBackgroundCoverCreateWithoutServicesInput, ServiceBackgroundCoverUncheckedCreateWithoutServicesInput>
    where?: ServiceBackgroundCoverWhereInput
  }

  export type ServiceBackgroundCoverUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceBackgroundCoverWhereInput
    data: XOR<ServiceBackgroundCoverUpdateWithoutServicesInput, ServiceBackgroundCoverUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceBackgroundCoverUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceBackgroundCoverUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceThumbnailTypeFieldUpdateOperationsInput | $Enums.ServiceThumbnailType
  }

  export type ServiceCreateWithoutTranslationsInput = {
    id?: string
    orderNumber: number
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceType?: ServiceTypeCreateNestedOneWithoutServicesInput
    thumbnail?: ServiceThumbnailCreateNestedOneWithoutServicesInput
    backgroundCover?: ServiceBackgroundCoverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutTranslationsInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    thumbnailId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutTranslationsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutTranslationsInput, ServiceUncheckedCreateWithoutTranslationsInput>
  }

  export type ServiceUpsertWithoutTranslationsInput = {
    update: XOR<ServiceUpdateWithoutTranslationsInput, ServiceUncheckedUpdateWithoutTranslationsInput>
    create: XOR<ServiceCreateWithoutTranslationsInput, ServiceUncheckedCreateWithoutTranslationsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutTranslationsInput, ServiceUncheckedUpdateWithoutTranslationsInput>
  }

  export type ServiceUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceType?: ServiceTypeUpdateOneWithoutServicesNestedInput
    thumbnail?: ServiceThumbnailUpdateOneWithoutServicesNestedInput
    backgroundCover?: ServiceBackgroundCoverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateWithoutThumbnailInput = {
    id?: string
    orderNumber: number
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceType?: ServiceTypeCreateNestedOneWithoutServicesInput
    translations?: ServiceTranslationCreateNestedManyWithoutServiceInput
    backgroundCover?: ServiceBackgroundCoverCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutThumbnailInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTranslationUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutThumbnailInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput>
  }

  export type ServiceCreateManyThumbnailInputEnvelope = {
    data: ServiceCreateManyThumbnailInput | ServiceCreateManyThumbnailInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutThumbnailInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutThumbnailInput, ServiceUncheckedUpdateWithoutThumbnailInput>
    create: XOR<ServiceCreateWithoutThumbnailInput, ServiceUncheckedCreateWithoutThumbnailInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutThumbnailInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutThumbnailInput, ServiceUncheckedUpdateWithoutThumbnailInput>
  }

  export type ServiceUpdateManyWithWhereWithoutThumbnailInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutThumbnailInput>
  }

  export type ServiceCreateWithoutBackgroundCoverInput = {
    id?: string
    orderNumber: number
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceType?: ServiceTypeCreateNestedOneWithoutServicesInput
    translations?: ServiceTranslationCreateNestedManyWithoutServiceInput
    thumbnail?: ServiceThumbnailCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutBackgroundCoverInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    thumbnailId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ServiceTranslationUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBackgroundCoverInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput>
  }

  export type ServiceCreateManyBackgroundCoverInputEnvelope = {
    data: ServiceCreateManyBackgroundCoverInput | ServiceCreateManyBackgroundCoverInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutBackgroundCoverInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutBackgroundCoverInput, ServiceUncheckedUpdateWithoutBackgroundCoverInput>
    create: XOR<ServiceCreateWithoutBackgroundCoverInput, ServiceUncheckedCreateWithoutBackgroundCoverInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutBackgroundCoverInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutBackgroundCoverInput, ServiceUncheckedUpdateWithoutBackgroundCoverInput>
  }

  export type ServiceUpdateManyWithWhereWithoutBackgroundCoverInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutBackgroundCoverInput>
  }

  export type PostTranslationCreateManyPostInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    shortDescription?: string | null
    content: string
    tags?: PostTranslationCreatetagsInput | string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: PostTranslationCreateseoKeywordsInput | string[]
  }

  export type PostTranslationUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type PostTranslationUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type PostTranslationUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    tags?: PostTranslationUpdatetagsInput | string[]
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: PostTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceCreateManyServiceTypeInput = {
    id?: string
    orderNumber: number
    thumbnailId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceTypeTranslationCreateManyServiceTypeInput = {
    id?: string
    language: $Enums.Language
    displayName: string
    description?: string | null
    brochureUrl?: string | null
  }

  export type ServiceUpdateWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTranslationUpdateManyWithoutServiceNestedInput
    thumbnail?: ServiceThumbnailUpdateOneWithoutServicesNestedInput
    backgroundCover?: ServiceBackgroundCoverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTranslationUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceTypeTranslationUpdateWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceTypeTranslationUncheckedUpdateWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceTypeTranslationUncheckedUpdateManyWithoutServiceTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    brochureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceTranslationCreateManyServiceInput = {
    id?: string
    language: $Enums.Language
    slug: string
    title: string
    description: string
    shortDescription: string
    content: string
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: ServiceTranslationCreateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceTranslationUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    seoKeywords?: ServiceTranslationUpdateseoKeywordsInput | string[]
  }

  export type ServiceCreateManyThumbnailInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    backgroundCoverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutThumbnailInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceType?: ServiceTypeUpdateOneWithoutServicesNestedInput
    translations?: ServiceTranslationUpdateManyWithoutServiceNestedInput
    backgroundCover?: ServiceBackgroundCoverUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutThumbnailInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTranslationUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutThumbnailInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundCoverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyBackgroundCoverInput = {
    id?: string
    orderNumber: number
    serviceTypeId?: string | null
    thumbnailId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutBackgroundCoverInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceType?: ServiceTypeUpdateOneWithoutServicesNestedInput
    translations?: ServiceTranslationUpdateManyWithoutServiceNestedInput
    thumbnail?: ServiceThumbnailUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBackgroundCoverInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ServiceTranslationUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutBackgroundCoverInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailId?: NullableStringFieldUpdateOperationsInput | string | null
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