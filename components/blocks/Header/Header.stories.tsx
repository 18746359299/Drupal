import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '@/components/blocks'

const meta: Meta<typeof Header> = {
  title: 'Blocks/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    logo: {
      src: '/placeholders/icons/drupal-decoupled.png',
      alt: 'Company Logo',
    },
    navItems: [
      { label: 'Link One', href: '#' },
      { label: 'Link Two', href: '#' },
      { label: 'Link Three', href: '#' },
      { label: 'Link Four', href: '#' },
    ],
    sticky: true,
  },
  argTypes: {
    logo: { control: 'object' },
    navItems: { control: 'object' },
    sticky: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const NonStickyHeader: Story = {
  args: {
    sticky: false,
  },
}

export const CustomLogo: Story = {
  args: {
    logo: {
      src: '/placeholders/icons/doc-tahedroid.png',
      alt: 'Company Logo',
    },
  },
}

export const NestedMenuItems: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '#' },
      {
        label: 'Products',
        children: [
          { label: 'Product A', href: '#product-a' },
          { label: 'Product B', href: '#product-b' },
          { label: 'Product C', href: '#product-c' },
        ],
      },
      {
        label: 'Services',
        children: [
          { label: 'Consulting', href: '#consulting' },
          { label: 'Training', href: '#training' },
          { label: 'Support', href: '#support' },
        ],
      },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}
