import type { Meta, StoryObj } from '@storybook/react'
import { CouponGroup } from './CouponGroup'

const meta: Meta<typeof CouponGroup> = {
  title: 'Blocks/CouponGroup',
  component: CouponGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text' },
    heading: { control: 'text' },
    coupons: { control: 'object' },
    categories: { control: 'object' },
    activeCategory: { control: 'text' },
  },
  args: {
    title: 'クーポン',
    coupons: [
      {
        id: '1',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'ココス',
        },
        title: 'ココス',
        discount: 'プレミアムドリンクバーセット319円→286円',
        isFavorite: false,
      },
      {
        id: '2',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'アクタス',
        },
        title: 'アクタス',
        discount: '全商品5%OFF',
        isFavorite: true,
      },
      {
        id: '3',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'インテリアショップ「LIVINGHOUSE」',
        },
        title: 'インテリアショップ「LIVINGHOUSE」',
        discount: '家具15%OFF',
        isFavorite: false,
      },
      {
        id: '4',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'ビックカメラ コジマ',
        },
        title: 'ビックカメラ コジマ',
        discount: 'お会計金額3%OFF',
        isFavorite: false,
      },
    ],
    categories: [
      { 
        id: "recommended", 
        name: "おすすめ", 
        title: "今月のおすすめクーポン", 
        isActive: true 
      },
      { 
        id: "all", 
        name: "全て",
        title: "全てのクーポン" 
      },
      { 
        id: "favorite", 
        name: "お気に入り",
        title: "お気に入りクーポン" 
      },
      { 
        id: "gourmet", 
        name: "グルメ",
        title: "グルメクーポン" 
      },
      { 
        id: "shopping", 
        name: "ショッピング",
        title: "ショッピングクーポン" 
      },
      { 
        id: "leisure", 
        name: "レジャー",
        title: "レジャークーポン" 
      },
      { 
        id: "entertainment", 
        name: "エンタメ・スポーツ",
        title: "エンタメ・スポーツクーポン" 
      },
      { 
        id: "support", 
        name: "ライフサポート",
        title: "ライフサポートクーポン" 
      },
    ],
    activeCategory: "recommended",
  },
}

export default meta
type Story = StoryObj<typeof CouponGroup>

export const Default: Story = {
  args: {
    ...CouponGroup.defaults,
  },
}

export const CustomMainTitle: Story = {
  args: {
    title: 'お得なクーポン特集',
  },
}

export const CustomCategoryActive: Story = {
  args: {
    activeCategory: 'gourmet',
  },
}

export const CustomHeading: Story = {
  args: {
    heading: 'カスタムタイトル - クーポン一覧',
  },
}

export const TwoCoupons: Story = {
  args: {
    coupons: [
      {
        id: '1',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'ココス',
        },
        title: 'ココス',
        discount: 'プレミアムドリンクバーセット319円→286円',
        isFavorite: false,
      },
      {
        id: '2',
        image: {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'アクタス',
        },
        title: 'アクタス',
        discount: '全商品5%OFF',
        isFavorite: true,
      },
    ],
  },
}

export const WithoutCategories: Story = {
  args: {
    ...CouponGroup.defaults,
    showCategories: false,
  },
}

export const CustomCategories: Story = {
  args: {
    ...CouponGroup.defaults,
    categories: [
      {
        id: "food",
        name: "食品",
        title: "食品クーポン",
        isActive: true
      },
      {
        id: "entertainment",
        name: "娱乐",
        title: "娱乐クーポン"
      },
      {
        id: "shopping",
        name: "购物",
        title: "购物クーポン"
      }
    ],
    activeCategory: "food"
  },
} 