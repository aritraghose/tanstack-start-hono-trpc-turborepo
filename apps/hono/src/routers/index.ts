import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { todoRouter } from "./todo";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return { health: "Ok"}
  }),

  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "Private Data returned.",
      user: ctx.session.user,
    }
  }),

  todo: todoRouter,
})

export type AppRouter = typeof appRouter;