'use client'

import { faqItems } from '@/lib/data'
import { Accordion } from '@/components/ui/accordion'

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-sm font-medium text-indigo-700">
            FAQ
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-xl text-slate-500">
            Everything you need to know about SaaSify.
          </p>
        </div>

        <Accordion items={faqItems} />
      </div>
    </section>
  )
}
