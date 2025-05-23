import type { GraphQLSchema } from 'graphql';
import type { CachePolicies, PaginateModes } from './types';
export declare function getMockConfig(): ConfigFile | null;
export declare function setMockConfig(config: ConfigFile | null): void;
export declare function defaultConfigValues(file: ConfigFile): ConfigFile;
export declare function keyFieldsForType(configFile: ConfigFile, type: string): string[];
export declare function computeID(configFile: ConfigFile, type: string, data: any): string;
export declare function localApiEndpoint(configFile: ConfigFile): string;
export declare function localApiSessionKeys(configFile: ConfigFile): string[];
export declare function getCurrentConfig(): ConfigFile;
export type ConfigFile = {
    /**
     * A glob pointing to all files that houdini should consider. Note, this must include .js files
     * for inline queries to work
     * @default `src/** /*.{svelte,graphql,gql,ts,js}`
     */
    include?: string | string[];
    /**
     * A pattern used to remove matches from files that satisfy the include value
     */
    exclude?: string | string[];
    /**
     * A static representation of your schema
     * @example path: `schema.graphql`
     * @example glob: `src/** /*.graphql`
     *
     * FYI: `schemaPath` or `schema` should be defined
     */
    schemaPath?: string;
    /**
     * Raw graphql schema
     *
     * FYI: `schemaPath` or `schema` should be defined
     */
    schema?: string | GraphQLSchema;
    /**
     * An object describing custom scalars for your project. For more information: https://www.houdinigraphql.com/api/config#custom-scalars
     */
    scalars?: ScalarMap;
    /**
     * A path that the generator will use to write schema.graphql and documents.gql files containing all of the internal fragment and directive definitions used in the project.
     */
    definitionsPath?: string;
    /**
     * One of "esm" or "commonjs". Tells the artifact generator what kind of modules to create. (default: `esm`)
     */
    module?: 'esm' | 'commonjs';
    /**
     * The number of queries that must occur before a value is removed from the cache. For more information: https://www.houdinigraphql.com/guides/caching-data
     */
    cacheBufferSize?: number;
    /**
     * The default cache policy to use for queries. For more information: https://www.houdinigraphql.com/guides/caching-data
     */
    defaultCachePolicy?: CachePolicies;
    /**
     * Specifies whether or not the cache should always use partial data. For more information: https://www.houdinigraphql.com/guides/caching-data#partial-data
     */
    defaultPartial?: boolean;
    /**
     * Specifies after how long a data goes stale in miliseconds. (default: `undefined`)
     */
    defaultLifetime?: number;
    /**
     * Specifies whether mutations should append or prepend list. For more information: https://www.houdinigraphql.com/api/graphql (default: `append`)
     */
    defaultListPosition?: 'append' | 'prepend';
    /**
     * Specifies whether mutation should apply a specific target list. When you set `all`, it's like adding the directive `@allLists` to all _insert fragment (default: `null`)
     */
    defaultListTarget?: 'all' | null;
    /**
     * Specifies whether the default paginate mode is Infinite or SinglePage. (default: `Infinite`)
     */
    defaultPaginateMode?: PaginateModes;
    /**
     * Prevents the runtime from deduplicating pagination requests
     */
    supressPaginationDeduplication?: boolean;
    /**
     * A list of fields to use when computing a record’s id. The default value is ['id']. For more information: https://www.houdinigraphql.com/guides/caching-data#custom-ids
     */
    defaultKeys?: string[];
    /**
     * An object that customizes the resolution behavior for a specific type. For more information: https://www.houdinigraphql.com/guides/caching-data#custom-ids
     */
    types?: TypeConfig;
    /**
     * Specifies the style of logging houdini will use when generating your file. One of “quiet”, “full”, “summary”, or “short-summary”.
     */
    logLevel?: string;
    /**
     * A flag to specify the default fragment masking behavior.
     * @default `enable`
     */
    defaultFragmentMasking?: 'enable' | 'disable';
    /**
     * Configure the dev environment to watch a remote schema for changes
     */
    watchSchema?: WatchSchemaConfig;
    /**
     * Specifies the the persisted queries path and file. (default: `<rootDir>/persisted_queries.json`)
     */
    persistedQueriesPath?: string;
    /**
     * An object describing the plugins enabled for the project
     */
    plugins?: HoudiniPluginConfig;
    /**
     * The relative path from your houdini config file pointing to your application.
     * @default process.cwd()
     */
    projectDir?: string;
    /**
     * The relative path from your project directory pointing to your output directory.
     * @default `$houdini`
     */
    runtimeDir?: string;
    /**
     * For now, the cache's imperative API is considered unstable. In order to suppress the warning,
     * you must enable this flag.
     *
     * @deprecated set features.imperativeCache instead
     */
    acceptImperativeInstability?: boolean;
    /**
     * Configure the router
     */
    router?: RouterConfig;
    /**
     * A collection of flags to opt-into experimental features are not yet stable and can break on any
     * minor version.
     */
    features?: {
        /** Interact with the cache directly using an imperative API.*/
        imperativeCache?: boolean;
        runtimeScalars?: Record<string, {
            type: string;
            resolve: (args: RuntimeScalarPayload) => any;
        }>;
        /** [React Only] Emebed component references in query responses*/
        componentFields?: boolean;
    };
};
export type RuntimeScalarPayload = {
    session?: App.Session | null | undefined;
};
type RouterConfig = {
    auth?: AuthStrategy;
    apiEndpoint?: string;
};
type AuthStrategy = {
    redirect: string;
    sessionKeys: string[];
    url: string;
} | {
    mutation: string;
    sessionKeys: string[];
    url: string;
};
type ScalarMap = {
    [typeName: string]: ScalarSpec;
};
export type TypeConfig = {
    [typeName: string]: {
        keys?: string[];
        resolve?: {
            queryField: string;
            arguments?: (data: any) => {
                [key: string]: any;
            };
        };
    };
};
export type WatchSchemaConfig = {
    /**
     * A url to use to pull the schema. For more information: https://www.houdinigraphql.com/api/cli#generate
     */
    url: string | ((env: Record<string, string | undefined>) => string);
    /**
     * sets the amount of time between each request in milliseconds (default 2 seconds).
     * To limit the schema introspection to just on the start of the server, set interval to 0.
     * To disable the schema introspection, set interval to null.
     */
    interval?: number | null;
    /**
     * Sets a custom timeout in milliseconds which is used to cancel fetching the schema. If the timeout is reached
     * before the remote API has responded, the request is cancelled and an error is displayed.
     * The default is 30 seconds (30000 milliseconds)
     */
    timeout?: number | null;
    /**
     * An object containing the environment variables you want passed onto the api when polling for a new schema.
     * The keys dictate the header names. If the value is a string, the corresponding environment variable will be used
     * directly. If the value is a function, the current environment will be passed to your function so you can perform any
     * logic you need
     */
    headers?: Record<string, string | ((env: Record<string, string | undefined>) => string)> | ((env: Record<string, string | undefined>) => Record<string, string>);
};
export type ScalarSpec = {
    type: string;
    marshal?: (val: any) => any;
    unmarshal?: (val: any) => any;
};
export interface HoudiniPluginConfig {
}
export interface HoudiniClientPluginConfig {
}
export {};
