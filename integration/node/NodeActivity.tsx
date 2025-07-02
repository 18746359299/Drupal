import { Fragment } from 'react'

import { FragmentOf, readFragment } from 'gql.tada'
import { Activity } from '@/components/blocks'
import { NodeActivityFragment } from '@/graphql/fragments/node'
import { resolveMediaImage, resolveUser } from '@/integration/resolvers/helpers'
import { resolveComponents } from '@/integration/resolvers/components'

type NodeActivityComponentProps = {
  node: FragmentOf<typeof NodeActivityFragment>
  environment: string
}

export default function NodeActivityComponent({ node }: NodeActivityComponentProps) {
  const { title, content, activityBody, image, author, changed, summary } = readFragment(NodeActivityFragment, node)
  
  if (!image) {
    throw new Error('NodeActivityComponent: image is required')
  }
  if (!author) {
    throw new Error('NodeActivityComponent: author is required')
  }
  if (!activityBody || !activityBody.processed) {
    throw new Error('NodeActivityComponent: activityBody is required')
  }
  
  // @ts-expect-error skip validation
  const resolvedComponents = resolveComponents({ components: content })
  
  return (
    <div className="container mx-auto py-8">
      <Activity
        title={title}
        content={activityBody.processed.toString()}
        author={resolveUser(author)}
        image={resolveMediaImage(image)}
        publishDate={Number(changed.timestamp)}
        summary={summary}
      />
      {resolvedComponents && resolvedComponents.length > 0 && (
        <div className="mt-12">
          {resolvedComponents.map((component: React.ReactNode, index: number) => {
            return <Fragment key={index}>{component}</Fragment>
          })}
        </div>
      )}
    </div>
  )
}
