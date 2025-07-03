'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { CouponCard, type CouponCardProps } from '@/components/primitives'
import { useState } from 'react'

const couponGroupVariants = cva('w-full py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-slate-50 to-white', {
  variants: {},
  defaultVariants: {},
})

export type CouponItemProps = Omit<CouponCardProps, 'className'> & {
  category?: string
}

export interface CategoryType {
  id: string
  name: string
  isActive?: boolean
  title?: string
}

export interface CouponGroupProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof couponGroupVariants> {
  title?: string
  heading?: string
  subheading?: string
  coupons: CouponItemProps[]
  categories?: CategoryType[]
  activeCategory?: string
  showCategories?: boolean
  onCategoryChange?: (category: string) => void
}

export const CouponGroup = ({
  className,
  title = "クーポン",
  heading,
  subheading,
  coupons,
  activeCategory,
  categories = [
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
  showCategories = true,
  onCategoryChange,
  ...props
}: CouponGroupProps) => {
  // 设置内部状态，如果没有提供activeCategory，则使用第一个分类
  const [currentCategory, setCurrentCategory] = useState(activeCategory || categories[0]?.id);
  
  // 找出当前活动的分类
  const activeCat = categories.find(cat => cat.id === currentCategory) || categories[0];
  
  // 根据活动分类或传入的heading确定要显示的标题
  const currentHeading = heading || activeCat?.title || "クーポン";

  // 处理分类点击事件
  const handleCategoryClick = (categoryName: string) => {
    setCurrentCategory(categoryName);
    
    // 如果提供了外部回调函数，则调用它
    if (onCategoryChange) {
      onCategoryChange(categoryName);
    }
  };

  // 根据当前选中的分类筛选优惠券
  let filteredCoupons = coupons;
  
  if (showCategories) {
    filteredCoupons = coupons.filter(coupon => {
      // 如果当前分类是全部，显示所有优惠券
      if (currentCategory === "全て") {
        return true;
      }
      
      // 如果当前分类是收藏，显示所有标记为收藏的优惠券
      if (currentCategory === "お気に入り") {
        return coupon.isFavorite;
      }
      
      // 查找当前选中的分类对象
      const selectedCategory = categories.find(cat => cat.id === currentCategory);
      // 使用分类ID进行匹配（如果可用），否则使用分类名称
      if (selectedCategory) {
        return coupon.category === selectedCategory.id;
      }
      
      // 默认情况下显示所有优惠券
      return true;
    });
  }
  // 当showCategories为false时，不进行筛选，直接显示所有卡片

  return (
    <div className={cn(couponGroupVariants(), className)} {...props}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto text-center mb-12 max-w-3xl">
          {/* 主标题 */}
          {title && (
            <h2 className="font-bold mb-4 tracking-tight text-3xl text-slate-800 relative inline-block">
              {title}
              <span className="rounded-full bg-amber-500 h-1 w-full -bottom-2 left-0 absolute"></span>
            </h2>
          )}
          {subheading && (
            <p className="mt-6 text-xl text-slate-600">{subheading}</p>
          )}
        </div>

        {/* カテゴリータブ - 只在showCategories为true时显示 */}
        {showCategories && categories.length > 0 && (
          <div className="flex flex-wrap mb-8 gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors shadow-sm",
                  category.id === currentCategory
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* 分类标题 */}
        <h3 className="font-bold text-center mb-8 text-2xl text-gray-800">
          {currentHeading}
        </h3>

        {/* クーポン一覧 */}
        <div className="mx-auto max-w-7xl auto-rows-fr grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} className="cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  )
}

CouponGroup.defaults = {
  title: "クーポン",
  subheading: "お得な情報",
  showCategories: true,
  onCategoryChange: undefined,
  coupons: [
    {
      id: "1",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "ココス",
      },
      title: "ココス",
      discount: "プレミアムドリンクバーセット319円→286円",
      isFavorite: false,
      status: "available",
      expiryDate: "2023年7月31日",
    },
    {
      id: "2",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "アクタス",
      },
      title: "アクタス",
      discount: "全商品5%OFF",
      isFavorite: true,
      status: "available",
      expiryDate: "2023年8月15日",
    },
    {
      id: "3",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "インテリアショップ「LIVINGHOUSE」",
      },
      title: "インテリアショップ「LIVINGHOUSE」特別セール",
      discount: "家具15%OFF（6/1〜6/30まで）",
      isFavorite: false,
      status: "limited",
      expiryDate: "2023年6月30日",
    },
    {
      id: "4",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "ビックカメラ コジマ",
      },
      title: "ビックカメラ コジマ",
      discount: "お会計金額3%OFF（※一部商品・サービス除く）",
      isFavorite: false,
      status: "available",
      expiryDate: "2023年9月30日",
    },
    {
      id: "5",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "横浜ベイクォーター",
      },
      title: "横浜ベイクォーターショッピングモール 夏のバーゲンセール",
      discount: "対象商品20%OFF、2点以上で30%OFF",
      isFavorite: false,
      status: "available",
      expiryDate: "2023年6月30日",
    },
    {
      id: "6",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "スターバックス",
      },
      title: "スターバックス",
      discount: "ドリンク1杯無料（モバイルオーダー限定）",
      isFavorite: true,
      status: "limited",
      expiryDate: "2023年7月10日",
    },
    {
      id: "7",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "東京ディズニーリゾート",
      },
      title: "東京ディズニーリゾート",
      discount: "入場料10%OFF（平日限定・要事前予約）",
      isFavorite: false,
      status: "available",
      expiryDate: "2023年8月31日",
    },
    {
      id: "8",
      image: {
        src: "/static/placeholders/drupal-decoupled/landscape-small.png",
        alt: "サンリオピューロランド",
      },
      title: "サンリオピューロランド",
      discount: "入場料15%OFF（学生証提示で追加5%OFF）",
      isFavorite: false,
      status: "expired",
      expiryDate: "2023年5月31日",
    },
  ],
  activeCategory: "recommended",
} satisfies CouponGroupProps 