import { readFragment } from 'gql.tada'
import { graphql } from '@/graphql/gql.tada'
import { TermCouponCategoriesFragment } from '@/graphql/fragments/terms'
import { getClient } from '@/utils/client'

// 定义分类类型
export interface CouponCategory {
  id: string
  name: string
  title: string
  isActive: boolean
  description?: string
}

// 定义查询所有优惠券分类的GraphQL查询
export const couponCategoriesQuery = graphql(
  `
    query GetCouponCategories {
      termKuponfenLeis(first: 100) {
        nodes {
          ...TermCouponCategoriesFragment
        }
      }
    }
  `,
  [TermCouponCategoriesFragment]
)

// 获取优惠券分类数据
export async function getCouponCategories(activeCategory?: string): Promise<CouponCategory[]> {
  try {
    // 获取GraphQL客户端
    const client = await getClient({
      url: process.env.DRUPAL_GRAPHQL_URI!,
      auth: {
        uri: process.env.DRUPAL_AUTH_URI!,
        clientId: process.env.DRUPAL_CLIENT_ID!,
        clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
      },
    })

    // 执行查询
    const { data, error } = await client.query(couponCategoriesQuery, {})
    if (error) {
      console.error('获取优惠券分类失败:', error)
      return []
    }

    // 处理查询结果
    const categories = data?.termKuponfenLeis?.nodes || []

    // 将分类数据转换为组件需要的格式
    return categories.map(category => {
      const term = readFragment(TermCouponCategoriesFragment, category)
      return {
        id: term.id,
        name: term.name,
        title: `${term.name}优惠券`,
        isActive: activeCategory === term.id,
        description: term.description?.processed ? String(term.description.processed) : undefined
      }
    })
  } catch (error) {
    console.error('获取优惠券分类时出错:', error)
    return []
  }
} 