import { env } from "@/src/utility/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient);

export const checkConnection = async () => {
  try {
    await db.execute(`SELECT 1`);
    console.log("✅ neon db connection is successfull");
  } catch (err) {
    console.error(`❌ Database conncetion failed! Check your Neon URL`);
    console.error(err);
    process.exit(1);
  }
};

// checkConnection();
