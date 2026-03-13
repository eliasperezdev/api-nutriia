import type { Recipe, AdaptedRecipeResult } from "@/lib/types";
import IngredientDiff from "@/components/recipe/IngredientDiff";
import StepDiff from "@/components/recipe/StepDiff";
import WarningsBanner from "@/components/recipe/WarningsBanner";
import { MacrosCard } from "@/components/recipe/RecipeDetail";

interface Props {
  original: Recipe;
  result: AdaptedRecipeResult;
}

export default function AdaptedView({ original, result }: Props) {
  const adapted = result.recipe;

  return (
    <div className="space-y-8">
      {/* Warnings / changes banner */}
      <WarningsBanner
        warnings={result.warnings}
        technicalChanges={result.technicalChanges}
        optionalSuggestions={result.optionalSuggestions}
      />

      {/* Macros diff */}
      <MacrosCard macros={adapted.macros} />

      {/* Ingredient diff */}
      <IngredientDiff
        original={original.ingredients}
        adapted={adapted.ingredients}
      />

      {/* Step diff */}
      <StepDiff original={original.steps} adapted={adapted.steps} />
    </div>
  );
}
