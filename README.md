# SaaSify — Modern SaaS Starter Template

A production-ready **Next.js 15** SaaS starter template with a beautiful landing page, authentication flows, analytics dashboard, and reusable UI components.

## ✨ Features

- 🚀 **Next.js 15 App Router** — Server components, layouts, and streaming
- 🎨 **Tailwind CSS** — Utility-first styling with custom design tokens
- 📊 **Analytics Dashboard** — Recharts integration with revenue & user growth charts
- 🔐 **Auth Pages** — Beautiful login & register pages with form validation
- 🧩 **UI Component Library** — Button, Card, Input, Badge, Modal, Tabs, Table, Accordion & more
- 📱 **Fully Responsive** — Mobile-first design across all pages
- 🌗 **TypeScript** — Strict mode, full type safety
- 💰 **Pricing Section** — Monthly/annual toggle with 3 tiers
- 💬 **Testimonials** — Social proof section with avatar gradients
- ❓ **FAQ** — Accordion-based FAQ section
- ⚡ **Performance** — Optimized fonts, lazy loading, minimal JS

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework (App Router) |
| TypeScript 5 | Type safety |
| Tailwind CSS 3 | Styling |
| lucide-react | Icons |
| recharts | Charts |
| clsx + tailwind-merge | Class utilities |

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourname/saasify.git
cd saasify

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Folder Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Register page
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx      # Dashboard home
│   │   ├── analytics/page.tsx      # Analytics charts
│   │   ├── settings/page.tsx       # Settings tabs
│   │   ├── profile/page.tsx        # Profile page
│   │   └── layout.tsx              # Dashboard layout wrapper
│   ├── layout.tsx                  # Root layout (fonts, metadata)
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Tailwind + custom CSS
├── components/
│   ├── ui/                         # Reusable UI primitives
│   ├── layout/                     # Navbar, Sidebar, Footer, DashboardLayout
│   └── sections/                   # Landing page sections
├── lib/
│   ├── utils.ts                    # cn(), formatters
│   └── data.ts                     # Mock data
└── public/                         # Static assets
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the primary color palette:
```ts
colors: {
  primary: {
    // Replace indigo values with your brand color
    600: '#your-color',
  }
}
```

### Mock Data
Replace data in `lib/data.ts` with your real API calls or database queries.

### Components
All UI components are in `components/ui/` and can be customized independently.

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📄 License

MIT — free for personal and commercial use.

