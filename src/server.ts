import type { Request, Response } from "express";
import express from "express";
import { env } from "./lib/config/env";
import { checkConnection } from "./backend/database/connection";
import authRouter from "./backend/routes/authRoutes";
import cors from "cors";

const PORT = env.PORT || 3002;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: env.LOCAL_HOST,
    credentials: !env.TEST_MODE,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "homepage" });
});

app.use("/api/auth", authRouter);
app.use(middleware)

app.listen(PORT, async () => {
  await checkConnection();
  console.log(`Server running on http://localhost:${PORT}`);
});
