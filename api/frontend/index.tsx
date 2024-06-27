import {
    AddAnalysisStatusPayload,
    CreateAnalysisPayload,
    CreateAnalysisResponse,
    CreatePatientPayload,
    CreatePatientResponse,
    EditAnalysisPayload,
    EditAnalysisStatusPayload,
    EditPatientPayload,
    EditPatientResponse,
    GetAnalysisChartPayload,
    GetAnalysisChartPdfPayload,
} from './types'
import {
    Recommendation,
    ExistingRecommendationApplicationCondition,
    RecommendationWithApplicationConditions,
} from '../../types'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const createPatient = async (
    payload: CreatePatientPayload
): Promise<CreatePatientResponse> => {
    const response = await fetch(`${API_URL}/patient`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export const editPatient = async (
    payload: EditPatientPayload
): Promise<EditPatientResponse> => {
    const response = await fetch(`${API_URL}/patient/${payload.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export const createAnalysis = async (
    payload: CreateAnalysisPayload
): Promise<CreateAnalysisResponse> => {
    const response = await fetch(`${API_URL}/analysis`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export const addAnalysisStatus = async (payload: AddAnalysisStatusPayload) => {
    const { analysisId, status } = payload

    // TODO: do not send unnecessary data

    const response = await fetch(
        `${API_URL}/analysis/${analysisId}/status/${status}`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }
    )

    return response.json()
}

export const editAnalysis = async (
    payload: EditAnalysisPayload
): Promise<CreateAnalysisResponse> => {
    const response = await fetch(`${API_URL}/analysis/${payload.analysisId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export const editAnalysisStatus = async (
    payload: EditAnalysisStatusPayload
) => {
    const { analysisId, status } = payload

    // TODO: do not send unnecessary data

    const response = await fetch(
        `${API_URL}/analysis/${analysisId}/status/${status}`,
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }
    )

    return response.json()
}

export const getAnalysisChart = async (payload: GetAnalysisChartPayload) => {
    const { analysisId, chartType } = payload

    const response = await fetch(
        `${API_URL}/analysis/${analysisId}/graph/${chartType}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )

    return response.blob()
}

export const getAnalysisChartPdf = async (
    payload: GetAnalysisChartPdfPayload
) => {
    const { analysisId } = payload

    const response = await fetch(
        `${API_URL}/analysis/${analysisId}/graph/print`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )

    return response.blob()
}

export const getRecommendations = async () => {
    const response = await fetch(`${API_URL}/v2/recommendation/list`, {
        method: 'GET',
        credentials: 'include',
    })

    return (await response.json()) as RecommendationWithApplicationConditions[]
}

export const createRecommendation = async (
    payload: RecommendationWithApplicationConditions
): Promise<RecommendationWithApplicationConditions> => {
    const response = await fetch(`${API_URL}/v2/recommendation`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    return response.json()
}

export const deleteRecommendation = async (id: number) => {
    await fetch(`${API_URL}/v2/recommendation/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const updateRecommendation = async (
    id: number,
    payload: Partial<Recommendation>
) => {
    await fetch(`${API_URL}/v2/recommendation/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const addRecommendationCondition = async (
    id: number,
    recommendationConditionPayload: ExistingRecommendationApplicationCondition
) => {
    await fetch(`${API_URL}/v2/recommendation/${id}/application-condition`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationConditionPayload),
    })
}

export const updateRecommendationCondition = async (
    recommendationId: number,
    conditionId: number,
    recommendationConditionPayload: Partial<ExistingRecommendationApplicationCondition>
) => {
    await fetch(
        `${API_URL}/v2/recommendation/${recommendationId}/application-condition/${conditionId}`,
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recommendationConditionPayload),
        }
    )
}

export const deleteRecommendationCondition = async (
    recommendationId: number,
    conditionId: number
) => {
    await fetch(
        `${API_URL}/v2/recommendation/${recommendationId}/application-condition/${conditionId}`,
        {
            method: 'DELETE',
            credentials: 'include',
        }
    )
}
