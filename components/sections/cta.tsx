import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-12 lg:p-20 overflow-hidden text-center">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
              Join thousands of developers who ship their SaaS products faster
              with SaaSify. Start your free trial today — no credit card
              required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
              >
                <MessageSquare size={18} />
                Talk to Sales
              </Link>
            </div>
            <p className="text-sm text-indigo-300">
              14-day free trial &bull; No credit card required &bull; Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
