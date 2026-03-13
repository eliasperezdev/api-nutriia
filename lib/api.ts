import type {
  Recipe,
  IngredientSummary,
  DietaryTag,
  DietaryTagOption,
  AdaptRequest,
  AdaptedRecipeResult,
} from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  console.log("[api] →", url);
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body?.error ?? "Error desconocido", body);
  }
  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body: unknown,
  ) {
    super(message);
  }
}

export function getRecipes(dietaryTag?: DietaryTag): Promise<Recipe[]> {
  const qs = dietaryTag ? `?dietaryTag=${dietaryTag}` : "";
  return request<Recipe[]>(`/recipes${qs}`);
}

export function getRecipe(id: string): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`);
}

export function getIngredients(): Promise<IngredientSummary[]> {
  return request<IngredientSummary[]>("/ingredients");
}

export function getDietaryTags(): Promise<DietaryTagOption[]> {
  return request<DietaryTagOption[]>("/ingredients/dietary-tags");
}

export function adaptRecipe(body: AdaptRequest): Promise<AdaptedRecipeResult> {
  return request<AdaptedRecipeResult>("/recipes/adapt", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
