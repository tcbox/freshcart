import { defineConfig } from "drizzle-kit";
import { env } from "./src/utility/config/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/backend/database/schema.ts",
  out: "./src/backend/database/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
