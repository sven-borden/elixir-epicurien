import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

import { CocktailProvider } from "~/app/_contexts/CocktailContext";
import { GeneratedCocktail } from "~/app/_components/GeneratedCocktail";
import CocktailSearchTextInput from "~/app/_components/CocktailSearchTextInput";
import PreviousCocktails from "./_components/PreviousCocktails";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <CocktailProvider>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-purple-100 text-gray-900">
          <nav className="absolute left-0 top-0 flex w-full items-center justify-between p-4">
            <div className="flex items-center">
              {session && (
                <span className="mr-4">Logged in as {session.user?.name}</span>
              )}
            </div>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-appTheme-primary px-10 py-3 font-semibold text-appTheme-background no-underline transition hover:bg-appTheme-secondary"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </nav>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Elixir <span className="text-appTheme-primary">Epicurien</span>
            </h1>
            <div className="flex w-full flex-col items-center gap-2">
              <CocktailSearchTextInput />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <GeneratedCocktail />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
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
