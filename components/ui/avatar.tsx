import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  className?: string
  colorIndex?: number
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const gradients = [
  'from-indigo-500 to-violet-500',
  'from-violet-500 to-fuchsia-500',
  'from-fuchsia-500 to-pink-500',
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
]

function Avatar({ src, name, size = 'md', className, colorIndex = 0 }: AvatarProps) {
  const initials = name ? getInitials(name) : '?'
  const gradient = gradients[colorIndex % gradients.length]

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size], className)}>
        <Image src={src} alt={name ?? 'Avatar'} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white select-none',
        gradient,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  )
}

export { Avatar }
export type { AvatarProps, AvatarSize }
