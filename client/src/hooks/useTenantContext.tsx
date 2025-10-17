import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { setTenantHeader } from '../api/tenants';

interface TenantContextValue {
  tenant: string;
  setTenant: (tenant: string) => void;
  headerName: string;
  headers: Record<string, string>;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

const DEFAULT_TENANT = import.meta.env.VITE_DEFAULT_TENANT ?? 'public';
const TENANT_HEADER = import.meta.env.VITE_TENANT_HEADER ?? 'x-tenant-id';

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState(DEFAULT_TENANT);

  useEffect(() => {
    setTenantHeader(TENANT_HEADER, tenant);
  }, [tenant]);

  const value = useMemo(
    () => ({ tenant, setTenant, headerName: TENANT_HEADER, headers: { [TENANT_HEADER]: tenant } }),
    [tenant]
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenantContext() {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error('useTenantContext must be used within a TenantProvider');
  }

  return context;
}
