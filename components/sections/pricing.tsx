'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 9,
    annualPrice: 7,
    description: 'Perfect for indie developers and small projects.',
    features: [
      '5 projects',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'API access',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'For growing teams that need more power and flexibility.',
    features: [
      '25 projects',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'Team collaboration',
      'API access',
    ],
    popular: true,
    cta: 'Start Pro Trial',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For large organizations with complex requirements.',
    features: [
      'Unlimited projects',
      'Unlimited storage',
      'Custom analytics',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'SSO & SAML',
      'Audit logs',
    ],
    popular: false,
    cta: 'Contact Sales',
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-sm font-medium text-indigo-700">
            Simple pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            Choose the plan that{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              works for you
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={cn('text-sm font-medium', !annual ? 'text-slate-900' : 'text-slate-500')}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual((prev) => !prev)}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors duration-200',
                annual ? 'bg-indigo-600' : 'bg-slate-200'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
                  annual ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </button>
            <span className={cn('text-sm font-medium', annual ? 'text-slate-900' : 'text-slate-500')}>
              Annual{' '}
              <span className="text-emerald-600 font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl p-8 flex flex-col',
                  plan.popular
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105 border-2 border-indigo-500'
                    : 'bg-white border border-slate-200 shadow-sm'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={cn('text-xl font-bold mb-1', plan.popular ? 'text-white' : 'text-slate-900')}>
                    {plan.name}
                  </h3>
                  <p className={cn('text-sm', plan.popular ? 'text-indigo-200' : 'text-slate-500')}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={cn('text-5xl font-extrabold', plan.popular ? 'text-white' : 'text-slate-900')}>
                      ${price}
                    </span>
                    <span className={cn('text-sm mb-2', plan.popular ? 'text-indigo-200' : 'text-slate-500')}>
                      /month
                    </span>
                  </div>
                  {annual && (
                    <p className={cn('text-xs mt-1', plan.popular ? 'text-indigo-200' : 'text-slate-500')}>
                      Billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check
                        size={16}
                        className={cn('flex-shrink-0', plan.popular ? 'text-indigo-200' : 'text-indigo-600')}
                      />
                      <span className={plan.popular ? 'text-indigo-100' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    'w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                    plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  )
}
