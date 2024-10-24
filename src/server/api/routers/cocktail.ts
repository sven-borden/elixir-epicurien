import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const cocktailRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    // If there is no user session, fetch the latest cocktail without filtering by user
    if (!ctx.session?.user?.id) {
      const cocktail = await ctx.db.cocktail.findFirst({
      orderBy: { createdAt: "desc" },
      });

      return cocktail ?? null;
    }

    // Fetch the latest cocktail filtered by the current user session
    const cocktail = await ctx.db.cocktail.findFirst({
      orderBy: { createdAt: "desc" },
      where: { user: { id: ctx.session.user.id } },
    });

    return cocktail ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
    }),

    generateNew: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const model = process.env.ANTHROPIC_MODEL_ID!;

      const anthropicMessage = await anthropic.messages.create({
        model: model,
        max_tokens: 1024,
        temperature: 0,
        system: 'You are the world expert in mixology. Create a recipe for a refreshing cocktail with information provided by the user. ' + 
          'The recipe should be easy to follow and include a list of ingredients, their quantities and instructions. ' +
          'If you are not able to provide a recipe, reply with the recipe of a water only cocktail with humoristics ingredients and instructions' +
          'Instructions should be provided as a not numbered list' +
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

        console.log(anthropicMessage.content[0]);

        const cocktailData: CocktailData = JSON.parse((anthropicMessage.content[0] as Anthropic.TextBlock).text ?? "{}") as CocktailData;
       
        if (!ctx.session?.user?.id) {
          const newCocktail = await ctx.db.cocktail.create({
            data: {
              name: cocktailData.title,
              description: cocktailData.description,
              ingredients: cocktailData.ingredients,
              instructions: cocktailData.instructions,
            },
          });
          return newCocktail;
        }
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
