'use client'

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'

export type Plan = 'free' | 'starter' | 'pro' | 'enterprise'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: Plan
  createdAt: string
  onboardingCompleted: boolean
}

export interface Generation {
  id: string
  prompt: string
  result: string
  createdAt: string
  type: string
}

export interface UsageStats {
  generationsUsed: number
  generationsLimit: number
  resetDate: string
}

export interface OnboardingState {
  accountCreated: boolean
  profileCompleted: boolean
  aiGeneratorTried: boolean
  planUpgraded: boolean
}

const PLAN_LIMITS: Record<Plan, number> = {
  free: 10,
  starter: 100,
  pro: 500,
  enterprise: Infinity,
}

const STORAGE_KEY_USER = 'saasify-user'
const STORAGE_KEY_USAGE = 'saasify-usage'
const STORAGE_KEY_GENERATIONS = 'saasify-generations'
const STORAGE_KEY_ONBOARDING = 'saasify-onboarding'

const defaultUser: User = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  plan: 'free',
  createdAt: new Date().toISOString(),
  onboardingCompleted: false,
}

const defaultOnboarding: OnboardingState = {
  accountCreated: true,
  profileCompleted: false,
  aiGeneratorTried: false,
  planUpgraded: false,
}

interface UserContextValue {
  user: User
  usage: UsageStats
  generations: Generation[]
  onboarding: OnboardingState
  updateUser: (updates: Partial<User>) => void
  updatePlan: (plan: Plan) => void
  recordGeneration: (generation: Omit<Generation, 'id' | 'createdAt'>) => void
  updateOnboarding: (updates: Partial<OnboardingState>) => void
  isLimitReached: boolean
  usagePercent: number
}

const UserContext = createContext<UserContextValue>({
  user: defaultUser,
  usage: { generationsUsed: 0, generationsLimit: 10, resetDate: '' },
  generations: [],
  onboarding: defaultOnboarding,
  updateUser: () => {},
  updatePlan: () => {},
  recordGeneration: () => {},
  updateOnboarding: () => {},
  isLimitReached: false,
  usagePercent: 0,
})

function getResetDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 1, 1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)
  const [usage, setUsage] = useState<UsageStats>({
    generationsUsed: 0,
    generationsLimit: PLAN_LIMITS.free,
    resetDate: getResetDate(),
  })
  const [generations, setGenerations] = useState<Generation[]>([])
  const [onboarding, setOnboarding] = useState<OnboardingState>(defaultOnboarding)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER)
      if (storedUser) {
        const parsed = JSON.parse(storedUser) as User
        setUser(parsed)
        setUsage((prev) => ({
          ...prev,
          generationsLimit: PLAN_LIMITS[parsed.plan] === Infinity ? 999999 : PLAN_LIMITS[parsed.plan],
        }))
      }

      const storedUsage = localStorage.getItem(STORAGE_KEY_USAGE)
      if (storedUsage) {
        const parsed = JSON.parse(storedUsage) as UsageStats
        // Check if reset date has passed
        if (new Date(parsed.resetDate) <= new Date()) {
          const freshUsage = { ...parsed, generationsUsed: 0, resetDate: getResetDate() }
          setUsage((prev) => ({ ...prev, ...freshUsage }))
          localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(freshUsage))
        } else {
          setUsage(parsed)
        }
      }

      const storedGenerations = localStorage.getItem(STORAGE_KEY_GENERATIONS)
      if (storedGenerations) {
        setGenerations(JSON.parse(storedGenerations))
      }

      const storedOnboarding = localStorage.getItem(STORAGE_KEY_ONBOARDING)
      if (storedOnboarding) {
        setOnboarding(JSON.parse(storedOnboarding))
      }
    } catch {
      // ignore
    }
    setInitialized(true)
  }, [])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated))
      return updated
    })
  }, [])

  const updatePlan = useCallback((plan: Plan) => {
    const limit = PLAN_LIMITS[plan] === Infinity ? 999999 : PLAN_LIMITS[plan]
    setUser((prev) => {
      const updated = { ...prev, plan }
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated))
      return updated
    })
    setUsage((prev) => {
      const updated = { ...prev, generationsLimit: limit }
      localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(updated))
      return updated
    })
  }, [])

  const recordGeneration = useCallback((gen: Omit<Generation, 'id' | 'createdAt'>) => {
    const newGen: Generation = {
      ...gen,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setGenerations((prev) => {
      const updated = [newGen, ...prev].slice(0, 20)
      localStorage.setItem(STORAGE_KEY_GENERATIONS, JSON.stringify(updated))
      return updated
    })

    setUsage((prev) => {
      const updated = { ...prev, generationsUsed: prev.generationsUsed + 1 }
      localStorage.setItem(STORAGE_KEY_USAGE, JSON.stringify(updated))
      return updated
    })

    setOnboarding((prev) => {
      if (!prev.aiGeneratorTried) {
        const updated = { ...prev, aiGeneratorTried: true }
        localStorage.setItem(STORAGE_KEY_ONBOARDING, JSON.stringify(updated))
        return updated
      }
      return prev
    })
  }, [])

  const updateOnboarding = useCallback((updates: Partial<OnboardingState>) => {
    setOnboarding((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY_ONBOARDING, JSON.stringify(updated))
      return updated
    })
  }, [])

  const usagePercent =
    usage.generationsLimit === 0
      ? 0
      : Math.min(100, Math.round((usage.generationsUsed / usage.generationsLimit) * 100))

  const isLimitReached = usage.generationsUsed >= usage.generationsLimit

  if (!initialized) return null

  return (
    <UserContext.Provider
      value={{
        user,
        usage,
        generations,
        onboarding,
        updateUser,
        updatePlan,
        recordGeneration,
        updateOnboarding,
        isLimitReached,
        usagePercent,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
