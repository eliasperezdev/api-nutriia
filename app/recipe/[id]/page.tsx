import { getRecipe } from "@/lib/api";
import { notFound } from "next/navigation";
import RecipePage from "@/components/recipe/RecipePage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let recipe;
  try {
    recipe = await getRecipe(id);
  } catch {
    notFound();
  }

  return <RecipePage recipe={recipe} />;
}
