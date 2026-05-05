'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Bell, Search } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { userProfile } from '@/lib/data'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-64 max-w-sm">
            <Search size={16} className="text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>
            <Avatar name={userProfile.name} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
