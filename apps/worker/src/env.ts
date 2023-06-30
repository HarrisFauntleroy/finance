import { config } from "dotenv";
import { z } from "zod";

config();

const environmentSchema = z.object({
  NODE_ENV: z.string(),
  REDIS_PORT: z.string(),
  WORKER_PORT: z.string(),
  OER_APP_ID: z.string(),
});

const environment = environmentSchema.safeParse(process.env);

if (!environment.success) {
  console.error(
    "❌  environment variables:",
    JSON.stringify(environment.error.format(), null, 4)
  );
  process.exit(1);
}

export default environment.data;
