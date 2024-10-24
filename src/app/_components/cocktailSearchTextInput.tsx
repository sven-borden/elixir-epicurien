"use client";
import { useState } from 'react';
import { api } from '~/trpc/react';

export default function CocktailSearchTextInput() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const createCocktail = api.cocktail.generateNew.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false); 
    }
  });

  const handleSubmit = () => {
    createCocktail.mutate({ query: inputValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mt-8">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded px-4 py-2 text-black"
        placeholder="Enter cocktail name"
      />
      <button
        onClick={handleSubmit}
        className={`ml-2 rounded px-4 py-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
}