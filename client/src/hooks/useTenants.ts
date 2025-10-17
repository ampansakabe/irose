import { useEffect, useState } from 'react';
import { fetchTenants } from '../api/tenants';

export function useTenants() {
  const [tenants, setTenants] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetchTenants();
        setTenants(response.tenants);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return { tenants, isLoading };
}
