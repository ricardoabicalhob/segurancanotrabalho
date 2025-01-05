'use client'

import { objActionList, objConsequenceList, objList } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { createContext, ReactNode, useState } from "react";
import { InformacoesDoGrupoDeRisco, Risco, tabelaDeRiscos, TabelaDeRiscos, TabelaDeRiscosCompleta, TabelaDeRiscosCompletaProps, tabelaDeRiscosSimplificada } from "../tabela-de-riscos";

export const SystemContext = createContext({})

interface SystemContextProps {
    children :ReactNode
}

type validateCompletionOfConsequencesOrRecommendedActionsResponse = {
    status :boolean
    emptyItemsList :objList[]
} 

type validateCompletionOfConsequencesResponse = {
    status :boolean
    emptyItemsList :objConsequenceList[]
    corDoGrupoDeRisco :string
}

type validateCompletionOfRecommendedActionsResponse = {
    status :boolean
    emptyItemsList :objActionList[]
}

export function SystemProvider({ children } :SystemContextProps) {

    const [ uploadedFile, setUploadedFile ] = useState(null)
    const validateResponse :validateCompletionOfConsequencesOrRecommendedActionsResponse = {
        status: false,
        emptyItemsList: []
    }

    const validateConsequencesResponse :validateCompletionOfConsequencesResponse = {
        status: false,
        emptyItemsList: [],
        corDoGrupoDeRisco: ''
    }

    const validateRecommendedActionsResponse :validateCompletionOfRecommendedActionsResponse = {
        status: false,
        emptyItemsList: []
    }

    function validateCompletionOfConsequencesOrRecommendedActions(listOfConsequencesOrRecommendedActions :objList[]) {
        const emptyItemsList :objList[] = []
        listOfConsequencesOrRecommendedActions.forEach(itemList => {
            if(itemList.value.length === 0) {
                emptyItemsList.push(itemList)
            }
        })

        if(emptyItemsList.length !== 0) {
            validateResponse.status = false
            validateResponse.emptyItemsList = emptyItemsList
            
            return validateResponse
        }

        validateResponse.status = true
        validateResponse.emptyItemsList = emptyItemsList

        return validateResponse
    }

    function validateCompletionOfConsequences(listOfConsequences :objConsequenceList[]) {
        const emptyItemsList :objConsequenceList[] = []
        listOfConsequences.forEach(itemList => {
            if(itemList.value.length === 0) {
                emptyItemsList.push(itemList)
            }
            if(itemList.corDoGrupoDeRisco.length === 0) {
                emptyItemsList.push(itemList)
            }
        })

        if(emptyItemsList.length !== 0) {
            validateConsequencesResponse.status = false
            validateConsequencesResponse.emptyItemsList = emptyItemsList
            validateConsequencesResponse.corDoGrupoDeRisco = ''
            
            return validateConsequencesResponse
        }

        validateConsequencesResponse.status = true
        validateConsequencesResponse.emptyItemsList = emptyItemsList

        return validateConsequencesResponse
    }

    function validateCompletionOfRecommendedActions(listOfRecommendedActions :objActionList[]) {
        const emptyItemsList :objActionList[] = []
        listOfRecommendedActions.forEach(itemList => {
            if(itemList.value.length === 0) {
                emptyItemsList.push(itemList)
            }
        })

        if(emptyItemsList.length !== 0) {
            validateRecommendedActionsResponse.status = false
            validateRecommendedActionsResponse.emptyItemsList = emptyItemsList
            
            return validateRecommendedActionsResponse
        }

        validateRecommendedActionsResponse.status = true
        validateRecommendedActionsResponse.emptyItemsList = emptyItemsList

        return validateRecommendedActionsResponse
    }

    function buscarRiscoPorCor(cor: keyof TabelaDeRiscos): Risco | undefined {
        if(cor in tabelaDeRiscosSimplificada) {
            return tabelaDeRiscosSimplificada[cor]
        }
        return undefined
    }

    function buscarRiscoPorTipo(tipo: keyof TabelaDeRiscosCompletaProps): InformacoesDoGrupoDeRisco | undefined {
        if(tipo in TabelaDeRiscosCompleta) {
            return TabelaDeRiscosCompleta[tipo]
        }
        return undefined
    }

    return(
        <SystemContext.Provider 
            value={{
                uploadedFile, 
                setUploadedFile, 
                validateCompletionOfConsequencesOrRecommendedActions, 
                buscarRiscoPorCor,
                buscarRiscoPorTipo,
                validateCompletionOfConsequences,
                validateCompletionOfRecommendedActions
            }}
        >
            { children }
        </SystemContext.Provider>
    )
}