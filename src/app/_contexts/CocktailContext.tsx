"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface Cocktail {
  id: string;
  name: string;
  description?: string | null;
  ingredients: string[];
  instructions: string[];
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

interface CocktailContextType {
  generatedCocktail: Cocktail | null;
  setGeneratedCocktail: (cocktail: Cocktail) => void;
}

const CocktailContext = createContext<CocktailContextType | undefined>(undefined);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [generatedCocktail, setGeneratedCocktail] = useState<Cocktail | null>(null);

  return (
    <CocktailContext.Provider value={{ generatedCocktail, setGeneratedCocktail }}>
      {children}
    </CocktailContext.Provider>
  );
};

export const useGeneratedCocktail = () => {
  const context = useContext(CocktailContext);
  if (!context) {
    throw new Error('useGeneratedCocktail must be used within a CocktailProvider');
  }
  return context;
};