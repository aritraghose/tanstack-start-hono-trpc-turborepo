// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// export default app

import { trpcServer } from "@hono/trpc-server";
import { createContext } from "./lib/context";
