import { GetServerSideProps } from 'next'
import { getAnalysis, getStatusTemplate } from '../../../../api/backend'
import {
    Analysis,
    CytokineStatus,
    HematologicalStatus,
    ImmuneStatus,
    Status,
    StatusTemplate,
} from '../../../../types'
import { NextPageWithLayout } from '../../../_app'
import Input from '../../../../components/Input/Input'
import AnalysisInput from '../../../../components/AnalysisInput/AnalysisInput'
import styles from './addAnalysis.module.css'
import Button from '../../../../components/Button/Button'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import {
    addAnalysisStatus,
    createAnalysis,
    editAnalysis,
    editAnalysisStatus,
} from '../../../../api/frontend'
import { validateDate } from '../../../../utils/validation'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
    cytokineStatusTemplate: StatusTemplate<CytokineStatus>
    hematologicalStatusTemplate: StatusTemplate<HematologicalStatus>
    immuneStatusTemplate: StatusTemplate<ImmuneStatus>
    patientId: number
    existingAnalysis: Analysis
}

type FormValues = Record<keyof CytokineStatus, string> &
    Record<keyof HematologicalStatus, string> &
    Record<keyof ImmuneStatus, string> & {
        executionDate: string
    }

const registerFieldOptions: RegisterOptions = {
    validate: (fieldValue: string) => {
        if (!fieldValue) {
            return 'Поле не может быть пустым'
        } else if (/[^\d.]/.test(fieldValue)) {
            return 'Допустимые символы: 0-9 и .'
        }
    },
}

const AddAnalysis: NextPageWithLayout<Props> = (props) => {
    const {
        cytokineStatusTemplate,
        hematologicalStatusTemplate,
        immuneStatusTemplate,
        patientId,
        existingAnalysis,
    } = props

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onTouched',
    })

    const router = useRouter()

    useEffect(() => {
        if (!existingAnalysis) {
            return
        }

        const {
            cytokineStatus,
            hematologicalStatus,
            immuneStatus,
            executionDateStr,
        } = existingAnalysis

        setValue('executionDate', executionDateStr)

        for (const key in cytokineStatus) {
            const fieldName = key as keyof CytokineStatus

            if (cytokineStatus[fieldName]) {
                setValue(fieldName, cytokineStatus[fieldName].toString())
            }
        }

        for (const key in hematologicalStatus) {
            const fieldName = key as keyof HematologicalStatus

            if (hematologicalStatus[fieldName]) {
                setValue(fieldName, hematologicalStatus[fieldName].toString())
            }
        }

        for (const key in immuneStatus) {
            const fieldName = key as keyof ImmuneStatus

            if (immuneStatus[fieldName]) {
                setValue(fieldName, immuneStatus[fieldName].toString())
            }
        }
    }, [existingAnalysis])

    const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
        // TODO: add backend method for creating from single query

        if (existingAnalysis) {
            await editAnalysis({
                analysisId: existingAnalysis.id,
                executionDateStr: formValues.executionDate,
            })

            for (const statusName of ['cytokine', 'hematological', 'immune']) {
                await editAnalysisStatus({
                    analysisId: existingAnalysis.id.toString(),
                    status: statusName as Status,
                    ...formValues,
                })
            }
        } else {
            const { id: analysisId } = await createAnalysis({
                patientId,
                executionDateStr: formValues.executionDate,
            })

            for (const statusName of ['cytokine', 'hematological', 'immune']) {
                await addAnalysisStatus({
                    analysisId: analysisId.toString(),
                    status: statusName as Status,
                    ...formValues,
                })
            }
        }

        await router.push(`/patient/${patientId}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <h2>Добавление анализа</h2>

            <Input
                formRegistrationResult={register('executionDate', {
                    validate: (fieldValue: string) => {
                        if (!fieldValue) {
                            return 'Поле не может быть пустым'
                        }

                        if (!validateDate(fieldValue)) {
                            return 'Некорректный формат даты'
                        }
                    },
                })}
                errorText={errors?.executionDate?.message}
                label="Дата выполнения анализа"
                placeholder="01.11.1976"
            />

            <section className={styles.section}>
                <h3>Гематологический статус</h3>

                {hematologicalStatusTemplate.map((item) => {
                    return (
                        <AnalysisInput
                            key={item.fieldName}
                            label={item.fieldTitle}
                            maxValue={item.fieldMaxValue}
                            minValue={item.fieldMinValue}
                            errorText={errors[item.fieldName]?.message}
                            formRegistrationResult={register(
                                item.fieldName,
                                registerFieldOptions
                            )}
                        />
                    )
                })}
            </section>

            <section className={styles.section}>
                <h3>Имунный статус</h3>

                {immuneStatusTemplate.map((item) => {
                    return (
                        <AnalysisInput
                            key={item.fieldName}
                            label={item.fieldTitle}
                            maxValue={item.fieldMaxValue}
                            minValue={item.fieldMinValue}
                            errorText={errors[item.fieldName]?.message}
                            formRegistrationResult={register(
                                item.fieldName,
                                registerFieldOptions
                            )}
                        />
                    )
                })}
            </section>

            <section className={styles.section}>
                <h3>Цитокиновый статус</h3>

                {cytokineStatusTemplate.map((item) => {
                    return (
                        <AnalysisInput
                            key={item.fieldName}
                            label={item.fieldTitle}
                            maxValue={item.fieldMaxValue}
                            minValue={item.fieldMinValue}
                            errorText={errors[item.fieldName]?.message}
                            formRegistrationResult={register(
                                item.fieldName,
                                registerFieldOptions
                            )}
                        />
                    )
                })}
            </section>

            <Button type="submit" variant="accent" text="Сохранить" />
        </form>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const analysisId = context.params?.analysisId
        ? context.params?.analysisId[0]
        : null

    const patientId = context.params?.id

    const cytokineStatusTemplate =
        await getStatusTemplate<CytokineStatus>('cytokine')

    const hematologicalStatusTemplate =
        await getStatusTemplate<CytokineStatus>('hematological')

    const immuneStatusTemplate =
        await getStatusTemplate<CytokineStatus>('immune')

    const existingAnalysis = analysisId ? await getAnalysis(analysisId) : null

    return {
        props: {
            cytokineStatusTemplate,
            hematologicalStatusTemplate,
            immuneStatusTemplate,
            patientId,
            existingAnalysis,
        },
    }
}

export default AddAnalysis
