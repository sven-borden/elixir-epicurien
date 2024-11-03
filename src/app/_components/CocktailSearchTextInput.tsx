"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useGeneratedCocktail } from "~/app/_contexts/CocktailContext";
import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";

export default function CocktailSearchTextInput() {
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setGeneratedCocktail } = useGeneratedCocktail();

  const createCocktail = api.cocktail.generateNew.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      setGeneratedCocktail(data);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleSubmit = () => {
    createCocktail.mutate({ query: promptValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex w-full max-w-[30rem]">
      <Input
        type="text"
        value={promptValue}
        size="lg"
        label="Prompt"
        onChange={(e) => setPromptValue(e.target.value)}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
        variant="outlined"
        onKeyDown={handleKeyDown}
        placeholder="Ask for a cocktail recipe..."
        crossOrigin={undefined}
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
