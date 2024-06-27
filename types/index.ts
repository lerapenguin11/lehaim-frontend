export interface Patient {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    diagnosis: string
    birthDateStr: string
    docSeries: string
    docNumber: string
}

export interface Analysis {
    id: number
    executionDateStr: string
    immuneStatus?: ImmuneStatus
    hematologicalStatus?: HematologicalStatus
    cytokineStatus?: CytokineStatus
}

export type AnalysisWithRecommendations = Analysis & {
    recommendations: Recommendation[]
}

export type CytokineStatus = {
    cd3_p_ifny_stimulated: number
    cd3_p_ifny_spontaneous: number
    cd3_p_tnfa_stimulated: number
    cd3_p_tnfa_spontaneous: number
    cd3_p_il2_stimulated: number
    cd3_p_il2_spontaneous: number
    cd3_p_il4_stimulated: number
    cd3_p_il4_spontaneous: number
    cd3_m_ifny_stimulated: number
    cd3_m_ifny_spontaneous: number
}

export type HematologicalStatus = {
    wbc: number
    lymf: number
    mon: number
    neu: number
    eos: number
    bas: number
    hgb: number
    hct: number
    plt: number
    rbc: number
    mcv: number
    mch: number
    mchc: number
    rdwcv: number
    mpv: number
    pct: number
    pdv: number
}

export type ImmuneStatus = {
    common_t_lymphocytes: number
    common_b_lymphocytes: number
    t_helpers: number
    cd3_p_cd4_p_cd3_p_cd8_p_ratio: number
    t_cytotoxic_lymphocytes: number
    common_nk_cells: number
    cytolytic_nk_cells: number
    cytokine_producing_nk_cells: number
    tnk_cells: number
    activated_t_cells: number
    activated_t_cells_expressing_il2: number
    lgg: number
    lga: number
    lgm: number
    circulating_immune_complexes: number
    hct_test_stimulated: number
    hct_test_spontaneous: number
    leukocytes_bactericidal_activity: number
    neutrophil_absorption_activity: number
    monocytes_absorption_activity: number
}

type StatusTemplateItem<T> = {
    fieldName: T
    fieldMaxValue: number
    fieldMinValue: number
    fieldUnit: string
    fieldTitle: string
}

export type StatusTemplate<T> = Array<StatusTemplateItem<keyof T>>

export type Status = 'immune' | 'hematological' | 'cytokine'

export type AnyStatusField =
    | keyof CytokineStatus
    | keyof HematologicalStatus
    | keyof ImmuneStatus

export enum RecommendationComparisonCondition {
    Less = 'less',
    Equal = 'equal',
    Greater = 'greater',
}

export interface RecommendationApplicationCondition {
    comparisonCondition: RecommendationComparisonCondition
    comparableValue: number
    ratioAFieldName: AnyStatusField
    ratioBFieldName: AnyStatusField
}

export type ExistingRecommendationApplicationCondition =
    RecommendationApplicationCondition & {
        id: number
        recommendationId: number
    }

export interface Recommendation {
    id: number
    analysisId?: number
    diagnosisCodeId?: number
    title: string
    description?: string
}

export type RecommendationWithApplicationConditions = Recommendation & {
    conditions: RecommendationApplicationCondition[]
}
