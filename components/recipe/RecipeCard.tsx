import Link from "next/link";
import type { Recipe } from "@/lib/types";

const DIETARY_TAG_LABELS: Record<string, string> = {
  vegan: "Vegano",
  vegetarian: "Vegetariano",
  keto: "Keto",
  low_carb: "Bajo en carbos",
  gluten_free: "Sin gluten",
  lactose_free: "Sin lactosa",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group flex flex-col rounded-2xl border border-amber-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-amber-300 dark:bg-stone-900 dark:border-stone-700 dark:hover:border-amber-700"
    >
      <h2 className="text-base font-semibold leading-snug text-stone-900 group-hover:text-green-700 transition-colors dark:text-amber-50 dark:group-hover:text-green-400">
        {recipe.name}
      </h2>

      <div className="mt-2 flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
        <span>{recipe.cookingTimeMinutes} min</span>
        <span className="text-stone-300 dark:text-stone-600">·</span>
        <span className="capitalize">{recipe.cookingType}</span>
        <span className="text-stone-300 dark:text-stone-600">·</span>
        <span>{recipe.baseServings} porciones</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 rounded-xl bg-amber-50 p-3 text-center dark:bg-stone-800">
        <MacroCell label="Cal" value={Math.round(recipe.macros.perServing.calories)} />
        <MacroCell label="Prot" value={Math.round(recipe.macros.perServing.protein)} unit="g" />
        <MacroCell label="Grasa" value={Math.round(recipe.macros.perServing.fat)} unit="g" />
        <MacroCell label="Carbs" value={Math.round(recipe.macros.perServing.carbohydrates)} unit="g" />
      </div>

      {recipe.dietaryTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {recipe.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
            >
              {DIETARY_TAG_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function MacroCell({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-stone-400 dark:text-stone-500">{label}</span>
      <span className="text-sm font-semibold text-stone-800 dark:text-amber-100">
        {value}
        {unit && <span className="text-xs font-normal text-stone-400 dark:text-stone-500">{unit}</span>}
      </span>
    </div>
  );
}
