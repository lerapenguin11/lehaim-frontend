import Input from '../../components/Input/Input'
import styles from './patient.module.css'
import cn from 'classnames'
import Button from '../../components/Button/Button'
import { useRouter } from 'next/router'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { validateDate } from '../../utils/validation'
import { createPatient } from '../../api/frontend'

const registerFieldOptions: RegisterOptions = {
    validate: (fieldValue: string) => {
        if (!fieldValue) {
            return 'Поле не может быть пустым'
        }
    },
}

type FormValues = {
    firstName: string
    lastName: string
    middleName: string
    birthDate: string
    diagnosis: string
    passportNumber: string
}

const CreatePatient = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onTouched',
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
        const [docSeries, docNumber] = formValues.passportNumber.split(' ')

        const patient = await createPatient({
            ...formValues,
            docSeries,
            docNumber,
            birthDateStr: formValues.birthDate,
        })

        await router.push(`/patient/${patient.id}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Основная информация</h2>

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
                    formRegistrationResult={register(
                        'middleName',
                        registerFieldOptions
                    )}
                />

                <Input
                    errorText={errors.birthDate?.message}
                    placeholder="11.11.1999"
                    label="Дата рождения"
                    formRegistrationResult={register('birthDate', {
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
            </section>

            <section
                className={cn(styles.section, styles.treatmentInformation)}
            >
                <h2 className={styles.sectionTitle}>Информация о лечении</h2>

                <Input variant="text-area" label="Комментарий к диагнозу" />
                <Input variant="text-area" label="Комментарий об операции" />
                <Input
                    variant="text-area"
                    label="Комментарий о курсах химиотерапии"
                />
            </section>

            <section className={cn(styles.section, styles.controlsSection)}>
                <Button type="submit" text="Продолжить" />
            </section>
        </form>
    )
}
export default CreatePatient
