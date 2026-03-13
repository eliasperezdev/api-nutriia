# Nutriia — Frontend

Frontend de Nutriia, una herramienta que adapta recetas de cocina según restricciones dietarias.

<!-- Links -->
<!-- [Demo](https://...) · [Backend](https://...) -->

---

## Qué hace

- Muestra un catálogo de recetas disponibles
- Permite adaptar una receta según condición dietaria (diabetes, hipertensión, celiaquía)
- Muestra un diff visual de los cambios: ingredientes eliminados, sustituidos y pasos modificados
- Presenta warnings y sugerencias opcionales del sistema

El trabajo de validación y adaptación con LLM vive en el backend.

---

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript estricto
- Tailwind CSS v4
- Tipos generados desde el Swagger del backend

---

## Setup

### 1. Variables de entorno

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> El backend debe estar corriendo en `NEXT_PUBLIC_API_URL` antes de usar la app.

---

## Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter |
| `npm run generate-types` | Genera tipos TypeScript desde el Swagger del backend |

Para `generate-types` con un backend en otra URL:

```bash
API_URL=https://api.staging.ejemplo.com npm run generate-types
```

---

## Estructura

```
app/
  page.tsx              ← catálogo de recetas (server component)
  recipe/[id]/page.tsx  ← detalle + adaptación de receta
components/recipe/
  RecipePage.tsx         ← maneja los estados idle / loading / result
  RecipeCard.tsx         ← tarjeta en el catálogo
  RecipeDetail.tsx       ← muestra la receta original
  AdaptForm.tsx          ← selector de condición + ingredientes a evitar
  AdaptedView.tsx        ← contenedor del diff
  IngredientDiff.tsx     ← ingredientes con colores (rojo tachado / verde nuevo)
  StepDiff.tsx           ← pasos modificados resaltados
  WarningsBanner.tsx     ← warnings y sugerencias
lib/
  api.ts                 ← todos los fetch al backend, un solo lugar
contexts/
  RecipeCatalogContext   ← catálogo de ingredientes y tags dietarios
```

---

## API

Todos los calls van a `${NEXT_PUBLIC_API_URL}`:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/recipes` | Lista de recetas |
| `GET` | `/recipes/{id}` | Detalle de receta |
| `GET` | `/ingredients` | Catálogo de ingredientes |
| `GET` | `/ingredients/dietary-tags` | Tags dietarios disponibles |
| `POST` | `/recipes/adapt` | Adaptar receta |

Documentación completa en `[backend]/api` (Swagger).
