import { graphql } from '@/graphql/gql.tada'
import { MediaImageFragment } from '@/graphql/fragments/media'
import { UserFragment } from '@/graphql/fragments/user'

// @todo fix importing NodeArticleTeaserFragment from node.ts
// import { NodeArticleTeaserFragment } from "~/graphql/fragments/node";
const NodeArticleTeaserFragment = graphql(
  `
    fragment NodeArticleTeaserFragment on NodeArticle {
      __typename
      id
      title
      summary
      path
      image {
        ...MediaImageFragment
      }
      author {
        ...UserFragment
      }
    }
  `,
  [MediaImageFragment, UserFragment]
)

// 活动节点片段定义
export const NodeActivityTeaserFragment = graphql(
  `
    fragment NodeActivityTeaserFragment on NodeActivity {
      __typename
      id
      title
      summary
      path
      image {
        ...MediaImageFragment
      }
      author {
        ...UserFragment
      }
    }
  `,
  [MediaImageFragment, UserFragment]
)

export const NodeCouponFragment = graphql(`
  fragment NodeCouponFragment on CouponsRow {
    __typename
    code
    couponTitle: title
    company
    category
    validFrom
    validTo
    status
    imageTargetId
  }
`)
export const ViewBlogTeaserResultFragment = graphql(
  `
    fragment ViewBlogTeaserResultFragment on ViewBlogTeaserResult {
      __typename
      id
      view
      display
      results {
        ...NodeArticleTeaserFragment
      }
    }
  `,
  [NodeArticleTeaserFragment]
)

export const ViewBlogTeaserFeaturedResultFragment = graphql(
  `
    fragment ViewBlogTeaserFeaturedResultFragment on ViewBlogTeaserFeaturedResult {
      __typename
      id
      view
      display
      results {
        ...NodeArticleTeaserFragment
      }
    }
  `,
  [NodeArticleTeaserFragment]
)

export const ViewBlogMonthFeaturedResultFragment = graphql(
  `
    fragment ViewBlogMonthFeaturedResultFragment on ViewBlogMonthFeaturedResult {
      __typename
      id
      view
      display
      results {
        ...NodeArticleTeaserFragment
      }
    }
  `,
  [NodeArticleTeaserFragment]
)

// 更新优惠券视图片段
export const ViewCouponResultFragment = graphql(
  `
    fragment ViewCouponResultFragment on CouponsResult {
      __typename
      id
      view
      display
      results {
        ...NodeCouponFragment
      }
    }
  `,
  [NodeCouponFragment]
)

// 活动视图查询片段
export const ViewActivityResultFragment = graphql(
  `
    fragment ViewActivityResultFragment on ActivityGraphql1Result {
      __typename
      id
      view
      display
      results {
        ...NodeActivityTeaserFragment
      }
    }
  `,
  [NodeActivityTeaserFragment]
)