"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Cocktail } from "../Interfaces/Cocktail";

const PreviousCocktails = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const { data, isLoading, error } = api.cocktail.getLatestCocktails.useQuery();

  useEffect(() => {
    if (data) {
      setCocktails(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cocktails</div>;
  }

  return (
    <div className="w-full max-w-[48rem]">
      {cocktails.map((cocktail) => (
        <Card key={cocktail.id} className="mb-4" placeholder={undefined}>
          <CardBody placeholder={undefined}>
            <Typography variant="h3" color="purple" className="mb-2" placeholder={undefined}>
              {cocktail.name}
            </Typography>
            <Typography color="gray" className="mb-4" placeholder={undefined}>
              {cocktail.description}
            </Typography>
            <Typography variant="h6" color="deep-purple" className="mb-2" placeholder={undefined}>
              Ingredients
            </Typography>
            <ul className="list-disc list-inside mb-4 text-gray-900">
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <Typography variant="h6" color="deep-purple" className="mb-2" placeholder={undefined}>
              Instructions
            </Typography>
            <ul className="list-decimal list-inside mb-4 text-gray-900">
              {cocktail.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PreviousCocktails;