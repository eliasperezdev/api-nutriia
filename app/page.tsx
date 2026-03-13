import { getRecipes } from "@/lib/api";
import RecipeCard from "@/components/recipe/RecipeCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    console.error("[NutriIA] Error al cargar recetas:", err);
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-stone-500 dark:text-stone-400">No se pudieron cargar las recetas.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 rounded-lg bg-red-50 p-4 text-xs text-red-700 whitespace-pre-wrap">
            {err instanceof Error ? err.message : String(err)}
          </pre>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-amber-50">NutriIA</h1>
        <p className="mt-1 text-stone-500 dark:text-stone-400">Adaptá recetas según tus condiciones dietarias</p>
      </header>

      {recipes.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-400">No hay recetas disponibles.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}
