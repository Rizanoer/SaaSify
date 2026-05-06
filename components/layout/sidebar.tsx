'use client'

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  User,
  Zap,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  const navItems = [
    { label: t('sidebar.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { label: t('sidebar.analytics'), href: '/analytics', icon: BarChart3 },
    { label: t('sidebar.billing'), href: '/billing', icon: CreditCard },
    { label: t('sidebar.settings'), href: '/settings', icon: Settings },
    { label: t('sidebar.profile'), href: '/profile', icon: User },
  ]

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/50 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-700/50', collapsed ? 'justify-center' : 'gap-2')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            SaaSify
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed ? 'justify-center' : 'gap-3',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-2 border-t border-slate-200 dark:border-slate-700/50 space-y-1">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <>
              <ChevronLeft size={20} className="mr-3" />
              <span>{t('sidebar.collapse')}</span>
            </>
          )}
        </button>
        <button
          className={cn(
            'flex items-center w-full rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors',
            collapsed ? 'justify-center' : 'gap-3'
          )}
          title={collapsed ? t('sidebar.logout') : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>{t('sidebar.logout')}</span>}
        </button>
      </div>
    </aside>
  )
}
