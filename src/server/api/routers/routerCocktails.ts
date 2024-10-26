import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const anthropic = new Anthropic();
const openai = new OpenAI();


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

  generateNew: publicProcedure
  .input(z.object({ query: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {
    const model = process.env.ANTHROPIC_MODEL_ID!;

    const LLMMessageStream = anthropic.messages.stream({
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

      // interface CocktailData {
      //   title: string;
      //   description: string;
      //   ingredients: string[];
      //   instructions: string[];
      // }

      // console.log(anthropicMessage.content[0]);

      // const cocktailData: CocktailData = JSON.parse((anthropicMessage.content[0] as Anthropic.TextBlock).text ?? "{}") as CocktailData;
      
      // // const imagePrompt = `${cocktailData.title}: ${cocktailData.description}`;
      // // const base64Image = await generateImage({ prompt: imagePrompt });

      // if (!ctx.session?.user?.id) {
      //   const newCocktail = await ctx.db.cocktail.create({
      //     data: {
      //       name: cocktailData.title,
      //       description: cocktailData.description,
      //       ingredients: cocktailData.ingredients,
      //       instructions: cocktailData.instructions,
      //       // image: base64Image,
      //     },
      //   });
      //   return newCocktail;
      // }

      // const newCocktail = await ctx.db.cocktail.create({
      //   data: {
      //     name: cocktailData.title,
      //     description: cocktailData.description,
      //     ingredients: cocktailData.ingredients,
      //     instructions: cocktailData.instructions,
      //     // image: base64Image,
      //     user: { connect: { id: ctx.session.user.id } },
      //   },
      // });
      return LLMMessageStream;
  }),
});


/**
 * Generates an image based on the provided prompt using the OpenAI API.
 *
 * @param arg0 - An object containing the prompt string.
 * @param arg0.prompt - The prompt to generate the image from.
 * @returns A promise that resolves to a base64 encoded image string.
 *
 * @throws Will throw an error if the OpenAI API request fails.
 *
 * @example
 * ```typescript
 * const image = await generateImage({ prompt: "A futuristic cityscape" });
 * console.log(image); // Logs the base64 encoded image string
 * ```
 */
async function generateImage(arg0: { prompt: string; }) {
  const model = process.env.OPENAI_MODEL_ID!;
  console.log('Generate Image with prompt: ' + arg0.prompt);
  const response = await openai.images.generate({
    model: model,
    prompt: arg0.prompt,
    n: 1,
    size: "1024x1792",
    style: "vivid",
    response_format: "b64_json",
  });

  const image = response.data[0]?.b64_json ? 'data:image/png;base64,' + response.data[0].b64_json : '';
  return image;
}

