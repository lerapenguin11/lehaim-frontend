import React, { FC } from 'react'
import Head from 'next/head'
import Header from '../../components/Header/Header'
import styles from './baseLayout.module.css'

interface IProps {
    children: React.ReactNode
}

const BaseLayout: FC<IProps> = (props) => {
    const { children } = props

    return (
        <>
            <Head>
                <title>Le Ha Im</title>
                <meta name="description" content="Medical App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className={styles.main}>{children}</main>
        </>
    )
}

export default BaseLayout
