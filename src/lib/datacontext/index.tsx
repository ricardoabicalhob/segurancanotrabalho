import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { inspectionInformationsProps } from "../types"

interface DataProviderProps {
    children :ReactNode
}

interface DataContextProps {
    inspectionData :inspectionInformationsProps | undefined
    setInspectionData :Dispatch<SetStateAction<inspectionInformationsProps | undefined>>
}

export const DataContext = createContext({} as DataContextProps)

export function DataProvider({ children } :DataProviderProps) {
    
    const [inspectionData, setInspectionData ] = useState<inspectionInformationsProps>()

    useEffect(()=> {
        console.log(inspectionData)
    }, [inspectionData])
    
    return(
        <DataContext.Provider value={{
            inspectionData, setInspectionData
        }}>
            {children}
        </DataContext.Provider>
    )
}