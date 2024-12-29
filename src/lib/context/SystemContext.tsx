'use client'

import { createContext, ReactNode, useState } from "react";

export const SystemContext = createContext({})

interface SystemContextProps {
    children :ReactNode
}

export function SystemProvider({ children } :SystemContextProps) {

    const [ uploadedFile, setUploadedFile ] = useState(null)

    return(
        <SystemContext.Provider 
            value={{uploadedFile, setUploadedFile}}
        >
            { children }
        </SystemContext.Provider>
    )
}