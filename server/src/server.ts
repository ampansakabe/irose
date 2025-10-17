import express from 'express';
import cors from 'cors';
import { createTenantRouter } from './routes/tenants';
import { tenantResolver } from './middleware/tenant-resolver';
import { attachTenantClient } from './middleware/tenant-client';

export async function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(tenantResolver);
  app.use(attachTenantClient);

  app.use('/api/tenants', createTenantRouter());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
