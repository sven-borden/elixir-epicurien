"use client";

import { useCocktail } from '~/app/_contexts/CocktailContext';

export function LatestCocktail() {
  const { latestCocktail } = useCocktail();

  if (!latestCocktail) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
      {latestCocktail.image && (
      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={latestCocktail.image} 
        alt={latestCocktail.name} />
      )}
      <div className="flex flex-col justify-start p-6">
        <h2
          className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          {latestCocktail.name}
        </h2>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {latestCocktail.description}
        </p>
      </div>
    </div>
    // <div className="max-w-128 p-4 rounded shadow bg-dark-purple text-white flex">
    //   {latestCocktail.image && (
    //     <div className="w-1/2 pr-4">
    //       <img src={latestCocktail.image} alt={latestCocktail.name} className="w-full h-auto mb-4 rounded" />
    //     </div>
    //   )}
    //   <div className="w-1/2 pl-4">
    //     <h2 className="text-xl font-bold text-white">{latestCocktail.name}</h2>
    //     <p className="text-gray-300 mb-4">{latestCocktail.description}</p>
    //     <h3 className="text-lg font-semibold text-white">Ingredients:</h3>
    //     <ul className="list-disc list-inside mb-4 text-gray-300">
    //       {latestCocktail.ingredients.map((ingredient, index) => (
    //         <li key={index}>{ingredient}</li>
    //       ))}
    //     </ul>
    //     <h3 className="text-lg font-semibold text-white">Instructions:</h3>
    //     <ol className="list-decimal list-inside mb-4 text-gray-300">
    //       {latestCocktail.instructions.map((instruction, index) => (
    //         <li key={index}>{instruction}</li>
    //       ))}
    //     </ol>
    //   </div>
    // </div>
  );
}
