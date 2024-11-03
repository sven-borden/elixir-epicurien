"use client";
export interface Cocktail {
    description: string | null;
    id: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}
