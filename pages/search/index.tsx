import { NextPageWithLayout } from '../_app'
import PatientCard from '../../components/Cards/PatientCard/PatientCard'
import { GetServerSideProps } from 'next'
import styles from './search.module.css'
import { Patient } from '../../types'

interface PageProps {
    patientList: Patient[]
    searchQuery: string
}

const Search: NextPageWithLayout<PageProps> = ({
    patientList,
    searchQuery,
}) => {
    return (
        <>
            <p className={styles.resultText}>
                Результаты по запросу{' '}
                <span className={styles.searchQuery}>
                    &quot;{searchQuery}&quot;
                </span>
                :
            </p>

            {patientList.map((patient) => {
                return (
                    <PatientCard
                        key={patient.id}
                        firstName={patient.firstName}
                        lastName={patient.lastName}
                        middleName={patient.middleName}
                        diagnosis={patient.diagnosis}
                        birthDate={patient.birthDateStr}
                        id={patient.id}
                    />
                )
            })}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const searchQuery = context.query.query

    const patientListResponse = await fetch(
        `http://backend/patient?query=${searchQuery}`,
        {
            headers: {
                auth_token: context.req.cookies.auth_token as string,
            },
        }
    )

    if (patientListResponse.status === 403) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const patientList: Patient[] = await patientListResponse.json()

    return {
        props: {
            patientList,
            searchQuery,
        },
    }
}

export default Search
