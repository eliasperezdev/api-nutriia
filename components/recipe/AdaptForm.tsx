"use client";

import { useState, useRef, useEffect } from "react";
import { adaptRecipe } from "@/lib/api";
import { CONDITION_LABELS } from "@/lib/types";
import { useRecipeCatalog } from "@/contexts/RecipeCatalogContext";
import type { Recipe, AdaptedRecipeResult, IngredientSummary, ConditionId } from "@/lib/types";

const CONDITIONS: ConditionId[] = ["diabetes", "hypertension", "celiac"];

interface Props {
  recipe: Recipe;
  onAdapted: (result: AdaptedRecipeResult) => void;
  onCancel: () => void;
}

export default function AdaptForm({ recipe, onAdapted, onCancel }: Props) {
  const { ingredients: allIngredients } = useRecipeCatalog();
  const [conditionId, setConditionId] = useState<ConditionId>("diabetes");
  const [dislikes, setDislikes] = useState<IngredientSummary[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const suggestions = query.trim().length > 0
    ? allIngredients.filter(
        (ing) =>
          ing.name.toLowerCase().includes(query.toLowerCase()) &&
          !dislikes.some((d) => d.id === ing.id)
      ).slice(0, 8)
    : [];

  function addDislike(ing: IngredientSummary) {
    setDislikes((prev) => [...prev, ing]);
    setQuery("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  }

  function removeDislike(id: string) {
    setDislikes((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await adaptRecipe({
        recipe,
        conditionId,
        dislikes: dislikes.map((d) => d.id),
      });
      onAdapted(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al adaptar la receta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-amber-200 bg-white p-6 space-y-6 shadow-sm dark:bg-stone-900 dark:border-stone-700"
    >
      <h2 className="text-base font-semibold text-stone-900 dark:text-amber-50">Adaptar receta</h2>

      {/* Condition */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-stone-700 dark:text-stone-300">Condición</legend>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConditionId(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                conditionId === c
                  ? "border-green-700 bg-green-700 text-white dark:border-green-600 dark:bg-green-600"
                  : "border-stone-300 text-stone-600 hover:border-amber-400 hover:text-amber-800 dark:border-stone-600 dark:text-stone-300 dark:hover:border-amber-600 dark:hover:text-amber-300"
              }`}
            >
              {CONDITION_LABELS[c]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Dislikes */}
      <div>
        <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Ingredientes que no querés
        </label>

        {/* Chips */}
        {dislikes.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {dislikes.map((d) => (
              <span
                key={d.id}
                className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-900 dark:bg-stone-700 dark:text-stone-200"
              >
                {d.name}
                <button
                  type="button"
                  onClick={() => removeDislike(d.id)}
                  className="text-amber-500 hover:text-amber-900 transition leading-none dark:text-stone-400 dark:hover:text-stone-100"
                  aria-label={`Quitar ${d.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setDropdownOpen(true); }}
            onFocus={() => query.trim() && setDropdownOpen(true)}
            placeholder="Buscar ingrediente..."
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200 dark:placeholder-stone-500 dark:focus:border-green-500 dark:focus:ring-green-900/30"
          />

          {/* Dropdown */}
          {dropdownOpen && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-1 w-full rounded-xl border border-amber-200 bg-white py-1 shadow-lg dark:bg-stone-900 dark:border-stone-700"
            >
              {suggestions.map((ing) => (
                <button
                  key={ing.id}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); addDislike(ing); }}
                  className="flex w-full items-baseline justify-between px-3 py-2 text-left text-sm hover:bg-amber-50 dark:hover:bg-stone-800"
                >
                  <span className="text-stone-800 dark:text-stone-200">{ing.name}</span>
                  <span className="text-xs text-stone-400 dark:text-stone-500">{ing.categoryLabel}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full bg-green-700 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60 transition dark:bg-green-700 dark:hover:bg-green-600"
        >
          {loading ? "Adaptando..." : "Adaptar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
