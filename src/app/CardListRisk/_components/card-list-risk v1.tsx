'use client'

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot, Edit, ImageOff, ImagePlus, ListX, X } from "lucide-react";
import Image from "next/image";
import { inspectionInformations } from "@/lib/pdf-generate";

export interface CardListRiskProps {
    listRisks :Array<RiskProps>
    inspectionInformations :inspectionInformations
    statusReadyReport :boolean
    onReadyReport :() => void
    onRemoveRiskOfList :(index :number)=> void
}

export default function CardListRisk({ onRemoveRiskOfList, listRisks , inspectionInformations, statusReadyReport, onReadyReport} :CardListRiskProps){

    function handlePrint() {
        window.print()
    }

    return(
        statusReadyReport
        ?
        (
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
                                <AccordionTrigger className="font-bold text-left max-w-[90%] text-base md:text-sm">{`${index + 1}. ${item.risco}`}</AccordionTrigger>
                                <div className="flex flex-row w-auto items-center">
                                    <Button onClick={()=>onRemoveRiskOfList(index)} className="w-fit h-fit px-6 bg-inherit hover:bg-red-400 text-black text-xs"><X /></Button>
                                </div>
                                
                            </div>

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
                                        <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${consequencia}`}</p>
                                    ))
                                }
                                <Separator className="my-4"/>
                                <p className="font-bold ml-4 my-4 text-base md:text-sm">Ações recomendadas</p>
                                {
                                    item.acoes?.map((acao, index)=>(
                                        <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${acao}`}</p>
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
                {!inspectionInformations && <p className="text-[14px] text-red-600">{`Preencha os dados da inspeção ${listRisks.length ? '' : ' e'}`}</p>}
                {!listRisks.length && <p className="text-[14px] text-red-600">{`${!inspectionInformations ? 'a' : 'A'}dicione pelo menos uma situação de risco.`}</p>}
            </CardFooter>
        </Card>
        )
        :
        (
            <div key={'containerPrincipal'} className='w-svw h-svh flex flex-col items-center'>
                <div key={'containerSubprincipal'} className="max-w-[960px] px-4">
                    <table className="border-2 table-auto bg-slate-50 w-full">
                        <tr className="border-2 w-full">
                            <td className="border-2 pl-2">{`Empresa: ${inspectionInformations.empresa}`}</td>
                            <td className="border-2 pl-2">{`Data: ${inspectionInformations.data.toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false})}`}</td>
                            <td className="border-2 pl-2">{`Hora: ${inspectionInformations.hora}`}</td>
                        </tr>
                        <tr className="border-2 w-full">
                            <td className="border-2 pl-2">{`Local inspecionado: ${inspectionInformations.areaLotacao}/${inspectionInformations.localInspecionado}`}</td>
                            <td className="border-2 pl-2">{`Cidade: ${inspectionInformations.cidade}`}</td>
                            <td className="border-2 pl-2">{`Área emitente: ${inspectionInformations.areaEmitente}/${inspectionInformations.cipa}`}</td>
                        </tr>
                    </table>

                    <p key={'naoconformidades'} className='w-full text-center my-4'>INDICAÇÃO DAS NÃO CONFORMIDADES</p>
                    <p key={'informativo'} className='text-sm px-6 py-2 my-4 bg-gray-200'>Solicitamos sua especial atenção para o assunto citado, visto que são irregularidades que comprometem a 
                        segurança do(s) funcionário(s) e/ou equipamento(s) no local de trabalho e terceiros.</p>
                </div>
                {
                    <div key={'containerAnalises'} className="flex flex-col gap-2 p-6 w-full max-w-[960px] sm:w-full md:max-w-[960px]">
                        {
                            listRisks
                            &&
                            listRisks.map(( risk, index ) =>(
                                <div key={'analise'}>
                                    <p 
                                        key={index}
                                        className='font-bold text-base antialiased mt-4'
                                    >
                                        {`${index + 1}. ${risk.risco}`}
                                    </p>

                                    <p key={'fotos'} className='text-sm font-bold antialiased py-3'>Fotos</p>
                                    <div className='flex flex-row items-center justify-center flex-wrap p-6 gap-4 border-2 rounded-md'>
                                        {
                                            risk.images?.map(( image, index ) => (
                                                <Image key={index} alt="" className="w-[300px] h-[225px] mt-1 mb-1" src={image} width={150} height={90}/>
                                            ))
                                        }
                                        {
                                            !risk.images.length && <ImageOff />
                                        }
                                        {
                                            !risk.images.length && <p>Não foram inseridas fotos</p>
                                        }
                                        
                                    </div>

                                    <p key={'consequencias'} className='text-sm font-bold antialiased py-3'>Principais consequências</p>
                                    {
                                        risk.consequencias?.map(( consequencia, index ) => (
                                            <p 
                                                key={index}
                                                className='text-sm antialiased ml-6 flex flex-row'
                                            >
                                            <Dot className='min-w-5 min-h-5 max-w-5 max-h-5'/> {consequencia}
                                            </p>
                                        ))
                                    }

                                    <p key={'acoes'} className='text-sm font-bold antialiased py-3'>Ações recomendadas</p>
                                    {
                                        risk.acoes?.map(( acao, index ) => (
                                            <p 
                                                key={index}
                                                className='text-sm antialiased ml-6 flex flex-row'
                                            >
                                                <Dot className='min-w-5 min-h-5 max-w-5 max-h-5'/> {acao}
                                            </p>
                                        ))
                                    }

                                <Separator className="my-4 h-1"/>
                                
                                </div>
                            ))
                        }
                        
                    </div>
                }
                <div className="border-t-2 px-24 py-3 mt-32 border-gray-500">
                    <p className="text-center antialiased font-bold">{inspectionInformations.responsavelPelaInspecao}</p>
                    <p className="text-center antialiased">Responsável pela inspeção</p>
                </div>
                <div className=" flex flex-row gap-2 py-10">
                    <Button id='voltar' className={`bg-green-600 hover:bg-green-400 print:hidden text-base md:text-sm select-none`} onClick={()=> {onReadyReport() } } >Fechar visualização</Button>
                    <Button id='imprimir' className={`bg-zinc-600 hover:bg-zinc-400 print:hidden text-base md:text-sm select-none`} onClick={()=> {handlePrint() } } >Imprimir</Button>
                </div>    
            </div>
        )
    )
}