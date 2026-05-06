'use client'

import { useState, useRef } from 'react'
import {
  Sparkles,
  Copy,
  RefreshCw,
  Download,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import { useUser, UNLIMITED_DISPLAY_VALUE } from '@/contexts/user-context'
import { generateContent, promptTemplates, type GenerationType } from '@/lib/ai-generator'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const MAX_CHARS = 500

const typeLabels: Record<GenerationType, { label: string; color: string }> = {
  blog: { label: 'Blog Post', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400' },
  email: { label: 'Email Copy', color: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400' },
  social: { label: 'Social Media', color: 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400' },
  product: { label: 'Product Copy', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' },
  general: { label: 'General', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
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

export default function AIGeneratorPage() {
  const { usage, generations, recordGeneration, isLimitReached, usagePercent, user } = useUser()
  const { toast } = useToast()

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const charCount = prompt.length
  const canGenerate = charCount >= 10 && charCount <= MAX_CHARS && !isGenerating && !isLimitReached

  async function handleGenerate() {
    if (isLimitReached) {
      setShowUpgradeModal(true)
      return
    }
    if (!prompt.trim() || prompt.length < 10) {
      setError('Please enter at least 10 characters.')
      return
    }

    setIsGenerating(true)
    setError('')
    setResult('')

    try {
      const { content, type } = await generateContent(prompt)
      setResult(content)
      recordGeneration({ prompt, result: content, type })
      toast({ type: 'success', title: 'Content generated!', description: 'Your content is ready.' })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Generation failed. Please try again.'
      setError(msg)
      toast({ type: 'error', title: 'Generation failed', description: msg })
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      toast({ type: 'success', title: 'Copied!', description: 'Content copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ type: 'error', title: 'Copy failed', description: 'Please copy the text manually.' })
    }
  }

  function handleDownload() {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-content.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast({ type: 'success', title: 'Downloaded!', description: 'Content saved as text file.' })
  }

  const usageColor =
    usagePercent >= 90
      ? 'bg-red-500'
      : usagePercent >= 70
      ? 'bg-amber-500'
      : 'bg-emerald-500'

  const limitDisplay =
    usage.generationsLimit >= UNLIMITED_DISPLAY_VALUE
      ? 'Unlimited'
      : usage.generationsLimit.toString()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">AI Generator</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 ml-10">
          Generate professional content instantly with AI — blog posts, emails, social media, and more.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Prompt input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template chips */}
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {promptTemplates.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setPrompt(t.prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) setPrompt(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Describe what you want to generate... (e.g., 'Write a blog post about the benefits of remote work')"
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all resize-none',
                    error
                      ? 'border-red-300 dark:border-red-700 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-300 dark:focus:border-indigo-700'
                  )}
                />
                <div className={cn(
                  'absolute bottom-3 right-3 text-xs',
                  charCount > MAX_CHARS * 0.9
                    ? 'text-red-500'
                    : charCount > MAX_CHARS * 0.7
                    ? 'text-amber-500'
                    : 'text-slate-400 dark:text-slate-500'
                )}>
                  {charCount} / {MAX_CHARS}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all',
                  canGenerate
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg active:scale-[0.98]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                )}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Generating your content...
                  </>
                ) : isLimitReached ? (
                  <>
                    <Zap size={16} />
                    Upgrade to Continue
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Content
                  </>
                )}
              </button>

              {isLimitReached && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                  <AlertCircle size={14} />
                  <span>You&apos;ve reached your monthly limit. <button onClick={() => setShowUpgradeModal(true)} className="underline font-medium">Upgrade your plan</button> to continue.</span>
                </div>
              )}

              {usagePercent >= 80 && !isLimitReached && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                  <AlertCircle size={14} />
                  You&apos;ve used {usage.generationsUsed} of {limitDisplay} generations this month.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result area */}
          {isGenerating && !result && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">Generating your content...</span>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card ref={resultRef} className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Generated Content
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      {copied ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Download size={12} />
                      Export
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || isLimitReached}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw size={12} />
                      Regenerate
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 max-h-[500px] overflow-y-auto">
                  <pre className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {result}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty state */}
          {!result && !isGenerating && (
            <Card className="border-dashed">
              <CardContent className="p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mb-4">
                  <Sparkles size={28} className="text-indigo-500 dark:text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Create your first generation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Enter a prompt above or pick a template to get started. Your AI-generated content will appear here.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {promptTemplates.slice(0, 3).map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setPrompt(t.prompt)}
                      className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 transition-colors"
                    >
                      <ChevronRight size={12} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Usage counter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Monthly Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{usage.generationsUsed}</span>
                  <span className="text-slate-400 dark:text-slate-500"> / {limitDisplay}</span>
                </div>
                <span className={cn(
                  'text-xs font-semibold px-2 py-1 rounded-full',
                  usagePercent >= 90
                    ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                    : usagePercent >= 70
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                )}>
                  {usagePercent}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', usageColor)}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="capitalize">{user.plan}</span> plan: {limitDisplay} generations/month
              </p>
              {user.plan !== 'enterprise' && user.plan !== 'pro' && (
                <Link
                  href="/billing"
                  className="flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all"
                >
                  <Zap size={12} />
                  Upgrade Plan
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Recent generations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Generations</CardTitle>
            </CardHeader>
            <CardContent>
              {generations.length === 0 ? (
                <div className="text-center py-6">
                  <Clock size={24} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 dark:text-slate-500">Your recent generations will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generations.slice(0, 5).map((gen) => {
                    const typeInfo = typeLabels[gen.type as GenerationType] ?? typeLabels.general
                    return (
                      <button
                        key={gen.id}
                        onClick={() => { setPrompt(gen.prompt); setResult(gen.result) }}
                        className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', typeInfo.color)}>
                            {typeInfo.label}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
                            {formatRelativeTime(gen.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {gen.prompt}
                        </p>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb size={14} className="text-amber-500" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                'Be specific about your target audience',
                'Mention the tone you want (formal, casual, etc.)',
                'Include keywords you want to target',
                'Specify length or format requirements',
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <ChevronRight size={12} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  {tip}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 max-w-md w-full">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              You&apos;ve reached your limit
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              You&apos;ve used all {usage.generationsUsed} of your monthly generations. Upgrade to continue creating amazing content.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { name: 'Pro', limit: '500/mo', price: '$29', highlight: true },
                { name: 'Enterprise', limit: 'Unlimited', price: '$99', highlight: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    'rounded-xl border p-3',
                    plan.highlight
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50'
                      : 'border-slate-200 dark:border-slate-700'
                  )}
                >
                  {plan.highlight && (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Recommended</span>
                  )}
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{plan.name}</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{plan.price}<span className="text-xs font-normal text-slate-500">/mo</span></p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{plan.limit} generations</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Maybe later
              </button>
              <Link
                href="/billing"
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 transition-all"
              >
                <Zap size={14} />
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
