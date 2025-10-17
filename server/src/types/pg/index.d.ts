declare module 'pg' {
  export interface QueryResult<T = any> {
    rows: T[];
  }

  export interface PoolClient {
    query<T = any>(queryText: string, values?: any[]): Promise<QueryResult<T>>;
    release(): void;
  }

  export interface PoolConfig {
    connectionString?: string;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    connect(): Promise<PoolClient>;
    query<T = any>(queryText: string, values?: any[]): Promise<QueryResult<T>>;
  }
}
