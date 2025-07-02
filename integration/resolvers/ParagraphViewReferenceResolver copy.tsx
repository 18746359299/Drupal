import { FragmentOf, readFragment } from 'gql.tada'

import { graphql } from '@/graphql/gql.tada'
import { CardGroup, Hero, ActivityGroup, CouponGroup } from '@/components/blocks'
import {
  ViewBlogTeaserResultFragment,
  ViewBlogTeaserFeaturedResultFragment,
  ViewBlogMonthFeaturedResultFragment,
  ViewCouponResultFragment,
  NodeCouponFragment
} from '@/graphql/fragments/view'
import { LinkFragment } from '@/graphql/fragments/misc'
import { NodeArticleTeaserFragment } from '@/graphql/fragments/node'
import { resolveMediaImage } from '@/integration/resolvers/helpers'
import { getCouponCategories } from '@/integration/resolvers/CouponCategoriesResolver'

interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

type ReferenceFragment = (
  | FragmentOf<typeof ViewBlogTeaserResultFragment>
  | FragmentOf<typeof ViewBlogTeaserFeaturedResultFragment>
  | FragmentOf<typeof ViewBlogMonthFeaturedResultFragment>
  | FragmentOf<typeof ViewCouponResultFragment>
) & { __typename: string }

const calculateReference = (referenceFragment: ReferenceFragment) => {
  if (referenceFragment.__typename === 'ViewBlogTeaserResult') {
    return readFragment(
      ViewBlogTeaserResultFragment,
      referenceFragment as FragmentOf<typeof ViewBlogTeaserResultFragment>
    )
  }

  if (referenceFragment.__typename === 'ViewBlogTeaserFeaturedResult') {
    return readFragment(
      ViewBlogTeaserFeaturedResultFragment,
      referenceFragment as FragmentOf<
        typeof ViewBlogTeaserFeaturedResultFragment
      >
    )
  }
  if (referenceFragment.__typename === 'ViewBlogMonthFeaturedResult') {
    return readFragment(
      ViewBlogMonthFeaturedResultFragment,
      referenceFragment as FragmentOf<typeof ViewBlogMonthFeaturedResultFragment>
    )
  }
  
  if (referenceFragment.__typename === 'CouponsResult') {
    return readFragment(
      ViewCouponResultFragment,
      referenceFragment as FragmentOf<typeof ViewCouponResultFragment>
    )
  }
  
  // 处理未知类型，记录错误信息
  console.error('Unknown reference fragment type:', referenceFragment.__typename)
  return null
}

export const ParagraphViewReferenceFragment = graphql(
  `
    fragment ParagraphViewReference on ParagraphViewReference {
      __typename
      id
      headingOptional: heading
      subheadingOptional: subheading
      descriptionOptional: description
      link {
        ...LinkFragment
      }
      reference {
        __typename
        ...ViewBlogTeaserResultFragment
        ...ViewBlogTeaserFeaturedResultFragment
        ...ViewBlogMonthFeaturedResultFragment
        ...ViewCouponResultFragment
      }
    }
  `,
  [
    ViewBlogTeaserResultFragment,
    ViewBlogTeaserFeaturedResultFragment,
    ViewBlogMonthFeaturedResultFragment,
    ViewCouponResultFragment,
    LinkFragment,
  ]
)

