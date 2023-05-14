import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string(),
  REDIS_PORT: z.string(),
  WORKER_PORT: z.string(),
  OER_APP_ID: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    '❌  environment variables:',
    JSON.stringify(env.error.format(), null, 4),
  );
  process.exit(1);
}

export default env.data;
