import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans antialiased">{children}</body>
    </html>
  )
}
