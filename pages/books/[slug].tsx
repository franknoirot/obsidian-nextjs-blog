import Head from 'next/head'
import Link from 'next/link'
import { allDocuments, allBooks, Book } from 'contentlayer/generated'
import { GetStaticProps, NextPage } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'pages/_app'
import extractColors from 'extract-colors'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { IBookCornerProps } from 'components/BookCorner'
import BookLayout, { BookContext } from 'components/layouts/BookLayout'

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

type ExtractedColor = {
  area: number,
  red: number,
  blue: number,
  green: number,
  hex: string,
  saturation: number,
}

interface IBookProps { book: Book, bookBody: string }

const BookTemplate: NextPageWithLayout = (props) => {
  const { book, bookBody } = props as IBookProps
  const { setValue } = useContext(BookContext)

  function luminance(color: ExtractedColor) {
    return 0.2126*color.red + 0.7152*color.green + 0.0722*color.blue
  }

  useEffect(() => {
    async function loadColors() {
      if (!(typeof window === 'undefined')) {
        const c = (await extractColors('/assets/'+book.coverImg))
          .sort((a: ExtractedColor, b: ExtractedColor) => luminance(b) - luminance(a) ) as ExtractedColor[]

        setValue({ 
          bgColor: {
            start: c[0].hex,
            end: c[3].hex,
          },
          squareColor: c[2].hex,
        })
      }
    }

    loadColors()
  }, [book.coverImg, setValue])
  
  return (
    <>
      <Head>
        <title>{book.title} | franknoirot.co</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
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

BookTemplate.getLayout = function getLayout(page: ReactElement) {
  return (
      <BaseLayout>
        <BookLayout>
        { page }
        </BookLayout>
      </BaseLayout>
  )
}

export default BookTemplate