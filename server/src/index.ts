import dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();

async function start() {
  const port = Number(process.env.PORT ?? 4000);
  const app = await createServer();
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
