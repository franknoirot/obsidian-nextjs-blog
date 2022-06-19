import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import ReactMarkdown from 'react-markdown'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { PropsWithChildren } from 'react'
import PostCorner from 'components/PostCorner'



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
  const postBody = parseObsidianLinks(post.body.raw)

  return {
    props: {
      post,
      postBody,
    },
  }
}

interface IPostParams { post: Post, postBody: string }

const PostTemplate: NextPageWithLayout = (props) => {
  const { post, postBody } = props as IPostParams
  
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.published} className="text-sm text-slate-600">
            {format(parseISO(post.published), 'LLLL d, yyyy')}
          </time>
        </div>
        <ReactMarkdown>
          {postBody}
        </ReactMarkdown>
      </article>
    </>
  )
}

PostTemplate.getLayout = function getLayout(page: ReactElement) {
  return (<>
    <BaseLayout>
      {page}
    </BaseLayout>
    <PostCorner bgColor={{start: "#E4FFAC", end: "#BBC6FF"}} circleColor="#D23F3F" />
  </>)
}

export default PostTemplate
