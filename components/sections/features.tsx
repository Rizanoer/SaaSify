import { Zap, Shield, TrendingUp, BarChart3, Users, Headphones } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized for performance with Next.js 15 App Router, static generation, and edge rendering. Your users get instant page loads.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'Built with security best practices — HTTPS, CSP headers, input sanitization, and environment variable management baked in.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: TrendingUp,
    title: 'Easy to Scale',
    description:
      'Architecture designed to scale from zero to millions. Deploy on Vercel, AWS, or any modern cloud with zero configuration.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    icon: BarChart3,
    title: 'Analytics Built-in',
    description:
      'Beautiful dashboard with recharts integration, KPI cards, and real-time metrics so you always know how your product performs.',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Multi-user support with role-based access control, team management, and shared workspaces from day one.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Comprehensive documentation, active community, and dedicated support so you\'re never blocked on your journey to launch.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-sm font-medium text-indigo-700">
            Everything you need
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            Features that make a{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              difference
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            SaaSify comes packed with everything your SaaS product needs.
            Stop wasting time on infrastructure and start building your core product.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border ${feature.border} bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={feature.color} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
