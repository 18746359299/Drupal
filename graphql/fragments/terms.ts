import { graphql } from '@/graphql/gql.tada'

export const TermTagsFragment = graphql(`
  fragment TermTagsFragment on TermTags {
    __typename
    id
    name
    description {
      processed
    }
  }
`)

export const TermCouponCategoriesFragment = graphql(`
  fragment TermCouponCategoriesFragment on TermKuponfenLei {
    __typename
    id
    name
    description {
      processed
    }
  }
`)