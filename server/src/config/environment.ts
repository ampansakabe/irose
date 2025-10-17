export interface DatabaseConfig {
  connectionString: string;
}

export interface TenantConfig {
  defaultTenant: string;
  header: string;
}

export interface AppConfig {
  database: DatabaseConfig;
  tenants: TenantConfig;
}

export const loadConfig = (): AppConfig => {
  const connectionString =
    process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/irose';

  return {
    database: {
      connectionString,
    },
    tenants: {
      defaultTenant: process.env.DEFAULT_TENANT ?? 'public',
      header: process.env.TENANT_HEADER ?? 'x-tenant-id',
    },
  };
};
