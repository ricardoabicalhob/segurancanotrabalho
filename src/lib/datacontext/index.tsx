'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { inspectionInformationsTeste, ListRisks, objActionList, objConsequenceList, RiskProps } from "../types"
import { InformacoesDoGrupoDeRisco, Risco, TabelaDeRiscos, TabelaDeRiscosCompleta, TabelaDeRiscosCompletaProps, tabelaDeRiscosSimplificada } from "../tabela-de-riscos"
import { uuid } from "uuidv4"

interface DataProviderProps {
    children :ReactNode
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

interface DataContextProps {
    risk :RiskProps | undefined
    setRisk :Dispatch<SetStateAction<RiskProps | undefined>>
    formEditable :boolean
    setFormEditable :Dispatch<SetStateAction<boolean>>
    uploadedFile :object | undefined
    setUploadedFile :Dispatch<SetStateAction<undefined>>
    buscarRiscoPorCor :(cor: keyof TabelaDeRiscos)=> Risco | undefined
    buscarRiscoPorTipo :(tipo: keyof TabelaDeRiscosCompletaProps)=> InformacoesDoGrupoDeRisco | undefined
    validateCompletionOfConsequences :(listOfConsequences :objConsequenceList[])=> validateCompletionOfConsequencesResponse
    validateCompletionOfRecommendedActions :(listOfRecommendedActions :objActionList[]) => validateCompletionOfRecommendedActionsResponse
    listRisks :ListRisks
    setListRisks :Dispatch<SetStateAction<ListRisks>>
    inspectionData :inspectionInformationsTeste | undefined
    setInspectionData :Dispatch<SetStateAction<inspectionInformationsTeste | undefined>>
    handleSaveRisk :(risk :RiskProps)=> void
    handleChangeRisco :(indexRisk :number, newValue :string)=> void
    handleRemoveRiskOfList :(index :number)=> void
    handleDeleteImageOfListRiscks :(indexRisk :number, indexImage :number)=> void
    handleAddImageOnListRisks :(indexRisk :number, image :unknown)=> void
    handleDeleteConsequencia :(indexRisk :number, indexConsequencia :number)=> void
    handleAddConsequencia :(indexRisk :number)    => void
    handleChangeConsequencia :(indexRisk :number, indexConsequencia :number, newValue :string)=> void
    handleDeleteAcaoRecomendada:(indexRisk :number, indexAcaoRecomendada :number)=> void
    handleAddAcaoRecomendada :(indexRisk :number)=> void
    handleChangeAcaoRecomendada :(indexRisk :number, indexAcaoRecomendada :number, newValue :string)=> void
    handleSummarizeByRiskGroup :()=> void
    dataChart :{ tipo: string; quantidade: number}[]
    setDataChart :Dispatch<SetStateAction<{ tipo: string; quantidade: number}[]>>
    formUnlocked :boolean
    setFormUnlocked :Dispatch<SetStateAction<boolean>>
    hideChart :boolean
    setHideChart :Dispatch<SetStateAction<boolean>>
}

export const DataContext = createContext({} as DataContextProps)

export function DataProvider({ children } :DataProviderProps) {
    
    const [ risk, setRisk ] = useState<RiskProps>()
    const [ formEditable, setFormEditable ] = useState(false)
    const [ uploadedFile, setUploadedFile ] = useState()
    const [ listRisks, setListRisks ] = useState<ListRisks>([])
    const [ inspectionData, setInspectionData ] = useState<inspectionInformationsTeste>()
    const [ dataChart, setDataChart ] = useState<{ tipo: string; quantidade: number}[]>([])
    const [ formUnlocked, setFormUnlocked ] = useState(true)
    const [ hideChart, setHideChart ] = useState(false)

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

    const validateConsequencesResponse :validateCompletionOfConsequencesResponse = {
        status: false,
        emptyItemsList: [],
        corDoGrupoDeRisco: ''
    }
    
    const validateRecommendedActionsResponse :validateCompletionOfRecommendedActionsResponse = {
        status: false,
        emptyItemsList: []
    }
    
    function validateCompletionOfConsequences(listOfConsequences :objConsequenceList[]) {
        const emptyItemsList :objConsequenceList[] = []
        listOfConsequences.forEach(itemList => {
            if(itemList.value.length === 0 || itemList.corDoGrupoDeRisco.length === 0) {
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

    function handleSaveRisk(risk :RiskProps) {
        const newListRisks = [...listRisks]
        newListRisks.push({
            ...risk,
            risco: risk.risco.toUpperCase()
        })
        setListRisks(newListRisks)
    }

    function handleChangeRisco(indexRisk :number, newValue :string) {
        if(listRisks[indexRisk]) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].risco = newValue
            setListRisks(updatedListRisks)
        }
    }

    function handleRemoveRiskOfList(index :number) {
        if(listRisks) {
            const newListRisks = [...listRisks]
            newListRisks.splice(index, 1)
            setListRisks(newListRisks)
         }
    }

    function handleDeleteImageOfListRiscks(indexRisk :number, indexImage :number) {
        if(listRisks[indexRisk] && listRisks[indexRisk].images) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].images.splice(indexImage, 1)
            setListRisks(updatedListRisks)
        }
    }

    function handleAddImageOnListRisks(indexRisk :number, image :unknown) {
        if(listRisks[indexRisk]) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].images.push(image as string)
            setListRisks(updatedListRisks)
        }
    }

    function handleDeleteConsequencia(indexRisk :number, indexConsequencia :number) {
        if(listRisks[indexRisk] && listRisks[indexRisk].consequencias.length > 1) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].consequencias.splice(indexConsequencia, 1)
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Precisa haver pelo menos uma consequência para cada situação de risco.')
        }
    }

    function handleAddConsequencia(indexRisk :number) {
        if(listRisks[indexRisk] && listRisks[indexRisk].consequencias.length < 5) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].consequencias.push({id: uuid(), value: '', corDoGrupoDeRisco: ''})
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Máximo de 5 consequências para cada situação de risco.')
        }
    }
    
    function handleChangeConsequencia(indexRisk :number, indexConsequencia :number, newValue :string) {
        if(listRisks[indexRisk]) {
            const newListRisks = [...listRisks]
            let updatedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)

            newListRisks[indexRisk].consequencias[indexConsequencia].value = updatedValue

            setListRisks(newListRisks)
        }
    }

    function handleDeleteAcaoRecomendada(indexRisk :number, indexAcaoRecomendada :number) {
        if(listRisks[indexRisk] && listRisks[indexRisk].acoes.length > 1) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].acoes.splice(indexAcaoRecomendada, 1)
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Precisa haver pelo menos uma ação recomendada para cada situação de risco.')
        }
    }

    function handleAddAcaoRecomendada(indexRisk :number) {
        if(listRisks[indexRisk] && listRisks[indexRisk].acoes.length < 5) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].acoes.push({id: uuid(), value: ''})
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Máximo de 5 ações recomendadas para cada situação de risco.')
        }
    }

    function handleChangeAcaoRecomendada(indexRisk :number, indexAcaoRecomendada :number, newValue :string) {
        if(listRisks[indexRisk]) {
            const newListRisks = [...listRisks]
            let updatedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)

            newListRisks[indexRisk].acoes[indexAcaoRecomendada].value = updatedValue
            setListRisks(newListRisks)
        }
    }

    function handleSummarizeByRiskGroup() {
        const data = [
            {tipo: 'Físico', quantidade: 0},
            {tipo: 'Químico', quantidade: 0},
            {tipo: 'Biológico', quantidade: 0},
            {tipo: 'Ergonômico', quantidade: 0},
            {tipo: 'Acidente', quantidade: 0},
        ]
        
        if(listRisks) {
            let riscosFisicos = 0
            let riscosQuimicos = 0
            let riscosBiologicos = 0
            let riscosErgonomicos = 0
            let riscosAcidentes = 0
            let totalRiscos = 0

            listRisks.map((risk, indexRisk)=> {
                risk.consequencias.map((consequencia, indexConsequencia)=> {
                    switch(consequencia.corDoGrupoDeRisco){
                        case 'verde': 
                            riscosFisicos += 1;
                            break;
                        case 'vermelho': 
                            riscosQuimicos += 1;
                            break;
                        case 'laranja': 
                            riscosBiologicos += 1;
                            break;
                        case 'amarelo': 
                            riscosErgonomicos += 1;
                            break;
                        case 'azul': 
                            riscosAcidentes += 1;
                            break;
                        default: 
                            console.error('Cor de grupo de risco inválida:', consequencia.corDoGrupoDeRisco);
                            break;
                    }

                    totalRiscos += 1
                })
            })

            data[0].quantidade = riscosFisicos
            data[1].quantidade = riscosQuimicos
            data[2].quantidade = riscosBiologicos
            data[3].quantidade = riscosErgonomicos
            data[4].quantidade = riscosAcidentes
        }

        setDataChart(data)
    }
    
    return(
        <DataContext.Provider value={{
            risk, setRisk,
            formEditable, setFormEditable,
            uploadedFile, setUploadedFile,
            buscarRiscoPorCor, buscarRiscoPorTipo,
            validateCompletionOfConsequences, validateCompletionOfRecommendedActions,
            listRisks, setListRisks,
            inspectionData, setInspectionData,
            handleSaveRisk, handleChangeRisco, handleRemoveRiskOfList,
            handleDeleteImageOfListRiscks, handleAddImageOnListRisks,
            handleDeleteConsequencia, handleAddConsequencia, handleChangeConsequencia,
            handleDeleteAcaoRecomendada, handleAddAcaoRecomendada, handleChangeAcaoRecomendada,
            handleSummarizeByRiskGroup,
            dataChart, setDataChart,
            formUnlocked, setFormUnlocked,
            hideChart, setHideChart
        }}>
            {children}
        </DataContext.Provider>
    )
}