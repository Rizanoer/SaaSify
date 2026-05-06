'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Shield, Lock, CreditCard, Building2, Smartphone, Check, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

type PaymentMethod = 'card' | 'bank' | 'ewallet'

const orderDetails = {
  plan: 'Pro Plan',
  billing: 'Monthly',
  price: 29.00,
  tax: 2.61,
  discount: 0,
}

const cardBrandPatterns: Record<string, string> = {
  visa: '^4',
  mastercard: '^5[1-5]',
  amex: '^3[47]',
}

function detectCardBrand(number: string): string | null {
  const clean = number.replace(/\s/g, '')
  for (const [brand, pattern] of Object.entries(cardBrandPatterns)) {
    if (new RegExp(pattern).test(clean)) return brand
  }
  return null
}

function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '')
  const brand = detectCardBrand(value)
  const maxLen = brand === 'amex' ? 15 : 16
  const trimmed = clean.slice(0, maxLen)
  if (brand === 'amex') {
    return trimmed.replace(/(\d{4})(\d{6})(\d{0,5})/, (_, a, b, c) =>
      c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a
    )
  }
  return trimmed.match(/.{1,4}/g)?.join(' ') ?? trimmed
}

function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`
  return clean
}

export default function CheckoutPage() {
  const { t } = useTranslation()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    address: '',
    city: '',
    zip: '',
  })

  const cardBrand = detectCardBrand(cardDetails.number)
  const total = orderDetails.price + orderDetails.tax - orderDetails.discount

  function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  const paymentMethods = [
    { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'bank' as const, label: 'Bank Transfer', icon: Building2 },
    { id: 'ewallet' as const, label: 'E-Wallet', icon: Smartphone },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            SaaSify
          </span>
        </Link>
        <div className="flex items-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
          <span>Cart</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Checkout</span>
          <ChevronRight size={14} />
          <span>Confirmation</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
        {/* Left: Payment Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {t('checkout.paymentMethod')}
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-medium transition-all',
                      paymentMethod === method.id
                        ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                    )}
                  >
                    <Icon size={20} />
                    <span className="text-center leading-tight">{method.label}</span>
                  </button>
                )
              })}
            </div>

            {paymentMethod === 'card' && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('checkout.cardNumber')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                      maxLength={cardBrand === 'amex' ? 17 : 19}
                      className="w-full px-4 py-3 pr-16 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                    />
                    {cardBrand && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className={cn(
                          'text-xs font-bold px-2 py-0.5 rounded',
                          cardBrand === 'visa' ? 'bg-blue-600 text-white' :
                          cardBrand === 'mastercard' ? 'bg-orange-500 text-white' :
                          'bg-slate-800 text-white'
                        )}>
                          {cardBrand === 'visa' ? 'VISA' : cardBrand === 'mastercard' ? 'MC' : 'AMEX'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {t('checkout.expiryDate')}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {t('checkout.cvc')}
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t('checkout.cardholderName')}
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                  />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Billing Address</p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={cardDetails.address}
                      onChange={(e) => setCardDetails({ ...cardDetails, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={cardDetails.city}
                        onChange={(e) => setCardDetails({ ...cardDetails, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                      />
                      <input
                        type="text"
                        placeholder="ZIP / Postal code"
                        value={cardDetails.zip}
                        onChange={(e) => setCardDetails({ ...cardDetails, zip: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {paymentMethod === 'bank' && (
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 text-center space-y-3">
                <Building2 size={32} className="text-slate-400 mx-auto" />
                <p className="font-medium text-slate-900 dark:text-slate-100">Bank Transfer</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  After clicking Pay Now, you will receive bank transfer instructions via email.
                </p>
              </div>
            )}

            {paymentMethod === 'ewallet' && (
              <div className="grid grid-cols-2 gap-3">
                {['GoPay', 'OVO', 'Dana', 'ShopeePay'].map((wallet) => (
                  <button
                    key={wallet}
                    className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all"
                  >
                    {wallet}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Promo Code */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              {t('checkout.promoCode')}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">
                {t('checkout.apply')}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary (sticky) */}
        <div className="lg:col-span-2">
          <div className="sticky top-8 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {t('checkout.orderSummary')}
              </h2>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Zap size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{orderDetails.plan}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{orderDetails.billing} billing</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('checkout.subtotal')}</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">${orderDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('checkout.tax')} (9%)</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">${orderDetails.tax.toFixed(2)}</span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 dark:text-emerald-400">Discount</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">-${orderDetails.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
                  <span className="text-slate-900 dark:text-slate-100">{t('checkout.total')}</span>
                  <span className="text-slate-900 dark:text-slate-100">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t('checkout.terms')}
                </span>
              </label>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={!agreed || loading}
                className={cn(
                  'mt-4 w-full py-3 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200',
                  'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700',
                  'shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center justify-center gap-2'
                )}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    {t('checkout.payNow')} · ${total.toFixed(2)}
                  </>
                )}
              </button>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Shield size={12} className="text-emerald-500" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Lock size={12} className="text-emerald-500" />
                  <span>{t('checkout.securePayment')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Check size={12} className="text-emerald-500" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>

            {/* Included features */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">What&apos;s included:</p>
              <ul className="space-y-2">
                {[
                  'Unlimited projects',
                  '25 team members',
                  '100GB storage',
                  'Priority support',
                  'Advanced analytics',
                  'Custom integrations',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
