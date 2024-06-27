import React, { FC } from 'react'
import Head from 'next/head'
import styles from './loginLayout.module.css'

interface IProps {
    children: React.ReactNode
}

const LoginLayout: FC<IProps> = (props) => {
    const { children } = props

    return (
        <>
            <Head>
                <title>Le Ha Im – login</title>
                <meta name="description" content="Medical App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>{children}</main>
        </>
    )
}

export default LoginLayout
