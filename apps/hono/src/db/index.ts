import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { env } from "cloudflare:workers";

import { config } from "dotenv";

config({ path: ".dev.vars" });

// config({ path: ".env" }); // or .env.local

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}
const sql = neon(DATABASE_URL);

export const db = drizzle({ client: sql });
