'use client'

import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import convertToBase64 from "@/lib/convert-base64";
import { Image, Minus, Plus, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GenerateAI } from "@/lib/generate-ai";
import { createRoot } from "react-dom/client";
import AlertNotification from "@/components/AlertNotification";
import ListUploadedImages from "@/components/ListUploadedImages";
import { ok } from "assert";

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

    const [prompt, setPrompt] = useState<string>('')
    const [code, setCode] = useState<RiskProps>()
    const [formEditable, setFormEditable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageNameList, setImageNameList] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [errorNameFile, setErrorNameFile] = useState(false)

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
        setImageNameList([])
    }

    function handleClearCode() {
        setCode(undefined)
    }

    function handleAddImage(image :string) {
        if(code) {
            const newImages = code.images //Alterado de [...code.images]
            newImages.push(image)

            setCode({
                ...code,
                images: newImages
            })
        }
    }

    function handleRemoveImageNameList(imageName :string) {
        if(imageNameList) {
            const newImageNameList = [...imageNameList]
            const indexImage = newImageNameList.findIndex(function(e) {
                if(e === imageName){
                    return true
                }
            })

            newImageNameList.splice(indexImage, 1)
            setImageNameList(newImageNameList)
            handleRemoveImage(code?.images[indexImage] as string)
        }
    }

    function handleRemoveImage(imageName :string) {
        if(code) {
            const newImages = code.images
            const indexImage = newImages.findIndex(function(e){
                if(e === imageName){
                    return true
                }
            })
            newImages.splice(indexImage, 1)
            setCode(
                {
                    ...code,
                    images: newImages
                }
            )
        }
    }

    function addFileImageItem(imageItem :object) {
        if(imageNameList){
            setImageNameList(prevItems => [...prevItems, imageItem.name])
        }
    }

    function newInputFile() {
        const containerNewInput = document.createElement('div')
        document.getElementById('addImageSection')?.appendChild(containerNewInput)
        const root = createRoot(containerNewInput)

        root.render(
            <div>
                <Input 
                    style={{opacity: 0}} 
                    onChange={e => {
                        const file = e.target?.files[0]

                        convertToBase64(file)
                        .then(base64String => {
                            addFileImageItem(file)

                            handleAddImage(base64String)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }} 
                    multiple={false} 
                    type="file" 
                    maxLength={1} 
                    accept="image/*" 
                    id="imageInput"
                />
            </div>
        )
    }

    function handleSelectImage() {
         
        const img = document.getElementById('imageInput')
        
        if(img) {
            img.addEventListener('change', (event) => {

                const file = event.target?.files[0]

                convertToBase64(file)
                .then(base64String => {

                    addFileImageItem(file)
                    handleAddImage(base64String)
                    
                    if(img) {
                        newInputFile()
                        img.remove()
                    }
                    
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
            const response = await GenerateAI(prompt)
            const data = await response?.json()

            if(response?.ok) {
                setCode(data)
                setIsLoading(false)
            }else {

                setIsLoading(false)
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000);
            }
        }catch(error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000);
            setIsLoading(false)
            console.log('Erro: ', error)
        }
        //
        // try {
        //     const response = await fetch('../../api/generate', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({body: prompt}),
        //     })
    
        //     const data = await response.json()


        //     if(response.ok) {
        //         setCode(data)
        //         setIsLoading(false)
        //     }else{
        //         console.log('Algo deu errado!')
        //     }

        // }catch(error) {
        //     console.log('Error: ', error)
        // }
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


    return(
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-lg">Análise de Risco</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col text-left gap-2">
                    <div className="space-y-6">
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <div className="flex flex-row gap-2">
                                <TriangleAlert className="text-yellow-500"/>
                                <label className="font-bold">Situação de risco</label>
                            </div>
                            
                            <Input 
                                id="prompt"
                                name="prompt"
                                disabled={formEditable}
                                className="grid-w-full items-center gap-1.5 text-base md:text-sm"
                                type="text" 
                                placeholder="Descreva a situação de risco identificada..."  
                                value={prompt}
                                onChange={(e)=> setPrompt(e.target.value)}
                            />
                            
                            <Button formAction={()=>{handleGenerate(); handleLoadingIndicator()}} className=" bg-green-600 hover:bg-green-400 text-base md:text-sm">Analisar situação de risco com IA</Button>
                            {isLoading && <LoadingIndicator />}
                            {error && <AlertNotification text="Algo deu errado! Por favor, tente novamente."/>}
                        </div>
                    </div>
                    <div className="space-y-6">
                        
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            
                            {
                                code && <div className="grid w-full max-w-md items-center gap-1.5">
                                            <Separator className="my-4"/>

                                            <div id="addImageSection" className=" bg-green-600 hover:bg-green-400 rounded-md h-9 flex items-center justify-center">
                                                <p className="text-white text-base md:text-sm select-none max-w-fit" style={{position: 'absolute'}}>Adicionar foto</p>
                                                <Input style={{opacity: 0}} onClick={handleSelectImage} multiple={false} type="file" maxLength={1} accept="image/*" id="imageInput"/>
                                            </div>
                                            
                                            <ListUploadedImages items={imageNameList} onDeleteItem={handleRemoveImageNameList}/> 
                                        </div>
                            }

                            {
                                code !== undefined &&   <>
                                                            <Separator className="my-4"/>
                                                            <div className="flex flex-row justify-between items-center">
                                                                <p className="font-bold text-base md:text-sm">{`Principais consequências ${formEditable ? '(Máx. 5)' : ''}`}</p>
                                                                {formEditable && <Button formAction={()=> handleAddConsequence()} className="w-8 h-8 rounded-full bg-transparent hover:bg-gray-200 border-none shadow-none"><Plus className=" text-emerald-700" /></Button>}
                                                            </div>
                                                        </>
                            }

                            {
                                code !== undefined 
                                ? 
                                code.consequencias.map((item, index)=>(
                                    !formEditable && <p className="text-base md:text-sm" key={index}>{`${index + 1}. ${item}`}</p>
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
                                                            className="text-base md:text-sm"
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
                                                <p className="font-bold text-base md:text-sm">{`Ações recomendadas ${formEditable ? '(Máx. 5)' : ''}`}</p>
                                                {formEditable && <Button formAction={()=> handleAddAction()} className="w-8 h-8 rounded-full bg-transparent hover:bg-gray-200 border-none shadow-none"><Plus className=" text-emerald-700" /></Button>}
                                            </div>
                                        </>
                            }
                            {
                                code !== undefined
                                ?
                                code.acoes.map((item, index)=>(
                                    !formEditable && <p className="text-base md:text-sm" key={index}>{`${index + 1}. ${item}`}</p>
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
                                                            className="text-base md:text-sm"
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
                                    prompt && <Button className="text-base md:text-sm" disabled={formEditable} onClick={()=>{handleClearPrompt(); handleClearCode()}}>Limpar</Button>
                                }
                                {
                                    formEditable && <Button className="text-base md:text-sm" onClick={handleCancelEdit}>Salvar alterações</Button>
                                }
                                {
                                    !formEditable && <Button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-300 text-base md:text-sm">Editar</Button>
                                }
                                
                                <Button onClick={()=>{ console.log(code); handleSaveRisk(); handleClearPrompt(); handleClearCode()}} disabled={formEditable} className="bg-green-600 hover:bg-green-400 text-base md:text-sm">Salvar</Button>
                            </>
                }
            </CardFooter>
        </Card>
    )
}