"use client"
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { Button, ButtonProps } from '@/components/primitives'
import { ActivityCard } from '@/components/primitives/ActivityCard/ActivityCard'
import { RichText } from '@/components/primitives'
import { cn } from '@/lib/utils'

const activityGroupVariants = cva('w-full py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-slate-50 to-white', {
  variants: {},
  defaultVariants: {},
})

export interface ActivityCardProps {
  type: 'activity'
  heading: string
  summary?: string
  image?: {
    src: string
    alt?: string
  }
  details?: {
    href: string
    text: string
    internal?: boolean
  }
}

export interface ActivityGroupProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof activityGroupVariants> {
  heading?: string
  subheading?: string
  description?: string
  action?: ButtonProps
  cards: ActivityCardProps[]
  initialDisplayCount?: number
}

export const ActivityGroup = ({
  className,
  heading,
  subheading,
  description,
  action,
  cards,
  initialDisplayCount = 4,
  ...props
}: ActivityGroupProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayCards = showAll ? cards : cards.slice(0, initialDisplayCount);
  const hasMoreCards = cards.length > initialDisplayCount;

  // 无论显示多少卡片，每行最多显示4个
  const getGridClasses = () => {
    return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 justify-items-center max-w-7xl mx-auto';
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div className={cn(activityGroupVariants(), className)} {...props}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-800 relative inline-block">
              {heading}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-rose-500 rounded-full"></span>
            </h2>
          )}
          {subheading && (
            <p className="text-xl text-slate-600 mt-6">{subheading}</p>
          )}
          {description && (
            <div className="mt-5 text-slate-600">
              <RichText content={description} />
            </div>
          )}
        </div>
        
        <div className={getGridClasses()}>
          {displayCards.map((card, index) => (
            <ActivityCard
              key={index}
              heading={card.heading}
              image={card.image}
              href={card.details?.href || '#'}
              size="small"
              className="transform transition-transform hover:-translate-y-1 w-full"
            />
          ))}
        </div>
        
        {hasMoreCards && !showAll && (
          <div className="mt-10 text-center">
            <Button 
              text="もっと見る"
              variant="outline" 
              className="px-8 py-2 border-slate-300 hover:bg-rose-50 hover:border-rose-200 text-rose-600"
              onClick={handleShowMore}
              href={''}
            />
          </div>
        )}
        
        {action && (
          <div className={`mt-12 text-center ${hasMoreCards && !showAll ? 'mt-6' : ''}`}>
            <Button 
              {...action} 
              variant="outline" 
              className="px-8 py-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700"
            />
          </div>
        )}
      </div>
    </div>
  )
}

ActivityGroup.defaults = {
  heading: '活動専区',
  subheading: '限時特惠，不容錯過',
  description: '精選活動，為您提供最好的體驗和服務。',
  action: {
    text: '全ての活動を見る',
    href: '#',
  },
  cards: [
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動1',
      },
      heading: '夏季特惠活動',
      summary: '限時折扣，購買指定商品享受8折優惠。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動2',
      },
      heading: '新品上市活動',
      summary: '新品首發，限量搶購，先到先得。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動3',
      },
      heading: '會員専享活動',
      summary: '會員専享價格，額外積分獎勵。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動4',
      },
      heading: '節日特別活動',
      summary: '節日期間特別優惠，多重好禮等你拿。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動5',
      },
      heading: '限時秒殺活動',
      summary: '每日限時秒殺，超值優惠。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動6',
      },
      heading: '新用戶首單活動',
      summary: '新用戶註冊即享首單特別折扣。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動7',
      },
      heading: '週末限定活動',
      summary: '週末購物享受額外優惠。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
    {
      type: 'activity',
      image: {
        src: '/static/placeholders/drupal-decoupled/landscape-small.png',
        alt: '活動8',
      },
      heading: '生日特別活動',
      summary: '生日當月享受專屬優惠。',
      details: {
        href: '#',
        text: '詳しくはこちら',
        internal: true,
      },
    },
  ],
} satisfies ActivityGroupProps 