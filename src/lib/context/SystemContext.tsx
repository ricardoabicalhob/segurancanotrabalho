'use client'

import { objList } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { createContext, ReactNode, useState } from "react";

export const SystemContext = createContext({})

interface SystemContextProps {
    children :ReactNode
}

type validateCompletionOfConsequencesOrRecommendedActionsResponse = {
    status :boolean
    emptyItemsList :objList[]
} 

export function SystemProvider({ children } :SystemContextProps) {

    const [ uploadedFile, setUploadedFile ] = useState(null)
    const validateResponse :validateCompletionOfConsequencesOrRecommendedActionsResponse = {}

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

    return(
        <SystemContext.Provider 
            value={{uploadedFile, setUploadedFile, validateCompletionOfConsequencesOrRecommendedActions}}
        >
            { children }
        </SystemContext.Provider>
    )
}