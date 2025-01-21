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
import { inspectionInformationsTeste } from "@/lib/types"
import { useRouter } from "next/navigation"
import { DataContext } from "@/lib/datacontext"
import { TabelaDeRiscos } from "@/lib/tabela-de-riscos"

interface ReportProps {
    listRisks :ListRisks
    inspectionInformations :inspectionInformationsTeste
    onReadyReport? :() => void
}

export default function Report( { listRisks, inspectionInformations, onReadyReport } :ReportProps ) {

    const { 
        buscarRiscoPorCor, 
        handleSummarizeByRiskGroup, 
        dataChart,
        hideChart
    } = useContext(DataContext)

    function removeEmptyDataChartGroups(dataChart :{ tipo: string; quantidade: number}[]) {
        const newDataChart :{ tipo: string; quantidade: number}[] = []

        dataChart.map((item, index)=> {
            if(item.quantidade > 0) {
                newDataChart.push(item)
            }
        })

        return newDataChart
    }

    useEffect(()=> {
        handleSummarizeByRiskGroup()
    }, [])

    return(
        <div key={'containerPrincipal'} className='w-svw flex flex-col items-center'>
            <div key={'containerSubprincipal'} className="max-w-[960px] px-4">
                <div className={`bg-gray-100 text-green-900
                                font-bold text-2xl 
                                flex p-4 gap-2 mb-4
                                border-b-2 
                                max-w-[926px] w-full self-center`}>
                    <Image className="self-center" alt="" src={require('../../lib/imagens/logo-cipa-2.png')} width={60} height={60}/>
                    <p className="self-center justify-self-start w-full ml-8">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
                </div>
                <table className="border-2 table-auto bg-slate-50 w-full">
                    <tr className="border-2 w-full">
                        <td className="border-2 pl-2" colSpan={2}><b>Empresa: </b>{`${inspectionInformations.empresa}`}</td>
                        <td className="border-2 pl-2"><b>Data: </b>{`${new Date(inspectionInformations.data).toLocaleDateString('pt-BR')}`}</td>
                        <td className="border-2 pl-2"><b>Hora: </b>{`${inspectionInformations.hora}`}</td>
                        <td className="border-2 pl-2" colSpan={2}><b>Área emitente: </b>{`${inspectionInformations.areaEmitente}/${inspectionInformations.cipa}`}</td>
                    </tr>
                    <tr className="border-2 w-full">
                        <td className="border-2 pl-2" colSpan={5}><b>Local inspecionado: </b>{`${inspectionInformations.areaLotacao}/${inspectionInformations.localInspecionado}`}</td>
                        <td className="border-2 pl-2"><b>Cidade: </b>{`${inspectionInformations.cidade}`}</td>
                    </tr>
                    <tr>
                        <td className="border-2 pl-2" colSpan={3}><b>Rua: </b>{inspectionInformations.localInspecionadoRua}</td>
                        <td className="border-2 pl-2"><b>Nº: </b>{inspectionInformations.localInspecionadoNumero}</td>
                        <td className="border-2 pl-2" colSpan={2}><b>Bairro: </b>{inspectionInformations.localInspecionadoBairro}</td>
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
                                                {buscarRiscoPorCor(consequencia.corDoGrupoDeRisco as keyof TabelaDeRiscos)?.tipo}:
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

                    {
                        !hideChart &&
                        <p className="font-bold mb-3 print:break-after-avoid">RESUMO GRÁFICO</p>
                    }
                    {
                        !hideChart &&
                        <div className="flex justify-between items-center border-2 px-10 gap-10 mb-16 rounded-md print:break-inside-avoid">
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
                                            removeEmptyDataChartGroups(dataChart)?.map((item, index)=> (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{item.tipo}</TableCell>
                                                    <TableCell className="text-right">{item.quantidade}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                        <TableRow>
                                            <TableCell className="font-bold">Total</TableCell>
                                            <TableCell className="font-bold text-right">
                                                {
                                                    dataChart.reduce((acumulador, valorAtual)=> {
                                                        return acumulador + valorAtual.quantidade
                                                    }, 0)
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <MyChart data={dataChart} />
                        </div>
                    }

                    <p className="font-bold mb-3 print:break-after-avoid">CONCLUSÃO</p>
                    <p className="text-justify print:break-inside-avoid">
                        A inspeção realizada evidenciou a necessidade de melhorias nas condições de trabalho, com a identificação de 
                        <i>
                            <strong>
                                {` ${listRisks.length} ${listRisks.length === 1? 'situação' : 'situações'}`} de risco
                            </strong>
                        </i> no local inspecionado. Os trabalhadores estão expostos a perigo(s) {removeEmptyDataChartGroups(dataChart).length > 1? 'dos tipos: ' : 'do tipo: '}
                        <i>
                            <strong>
                                {removeEmptyDataChartGroups(dataChart).map((item, index)=> (
                                    item.tipo.toLocaleLowerCase() + (index === removeEmptyDataChartGroups(dataChart).length -2? ' e ' : (index === removeEmptyDataChartGroups(dataChart).length - 1? '' : ', '))
                                )).join(' ')}
                            </strong>
                        </i>. 
                        É importante ressaltar que a prevenção de acidentes e doenças ocupacionais é fundamental para garantir a saúde e
                        a segurança dos colaboradores. Diante do exposto, recomenda-se a adoção urgente das medidas corretivas propostas neste relatório, 
                        visando eliminar ou minimizar os riscos identificados e promover um ambiente de trabalho seguro e saudável.
                    </p>

                    {
                        !hideChart
                        && <Separator className="my-4 h-1 break-before-avoid break-after-avoid"/>
                    }

                    <div className="px-24 py-3 mt-32 print:break-before-avoid print:break-inside-avoid">
                        <Separator className="bg-black w-[70%] justify-self-center mb-3"/>
                        <p className="text-sm text-center antialiased font-normal">{inspectionInformations.responsavelPelaInspecao}</p>
                        <p className="text-sm text-center antialiased font-normal">{`${inspectionInformations.funcaoResponsavelPelaInspecao} / IF: ${inspectionInformations.matriculaResponsavelPelaInspecao}`}</p>
                        <p className="text-sm text-center antialiased font-bold">Responsável pela inspeção</p>
                    </div>

                    <div className=" flex flex-row gap-2 py-10">
                    </div>
                    
                </div>
            }

                
        </div>
    )
}