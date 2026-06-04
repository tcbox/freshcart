import type { Request, Response } from "express";
import express from "express";
import { env } from "./utility/config/env";
import { checkConnection } from "./backend/database/connection";
import authRouter from "./backend/routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: env.LOCAL_HOST,
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API server is running" });
});

app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await checkConnection();
  console.log(`Server running on http://localhost:${PORT}`);
});
