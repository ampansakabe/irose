import type { PoolClient } from 'pg';

declare module 'express-serve-static-core' {
  interface Request {
    tenantId: string;
    tenantClient: PoolClient;
  }
}
