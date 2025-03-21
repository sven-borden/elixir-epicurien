"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Cocktail } from "~/server/db/schema";
interface CocktailContextType {
  generatedCocktail: Cocktail | null;
  setGeneratedCocktail: (
    cocktail: Cocktail | ((prev: Cocktail | null) => Cocktail),
  ) => void;
  loadingImage: boolean;
  setLoadingImage: (loading: boolean) => void;
}

const CocktailContext = createContext<CocktailContextType | undefined>(
  undefined,
);

export const CocktailProvider = ({ children }: { children: ReactNode }) => {
  const [generatedCocktail, setGeneratedCocktail] = useState<Cocktail | null>(
    null,
  );
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <CocktailContext.Provider
      value={{
        generatedCocktail,
        setGeneratedCocktail,
        loadingImage,
        setLoadingImage,
      }}
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
