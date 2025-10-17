import type { Request, Response, NextFunction } from 'express';
import { getTenantClient } from '../services/tenant-service.js';

export async function attachTenantClient(req: Request, res: Response, next: NextFunction) {
  try {
    const client = await getTenantClient(req.tenantId);
    req.tenantClient = client;

    let released = false;
    const release = () => {
      if (!released) {
        released = true;
        client.release();
      }
    };

    res.on('finish', release);
    res.on('close', release);

    next();
  } catch (error) {
    next(error);
  }
}
