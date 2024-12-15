'use client'

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Edit, FileDown, FileUp, ListX, LoaderCircle, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { inspectionInformations } from "@/lib/pdf-generate";
import { useEffect, useState } from "react";
import PopoverWindow from "@/components/PopoverWindow";
import Report from "@/components/Report";
import DownloadFile from "@/lib/downloadFile";
import { Input } from "@/components/ui/input";
import { ListRisks } from "@/app/page";
import LoadingIndicator from "@/components/LoadingIndicator";
import LoadingIndicatorAnimated from "@/components/LoadingIndicatorAnimated";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export interface CardListRiskProps {
    listRisks :Array<RiskProps>
    onLoadListRisks :(listRisks :ListRisks) => void
    inspectionInformations :inspectionInformations
    onLoadInspectionInformations :(inspectionInformations :inspectionInformations) => void
    statusReadyReport :boolean
    onReadyReport :() => void
    onRemoveRiskOfList :(index :number)=> void
    onChangeRisco :(indexRisk :number, newValue :string)=> void
    onDeleteImage :(indexRisk :number, indexImage :number)=> void
    onAddImage :(indexRisk :number, image :unknown)=> void
    onDeleteConsequencia :(indexRisk :number, indexConsequencia :number)=> void
    onAddConsequencia :(indexRisk :number)=> void
    onDeleteAcaoRecomendada :(indexRisk :number, indexAcaoRecomendada :number)=> void
    onAddAcaoRecomendada :(indexRisk :number)=> void
    onChangeConsequencia :(indexRisk :number, indexConsequencia :number, newValue :string)=> void
    onChangeAcaoRecomendada :(indexRisk :number, indexAcaoRecomendada :number, newValue :string)=> void
}

