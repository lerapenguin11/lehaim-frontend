import styles from './chip.module.css'
import { FC } from 'react'

type Props = {
    text: string | number
}

const Chip: FC<Props> = (props) => {
    const { text } = props

    return <span className={styles.container}>{text}</span>
}

export default Chip
