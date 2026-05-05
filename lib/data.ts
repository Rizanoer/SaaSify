import {
  LayoutDashboard,
  BarChart3,
  Settings,
  User,
  Zap,
  Shield,
  TrendingUp,
  Activity,
  Users,
  HeadphonesIcon,
} from 'lucide-react'

export const dashboardStats = [
  {
    title: 'Total Revenue',
    value: '$48,295',
    change: '+12.5%',
    trend: 'up' as const,
    icon: 'TrendingUp',
    description: 'vs last month',
  },
  {
    title: 'Active Users',
    value: '3,842',
    change: '+8.2%',
    trend: 'up' as const,
    icon: 'Users',
    description: 'vs last month',
  },
  {
    title: 'Growth Rate',
    value: '24.3%',
    change: '+4.1%',
    trend: 'up' as const,
    icon: 'Activity',
    description: 'vs last month',
  },
  {
    title: 'Active Projects',
    value: '127',
    change: '-2.4%',
    trend: 'down' as const,
    icon: 'LayoutDashboard',
    description: 'vs last month',
  },
]

export const recentActivity = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'Created new project',
    time: '2 min ago',
    status: 'success' as const,
    avatar: 'AJ',
  },
  {
    id: '2',
    user: 'Bob Martinez',
    action: 'Upgraded to Pro plan',
    time: '14 min ago',
    status: 'success' as const,
    avatar: 'BM',
  },
  {
    id: '3',
    user: 'Carol White',
    action: 'Payment failed',
    time: '1 hr ago',
    status: 'error' as const,
    avatar: 'CW',
  },
  {
    id: '4',
    user: 'David Lee',
    action: 'Invited 3 team members',
    time: '3 hr ago',
    status: 'info' as const,
    avatar: 'DL',
  },
  {
    id: '5',
    user: 'Eva Kim',
    action: 'Exported analytics report',
    time: '5 hr ago',
    status: 'success' as const,
    avatar: 'EK',
  },
  {
    id: '6',
    user: 'Frank Brown',
    action: 'Updated billing info',
    time: '8 hr ago',
    status: 'warning' as const,
    avatar: 'FB',
  },
]

export const chartData = [
  { month: 'Jan', revenue: 18500, users: 1200 },
  { month: 'Feb', revenue: 21000, users: 1450 },
  { month: 'Mar', revenue: 19800, users: 1380 },
  { month: 'Apr', revenue: 24500, users: 1720 },
  { month: 'May', revenue: 28000, users: 2100 },
  { month: 'Jun', revenue: 32500, users: 2480 },
  { month: 'Jul', revenue: 30000, users: 2350 },
  { month: 'Aug', revenue: 35000, users: 2800 },
  { month: 'Sep', revenue: 38500, users: 3100 },
  { month: 'Oct', revenue: 42000, users: 3400 },
  { month: 'Nov', revenue: 45500, users: 3700 },
  { month: 'Dec', revenue: 48295, users: 3842 },
]

export const analyticsData = {
  pageViews: [
    { date: 'Mon', views: 4200 },
    { date: 'Tue', views: 5800 },
    { date: 'Wed', views: 4900 },
    { date: 'Thu', views: 6200 },
    { date: 'Fri', views: 7100 },
    { date: 'Sat', views: 5400 },
    { date: 'Sun', views: 3800 },
  ],
  trafficSources: [
    { name: 'Organic', value: 45 },
    { name: 'Direct', value: 25 },
    { name: 'Social', value: 18 },
    { name: 'Referral', value: 12 },
  ],
  kpis: [
    { title: 'Page Views', value: '127,430', change: '+18.2%', trend: 'up' as const },
    { title: 'Bounce Rate', value: '32.4%', change: '-5.1%', trend: 'down' as const },
    { title: 'Avg Session', value: '4m 32s', change: '+12.3%', trend: 'up' as const },
    { title: 'Conversion', value: '3.8%', change: '+0.6%', trend: 'up' as const },
  ],
}

