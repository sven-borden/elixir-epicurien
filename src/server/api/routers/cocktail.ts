import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { fakePicture } from "~/server/constants/fakePicture";

import { uploadImage, convertPngToWebp } from "~/server/lib/storage";

const anthropic = new Anthropic();
const openai = new OpenAI();

export const cocktailRouter = createTRPCRouter({
  getLatestCocktails: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(4),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const items = await ctx.db.cocktail.findMany({
        take: limit + 1, // take one more to check if there are more items
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        // Removing the include section as ingredients is a field, not a relation
        // If you have other valid relations, you can add them like this:
        // include: {
        //   user: true,
        //   // other valid relations
        // },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  generateCocktail: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      interface CocktailData {
        title: string;
        description: string;
        ingredients: string[] | Array<{ item: string; quantity: string }>;
        instructions: string[];
      }

      const anthropicMessage = await createAnthropicMessage(input.query);

      // Extract text and remove markdown code blocks if present
      let textContent = (anthropicMessage.content[0] as Anthropic.TextBlock).text ?? "{}";

      // Remove markdown code blocks (```json ... ``` or ``` ... ```)
      textContent = textContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');

      const cocktailData: CocktailData = JSON.parse(textContent) as CocktailData;

      // Normalize ingredients to string array format
      let ingredientsArray: string[];
      if (Array.isArray(cocktailData.ingredients) && cocktailData.ingredients.length > 0) {
        if (typeof cocktailData.ingredients[0] === 'string') {
          ingredientsArray = cocktailData.ingredients as string[];
        } else {
          // Convert object format to string format
          ingredientsArray = (cocktailData.ingredients as Array<{ item: string; quantity: string }>)
            .map(ing => `${ing.quantity} ${ing.item}`);
        }
      } else {
        ingredientsArray = [];
      }

      const existingCocktail = await ctx.db.cocktail.findFirst({
        where: { name: cocktailData.title },
      });

      if (existingCocktail) {
        return existingCocktail;
      }

      if (!ctx.session?.user?.id) {
        const newCocktail = await ctx.db.cocktail.create({
          data: {
            name: cocktailData.title,
            description: cocktailData.description,
            ingredients: ingredientsArray,
            instructions: cocktailData.instructions,
          },
        });
        return newCocktail;
      }

      const newCocktail = await ctx.db.cocktail.create({
        data: {
          name: cocktailData.title,
          description: cocktailData.description,
          ingredients: ingredientsArray,
          instructions: cocktailData.instructions,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
      return newCocktail;
    }),

  // Generate an image based on the description from a cocktail ID
  generateImage: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const cocktail = await ctx.db.cocktail.findUnique({
        where: { id: input.id },
      });

      if (!cocktail) {
        return null;
      }

      const imagePrompt = `${cocktail.name}: ${cocktail.description}`;
      const imageUrl = await generateImage({
        prompt: imagePrompt,
        cocktailId: input.id
      });

      // Update the cocktail with the cloud storage URL
      await ctx.db.cocktail.update({
        where: { id: input.id },
        data: { image: imageUrl },
      });

      return imageUrl;
    }),
});

/**
 * Generates an image based on the provided prompt using the OpenAI API
 * and uploads it to Vercel Blob Storage.
 *
 * @param arg0 - An object containing the prompt string and cocktail ID.
 * @param arg0.prompt - The prompt to generate the image from.
 * @param arg0.cocktailId - The ID of the cocktail (used for naming the file).
 * @returns A promise that resolves to the public URL of the uploaded image.
 *
 * @throws Will throw an error if the OpenAI API request or upload fails.
 *
 * @example
 * ```typescript
 * const imageUrl = await generateImage({
 *   prompt: "A vibrant tropical cocktail",
 *   cocktailId: "clxyz123"
 * });
 * console.log(imageUrl); // Logs the cloud storage URL
 * ```
 */
async function generateImage(arg0: { prompt: string; cocktailId: string }) {
  const environment = process.env.NODE_ENV || "development";
  console.log("Environment: " + environment);
  if (environment === "development") {
    return fakePicture;
  }

  const model = process.env.OPENAI_MODEL_ID!;
  console.log("Generate Image with prompt: " + arg0.prompt);
  const response = await openai.images.generate({
    model: model,
    prompt: arg0.prompt,
    n: 1,
    size: "1024x1792",
    style: "vivid",
    response_format: "b64_json",
  });

  const base64png = response.data[0]?.b64_json ?? "";
  if (!base64png) {
    throw new Error("Failed to generate image: No image data returned from OpenAI");
  }

  // Convert PNG to WebP for smaller file size
  const pngBuffer = Buffer.from(base64png, "base64");
  const webpBuffer = await convertPngToWebp(pngBuffer, 75);

  // Upload to cloud storage and get public URL
  const imageUrl = await uploadImage(webpBuffer, arg0.cocktailId);

  return imageUrl;
}

/**
 * Creates a message using the Anthropic API to generate a cocktail recipe based on the provided query.
 * The generated recipe will be in JSON format with the following structure:
 * - title
 * - description
 * - ingredients
 * - instructions
 *
 * If the API is unable to provide a recipe, it will return a humorous "water only" cocktail recipe.
 *
 * @param {string} query - The user's input query containing information for the cocktail recipe.
 * @returns {Promise<any>} - A promise that resolves to the response from the Anthropic API.
 */
async function createAnthropicMessage(query: string) {
  const model = process.env.ANTHROPIC_MODEL_ID!;

  const anthropicMessage = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    temperature: 0.5,
    system:
      "You are the world expert in mixology. Create a recipe for a refreshing cocktail with information provided by the user. " +
      "The recipe should be easy to follow and include a list of ingredients, their quantities and instructions. " +
      "If you are not able to provide a recipe, reply with the recipe of a water only cocktail with humoristics ingredients and instructions" +
      "Instructions should be provided as a not numbered list" +
      "/n" +
      "Answer using the json format with the following structure:" +
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
        role: "user",
        content: [
          {
            type: "text",
            text: query,
          },
        ],
      },
    ],
  });

  console.log(anthropicMessage.content[0]);

  return anthropicMessage;
}
