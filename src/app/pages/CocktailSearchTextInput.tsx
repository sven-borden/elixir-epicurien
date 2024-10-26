"use client";
// CocktailSearchTextInput.tsx
import React, { useState } from 'react';

const CocktailSearchTextInput: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call the endpoint "XXX" with the query
    try {
      const response = await fetch('XXX', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <input
        type="text"
        placeholder="Ask for a cocktail recipe..."
        className="flex-grow p-2 text-black rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default CocktailSearchTextInput;