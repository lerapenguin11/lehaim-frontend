import React, {
    ChangeEvent,
    Component,
    FC,
    HTMLInputTypeAttribute,
} from 'react'
import styles from './input.module.css'
import cn from 'classnames'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form'

type InputVariant = 'input' | 'text-area' | 'input-full-width'

interface IProps {
    variant?: InputVariant
    placeholder?: string
    type?: HTMLInputTypeAttribute
    name?: string
    onTextChange?: (value: string) => void
    value?: string
    label?: string
    errorText?: string
    formRegistrationResult?: UseFormRegisterReturn<string>
}

interface IContainerProps {
    variant: 'label' | 'fragment'
    inputVariant: InputVariant
    children: React.ReactNode
}

// TODO: refactor
const Container: FC<IContainerProps> = (props) => {
    const { variant, inputVariant, children } = props

    const labelClassName =
        inputVariant === 'text-area'
            ? styles.textAreaContainer
            : styles.inputContainer

    return (
        <>
            {variant === 'label' && (
                <label className={labelClassName}>{children}</label>
            )}

            {variant === 'fragment' && <>{children}</>}
        </>
    )
}

const Input: FC<IProps> = (props) => {
    const {
        placeholder,
        type,
        name,
        onTextChange,
        value,
        label,
        variant = 'input',
        formRegistrationResult,
        errorText,
    } = props

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onTextChange !== undefined) {
            onTextChange(e.target.value)
        }
    }

    const containerVariant = label ? 'label' : 'fragment'
    const formRegisterReturn = formRegistrationResult
        ? formRegistrationResult
        : {}

    return (
        <Container inputVariant={variant} variant={containerVariant}>
            {label && label}

            {variant === 'text-area' && (
                <textarea
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    className={styles.textArea}
                    {...formRegisterReturn}
                />
            )}

            {(variant === 'input' || variant === 'input-full-width') && (
                <input
                    value={value}
                    onChange={onChange}
                    name={name}
                    type={type}
                    className={cn(styles.input, {
                        [styles.fullWidth]: variant === 'input-full-width',
                        [styles.withError]: errorText,
                    })}
                    placeholder={placeholder}
                    {...formRegisterReturn}
                />
            )}
            {errorText && <span className={styles.errorText}>{errorText}</span>}
        </Container>
    )
}

export default Input
