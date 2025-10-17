-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Bootstrap shared tables used by all tenants
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Example tenant-specific table template
CREATE OR REPLACE FUNCTION public.ensure_tenant_tables(schema_name text)
RETURNS void AS $$
BEGIN
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )', schema_name);
END;
$$ LANGUAGE plpgsql;

-- Automatically provision tenant schema on creation
CREATE OR REPLACE FUNCTION public.create_tenant(schema_name text)
RETURNS void AS $$
BEGIN
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
  PERFORM public.ensure_tenant_tables(schema_name);
END;
$$ LANGUAGE plpgsql;
