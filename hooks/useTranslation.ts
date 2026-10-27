import es from "@/i18n/es.json";
import en from "@/i18n/en.json";
import type { Locale } from "@/i18n/config";

const dictionaries = { es, en };

export function getTranslation(locale: Locale, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[part];
  }, dictionaries[locale]);

  return typeof value === "string" ? value : key;
}
