import { CircleCheckBig, ImageOff, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { ButtonDelete } from "../ButtonDelete";
import Image from "next/image";
import { Separator } from "../ui/separator";
import CustomSelect from "../CustomSelect";
import { DataContext } from "@/lib/datacontext";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import convertToBase64 from "@/lib/convert-base64";
import { RiskProps } from "@/lib/types";
import { Button } from "../ui/button";
import { uuid } from "uuidv4";

interface MyModalDialogProps {
    children? :ReactNode
    indexRisk :number
    itemRisk :RiskProps
    setItemRisk :Dispatch<SetStateAction<RiskProps | undefined>>
    handleCancelar :()=> void
    handleContinue :()=> void
}

export default function MyModalDialog({
    children,
    indexRisk,
    itemRisk,
    setItemRisk,
    handleCancelar,
    handleContinue
} :MyModalDialogProps) {

    const textareaAcoesRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaConsequenciasRefs = useRef<HTMLTextAreaElement[]>([])
    const listRef = useRef<HTMLDivElement>(null)
    const [stateScrollBar, setStateScrollBar] = useState(false)


    function handleSelectImage(indexRisk :number) {
        const img = document.getElementById(`imageInput${indexRisk}`)
        
        const listener = function(event :Event){
            
            const input = event.target as HTMLInputElement
            if(input.files && input.files.length > 0) {
                const file = input.files[0]
            
                convertToBase64(file)
                .then(base64String => {
                    handleAddImageOnListRisks(base64String)        
                })
                .catch(error => {
                    console.error('Erro ao converter a imagem: ', error)
                })
            }
        }

        if(img) {
            img.addEventListener('change', listener, {once: true})
        }else{
            console.log('negativo para img')
        }
    }

    function handleAddImageOnListRisks(image :unknown) {
        if(itemRisk) {
            const newListImages = [...itemRisk.images]
            newListImages.push(image as string)
            
            setItemRisk({
                ...itemRisk,
                images: newListImages
            })
        }
    }

    function handleDeleteImageOfListRiscks(indexImage :number) {
        if(itemRisk && itemRisk.images.length) {
            const newListImages = [...itemRisk.images]
            newListImages.splice(indexImage, 1)
            setItemRisk({
                ...itemRisk,
                images: newListImages
            })
        }
    }  

    function handleAddConsequence() {
        if(itemRisk && itemRisk.consequencias.length < 5) {
            const newConsequecias = [...itemRisk.consequencias]
            newConsequecias.push({id: uuid(), value: '', corDoGrupoDeRisco: ''})
            setItemRisk({
                ...itemRisk,
                consequencias: newConsequecias
            })
        }
    }

    function handleAddAcaoRecomendada() {
        if(itemRisk && itemRisk.acoes.length < 5) {
            const newActions = [...itemRisk.acoes]
            newActions.push({id: uuid(), value: ''})
            setItemRisk({
                ...itemRisk,
                acoes: newActions
            })
        }
    }

    function handleDeleteConsequence(indexConsequencia :number) {
        if(itemRisk && itemRisk.consequencias.length > 1) {
            const newConsequencias = [...itemRisk.consequencias]
            newConsequencias.splice(indexConsequencia, 1)
            setItemRisk({
                ...itemRisk,
                consequencias: newConsequencias
            })
        }
    }

    function handleDeleteAction(indexAction :number) {
        if(itemRisk && itemRisk.acoes.length > 1) {
            const newActions = [...itemRisk.acoes]
            newActions.splice(indexAction, 1)
            setItemRisk({
                ...itemRisk,
                acoes: newActions
            })
        }
    }

    function handleChangeConsequencia(indexConsequencia :number, newValue :string) {
        const newConsequencias = [...itemRisk.consequencias]
        let updatedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)

        newConsequencias[indexConsequencia].value = updatedValue

        setItemRisk({
            ...itemRisk,
            consequencias: newConsequencias
        })
    }

    function handleChangeAcaoRecomendada(indexAction :number, newValue :string) {
        const newActions = [...itemRisk.acoes]
        let updatedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)

        newActions[indexAction].value = updatedValue

        setItemRisk({
            ...itemRisk,
            acoes: newActions
        })
    }

    function handleColorGroupConsequenceChange(index :number, newValue :string) {
        if(itemRisk) {
            const newConsequeces = [...itemRisk.consequencias]
            const newConsequence = newConsequeces[index]
            newConsequence.corDoGrupoDeRisco = newValue
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
        <div className="fixed inset-0 z-50 w-[100vw] min-h-dvh bg-black/80 flex items-center justify-center">
            
            <div className="flex flex-col justify-start gap-3 p-2 w-full max-w-2xl h-[670px] bg-white rounded-md">
                <div className="w-full">
                    <h1 className="flex flex-col gap-3 bg-gray-100 text-green-900 p-2 font-bold text-center rounded-md">{itemRisk.risco.toUpperCase()}</h1>
                </div>

                <div id="scrollAreaListaDeRiscos" ref={listRef} className="flex-grow overflow-y-auto max-h-[670px] rounded-2xl pb-3 pr-1 custom-scrollbar">
                    <div className="flex justify-between items-center sticky top-0 rounded-t-xl bg-gray-200 p-2">
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

                    <div className="bg-gray-100 rounded-b-xl py-2">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                            {
                                itemRisk.images?.map((image, indexImage) => (
                                    <div key={indexImage} className="flex flex-col">
                                        <ButtonDelete onDelete={()=> {handleDeleteImageOfListRiscks(indexImage)}} />
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

                    <div className="flex justify-between items-center sticky top-0 mt-4 bg-gray-200 rounded-t-xl p-2">
                        <p className="text-base md:text-sm font-bold select-none">Principais consequências</p>
                        <div 
                            className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                            onClick={()=> handleAddConsequence()}
                        >
                            <Plus className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-b-xl px-2">
                        {
                            itemRisk && itemRisk.consequencias?.map((consequencia, indexConsequencia)=> (
                                <div key={consequencia.id} className="flex h-full p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                                    
                                    <CustomSelect id={`COLORGROUPRISCID${consequencia.id}`}
                                        handleColorGroupConsequence={handleColorGroupConsequenceChange} 
                                        indexConsequence={indexConsequencia}
                                        valorSelecionado={consequencia.corDoGrupoDeRisco}
                                    />
                                    
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <textarea 
                                        id={`TEXTAREAID${consequencia.id}`}
                                        key={indexConsequencia}
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
                                        onChange={e => handleChangeConsequencia(indexConsequencia, e.target.value)}
                                    />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <Trash2 
                                        className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                        onClick={()=> handleDeleteConsequence(indexConsequencia)}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex justify-between items-center sticky top-0 mt-4 rounded-t-xl bg-gray-200 p-2">
                        <p className="text-base md:text-sm font-bold select-none">Ações recomendadas</p>
                        <div 
                            className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                            onClick={()=> handleAddAcaoRecomendada()}    
                        >
                            <Plus className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-b-xl px-2">
                        {
                            itemRisk && itemRisk.acoes.map((acao, indexAcao)=> (
                                <div key={acao.id} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                                    <CircleCheckBig className="mt-[0.5px] min-w-4 min-h-4 max-w-4 max-h-4 self-center text-green-600" />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <textarea 
                                        id={`TEXTAREAID${acao.id}`}
                                        key={indexAcao}
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
                                        onChange={e=> handleChangeAcaoRecomendada(indexAcao, e.target.value)}
                                    />
                                    <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                    <Trash2 
                                        className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                        onClick={()=> handleDeleteAction(indexAcao)}    
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-self-end w-full justify-end items-center gap-2">
                    <Button
                        className=""
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="bg-green-800 hover:bg-green-600"
                        onClick={handleContinue}
                    >
                        Adicionar ao relatório
                    </Button>
                </div>
            </div>
        </div>
    )
}