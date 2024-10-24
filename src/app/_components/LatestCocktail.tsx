"use client";

import { useCocktail } from '~/app/_contexts/CocktailContext';

export function LatestCocktail() {
  const { latestCocktail } = useCocktail();

  if (!latestCocktail) {
    return null;
  }

  return (
    <div className="max-w-128 p-4 rounded shadow bg-dark-purple text-white flex">
      {latestCocktail.image && (
        <div className="w-1/2 pr-4">
          <img src={latestCocktail.image} alt={latestCocktail.name} className="w-full h-auto mb-4 rounded" />
        </div>
      )}
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-bold text-white">{latestCocktail.name}</h2>
        <p className="text-gray-300 mb-4">{latestCocktail.description}</p>
        <h3 className="text-lg font-semibold text-white">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          {latestCocktail.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold text-white">Instructions:</h3>
        <ol className="list-decimal list-inside mb-4 text-gray-300">
          {latestCocktail.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
