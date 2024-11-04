"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Cocktail } from "../Interfaces/Cocktail";
import Dialog, {
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react/components/Dialog";

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
      <Dialog
        open={cardOpen}
        size="xl"
        handler={() => setCardOpen(false)}
        placeholder={undefined}
        className="rounded-3xl bg-gradient-to-b from-gray-200 to-purple-50 text-gray-900"
      >
        <DialogHeader className="justify-between" placeholder={undefined}>
          {selectedCocktail && (
            <div className="flex w-full flex-col">
              {/* Cocktail header */}
              <div className="flex flex-row">
                <div className="w-1/2 p-4">
                  <Typography
                    variant="h3"
                    color="purple"
                    className="mb-2"
                    placeholder={undefined}
                  >
                    {selectedCocktail.name}
                  </Typography>
                  <Typography
                    color="gray"
                    variant="paragraph"
                    className="mb-8"
                    placeholder={undefined}
                  >
                    {selectedCocktail.description}
                  </Typography>
                </div>
                {selectedCocktail.image && (
                  <div className="w-1/2">
                    <img
                      src={selectedCocktail.image}
                      alt="cocktail-image"
                      className="h-full w-full rounded-xl object-cover shadow-xl"
                    />
                  </div>
                )}
              </div>

              {/* Ingredient card */}
              <div className="p-4">
                <Card
                  className="mb-4 w-full max-w-[48rem] flex-row shadow-lg"
                  placeholder={undefined}
                >
                  <CardBody placeholder={undefined}>
                    <Typography
                      variant="h4"
                      color="deep-purple"
                      className="mb-2"
                      placeholder={undefined}
                    >
                      Ingredients
                    </Typography>
                    <ul className="mb-4 list-inside list-disc text-gray-900">
                      {selectedCocktail.ingredients.map((ingredient, index) => (
                        <Typography variant="paragraph" placeholder={undefined}>
                          <li key={index}>{ingredient}</li>
                        </Typography>
                      ))}
                    </ul>
                  </CardBody>
                </Card>

                {/* Recipe card */}
                <Card
                  className="mb-4 w-full max-w-[48rem] flex-row shadow-lg"
                  placeholder={undefined}
                >
                  <CardBody placeholder={undefined}>
                    <Typography
                      variant="h4"
                      color="deep-purple"
                      className="mb-2"
                      placeholder={undefined}
                    >
                      Recipe
                    </Typography>
                    <ol className="mb-4 list-inside list-decimal text-gray-900">
                      {selectedCocktail.instructions.map(
                        (instruction, index) => (
                          <Typography
                            variant="paragraph"
                            placeholder={undefined}
                          >
                            <li key={index}>{instruction}</li>
                          </Typography>
                        ),
                      )}
                    </ol>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </DialogHeader>
      </Dialog>
    </div>
  );
};

export default PreviousCocktails;
