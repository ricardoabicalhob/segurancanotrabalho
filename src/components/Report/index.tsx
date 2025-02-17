import { CircleAlert, CircleCheckBig, Dot, ImageOff, Printer, TriangleAlert } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import Image from "next/image"
import { ListRisks } from "@/app/page-home-1"
import { inspectionInformations } from "@/lib/pdf-generate"
import { useContext, useEffect, useState } from "react"
import { SystemContext } from "@/lib/context/SystemContext"
import MyChart from "../MyChart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface ReportProps {
    listRisks :ListRisks
    inspectionInformations :inspectionInformations
    onReadyReport? :() => void
}

export default function Report( { listRisks, inspectionInformations, onReadyReport } :ReportProps ) {

    const { buscarRiscoPorCor, handleSummarizeByRiskGroup, dataChart } = useContext(SystemContext)
   
    function handlePrint() {
        window.print()
    }

    useEffect(()=> {
        handleSummarizeByRiskGroup()
    }, [])

    return(
        <div key={'containerPrincipal'} className='w-svw h-svh flex flex-col items-center'>
            <div key={'containerSubprincipal'} className="max-w-[960px] px-4">
                <table className="border-2 table-auto bg-slate-50 w-full">
                    <tr className="border-2 w-full">
                        <td className="border-2 pl-2"><b>Empresa: </b>{`${inspectionInformations.empresa}`}</td>
                        <td className="border-2 pl-2"><b>Data: </b>{`${typeof inspectionInformations.data === 'string' ? new Date(inspectionInformations.data).toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false}) : inspectionInformations.data.toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false})}`}</td>
                        <td className="border-2 pl-2"><b>Hora: </b>{`${inspectionInformations.hora}`}</td>
                    </tr>
                    <tr className="border-2 w-full">
                        <td className="border-2 pl-2"><b>Local inspecionado: </b>{`${inspectionInformations.areaLotacao}/${inspectionInformations.localInspecionado}`}</td>
                        <td className="border-2 pl-2"><b>Cidade: </b>{`${inspectionInformations.cidade}`}</td>
                        <td className="border-2 pl-2"><b>Área emitente: </b>{`${inspectionInformations.areaEmitente}/${inspectionInformations.cipa}`}</td>
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
                                    className='font-bold text-base antialiased mt-4 print:break-inside-avoid print:break-after-avoid'
                                >
                                    {`${index + 1}. ${risk.risco}`}
                                </p>

                                <p key={'fotos'} className='text-sm font-bold antialiased py-3 print:break-after-avoid'>Fotos</p>
                                <div className='flex flex-row items-center justify-center flex-wrap p-6 gap-4 border-2 rounded-md print:break-inside-avoid'>
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

                                <p key={'consequencias'} className='text-sm font-bold antialiased py-3 print:break-after-avoid'>Principais consequências</p>
                                {
                                    risk.consequencias?.map(( consequencia, index ) => (
                                        <p 
                                            key={consequencia.id}
                                            className='flex text-sm antialiased ml-6 gap-2 my-4 print:break-after-avoid'
                                        >
                                            {/* <CircleAlert className='text-yellow-600 min-w-4 min-h-4 max-w-4 max-h-4 mr-2' />  */}
                                            <div 
                                                id={`CLASSIFICACAORISCO${consequencia.id}`}
                                                key={`grupoRisco${consequencia.id}`}
                                                className={`
                                                    min-w-4 min-h-4 max-w-4 max-h-4 mt-[0.5px] rounded-full 
                                                    ${consequencia.corDoGrupoDeRisco === 'verde' ? 'bg-green-700' : ''}
                                                    ${consequencia.corDoGrupoDeRisco === 'vermelho' ? 'bg-red-super' : ''}
                                                    ${consequencia.corDoGrupoDeRisco === 'laranja' ? 'bg-orange-800' : ''}
                                                    ${consequencia.corDoGrupoDeRisco === 'amarelo' ? 'bg-yellow-400' : ''}
                                                    ${consequencia.corDoGrupoDeRisco === 'azul' ? 'bg-blue-700' : ''}
                                                `}
                                            />
                                            <span
                                                className="font-bold"
                                            >
                                                {buscarRiscoPorCor(consequencia.corDoGrupoDeRisco)?.tipo}:
                                            </span>
                                            {consequencia.value}
                                        </p>
                                    ))
                                }

                                <p key={'acoes'} className='text-sm font-bold antialiased py-3 print:break-after-avoid'>Ações recomendadas</p>
                                {
                                    risk.acoes?.map(( acao, index ) => (
                                        <p 
                                            key={acao.id}
                                            className='text-sm antialiased ml-6 flex flex-row my-4 print:break-after-avoid'
                                        >
                                            <CircleCheckBig className='text-green-700 min-w-4 min-h-4 max-w-4 max-h-4 mr-2' /> {acao.value}
                                        </p>
                                    ))
                                }

                            <Separator className="my-4 h-1"/>
                            
                            </div>
                        ))
                    }
                    
                </div>
            }

            <p className="w-[910px] font-bold mb-3 print:break-after-avoid">RESUMO GRÁFICO</p>
            <div className="flex w-[910px] justify-between items-center border-2 px-10 gap-10 mb-16 rounded-md print:break-inside-avoid">
                <div className="flex w-[30%]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50%] text-center">Tipo de risco</TableHead>
                                <TableHead className="w-[50%] text-center">Quantidade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                dataChart?.map((item, index)=> (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.tipo}</TableCell>
                                        <TableCell className="text-right">{item.quantidade}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>

                <MyChart data={dataChart} />
            </div>

            <Separator className="w-[910px] my-4 h-1"/>

            <div className="border-t-2 px-24 py-3 mt-32 border-gray-500 print:break-before-avoid print:break-inside-avoid">
                <p className="text-sm text-center antialiased font-normal">{inspectionInformations.responsavelPelaInspecao}</p>
                <p className="text-sm text-center antialiased font-normal">{`${inspectionInformations.funcaoResponsavelPelaInspecao} / IF: ${inspectionInformations.matriculaResponsavelPelaInspecao}`}</p>
                <p className="text-sm text-center antialiased font-bold">Responsável pela inspeção</p>
            </div>

            <div className=" flex flex-row gap-2 py-10">
                <Button id='voltar' className={`bg-green-800 hover:bg-green-600 print:hidden text-base md:text-sm select-none`} onClick={()=> {onReadyReport() } } >Fechar visualização</Button>
                <Button id='imprimir' className={`bg-zinc-700 hover:bg-zinc-500 print:hidden text-base md:text-sm select-none`} onClick={()=> {handlePrint() } } ><Printer /> Imprimir</Button>
            </div>    
        </div>
    )
}