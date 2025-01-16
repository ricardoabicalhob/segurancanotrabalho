export type inspectionInformationsProps = {
    empresa :string
    areaLotacao :string
    localInspecionado :string
    areaEmitente :string
    cidade :string
    cipa :string
    data : Date
    hora :string
    responsavelPelaInspecao :string
    funcaoResponsavelPelaInspecao :string
    matriculaResponsavelPelaInspecao :string
}

export type inspectionInformationsTeste = {
    empresa :string
    areaLotacao :string
    localInspecionado :string
    areaEmitente :string
    cidade :string
    cipa :string
    data : string
    hora :string
    responsavelPelaInspecao :string
    funcaoResponsavelPelaInspecao :string
    matriculaResponsavelPelaInspecao :string
}

export type objList = {
    id :string,
    value :string,
    corDoGrupoDeRisco :string
}

export type objConsequenceList = {
    id :string,
    value :string,
    corDoGrupoDeRisco :string
}

export type objActionList = {
    id :string,
    value :string,
}

export type RiskProps = {
    risco :string
    consequencias : objConsequenceList[]
    acoes : objActionList[]
    images : string[]
}

export type ListRisks = Array<RiskProps>

export type FileRIS = {
    checkFilling: boolean,
    inspectionInformations: inspectionInformationsProps,
    listRisks: ListRisks
}

export type FileRISTeste = {
    checkFilling :boolean
    inspectionData :inspectionInformationsTeste
    listRisks :ListRisks
}

export type CorRisco = 'verde' | 'vermelho' | 'laranja' | 'amarelo' | 'azul'

export type TipoRisco = 'Físico' | 'Químico' | 'Biológico' | 'Ergonômico' | 'Acidente'

export type validateCompletionOfConsequencesResponse = {
    status :boolean
    emptyItemsList :objConsequenceList[]
    corDoGrupoDeRisco :string
}

export type validateCompletionOfRecommendedActionsResponse = {
    status :boolean
    emptyItemsList :objActionList[]
}