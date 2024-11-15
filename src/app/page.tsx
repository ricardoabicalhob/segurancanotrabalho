'use client'

import CardRiskAnalysisAI, { RiskProps } from "./CardRiskAnalysisAI/_components/card-analysis";
import InspectionInformationForm from "./InspectionInformationForm/_components/inspection-information-form";
import CardListRisk from "./CardListRisk/_components/card-list-risk";
import { useState } from "react";
import { inspectionInformations } from "@/lib/pdf-generate";
import Image from "next/image";
import LoadingIndicatorAnimated from "@/components/LoadingIndicatorAnimated";

type ListRisks = Array<RiskProps>

export default function Home() {

    const [ listRisks, setListRisks ] = useState<ListRisks>([])
    const [ inspectionInformations, setInspectionInformations ] = useState<inspectionInformations>()

    function handleSaveRisk(risk :RiskProps) {
        const newListRisks = [...listRisks]

        newListRisks.push(risk)
        setListRisks(newListRisks)
    }

    function handleAddInspectionInformations(inspectionInformations :inspectionInformations) {
        setInspectionInformations(inspectionInformations)
    }

    return(
        <div className="">
            <nav className="p-3 sm:p-6 text-green-900 font-bold text-2xl grid grid-flow-col max-auto gap-2 bg-green-100">
                <Image className="self-center" alt="" src={require('../lib/imagens/logo-cipa-2.png')} width={100} height={100}/>
                <p className="self-center justify-self-start">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
            </nav>
            <main className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-6">
                <section>
                    <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 1</p>
                    <InspectionInformationForm onAddInspectionInformations={handleAddInspectionInformations}/>
                </section>

                <section>
                    <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 2</p>
                    <CardRiskAnalysisAI onAddRisk={handleSaveRisk}/>
                </section>

                <section>
                    <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 3</p>
                    <CardListRisk listRisks={listRisks} inspectionInformations={inspectionInformations as inspectionInformations}/>
                </section>
            </main>
        </div>
        
   )
}