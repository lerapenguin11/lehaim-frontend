import { FC, memo } from 'react'
import {
    AnyStatusField,
    RecommendationApplicationCondition,
    RecommendationComparisonCondition,
} from '../../types'
import styles from './recommendationApplicationCondition.module.css'
import { RegisterOptions, useForm } from 'react-hook-form'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { getRecommendationApplicationConditionSign } from '../../utils/common'

const registerFieldOptions: RegisterOptions = {
    validate: (fieldValue: string) => {
        if (!fieldValue) {
            return 'Поле не может быть пустым'
        }
    },
}

const defaultFormState: RecommendationApplicationCondition = {
    ratioAFieldName: 'cd3_m_ifny_spontaneous',
    ratioBFieldName: 'cd3_m_ifny_stimulated',
    comparisonCondition: RecommendationComparisonCondition.Greater,
    comparableValue: 1,
}

type FormState = RecommendationApplicationCondition

type Props = {
    value?: RecommendationApplicationCondition
    onValueChange: (value: Partial<RecommendationApplicationCondition>) => void
    availableFieldNames: {
        fieldName: AnyStatusField
        fieldTitle: string
    }[]
    onDeleteClick: VoidFunction
}

const ApplicationCondition: FC<Props> = (props) => {
    const { value, onDeleteClick, onValueChange, availableFieldNames } = props

    const { register, watch, formState } = useForm<FormState>({
        mode: 'onTouched',
        defaultValues: value || defaultFormState,
    })

    watch((formState) => {
        onValueChange(formState)
    })

    const { errors } = formState

    return (
        <div className={styles.container}>
            <label className={styles.selectInputLabel}>
                Числитель соотношения
                <select
                    {...register('ratioAFieldName', registerFieldOptions)}
                    className={styles.selectInput}
                >
                    {availableFieldNames.map(({ fieldName, fieldTitle }) => {
                        return (
                            <option key={fieldName} value={fieldName}>
                                {fieldTitle}
                            </option>
                        )
                    })}
                </select>
            </label>

            <label className={styles.selectInputLabel}>
                Знаменатель соотношения
                <select
                    {...register('ratioBFieldName', registerFieldOptions)}
                    className={styles.selectInput}
                >
                    {availableFieldNames.map(({ fieldName, fieldTitle }) => {
                        return (
                            <option key={fieldName} value={fieldName}>
                                {fieldTitle}
                            </option>
                        )
                    })}
                </select>
            </label>

            <Input
                errorText={errors.comparableValue?.message}
                placeholder="Значение для сравнения"
                label="Значение для сравнения"
                formRegistrationResult={register(
                    'comparableValue',
                    registerFieldOptions
                )}
            />

            <label className={styles.selectInputLabel}>
                Знак сравнения
                <select
                    {...register('comparisonCondition', registerFieldOptions)}
                    className={styles.selectInput}
                >
                    {Object.values(RecommendationComparisonCondition).map(
                        (fieldName) => {
                            return (
                                <option key={fieldName} value={fieldName}>
                                    {getRecommendationApplicationConditionSign(
                                        fieldName
                                    )}
                                </option>
                            )
                        }
                    )}
                </select>
            </label>

            <div className={styles.buttonContainer}>
                <Button
                    onClick={onDeleteClick}
                    type="button"
                    variant="outline"
                    text="Удалить"
                />
            </div>
        </div>
    )
}

export default memo(ApplicationCondition, (prevProps, nextProps) => {
    return (
        prevProps.value?.comparableValue === nextProps.value?.comparableValue,
        prevProps.value?.comparisonCondition ===
            nextProps.value?.comparisonCondition,
        prevProps.value?.ratioAFieldName === nextProps.value?.ratioAFieldName,
        prevProps.value?.ratioBFieldName === nextProps.value?.ratioBFieldName
    )
})
