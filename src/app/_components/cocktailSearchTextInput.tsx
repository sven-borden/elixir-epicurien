"use client";
import { useState } from 'react';
import { api } from '~/trpc/react';

export default function CocktailSearchTextInput() {
  const [inputValue, setInputValue] = useState("");
  const createCocktail = api.cocktail.generateNew.useMutation();

  const handleSubmit = () => {
    createCocktail.mutate({ name: inputValue });
  };

  return (
    <div className="mt-8">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded px-4 py-2 text-black"
        placeholder="Enter cocktail name"
      />
      <button onClick={handleSubmit} className="ml-2 rounded bg-blue-500 px-4 py-2 text-white">
        Submit
      </button>
    </div>
  );
}