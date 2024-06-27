import styles from './patientCard.module.css'
import { FC } from 'react'
import Chip from '../../Chip/Chip'
import Button from '../../Button/Button'
import cn from 'classnames'
import { useRouter } from 'next/router'

interface IProps {
    firstName: string
    lastName: string
    diagnosis: string
    birthDate: string
    middleName?: string
    latestAnalysisExecutionDate?: string
    id: number
    onEditClick?: () => void
}

const PatientCard: FC<IProps> = (props) => {
    const {
        firstName,
        onEditClick,
        lastName,
        diagnosis,
        birthDate,
        middleName,
        latestAnalysisExecutionDate,
        id,
    } = props

    const router = useRouter()

    const onEditButtonClick = () => {
        if (onEditClick) {
            onEditClick()
        } else {
            router.push(`/patient/${id}`)
        }
    }

    return (
        <article className={styles.container}>
            <Chip text={`Пациент №${id}`} />

            <Button
                text="Изменить"
                onClick={onEditButtonClick}
                icon={
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.55556 12.4444H2.66389L10.2667 4.84167L9.15833 3.73333L1.55556 11.3361V12.4444ZM0 14V10.6944L10.2667 0.447222C10.4222 0.30463 10.594 0.194444 10.7819 0.116667C10.9699 0.0388889 11.1676 0 11.375 0C11.5824 0 11.7833 0.0388889 11.9778 0.116667C12.1722 0.194444 12.3407 0.311111 12.4833 0.466667L13.5528 1.55556C13.7083 1.69815 13.8218 1.86667 13.8931 2.06111C13.9644 2.25556 14 2.45 14 2.64444C14 2.85185 13.9644 3.04954 13.8931 3.2375C13.8218 3.42546 13.7083 3.59722 13.5528 3.75278L3.30556 14H0ZM9.70278 4.29722L9.15833 3.73333L10.2667 4.84167L9.70278 4.29722Z"
                            fill="white"
                        />
                    </svg>
                }
            />

            <div className={styles.content}>
                <div className={cn(styles.column, styles.personalInfo)}>
                    <span className={styles.fieldName}>Фамилия</span>
                    <span className={styles.fieldValue}>{lastName}</span>
                    <span className={styles.fieldName}>Имя</span>
                    <span className={styles.fieldValue}>{firstName}</span>
                    <span className={styles.fieldName}>Отчество</span>
                    <span className={styles.fieldValue}>
                        {middleName || '-'}
                    </span>
                    <span className={styles.fieldName}>Дата рождения</span>
                    <span className={styles.fieldValue}>
                        {birthDate || '-'}
                    </span>
                </div>

                <div className={styles.column}>
                    <span className={styles.fieldName}>Диагноз</span>
                    <span className={styles.fieldValue}>
                        {diagnosis || '-'}
                    </span>
                    <span className={styles.fieldName}>
                        Дата последнего анализа
                    </span>
                    <span className={styles.fieldValue}>
                        {latestAnalysisExecutionDate || '-'}
                    </span>
                    <span className={styles.fieldName}>Рекомендации</span>
                    <span className={styles.fieldValue}>-</span>
                </div>
            </div>
        </article>
    )
}

export default PatientCard
