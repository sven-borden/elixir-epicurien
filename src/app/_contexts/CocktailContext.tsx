"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Cocktail } from "../Interfaces/Cocktail";
interface CocktailContextType {
  generatedCocktail: Cocktail | null;
  setGeneratedCocktail: (
    cocktail: Cocktail | ((prev: Cocktail | null) => Cocktail),
  ) => void;
}

const CocktailContext = createContext<CocktailContextType | undefined>(
  undefined,
);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [generatedCocktail, setGeneratedCocktail] = useState<Cocktail | null>(
    null,
  );

  return (
    <CocktailContext.Provider
      value={{ generatedCocktail, setGeneratedCocktail }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

export const useGeneratedCocktail = () => {
  const context = useContext(CocktailContext);
  if (!context) {
    throw new Error(
      "useGeneratedCocktail must be used within a CocktailProvider",
    );
  }
  return context;
};
