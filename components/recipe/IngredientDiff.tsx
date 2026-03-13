"use client";

import type { RecipeIngredient } from "@/lib/types";
import { useRecipeCatalog } from "@/contexts/RecipeCatalogContext";

interface Props {
  original: RecipeIngredient[];
  adapted: RecipeIngredient[];
}

export default function IngredientDiff({ original, adapted }: Props) {
  const { ingredients: catalog } = useRecipeCatalog();
  const nameOf = (id: string) => catalog.find((i) => i.id === id)?.name ?? id;

  const originalIds = new Set(original.map((i) => i.ingredientId));
  const adaptedIds = new Set(adapted.map((i) => i.ingredientId));

  const removed = original.filter((i) => !adaptedIds.has(i.ingredientId));
  const added = adapted.filter((i) => !originalIds.has(i.ingredientId));
  const kept = adapted.filter((i) => originalIds.has(i.ingredientId));

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-stone-800 dark:text-amber-100">Ingredientes</h2>
      <ul className="space-y-1.5">
        {/* Removed */}
        {removed.map((ing) => (
          <li
            key={`removed-${ing.ingredientId}`}
            className="flex items-baseline justify-between rounded-lg bg-red-50 px-3 py-2 text-sm dark:bg-red-900/20"
          >
            <span className="text-red-600 line-through dark:text-red-400">{nameOf(ing.ingredientId)}</span>
            <span className="text-red-400 line-through dark:text-red-500">{ing.grams} g</span>
          </li>
        ))}

        {/* Kept */}
        {kept.map((ing) => (
          <li
            key={`kept-${ing.ingredientId}`}
            className="flex items-baseline justify-between rounded-lg px-3 py-2 text-sm odd:bg-amber-50 dark:odd:bg-stone-800/60"
          >
            <span className="text-stone-700 dark:text-stone-300">{nameOf(ing.ingredientId)}</span>
            <span className="text-stone-500 dark:text-stone-400">{ing.grams} g</span>
          </li>
        ))}

        {/* Added */}
        {added.map((ing) => (
          <li
            key={`added-${ing.ingredientId}`}
            className="flex items-baseline justify-between rounded-lg bg-green-50 px-3 py-2 text-sm dark:bg-green-900/20"
          >
            <span className="font-medium text-green-700 dark:text-green-400">{nameOf(ing.ingredientId)}</span>
            <span className="text-green-600 dark:text-green-500">{ing.grams} g</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
