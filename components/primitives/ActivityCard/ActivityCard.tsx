import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'

const activityCardVariants = cva(
  'bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 relative',
  {
    variants: {
      size: {
        default: 'w-full',
        small: 'w-full max-w-[280px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface ActivityCardProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof activityCardVariants> {
  heading: string
  image?: {
    src: string
    alt?: string
  }
  href: string
}

export const ActivityCard = ({
  className,
  heading,
  image,
  href,
  size,
  ...props
}: ActivityCardProps) => {
  return (
    <div className={cn(activityCardVariants({ size }), className)} {...props}>
      {image && (
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <img
            src={image.src}
            alt={image.alt || heading}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      <div className="p-5 flex flex-col h-[140px]">
        <h3 className="text-base font-medium mb-4 line-clamp-3 text-slate-800 flex-grow leading-snug">{heading}</h3>
        <div className="mt-auto">
          <Button
            href={href}
            text="詳しくはこちら"
            size="sm"
            variant="outline"
            className="w-full border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-rose-600 text-sm font-medium transition-colors"
            internal={true}
          />
        </div>
      </div>
    </div>
  )
}

ActivityCard.displayName = 'ActivityCard'
