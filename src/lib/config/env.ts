import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url("Vaild Database Url is missing!"),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invaild enviromental variable");
  console.log(parsedEnv.error.format(), parsedEnv.error.message);
  process.exit(1);
}

export const env = parsedEnv.data;
