'use client'

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Download, Edit, ExternalLink, FileUp, ScanEye, Trash2 } from "lucide-react";
import Container, { MaximizeContainer } from "@/components/Container";
import DadosDaInspecao from "@/components/DadosDaInspecao";
import DadosDaAnaliseDeRisco from "@/components/DadosDaAnaliseDeRisco";
import { DataContext } from "@/lib/datacontext";
import { CustomList } from "@/components/MyCustomList";
import { SystemContext } from "@/lib/context/SystemContext";
import MyDialog from "@/components/MyDialog";
import { ActionBar } from "@/components/ActionBar";
import { FileRIS, FileRISTeste } from "@/lib/types";
import DownloadFileRIS from "@/lib/downloadFile copy";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LoadingIndicator from "@/components/LoadingIndicator";


export default function TesteLayout() {

    const router = useRouter()
    
    const [ ocultarPrimeiraSection, setOcultarPrimeiraSection ] = useState(false)
    const [ isLoadingFile, setIsLoadingFile ] = useState(false)
    const [ isLoadingReport, setIsLoadingReport ] = useState(false)

    const { 
        setInspectionData, inspectionData,
        listRisks, setListRisks,
        formUnlocked, setFormUnlocked,
        uploadedFile, handleRemoveRiskOfList 
    } = useContext(DataContext)

    const handleOcultarPrimeiraSection = ()=> {
        setOcultarPrimeiraSection(!ocultarPrimeiraSection)
    }

    function handleSelectFile() {
        const fileSelected = document.getElementById('inputFileLoaded')
        
        const listener = function(event :Event){
            const input = event.target as HTMLInputElement

            if(input.files && input.files.length) {
                const file = input.files[0]
                let reader = new FileReader()
                reader.readAsText(file, 'utf8')

                setIsLoadingFile(true)

                reader.onload = () => {
                    try {
                        const data = JSON.parse(reader.result as string)
                        console.log(data)
                        setInspectionData(data?.inspectionData)
                        setListRisks(data?.listRisks)
                        // setFormUnlocked(data?.checkFilling)
                    }catch(error) {
                        console.error('Erro ao ler o arquivo: ', error)
                    }finally{
                        setIsLoadingFile(false)
                        setFormUnlocked(false)
                    }
                }

                reader.onerror = () => {
                    console.error('Erro ao ler o arquivo.')
                    setIsLoadingFile(false)
                }
            }
        }

        if(fileSelected) {
            fileSelected.addEventListener('change', listener, {once: true})
        }
    }

    function handleCheckFilling() {
        if(listRisks.length && !formUnlocked) {
            return false
        }
        return true
    }

    useEffect(()=> {
        if(uploadedFile) {
            const dataUploadedFile = uploadedFile as FileRISTeste
            setInspectionData(dataUploadedFile?.inspectionData)
            setListRisks(dataUploadedFile?.listRisks)
            setFormUnlocked(dataUploadedFile?.checkFilling)
        }
    }, [listRisks, formUnlocked])

    return(
        <TooltipProvider>
            <div className="flex flex-col h-[100vh] w-[95vh] md:w-full justify-between">

                <nav className={`bg-gray-100 font-bold flex p-3 gap-2`}>
                    <Image className={`self-center`} alt="" src={require('../../lib/imagens/logo-cipa-2.png')} width={40} height={40}/>
                    <p className="self-center justify-self-start w-full text-green-900">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
                </nav>

                <ActionBar.Bar border alignItems="justify-end">
                    <ActionBar.Action 
                        disabled={ handleCheckFilling() } 
                        icon={ScanEye} 
                        textTooltip={`${formUnlocked || !listRisks.length? 'Para visualizar o relatório: ' : 'Visualizar relatório'} ${formUnlocked? '- Preencha os dados da inspeção.' : ''} ${!listRisks.length? '- Insira pelo menos uma situação de risco em sua lista.' : ''}`} 
                        onClick={()=> {
                            setIsLoadingReport(true)
                            router.push('/testerelatorio')
                        }} 
                    />
                    <ActionBar.ActionUploadFile icon={FileUp} textTooltip="Carregar relatório" isLoadingFile={isLoadingFile} onClick={()=> handleSelectFile()} />
                    <ActionBar.Action icon={Download} textTooltip="Baixar backup" disabled={ handleCheckFilling() } onClick={()=> DownloadFileRIS(handleCheckFilling, inspectionData, listRisks)} />
                </ActionBar.Bar>

                <main  className={`grid max-w-screen h-[100vh] grid-flow-row
                            sm:grid-rows-2 sm:grid-cols-2 
                            lg:grid-rows-1  
                            ${ocultarPrimeiraSection? 'flex grid-rows-2 md:grid-cols-2' : 'grid-rows-3 lg:grid-cols-3'} 
                            `}
                >

                    {
                        !ocultarPrimeiraSection &&  
                            <section className="flex justify-center px-2 col-span-1 lg:max-h-[70vh] xl:max-h-[75vh] 2xl:max-h-[90vh] flex-grow"
                            >
                                <Container titulo="Dados da inspeção">
                                    <DadosDaInspecao />
                                </Container>
                            </section>
                    }

                    {
                        <section className={`
                                            flex justify-center px-2 lg:max-h-[70vh] xl:max-h-[75vh] 2xl:max-h-[90vh] flex-grow
                                            ${ocultarPrimeiraSection? 'sm:col-span-2 lg:scale-x-100 lg:col-span-1' : ''}
                                            `}>
                            <Container titulo="Análise de situação de risco" maximizableComponent={<MaximizeContainer action={()=> handleOcultarPrimeiraSection()}/>}>                                    
                                    <DadosDaAnaliseDeRisco />
                            </Container>
                        </section>
                    }

                    <section className={`  
                                        max-w-full
                                        sm:col-span-2 
                                        lg:col-span-1  
                                        px-2 flex justify-center 
                                        lg:max-h-[70vh] xl:max-h-[75vh] 2xl:max-h-[90vh] flex-grow
                                        `}>
                        <Container 
                            titulo="Situações de risco identificadas"
                        >
                            <TooltipProvider>
                                <CustomList.Container
                                    data={listRisks}
                                    emptyList={<CustomList.Empty text="Sua lista ainda está vazia"/>}
                                    renderItemComponent={({key, item})=> (
                                        <CustomList.Item key={key} item={item}>
                                            <CustomList.ItemActions>
                                                <MyDialog
                                                    indexRisk={key as number}
                                                    itemRisk={item}
                                                    isEditableRisk={false}
                                                    setIsEditableRisk={()=>{}} 
                                                >
                                                    <CustomList.ItemAction 
                                                        icon={Edit} 
                                                        className="border-[1px] bg-white hover:bg-lime-400"  
                                                    />    
                                                </MyDialog>

                                                <CustomList.ItemAction 
                                                    icon={Trash2} 
                                                    className="border-[1px] bg-inherit hover:bg-red-400" 
                                                    onClick={()=> {handleRemoveRiskOfList(key as number)}}    
                                                />
                                            </CustomList.ItemActions>
                                        </CustomList.Item>
                                    )}
                                >
                                </CustomList.Container>
                            </TooltipProvider>
                        </Container>
                    </section>
                    {
                        isLoadingReport && <LoadingIndicator text="Preparando o relatório..."/>
                    }
                </main>

                <footer className={`flex flex-col h-auto bg-gray-100 p-6 gap-2 w-screen'}`}>
                    <p className={`mx-auto max-w-md md:max-w-full my-auto text-center text-base md:text-sm`}>Esta ferramenta deve ser utilizada somente para auxílio na elaboração do relatório de inspeção de segurança do trabalho e não exclui a necessidade de avaliação de um profissional. As análises geradas por IA podem ser imprecisas.</p>
                    <a 
                        href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes"
                        className={`flex gap-2 mx-auto max-w-md md:max-w-full my-auto text-center text-base md:text-md font-bold text-green-600 hover:text-green-400`}
                        target="blank"
                    >
                        <ExternalLink /> Ministério do Trabalho e Emprego - Normas Regulamentadoras Vigentes
                    </a>
                </footer>
            </div>
        </TooltipProvider>
    )
}