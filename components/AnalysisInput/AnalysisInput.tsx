import React, { FC } from 'react'
import styles from './AnalysisInput.module.css'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form'
import cn from 'classnames'

type Props = {
    label: string
    minValue: number
    maxValue: number
    errorText?: string
    formRegistrationResult: UseFormRegisterReturn<string>
}

const AnalysisInput: FC<Props> = (props) => {
    const { label, errorText, minValue, maxValue, formRegistrationResult } =
        props

    return (
        <>
            <label className={styles.container}>
                {label}
                <input
                    className={cn(styles.input, {
                        [styles.withError]: errorText,
                    })}
                    placeholder={`${minValue} - ${maxValue}`}
                    {...formRegistrationResult}
                />
            </label>
            {errorText && <span className={styles.errorText}>{errorText}</span>}
        </>
    )
}

export default AnalysisInput
