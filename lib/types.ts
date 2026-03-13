import type { components } from "@/src/types/api";

export type Recipe = components["schemas"]["Recipe"];
export type RecipeIngredient = components["schemas"]["RecipeIngredient"];
export type RecipeStep = components["schemas"]["RecipeStep"];
export type Macros = components["schemas"]["Macros"];
export type RecipeMacros = components["schemas"]["RecipeMacros"];
export type IngredientSummary = components["schemas"]["IngredientSummary"];
export type DietaryTag = components["schemas"]["DietaryTag"];
export type DietaryTagOption = components["schemas"]["DietaryTagOption"];
export type AdaptRequest = components["schemas"]["AdaptRequest"];
export type AdaptedRecipeResult = components["schemas"]["AdaptedRecipeResult"];

export type ConditionId = AdaptRequest["conditionId"];

export const CONDITION_LABELS: Record<ConditionId, string> = {
  diabetes: "Diabetes",
  hypertension: "Hipertensión",
  celiac: "Celiaquía",
};
