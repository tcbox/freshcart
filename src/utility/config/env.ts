import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url("Valid Database Url is missing!"),
  TEST_MODE: z.string().default("false"),
  LOCAL_HOST: z.string().url(),
  JWT_SECRET: z.string().default("your-super-secret-jwt-key-change-this"),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variable");
  console.log(parsedEnv.error.format(), parsedEnv.error.message);
  process.exit(1);
}

export const env = parsedEnv.data;
