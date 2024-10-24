"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestCocktail() {
  const [latestcocktail] = api.cocktail.getLatest.useSuspenseQuery();

  return (
    <div className="w-full max-w-xs">
      {latestcocktail ? (
        <p>Your most recent cocktail: {latestcocktail.name}</p>
      ) : (
        <p>You have no cocktails yet.</p>
      )}
    </div>
  );
}