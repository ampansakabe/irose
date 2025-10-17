import { useEffect, useState } from 'react';
import { fetchTenantContext } from '../api/tenants';
import type { TenantContextResponse } from '../api/types';

export function useTenantData(headers: Record<string, string>) {
  const [data, setData] = useState<TenantContextResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchTenantContext({ headers });
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [headers]);

  return { data, isLoading, error };
}