export default function CardListRisk({ onLoadListRisks, onLoadInspectionInformations, onDeleteImage, onAddImage, onChangeRisco, onDeleteConsequencia, onAddConsequencia, onChangeConsequencia, onDeleteAcaoRecomendada, onAddAcaoRecomendada, onChangeAcaoRecomendada, onRemoveRiskOfList, listRisks , inspectionInformations, statusReadyReport, onReadyReport} :CardListRiskProps){

    const [isEditableRisk, setIsEditableRisk] = useState(false)
    const [isLoadingFile, setIsLoadingFile] = useState(false)

    function handleSelectFile() {
        const fileSelected = document.getElementById('inputFileLoaded')

        const listener = function(event){
            const file = event.target?.files[0]

            let reader = new FileReader()
            reader.readAsText(file, 'utf8')

            setIsLoadingFile(true)

            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result)
                    onLoadInspectionInformations(data?.inspectionInformations)
                    onLoadListRisks(data?.listRisks)
                }catch(error) {
                    console.error('Erro ao ler o arquivo: ', error)
                }finally{
                    setIsLoadingFile(false)
                }
            }

            reader.onerror = () => {
                console.error('Erro ao ler o arquivo.')
                setIsLoadingFile(false)
            }

            // setTimeout(() => {
            //     const data = JSON.parse(reader.result)
            //     onLoadInspectionInformations(data?.inspectionInformations)
            //     onLoadListRisks(data?.listRisks)

            //     setIsLoadingFile(false)
            // }, 5000);
        }

        if(fileSelected) {
            fileSelected.addEventListener('change', listener, {once: true})
        }
    }

    return(
        statusReadyReport
        ?
        (
            // <div className="flex flex-col h-screen px-6 py-6 rounded-xl border-[1px] shadow-md">
            //     <p className="text-lg font-bold">Situações de risco identificadas</p>
            //     <ScrollArea className="py-6">
            //         {
            //             listRisks
            //             ?
            //             listRisks.map((risk, index)=>(
            //                 <div className="bg-gray-100 p-2 my-2">
            //                     <p>{`${index + 1}. ${risk.risco}`}</p>
            //                     {/* <p>{risk.consequencias}</p>
            //                     <p>{risk.acoes}</p> */}
            //                 </div>
            //             ))
            //             :
            //             null
            //         }
            //     </ScrollArea>
                
            //     <div className="flex flex-col gap-3">
            //         <Button disabled={inspectionInformations === undefined ? true : false} className="bg-green-600 hover:bg-green-400 w-full text-base md:text-sm select-none" onClick={()=> {onReadyReport()}} >Visualizar relatório</Button>
            //         {!inspectionInformations && <p className="select-none text-[14px] text-red-600">{`Preencha os dados da inspeção ${listRisks.length ? '' : ' e'}`}</p>}
            //         {!listRisks.length && <p className="select-none text-[14px] text-red-600">{`${!inspectionInformations ? 'a' : 'A'}dicione pelo menos uma situação de risco.`}</p>}
                    
            //         <Separator className="w-full h-[0.5px] my-1"/>

            //         <Button
            //             onClick={()=> DownloadFile(inspectionInformations, listRisks)}
            //             disabled={inspectionInformations === undefined ? true : false} 
            //             className="bg-lime-500 hover:bg-lime-300 w-full text-base md:text-sm select-none"     
            //         >
            //             <FileDown />
            //             Salvar relatório
            //         </Button>

            //         <div className="flex items-center justify-center bg-inherit border-[1px] border-green-600 hover:bg-green-100 rounded-md w-full py-2 cursor-pointer">
            //             {
            //                 isLoadingFile
            //                 ?
            //                 <LoadingIndicatorAnimated styles="w-4 h-4 border-[3px] mr-2" />
            //                 :
            //                 <FileUp className="text-green-600 mr-2 h-4 w-4" />
            //             }
            //             <p className="text-sm text-green-600 select-none">{`${isLoadingFile ? 'Carregando relatório...' : 'Carregar relatório existente'}`}</p>
            //             <Input 
            //                 className="absolute w-[25%] cursor-pointer" 
            //                 style={{opacity: 0, cursor: 'pointer'}}
            //                 type="file" 
            //                 accept=".ris"
            //                 id="inputFileLoaded"
            //                 onClick={()=> handleSelectFile()}
            //             />
            //         </div>
            //     </div>

            // </div>

            <Card className={`${statusReadyReport ? 'mx-auto max-w-md': 'min-w-[480px] p-3'}`}>
                <CardHeader>
                    <CardTitle className="text-lg">Situações de Risco Identificadas</CardTitle>
                </CardHeader>
                <Accordion type="single" collapsible className="w-full px-6 py-4">
                    {
                        listRisks
                        ?
                        listRisks.map((item, index)=>(
                            <AccordionItem key={index} value={index.toString()} className={`my-3`}>
                                <div className={`flex flex-row gap-3 justify-between items-center hover:bg-gray-100 border-[1px] p-2 rounded-md`}>
                                    <AccordionTrigger className="font-medium text-left max-w-[90%] text-base md:text-sm">{`${index + 1}. ${item.risco}`}</AccordionTrigger>
                                    <div className="flex flex-row w-auto items-center gap-3">
                                        <Button 
                                            popoverTarget={`${index}. ${item.risco}`}
                                            className="max-w-[45px] h-fit px-6 bg-inherit hover:bg-lime-400 text-black text-xs" 
                                            onClick={()=>{
                                                setIsEditableRisk(true)
                                            }}
                                            popoverTargetAction={'show'}
                                        >
                                            <Edit />
                                        </Button>
                                        {
                                            isEditableRisk &&   <Button
                                                                    className=" absolute max-w-[45px] h-fit px-6 bg-inherit hover:bg-inherit text-black text-xs" 
                                                                >
                                                                    <Edit className="text-zinc-300 font-normal"/>
                                                                </Button>
                                        }
                                        <Button 
                                            disabled={isEditableRisk}
                                            onClick={()=>onRemoveRiskOfList(index)} 
                                            className="max-w-[45px] h-fit px-6 bg-inherit hover:bg-red-400 text-black text-xs"
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                    
                                </div>
                                            
                                <PopoverWindow 
                                    indexRisk={index}
                                    itemRisk={item}
                                    onAddAcaoRecomendada={onAddAcaoRecomendada}
                                    onAddConsequencia={onAddConsequencia}
                                    onAddImage={onAddImage}
                                    onChangeAcaoRecomendada={onChangeAcaoRecomendada}
                                    onChangeConsequencia={onChangeConsequencia}
                                    onChangeRisco={onChangeRisco}
                                    onDeleteAcaoRecomendada={onDeleteAcaoRecomendada}
                                    onDeleteConsequencia={onDeleteConsequencia}
                                    onDeleteImage={onDeleteImage}
                                    isEditableRisk={isEditableRisk}
                                    setIsEditableRisk={setIsEditableRisk}
                                />

                                <AccordionContent>
                                    <p className="font-bold ml-4 my-4 text-base md:text-sm">Fotos</p>
                                    <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                                    {
                                        item.images?.map((image, index) => (
                                            // <image key={index} className="w-[150px] h-[80px] mt-1 mb-1" src={image}/>
                                            <Image key={index} alt="" className="w-[150px] h-[90px] mt-1 mb-1" src={image} width={150} height={90}/>
                                        ))
                                    }
                                    </div>
                                    
                                    <p className="font-bold ml-4 my-4 text-base md:text-sm">Principais consequências</p>
                                    {
                                        item.consequencias?.map((consequencia, index)=>(
                                            // <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${consequencia}`}</p>
                                            <p key={index} className="flex flex-row text-left ml-4 my-4 text-base md:text-sm"><TriangleAlert className='text-yellow-600 min-w-4 min-h-4 max-w-4 max-h-4 mr-2' /> {`${consequencia}`}</p>

                                        ))
                                    }

                                    <Separator className="my-4"/>
                                    
                                    <p className="font-bold ml-4 my-4 text-base md:text-sm">Ações recomendadas</p>
                                    {
                                        item.acoes?.map((acao, index)=>(
                                            // <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${acao}`}</p>
                                            <p key={index} className="flex flex-row text-left ml-4 my-4 text-base md:text-sm"><CircleCheckBig className='text-green-700 min-w-4 min-h-4 max-w-4 max-h-4 mr-2' /> {`${acao}`}</p>

                                        ))
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))
                        :
                        null
                    }
                </Accordion>
                
                {
                    !listRisks.length &&    <div className="flex flex-col items-center gap-2">
                                                <ListX className="text-gray-400 w-8 h-8"/>
                                                <p className="text-center font-bold mb-16 text-gray-400">Ainda não foram adicionadas situações de risco</p>
                                            </div>
                }
                
                
                <CardFooter className="flex flex-col gap-2">
                    {/* <Button className="bg-green-600 hover:bg-green-400 text-base md:text-sm select-none" onClick={()=> generatePdf(listRisks, inspectionInformations)} >Gerar PDF</Button>                 */}
                    <Button disabled={inspectionInformations === undefined ? true : false} className="bg-green-600 hover:bg-green-400 w-full text-base md:text-sm select-none" onClick={()=> {onReadyReport()}} >Visualizar relatório</Button>
                    {!inspectionInformations && <p className="select-none text-[14px] text-red-600">{`Preencha os dados da inspeção ${listRisks.length ? '' : ' e'}`}</p>}
                    {!listRisks.length && <p className="select-none text-[14px] text-red-600">{`${!inspectionInformations ? 'a' : 'A'}dicione pelo menos uma situação de risco.`}</p>}
                    
                    <Separator className="w-full h-[0.5px] my-1"/>

                    <Button
                        onClick={()=> DownloadFile(inspectionInformations, listRisks)}
                        disabled={inspectionInformations === undefined ? true : false} 
                        className="bg-lime-500 hover:bg-lime-300 w-full text-base md:text-sm select-none"     
                    >
                        <FileDown />
                        Salvar relatório
                    </Button>
                    <div className="flex items-center justify-center bg-inherit border-[1px] border-green-600 hover:bg-green-100 rounded-md w-full py-2 cursor-pointer">
                        {
                            isLoadingFile
                            ?
                            <LoadingIndicatorAnimated styles="w-4 h-4 border-[3px] mr-2" />
                            :
                            <FileUp className="text-green-600 mr-2 h-4 w-4" />
                        }
                        <p className="text-sm text-green-600 select-none">{`${isLoadingFile ? 'Carregando relatório...' : 'Carregar relatório existente'}`}</p>
                        <Input 
                            className="absolute w-[25%] cursor-pointer" 
                            style={{opacity: 0, cursor: 'pointer'}}
                            type="file" 
                            accept=".ris"
                            id="inputFileLoaded"
                            onClick={()=> handleSelectFile()}
                        />
                    </div>
                </CardFooter>
            </Card>
        )
        :
        (
            <Report 
                listRisks={listRisks}
                inspectionInformations={inspectionInformations}
                onReadyReport={onReadyReport}
            />
        )
    )
}