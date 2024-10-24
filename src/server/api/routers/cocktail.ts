import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cocktailRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cocktail.create({
        data: {
          name: input.name,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const cocktail = await ctx.db.cocktail.findFirst({
      orderBy: { createdAt: "desc" },
      where: { user: { id: ctx.session.user.id } },
    });

    return cocktail ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
    }),

  generateNew: protectedProcedure
  .input(z.object({ name: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.cocktail.create({
    data: {
      name: input.name,
      user: { connect: { id: ctx.session.user.id } },
    },
    });
  }),
});