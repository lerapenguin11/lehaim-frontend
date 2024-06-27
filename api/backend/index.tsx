import {
    RecommendationWithApplicationConditions,
    Status,
    StatusTemplate,
} from '../../types'

const API_URL = 'http://backend'

export async function getStatusTemplate<T>(
    status: Status
): Promise<StatusTemplate<T>> {
    const requestUrl = `${API_URL}/analysis/status/template/${status}`

    const response = await fetch(requestUrl)

    return response.json()
}

export async function getAnalysis(id: string) {
    const requestUrl = `${API_URL}/analysis/${id}`

    const response = await fetch(requestUrl)

    return response.json()
}

export async function getRecommendation(
    id: number
): Promise<RecommendationWithApplicationConditions | null> {
    try {
        const requestUrl = `${API_URL}/v2/recommendation/${id}`

        const response = await fetch(requestUrl)

        // TODO: add error handling

        return await response.json()
    } catch {
        return null
    }
}

export async function getAvailableRatioFieldNames() {
    const requestUrl = `${API_URL}/v2/recommendation/available-field-names`

    const response = await fetch(requestUrl)

    return await response.json()
}
