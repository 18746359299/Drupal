import { Meta, StoryObj } from '@storybook/react'

import { BannerCarousel } from './BannerCarousel'

const meta: Meta<typeof BannerCarousel> = {
  title: 'Blocks/BannerCarousel',
  component: BannerCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BannerCarousel>

export const Default: Story = {
  args: {
    banners: [
      {
        heading: '高品质服务',
        description: '为您提供最专业的解决方案',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-large.png',
          alt: '轮播图1',
        },
      },
      {
        heading: '创新技术',
        description: '引领行业发展，创造未来可能',
        image: {
          src: '/static/placeholders/doc-tahedroid/landscape-large.png',
          alt: '轮播图2',
        },
      },
      {
        heading: '全方位支持',
        description: '24小时专业团队为您保驾护航',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-large.png',
          alt: '轮播图3',
        },
      },
    ],
    autoPlay: true,
    interval: 5000,
    showIndicators: true,
    showArrows: true,
  },
}

export const WithoutControls: Story = {
  args: {
    ...Default.args,
    showIndicators: false,
    showArrows: false,
  },
}

export const SingleBanner: Story = {
  args: {
    banners: [
      {
        heading: '单张轮播展示',
        description: '当只有一张轮播图时，不会显示控制元素',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-large.png',
          alt: '单张轮播图',
        },
      }
    ],
  },
}

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
}

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
} 