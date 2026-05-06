'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { userProfile } from '@/lib/data'
import { Camera, Save } from 'lucide-react'
import { useUser } from '@/contexts/user-context'
import { useToast } from '@/components/ui/toast'

export default function ProfilePage() {
  const { user, updateOnboarding } = useUser()
  const { toast } = useToast()
  const [savingInfo, setSavingInfo] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [profile, setProfile] = useState({
    name: user.name || userProfile.name,
    email: user.email || userProfile.email,
    bio: userProfile.bio,
    website: userProfile.website,
    company: userProfile.company,
  })

  function handleSaveInfo() {
    setSavingInfo(true)
    setTimeout(() => {
      setSavingInfo(false)
      updateOnboarding({ profileCompleted: true })
      toast({ type: 'success', title: 'Profile updated!', description: 'Your profile has been saved.' })
    }, 1500)
  }

  function handleSavePassword() {
    setSavingPassword(true)
    setTimeout(() => {
      setSavingPassword(false)
      toast({ type: 'success', title: 'Password updated!' })
    }, 1500)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal information</p>
      </div>

      {/* Avatar card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar name={userProfile.name} size="xl" />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow hover:bg-indigo-700 transition-colors">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{userProfile.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="info">{userProfile.plan} Plan</Badge>
                <span className="text-xs text-slate-400 dark:text-slate-500">Member since {userProfile.joinedAt}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Company"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
          </div>
          <Input
            label="Email address"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Website"
            type="url"
            value={profile.website}
            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            placeholder="https://yourwebsite.com"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
              placeholder="Tell us a little about yourself..."
            />
          </div>
          <Button onClick={handleSaveInfo} loading={savingInfo} variant="primary">
            <Save size={16} />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input
            label="New password"
            type="password"
            placeholder="Min. 8 characters"
            helperText="Use at least 8 characters including uppercase, lowercase, and a number."
          />
          <Input label="Confirm new password" type="password" placeholder="Repeat new password" />
          <Button onClick={handleSavePassword} loading={savingPassword} variant="primary">
            <Save size={16} />
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
