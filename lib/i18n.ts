import { en } from './locales/en'
import { id } from './locales/id'

export type Locale = 'en' | 'id'

export const locales = { en, id } as const

export type TranslationKeys = typeof en

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : path
}

export function createTranslator(locale: Locale) {
  const translations = locales[locale] as unknown as Record<string, unknown>
  return function t(key: string): string {
    return getNestedValue(translations, key)
  }
}
