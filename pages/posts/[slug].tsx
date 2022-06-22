import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
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

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams
  const post = allPosts.find((post) => post._raw.sourceFileName.includes(slug)) as Post
  post.body.raw = parseObsidianLinks(post.body.raw)

  return {
    props: {
      post,
    },
  }
}

interface IPostParams { post: Post }

interface ICodeComponentParams extends React.PropsWithChildren {
  node: any,
  inline: boolean,
  className: string,
}

const PostTemplate: NextPageWithLayout = (props) => {
  const { post } = props as IPostParams;
    
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-3xl py-16 mx-auto cl-post-body">
        <div className="mb-8">
          <h1 className="mb-1 text-5xl leading-tight first-letter:capitalize">{post.title}</h1>
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
        <ReactMarkdown>
          {post.body.raw}
        </ReactMarkdown>
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
