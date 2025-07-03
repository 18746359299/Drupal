import type { Meta, StoryObj } from '@storybook/react'
import { FAQ } from '@/components/blocks'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof FAQ> = {
  title: 'Blocks/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  args: {
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
      {
        question: 'Are your products eco-friendly?',
        answer:
          'We strive to use sustainable materials and eco-friendly packaging whenever possible. Many of our products are made from recycled or biodegradable materials.',
      },
      {
        question: 'How can I contact customer support?',
        answer:
          'You can reach our customer support team via email at support@example.com or by phone at 1-800-123-4567, Monday through Friday, 9am to 5pm EST.',
      },
    ],
  },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    questions: { control: 'object' },
    layout: { 
      control: 'select', 
      options: ['default', 'wide', 'full'] 
    },
    theme: { 
      control: 'select', 
      options: ['light', 'dark', 'primary', 'secondary'] 
    },
    rounded: { 
      control: 'select', 
      options: ['none', 'default', 'full'] 
    },
  },
}

export default meta
type Story = StoryObj<typeof FAQ>

export const Default: Story = {}

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
}

export const FewerQuestions: Story = {
  args: {
    questions: meta.args!.questions!.slice(0, 3),
  },
}

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    rounded: 'default',
  },
}

export const PrimaryTheme: Story = {
  args: {
    theme: 'primary',
    rounded: 'default',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <QuestionMarkCircleIcon className="w-12 h-12 text-blue-500" />,
    theme: 'secondary',
    rounded: 'full',
  },
}

export const WideLayout: Story = {
  args: {
    layout: 'wide',
    rounded: 'default',
    theme: 'secondary',
  },
}
