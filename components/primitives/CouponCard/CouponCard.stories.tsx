import type { Meta, StoryObj } from '@storybook/react'
import { CouponCard } from './CouponCard'

const meta: Meta<typeof CouponCard> = {
  title: 'Primitives/CouponCard',
  component: CouponCard,
  tags: ['autodocs'],
  args: {
    id: '1',
    title: 'ココス',
    discount: 'プレミアムドリンクバーセット319円→286円',
    image: {
      src: '/static/placeholders/drupal-decoupled/landscape-small.png',
      alt: 'ココス',
    },
    isFavorite: false,
    status: 'available',
  },
}

export default meta
type Story = StoryObj<typeof CouponCard>

export const Default: Story = {}

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
}

export const LongTitle: Story = {
  args: {
    title: 'インテリアショップ「LIVINGHOUSE」特別セール 期間限定',
    discount: '家具15%OFF',
  },
}

export const LongDiscount: Story = {
  args: {
    title: 'ビックカメラ コジマ',
    discount: 'お会計金額3%OFF（※一部商品・サービス除く）',
  },
}

export const LongTitleAndDiscount: Story = {
  args: {
    title: '横浜ベイクォーターショッピングモール 夏のバーゲンセール',
    discount: '対象商品20%OFF、2点以上で30%OFF（6/1〜6/30まで）',
  },
}

export const WithExpiryDate: Story = {
  args: {
    title: 'スターバックス',
    discount: 'ドリンク1杯無料（モバイルオーダー限定）',
    expiryDate: '2023年7月31日',
  },
}

export const LimitedQuantity: Story = {
  args: {
    title: '東京ディズニーリゾート',
    discount: '入場料10%OFF（平日限定・要事前予約）',
    status: 'limited',
    expiryDate: '2023年8月31日',
  },
}

export const Expired: Story = {
  args: {
    title: 'サンリオピューロランド',
    discount: '入場料15%OFF（学生証提示で追加5%OFF）',
    status: 'expired',
    expiryDate: '2023年5月31日',
  },
} 