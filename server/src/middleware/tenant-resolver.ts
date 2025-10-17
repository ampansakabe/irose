import type { Request, Response, NextFunction } from 'express';
import { loadConfig } from '../config/environment.js';

const config = loadConfig();

export function tenantResolver(req: Request, _res: Response, next: NextFunction) {
  const headerValue = req.header(config.tenants.header);
  const host = req.hostname;

  const subdomain = host.split('.').length > 2 ? host.split('.')[0] : undefined;
  const tenantId = headerValue ?? subdomain ?? config.tenants.defaultTenant;

  req.tenantId = tenantId;
  next();
}
