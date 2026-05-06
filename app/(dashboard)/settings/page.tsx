'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { userProfile } from '@/lib/data'
import { Save, AlertTriangle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailProduct: true,
    emailSecurity: true,
    pushAll: false,
    pushMentions: true,
  })

  function handleSave() {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('settings.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t('settings.subtitle')}</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full max-w-lg">
          <TabsTrigger value="general">{t('settings.tabs.general')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="billing">{t('settings.tabs.billing')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.tabs.security')}</TabsTrigger>
          <TabsTrigger value="language">{t('settings.tabs.language')}</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.general.title')}</CardTitle>
              <CardDescription>{t('settings.general.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label={t('settings.general.companyName')} defaultValue="Acme Corp" />
              <Input label={t('settings.general.email')} type="email" defaultValue={userProfile.email} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.general.timezone')}</label>
                <select defaultValue="UTC+0 Greenwich Mean Time" className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option>UTC-8 Pacific Time</option>
                  <option>UTC-5 Eastern Time</option>
                  <option>UTC+0 Greenwich Mean Time</option>
                  <option>UTC+1 Central European Time</option>
                  <option>UTC+5:30 India Standard Time</option>
                </select>
              </div>
              <div className="pt-2">
                <Button onClick={handleSave} loading={saving} variant="primary">
                  <Save size={16} />
                  {t('settings.general.saveChanges')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you&apos;d like to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Email Notifications</h4>
                <div className="space-y-3">
                  {([
                    { key: 'emailMarketing', label: 'Marketing emails', desc: 'News, updates, and promotions' },
                    { key: 'emailProduct', label: 'Product updates', desc: 'New features and improvements' },
                    { key: 'emailSecurity', label: 'Security alerts', desc: 'Login attempts and account changes' },
                  ] as const).map((item) => (
                    <label key={item.key} className="flex items-start justify-between gap-4 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Push Notifications</h4>
                <div className="space-y-3">
                  {([
                    { key: 'pushAll', label: 'All notifications', desc: 'Get all push notifications' },
                    { key: 'pushMentions', label: 'Mentions only', desc: 'Only when you are mentioned' },
                  ] as const).map((item) => (
                    <label key={item.key} className="flex items-start justify-between gap-4 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={handleSave} loading={saving} variant="primary">
                <Save size={16} />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.tabs.billing')}</CardTitle>
              <CardDescription>Manage your subscription and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Pro Plan</p>
                    <Badge variant="info">Active</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">$29/month &bull; Renews Jan 15, 2025</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  Manage Plan
                </button>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Payment Method</h4>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Visa ending in 4242</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Expires 12/2027</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">Update</button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Billing History</h4>
                <div className="space-y-2">
                  {['Dec 15, 2024', 'Nov 15, 2024', 'Oct 15, 2024'].map((date) => (
                    <div key={date} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Pro Plan</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">$29.00</span>
                        <Badge variant="success">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.security.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label={t('settings.security.currentPassword')} type="password" placeholder="••••••••" />
                <Input label={t('settings.security.newPassword')} type="password" placeholder="Min. 8 characters" />
                <Input label={t('settings.security.confirmPassword')} type="password" placeholder="Repeat new password" />
                <Button onClick={handleSave} loading={saving} variant="primary">
                  {t('settings.security.updatePassword')}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  {t('settings.security.dangerZone')}
                </CardTitle>
                <CardDescription>{t('settings.security.dangerDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
                  <div>
                    <p className="text-sm font-semibold text-red-900 dark:text-red-200">{t('settings.security.deleteAccount')}</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{t('settings.security.deleteDesc')}</p>
                  </div>
                  <Button variant="destructive" size="sm">{t('settings.security.deleteAccount')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Language */}
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.language.title')}</CardTitle>
              <CardDescription>{t('settings.language.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('settings.language.selectLanguage')}</label>
                <select className="w-full max-w-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                  <option value="en">🇬🇧 English</option>
                  <option value="id">��🇩 Indonesia</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
