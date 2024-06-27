import { useEffect, useState } from 'react'
import {
    AnyStatusField,
    RecommendationWithApplicationConditions,
} from '../../types'
import { deleteRecommendation, getRecommendations } from '../../api/frontend'
import RecommendationCard from '../../components/Cards/RecommendationCard/RecommendationCard'
import styles from './recommendations.module.css'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getAvailableRatioFieldNames } from '../../api/backend'
import { NextPageWithLayout } from '../_app'

type Props = {
    availableFieldNames: {
        fieldName: AnyStatusField
        fieldTitle: string
    }[]
}

const Recommendations: NextPageWithLayout<Props> = (props) => {
    const { availableFieldNames } = props

    const router = useRouter()

    const [recommendations, setRecommendations] = useState<
        RecommendationWithApplicationConditions[]
    >([])

    const loadRecommendations = async () => {
        const recommendations = await getRecommendations()

        setRecommendations(recommendations)
    }

    const onEditButtonClick = async (id: number) => {
        await router.push(`/recommendations/create-or-update/${id}`)
    }

    const onDeleteButtonClick = async (id: number) => {
        await deleteRecommendation(id)

        setRecommendations(
            recommendations.filter((recommendation) => recommendation.id !== id)
        )
    }

    useEffect(() => {
        loadRecommendations()
    }, [])

    return (
        <>
            <h2>Список рекомендаций</h2>

            {!recommendations && <p>Данные загружаются...</p>}

            <div className={styles.container}>
                {recommendations?.length &&
                    recommendations.map((recommendation) => {
                        return (
                            <RecommendationCard
                                onDeleteButtonClick={onDeleteButtonClick}
                                onEditButtonClick={onEditButtonClick}
                                key={recommendation.id}
                                availableFieldNames={availableFieldNames}
                                recommendation={recommendation}
                            />
                        )
                    })}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const availableFieldNames = await getAvailableRatioFieldNames()

    return {
        props: {
            availableFieldNames,
        },
    }
}

export default Recommendations
