import { CircleAlert, CircleCheckBig, Edit, ImageOff, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import Image from "next/image";
import { ButtonDelete } from "../ButtonDelete";
import convertToBase64 from "@/lib/convert-base64";
import { Separator } from "../ui/separator";
import { useContext, useEffect, useRef, useState } from "react";
import { SystemContext } from "@/lib/context/SystemContext";
import AlertNotification from "../AlertNotification";

interface MyDialogProps {
    indexRisk :number
    itemRisk :RiskProps
    onChangeRisco :(indexRisk :number, newValue :string)=> void
    onDeleteImage :(indexRisk :number, indexImage :number)=> void
    onAddImage :(indexRisk :number, image :unknown)=> void
    onDeleteConsequencia :(indexRisk :number, indexConsequencia :number)=> void
    onAddConsequencia :(indexRisk :number)=> void
    onDeleteAcaoRecomendada :(indexRisk :number, indexAcaoRecomendada :number)=> void
    onAddAcaoRecomendada :(indexRisk :number)=> void
    onChangeConsequencia :(indexRisk :number, indexConsequencia :number, newValue :string)=> void
    onChangeAcaoRecomendada :(indexRisk :number, indexAcaoRecomendada :number, newValue :string)=> void
    isEditableRisk :boolean
    setIsEditableRisk :(isEditableRisk :boolean)=> void
}

export default function MyDialog({ 
    itemRisk, 
    indexRisk, 
    isEditableRisk,
    onChangeRisco,
    onChangeConsequencia,
    onChangeAcaoRecomendada,
    onAddImage,
    onAddConsequencia,
    onAddAcaoRecomendada,
    onDeleteImage,
    onDeleteConsequencia,
    onDeleteAcaoRecomendada,
    setIsEditableRisk    
} :MyDialogProps) {

    const textareaAcoesRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaConsequenciasRefs = useRef<HTMLTextAreaElement[]>([])
    const listRef = useRef<HTMLDivElement>(null)
    const [stateScrollBar, setStateScrollBar] = useState(false)
    const [ isInvalidatedFilling, setIsInvalidatedFilling ] = useState(false)


    const { validateCompletionOfConsequencesOrRecommendedActions } = useContext(SystemContext)
    
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
    
    useEffect(()=>{
        if(textareaConsequenciasRefs.current){
            
            setTimeout(() => {
                textareaConsequenciasRefs.current.forEach(textarea => {
                    if(textarea.value !== ''){
                        textarea.style.height = '40px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })    
            }, 100);
        }
    }, [textareaConsequenciasRefs.current[0]?.style.height, stateScrollBar])

    useEffect(()=>{
        if(textareaAcoesRefs.current){
            setTimeout(() => {
                textareaAcoesRefs.current.forEach((textarea, index) => {
                    if(textarea.value !== ''){
                        textarea.style.height = '40px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })    
            }, 100);
        }
    }, [textareaAcoesRefs.current[0]?.style.height, stateScrollBar])

    useEffect(()=> {
        setTimeout(() => {
            if(listRef.current) {
                listRef.current.classList.add('custom-scrollbar')
            }
        }, 100);
    }, [listRef, stateScrollBar])

    useEffect(()=> {
        if(listRef.current) {
            if(itemRisk.consequencias.length > 1) {
                textareaConsequenciasRefs.current.reverse()[0].focus()
            }
            textareaConsequenciasRefs.current.reverse()[0].scrollIntoView({behavior: 'smooth'})
        }
    }, [itemRisk.consequencias.length])
    
    useEffect(()=> {
        if(listRef.current) {
            if(itemRisk.acoes.length > 1) {
                textareaAcoesRefs.current.reverse()[0].focus()
            }
            textareaAcoesRefs.current.reverse()[0].scrollIntoView({behavior: 'smooth'})
        }
    }, [itemRisk.acoes.length])
    
    
    return(
        <Dialog
             onOpenChange={()=> {
                console.log('alterou estado da dialog')
             }} 
             modal={true}
        >
            <DialogTrigger asChild>
                <Button variant='outline' onClick={()=> setStateScrollBar(!stateScrollBar)} className="bg-inherit hover:bg-lime-400">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent 
                id={`${itemRisk.risco}`}
                onPointerDownOutside={element=> {element.preventDefault()}}
            >
                <DialogHeader>
                    <h1 className="mt-3 bg-gray-100 text-green-900 p-2 font-bold text-center rounded-md">{itemRisk.risco.toUpperCase()}</h1>
                </DialogHeader>

                <div id="scrollAreaListaDeRiscos" ref={listRef} className="overflow-y-auto max-h-[500px] pb-3 pr-1">
                    <div className="flex justify-between items-center sticky top-0 rounded-t-2xl bg-gray-200 p-2">
                        <p className="text-base md:text-sm font-bold select-none">Fotos</p>
                        <div id='addImageSection' className="flex bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer">
                            <Plus className="w-3 h-3" />
                            <Input 
                                className="w-4 h-3 ml-[-12px] mr-[-14px] cursor-pointer"
                                style={{opacity: 0}} 
                                onClick={()=> handleSelectImage(indexRisk)} 
                                multiple={false} 
                                type="file" 
                                maxLength={1} 
                                accept="image/*" 
                                id={`imageInput${indexRisk}`}
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-b-2xl py-2">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                            {
                                itemRisk.images?.map((image, indexImage) => (
                                    <div key={indexImage} className="flex flex-col">
                                        <ButtonDelete onDelete={()=> {onDeleteImage(indexRisk, indexImage)}} />
                                        <div className="flex flex-col bg-gray-200 m-3 px-2 py-1 rounded-md">
                                            <Image key={indexImage} alt="" className="w-[140px] h-[80px] mt-1 mb-1" src={image} width={150} height={90}/>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                !itemRisk.images.length && <p className="flex gap-2 items-center select-none text-base md:text-sm"><ImageOff className="w-4 h-4" />Nenhuma foto adicionada</p>
                            }
                        </div>
                    </div>

                    <div className="flex justify-between items-center sticky top-0 mt-4 bg-gray-200 rounded-t-2xl p-2">
                        <p className="text-base md:text-sm font-bold select-none">Principais consequências</p>
                        <div 
                            className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                            onClick={()=> onAddConsequencia(indexRisk)}
                        >
                            <Plus className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-b-2xl px-2">
                        {
                            itemRisk && itemRisk.consequencias?.map((consequencia, indexConsequencia)=> (
                                <div key={consequencia.id} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                                    <CircleAlert className="mt-[0.5px] min-wmd-4 min-h-4 max-w-4 max-h-4 self-center text-yellow-500" />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <textarea 
                                        id={`TEXTAREAID${consequencia.id}`}
                                        key={indexConsequencia+consequencia.id}
                                        ref={(element) => {
                                            if (element) {
                                                textareaConsequenciasRefs.current.push(element);
                                            }
                                        }}
                                        value={consequencia.value} 
                                        placeholder="Descreva a consequência aqui..."
                                        className="bg-gray-100 focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                        onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                        onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                        onChange={e => onChangeConsequencia(indexRisk, indexConsequencia, e.target.value)}
                                    />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <Trash2 
                                        className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                        onClick={()=> onDeleteConsequencia(indexRisk, indexConsequencia)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex justify-between items-center sticky top-0 mt-4 rounded-t-2xl bg-gray-200 p-2">
                        <p className="text-base md:text-sm font-bold select-none">Ações recomendadas</p>
                        <div 
                            className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                            onClick={()=> onAddAcaoRecomendada(indexRisk)}    
                        >
                            <Plus className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-b-2xl px-2">
                        {
                            itemRisk && itemRisk.acoes.map((acao, indexAcao)=> (
                                <div key={acao.id} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                                    <CircleCheckBig className="mt-[0.5px] min-w-4 min-h-4 max-w-4 max-h-4 self-center text-green-600" />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <textarea 
                                        id={`TEXTAREAID${acao.id}`}
                                        key={indexAcao+acao.id}
                                        ref={(element) => {
                                            if (element) {
                                                textareaAcoesRefs.current.push(element);
                                            }
                                        }}
                                        value={acao.value}
                                        placeholder="Descreva a ação recomendada aqui..."
                                        className="bg-gray-100 focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                        onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                        onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                        onChange={e=> onChangeAcaoRecomendada(indexRisk, indexAcao, e.target.value)}
                                    />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <Trash2 
                                        className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                        onClick={()=> onDeleteAcaoRecomendada(indexRisk, indexAcao)}    
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <DialogFooter>
                    <Button
                        className="flex p-0 bg-green-800 hover:bg-green-600" 
                        type='button' 
                        onClick={()=> {
                            
                            
                        }}    
                    >
                        <DialogClose className="flex flex-1 w-full h-full rounded-md items-center justify-center px-4" onClick={e => {
                            if(validateCompletionOfConsequencesOrRecommendedActions(itemRisk.consequencias)?.status && validateCompletionOfConsequencesOrRecommendedActions(itemRisk.acoes)?.status) {    
                                console.log('Preenchimento OK!')
                            } else {
                                e.preventDefault()
                                if(validateCompletionOfConsequencesOrRecommendedActions(itemRisk.consequencias).emptyItemsList.length > 0) {
                                    validateCompletionOfConsequencesOrRecommendedActions(itemRisk.consequencias).emptyItemsList.reverse().map(itemList => {
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-red-400')
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-[2px]')
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.focus()
                                        setTimeout(() => {
                                            document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-red-400')
                                            document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-[2px]')    
                                        }, 5000);
                                    })
                                }

                                if(validateCompletionOfConsequencesOrRecommendedActions(itemRisk.acoes).emptyItemsList.length > 0) {
                                    validateCompletionOfConsequencesOrRecommendedActions(itemRisk.acoes).emptyItemsList.reverse().map(itemList => {
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-red-400')
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-[2px]')
                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.focus()
                                        setTimeout(() => {
                                            document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-red-400')
                                            document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-[2px]')    
                                        }, 5000);
                                    })
                                }

                                setIsInvalidatedFilling(true)

                                setTimeout(() => {
                                    setIsInvalidatedFilling(false)
                                }, 3000);
                                console.log('Erro ao adicionar o risco')
                            }
                        }}>
                        Concluir alterações
                        </DialogClose>
                        
                    </Button>
                </DialogFooter>
                {
                    isInvalidatedFilling && <AlertNotification text="Preencha todos os campos!" />
                }
            </DialogContent>
        </Dialog>
    )
}