export const tableData = [
  {
    id: '1',
    name: 'Acme Corp',
    status: 'active' as const,
    plan: 'Enterprise',
    revenue: '$12,400',
    users: 48,
    joined: 'Jan 12, 2024',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    status: 'active' as const,
    plan: 'Pro',
    revenue: '$2,900',
    users: 12,
    joined: 'Feb 3, 2024',
  },
  {
    id: '3',
    name: 'DesignHub',
    status: 'inactive' as const,
    plan: 'Starter',
    revenue: '$270',
    users: 3,
    joined: 'Feb 18, 2024',
  },
  {
    id: '4',
    name: 'GrowthLab',
    status: 'active' as const,
    plan: 'Pro',
    revenue: '$2,900',
    users: 9,
    joined: 'Mar 5, 2024',
  },
  {
    id: '5',
    name: 'DataFlow',
    status: 'pending' as const,
    plan: 'Enterprise',
    revenue: '$11,200',
    users: 35,
    joined: 'Mar 22, 2024',
  },
]

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechVenture',
    quote:
      'SaaSify cut our development time by 60%. The code quality is exceptional and the components are exactly what we needed to launch quickly.',
    avatar: 'SC',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Williams',
    role: 'Founder',
    company: 'LaunchPad',
    quote:
      "I've tried many SaaS starters but SaaSify is on another level. The attention to detail in design and the built-in analytics dashboard saved us weeks of work.",
    avatar: 'MW',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Lead Developer',
    company: 'CloudBase',
    quote:
      'The TypeScript types, the component library, and the responsive design all work together beautifully. This is now our go-to starter for every new project.',
    avatar: 'PP',
    rating: 5,
  },
  {
    id: '4',
    name: 'James O\'Brien',
    role: 'Product Manager',
    company: 'ScaleUp',
    quote:
      'Our team shipped our MVP in 2 weeks instead of 2 months thanks to SaaSify. The pricing page and auth flows worked perfectly out of the box.',
    avatar: 'JO',
    rating: 5,
  },
  {
    id: '5',
    name: 'Lisa Zhang',
    role: 'Engineering Manager',
    company: 'NexGen',
    quote:
      "The dashboard components and recharts integration are incredibly polished. It's clear this was built by engineers who've shipped real SaaS products.",
    avatar: 'LZ',
    rating: 5,
  },
  {
    id: '6',
    name: 'Carlos Rodriguez',
    role: 'Startup Co-founder',
    company: 'Fintek',
    quote:
      'SaaSify gave us everything we needed — auth, dashboard, analytics, pricing. The Tailwind design is clean and our customers love the UI.',
    avatar: 'CR',
    rating: 5,
  },
]

export const faqItems = [
  {
    id: '1',
    question: 'What is SaaSify?',
    answer:
      'SaaSify is a production-ready Next.js 14 SaaS starter template that includes everything you need to launch your software product — authentication pages, dashboard, analytics, pricing, and a beautiful landing page. It\'s built with TypeScript, Tailwind CSS, and modern React patterns.',
  },
  {
    id: '2',
    question: 'Can I try it for free?',
    answer:
      'Yes! Our Starter plan lets you get started completely free. You can explore all the template files, customize the design, and launch your project without spending a dime. Upgrade when you\'re ready to access premium features.',
  },
  {
    id: '3',
    question: 'How does billing work?',
    answer:
      'We offer monthly and annual billing options. Annual plans come with a 20% discount. You\'ll be charged at the beginning of each billing period and can upgrade, downgrade, or cancel at any time.',
  },
  {
    id: '4',
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings, and you\'ll retain access until the end of your current billing period.',
  },
  {
    id: '5',
    question: 'Do you offer refunds?',
    answer:
      'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied with SaaSify for any reason within 14 days of your purchase, contact our support team for a full refund.',
  },
  {
    id: '6',
    question: 'Is my data secure?',
    answer:
      'Security is a top priority. All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We follow OWASP security best practices and conduct regular security audits. Your data is never sold to third parties.',
  },
  {
    id: '7',
    question: 'Can I customize the template?',
    answer:
      'Absolutely! SaaSify is designed to be highly customizable. You can change colors through the Tailwind config, swap out components, modify layouts, and adapt any part of the codebase to fit your brand and requirements.',
  },
  {
    id: '8',
    question: 'Do you offer team plans?',
    answer:
      'Yes! Our Pro and Enterprise plans support multiple team members. The Enterprise plan includes unlimited seats, team management features, and a dedicated account manager to help your team succeed.',
  },
]

export const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
  { label: 'Profile', href: '/profile', icon: 'User' },
]

export const userProfile = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'Administrator',
  company: 'Acme Corp',
  bio: 'Full-stack developer passionate about building great products. I love working with React, TypeScript, and modern web technologies.',
  website: 'https://johnsmith.dev',
  avatar: 'JS',
  plan: 'Pro',
  joinedAt: 'January 2024',
}

export { LayoutDashboard, BarChart3, Settings, User, Zap, Shield, TrendingUp, Activity, Users, HeadphonesIcon }
