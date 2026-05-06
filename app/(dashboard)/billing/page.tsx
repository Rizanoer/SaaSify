'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/hooks/useTranslation'
import { useUser, type Plan } from '@/contexts/user-context'
import { useToast } from '@/components/ui/toast'
import {
  CreditCard,
  Download,
  Plus,
  Calendar,
  AlertTriangle,
  Check,
  Zap,
  Crown,
  Rocket,
} from 'lucide-react'

const savedCards = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '12/2027', isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '8888', expiry: '09/2026', isDefault: false },
]

const billingHistory = [
  { id: 'INV-001', date: 'Dec 15, 2024', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: 'INV-002', date: 'Nov 15, 2024', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: 'INV-003', date: 'Oct 15, 2024', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: 'INV-004', date: 'Sep 15, 2024', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
]

const plans = [
  {
    name: 'Free',
    planKey: 'free' as Plan,
    price: '$0',
    icon: Zap,
    color: 'text-slate-500',
    bg: 'bg-slate-50 dark:bg-slate-900',
    features: ['10 generations/month', '1 project', 'Basic support'],
  },
  {
    name: 'Pro',
    planKey: 'pro' as Plan,
    price: '$29',
    icon: Crown,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    features: ['500 generations/month', 'Unlimited projects', '25 team members', 'Priority support'],
  },
  {
    name: 'Enterprise',
    planKey: 'enterprise' as Plan,
    price: '$99',
    icon: Rocket,
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
    features: ['Unlimited generations', 'Custom integrations', 'SSO', 'SLA guarantee'],
  },
]

export default function BillingPage() {
  const { t } = useTranslation()
  const { user, updatePlan, updateOnboarding, usage } = useUser()
  const { toast } = useToast()
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [upgradingTo, setUpgradingTo] = useState<Plan | null>(null)

  const limitDisplay = usage.generationsLimit >= 999999 ? 'Unlimited' : usage.generationsLimit.toString()

  function handlePlanChange(planKey: Plan) {
    if (planKey === user.plan) return
    setUpgradingTo(planKey)
    setTimeout(() => {
      updatePlan(planKey)
      if (planKey !== 'free') {
        updateOnboarding({ planUpgraded: true })
        toast({
          type: 'success',
          title: `Plan upgraded to ${planKey.charAt(0).toUpperCase() + planKey.slice(1)}!`,
          description: 'Your new plan is now active.',
        })
      } else {
        toast({ type: 'info', title: 'Plan downgraded', description: 'Switched to Free plan.' })
      }
      setUpgradingTo(null)
    }, 1200)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('billing.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('billing.subtitle')}</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>{t('billing.currentPlan')}</CardTitle>
          <CardDescription>
            You are on the <span className="font-semibold capitalize">{user.plan}</span> plan &mdash; {usage.generationsUsed} of {limitDisplay} generations used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrent = plan.planKey === user.plan
              const isLoading = upgradingTo === plan.planKey
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border-2 p-4 transition-all ${
                    isCurrent
                      ? 'border-indigo-500 dark:border-indigo-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl ${plan.bg} flex items-center justify-center mb-3`}>
                    <Icon size={20} className={plan.color} />
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{plan.name}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {plan.price}<span className="text-sm font-normal text-slate-500 dark:text-slate-400">/mo</span>
                  </p>
                  <ul className="mt-3 space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Check size={12} className="text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <button
                      onClick={() => handlePlanChange(plan.planKey)}
                      disabled={isLoading || upgradingTo !== null}
                      className="mt-4 w-full px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : plan.planKey === 'free' ? t('billing.downgrade') : t('billing.upgrade')}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-500 dark:text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('billing.nextBilling')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">January 15, 2025</p>
              </div>
            </div>
            <button
              onClick={() => setCancelModalOpen(true)}
              className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
            >
              {t('billing.cancelSubscription')}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('billing.paymentMethods')}</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus size={16} />
              {t('billing.addCard')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold ${card.brand === 'Visa' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                  {card.brand === 'Visa' ? 'VISA' : 'MC'}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {card.brand} ending in {card.last4}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Expires {card.expiry}</p>
                </div>
                {card.isDefault && (
                  <Badge variant="info">Default</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!card.isDefault && (
                  <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Set default
                  </button>
                )}
                <button className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('billing.billingHistory')}</CardTitle>
          <CardDescription>Download your past invoices</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <CreditCard size={18} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{invoice.plan}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{invoice.date} · {invoice.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{invoice.amount}</span>
                  <Badge variant="success">Paid</Badge>
                  <button className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title={t('billing.downloadInvoice')}>
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cancel Subscription Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCancelModalOpen(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 max-w-md w-full">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Cancel Subscription
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Are you sure you want to cancel your Pro plan subscription? You will lose access to all premium features at the end of your billing period.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
