'use client'

import { ActionBar } from "@/components/ActionBar"
import AlertNotification from "@/components/AlertNotification"
import Report from "@/components/Report/index-layout-2"
import { DataContext } from "@/lib/datacontext"
import { ChartPie, CircleDashed, LogOut, Printer } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useRef, useState } from "react"

export default function IFrame() {

    const router = useRouter()
    const { inspectionData, listRisks, setHideChart, hideChart } = useContext(DataContext)
    const frameLeftRef = useRef<HTMLDivElement>(null)
    const relatorioRef = useRef<HTMLDivElement>(null)
    const frameRightRef = useRef<HTMLDivElement>(null)

    function handlePrint() {
        window.print()
    }

    return(
        <html lang="pt-BR">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Relatório de Inspeção de Segurança do Trabalho</title>
            </head>
            
            <body className="flex flex-col min-h-full pt-10">  
                <nav className="bg-customgray-1100 fixed top-0 w-full print:hidden shadow-custom-dark z-10">
                    <ActionBar.Bar className="bg-zinc-600 min-h-[30px]" alignItems="justify-end">
                        <ActionBar.Action icon={hideChart? CircleDashed : ChartPie} textButton={hideChart? 'Mostrar gráfico' : 'Ocultar gráfico'} textTooltip="Ocultar / Mostrar gráfico no final do relatório" invertIconColor onClick={()=> {setHideChart(!hideChart)}} />
                        <ActionBar.Action icon={Printer} textButton="Imprimir" invertIconColor onClick={()=> handlePrint()} />
                        <ActionBar.Action icon={LogOut} textButton="Fechar" invertIconColor onClick={()=> {router.back()}} />
                    </ActionBar.Bar>
                </nav>
                <main className="flex flex-row">
                    <div ref={frameLeftRef} className="print:hidden flex min-w-[20%] min-h-full bg-customgray-1000" />
                        
                        <div ref={relatorioRef} className="print:block flex flex-col items-center justify-start w-[960px]">
                            {
                                inspectionData
                                ?
                                    <Report 
                                        inspectionInformations={inspectionData}
                                        listRisks={listRisks}
                                    />
                                :
                                    <AlertNotification text="Falha na visualização." />
                            }
                        </div>
                    <div ref={frameRightRef} className="print:hidden min-w-[20%] min-h-full bg-customgray-1000" />
                </main>
            </body>
        </html>
    )
}