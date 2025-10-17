import { Router } from 'express';
import { getTenants, getTenantContext } from '../controllers/tenant-controller';

export const createTenantRouter = () => {
  const router = Router();

  router.get('/', getTenants);
  router.get('/current', getTenantContext);

  return router;
};
