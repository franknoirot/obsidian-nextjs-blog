import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { GetStaticProps } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCorner from 'components/PostCorner'
import Callout from 'components/Callout'
import { useRef } from 'react'



export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

type PostWithMdxOrMarkdown = Post & { body: { code: string }}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams
  const post = allPosts.find((post) => post._raw.sourceFileName.includes(slug)) as PostWithMdxOrMarkdown
  // post.body.code = parseObsidianLinks(post.body.code)

  return {
    props: {
      post,
    },
  }
}

interface IPostParams { post: PostWithMdxOrMarkdown }

interface ICodeComponentParams extends React.PropsWithChildren {
  node: any,
  inline: boolean,
  className: string,
}

const PostTemplate: NextPageWithLayout = (props) => {
  const { post } = props as IPostParams;
  const MdxBody = useMDXComponent(post.body.code)
    
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-3xl py-16 mx-auto cl-post-body">
        <div className="mb-8">
          <h1 className="mb-1 text-5xl leading-tight">{post.title}</h1>
          <div className="post-meta">
            <p>
              Growth Stage: <span className={"text-green-700 capitalize " + post.growthStage}>{ post.growthStage }</span>
            </p>
            <p>
              Created on <time dateTime={post.created}>{format(parseISO(post.created), 'LLLL d, yyyy')}</time>
            </p>
            <p>
              Last tended <time dateTime={post.updated}>{format(parseISO(post.updated), 'LLLL d, yyyy')}</time>
            </p>
          </div>
        </div>
        <MdxBody components={{ Callout }}/>
      </article>
    </>
  )
}

PostTemplate.getLayout = function getLayout(page: ReactElement) {
  const randomColor = Math.floor(Math.random() * 360)

  return (<>
    <BaseLayout>
      {page}
    </BaseLayout>
    <PostCorner
      className='w-1/5'
      bgColor={{start: `hsl(${randomColor}deg, 40%, 95%)`, end: `hsl(${randomColor + 60}deg, 60%, 80%)`}}
      circleColor={`hsl(${randomColor + 30}deg, 50%, 85%)`}
    />
  </>)
}

export default PostTemplate
