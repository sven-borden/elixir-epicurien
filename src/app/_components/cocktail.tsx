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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCocktail.mutate({ name });
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter cocktail name"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Add Cocktail
        </button>
      </form>
    </div>
  );
}