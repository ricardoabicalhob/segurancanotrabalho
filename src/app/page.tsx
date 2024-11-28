'use client'

import CardRiskAnalysisAI, { RiskProps } from "./CardRiskAnalysisAI/_components/card-analysis";
import InspectionInformationForm from "./InspectionInformationForm/_components/inspection-information-form";
import CardListRisk from "./CardListRisk/_components/card-list-risk";
import { useState } from "react";
import { inspectionInformations } from "@/lib/pdf-generate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Welcome from "@/components/Welcome";

type ListRisks = Array<RiskProps>

export default function Home() {

    const [ listRisks, setListRisks ] = useState<ListRisks>([])
    const [ inspectionInformations, setInspectionInformations ] = useState<inspectionInformations>()
    const [ readyReport, setReadyReport ] = useState(true)
    const [ isWelcome, setIsWelcome ] = useState(true)
    const router = useRouter()

    function handleReadyReport() {
        setReadyReport(!readyReport)
    }

    function handleSaveRisk(risk :RiskProps) {
        const newListRisks = [...listRisks]

        newListRisks.push(risk)
        setListRisks(newListRisks)
    }

    function handleRemoveRiskOfList(index :number) {
        if(listRisks) {
            const newListRisks = [...listRisks]
            newListRisks.splice(index, 1)
            setListRisks(newListRisks)
         }
    }

    function handleAddInspectionInformations(inspectionInformations :inspectionInformations) {
        setInspectionInformations(inspectionInformations)
    }

    function handleWelcome() {
        setIsWelcome(!isWelcome)
    }

    function handleViewReport() {
        if(listRisks){
            const dataContent = {
                analises: listRisks
            }
            const data = JSON.stringify(dataContent)
            router.push(`/generate-report/${data}`)
        }
    }


    return(
        <div className="flex flex-col w-screen min-h-screen h-[calc(100vh - 60px)]">
            
            <nav className={`bg-gray-100 text-green-900 font-bold text-2xl grid grid-flow-col p-6 gap-2 ${readyReport ? '' : 'max-w-[960px] w-full self-center p-6'}`}>
                <Image className="self-center" alt="" src={require('../lib/imagens/logo-cipa-2.png')} width={100} height={100}/>
                <p className="self-center justify-self-start w-full">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
            </nav>

            <main className={`grid grid-cols-1 sm:grid-cols-2 ${readyReport ? 'lg:grid-cols-3 px-6' : 'lg:grid-cols-1 max-w-[960px]'}  gap-4 pt-6`}>
                {
                    isWelcome && <Welcome onWelcome={handleWelcome} />
                }
                
                {
                    readyReport &&  <section className="">
                                        {/* <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 1</p> */}
                                        <InspectionInformationForm readyReport={readyReport} inspectionInformations={inspectionInformations} onAddInspectionInformations={handleAddInspectionInformations}/>
                                    </section>
                }

                {
                    readyReport &&  <section>
                                        {/* <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 2</p> */}
                                        <CardRiskAnalysisAI onAddRisk={handleSaveRisk}/>
                                    </section>
                }

                <section>
                    {
                        // readyReport && <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Final</p>
                    }
                    <CardListRisk onRemoveRiskOfList={handleRemoveRiskOfList} statusReadyReport={readyReport} onReadyReport={handleReadyReport} listRisks={listRisks} inspectionInformations={inspectionInformations as inspectionInformations}/>
                </section>

                {/* {
                    readyReport &&  <section>
                                        <p className="text-green-900 mx-auto max-w-md text-3xl font-bold font-sans mb-2">Passo 3</p>
                                        <CardFinish />
                                        
                                        <Button onClick={()=>handleViewReport()}>
                                            Visualizar relatório
                                        </Button>
                                    </section>
                } */}
            </main>
            
            {
                readyReport &&  <footer className={`bg-gray-100 p-6 mt-6 h-full ${readyReport ? 'w-screen' : 'max-w-[960px]'}`}>
                                    <p className={`mx-auto max-w-md md:max-w-full my-auto text-center text-base md:text-sm`}>Esta ferramenta deve ser utilizada somente para auxílio na elaboração do relatório de inspeção de segurança do trabalho e não exclui a necessidade de avaliação de um profissional. As análises geradas por IA podem ser imprecisas.</p>
                                </footer>
            }
        </div>
   )
}