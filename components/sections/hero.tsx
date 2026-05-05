import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700">
              <Sparkles size={14} />
              New: v2.0 now available
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                Build Your SaaS{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Product Faster
                </span>{' '}
                Than Ever
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                Stop rebuilding the same boilerplate. SaaSify gives you a
                production-ready Next.js 15 template so you can ship your first
                customer in days, not months.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-200"
              >
                View Demo
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">2,000+</span>
                <span>developers</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">500+</span>
                <span>products shipped</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">4.9/5</span>
                <span>rating</span>
              </div>
            </div>
          </div>

          {/* Right — mock dashboard */}
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-100/50">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500">Good morning,</p>
                  <p className="font-semibold text-slate-900">Welcome back 👋</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  JS
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Revenue', value: '$48.2K', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Users', value: '3,842', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                  { label: 'Growth', value: '+24%', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-100 p-3 text-center">
                    <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon size={14} className={stat.color} />
                    </div>
                    <p className="text-base font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">Monthly Revenue</p>
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 96].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-sm ${i === 11 ? 'bg-indigo-500' : 'bg-indigo-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
