import type { TenantContextResponse, TenantListResponse } from './types';

const defaultHeaders = new Headers({ 'content-type': 'application/json' });

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...Object.fromEntries(defaultHeaders.entries()),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function setTenantHeader(header: string, tenant: string) {
  defaultHeaders.set(header, tenant);
}

export function fetchTenants(init?: RequestInit): Promise<TenantListResponse> {
  return request('/api/tenants', init);
}

export function fetchTenantContext(init?: RequestInit): Promise<TenantContextResponse> {
  return request('/api/tenants/current', init);
}
