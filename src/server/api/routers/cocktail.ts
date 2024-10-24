import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
    .input(z.object({ query: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const model = process.env.ANTHROPIC_MODEL_ID!;

      const anthropicMessage = await anthropic.messages.create({
        model: model,
        max_tokens: 1024,
        temperature: 0,
        system: 'You are the world expert in mixology. Create a recipe for a refreshing cocktail with information provided by the user. ' + 
          'The recipe should be easy to follow and include a list of ingredients, their quantities and instructions.' +
          "/n" +
          'Answer using the json format with the following structure:' +
          "/n" +
          '"title"' +
          '"/n"' +
          '"description"' +
          "/n" +
          '"ingredients"' +
          "/n" +
          '"instructions"',
        messages: [
          {
            "role": "user",
            "content": [
                {
                  "type": "text",
                  "text": input.query
                }
            ]
          }
        ]
        });
        interface CocktailData {
          title: string;
          description: string;
          ingredients: string[];
          instructions: string[];
        }

        const cocktailData: CocktailData = JSON.parse((anthropicMessage.content[0] as Anthropic.TextBlock).text ?? "{}") as CocktailData;
       
        console.log(cocktailData)
        const newCocktail = await ctx.db.cocktail.create({
          data: {
            name: cocktailData.title,
            description: cocktailData.description,
            ingredients: cocktailData.ingredients,
            instructions: cocktailData.instructions,
            user: { connect: { id: ctx.session.user.id } },
          },
        });

      return newCocktail;
    }),
});
