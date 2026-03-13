import { getIngredients, getDietaryTags } from "@/lib/api";
import { RecipeCatalogProvider } from "@/contexts/RecipeCatalogContext";

export default async function RecipeLayout({ children }: { children: React.ReactNode }) {
  const [ingredients, dietaryTags] = await Promise.all([
    getIngredients().catch(() => []),
    getDietaryTags().catch(() => []),
  ]);

  return (
    <RecipeCatalogProvider ingredients={ingredients} dietaryTags={dietaryTags}>
      {children}
    </RecipeCatalogProvider>
  );
}
