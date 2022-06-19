import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allBooks, Book } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from './_app'
import BookCard from 'components/BookCard'

export async function getStaticProps() {
  const Books = allBooks.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published))
  })

  return { props: { Books } }
}

interface IBookLandingProps { Books: Book[] }

const BookLanding: NextPageWithLayout = (props) => {
  const { Books } = props as IBookLandingProps
  
  return (
    <div className="max-w-2xl py-16 mx-auto text-center">
      <Head>
        <title>f(n): All Books</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">All Books</h1>
      {Books.map((Book, idx) => (
        <BookCard key={idx} {...Book} />
      ))}
    </div>
  )
}

BookLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default BookLanding