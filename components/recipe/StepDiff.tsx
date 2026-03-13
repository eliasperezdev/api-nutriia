import type { RecipeStep } from "@/lib/types";

interface Props {
  original: RecipeStep[];
  adapted: RecipeStep[];
}

export default function StepDiff({ original, adapted }: Props) {
  const originalByOrder = new Map(original.map((s) => [s.order, s.description]));

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-stone-800 dark:text-amber-100">Preparación</h2>
      <ol className="space-y-3">
        {adapted.map((step) => {
          const prev = originalByOrder.get(step.order);
          const changed = prev !== undefined && prev !== step.description;
          const isNew = prev === undefined;

          return (
            <li
              key={step.order}
              className={`flex gap-3 rounded-lg p-2 text-sm ${
                changed || isNew
                  ? "bg-green-50 dark:bg-green-900/20"
                  : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  changed || isNew
                    ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                }`}
              >
                {step.order}
              </span>
              <div className="flex flex-col gap-1">
                {changed && (
                  <span className="text-red-500 line-through dark:text-red-400">{prev}</span>
                )}
                <span
                  className={
                    changed || isNew
                      ? "font-medium text-green-800 dark:text-green-300"
                      : "text-stone-700 dark:text-stone-300"
                  }
                >
                  {step.description}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
