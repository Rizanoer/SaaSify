import { Star } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { Avatar } from '@/components/ui/avatar'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-sm font-medium text-indigo-700">
            Loved by developers
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            What our customers{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              are saying
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Join thousands of developers and founders who use SaaSify to ship
            their products faster.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="sm" colorIndex={i} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
