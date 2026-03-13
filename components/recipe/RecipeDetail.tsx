"use client";

import type { Recipe } from "@/lib/types";
import { useRecipeCatalog } from "@/contexts/RecipeCatalogContext";

const DIETARY_TAG_LABELS: Record<string, string> = {
  vegan: "Vegano",
  vegetarian: "Vegetariano",
  keto: "Keto",
  low_carb: "Bajo en carbos",
  gluten_free: "Sin gluten",
  lactose_free: "Sin lactosa",
};

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const { ingredients: catalog } = useRecipeCatalog();
  const nameOf = (id: string) => catalog.find((i) => i.id === id)?.name ?? id;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
        <span>{recipe.cookingTimeMinutes} min</span>
        <span className="text-stone-300 dark:text-stone-600">·</span>
        <span className="capitalize">{recipe.cookingType}</span>
        <span className="text-stone-300 dark:text-stone-600">·</span>
        <span>{recipe.currentServings} porciones</span>
        {recipe.dietaryTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
          >
            {DIETARY_TAG_LABELS[tag] ?? tag}
          </span>
        ))}
      </div>

      <MacrosCard macros={recipe.macros} />

      <section>
        <h2 className="mb-3 text-lg font-semibold text-stone-800 dark:text-amber-100">Ingredientes</h2>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing.ingredientId}
              className="flex items-baseline justify-between rounded-lg px-3 py-2 text-sm odd:bg-amber-50 dark:odd:bg-stone-800/60"
            >
              <span className="text-stone-700 dark:text-stone-300">{nameOf(ing.ingredientId)}</span>
              <span className="text-stone-500 dark:text-stone-400">{ing.grams} g</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-stone-800 dark:text-amber-100">Preparación</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step) => (
            <li key={step.order} className="flex gap-3 text-sm text-stone-700 dark:text-stone-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800 dark:bg-green-900/50 dark:text-green-300">
                {step.order}
              </span>
              <span>{step.description}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function MacrosCard({ macros }: { macros: Recipe["macros"] }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-5 dark:bg-stone-900 dark:border-stone-700">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-400">Macros</h3>
      <div className="grid grid-cols-2 gap-6">
        <MacrosBlock label="Por porción" m={macros.perServing} />
        <MacrosBlock label="Total" m={macros.total} />
      </div>
    </div>
  );
}

function MacrosBlock({ label, m }: { label: string; m: Recipe["macros"]["total"] }) {
  return (
    <div>
      <p className="mb-2 text-xs text-stone-400 dark:text-stone-500">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <Macro label="Calorías" value={m.calories} />
        <Macro label="Proteína" value={m.protein} unit="g" />
        <Macro label="Grasa" value={m.fat} unit="g" />
        <Macro label="Carbos" value={m.carbohydrates} unit="g" />
      </div>
    </div>
  );
}

function Macro({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div>
      <span className="block text-xs text-stone-400 dark:text-stone-500">{label}</span>
      <span className="text-sm font-semibold text-stone-800 dark:text-amber-100">
        {Math.round(value)}
        {unit && <span className="text-xs font-normal text-stone-400 dark:text-stone-500"> {unit}</span>}
      </span>
    </div>
  );
}
