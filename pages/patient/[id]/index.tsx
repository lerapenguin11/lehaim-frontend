import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../../_app'
import {
    Analysis,
    AnalysisWithRecommendations,
    Patient,
    Recommendation,
} from '../../../types'
import PatientCard from '../../../components/Cards/PatientCard/PatientCard'
import Button from '../../../components/Button/Button'
import styles from './patient.module.css'
import AnalysisCard from '../../../components/AnalysisCard/AnalysisCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import { validateDate } from '../../../utils/validation'
import { editPatient, getAnalysisChartPdf } from '../../../api/frontend'
import ChartModal from '../../../components/Modals/ChartModal/ChartModal'
import BaseModal from '../../../components/Modals/BaseModal/BaseModal'

type PageProps = {
    patient: Patient
    analyzes: AnalysisWithRecommendations[]
    latestAnalysisExecutionDate?: string
}

type FormValues = {
    firstName: string
    lastName: string
    middleName: string
    birthDateStr: string
    diagnosis: string
    passportNumber: string
}

const registerFieldOptions: RegisterOptions = {
    validate: (fieldValue: string) => {
        if (!fieldValue) {
            return 'Поле не может быть пустым'
        }
    },
}

const PatientPage: NextPageWithLayout<PageProps> = (props) => {
    const {
        patient: patientProp,
        analyzes,
        latestAnalysisExecutionDate,
    } = props

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onTouched',
    })

    const [patient, setPatient] = useState(patientProp)

    const [isPrintButtonDisabled, setIsPrintButtonDisabled] = useState(false)
    const [isEditModeEnabled, setIsEditModeEnabled] = useState(false)
    const [chartModalAnalysisId, setChartModalAnalysisId] = useState<
        string | null
    >(null)
    const [recommendationsModalData, setRecommendationsModalData] = useState<
        Recommendation[] | null
    >(null)

    const router = useRouter()

    console.log(analyzes)

    useEffect(() => {
        if (isEditModeEnabled) {
            for (const key in patient) {
                const fieldName = key as keyof FormValues & {
                    birthDateStr: string
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setValue(fieldName, patient[fieldName])
            }
        }
    }, [isEditModeEnabled, patient])

    const onAnalysisEditButtonClick = async (analysisId: number) => {
        await router.push(`/patient/${patient.id}/analysis/${analysisId}`)
    }

    const onAddAnalysisClick = async () => {
        await router.push(`/patient/${patient.id}/analysis`)
    }

    const onShowRecommendationsClick = (recommendations: Recommendation[]) => {
        setRecommendationsModalData(recommendations)
    }

    const onCloseRecommendationsClick = () => {
        setRecommendationsModalData(null)
    }

    const onPrintAnalysisClick = async (id: number) => {
        setIsPrintButtonDisabled(true)

        const blob = await getAnalysisChartPdf({
            analysisId: id.toString(),
        })

        const url = URL.createObjectURL(blob)

        window.open(url)

        setIsPrintButtonDisabled(false)
    }

    const onShowChartModalClick = (id: number) => {
        setChartModalAnalysisId(id.toString())
    }

    const onChartModalCloseClick = () => {
        setChartModalAnalysisId(null)
    }

    const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
        const [docSeries, docNumber] = formValues.passportNumber.split(' ')

        const editedPatient = await editPatient({
            ...formValues,
            docSeries,
            docNumber,
            id: patient.id.toString(),
        })

        setPatient(editedPatient)

        setIsEditModeEnabled(false)
    }

    return (
        <>
            {recommendationsModalData !== null && (
                <BaseModal onCloseClick={onCloseRecommendationsClick}>
                    <h4>Рекомендации</h4>
                    {recommendationsModalData.length === 0 && (
                        <p>Список пуст</p>
                    )}

                    {recommendationsModalData.map((recommendation, i) => (
                        <p key={recommendation.id}>
                            {i + 1}. {recommendation.title}
                        </p>
                    ))}
                </BaseModal>
            )}

            {chartModalAnalysisId !== null && (
                <ChartModal
                    onCloseClick={onChartModalCloseClick}
                    analysisId={chartModalAnalysisId}
                />
            )}

            <section className={styles.patientCommonInformation}>
                <h2>Основная информация о пациенте</h2>

                {!isEditModeEnabled && (
                    <PatientCard
                        firstName={patient.firstName}
                        lastName={patient.lastName}
                        middleName={patient.middleName}
                        diagnosis={patient.diagnosis}
                        birthDate={patient.birthDateStr}
                        latestAnalysisExecutionDate={
                            latestAnalysisExecutionDate
                        }
                        id={patient.id}
                        onEditClick={() => setIsEditModeEnabled(true)}
                    />
                )}

                {isEditModeEnabled && (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.editForm}
                    >
                        <Input
                            errorText={errors.lastName?.message}
                            placeholder="Иванов"
                            label="Фамилия"
                            formRegistrationResult={register(
                                'lastName',
                                registerFieldOptions
                            )}
                        />

                        <Input
                            errorText={errors.firstName?.message}
                            placeholder="Иван"
                            label="Имя"
                            formRegistrationResult={register(
                                'firstName',
                                registerFieldOptions
                            )}
                        />

                        <Input
                            errorText={errors.middleName?.message}
                            placeholder="Иванович"
                            label="Отчество"
                            formRegistrationResult={register('middleName')}
                        />

                        <Input
                            errorText={errors.birthDateStr?.message}
                            placeholder="11.11.1999"
                            label="Дата рождения"
                            formRegistrationResult={register('birthDateStr', {
                                validate: (fieldValue: string) => {
                                    if (!fieldValue) {
                                        return 'Поле не может быть пустым'
                                    }

                                    if (!validateDate(fieldValue)) {
                                        return 'Некорректный формат даты'
                                    }
                                },
                            })}
                        />

                        <Input
                            errorText={errors.passportNumber?.message}
                            placeholder="6543 123456"
                            label="Серия и номер паспорта"
                            formRegistrationResult={register(
                                'passportNumber',
                                registerFieldOptions
                            )}
                        />

                        <Input
                            errorText={errors.diagnosis?.message}
                            placeholder="Пример диагноза"
                            label="Диагноз"
                            formRegistrationResult={register(
                                'diagnosis',
                                registerFieldOptions
                            )}
                        />

                        <Button text="Сохранить" />
                    </form>
                )}
            </section>

            <section className={styles.patientAnalyzes}>
                <h2>Последние анализы</h2>

                {analyzes.map((analysis) => {
                    return (
                        <AnalysisCard
                            key={analysis.id}
                            recommendations={analysis.recommendations}
                            id={analysis.id}
                            executionDate={analysis.executionDateStr}
                            isPrintButtonDisabled={isPrintButtonDisabled}
                            onShowRecommendationsClick={
                                onShowRecommendationsClick
                            }
                            onPrintClick={onPrintAnalysisClick}
                            onShowChartClick={onShowChartModalClick}
                            onEditClick={onAnalysisEditButtonClick}
                        />
                    )
                })}

                <Button
                    onClick={onAddAnalysisClick}
                    variant="outline"
                    text="Добавить анализ"
                />
            </section>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const patientId = context.params?.id

    const patientResponse = await fetch(`http://backend/patient/${patientId}`)
    const analyzesResponse = await fetch(
        `http://backend/v2/patient/${patientId}/analysis/list`
    )

    if (patientResponse.status === 403 || analyzesResponse.status === 403) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const patient: Patient = await patientResponse.json()
    const analyzes: AnalysisWithRecommendations[] =
        await analyzesResponse.json()

    let latestExecutionDate: Date | null = null

    for (const analysis of analyzes) {
        const executionDateTime = new Date(analysis.executionDateStr)

        if (isNaN(executionDateTime.getTime())) {
            continue
        }

        if (!latestExecutionDate) {
            latestExecutionDate = executionDateTime
            continue
        }

        if (
            executionDateTime.getTime() >
            new Date(latestExecutionDate).getTime()
        ) {
            latestExecutionDate = executionDateTime
        }
    }

    return {
        props: {
            patient: {
                ...patient,
                passportNumber: `${patient.docSeries} ${patient.docNumber}`,
            },
            analyzes,
            latestAnalysisExecutionDate:
                latestExecutionDate?.toLocaleDateString('ru-RU') || null,
        },
    }
}

export default PatientPage
