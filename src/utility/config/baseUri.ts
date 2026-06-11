import { env } from "./env";

const API_BASE_URL = env.LOCAL_HOST;

const buildUrl = (endpoint: string | number) => `${API_BASE_URL}${endpoint}`;

export const api = buildUrl("/api/user/1");
