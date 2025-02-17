'use client'

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, ListX, MessageSquareWarning} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Report from "@/components/Report";
import DownloadFile from "@/lib/downloadFile";
import { Input } from "@/components/ui/input";
import LoadingIndicatorAnimated from "@/components/LoadingIndicatorAnimated";
import ListRiskItem from "@/components/ListRiskItem/list-risk-item";
import MyDialog from "@/components/MyDialog";
import { SystemContext } from "@/lib/context/SystemContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { inspectionInformationsProps, ListRisks, RiskProps } from "@/lib/types";


export interface CardListRiskProps {
    listRisks :Array<RiskProps>
    onLoadListRisks :(listRisks :ListRisks) => void
    inspectionInformations :inspectionInformationsProps
    onLoadInspectionInformations :(inspectionInformations :inspectionInformationsProps) => void
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
    checkFilling :()=> boolean
    setFormUnlocked :(value? :boolean)=> void
    formUnlocked :boolean
}

export default function CardListRisk({
    setFormUnlocked, 
    checkFilling, 
    onLoadListRisks, 
    onLoadInspectionInformations, 
    onDeleteImage, 
    onAddImage, 
    onChangeRisco, 
    onDeleteConsequencia, 
    onAddConsequencia, 
    onChangeConsequencia, 
    onDeleteAcaoRecomendada, 
    onAddAcaoRecomendada, 
    onChangeAcaoRecomendada, 
    onRemoveRiskOfList, 
    formUnlocked, 
    listRisks , 
    inspectionInformations, 
    statusReadyReport, 
    onReadyReport
} :CardListRiskProps){

    const [isEditableRisk, setIsEditableRisk] = useState(false)
    const [isLoadingFile, setIsLoadingFile] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)

    const { uploadedFile } = useContext(SystemContext)

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
                    setFormUnlocked(data?.checkFilling)
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
        }

        if(fileSelected) {
            fileSelected.addEventListener('change', listener, {once: true})
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            if(listRef.current) {
                listRef.current.classList.add('custom-scrollbar')
                listRef.current.classList.remove('relative')
                listRef.current.classList.remove('overflow-hidden')
                listRef.current.scrollTo(listRef.current.scrollHeight, listRef.current.scrollHeight)
            }
        }, 50);
    }, [listRisks.length, statusReadyReport])

    useEffect(()=> {
        if(uploadedFile) {
            onLoadInspectionInformations(uploadedFile?.inspectionInformations)
            onLoadListRisks(uploadedFile?.listRisks)
            setFormUnlocked(uploadedFile?.checkFilling)
        }
    }, [])

    return(
        statusReadyReport
        ?
        (
            <div className="flex flex-col justify-between min-h-screen lg:min-h-full max-h-screen px-6 py-6 rounded-xl border-[1px] shadow-md">
                <p className="text-lg font-bold">Situações de risco identificadas</p>
                <div 
                    ref={listRef}
                    id="scrollAreaListaDeRiscos" 
                    className="flex flex-col flex-1 max-h-[51vh] w-[100%] mb-6 pt-3 mt-14 border-[1px] rounded-md overflow-y-auto" 
                >
                    {
                        listRisks.map((item, index)=>(
                            <div key={index} className={`mx-3 mb-3`}>

                                <ListRiskItem 
                                    key={index}
                                    index={index}
                                    item={item}
                                    onRemoveRiskOfList={onRemoveRiskOfList}
                                >
                                    <MyDialog
                                        indexRisk={index}
                                        itemRisk={item}
                                        isEditableRisk={isEditableRisk}
                                        onChangeRisco={onChangeRisco}
                                        onChangeConsequencia={onChangeConsequencia}
                                        onChangeAcaoRecomendada={onChangeAcaoRecomendada}
                                        onAddImage={onAddImage}
                                        onAddConsequencia={onAddConsequencia}
                                        onAddAcaoRecomendada={onAddAcaoRecomendada}
                                        onDeleteImage={onDeleteImage}
                                        onDeleteConsequencia={onDeleteConsequencia}
                                        onDeleteAcaoRecomendada={onDeleteAcaoRecomendada}
                                        setIsEditableRisk={setIsEditableRisk}
                                    />
                                </ListRiskItem>
                                
                            </div>
                        ))
                    }

                    {
                    !listRisks.length &&    <div className="flex flex-col w-full self-center items-center justify-center gap-2">
                                                <ListX className="text-gray-400 w-8 h-8"/>
                                                <p className="text-center font-bold text-gray-400">Ainda não foram adicionadas situações de risco</p>
                                            </div>
                    }
                </div>
                
                
                <TooltipProvider>
                    <div className="flex flex-col gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    disabled={!checkFilling()} 
                                    className="bg-green-800 hover:bg-green-600 w-full text-base md:text-sm select-none" 
                                    onClick={()=> {onReadyReport()}} 
                                >
                                    Visualizar relatório
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-green-700 text-sm">
                                <p>Visualizar o relatório preparado para impressão</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        {(!inspectionInformations || !formUnlocked) && <p className="flex flex-row items-center justify-center gap-2 select-none text-center text-[14px] mb-[-10px] text-yellow-600">
                                                                            <MessageSquareWarning className="w-5 h-5"/>
                                                                            <i>{`Preencha os dados da inspeção${listRisks.length ? '.' : ' e'}`}</i>
                                                                        </p>
                        }
                        
                        {!listRisks.length && <div className="flex flex-row justify-center select-none text-center text-[14px] text-yellow-600">
                                                    <i className="flex flex-row">
                                                        {
                                                            (!inspectionInformations || !formUnlocked)
                                                            ?
                                                            <p>a</p> 
                                                            : 
                                                            <p className="flex flex-row items-center gap-2">
                                                                <MessageSquareWarning className="w-5 h-5"/>
                                                                A
                                                            </p>
                                                        }
                                                    <p>dicione pelo menos uma situação de risco.</p>
                                                    </i>
                                                </div>
                        }

                        <Separator className="w-full h-[0.5px] my-1"/>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={()=> DownloadFile(checkFilling, inspectionInformations, listRisks)}
                                    disabled={!checkFilling()} 
                                    className="bg-zinc-700 hover:bg-zinc-500 w-full text-base md:text-sm select-none"     
                                >
                                    <FileDown />
                                    Salvar relatório
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-green-700 text-sm">
                                <p>Download do relatório no estado atual como arquivo</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center justify-center bg-inherit border-[1px] border-green-700 hover:bg-green-100 rounded-md w-full py-2 cursor-pointer">
                                    {
                                        isLoadingFile
                                        ?
                                        <LoadingIndicatorAnimated styles="w-4 h-4 border-[3px] mr-2" />
                                        :
                                        <FileUp className="text-green-700 mr-2 h-4 w-4" />
                                    }
                                    <p className="text-sm text-green-700 select-none">{`${isLoadingFile ? 'Carregando relatório...' : 'Carregar relatório existente'}`}</p>
                                    <Input 
                                        className="absolute w-[25%] cursor-pointer" 
                                        style={{opacity: 0, cursor: 'pointer'}}
                                        type="file" 
                                        accept=".ris"
                                        id="inputFileLoaded"
                                        onClick={()=> handleSelectFile()}
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-green-700 text-sm">
                                <p>Carregar um relatório existente para edição</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>

            </div>
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