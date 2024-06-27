import { RecommendationComparisonCondition } from '../types'

export const getRecommendationApplicationConditionSign = (
    condition: RecommendationComparisonCondition
) => {
    if (condition === RecommendationComparisonCondition.Less) {
        return '<'
    } else if (condition === RecommendationComparisonCondition.Equal) {
        return '='
    } else {
        return '>'
    }
}
