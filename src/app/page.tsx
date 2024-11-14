'use client'

import CardRiskAnalysisAI, { RiskProps } from "./CardRiskAnalysisAI/_components/card-analysis";
import InspectionInformationForm from "./InspectionInformationForm/_components/inspection-information-form";
import CardListRisk from "./CardListRisk/_components/card-list-risk";
import { useState } from "react";
import { inspectionInformations } from "@/lib/pdf-generate";

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
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            <section>
                <InspectionInformationForm onAddInspectionInformations={handleAddInspectionInformations}/>
            </section>

            <section>
                <CardRiskAnalysisAI onAddRisk={handleSaveRisk}/>
            </section>

            <section>
                <CardListRisk listRisks={listRisks} inspectionInformations={inspectionInformations as inspectionInformations}/>
            </section>
        </main>
   )
}