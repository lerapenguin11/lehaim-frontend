import {
    CytokineStatus,
    HematologicalStatus,
    ImmuneStatus,
    Status,
} from '../../types'

export type CreatePatientPayload = {
    firstName: string
    lastName: string
    middleName: string
    docSeries: string
    docNumber: string
    birthDateStr: string
    diagnosis: string
}

export type CreatePatientResponse = {
    id: number
    firstName: string
    lastName: string
    middleName: string
    docSeries: string
    docNumber: string
    birthDateStr: string
    diagnosis: string
}

export type EditPatientPayload = Partial<{
    id: string
    firstName: string
    lastName: string
    middleName: string
    docSeries: string
    docNumber: string
    birthDateStr: string
    diagnosis: string
}>

export type EditPatientResponse = {
    id: number
    firstName: string
    lastName: string
    middleName: string
    docSeries: string
    docNumber: string
    birthDateStr: string
    diagnosis: string
}

export type CreateAnalysisPayload = {
    patientId: number
    executionDateStr: string
}

export type CreateAnalysisResponse = {
    id: number
}

export type AddAnalysisStatusPayload = Record<keyof ImmuneStatus, string> &
    Record<keyof CytokineStatus, string> &
    Record<keyof HematologicalStatus, string> & {
        analysisId: string
        status: Status
    }

export type EditAnalysisPayload = {
    analysisId: number
    executionDateStr: string
}

export type EditAnalysisStatusPayload = Partial<
    Record<keyof ImmuneStatus, string>
> &
    Partial<Record<keyof CytokineStatus, string>> &
    Partial<Record<keyof HematologicalStatus, string>> & {
        analysisId: string
        status: Status
    }

export type GetAnalysisChartPayload = {
    analysisId: string
    chartType: 't-cell' | 'b-cell' | 'c-pair'
}

export type GetAnalysisChartPdfPayload = {
    analysisId: string
}
