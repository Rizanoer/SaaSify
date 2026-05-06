'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/components/providers/language-provider'
import { createTranslator } from '@/lib/i18n'

export function useTranslation() {
  const { locale, setLocale } = useContext(LanguageContext)
  const t = createTranslator(locale)
  return { t, locale, setLocale }
}
