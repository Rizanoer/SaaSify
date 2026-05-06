export type GenerationType = 'blog' | 'email' | 'social' | 'product' | 'general'

export function detectPromptType(prompt: string): GenerationType {
  const lower = prompt.toLowerCase()
  if (lower.includes('blog') || lower.includes('article') || lower.includes('post')) return 'blog'
  if (lower.includes('email') || lower.includes('newsletter') || lower.includes('mail')) return 'email'
  if (lower.includes('social') || lower.includes('instagram') || lower.includes('twitter') || lower.includes('linkedin')) return 'social'
  if (lower.includes('product') || lower.includes('description') || lower.includes('landing')) return 'product'
  return 'general'
}

const blogTemplates = [
  (prompt: string) => `# ${extractTopic(prompt)}: A Comprehensive Guide

## Introduction
In today's fast-paced digital landscape, understanding ${extractTopic(prompt)} has become more important than ever. Whether you're a seasoned professional or just getting started, this guide will walk you through everything you need to know.

## Why This Matters
The impact of ${extractTopic(prompt)} cannot be overstated. Studies show that businesses that embrace this approach see:
- **35% increase** in overall productivity
- **2x faster** time-to-market
- **Significant cost savings** in the long run

## Key Insights

### 1. Start with the fundamentals
Before diving deep, it's essential to build a strong foundation. The basics might seem simple, but they form the backbone of any successful strategy.

### 2. Leverage modern tools
Today's toolkit offers unprecedented capabilities. Choosing the right tools can make the difference between success and stagnation.

### 3. Measure and iterate
Data-driven decisions are the cornerstone of growth. Establish clear KPIs from day one and review them regularly.

## Getting Started
The best time to start was yesterday. The second best time is now. Here's a simple three-step framework:
1. **Assess** your current situation
2. **Plan** your approach strategically
3. **Execute** with consistency

## Conclusion
${extractTopic(prompt)} is not just a trend — it's the future. Start small, stay consistent, and remember: every expert was once a beginner.

*Ready to take the next step? Start your journey today.*`,
]

const emailTemplates = [
  (prompt: string) => `Subject: You're Going to Love This — ${extractTopic(prompt)}

Hi [First Name],

I hope this email finds you well! I wanted to reach out personally because I have something exciting to share with you.

**Here's the thing:**
${extractTopic(prompt)} has completely transformed how our customers operate. And I think it could do the same for you.

**What you'll get:**
✅ Immediate access to premium features
✅ Priority customer support
✅ Exclusive resources and tutorials
✅ Regular updates and improvements

**The results speak for themselves:**
Our customers typically see results within the first 30 days. Here's what they're saying:

*"This completely changed how we work. I can't imagine going back to the old way."* — Sarah K., Director of Operations

**Your next step:**
This is a time-sensitive opportunity. We're only offering this to a select group of users, and spots are filling up fast.

[**Get Started Now →**]

If you have any questions, feel free to reply directly to this email. I personally read every response.

Best regards,
The SaaSify Team

P.S. — Don't wait too long. This offer expires in 48 hours.`,
]

const socialTemplates = [
  (prompt: string) => `📣 Big news! We're thrilled to share something about ${extractTopic(prompt)} that's going to change the game. 🚀

Here's what you need to know 👇

✨ Insight #1: The landscape is shifting faster than ever. Are you keeping up?

💡 Insight #2: The early adopters always win. Don't be left behind.

🔥 Insight #3: The secret isn't working harder — it's working smarter.

The bottom line? ${extractTopic(prompt)} is your competitive advantage.

Drop a 🙋 in the comments if you're ready to level up!

#Innovation #Growth #Strategy #Business #Success #Productivity`,
]

