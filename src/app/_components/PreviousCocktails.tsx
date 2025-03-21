"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { Cocktail } from "../Interfaces/Cocktail";
import CocktailDetails from "./CocktailDetails";

const PreviousCocktails = () => {
  // Manage cocktails state
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  // Manage card open state
  const [cardOpen, setCardOpen] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null,
  );

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } = 
    api.cocktail.getLatestCocktails.useInfiniteQuery(
      {
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  // Process data changes with useEffect instead of onSuccess
  useEffect(() => {
    if (data) {
      const flattenedCocktails = data.pages.flatMap(page => page.items);
      setCocktails(flattenedCocktails);
      setHasMore(data.pages[data.pages.length - 1].nextCursor !== undefined);
    }
  }, [data]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCocktailElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading || isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchNextPage();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingNextPage, hasMore, fetchNextPage]);

  const handleCardClick = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail);
    setCardOpen(true);
  };

  if (isLoading && cocktails.length === 0) {
    return <div className="flex justify-center py-8"><Spinner className="h-12 w-12" /></div>;
  }

  if (error) {
    return <div>Error loading cocktails: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="grid w-full max-w-[72rem] grid-cols-1 gap-4 md:grid-cols-2">
        {cocktails.map((cocktail, index) => (
          <div 
            key={cocktail.id}
            ref={index === cocktails.length - 1 ? lastCocktailElementRef : undefined}
          >
            <Card
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
          </div>
        ))}
        {selectedCocktail && (
          <CocktailDetails
            cocktail={selectedCocktail}
            onClose={() => setCardOpen(false)}
            open={cardOpen}
          />
        )}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner className="h-8 w-8" />
        </div>
      )}
      {!hasMore && cocktails.length > 0 && (
        <div className="mt-4 text-center text-gray-500">
          No more cocktails to load
        </div>
      )}
    </div>
  );
};

export default PreviousCocktails;
