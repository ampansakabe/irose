import type { Request, Response } from 'express';
import { listTenants } from '../services/tenant-service.js';

export async function getTenants(_req: Request, res: Response) {
  const tenants = await listTenants();
  res.json({ tenants });
}

export async function getTenantContext(req: Request, res: Response) {
  const { rows } = await req.tenantClient.query<{ schema: string }>('SELECT current_schema() AS schema');
  res.json({ tenant: req.tenantId, message: `Connected to schema ${rows[0].schema}` });
}
