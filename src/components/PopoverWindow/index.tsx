import { CircleAlert, CircleCheckBig, ImageOff, Plus, Trash2, X } from "lucide-react"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import Image from "next/image"
import { Button } from "../ui/button"
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import convertToBase64 from "@/lib/convert-base64"
import { ButtonDelete } from "../ButtonDelete"

interface PopoverWindowProps {
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

export default function PopoverWindow( { indexRisk, itemRisk, isEditableRisk, setIsEditableRisk, onChangeRisco, onAddImage, onDeleteImage, onAddConsequencia, onDeleteConsequencia, onChangeConsequencia, onAddAcaoRecomendada, onDeleteAcaoRecomendada, onChangeAcaoRecomendada } :PopoverWindowProps ) {
    
    const textareaAcoesRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaConsequenciasRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaRiscoRefs = useRef<HTMLTextAreaElement[]>([])
    const [isLoadingConsequencia, setIsLoadingConsequencia] = useState(true)

    useEffect(()=>{
        if(textareaConsequenciasRefs.current){
            
            setTimeout(() => {
                textareaConsequenciasRefs.current.forEach(textarea => {
                    if(textarea.value !== ''){
                        textarea.style.height = '36px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })    
            }, 100);
        }
    }, [textareaConsequenciasRefs.current[0]?.style.height])

    useEffect(()=>{
        if(textareaAcoesRefs.current){
            setTimeout(() => {
                textareaAcoesRefs.current.forEach((textarea, index) => {
                    if(textarea.value !== ''){
                        textarea.style.height = '36px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })    
            }, 100);
        }
    }, [textareaAcoesRefs.current[0]?.style.height])

    useEffect(()=>{
        if(textareaRiscoRefs.current) {
            setTimeout(() => {
                textareaRiscoRefs.current.forEach(textarea => {
                    if(textarea.value !== '') {
                        textarea.style.height = '60px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })
            }, 100);
            
        }
    }, [textareaRiscoRefs.current[0]?.style.height])

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

    return (
        <div className="w-[360px] md:w-[500px] h-auto p-6 m-6 justify-self-center rounded-lg shadow-lg border-2" id={`${indexRisk}. ${itemRisk.risco}`} popover='manual'>
            <p 
                className="flex flex-row items-center font-bold mb-4"
            >
                {/* {`${indexRisk + 1}. `} */}
                <textarea 
                    ref={(element) => {
                        if (element) {
                            textareaRiscoRefs.current.push(element);
                        }
                    }}
                    onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "66px"; target.style.height = target.scrollHeight + 'px'}} 
                    onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "66px"; target.style.height = target.scrollHeight + 'px'}}
                    onChange={(e)=>onChangeRisco(indexRisk, e.target.value.toUpperCase())} 
                    className="w-full bg-gray-100 text-green-900 border-[1px] border-green-900 p-2 font-bold text-justify mb-4 rounded-md overflow-hidden resize-none" 
                    value={`${itemRisk.risco}`}
                />
            </p>
            
            <div className="flex justify-between items-center rounded-t-2xl bg-gray-200 p-2">
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

            <div className="flex justify-between items-center mt-4 bg-gray-200 rounded-t-2xl p-2">
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
                    itemRisk && itemRisk.consequencias?.map((consequencia, index)=> (
                        <div key={index} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                            <CircleAlert className="mt-[0.5px] min-wmd-4 min-h-4 max-w-4 max-h-4 self-center text-yellow-500" />
                            <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                            <textarea 
                                key={index}
                                ref={(element) => {
                                    if (element) {
                                        textareaConsequenciasRefs.current.push(element);
                                    }
                                }} 
                                placeholder="Descreva a consequência aqui..."
                                className="bg-gray-100 focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                onChange={e => onChangeConsequencia(indexRisk, index, e.target.value)}
                            >
                                {consequencia}
                            </textarea>
                            <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                            <Trash2 
                                className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                onClick={()=> onDeleteConsequencia(indexRisk, index)}
                            />
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-between items-center mt-4 rounded-t-2xl bg-gray-200 p-2">
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
                    itemRisk && itemRisk.acoes.map((acao, index)=> (
                        <div key={index} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                            <CircleCheckBig className="mt-[0.5px] min-w-4 min-h-4 max-w-4 max-h-4 self-center text-green-600" />
                            <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                            <textarea 
                                key={index}
                                ref={(element) => {
                                    if (element) {
                                        textareaAcoesRefs.current.push(element);
                                    }
                                }}
                                placeholder="Descreva a ação recomendada aqui..."
                                className="bg-gray-100 focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                onChange={e=> onChangeAcaoRecomendada(indexRisk, index, e.target.value)}
                            >
                                {acao}
                            </textarea>
                            <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                            <Trash2 
                                className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                onClick={()=> onDeleteAcaoRecomendada(indexRisk, index)}    
                            />
                        </div>
                    ))
                }
            </div>

            <Button
                className="bg-green-600 hover:bg-green-400 flex justify-self-end mt-4"
                onClick={()=>{
                    setIsEditableRisk(false)
                }}
                popoverTarget={`${indexRisk}. ${itemRisk.risco}`}
            >
                Fechar
            </Button>
            
        </div>
    )
}