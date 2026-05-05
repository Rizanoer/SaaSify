'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { ReactNode, useRef, useState, useEffect } from 'react'

interface DropdownItem {
  label: string
  onClick: () => void
  icon?: ReactNode
  disabled?: boolean
  danger?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

function Dropdown({ trigger, items, align = 'left', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1"
        aria-expanded={isOpen}
      >
        {trigger}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-2 z-50 min-w-[160px] rounded-xl border border-slate-200 bg-white shadow-lg',
            'py-1 animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              disabled={item.disabled}
              className={cn(
                'flex items-center gap-2 w-full px-4 py-2 text-sm text-left',
                'transition-colors duration-150',
                item.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-slate-700 hover:bg-slate-50',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { Dropdown }
export type { DropdownProps, DropdownItem }
