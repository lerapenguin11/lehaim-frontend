import { FC } from 'react'
import { createPortal } from 'react-dom'
import styles from './baseModal.module.css'

type Props = {
    children: React.ReactNode | React.ReactNode[]
    onCloseClick: () => void
}

const BaseModal: FC<Props> = (props) => {
    const { children, onCloseClick } = props

    if (typeof window === 'undefined') {
        return <></>
    }

    return (
        <>
            {createPortal(
                <>
                    <button
                        onClick={onCloseClick}
                        className={styles.backdrop}
                    />
                    <div className={styles.container}>{children}</div>
                </>,
                document.body
            )}
        </>
    )
}

export default BaseModal
