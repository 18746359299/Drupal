import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import {
  Avatar,
  AvatarProps,
  Badge,
  ImageProps,
  RichText,
} from '@/components/primitives'
import { cn } from '@/lib/utils'

const activityVariants = cva('w-full mb-12 md:mb-16', {
  variants: {
    layout: {
      default: '',
      featured: 'bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden',
    }
  },
  defaultVariants: {
    layout: 'default'
  },
})

type AuthorProps = {
  avatar: AvatarProps
  name: string
}

export interface ActivityProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof activityVariants> {
  title: string
  summary?: string
  content: string
  image: ImageProps
  tags?: string[]
  publishDate: number
  author: AuthorProps
  layout?: 'default' | 'featured'
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return date.toLocaleDateString('en-US', options)
}

export const Activity = ({
  className,
  title,
  summary,
  content,
  image,
  tags,
  publishDate,
  author,
  layout = 'default',
  ...props
}: ActivityProps) => {
  return (
    <article className={cn(activityVariants({ layout }), className)} {...props}>
      <div className={cn(
        "relative w-full", 
        layout === 'featured' ? "h-96" : "md:md-16 container mb-12"
      )}>
        <img
          {...image}
          alt={image.alt}
          className={cn(
            "object-cover", 
            layout === 'featured' 
              ? "absolute inset-0 w-full h-full" 
              : "h-auto w-full"
          )}
        />
        {layout === 'featured' && (
          <div className="bg-gradient-to-t to-transparent from-black/70 inset-0 absolute">
            <div className="text-white p-8 bottom-0 left-0 absolute">
              <h1 className="font-bold mb-2 text-4xl">{title}</h1>
              {summary && <p className="text-lg text-gray-200">{summary}</p>}
            </div>
          </div>
        )}
      </div>
      <div className={cn(
        "mx-auto max-w-4xl", 
        layout === 'featured' ? "px-8 py-8" : "px-4 sm:px-6 lg:px-8 mb-8"
      )}>
        {layout !== 'featured' && (
          <h1 className="font-bold mb-6 text-4xl text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
            {title}
          </h1>
        )}
        <div className="flex flex-wrap mb-8 gap-4 items-center justify-between">
          <div className="flex gap-3 items-center">
            <Avatar src={author.avatar.src} name={author.name} />
            <p className="font-medium text-sm">{author.name}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge text={tag} variant="secondary" key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
        {layout !== 'featured' && summary && (
          <p className="text-xl mb-8 leading-relaxed text-gray-600 italic dark:text-gray-400">
            {summary}
          </p>
        )}
        <div className="max-w-none prose prose-lg dark:prose-invert">
          <RichText content={content} />
        </div>
      </div>
    </article>
  )
}

Activity.defaults = {
  title: 'How designers estimate the impact of UX?',
  summary: 'Designers wear many hats, the first one being a moderator.',
  content: `
      <p>Designers aren't purely focused on aesthetics — their role encompasses broader business aspects and technology, while carefully evaluating those by estimating the return on investment for each solution.</p>
      <p>In short, designers ensure that the end value of the specific solution, or product as a whole, brings gains to the client's business as expected and a significant return against the initial investment.</p>
      <h3>Core Areas of Focus</h3>
      <p>At intive, our designers maintain this awareness by developing across three core areas:</p>
      <ul>
        <li>Business</li>
        <li>Technology</li>
        <li>User-centric design practices</li>
      </ul>
      <p>For each vertical, they keep ROI in mind, taking care to estimate and realize the impact of UX on the client's budget, goals, and wider technical framework.</p>
    `,
  image: {
    src: '/app/static/placeholders/drupal-decoupled/landscape-large.png',
    alt: 'A cartoon character on a beach with an ice cream',
  },
  tags: ['UX', 'Design', 'Business'],
  publishDate: 1667260800,
  author: {
    avatar: {
      src: '/app/static/placeholders/doc-tahedroid/avatar.png',
      name: 'Doc Tahedroid',
    },
    name: 'Doc Tahedroid',
  },
} satisfies ActivityProps
