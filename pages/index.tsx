import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post, allBooks, Book } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCard from 'components/PostCard'
import BookCard from 'components/BookCard'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published))
  })

  const books = allBooks.sort((a, b) => a.title > b.title ? 1 : -1)
  return { props: { posts, books } }
}

interface IHomeProps { posts: Post[], books: Book[] }

const Home: NextPageWithLayout = (props) => {
  const { posts, books } = props as IHomeProps
  
  return (
    <div className="max-w-2xl py-16 mx-auto text-center">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      <h2>Posts</h2>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      <hr className='my-8' />
      <h2>Books</h2>
      {books.map((book, idx) => (
        <BookCard key={'book-'+idx} {...book} />
      ))}
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default Home