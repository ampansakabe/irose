import { useEffect } from 'react';
import { useTenants } from '../hooks/useTenants';
import { useTenantContext } from '../hooks/useTenantContext';

export function TenantSwitcher() {
  const { tenants, isLoading } = useTenants();
  const { tenant, setTenant, headerName } = useTenantContext();

  useEffect(() => {
    if (!isLoading && tenants.length > 0 && !tenants.includes(tenant)) {
      setTenant(tenants[0]);
    }
  }, [isLoading, tenants, tenant, setTenant]);

  return (
    <section className="card">
      <h2>Switch tenant</h2>
      <p>
        Choose the tenant you want to impersonate. The client updates the <code>{headerName}</code> header on outgoing
        API requests.
      </p>
      <select
        value={tenant}
        disabled={isLoading}
        onChange={(event) => setTenant(event.target.value)}
      >
        {tenants.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </section>
  );
}
