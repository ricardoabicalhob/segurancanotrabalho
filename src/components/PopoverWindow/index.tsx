import { ImageOff, Plus, X } from "lucide-react"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import Image from "next/image"
import { Button } from "../ui/button"
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis"
import { useEffect, useLayoutEffect, useRef } from "react"
import convertToBase64 from "@/lib/convert-base64"
import { ButtonDelete } from "../ButtonDelete"
import { ButtonRoundedAdd } from "../ButtonRoundedAdd"
import { text } from "stream/consumers"

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
    const textareaRisco = useRef<HTMLTextAreaElement>(null)

    useEffect(()=>{
        if(textareaConsequenciasRefs.current){
            setTimeout(() => {
                textareaConsequenciasRefs.current.forEach(textarea => {
                    if(textarea.value !== ''){
                        textarea.style.height = '36px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                    }
                })    
            }, 100);
        }
    }, [textareaConsequenciasRefs.current[0]?.style.height])

    useEffect(()=>{
        if(textareaAcoesRefs.current){
            setTimeout(() => {
                textareaAcoesRefs.current.forEach(textarea => {
                    if(textarea.value !== ''){
                        textarea.style.height = '36px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                    }
                })    
            }, 100);
        }
    }, [textareaAcoesRefs.current[0]?.style.height])

    useEffect(()=>{
        setTimeout(() => {
            if(textareaRisco.current){
                textareaRisco.current.style.height = 'auto'
                textareaRisco.current.style.height = textareaRisco.current.scrollHeight + 'px'
            }
        }, 100);
    }, [textareaRisco.current?.style.height])

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
                {`${indexRisk + 1}. `}
                <textarea 
                    ref={textareaRisco}
                    onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}} 
                    onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}}
                    onChange={(e)=>onChangeRisco(indexRisk, e.target.value)} 
                    className="bg-gray-100 w-full min-h-9 overflow-y-hidden resize-none p-1 pl-2 ml-1 rounded-lg" 
                    value={`${itemRisk.risco}`}
                />
            </p>
            
            <Separator />

            <div className="flex flex-row items-center justify-between">
                <p className="font-bold my-4 text-base md:text-sm">Fotos</p>
                <div id={`addImageSection${indexRisk}`} className="flex items-center justify-center bg-green-600 hover:bg-green-400 rounded-full w-fit h-6 px-2">
                    <Plus className="text-white w-4 h-4" />
                    <p className="text-xs text-white select-none">foto</p>
                    <Input 
                        className="absolute w-6" 
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
            
            <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                {
                    itemRisk.images?.map((image, indexImage) => (
                        <div key={indexImage} className="flex flex-col">
                            <ButtonDelete onDelete={()=> {onDeleteImage(indexRisk, indexImage)}} />
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
                
                <ButtonRoundedAdd onAdd={()=> onAddConsequencia(indexRisk)} text="consequência"/>
            </div>
            {
                itemRisk.consequencias?.map((consequencia, indexConsequencia)=>(
                    <div key={indexConsequencia} className="flex flex-col">
                        <ButtonDelete onDelete={()=> onDeleteConsequencia(indexRisk, indexConsequencia)}/>

                        <div className="flex flex-row justify-between mb-2 ml-3 mt-3 mr-3 p-1 items-center">
                            <p className="text-base md:text-sm">{`${indexConsequencia + 1}. `}</p>
                            <textarea
                                key={indexConsequencia}
                                ref={(element) => {
                                    if (element) {
                                        textareaConsequenciasRefs.current.push(element);
                                    }
                                }}
                                value={`${consequencia}`}
                                className="h-auto bg-gray-100 rounded-lg ml-1 pl-2 p-1 w-full min-h-9 resize-none overflow-y-hidden content-center text-base md:text-sm"  
                                onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}} 
                                onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}}
                                onChange={e => onChangeConsequencia(indexRisk, indexConsequencia, e.target.value)} 
                            />
                        </div>
                    </div>
                ))
            }

            <Separator />

            <div className="flex flex-row items-center justify-between">
                <p className="font-bold my-4 text-base md:text-sm">Ações recomendadas</p>

                <ButtonRoundedAdd onAdd={()=> onAddAcaoRecomendada(indexRisk)} text="ação"/>
            </div>
            {
                itemRisk.acoes?.map((acao, indexAcao)=>(
                    <div key={indexAcao} className="flex flex-col">
                        <ButtonDelete onDelete={()=> {onDeleteAcaoRecomendada(indexRisk, indexAcao)}}/>

                        <div className="flex flex-row justify-between mb-2 ml-3 mt-3 mr-3 p-1 items-center">
                            <p className="text-base md:text-sm">{`${indexAcao + 1}. `}</p>
                            <textarea 
                                key={indexAcao}
                                ref={(element) => {
                                    if (element) {
                                        textareaAcoesRefs.current.push(element);
                                    }
                                }}
                                value={`${acao}`}
                                className={`h-auto bg-gray-100 rounded-lg ml-1 pl-2 p-1 w-full min-h-9 resize-none overflow-y-hidden content-center text-base md:text-sm`} 
                                onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}}
                                onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}}  
                                onChange={e => onChangeAcaoRecomendada(indexRisk, indexAcao, e.target.value)} 
                            />
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
                popoverTarget={`${indexRisk}. ${itemRisk.risco}`}
            >
                Concluir
            </Button>
            
        </div>
    )
}