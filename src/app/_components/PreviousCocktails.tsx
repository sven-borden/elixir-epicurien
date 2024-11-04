"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Carousel,
} from "@material-tailwind/react";
import { Cocktail } from "../Interfaces/Cocktail";
import Dialog, {
  DialogHeader,
} from "@material-tailwind/react/components/Dialog";
import CocktailDetails from "./CocktailDetails";

const PreviousCocktails = () => {
  // Manage cocktails state
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const { data, isLoading, error } = api.cocktail.getLatestCocktails.useQuery();

  // Manage card open state
  const [cardOpen, setCardOpen] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null,
  );

  const handleCardClick = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail);
    setCardOpen(true);
  };

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
    <div className="grid w-full max-w-[72rem] grid-cols-1 gap-4 md:grid-cols-2">
      {cocktails.map((cocktail) => (
        <Card
          key={cocktail.id}
          className="relative grid w-full max-w-[48rem] cursor-pointer flex-row items-end overflow-hidden transition-opacity hover:opacity-90"
          onClick={() => handleCardClick(cocktail)}
          placeholder={undefined}
        >
          {cocktail.image && (
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none"
              placeholder={undefined}
            >
              <img
                src={cocktail.image}
                alt="card-image"
                className="h-full w-full object-cover"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
            </CardHeader>
          )}
          <CardBody
            className="relative px-6 py-14 md:px-12"
            placeholder={undefined}
          >
            <Typography
              variant="h3"
              className="mb-2 text-appTheme-background"
              placeholder={undefined}
            >
              {cocktail.name}
            </Typography>
            <Typography
              className="mb-4 text-appTheme-background"
              placeholder={undefined}
            >
              {cocktail.description}
            </Typography>
          </CardBody>
        </Card>
      ))}
      {selectedCocktail && (
        <CocktailDetails
          cocktail={selectedCocktail}
          onClose={() => setCardOpen(false)}
          open={cardOpen}
        />
      )}
    </div>
  );
};

export default PreviousCocktails;