export const ParagraphViewReferenceResolver = async ({
  paragraph,
}: ParagraphViewReferenceProps) => {
  const {
    id,
    headingOptional,
    descriptionOptional,
    subheadingOptional,
    link: linkFragment,
    reference: referenceFragment,
  } = readFragment(ParagraphViewReferenceFragment, paragraph)
  const action = linkFragment
    ? readFragment(LinkFragment, linkFragment)
    : undefined
  const reference = calculateReference(referenceFragment)
  
  if (!reference) {
    console.error('Failed to resolve reference:', referenceFragment)
    return null
  }
  const { view, display: originalDisplay, results } = reference
  // 处理不同视图类型的默认显示
  let display = originalDisplay
  if (originalDisplay === 'default') {
    // 根据视图类型设置默认显示
    if (view === 'blog') {
      display = 'teaser'
    } else if (view === 'coupons') {
      display = 'all' // coupon视图默认使用recommend显示
    } else {
      display = originalDisplay
    }
  }
  
  // 文章视图处理
  if (view === 'blog') {
    const cards = results
      ? results.map((item) => {
          const type = display === 'month_featured' ? 'activity' : 'teaser'
          const { image, path, summary, title } = readFragment(
            NodeArticleTeaserFragment,
            item as FragmentOf<typeof NodeArticleTeaserFragment>
          )
          const details = {
            href: path,
            text: type === 'activity' ? '立即查看' : 'Read post',
            internal: true,
          }

          if (!image) {
            return { heading: title, summary, type, details }
          }

          return {
            heading: title,
            summary,
            type,
            details,
            image: resolveMediaImage(image),
          }
        })
      : []
      
    if (display === 'teaser_featured') {
      const featured = cards[0]
      const remainingCards = cards.splice(1)

      return (
        <div id={id}>
          <Hero
            heading={featured.heading}
            image={featured.image}
            description={featured.summary}
            actions={[
              {
                href: featured.details.href || '',
                text: featured.details.text || '',
                internal: true,
              },
            ]}
          />
          {cards && (
            <CardGroup
              key={id}
              heading={headingOptional || ''}
              subheading={subheadingOptional || ''}
              description={descriptionOptional || ''}
              // @ts-expect-error - fix typings.
              cards={remainingCards}
              // @ts-expect-error - fix typings.
              action={action}
            />
          )}
        </div>
      )
    }
    
    if (display === 'month_featured') {
      return (
        <ActivityGroup
          id={id}
          key={id}
          heading={headingOptional || ''}
          subheading={subheadingOptional || ''}
          description={descriptionOptional || ''}
          // @ts-expect-error - fix typings.
          cards={cards}
          // @ts-expect-error - fix typings.
          action={action}
        />
      )
    }
  }
  // 优惠券视图处理
  if (view === 'coupons') {
    // 从GraphQL结果转换为CouponCard组件需要的数据结构
    const coupons = results ? results.map((item) => {
      const coupon = readFragment(
        NodeCouponFragment,
        item as FragmentOf<typeof NodeCouponFragment>
      )
      
      // 默认值
      let couponStatus: 'available' | 'limited' | 'expired' = 'available';
      
      // 根据API返回的status字段确定优惠券状态
      if (coupon.status) {
        if (coupon.status.toLowerCase().includes('expired')) {
          couponStatus = 'expired';
        } else if (coupon.status.toLowerCase().includes('limited')) {
          couponStatus = 'limited';
        }
      }
      
      // 计算过期日期显示
      let expiryDate = '';
      if (coupon.validTo) {
        expiryDate = coupon.validTo;
      }
      
      return {
        id: coupon.code || '',
        title: coupon.couponTitle || '',
        discount: coupon.company || '',
        isFavorite: false,
        image: coupon.imageTargetId ? {
          src: `/api/media/${coupon.imageTargetId}`,
          alt: coupon.couponTitle || '',
        } : {
          src: '/static/placeholders/drupal-decoupled/landscape-small.png',
          alt: coupon.couponTitle || '',
        },
        status: couponStatus,
        expiryDate: expiryDate,
        category: coupon.category || '',
      }
    }) : [];
    
    if (display === 'all') {
      // 当display等于all时，按照category分类显示
      const categories = await getCouponCategories();
      
      return (
        <CouponGroup
          id={id}
          key={id}
          title={headingOptional || "クーポン"}
          subheading={subheadingOptional || ""}
          coupons={coupons}
          categories={categories}
          activeCategory={categories && categories.length > 0 ? categories[0].name : undefined}
          showCategories={true}
        />
      )
    } else {
      // 其他情况直接显示卡片，不显示分类
      return (
        <CouponGroup
          id={id}
          key={id}
          title={headingOptional || "クーポン"}
          subheading={subheadingOptional || ""}
          coupons={coupons}
          activeCategory={display}
          showCategories={false}
        />
      )
    }
  }
  
  // 处理未知视图类型，返回null
  console.error('Unknown view type:', view)
  return null
}
