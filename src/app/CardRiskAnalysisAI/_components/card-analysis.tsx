'use client'

import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import convertToBase64 from "@/lib/convert-base64";
import { Minus, Plus, TriangleAlert } from "lucide-react";
import { useState } from "react";

export type RiskProps = {
    risco :string
    consequencias :string[]
    acoes :string[]
    images :string[]
}

interface CardRiskAnalysisAIProps {
    onAddRisk :(risk :RiskProps)=>void
}

export default function CardRiskAnalysisAI({onAddRisk} :CardRiskAnalysisAIProps) {

    const [prompt, setPrompt] = useState('')
    const [code, setCode] = useState<RiskProps>()
    const [formEditable, setFormEditable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imgSelected, setImgSelected] = useState(false)

    function validationForm() {
        let result = false

        if(code) {
            code.consequencias.find(function(value) {
                if(value === '') {
                    result = true
                }
            })

            code.acoes.find(function(value) {
                if(value === '') {
                    result = true
                }
            })
        }else{
            console.log('code é undefined')
        }

        return result
    }

    function handleLoadingIndicator() {
        if(prompt) {
            setIsLoading(true)
        }
    }

    function handleEdit() {
        setFormEditable(true)
    }

    function handleCancelEdit() {
        if(!validationForm()) {
            setFormEditable(false)
        }
    }

    function handleClearPrompt() {
        setPrompt('')
    }

    function handleClearCode() {
        setCode(undefined)
    }

    function handleClearImage() {
        setImgSelected(false)
    }

    function handleAddImage(image :string) {
        if(code) {
            const newImages = [...code.images]
            newImages.push(image)

            setCode({
                ...code,
                images: newImages
            })
        }
    }

    function handleSelectImage() {
         
        const img = document.getElementById('imageInput')
        
        if(img) {
            img.addEventListener('change', (event) => {

                const file = event.target?.files[0]
                convertToBase64(file)
                .then(base64String => {
                    // const img = document.createElement('img')
                    // img.src = base64String as any
                    // document.getElementById('imgBox')?.appendChild(img)

                    const name = document.createElement('li')
                    name.innerText = file.name
                    name.className = 'bg-gray-200 rounded-md p-2 w-full select-none'
                    document.getElementById('nameFile')?.appendChild(name)
                    
                    handleAddImage(base64String)
                    
                    //setImgSelected(true)
                })
                .catch(error => {
                    console.error('Erro ao converter a imagem: ', error)
                })
            
            })
            
        }
    }


    function handleSaveRisk() {
        if(code) {
            onAddRisk(code)       
        }else {
            console.log('Algo deu errado! Por favor tente novamente.')
        }
    }

    const handleGenerate = async ()=> {
        
        try {
            const response = await fetch('../api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({body: prompt}),
            })
    
            const data = await response.json()


            if(response.ok) {
                setCode(data)
                setIsLoading(false)
            }else{
                console.log('Algo deu errado!')
            }

        }catch(error) {
            console.log('Error: ', error)
        }
    }

    function handleDeleteConsequence(index :number) {
        if(code) {
            if(code.consequencias.length > 1) {
                const newConsequences = [...code.consequencias]
                newConsequences.splice(index, 1)

                setCode({
                    ...code,
                    consequencias: newConsequences
                })
            }
        }
    }

    function handleDeleteAction(index :number) {
        if(code) {
            if(code.acoes.length > 1) {
                const newActions = [...code.acoes]
                newActions.splice(index, 1)

                setCode({
                    ...code,
                    acoes: newActions
                })
            }
        }
    }

    function handleAddConsequence() {
        if(code) {
            if(code.consequencias.length < 5) {
                const newConsequences = [...code.consequencias]
                newConsequences.push('')

                setCode({
                    ...code,
                    consequencias: newConsequences
                })
            }
        }
    }

    function handleAddAction() {
        if(code) {
            if(code.acoes.length < 5) {
                const newActions = [...code.acoes]
                newActions.push('')

                setCode({
                    ...code,
                    acoes: newActions
                })
            }
        }
    }

    function handleConsequenceChange(index :number, newValue :string) {
        if(code) {
            const newConsequences = [...code.consequencias]
            newConsequences[index] = newValue

            setCode({
                ...code,
                consequencias: newConsequences
            })
        }
    }

    function handleActionChange(index :number, newValue :string) {
        if(code) {
            const newActions = [...code.acoes]
            newActions[index] = newValue

            setCode({
                ...code,
                acoes: newActions
            })
        }
    }

    // function handleDeleteElement(index :number) {
    //     if(code) {
    //         code.consequencias.splice(index, 1)
    //     }
    // }

    return(
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-lg">Análise de Risco</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col text-left gap-2">
                    <div className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className="flex flex-row gap-2">
                                <TriangleAlert className="text-yellow-500"/>
                                <label className="font-bold">Situação de risco</label>
                            </div>
                            
                            <Input 
                                disabled={formEditable}
                                className="grid-w-full items-center gap-1.5"
                                type="text" 
                                placeholder="Descreva a situação de risco identificada..."  
                                value={prompt}
                                onChange={(e)=> setPrompt(e.target.value)}
                            />
                            
                            <Button formAction={()=>{handleGenerate(); handleLoadingIndicator()}} className="hover:bg-zinc-600">Analisar situação de risco com IA</Button>
                            {isLoading && <LoadingIndicator />}
                        </div>
                    </div>
                    <div className="space-y6">
                        
                        <div className="grid w-full max-w-sm items-center gap-2">
                            
                            {
                                code && <>
                                            <Separator className="my-4"/>
                                            <Label className="font-bold" >Foto</Label>
                                            <Input onClick={() => handleSelectImage()} disabled={imgSelected} type="file" maxLength={1} accept="image/*" id="imageInput"/>
                                            <ul className="flex flex-col gap-2 p-2" id="nameFile">

                                            </ul>
                                            {/* <Card className="flex flex-col py-6">
                                                <CardContent className="flex flex-col gap-2 p-2" id="nameFile"></CardContent>
                                            </Card> */}
                                            <Separator className="my-4"/>
                                            <div className="flex flex-row justify-between items-center">
                                                <p className="font-bold">{`Principais consequências ${formEditable ? '(Máx. 5)' : ''}`}</p>
                                                {formEditable && <Button formAction={()=> handleAddConsequence()} className="w-8 h-8 rounded-full bg-transparent hover:bg-gray-200 border-none shadow-none"><Plus className=" text-emerald-700" /></Button>}
                                            </div>
                                        </>
                            }

                            {
                                code !== undefined 
                                ? 
                                code.consequencias.map((item, index)=>(
                                    !formEditable && <p key={index}>{`${index + 1}. ${item}`}</p>
                                ))
                                :
                                ''
                            }
                            {
                                code !== undefined 
                                ? 
                                code.consequencias.map((item, index)=>(
                                    formEditable && <div key={index} className="flex flex-row items-center gap-2">
                                                        <Input 
                                                            key={index}
                                                            type="text"
                                                            value={code.consequencias[index]}
                                                            onChange={e => handleConsequenceChange(index, e.target.value)}
                                                        />
                                                        <Button formAction={()=> handleDeleteConsequence(index)} className="rounded-full w-8 h-8 bg-transparent border-none shadow-none hover:bg-gray-200"><Minus className="text-red-700"/></Button>
                                                    </div>
                                ))
                                :
                                ''
                            }


                            {
                                code && <>
                                            <Separator className="my-4"/>
                                            <div className="flex flex-row justify-between items-center">
                                                <p className="font-bold">{`Ações recomendadas ${formEditable ? '(Máx. 5)' : ''}`}</p>
                                                {formEditable && <Button formAction={()=> handleAddAction()} className="w-8 h-8 rounded-full bg-transparent hover:bg-gray-200 border-none shadow-none"><Plus className=" text-emerald-700" /></Button>}
                                            </div>
                                        </>
                            }
                            {
                                code !== undefined
                                ?
                                code.acoes.map((item, index)=>(
                                    !formEditable && <p key={index}>{`${index + 1}. ${item}`}</p>
                                ))
                                :
                                ''
                            }
                            {
                                code !== undefined
                                ?
                                code.acoes.map((item, index)=>(
                                    formEditable && <div key={index} className="flex flex-row items-center gap-2">
                                                        <Input
                                                            key={index}
                                                            type="text"
                                                            value={code.acoes[index]}
                                                            onChange={e=> handleActionChange(index, e.target.value)}
                                                        />
                                                        <Button formAction={()=> handleDeleteAction(index)} className="rounded-full w-8 h-8 bg-transparent border-none shadow-none hover:bg-gray-200"><Minus className="text-red-700"/></Button>
                                                    </div>
                                ))
                                :
                                ''
                            }
                        </div>
                    </div>
                    {
                        code && <Separator className="my-2"/>
                    }
                </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                {
                    code && <>
                                {
                                    prompt && <Button disabled={formEditable} onClick={()=>{handleClearPrompt(); handleClearCode(); handleClearImage()}}>Limpar</Button>
                                }
                                {
                                    formEditable && <Button onClick={handleCancelEdit}>Salvar alterações</Button>
                                }
                                {
                                    !formEditable && <Button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-300">Editar</Button>
                                }
                                
                                <Button onClick={()=>{handleSaveRisk(); handleClearPrompt(); handleClearCode(); }} disabled={formEditable} className="bg-emerald-600 hover:bg-emerald-400">Salvar</Button>
                            </>
                }
            </CardFooter>
        </Card>
    )
}