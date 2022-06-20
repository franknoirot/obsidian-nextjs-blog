import Head from 'next/head'
import { allPages, Page } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import ReactMarkdown from 'react-markdown'
import { parseObsidianLinks } from 'lib/markdown'
import PostCorner from 'components/PostCorner'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from 'next'

export async function getStaticPaths() {
  const paths = allPages.map((page) => page.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string[] | string
}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams

  const page = allPages.find((page) => page.url.includes((Array.isArray(slug)) ? slug.join('/') : slug)) as Page
  const pageBody = parseObsidianLinks(page.body.raw)

  return {
    props: {
      page,
      pageBody,
    },
  }
}

interface IPageParams { page: Page, pageBody: string }

const PageTemplate: NextPageWithLayout = (props) => {
  const { page, pageBody } = props as IPageParams
  
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <ReactMarkdown>
          {pageBody}
        </ReactMarkdown>
      </article>
    </>
  )
}

PageTemplate.getLayout = function getLayout(page: ReactElement) {
  return (<>
    <BaseLayout>
      {page}
    </BaseLayout>
    <PostCorner bgColor={{start: "blue", end: "navy"}} circleColor="teal" />
  </>)
}

export default PageTemplate