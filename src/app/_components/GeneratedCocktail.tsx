"use client";

import { useGeneratedCocktail } from "~/app/_contexts/CocktailContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import CocktailDetails from "./CocktailDetails";
import AnimatedWaves from "./AnimatedWaves";
import Image from "next/image";

export function GeneratedCocktail() {
  const { generatedCocktail, loadingImage } = useGeneratedCocktail();

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailsClick = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDetailOpen(false);
  };

  if (!generatedCocktail) {
    return null;
  }

  return (
    <div className="w-full max-w-[48rem]">
      <Card className="w-full max-w-[48rem] flex-row" placeholder={undefined}>
        {loadingImage ? (
          <AnimatedWaves />
        ) : (
          generatedCocktail.image && (
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none relative"
              placeholder={undefined}
            >
              {generatedCocktail.image.startsWith('data:') ? (
                // Use regular img tag for base64 images (development mode)
                <img
                  src={generatedCocktail.image}
                  alt={generatedCocktail.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                // Use Next.js Image component for cloud URLs (production)
                <Image
                  src={generatedCocktail.image}
                  alt={generatedCocktail.name}
                  fill
                  className="object-cover"
                />
              )}
            </CardHeader>
          )
        )}
        <CardBody placeholder={undefined}>
          <Typography
            variant="h3"
            color="purple"
            className="mb-2"
            placeholder={undefined}
          >
            {generatedCocktail.name}
          </Typography>
          <Typography
            color="gray"
            className="mb-8"
            variant="paragraph"
            placeholder={undefined}
          >
            {generatedCocktail.description}
          </Typography>
          <Typography
            variant="h4"
            color="deep-purple"
            className="mb-2"
            placeholder={undefined}
          >
            Ingredients
          </Typography>
          <ul className="mb-4 list-inside list-disc text-gray-900">
            {generatedCocktail.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <a href="#" className="inline-block">
            <Button
              variant="gradient"
              size="md"
              color="deep-purple"
              className="flex items-center gap-2"
              placeholder={undefined}
              onClick={handleDetailsClick}
            >
              Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
      {generatedCocktail && (
        <CocktailDetails
          cocktail={generatedCocktail}
          onClose={handleCloseDialog}
          open={isDetailOpen}
        />
      )}
    </div>
  );
}
