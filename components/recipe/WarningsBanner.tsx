interface Props {
  warnings: string[];
  technicalChanges: string[];
  optionalSuggestions: string[];
}

export default function WarningsBanner({ warnings, technicalChanges, optionalSuggestions }: Props) {
  return (
    <div className="space-y-4">
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700/50 dark:bg-amber-900/20">
          <h3 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-300">Advertencias</h3>
          <ul className="space-y-1">
            {warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-400">
                <span className="mt-0.5 shrink-0">⚠</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technical changes */}
      {technicalChanges.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50">
          <h3 className="mb-2 text-sm font-semibold text-stone-700 dark:text-stone-300">Cambios aplicados</h3>
          <ul className="space-y-1">
            {technicalChanges.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-500">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optional suggestions */}
      {optionalSuggestions.length > 0 && (
        <details className="rounded-xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 select-none dark:text-stone-400 dark:hover:text-amber-200">
            Sugerencias opcionales ({optionalSuggestions.length})
          </summary>
          <ul className="border-t border-stone-100 px-4 py-3 space-y-1.5 dark:border-stone-800">
            {optionalSuggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-600">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
