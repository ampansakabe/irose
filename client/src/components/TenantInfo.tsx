import { useTenantContext } from '../hooks/useTenantContext';
import { useTenantData } from '../hooks/useTenantData';

export function TenantInfo() {
  const { tenant, headers } = useTenantContext();
  const { data, isLoading, error } = useTenantData(headers);

  return (
    <section className="card">
      <h2>Tenant context</h2>
      <p>
        Active tenant: <strong>{tenant}</strong>
      </p>
      {isLoading && <p>Loading tenant data…</p>}
      {error && <p role="alert">{error.message}</p>}
      {data && (
        <div>
          <p>
            <strong>Tenant:</strong> {data.tenant}
          </p>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
        </div>
      )}
    </section>
  );
}
