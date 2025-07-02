import { FragmentOf, readFragment } from 'gql.tada'

import { graphql } from '@/graphql/gql.tada'
import { MediaImageFragment } from '@/graphql/fragments/media'
import { resolveMediaImage } from '@/integration/resolvers/helpers'
import { BannerCarousel } from '@/components/blocks'

interface ParagraphBannerGroupProps {
  paragraph: FragmentOf<typeof ParagraphBannerGroupFragment>
}

const ParagraphSimpleBannerFragment = graphql(
  `
    fragment ParagraphSimpleBannerFragment on ParagraphSimpleCard {
      __typename
      id
      heading
      description
      image {
        ...MediaImageFragment
      }
    }
  `,
  [MediaImageFragment]
)

export const ParagraphBannerGroupFragment = graphql(
  `
    fragment ParagraphBannerGroupFragment on ParagraphBannerGroup {
      __typename
      id
      items {
        __typename
        ...ParagraphSimpleBannerFragment
      }
    }
  `,
  [ParagraphSimpleBannerFragment]
)

export const ParagraphBannerGroupResolver = ({
  paragraph,
}: ParagraphBannerGroupProps) => {
  const { id, items } = readFragment(
    ParagraphBannerGroupFragment, 
    paragraph
  )
  
  // 如果没有内容项，则返回空
  if (!items) {
    return null;
  }

  const banners = items && Array.isArray(items)
    ? items.map((item) => {
        const type = 'simple'
        const { heading, description, image } = readFragment(
          ParagraphSimpleBannerFragment,
          item as FragmentOf<typeof ParagraphSimpleBannerFragment>
        )

        return {
          heading,
          description,
          image: resolveMediaImage(image),
          type,
        }
      })
    : []

  // 如果没有有效的横幅，则返回 null
  if (banners.length === 0) {
    return null;
  }

  return (
    <BannerCarousel
      id={id}
      banners={banners}
      autoPlay={true}
      interval={5000}
      showIndicators={true}
      showArrows={true}
    />
  )
} 