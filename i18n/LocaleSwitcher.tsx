"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border p-1"
      aria-label="Select language"
    >
      {(["en", "es"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded-full px-3 py-1 text-sm font-medium transition ${
            locale === option
              ? "bg-black text-white"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
