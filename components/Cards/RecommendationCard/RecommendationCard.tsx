import {
    AnyStatusField,
    RecommendationWithApplicationConditions,
} from '../../../types'
import { FC } from 'react'
import Chip from '../../Chip/Chip'
import styles from './recommendationCard.module.css'
import { getRecommendationApplicationConditionSign } from '../../../utils/common'
import Button from '../../Button/Button'

type Props = {
    recommendation: RecommendationWithApplicationConditions
    onEditButtonClick: (id: number) => void
    onDeleteButtonClick: (id: number) => void
    availableFieldNames: {
        fieldName: AnyStatusField
        fieldTitle: string
    }[]
}

const RecommendationCard: FC<Props> = (props) => {
    const {
        recommendation: { id, title, description, conditions },
        onEditButtonClick,
        availableFieldNames,
        onDeleteButtonClick,
    } = props

    const onEditClick = () => {
        onEditButtonClick(id)
    }

    const onDeleteClick = () => {
        onDeleteButtonClick(id)
    }

    // move up
    const getRatioFieldTitle = (fieldName: AnyStatusField) => {
        return (
            availableFieldNames.find(
                ({ fieldName: statusFieldName }) =>
                    statusFieldName === fieldName
            )?.fieldTitle ?? fieldName
        )
    }

    return (
        <article className={styles.container}>
            <Chip text={id} />
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}

            <div className={styles.body}>
                <b>Условия:</b>
                {conditions.map(
                    ({
                        ratioBFieldName,
                        ratioAFieldName,
                        comparableValue,
                        comparisonCondition,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        id,
                    }) => {
                        return (
                            <div className={styles.card} key={id}>
                                <div className={styles.ratio}>
                                    {getRatioFieldTitle(ratioAFieldName)}
                                    <hr />
                                    {getRatioFieldTitle(ratioBFieldName)}
                                </div>
                                {getRecommendationApplicationConditionSign(
                                    comparisonCondition
                                )}
                                <span className={styles.comparableValue}>
                                    {comparableValue}
                                </span>
                            </div>
                        )
                    }
                )}
            </div>

            <Button onClick={onEditClick} text="Изменить" />
            <Button onClick={onDeleteClick} variant="outline" text="Удалить" />
        </article>
    )
}

export default RecommendationCard
