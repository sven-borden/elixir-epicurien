"use client";

import { useCocktail } from '~/app/_contexts/CocktailContext';

export function LatestCocktail() {
  const { latestCocktail } = useCocktail();

  return (
    <div className="w-full max-w-xs">
      {latestCocktail ? (
        <p>Your most recent cocktail: {latestCocktail.name}</p>
      ) : (
        <p>You have no cocktails yet.</p>
      )}
    </div>
  );
}