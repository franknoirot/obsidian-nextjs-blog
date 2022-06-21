import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { ReactNode } from 'react'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
