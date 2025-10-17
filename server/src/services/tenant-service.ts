import type { Pool, PoolClient } from 'pg';
import { getSharedPool } from '../db/pool';

type TenantRow = {
  schema_name: string;
};

const tenantPools = new Map<string, Pool>();

function assertValidTenant(tenantId: string) {
  if (!/^\w+$/.test(tenantId)) {
    throw new Error('Invalid tenant identifier');
  }
}

async function ensureTenantSchema(pool: Pool, tenantId: string) {
  await pool.query('SELECT public.create_tenant($1)', [tenantId]);
}

async function configureTenantSession(client: PoolClient, tenantId: string) {
  await client.query(`SET search_path TO ${tenantId}, public`);
}

async function resolveTenantPool(tenantId: string): Promise<Pool> {
  const existing = tenantPools.get(tenantId);
  if (existing) {
    return existing;
  }

  const shared = getSharedPool();
  await ensureTenantSchema(shared, tenantId);
  tenantPools.set(tenantId, shared);
  return shared;
}

export async function getTenantClient(tenantId: string): Promise<PoolClient> {
  assertValidTenant(tenantId);
  const pool = await resolveTenantPool(tenantId);
  const client = await pool.connect();

  try {
    await configureTenantSession(client, tenantId);
    return client;
  } catch (error) {
    client.release();
    throw error;
  }
}

export async function listTenants(): Promise<string[]> {
  const pool = getSharedPool();
  const { rows } = await pool.query<TenantRow>(
    "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name NOT IN ('information_schema') ORDER BY schema_name"
  );
  return rows.map((row) => row.schema_name);
}
