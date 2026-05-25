import express from "express";
import { env } from "./lib/config/env";

const PORT = env.PORT || 3002;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
