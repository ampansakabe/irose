import { Pool } from 'pg';
import { loadConfig } from '../config/environment';

const config = loadConfig();

const sharedPool = new Pool({
  connectionString: config.database.connectionString,
});

export const getSharedPool = () => sharedPool;
