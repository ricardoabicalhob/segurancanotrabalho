'use client'

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot, Edit, ImageOff, ListX, Plus, X } from "lucide-react";
import Image from "next/image";
import { inspectionInformations } from "@/lib/pdf-generate";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-base64";
import { useState } from "react";

export interface CardListRiskProps {
    listRisks :Array<RiskProps>
    inspectionInformations :inspectionInformations
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

export default function CardListRisk({ onDeleteImage, onAddImage, onChangeRisco, onDeleteConsequencia, onAddConsequencia, onChangeConsequencia, onDeleteAcaoRecomendada, onAddAcaoRecomendada, onChangeAcaoRecomendada, onRemoveRiskOfList, listRisks , inspectionInformations, statusReadyReport, onReadyReport} :CardListRiskProps){

    const [isEditableRisk, setIsEditableRisk] = useState(false)

    function handlePrint() {
        window.print()
    }

    function handleSelectImage(indexRisk :number) {
        const img = document.getElementById(`imageInput${indexRisk}`)
        
        const listener = function(event){
            const file = event.target?.files[0]

            convertToBase64(file)
            .then(base64String => {
                onAddImage(indexRisk, base64String)        
            })
            .catch(error => {
                console.error('Erro ao converter a imagem: ', error)
            })
        }

        if(img) {
            img.addEventListener('change', listener, {once: true})
        }else{
            console.log('negativo para img')
        }
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
                                        
                            <div className="w-[360px] md:w-[500px] h-auto p-6 m-6 justify-self-center rounded-lg shadow-lg border-2" id={`${index}. ${item.risco}`} popover='manual'>
                                <p className="flex flex-row items-center font-bold mb-4">{`${index + 1}. `}<Input onChange={(e)=>onChangeRisco(index, e.target.value)} className="ml-1" value={`${item.risco}`}/></p>
                                
                                <Separator />

                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-bold my-4 text-base md:text-sm">Fotos</p>
                                    <div id={`addImageSection${index}`} className="flex items-center justify-center bg-green-600 hover:bg-green-400 rounded-full w-fit h-6 px-2" onClick={()=> {}}>
                                        <Plus className="text-white w-4 h-4" />
                                        <p className="text-xs text-white select-none">foto</p>
                                        <Input 
                                            className="absolute w-6" 
                                            style={{opacity: 0}} 
                                            onClick={()=> handleSelectImage(index)} 
                                            multiple={false} 
                                            type="file" 
                                            maxLength={1} 
                                            accept="image/*" 
                                            id={`imageInput${index}`}
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                                    {
                                        item.images?.map((image, indexImage) => (
                                            <div key={indexImage} className="flex flex-col">
                                                <div className="absolute flex items-center justify-center rounded-full w-6 h-6 self-end bg-red-600 hover:bg-red-400" onClick={()=> onDeleteImage(index, indexImage)}><X className="w-4 h-4 text-white"/></div>
                                                <div className="flex flex-col bg-gray-200 m-3 px-2 py-1 rounded-md">
                                                    <Image key={indexImage} alt="" className="w-[150px] h-[90px] mt-1 mb-1" src={image} width={150} height={90}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <Separator />
                                
                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-bold my-4 text-base md:text-sm">Principais consequências</p>
                                    <div className="flex items-center justify-center bg-green-600 hover:bg-green-400 rounded-full w-fit h-6 px-2" onClick={()=> onAddConsequencia(index)}><Plus className="text-white w-4 h-4" /><p className="text-xs text-white select-none">consequência</p></div>
                                </div>
                                {
                                    item.consequencias?.map((consequencia, indexConsequencia)=>(
                                        <div key={indexConsequencia} className="flex flex-col">
                                            <div className="absolute flex items-center justify-center rounded-full w-6 h-6 self-end bg-red-600 hover:bg-red-400" onClick={()=> {onDeleteConsequencia(index, indexConsequencia)}}><X className="w-4 h-4 text-white"/></div>

                                            <div className="flex flex-row justify-between mb-2 ml-3 mt-3 mr-3 p-1 items-center">
                                                <p className="text-base md:text-sm">{`${indexConsequencia + 1}. `}</p>
                                                <Input className="ml-1 text-base md:text-sm" value={`${consequencia}`} onChange={e => onChangeConsequencia(index, indexConsequencia, e.target.value)} />
                                            </div>
                                        </div>
                                    ))
                                }

                                <Separator />

                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-bold my-4 text-base md:text-sm">Ações recomendadas</p>
                                    <div className="flex items-center justify-center bg-green-600 hover:bg-green-400 rounded-full w-fit h-6 px-2" onClick={()=> onAddAcaoRecomendada(index)}><Plus className="text-white w-4 h-4" /><p className="text-xs text-white select-none">ação</p></div>
                                </div>
                                {
                                    item.acoes?.map((acao, indexAcao)=>(
                                        <div key={indexAcao} className="flex flex-col">
                                            <div className="absolute flex items-center justify-center rounded-full w-6 h-6 self-end bg-red-600 hover:bg-red-400" onClick={()=> {onDeleteAcaoRecomendada(index, indexAcao)}}><X className="w-4 h-4 text-white"/></div>

                                            <div className="flex flex-row justify-between mb-2 ml-3 mt-3 mr-3 p-1 items-center">
                                                <p className="text-base md:text-sm">{`${indexAcao + 1}. `}</p>
                                                <Input className="ml-1 text-base md:text-sm" value={`${acao}`} onChange={e => onChangeAcaoRecomendada(index, indexAcao, e.target.value)} />
                                            </div>
                                        </div>
                                    ))
                                }

                                <Separator className="mb-3"/>

                                <Button
                                    className="bg-lime-500 hover:bg-lime-300 flex justify-self-end"
                                    onClick={()=>{
                                        setIsEditableRisk(false)
                                    }}
                                    popoverTarget={`${index}. ${item.risco}`}
                                >
                                    Concluir
                                </Button>
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