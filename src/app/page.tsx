import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { CocktailProvider } from "~/app/_contexts/CocktailContext";
import { GeneratedCocktail } from "~/app/_components/GeneratedCocktail";
import CocktailSearchTextInput from "~/app/_components/CocktailSearchTextInput";
import PreviousCocktails from "./_components/PreviousCocktails";


export default async function Home() {
  const session = await getServerAuthSession();

  // void api.cocktail.getLatest.prefetch();

  return (
    <HydrateClient>
      <CocktailProvider>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <nav className="absolute top-0 left-0 p-4 flex items-center justify-between w-full">
            <div className="flex items-center">
              {session && <span className="mr-4">Logged in as {session.user?.name}</span>}
            </div>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </nav>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Elixir <span className="text-[hsl(280,100%,70%)]">Epicurien</span>
            </h1>
            <div className="flex flex-col items-center gap-2 w-full">
              <CocktailSearchTextInput />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <GeneratedCocktail />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <PreviousCocktails />
            </div>
          </div>
          <Analytics />
          <SpeedInsights />
        </main>
      </CocktailProvider>
    </HydrateClient>
  );
}
