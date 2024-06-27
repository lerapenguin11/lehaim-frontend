import React, { FC } from 'react'
import styles from './button.module.css'
import cn from 'classnames'

type Variant = 'accent' | 'outline'

interface IProps {
    text?: string
    icon?: React.ReactNode
    onClick?: () => void
    variant?: Variant
    disabled?: boolean
    type?: 'submit' | 'reset' | 'button'
}

const Button: FC<IProps> = (props) => {
    const { text, onClick, disabled, icon, variant = 'accent', type } = props

    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(styles.container, {
                [styles.accent]: variant === 'accent',
                [styles.outline]: variant === 'outline',
            })}
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    )
}

export default Button
