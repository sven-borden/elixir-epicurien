"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
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
    <div className="w-full max-w-[72rem] grid grid-cols-2 gap-4">
      {cocktails.map((cocktail) => (
        <Card key={cocktail.id} className="w-full max-w-[48rem] flex-row" placeholder={undefined}>
          {/* {cocktail.image && (
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
              placeholder={undefined}
            >
              <img
                src={cocktail.image}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
          )} */}
          <CardBody placeholder={undefined}>
            <Typography
              variant="h3"
              color="purple"
              className="mb-2"
              placeholder={undefined}
            >
              {cocktail.name}
            </Typography>
            <Typography color="gray" className="mb-4" placeholder={undefined}>
              {cocktail.description}
            </Typography>
            {/* <Typography variant="h6" color="deep-purple" className="mb-2" placeholder={undefined}>
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
            </ul> */}
            <a href="#" className="inline-block">
              <Button
                variant="gradient"
                size="md"
                color="deep-purple"
                className="flex items-center gap-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
      ))}
    </div>
  );
};

export default PreviousCocktails;
