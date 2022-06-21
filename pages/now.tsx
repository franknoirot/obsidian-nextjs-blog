import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { NowUpdate, allNowUpdates } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { parseObsidianLinks } from 'lib/markdown'
import UpdateCard from 'components/UpdateCard'

export async function getStaticProps() {
  const updates = allNowUpdates.sort((a, b) => {
    return compareDesc(
      new Date(a._raw.sourceFileName.slice(0, a._raw.sourceFileName.lastIndexOf('.'))),
      new Date(b._raw.sourceFileName.slice(0, b._raw.sourceFileName.lastIndexOf('.'))),
    )
  })

  allNowUpdates.forEach(update => {
    update.body.raw = parseObsidianLinks(update.body.raw)
  })

  return { props: { updates } }
}

interface INowProps { updates: NowUpdate[] }

const NowPage: NextPageWithLayout = (props) => {
  const { updates } = props as INowProps
  
  return (
    <div className="max-w-2xl py-16 mx-auto">
      <Head>
        <title>Frank Noirot&apos;s Now page</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">What Frank’s up to now.</h1>
      <p>
      This is my Now page, where I can post life updates that aren’t changing what I’m about, but are more impactful and necessary to document than an Instagram post. Like a lot of this site, I was inspired by sites like Maggie Appleton’s to add one of my own, now that I have a simple way to turn notes into published content.
      </p>

      {updates.map((update) => (
        <UpdateCard key={'update-'+update.title} {...update} />
      ))}
    </div>
  )
}

NowPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default NowPage