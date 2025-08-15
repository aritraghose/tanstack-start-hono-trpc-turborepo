import z from "zod";
import { router, publicProcedure, protectedProcedure } from "@/lib/trpc";
import { todo } from "@/db/schema/todo";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export const todoRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await db.select().from(todo).where(eq(todo.userId, ctx.session.user.id));
  }),

  create: protectedProcedure
    .input(z.object({
      text: z.string().min(3)
    }))
    .mutation(async ({ ctx, input }) => {
      const [newTodo] = await db.insert(todo).values({
        text: input.text,
        userId: ctx.session.user.id
      }).returning();

      return newTodo;
    }),

  toggle: protectedProcedure
    .input(z.object({
      completed: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      const [updatedTodo] = await db.update(todo).set({ completed: input.completed}).where(eq(todo.userId, ctx.session.user.id)).returning();
      return updatedTodo;
    }),
  
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx }) => {
      await db.delete(todo).where(eq(todo.userId, ctx.session.user.id));
      return { sucess: true };
    }),
    
})