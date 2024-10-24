"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface Cocktail {
  name: string;
}

interface CocktailContextType {
  latestCocktail: Cocktail | null;
  setLatestCocktail: (cocktail: Cocktail) => void;
}

const CocktailContext = createContext<CocktailContextType | undefined>(undefined);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [latestCocktail, setLatestCocktail] = useState<Cocktail | null>(null);

  return (
    <CocktailContext.Provider value={{ latestCocktail, setLatestCocktail }}>
      {children}
    </CocktailContext.Provider>
  );
};

export const useCocktail = () => {
  const context = useContext(CocktailContext);
  if (!context) {
    throw new Error('useCocktail must be used within a CocktailProvider');
  }
  return context;
};