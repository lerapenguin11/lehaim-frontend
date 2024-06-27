import { NextPageWithLayout } from '../../_app'
import { GetServerSideProps } from 'next'
import {
    getAvailableRatioFieldNames,
    getRecommendation,
} from '../../../api/backend'
import {
    AnyStatusField,
    RecommendationWithApplicationConditions,
    RecommendationApplicationCondition as RecommendationApplicationConditionType,
    ExistingRecommendationApplicationCondition,
    RecommendationComparisonCondition,
} from '../../../types'
import styles from './create-or-update.module.css'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

import {
    addRecommendationCondition,
    createRecommendation,
    deleteRecommendationCondition,
    updateRecommendation,
    updateRecommendationCondition,
} from '../../../api/frontend'
import { useRouter } from 'next/router'
import RecommendationApplicationCondition from '../../../components/RecommendationApplicationCondition/RecommendationApplicationCondition'
import { useState } from 'react'

const registerFieldOptions: RegisterOptions = {
    validate: (fieldValue: string) => {
        if (!fieldValue) {
            return 'Поле не может быть пустым'
        }
    },
}

type Props = {
    recommendation?: RecommendationWithApplicationConditions
    availableFieldNames: {
        fieldName: AnyStatusField
        fieldTitle: string
    }[]
}

const CreateOrEditRecommendation: NextPageWithLayout<Props> = (props) => {
    const { recommendation, availableFieldNames } = props
    const router = useRouter()

    const [conditions, setConditions] = useState<
        RecommendationApplicationConditionType[]
    >(recommendation?.conditions || [])

    const { register, handleSubmit, watch, setValue, getValues, formState } =
        useForm<RecommendationWithApplicationConditions>({
            mode: 'onTouched',
            defaultValues: recommendation,
        })

    const { errors } = formState

    watch((formState) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setConditions(formState.conditions)
    })

    const onAddConditionClick = () => {
        setValue('conditions', [
            ...getValues('conditions'),
            {
                ratioAFieldName: 'activated_t_cells',
                ratioBFieldName: 'activated_t_cells_expressing_il2',
                comparisonCondition: RecommendationComparisonCondition.Less,
                comparableValue: 1,
            },
        ])
    }

    const updateConditions = (
        updatedCondition: Partial<RecommendationApplicationConditionType>,
        index: number
    ) => {
        const conditions = getValues('conditions')

        const updatedConditions: RecommendationApplicationConditionType[] = []

        for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i]

            if (i === index) {
                updatedConditions.push({
                    ...condition,
                    ...updatedCondition,
                })
            } else {
                updatedConditions.push(condition)
            }
        }

        setValue('conditions', updatedConditions)
    }

    const onSubmit: SubmitHandler<
        RecommendationWithApplicationConditions
    > = async (formValues) => {
        let recommendationId: number

        if (recommendation && recommendation.id) {
            recommendationId = recommendation.id

            await updateRecommendation(recommendation.id, formValues)
        } else {
            const payload = {
                ...formValues,
                conditions: [],
            }

            const result = await createRecommendation(payload)

            recommendationId = result.id
        }

        for (const condition of formValues.conditions) {
            const asExistingCondition =
                condition as ExistingRecommendationApplicationCondition

            if (asExistingCondition.id !== undefined) {
                await updateRecommendationCondition(
                    recommendationId,
                    asExistingCondition.id,
                    {
                        ...asExistingCondition,
                    }
                )
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                await addRecommendationCondition(recommendationId, condition)
            }
        }

        await router.push('/recommendations')
    }

    const title = `${recommendation ? 'Изменение' : 'Создание'} рекомендации`

    return (
        <>
            <h1 className={styles.title}>{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <section className={styles.section}>
                    <Input
                        errorText={errors.title?.message}
                        placeholder="Пить больше воды"
                        label="Название"
                        formRegistrationResult={register(
                            'title',
                            registerFieldOptions
                        )}
                    />
                    <Input
                        errorText={errors.description?.message}
                        placeholder="Описание рекомендации"
                        label="Описание"
                        formRegistrationResult={register('description')}
                    />

                    <h4 className={styles.conditionsText}>Условия</h4>

                    {conditions.map((condition, index) => {
                        const onValueChange = (
                            values: Partial<RecommendationApplicationConditionType>
                        ) => {
                            updateConditions(values, index)
                        }

                        const onDeleteClick = async () => {
                            const asExistingCondition =
                                condition as ExistingRecommendationApplicationCondition

                            if (
                                recommendation?.id &&
                                asExistingCondition.id !== undefined
                            ) {
                                await deleteRecommendationCondition(
                                    recommendation?.id,
                                    asExistingCondition.id
                                )
                            }

                            setValue(
                                'conditions',
                                getValues('conditions').filter(
                                    (condition, conditionIndex) =>
                                        conditionIndex !== index
                                )
                            )
                        }

                        return (
                            <RecommendationApplicationCondition
                                key={index}
                                value={condition}
                                onValueChange={onValueChange}
                                onDeleteClick={onDeleteClick}
                                availableFieldNames={availableFieldNames}
                            />
                        )
                    })}
                </section>

                <div className={styles.buttonContainer}>
                    <Button
                        text="Добавить условие"
                        type="button"
                        onClick={onAddConditionClick}
                    />

                    <Button type="submit" text="Сохранить" />
                </div>
            </form>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recommendationId = context.params?.id

    let existingRecommendation: RecommendationWithApplicationConditions | null =
        null

    if (recommendationId !== undefined) {
        existingRecommendation = await getRecommendation(
            parseInt(recommendationId as string)
        )
    }

    const availableFieldNames = await getAvailableRatioFieldNames()

    return {
        props: {
            recommendation: existingRecommendation ?? { conditions: [] },
            availableFieldNames,
        },
    }
}
export default CreateOrEditRecommendation
