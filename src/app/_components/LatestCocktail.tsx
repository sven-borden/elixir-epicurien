"use client";

import { useCocktail } from '~/app/_contexts/CocktailContext';

export function LatestCocktail() {
  const { latestCocktail } = useCocktail();

  if (!latestCocktail) {
    return <div className="w-full max-w-xs">No latest cocktail available.</div>;
  }

  return (
    <div className="w-full max-w-xs p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{latestCocktail.name}</h2>
      {latestCocktail.image && (
        <img src={latestCocktail.image} alt={latestCocktail.name} className="w-full h-auto mb-4" />
      )}
      <p className="text-gray-700 mb-2">{latestCocktail.description}</p>
      <h3 className="text-lg font-semibold">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {latestCocktail.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold">Instructions:</h3>
      <ol className="list-decimal list-inside mb-4">
        {latestCocktail.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
