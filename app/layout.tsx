import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { ToastProvider } from '@/components/ui/toast'
import { UserProvider } from '@/contexts/user-context'

export const metadata: Metadata = {
  title: 'SaaSify - Modern SaaS Starter Template',
  description:
    'Launch your SaaS product faster with SaaSify — a production-ready Next.js 15 starter template with authentication, analytics, billing, and more.',
  keywords: ['saas', 'nextjs', 'starter', 'template', 'typescript', 'tailwind'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-900 font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <UserProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

