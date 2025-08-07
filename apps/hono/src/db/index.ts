import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "cloudflare:workers";

// import { config } from "dotenv";

// config({ path: ".env" }); // or .env.local

const sql = neon(env.DATABASE_URL || "");

export const db = drizzle({ client: sql });