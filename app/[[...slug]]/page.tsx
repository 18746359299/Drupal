import { FragmentOf, readFragment } from 'gql.tada'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { NodeActivityFragment, NodeArticleFragment, NodePageFragment } from '@/graphql/fragments/node'
import { TermTagsFragment } from '@/graphql/fragments/terms'
import { graphql } from '@/graphql/gql.tada'
import { EntityFragmentType } from '@/graphql/types'
import NodeArticleComponent from '@/integration/node/NodeArticle'
import NodePageComponent from '@/integration/node/NodePage'
import TermTagsComponent from '@/integration/taxonomy/TermTags'
import { getClient } from '@/utils/client'
import { calculatePath } from '@/utils/routes'

import { PageProps } from '@/.next/types/app/layout'
import { Footer, Header } from '@/components/blocks'
import { MenuFragment, MenuItemFragment } from '@/graphql/fragments/menu'
import NodeActivityComponent from '@/integration/node/NodeActivity'

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join('/') || '/home'
  const requestUrl = (await headers()).get('x-url')
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  })

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  })
  const nodeRouteQuery = graphql(
    `
      query route($path: String!) {
        route(path: $path) {
          __typename
          ... on RouteInternal {
            entity {
              __typename
              ... on NodePage {
                id
                title
              }
              ...NodePageFragment
              ...NodeArticleFragment
              ...NodeActivityFragment
              ...TermTagsFragment
            }
          }
        }

        menuMain: menu(name: MAIN) {
          ...MenuFragment
        }

        menuFooter: menu(name: FOOTER) {
          ...MenuFragment
        }
      }
    `,
    [NodePageFragment, NodeArticleFragment, TermTagsFragment, MenuFragment, NodeActivityFragment]
  )
  
  const { data, error } = await client.query(nodeRouteQuery, {
    path,
  })
  if (error) {
    throw error
  }
  if (
    !data ||
    !data?.route ||
    data?.route.__typename !== 'RouteInternal' ||
    !data.route.entity
  ) {
    return redirect('/404')
  }

  const menuMain = readFragment(MenuFragment, data.menuMain)
  const navItems = menuMain
    ? menuMain.items.map((item) => {
        const menuItem = readFragment(MenuItemFragment, item)

        return {
          label: menuItem.label,
          href: menuItem.href || undefined,
          expanded: menuItem.expanded,
        }
      })
    : []
    
  // 处理Footer菜单数据
  const menuFooter = readFragment(MenuFragment, data.menuFooter)
  const footerNavItems = menuFooter
    ? menuFooter.items.map((item) => {
        const menuItem = readFragment(MenuItemFragment, item)

        return {
          label: menuItem.label,
          href: menuItem.href || undefined,
          expanded: menuItem.expanded,
        }
      })
    : []
    
  return {
    type: data.route.entity.__typename,
    header: {
      logo: {
        // TODO: logoのsrcを変更する
        src: `${process.env.DRUPAL_AUTH_URI}/sites/default/files/2025-06/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      navItems,
      sticky: true
    },
    footer: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${process.env.DRUPAL_AUTH_URI}/sites/default/files/2025-06/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      copyrightText: `© ${new Date().getFullYear()} 日本生命保険相互会社`,
      navItems: footerNavItems,
    },
    entity: data.route.entity as EntityFragmentType,
    environment: process.env.ENVIRONMENT!,
  }
}

export default async function Page({ params }: PageProps) {
  const { type, entity, environment, header, footer } = await getDrupalData({
    params: await params,
  })  
  // 处理Footer菜单数据
  const footerColumns = []
  if (footer.navItems && footer.navItems.length > 0) {
    // 将所有菜单项分成两列
    const itemsPerColumn = Math.ceil(footer.navItems.length / 2)
    
    // 第一列
    const firstColumnItems = footer.navItems.slice(0, itemsPerColumn)
    if (firstColumnItems.length > 0) {
      footerColumns.push({
        title: "リンク",
        links: firstColumnItems.map(item => ({
          children: item.label,
          href: item.href || '#'
        }))
      })
    }
    
    // 第二列
    const secondColumnItems = footer.navItems.slice(itemsPerColumn)
    if (secondColumnItems.length > 0) {
      footerColumns.push({
        title: " ", // 空标题
        links: secondColumnItems.map(item => ({
          children: item.label,
          href: item.href || '#'
        }))
      })
    }
  }
  
  if (!type || !entity) {
    return null
  }
  console.log('type==========', type)
  console.log('entity==========', entity)
  return (
    <>
      <Header
        logo={header.logo}
        navItems={header.navItems}
        sticky={header.sticky}
      />
      {type === 'NodePage' && (
        <NodePageComponent
          node={entity as FragmentOf<typeof NodePageFragment>}
          environment={environment}
        />
      )}
      {type === 'NodeArticle' && (
        <NodeArticleComponent
          node={entity as FragmentOf<typeof NodeArticleFragment>}
          environment={environment}
        />
      )}
      {type === 'TermTags' && (
        <TermTagsComponent
          term={entity as FragmentOf<typeof TermTagsFragment>}
        />
      )}
      {type === 'NodeActivity' && (
        <NodeActivityComponent
          node={entity as FragmentOf<typeof NodeActivityFragment>}
          environment={environment}
        />
      )}
      <Footer
        logo={footer.logo}
        copyrightText={footer.copyrightText}
        columns={footerColumns}
      />
    </>
  )
}
