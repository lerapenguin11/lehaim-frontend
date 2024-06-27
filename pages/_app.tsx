import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layouts/BaseLayout/BaseLayout'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    // Use the layout defined at the page level, if available
    const getLayout =
        Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>)

    return getLayout(<Component {...pageProps} />)
}
export default App
