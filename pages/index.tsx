import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post, allBooks, Book } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published))
  })

  const books = allBooks.sort((a, b) => a.title > b.title ? 1 : -1)
  return { props: { posts, books } }
}

function PostCard(post: Post) {
  return (
    <div className="mb-6">
      <h2 className="text-lg">
        <Link href={post.url}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.published} className="block text-sm text-slate-600">
        {format(parseISO(post.published), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

function BookCard(book: Book) {
  return (
    <div className="mb-6">
      <h2 className="text-lg">
        <Link href={book.url}>
          <a className="text-blue-700 hover:text-blue-900">{book.title}</a>
        </Link>
      </h2>
      <time dateTime={(book.publishDate || book.originallyPublished).toString()} className="block text-sm text-slate-600">
        {book.publishDate}
      </time>
    </div>
  )
}

const Home: NextPage<{ posts: Post[], books: Book[] }> = ({ posts, books }) => {
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

export default Home