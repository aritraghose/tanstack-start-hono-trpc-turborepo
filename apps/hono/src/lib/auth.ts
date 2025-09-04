import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
// import { env } from "cloudflare:workers";

import { config } from "dotenv";

config({ path: ".dev.vars" });

const {
	CORS_ORIGIN,
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} = process.env;
if (!CORS_ORIGIN) {
	throw new Error("CORS_ORIGIN is not set");
}
if (!BETTER_AUTH_SECRET) {
	throw new Error("BETTER_AUTH_SECRET is not set");
}
if (!BETTER_AUTH_URL) {
	throw new Error("BETTER_AUTH_URL is not set");
}
if (!GOOGLE_CLIENT_ID) {
	throw new Error("GOOGLE_CLIENT_ID is not set");
}
if (!GOOGLE_CLIENT_SECRET) {
	throw new Error("GOOGLE_CLIENT_SECRET is not set");
}

const validatedGoogleClientId = GOOGLE_CLIENT_ID.trim();
const validatedGoogleClientSecret = GOOGLE_CLIENT_SECRET.trim();

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	socialProviders: {
		google: {
			clientId: validatedGoogleClientId,
			clientSecret: validatedGoogleClientSecret,
		},
	},
	trustedOrigins: [CORS_ORIGIN],
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
}) as ReturnType<typeof betterAuth>;
