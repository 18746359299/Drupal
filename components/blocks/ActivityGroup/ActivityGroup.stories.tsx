import type { Meta, StoryObj } from '@storybook/react'
import { ActivityGroup } from './ActivityGroup'

const meta: Meta<typeof ActivityGroup> = {
  title: 'Blocks/ActivityGroup',
  component: ActivityGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ActivityGroup>

export const Default: Story = {
  args: ActivityGroup.defaults,
}

export const WithoutImages: Story = {
  args: {
    ...ActivityGroup.defaults,
    cards: ActivityGroup.defaults.cards.map((card) => ({
      ...card,
      image: undefined,
    })),
  },
}

export const WithoutAction: Story = {
  args: {
    ...ActivityGroup.defaults,
    action: undefined,
  },
}

export const WithCustomHeading: Story = {
  args: {
    ...ActivityGroup.defaults,
    heading: '限定イベント',
    subheading: '厳選されたお得なイベント',
    description: '毎月更新される特別なイベントで、最高の体験をお届けします。',
  },
}

export const WithShowMoreButton: Story = {
  args: {
    ...ActivityGroup.defaults,
    initialDisplayCount: 3,
  },
}

export const SingleCard: Story = {
  args: {
    ...ActivityGroup.defaults,
    cards: [ActivityGroup.defaults.cards[0]],
  },
}

export const TwoCards: Story = {
  args: {
    ...ActivityGroup.defaults,
    cards: ActivityGroup.defaults.cards.slice(0, 2),
  },
}

export const ThreeCards: Story = {
  args: {
    ...ActivityGroup.defaults,
    cards: ActivityGroup.defaults.cards.slice(0, 3),
  },
}

export const FourCards: Story = {
  args: {
    ...ActivityGroup.defaults,
    cards: ActivityGroup.defaults.cards.slice(0, 4),
  },
} 