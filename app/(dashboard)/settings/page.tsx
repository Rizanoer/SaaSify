'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { userProfile } from '@/lib/data'
import { Save, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
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
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Update your account&apos;s general information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Company name" defaultValue="Acme Corp" />
              <Input label="Email address" type="email" defaultValue={userProfile.email} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Timezone</label>
                <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>UTC-8 Pacific Time</option>
                  <option>UTC-5 Eastern Time</option>
                  <option selected>UTC+0 Greenwich Mean Time</option>
                  <option>UTC+1 Central European Time</option>
                  <option>UTC+5:30 India Standard Time</option>
                </select>
              </div>
              <div className="pt-2">
                <Button onClick={handleSave} loading={saving} variant="primary">
                  <Save size={16} />
                  Save Changes
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
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Email Notifications</h4>
                <div className="space-y-3">
                  {([
                    { key: 'emailMarketing', label: 'Marketing emails', desc: 'News, updates, and promotions' },
                    { key: 'emailProduct', label: 'Product updates', desc: 'New features and improvements' },
                    { key: 'emailSecurity', label: 'Security alerts', desc: 'Login attempts and account changes' },
                  ] as const).map((item) => (
                    <label key={item.key} className="flex items-start justify-between gap-4 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Push Notifications</h4>
                <div className="space-y-3">
                  {([
                    { key: 'pushAll', label: 'All notifications', desc: 'Get all push notifications' },
                    { key: 'pushMentions', label: 'Mentions only', desc: 'Only when you are mentioned' },
                  ] as const).map((item) => (
                    <label key={item.key} className="flex items-start justify-between gap-4 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-200'}`}
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
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900">Pro Plan</p>
                    <Badge variant="info">Active</Badge>
                  </div>
                  <p className="text-sm text-slate-600">$29/month &bull; Renews Jan 15, 2025</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  Manage Plan
                </button>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Payment Method</h4>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Visa ending in 4242</p>
                      <p className="text-xs text-slate-500">Expires 12/2027</p>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Update</button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Billing History</h4>
                <div className="space-y-2">
                  {['Dec 15, 2024', 'Nov 15, 2024', 'Oct 15, 2024'].map((date) => (
                    <div key={date} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Pro Plan</p>
                        <p className="text-xs text-slate-500">{date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-900">$29.00</span>
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
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Current password" type="password" placeholder="••••••••" />
                <Input label="New password" type="password" placeholder="Min. 8 characters" />
                <Input label="Confirm new password" type="password" placeholder="Repeat new password" />
                <Button onClick={handleSave} loading={saving} variant="primary">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Danger Zone
                </CardTitle>
                <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 bg-red-50">
                  <div>
                    <p className="text-sm font-semibold text-red-900">Delete Account</p>
                    <p className="text-xs text-red-600 mt-0.5">Permanently delete your account and all associated data.</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
