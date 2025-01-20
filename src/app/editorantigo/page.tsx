'use client'

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ExternalLink, Link } from "lucide-react";
import { inspectionInformationsProps } from "@/lib/types";
import { SystemContext } from "@/lib/context/SystemContext";
import CardListRisk from "../CardListRisk/_components/card-list-risk";
import DialogAnalysisRisk from "../DialogAnalysisRisk";
import InspectionInformationForm from "../InspectionInformationForm/_components/inspection-information-form";

export default function Home() {

    const [ readyReport, setReadyReport ] = useState(true)
    const [ formUnlocked, setFormUnlocked ] = useState(false)
    const [ hideSectionInspectionInformations, setHideSectionInspectionInformations ] = useState(true)

    const { 
        listRisks,
        inspectionInformations, setInspectionInformations,
        handleSaveRisk } = useContext(SystemContext)

    const router = useRouter()

    function handleCheckFilling() {
        if(listRisks.length && formUnlocked) {
            return true
        }
        return false
    }

    function handleSetFormUnlocked(value? :boolean) {
        if(value) {
            setFormUnlocked(value)
        }else {
            setFormUnlocked(!formUnlocked)
        }
    }

    function handleReadyReport() {
        setReadyReport(!readyReport)
    }

    function handleAddInspectionInformations(inspectionInformations :inspectionInformationsProps) {
        setInspectionInformations(inspectionInformations)
    }

    function handleChangeHideSectionInspectionInformations() {
        setHideSectionInspectionInformations(!hideSectionInspectionInformations)
    }

    useEffect(()=> {
        handleCheckFilling()
    }, [listRisks.length, formUnlocked])

    return(
        <div className="flex flex-col w-screen h-[100vh] justify-between">
            
            <nav className={`bg-gray-100 text-green-900 font-bold text-2xl grid grid-flow-col p-6 gap-2 ${readyReport ? '' : 'max-w-[960px] w-full self-center p-6'}`}>
                <Image className="self-center" alt="" src={require('../../lib/imagens/logo-cipa-2.png')} width={100} height={100}/>
                <p className="self-center justify-self-start w-full">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
            </nav>

            <main className={`grid grid-cols-1 sm:grid-cols-2 h-auto ${readyReport ? 'lg:grid-cols-3 px-6' : 'lg:grid-cols-1 max-w-[960px]'}  gap-4 pt-6`}>
                
                {
                    readyReport &&  <section className={`w-full`}>
                                        <InspectionInformationForm setFormUnlocked={handleSetFormUnlocked} readyReport={readyReport} inspectionInformations={inspectionInformations} onAddInspectionInformations={handleAddInspectionInformations}/>
                                    </section>
                }

                {
                    readyReport &&  <section>
                                        <DialogAnalysisRisk onAddRisk={handleSaveRisk}/>
                                    </section>
                }

                <section className="sm:col-span-2 lg:col-span-1">
                    <CardListRisk 
                        onLoadInspectionInformations={setInspectionInformations}
                        statusReadyReport={readyReport} 
                        onReadyReport={handleReadyReport} 
                        inspectionInformations={inspectionInformations as inspectionInformationsProps}
                        checkFilling={handleCheckFilling}
                        setFormUnlocked={handleSetFormUnlocked}
                        formUnlocked={formUnlocked}
                    />
                </section>

            </main>
            
            {
                readyReport &&  <footer className={`flex flex-col h-auto bg-gray-100 p-6 mt-6 gap-2 ${readyReport ? 'w-screen' : 'max-w-[960px]'}`}>
                                    <p className={`mx-auto max-w-md md:max-w-full my-auto text-center text-base md:text-sm`}>Esta ferramenta deve ser utilizada somente para auxílio na elaboração do relatório de inspeção de segurança do trabalho e não exclui a necessidade de avaliação de um profissional. As análises geradas por IA podem ser imprecisas.</p>
                                    <a 
                                        href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes"
                                        className={`flex gap-2 mx-auto max-w-md md:max-w-full my-auto text-center text-base md:text-md font-bold text-green-600 hover:text-green-400`}
                                        target="blank"
                                    >
                                        <ExternalLink /> Ministério do Trabalho e Emprego - Normas Regulamentadoras Vigentes
                                    </a>
                                </footer>
            }
        </div>
   )
}