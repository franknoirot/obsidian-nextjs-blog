import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCard from 'components/PostCard'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  })

  return { props: { posts } }
}

interface IPostLandingProps { posts: Post[] }

const PostLanding: NextPageWithLayout = (props) => {
  const { posts } = props as IPostLandingProps
  
  return (
    <div className="max-w-2xl py-16 mx-auto text-center">
      <Head>
        <title>f(n): All Posts</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">All Posts</h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}

PostLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default PostLanding