"use client";

import { createContext, useContext } from "react";
import type { IngredientSummary, DietaryTagOption } from "@/lib/types";

interface RecipeCatalogContextValue {
  ingredients: IngredientSummary[];
  dietaryTags: DietaryTagOption[];
}

const RecipeCatalogContext = createContext<RecipeCatalogContextValue | null>(null);

export function RecipeCatalogProvider({
  children,
  ingredients,
  dietaryTags,
}: {
  children: React.ReactNode;
  ingredients: IngredientSummary[];
  dietaryTags: DietaryTagOption[];
}) {
  return (
    <RecipeCatalogContext.Provider value={{ ingredients, dietaryTags }}>
      {children}
    </RecipeCatalogContext.Provider>
  );
}

export function useRecipeCatalog(): RecipeCatalogContextValue {
  const ctx = useContext(RecipeCatalogContext);
  if (!ctx) throw new Error("useRecipeCatalog debe usarse dentro de RecipeCatalogProvider");
  return ctx;
}
