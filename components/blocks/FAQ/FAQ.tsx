import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { Accordion } from '@/components/primitives'
import { cn } from '@/lib/utils'

const faqVariants = cva(
  'w-full mx-auto px-4 py-8 md:py-8 lg:py-12',
  {
    variants: {
      layout: {
        default: 'max-w-7xl',
        wide: 'max-w-5xl',
        full: 'max-w-none container',
      },
      theme: {
        light: 'bg-white text-gray-900',
        dark: 'bg-gray-900 text-white',
        primary: 'bg-blue-50 dark:bg-blue-900/20',
        secondary: 'bg-gray-50 dark:bg-gray-800/50',
      },
      rounded: {
        none: '',
        default: 'rounded-lg',
        full: 'rounded-3xl',
      }
    },
    defaultVariants: {
      layout: 'default',
      theme: 'light',
      rounded: 'none',
    },
  }
)

type QuestionProps = {
  question: string
  answer: string
}

export interface FAQProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof faqVariants> {
  heading: string
  description?: string
  questions: QuestionProps[]
  icon?: React.ReactNode
  layout?: 'default' | 'wide' | 'full'
  theme?: 'light' | 'dark' | 'primary' | 'secondary'
  rounded?: 'none' | 'default' | 'full'
}

export const FAQ = ({
  className,
  heading,
  description,
  questions,
  icon,
  layout = 'default',
  theme = 'light',
  rounded = 'none',
  ...props
}: FAQProps) => {
  // 根据主题设置内容的背景色
  const getContentClassName = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 rounded-md p-3';
      case 'primary':
        return 'bg-blue-100 dark:bg-blue-900/40 rounded-md p-3';
      case 'secondary':
        return 'bg-gray-100 dark:bg-gray-700/70 rounded-md p-3';
      default:
        return 'bg-gray-50 dark:bg-gray-800/30 rounded-md p-3';
    }
  };

  return (
    <div 
      className={cn(
        faqVariants({ layout, theme, rounded }), 
        className,
        theme === 'dark' && 'shadow-xl',
        rounded !== 'none' && 'shadow-sm'
      )} 
      {...props}
    >
      <div className="text-center mb-10">
        {icon && <div className="mb-4 inline-flex">{icon}</div>}
        <h3 className={cn(
          "mb-5 text-3xl font-bold",
          theme === 'dark' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
        )}>
          {heading}
        </h3>
        {description && (
          <p className={cn(
            "mx-auto text-lg",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
          )}>
            {description}
          </p>
        )}
      </div>
      <div className={cn(
        "mx-auto",
        layout === 'default' ? 'max-w-7xl' : 'max-w-3xl'
      )}>
        <Accordion
          items={questions.map((item) => ({
            title: item.question,
            content: item.answer,
          }))}
          contentClassName={getContentClassName()}
        />
      </div>
    </div>
  )
}

FAQ.defaults = {
  heading: 'Frequently asked questions',
  description:
    'Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.',
  questions: [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day money-back guarantee for all our products. If you are not satisfied with your purchase, you can return it within 30 days for a full refund.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        '<ul><li>Domestic orders: 3-5 business days</li><li>International orders: 7-14 business days</li><li>Express shipping options are available at checkout</li></ul>',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination. Please note that additional customs fees may apply for international orders.',
    },
  ],
} satisfies FAQProps
