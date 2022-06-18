import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import ReactMarkdown from 'react-markdown'
import { ParsedUrlQuery } from 'querystring'

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

const PostLayout: NextPage<{ post: Post, postBody: string }> = ({ post, postBody }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-sm font-bold text-center text-blue-700 uppercase">Home</a>
          </Link>
        </div>
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

export default PostLayout
