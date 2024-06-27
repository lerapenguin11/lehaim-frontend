import { FC } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import styles from './link.module.css'

type Variant = 'menu-link'

interface IProps {
    text: string
    href: string
    variant?: Variant
}

const Link: FC<IProps> = (props) => {
    const { text, href, variant = 'menu-link' } = props

    return (
        <NextLink
            className={cn(styles.link, {
                [styles.menuLink]: variant === 'menu-link',
            })}
            href={href}
        >
            {text}
        </NextLink>
    )
}

export default Link
