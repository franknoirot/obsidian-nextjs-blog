import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allBooks, Book } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import BookCard from 'components/BookCard'

export async function getStaticProps() {
  const books = allBooks.sort((a, b) => a.title < b.title ? -1 : 1)

  return { props: { books } }
}

interface IBookLandingProps { books: Book[] }

const BookLanding: NextPageWithLayout = (props) => {
  const { books } = props as IBookLandingProps
  
  return (
    <div className="max-w-6xl py-16 mx-auto">
      <Head>
        <title>f(n): All Books</title>
      </Head>

      <h1 className="mb-8 text-6xl">All <strong>Books</strong></h1>
      <section className='book-section'>
        {books.map((book, idx) => (
          <BookCard key={idx} {...book} />
        ))}
      </section>
    </div>
  )
}

BookLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default BookLanding