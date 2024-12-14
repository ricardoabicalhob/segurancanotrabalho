'use client'

import CardRiskAnalysisAI, { RiskProps } from "./CardRiskAnalysisAI/_components/card-analysis";
import InspectionInformationForm from "./InspectionInformationForm/_components/inspection-information-form";
import CardListRisk from "./CardListRisk/_components/card-list-risk";
import { useState } from "react";
import { inspectionInformations } from "@/lib/pdf-generate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Welcome from "@/components/Welcome";
import { ExternalLink, Link } from "lucide-react";

export type ListRisks = Array<RiskProps>

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
            updatedListRisks[indexRisk].consequencias.push('')
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Máximo de 5 consequências para cada situação de risco.')
        }
    }

    function handleChangeConsequencia(indexRisk :number, indexConsequencia :number, newValue :string) {
        if(listRisks[indexRisk] && listRisks[indexRisk].consequencias.length >= 1) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].consequencias.splice(indexConsequencia, 1, newValue)
            setListRisks(updatedListRisks)
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
            updatedListRisks[indexRisk].acoes.push('')
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Máximo de 5 ações recomendadas para cada situação de risco.')
        }
    }

    function handleChangeAcaoRecomendada(indexRisk :number, indexAcaoRecomendada :number, newValue :string) {
        if(listRisks[indexRisk] && listRisks[indexRisk].acoes.length >= 1) {
            const updatedListRisks = [...listRisks]
            updatedListRisks[indexRisk].acoes.splice(indexAcaoRecomendada, 1, newValue)
            setListRisks(updatedListRisks)
        } else {
            console.log('Ação não permitida. Precisa haver pelo menos uma consequência para cada situação de risco.')
        }
    }

    function handleEditRiskOfList(index :number) {
        if(listRisks) {

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
        <div className="flex flex-col w-screen h-[100vh] justify-between">
            
            <nav className={`bg-gray-100 text-green-900 font-bold text-2xl grid grid-flow-col p-6 gap-2 ${readyReport ? '' : 'max-w-[960px] w-full self-center p-6'}`}>
                <Image className="self-center" alt="" src={require('../lib/imagens/logo-cipa-2.png')} width={100} height={100}/>
                <p className="self-center justify-self-start w-full">{`${readyReport ? 'EDITOR PARA' : ''} RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO`}</p>
            </nav>

            <main className={`grid grid-cols-1 sm:grid-cols-2 h-auto ${readyReport ? 'lg:grid-cols-3 px-6' : 'lg:grid-cols-1 max-w-[960px]'}  gap-4 pt-6`}>
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
                    <CardListRisk 
                        onLoadListRisks={setListRisks}
                        onLoadInspectionInformations={setInspectionInformations}
                        onChangeRisco={handleChangeRisco}
                        onDeleteImage={handleDeleteImageOfListRiscks} 
                        onAddImage={handleAddImageOnListRisks}
                        onDeleteConsequencia={handleDeleteConsequencia}
                        onAddConsequencia={handleAddConsequencia}
                        onChangeConsequencia={handleChangeConsequencia}
                        onDeleteAcaoRecomendada={handleDeleteAcaoRecomendada}
                        onAddAcaoRecomendada={handleAddAcaoRecomendada}
                        onChangeAcaoRecomendada={handleChangeAcaoRecomendada}
                        onRemoveRiskOfList={handleRemoveRiskOfList} 
                        statusReadyReport={readyReport} 
                        onReadyReport={handleReadyReport} 
                        listRisks={listRisks} 
                        inspectionInformations={inspectionInformations as inspectionInformations}/>
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