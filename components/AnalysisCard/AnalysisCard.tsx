import { FC } from 'react'
import Button from '../Button/Button'
import styles from './AnalysisCard.module.css'
import Chip from '../Chip/Chip'
import { Recommendation } from '../../types'
import recommendations from '../../pages/recommendations'

type Props = {
    id: number
    executionDate: string
    onEditClick: (value: number) => void
    onShowChartClick: (value: number) => void
    recommendations: Recommendation[]
    onShowRecommendationsClick: (recommendations: Recommendation[]) => void
    onPrintClick: (value: number) => void
    isPrintButtonDisabled?: boolean
}

const AnalysisCard: FC<Props> = (props) => {
    const {
        id,
        onEditClick,
        isPrintButtonDisabled,
        executionDate,
        onPrintClick,
        onShowChartClick,
        onShowRecommendationsClick,
        recommendations,
    } = props

    const onEditButtonClick = () => {
        onEditClick(id)
    }

    const onShowChartButtonClick = () => {
        onShowChartClick(id)
    }

    const onPrintButtonClick = () => {
        onPrintClick(id)
    }

    const onShowRecommendationsButtonClick = () => {
        onShowRecommendationsClick(recommendations)
    }

    return (
        <div className={styles.container}>
            <Chip text={`Анализ №${id}`} />
            Дата выполнения: {executionDate}
            <span className={styles.buttonContainer}>
                <Button
                    onClick={onShowRecommendationsButtonClick}
                    text="Рекомендации"
                    variant="outline"
                />
                <Button
                    disabled={isPrintButtonDisabled}
                    variant="outline"
                    onClick={onPrintButtonClick}
                    text="Печать"
                />
                <Button
                    variant="outline"
                    onClick={onShowChartButtonClick}
                    text="Графики"
                />
                <Button onClick={onEditButtonClick} text="Редактировать" />
            </span>
        </div>
    )
}

export default AnalysisCard
