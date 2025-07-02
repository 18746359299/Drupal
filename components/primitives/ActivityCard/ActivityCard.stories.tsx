import type { Meta, StoryObj } from '@storybook/react'
import { ActivityCard } from './ActivityCard'

const meta: Meta<typeof ActivityCard> = {
  title: 'Primitives/ActivityCard',
  component: ActivityCard,
  tags: ['autodocs'],
  args: {
    heading: '夏季特惠活動',
    href: '#',
    image: {
      src: '/static/placeholders/drupal-decoupled/landscape-small.png',
      alt: '活動圖片',
    },
  },
}

export default meta
type Story = StoryObj<typeof ActivityCard>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const WithoutImage: Story = {
  args: {
    image: undefined,
  },
}

export const LongHeading: Story = {
  args: {
    heading: '這是一個非常長的標題，用來測試標題文本的截斷效果，確保在卡片中顯示正常',
  },
} 