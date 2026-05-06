'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
}

function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([])

  function toggle(id: string) {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('divide-y divide-slate-200', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-slate-900">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  'flex-shrink-0 text-slate-400 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface AccordionSingleProps {
  id: string
  question: ReactNode
  children: ReactNode
  className?: string
}

function AccordionSingle({ id, question, children, className }: AccordionSingleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('border-b border-slate-200 py-4', className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-base font-medium text-slate-900">{question}</span>
        <ChevronDown
          size={20}
          className={cn(
            'flex-shrink-0 text-slate-400 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionSingle }
export type { AccordionItem, AccordionProps }
