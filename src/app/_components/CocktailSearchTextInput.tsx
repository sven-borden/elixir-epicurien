"use client";
import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { api } from "~/trpc/react";
import { useGeneratedCocktail } from "~/app/_contexts/CocktailContext";
import Button from "@material-tailwind/react/components/Button";
import { Textarea } from "@material-tailwind/react";
import type { Cocktail } from "@prisma/client";

export default function CocktailSearchTextInput() {
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setGeneratedCocktail, setLoadingImage } = useGeneratedCocktail();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [promptValue]);

  const createCocktail = api.cocktail.generateCocktail.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (cocktailData) => {
      setLoading(false);
      setGeneratedCocktail(cocktailData);

      if (!cocktailData.image) {
        generateImage.mutate({ id: cocktailData.id });
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  const generateImage = api.cocktail.generateImage.useMutation({
    onMutate: () => {
      setLoadingImage(true);
    },
    onSuccess: (imageData) => {
      setLoadingImage(false);
      setGeneratedCocktail((prev: Cocktail | null) => {
        return {
          ...prev,
          image: imageData,
        } as Cocktail;
      });
    },
    onError: () => {
      setLoadingImage(false);
    },
  });

  const handleSubmit = () => {
    createCocktail.mutate({ query: promptValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex w-full max-w-[30rem] flex-col">
      <Textarea
        ref={textareaRef}
        value={promptValue}
        size="lg"
        label="Ask for a cocktail recipe..."
        onChange={(e) => setPromptValue(e.target.value)}
        className="min-h-[3rem] overflow-hidden pr-20 resize-none"
        color="white"
        containerProps={{
          className: "min-w-0",
        }}
        variant="outlined"
        onKeyDown={handleKeyDown}
        placeholder="Ask for a cocktail recipe..."
        disabled={loading}
        rows={1}
      />
      <Button
        variant="gradient"
        loading={loading}
        size="sm"
        color="purple"
        className="!absolute right-1 top-1.5 rounded"
        onClick={handleSubmit}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {loading ? "Loading..." : "Generate a cocktail"}
      </Button>
    </div>
  );
}