const productTemplates = [
  (prompt: string) => `## ${extractTopic(prompt)}

**Transform the way you work.**

Tired of inefficient workflows and missed opportunities? ${extractTopic(prompt)} is designed for teams who refuse to settle for mediocre results.

---

### What makes us different

**Blazing fast performance**
Experience speeds you never thought possible. Our optimized infrastructure ensures zero lag, even at scale.

**Intuitive by design**
No training required. Our users are up and running in minutes, not weeks.

**Enterprise-grade security**
Your data is protected by military-grade encryption and 24/7 monitoring.

**Scales with your business**
From startup to enterprise, our solution grows with you every step of the way.

---

### Pricing that makes sense

**Free** — Perfect for individuals getting started
**Pro ($29/mo)** — For growing teams that need more power  
**Enterprise** — Custom solutions for large organizations

---

*Join 10,000+ teams already using ${extractTopic(prompt)}. Start your free trial today — no credit card required.*`,
]

const generalTemplates = [
  (prompt: string) => `## ${extractTopic(prompt)}

### Overview
This is a comprehensive overview of ${extractTopic(prompt)}, designed to provide you with actionable insights and practical guidance.

### Key Points

**Point 1: Foundation**
Every great achievement starts with a solid foundation. Understanding the core principles of ${extractTopic(prompt)} will set you up for long-term success.

**Point 2: Strategy**
A well-defined strategy is your roadmap to success. Consider these essential elements:
- Clear objectives and measurable goals
- Resource allocation and timeline
- Risk assessment and mitigation
- Performance tracking and optimization

**Point 3: Execution**
Ideas without execution are just dreams. Here's how to turn your vision into reality:
1. Break down complex tasks into manageable steps
2. Prioritize high-impact activities
3. Build feedback loops into your process
4. Celebrate small wins along the way

### Recommendations

Based on current best practices, here are our top recommendations for ${extractTopic(prompt)}:

- **Start immediately** — The perfect moment never comes. Begin with what you have.
- **Be consistent** — Small, daily actions compound into extraordinary results.
- **Stay adaptable** — The ability to pivot is your greatest competitive advantage.
- **Measure everything** — You can't improve what you don't track.

### Conclusion

${extractTopic(prompt)} represents a significant opportunity for those willing to commit to the process. The journey of a thousand miles begins with a single step. Take yours today.

*Have questions? We're here to help. Reach out to our team anytime.*`,
]

function extractTopic(prompt: string): string {
  // Try to extract the main topic from the prompt
  const cleaned = prompt.replace(/write|create|generate|make|build|draft/gi, '').trim()
  const words = cleaned.split(' ').filter(Boolean)
  if (words.length > 8) {
    return words.slice(0, 6).join(' ') + '...'
  }
  return cleaned || 'Your Content'
}

export interface GenerationResult {
  content: string
  type: GenerationType
}

export async function generateContent(prompt: string): Promise<GenerationResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1500))

  // Simulate 10% error rate
  if (Math.random() < 0.1) {
    throw new Error('Generation failed. Please try again.')
  }

  const type = detectPromptType(prompt)

  let content: string
  switch (type) {
    case 'blog':
      content = blogTemplates[0](prompt)
      break
    case 'email':
      content = emailTemplates[0](prompt)
      break
    case 'social':
      content = socialTemplates[0](prompt)
      break
    case 'product':
      content = productTemplates[0](prompt)
      break
    default:
      content = generalTemplates[0](prompt)
  }

  return { content, type }
}

export const promptTemplates = [
  { label: 'Blog post intro about AI', prompt: 'Write a blog post introduction about artificial intelligence and its impact on modern business', type: 'blog' as GenerationType },
  { label: 'Welcome email for new users', prompt: 'Write a welcome email for new users who just signed up for our SaaS product', type: 'email' as GenerationType },
  { label: 'Instagram caption for launch', prompt: 'Write an Instagram caption for our product launch announcement', type: 'social' as GenerationType },
  { label: 'Product description for SaaS', prompt: 'Write a product description for a SaaS project management tool', type: 'product' as GenerationType },
  { label: 'Marketing strategy outline', prompt: 'Create a marketing strategy outline for a B2B SaaS startup', type: 'general' as GenerationType },
  { label: 'Cold outreach email', prompt: 'Write a cold outreach email to potential enterprise clients for our software solution', type: 'email' as GenerationType },
]
