'use client'

import CardRiskAnalysisAI, { RiskProps } from "./CardRiskAnalysisAI/_components/card-analysis";
import InspectionInformationForm from "./InspectionInformationForm/_components/inspection-information-form";
import CardListRisk from "./CardListRisk/_components/card-list-risk";
import { useState } from "react";

type ListRisks = Array<RiskProps>

export default function Home() {

    const [ listRisks, setListRisks ] = useState<ListRisks>([])

    function handleSaveRisk(risk :RiskProps) {
        const newListRisks = [...listRisks]

        newListRisks.push(risk)
        setListRisks(newListRisks)
    }

    return(
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            <section>
                <InspectionInformationForm />
            </section>

            <section>
                <CardRiskAnalysisAI onAddRisk={handleSaveRisk}/>
            </section>

            <section>
                <CardListRisk listRisks={listRisks}/>
            </section>
        </main>
   )
}