"use client";

import { useState } from "react";
import Link from "next/link";
import type { Recipe, AdaptedRecipeResult } from "@/lib/types";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import AdaptForm from "@/components/recipe/AdaptForm";
import AdaptedView from "@/components/recipe/AdaptedView";

type State =
  | { kind: "idle" }
  | { kind: "adapting" }
  | { kind: "result"; data: AdaptedRecipeResult };

export default function RecipePage({ recipe }: { recipe: Recipe }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [showForm, setShowForm] = useState(false);

  function handleAdapted(result: AdaptedRecipeResult) {
    setState({ kind: "result", data: result });
    setShowForm(false);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors dark:text-stone-400 dark:hover:text-amber-100"
      >
        ← Todas las recetas
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-amber-50">{recipe.name}</h1>
        {state.kind === "result" ? (
          <button
            onClick={() => { setState({ kind: "idle" }); setShowForm(false); }}
            className="shrink-0 rounded-full border border-stone-300 px-4 py-1.5 text-sm text-stone-600 hover:bg-stone-100 transition dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            Volver a original
          </button>
        ) : (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="shrink-0 rounded-full bg-green-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-800 transition dark:bg-green-800 dark:hover:bg-green-700"
          >
            {showForm ? "Cancelar" : "Adaptar receta"}
          </button>
        )}
      </div>

      {showForm && state.kind !== "result" && (
        <div className="mt-6">
          <AdaptForm
            recipe={recipe}
            onAdapted={handleAdapted}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="mt-8">
        {state.kind === "result" ? (
          <AdaptedView original={recipe} result={state.data} />
        ) : (
          <RecipeDetail recipe={recipe} />
        )}
      </div>
    </main>
  );
}
