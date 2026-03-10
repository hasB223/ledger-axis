import app from './app.js';
import { env } from './config/env.js';
import { pool } from './db/pool.js';

const start = async () => {
  await pool.query('SELECT 1');
  app.listen(env.port, () => {
    console.log(`Backend listening on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
