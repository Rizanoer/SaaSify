'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'id' as const, label: 'Indonesia', flag: '🇮🇩' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = languages.find((l) => l.code === locale)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Select language"
      >
        <Globe size={16} />
        <span>{current?.flag} {current?.code.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false) }}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors',
                  locale === lang.code
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                )}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
