'use client'

import { dashboardStats, chartData } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  LayoutDashboard,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Circle,
  X,
  Zap,
  Crown,
  ChevronRight,
  BarChart3,
  Clock,
  FileText,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useUser, UNLIMITED_DISPLAY_VALUE } from '@/contexts/user-context'
import { useState } from 'react'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Activity,
  LayoutDashboard,
  DollarSign,
}

const PLAN_ICONS: Record<string, React.ElementType> = {
  free: Zap,
  starter: Zap,
  pro: Crown,
  enterprise: Sparkles,
}

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  starter: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  pro: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400',
  enterprise: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const activityIconMap: Record<string, React.ElementType> = {
  generation: Sparkles,
  profile_update: Settings,
  plan_change: Crown,
}

export default function DashboardPage() {
  const { user, usage, generations, onboarding, usagePercent } = useUser()
  const [welcomeDismissed, setWelcomeDismissed] = useState(false)

  const onboardingTasks = [
    { key: 'accountCreated', label: 'Create your account', href: null, done: onboarding.accountCreated },
    { key: 'profileCompleted', label: 'Complete your profile', href: '/profile', done: onboarding.profileCompleted },
    { key: 'aiGeneratorTried', label: 'Try the AI Generator', href: '/ai-generator', done: onboarding.aiGeneratorTried },
    { key: 'planUpgraded', label: 'Upgrade your plan', href: '/billing', done: onboarding.planUpgraded },
  ]
  const completedCount = onboardingTasks.filter((t) => t.done).length
  const allDone = completedCount === onboardingTasks.length
  const checklistProgress = Math.round((completedCount / onboardingTasks.length) * 100)

  const usageColor =
    usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-amber-500' : 'bg-emerald-500'

  const limitDisplay =
    usage.generationsLimit >= UNLIMITED_DISPLAY_VALUE ? 'Unlimited' : usage.generationsLimit.toString()

  const PlanIcon = PLAN_ICONS[user.plan] ?? Zap

  const activityFeed = generations.slice(0, 8).map((g) => ({
    id: g.id,
    type: 'generation' as const,
    description: `Generated ${g.type} content`,
    timestamp: g.createdAt,
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome card */}
      {!welcomeDismissed && !allDone && (
        <div className="relative rounded-xl border border-indigo-200 dark:border-indigo-800/50 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 p-5">
          <button
            onClick={() => setWelcomeDismissed(true)}
            className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">👋</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Welcome, {user.name.split(' ')[0]}!
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">
            Let&apos;s get you started with SaaSify. Complete the steps below to unlock the full experience.
          </p>
        </div>
      )}

      {allDone && !welcomeDismissed && (
        <div className="relative rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5">
          <button
            onClick={() => setWelcomeDismissed(true)}
            className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                All done, {user.name.split(' ')[0]}!
              </h2>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                You&apos;ve completed all onboarding steps. You&apos;re all set!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Getting Started Checklist */}
      {!allDone && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-500" />
                Getting Started
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {completedCount} of {onboardingTasks.length} completed
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {onboardingTasks.map((task) => (
                <div
                  key={task.key}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-colors',
                    task.done ? 'opacity-60' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  )}
                >
                  {task.done ? (
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
                  )}
                  {task.href && !task.done ? (
                    <Link
                      href={task.href}
                      className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {task.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        'flex-1 text-sm font-medium',
                        task.done
                          ? 'text-slate-400 dark:text-slate-500 line-through'
                          : 'text-slate-700 dark:text-slate-300'
                      )}
                    >
                      {task.label}
                    </span>
                  )}
                  {!task.done && task.href && (
                    <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* AI Generations stat */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
                <Sparkles size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                This month
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{usage.generationsUsed}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Generations</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{usage.generationsUsed} of {limitDisplay} used</p>
          </CardContent>
        </Card>

        {/* Remaining credits */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
                <Activity size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                  usagePercent >= 90
                    ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                )}
              >
                {usagePercent >= 90 ? 'Low' : 'Available'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {usage.generationsLimit >= UNLIMITED_DISPLAY_VALUE
                ? '∞'
                : Math.max(0, usage.generationsLimit - usage.generationsUsed)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Credits Remaining</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Resets next month</p>
          </CardContent>
        </Card>

        {/* From static data */}
        {dashboardStats.slice(0, 2).map((stat) => {
          const Icon = iconMap[stat.icon] ?? TrendingUp
          const isUp = stat.trend === 'up'
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
                    <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                      isUp
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                    )}
                  >
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  PLAN_COLORS[user.plan] ?? PLAN_COLORS.free
                )}
              >
                <PlanIcon size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                  {user.plan} Plan
                </p>
                <Badge variant="success" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Generations</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {usage.generationsUsed} / {limitDisplay}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', usageColor)}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>

            {user.plan === 'free' && (
              <Link
                href="/billing"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-sm"
              >
                <Zap size={14} />
                Upgrade to Pro
              </Link>
            )}
            {user.plan !== 'free' && (
              <Link
                href="/billing"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                Manage Plan
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              {activityFeed.length > 0 && (
                <Link
                  href="/ai-generator"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View all
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {activityFeed.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <Clock size={32} className="text-slate-200 dark:text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No recent activity</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Start by trying the AI Generator!
                </p>
                <Link
                  href="/ai-generator"
                  className="mt-4 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-colors"
                >
                  <Sparkles size={12} />
                  Try AI Generator
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {activityFeed.map((item) => {
                  const Icon = activityIconMap[item.type] ?? FileText
                  return (
                    <div key={item.id} className="flex items-center gap-3 py-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        {item.description}
                      </p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            {[
              {
                label: 'Generate Content',
                desc: 'Create AI-powered content',
                href: '/ai-generator',
                icon: Sparkles,
                color: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400',
              },
              {
                label: 'View Analytics',
                desc: 'See detailed performance metrics',
                href: '/analytics',
                icon: BarChart3,
                color: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400',
              },
              {
                label: 'Manage Billing',
                desc: 'Update payment methods & plans',
                href: '/billing',
                icon: Crown,
                color: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400',
              },
              {
                label: 'Edit Profile',
                desc: 'Update your personal information',
                href: '/profile',
                icon: Users,
                color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
              },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{action.desc}</p>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
