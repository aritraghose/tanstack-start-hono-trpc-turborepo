import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { todo } from "../db/schema/todo";
import { protectedProcedure, router } from "../lib/trpc";

export const todoRouter = router({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return await db
			.select()
			.from(todo)
			.where(eq(todo.userId, ctx.session.user.id));
	}),

	create: protectedProcedure
		.input(
			z.object({
				text: z.string().min(3),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [newTodo] = await db
				.insert(todo)
				.values({
					text: input.text,
					userId: ctx.session.user.id,
				})
				.returning();

			return newTodo;
		}),

	toggle: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				completed: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [updatedTodo] = await db
				.update(todo)
				.set({ completed: input.completed })
				.where(and(eq(todo.userId, ctx.session.user.id), eq(todo.id, input.id)))
				.returning();
			return updatedTodo;
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			await db
				.delete(todo)
				.where(
					and(eq(todo.userId, ctx.session.user.id), eq(todo.id, input.id)),
				);
			return { success: true };
		}),
});
