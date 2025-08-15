import type { Context as HonoContext } from "hono";
import { auth } from "./auth";

export type CreateContextOptions = {
  context: HonoContext;
}


export async function createContext({ context }: CreateContextOptions) {
  try {
    const session = await auth.api.getSession({
      headers: context.req.raw.headers,
    })
    return { session };
  } catch {
    return { session: null };
  }

}

export type Context = Awaited<ReturnType<typeof createContext>>