"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestCocktail() {
  const [latestcocktail] = api.cocktail.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createCocktail = api.cocktail.create.useMutation({
    onSuccess: async () => {
      await utils.cocktail.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestcocktail ? (
        <p className="truncate">Your most recent cocktail: {latestcocktail.name}</p>
      ) : (
        <p>You have no cocktails yet.</p>
      )}
    </div>
  );
}