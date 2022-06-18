import Head from 'next/head'
import Link from 'next/link'
import { allDocuments, allBooks, Book } from 'contentlayer/generated'
import { GetStaticProps, NextPage } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'

export async function getStaticPaths() {
  const paths = allBooks.map((book) => book.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async(context) => {
  const { slug } = context.params as IParams
  const book = allBooks.find((book) => book._raw.sourceFileName.includes(slug)) as Book
  const bookBody = parseObsidianLinks(book.body.raw)

  return {
    props: {
      book,
      bookBody,
    },
  }
}

const BookLayout: NextPage<{ book: Book, bookBody: string }> = ({ book, bookBody }) => {
  return (
    <>
      <Head>
        <title>{book.title}</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-sm font-bold text-center text-blue-700 uppercase">Home</a>
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{book.title}</h1>
          <p>by {book.author}</p>
          <time dateTime={(book.publishDate || book.originallyPublished).toString()} className="text-sm text-slate-600">
            {book.publishDate || book.originallyPublished}
          </time>
        </div>
        <div className='my-8 cl-book-cover'>
          <div className='block mx-auto overflow-visible skew-y-3 w-fit' style={{background: 'radial-gradient(closest-side at 50% 99%, hsla(220deg, 20%, 4%, .2) 30%, transparent)'}}>
            <Image src={'/assets/' + book.coverImg}
              width="300"
              height="300"
              layout='intrinsic'
              objectFit='contain'
              alt={book.title + ' cover'}
            />
          </div>
        </div>
        <div className="cl-book-body">
          <ReactMarkdown>
            {bookBody}
          </ReactMarkdown>
        </div>
      </article>
    </>
  )
}

export default BookLayout
