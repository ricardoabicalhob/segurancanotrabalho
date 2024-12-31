import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert, CircleCheckBig, ImageOff, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { RiskProps } from "../CardRiskAnalysisAI/_components/card-analysis";
import LoadingIndicator from "@/components/LoadingIndicator";
import AlertNotification from "@/components/AlertNotification";
import { GenerateAI } from "@/lib/generate-ai";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-base64";
import { ButtonDelete } from "@/components/ButtonDelete";
import Image from "next/image";
import { uuid } from 'uuidv4'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SystemContext } from "@/lib/context/SystemContext";

interface DialogAnalysisRiskProps {
    onAddRisk :(risk :RiskProps)=>void
}

export default function DialogAnalysisRisk( { onAddRisk } :DialogAnalysisRiskProps) {

    const [prompt, setPrompt] = useState<string>('')
    const [formEditable, setFormEditable] = useState(false)
    const [risk, setRisk] = useState<RiskProps>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isFirstUpdateScrollArea, setIsFirstUpdateScrollArea] = useState(true)
    const [isFirstUpdateTextAreasHeight, setIsFirstUpdateTextAreasHeight] = useState(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const textareaAcoesRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaConsequenciasRefs = useRef<HTMLTextAreaElement[]>([])
    const [ isInvalidatedFilling, setIsInvalidatedFilling ] = useState(false)

    const { validateCompletionOfConsequencesOrRecommendedActions } = useContext(SystemContext)

    function handleLinkImages() {
        document.getElementById('buttonAnalysis')?.click()
    }

    function handleLoadingIndicator() {
        if(prompt) {
            setIsLoading(true)
        }
    }

    function handleIWantToAnalyse() {
        const risk :RiskProps = {
            risco: prompt.toUpperCase(),
            consequencias: [
                {
                    id: uuid(),
                    value: ''
                }
            ],
            acoes: [
                {
                    id: uuid(),
                    value: ''
                }
            ],
            images: []
        } 

        setRisk(risk)
    }

    function handleClearPrompt() {
        setPrompt('')

        setTimeout(() => {
            document.getElementById('prompt')?.focus()
            window.scrollTo(0 , 0)
        }, 100);
    }

    function handleClearCode() {
        setRisk(undefined)
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault()
            handleGenerate(); 
            handleLoadingIndicator()
        }
    }

    function handleDeleteConsequence(id :string) {
        setRisk((prevState) => {
            if(prevState && prevState.consequencias.length > 1) {
                const indexToRemove = prevState.consequencias.findIndex((consequencia) => consequencia.id === id)

                if(indexToRemove !== -1) {
                    const newConsequeces = [...prevState.consequencias]
                    newConsequeces.splice(indexToRemove, 1)

                    return {
                        ...prevState,
                        consequencias: newConsequeces
                    }
                }
            }
            return prevState
        })
    }

    function handleDeleteAction(id :string) {
        setRisk((prevState) => {
            if(prevState && prevState.acoes.length > 1) {
                const indexToRemove = prevState.acoes.findIndex((acao) => acao.id === id)

                if(indexToRemove !== -1) {
                    const newAcoes = [...prevState.acoes]
                    newAcoes.splice(indexToRemove, 1)

                    return {
                        ...prevState,
                        acoes: newAcoes
                    }
                }
            }
            return prevState
        })
    }

    function handleAddConsequence() {
        if(risk) {
            if(risk.consequencias.length < 5) {
                const newConsequences = [...risk.consequencias]
                newConsequences.push({id: uuid(), value: ''})

                setRisk({
                    ...risk,
                    consequencias: newConsequences
                })

            }
        }
    }

    function handleAddAction() {
        if(risk) {
            if(risk.acoes.length < 5) {
                const newActions = [...risk.acoes]
                newActions.push({id: uuid(), value: ''})

                setRisk({
                    ...risk,
                    acoes: newActions
                })
            }
        }
    }

    function handleConsequenceChange(index :number, newValue :string) {
        if(risk) {
            const newConsequences = [...risk.consequencias]
            newConsequences[index].value = newValue.charAt(0).toUpperCase() + newValue.slice(1)

            setRisk({
                ...risk,
                consequencias: newConsequences
            })
        }
    }

    function handleActionChange(index :number, newValue :string) {
        if(risk) {
            const newActions = [...risk.acoes]
            newActions[index].value = newValue.charAt(0).toUpperCase() + newValue.slice(1)

            setRisk({
                ...risk,
                acoes: newActions
            })
        }
    }

    const handleGenerate = async ()=> {

        try {
            
            if(prompt) {
                
                const response = await GenerateAI(prompt)
                const data :RiskProps = await response?.json()
                console.log(data)

                if(response?.ok) {
                    data.consequencias.map(consequencia => {
                        consequencia.id = uuid()
                    })
                    data.acoes.map(acao => {
                        acao.id = uuid()
                    })
                    setRisk(data)
                    setIsLoading(false)
                    setTimeout(() => {
                        handleLinkImages()
                    }, 100);
                }else {

                    setIsLoading(false)
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 2000);
                }

            } else {
                throw 'Descreva uma situação de risco'
            }
        }catch(error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
            setIsLoading(false)
            console.log('Erro: ', error)
        }
    }

    function handleSaveRisk() {
        if(risk) {
            const codeWithUppercaseRisco = {
                ...risk,
                risco: risk.risco.toUpperCase()
            }
            onAddRisk(codeWithUppercaseRisco)  
            handleResetUpdateStates()     
        }else {
            console.log('Algo deu errado! Por favor tente novamente.')
        }
    }

    function handleAddImage(image :string) {
        if(risk) {
            const newImages = risk.images //Alterado de [...code.images]
            newImages.push(image)

            setRisk({
                ...risk,
                images: newImages
            })
        }
    }

    function handleSelectImage() {
        const img = document.getElementById(`imageInput`)
        
        const listener = function(event){
            const file = event.target?.files[0]

            convertToBase64(file)
            .then(base64String => {
                handleAddImage(base64String as string)        
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

    function handleRemoveImage(imageName :string) {
        if(risk) {
            const newImages = risk.images
            const indexImage = newImages.findIndex(function(e){
                if(e === imageName){
                    return true
                }
            })
            newImages.splice(indexImage, 1)
            setRisk(
                {
                    ...risk,
                    images: newImages
                }
            )
        }
    }

    function handleResetUpdateStates() {
        setIsFirstUpdateScrollArea(true)
        setIsFirstUpdateTextAreasHeight(true)
    }

    
    function autoHeightTextareasAcoes() {
        if(textareaAcoesRefs.current){
            setTimeout(() => {
                textareaAcoesRefs.current.forEach(textarea => {
                    if(textarea.value !== ''){
                        textarea.style.height = '36px'
                        textarea.style.height = textarea.scrollHeight + 'px'
                        textarea.classList.add('placeholder:text-gray-400')
                    }
                })    
            }, 100);
        }
    }

    function autoHeightTextareaConsequencias() {
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
    }

    useEffect(()=> {
        if(isFirstUpdateTextAreasHeight && risk) {
            autoHeightTextareaConsequencias()
            autoHeightTextareasAcoes()
            setIsFirstUpdateTextAreasHeight(false)

        }
    }, [risk, risk?.acoes.length])

    useEffect(()=>{
        if(isFirstUpdateScrollArea && risk) {
            setTimeout(() => {
                if(scrollAreaRef.current !== null) {
                    scrollAreaRef.current.classList.add('flex-1', 'overflow-x-auto')
                    scrollAreaRef.current.classList.add('custom-scrollbar')
                    setIsFirstUpdateScrollArea(false)
                }
            }, 100);
        }
    }, [risk, scrollAreaRef.current, isFirstUpdateScrollArea])

    useEffect(()=> {
        if(scrollAreaRef.current !== null){
            if(risk && risk.consequencias.length > 1) {
                textareaConsequenciasRefs.current.reverse()[0].focus()
            }
            textareaConsequenciasRefs.current.reverse()[0].scrollIntoView({behavior: 'smooth'})
        }
    }, [risk?.consequencias.length])

    useEffect(()=> {
        if(scrollAreaRef.current !== null) {
            if(risk && risk.acoes.length > 1) {
                textareaAcoesRefs.current.reverse()[0].focus()
            }
            textareaAcoesRefs.current.reverse()[0].scrollIntoView({behavior: 'smooth'})
        }
    },[risk?.acoes.length])

    return(
        <Card className="flex flex-col justify-between min-h-full flex-1 max-w-md h-full">
            <CardHeader>
                <CardTitle className="text-lg">Análise de situação de risco</CardTitle>
            </CardHeader>

            {
                !risk 
                ?
                <CardContent className="justify-self-start flex-1">
                    <form className="flex flex-col text-left gap-2">
                        <div className="space-y-6">
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <div className="flex flex-row gap-2 items-center">
                                    <CircleAlert className="text-yellow-500 w-4 h-4"/>
                                    <label className="font-bold">Situação de risco</label>
                                </div>
                                
                                <textarea 
                                    id="prompt"
                                    name="prompt"
                                    maxLength={150}
                                    disabled={formEditable || risk ? true : false}
                                    className="grid-w-full h-auto items-center p-3 resize-none border-[1px] rounded-md gap-1.5 text-base md:text-sm overflow-y-hidden"
                                    placeholder="Descreva a situação de risco identificada..."  
                                    value={prompt}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e)=> setPrompt(e.target.value.toUpperCase())}
                                    onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "36px"; target.style.height = target.scrollHeight + 'px'}}
                                />
                                <p className="pl-[2px] mb-2 text-sm md:text-xs text-gray-700">{`${prompt.length} /150`}</p>
                                
                                <Button 
                                    disabled={prompt === ''}
                                    formAction={()=>{
                                                    handleGenerate(); 
                                                    handleLoadingIndicator()
                                                }} 
                                    className=" bg-green-800 hover:bg-green-600 text-base md:text-sm"
                                >
                                    Analisar situação de risco com IA
                                </Button>
                                <a id="buttonAnalysis" href="#addImageSection" />
                                
                                <p className="w-full text-center text-base md:text-sm">Ou</p>

                                <Button
                                    className="bg-transparent border-green-700 border-[1px] text-green-700 hover:bg-green-100"
                                    formAction={()=> handleIWantToAnalyse()}
                                    disabled={prompt === ''}
                                >
                                    Eu quero analisar
                                </Button>

                                {isLoading && <LoadingIndicator text="Analisando..." />}
                                {error && <AlertNotification text="Algo deu errado! Por favor, tente novamente."/>}
                                <Dialog>
                                    <div className="flex flex-col self-start bg-gray-100 p-2 mt-6 rounded-md overflow-y-auto">
                                        <p 
                                            className="text-sm text-start select-none antialiased"
                                        >
                                            <MessageSquare className="w-4 h-4 mb-1 justify-self-end" />
                                            A <b><i>Comissão Interna de Prevenção de Acidentes (CIPA)</i></b> tem como objetivo principal a prevenção de acidentes e doenças ocupacionais. Para cumprir essa missão, a CIPA promove&nbsp; 
                                            <DialogTrigger>                                    
                                                <p className="text-sm text-green-600 hover:text-green-400 cursor-pointer antialiased"><b>diversas ações</b></p>
                                            </DialogTrigger>
                                            .
                                        </p>
                                    </div>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="font-bold">Principais Atribuições da CIPA</DialogTitle>
                                        </DialogHeader>
                                        
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Identificar riscos nas funções ocupacionais</li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Elaborar um mapa de riscos para cada setor</li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Formular soluções para os problemas e ações preventivas</li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Promover a <b><i>Semana Interna de Prevenção de Acidentes de Trabalho (SIPAT)</i></b></li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Divulgar e promover o cumprimento das <b><i>Normas Regulamentadoras (NR)</i></b></li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="text-sm antialiased">- Requisistar cópias das <b><i>Comunicações de Acidente de Tratalho (CAT)</i></b></li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="flex text-sm antialiased">- Acompanhar a análise dos acidentes e doenças relacionadas ao trabalho</li>
                                        </ul>
                                        <ul className="flex">
                                            <li className="flex text-sm antialiased">- Propor medidas para solucionar os problemas identificados</li>
                                        </ul>
                                        <p className="text-sm antialiased">A CIPA também pode ajudar a promover a saúde do trabalhador. Para isso, é importante que os membros da CIPA estejam qualificados e engajados nas atividades de prevenção.</p>
                                        <p className="text-sm antialiased">Além disso, é importante que os trabalhadores cuidem de si e dos outros, evitando realizar tarefas de forma isolada, principalmente em áreas de risco.</p>
                                    </DialogContent>
                                    
                                </Dialog>
                            </div>
                        </div>
                        
                    </form>
                </CardContent>
                :
                <CardContent className="flex flex-col flex-1 max-h-[80vh] justify-between">
                    
                    {
                        risk && <p className="bg-gray-100 text-green-900 p-2 break-words font-bold text-center mt-6 rounded-md">{risk.risco.toLocaleUpperCase()}</p>
                    }

                    <div key={'scrollAreaRiskAnalysis'} ref={scrollAreaRef} className="flex flex-col justify-self-start flex-1 w-full pl-1 pr-3 mt-6">
                           
                            <div key={'barDialogImages'} className="flex justify-between items-center sticky top-0 rounded-t-2xl bg-gray-200 p-2">
                                <p className="text-base md:text-sm font-bold select-none">Fotos</p>
                                <div id='addImageSection' className="flex bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer">
                                    <Plus className="w-3 h-3" />
                                    <Input 
                                        className="w-4 h-3 ml-[-12px] mr-[-14px] cursor-pointer"
                                        style={{opacity: 0}} 
                                        onClick={()=> handleSelectImage()} 
                                        multiple={false} 
                                        type="file" 
                                        maxLength={1} 
                                        accept="image/*" 
                                        id={`imageInput`}
                                    />
                                </div>
                            </div>

                        <div key={'spaceImages'} className="bg-gray-100 rounded-b-2xl py-2">
                            <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                                {
                                    risk.images?.map((image, indexImage) => (
                                        <div key={indexImage} className="flex flex-col">
                                            <ButtonDelete onDelete={()=> {handleRemoveImage(image)}} />
                                            <div className="flex flex-col bg-gray-200 m-3 px-2 py-1 rounded-md">
                                                <Image key={indexImage} alt="" className="w-[140px] h-[80px] mt-1 mb-1" src={image} width={150} height={90}/>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    !risk.images.length && <p className="flex gap-2 items-center select-none text-base md:text-sm"><ImageOff className="w-4 h-4" />Nenhuma foto adicionada</p>
                                }
                            </div>
                        </div>

                        <div key={'barDialogConsequences'} className="flex justify-between items-center sticky top-0 mt-4 bg-gray-200 rounded-t-2xl p-2">
                            <p className="text-base md:text-sm font-bold select-none">Principais consequências</p>
                            <div 
                                className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                                onClick={()=> handleAddConsequence()}
                            >
                                <Plus className="w-3 h-3" />
                            </div>
                        </div>
                        
                        <div key={'listaDeConsequencias'} className="bg-gray-100 rounded-b-2xl px-2">
                            {
                                risk && risk.consequencias?.map((consequencia, indexConsequencia)=> (
                                    <div key={consequencia.id} className="flex h-auto p-2 gap-2 justify-between bg-gray-100 rounded-md border-t-[1px]">
                                        <CircleAlert className="mt-[0.5px] min-wmd-4 min-h-4 max-w-4 max-h-4 self-center text-yellow-500" />
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
                                            className="bg-transparent focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                            onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                            onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                            onChange={e => handleConsequenceChange(indexConsequencia, e.target.value)}
                                        
                                        />
                                        <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                        <Trash2 
                                            className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                            onClick={()=> handleDeleteConsequence(consequencia.id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        <div key={'barDialogAcoesRecomendadas'} className="flex justify-between items-center sticky top-0 mt-4 rounded-t-2xl bg-gray-200 p-2">
                            <p className="text-base md:text-sm font-bold select-none">Ações recomendadas</p>
                            <div 
                                className="bg-green-600 hover:bg-green-400 rounded-3xl p-1 text-xs select-none text-white cursor-pointer"
                                onClick={()=> handleAddAction()}    
                            >
                                <Plus className="w-3 h-3" />
                            </div>
                        </div>

                        <div key={'listaDeAcoesRecomendadas'} className="bg-gray-100 rounded-b-2xl px-2">
                            {
                                risk && risk.acoes.map((acao, indexAcao)=> (
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
                                            className="bg-transparent focus:bg-white text-base md:text-sm text-justify flex-1 overflow-y-hidden resize-none px-1"
                                            onInput={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                            onFocus={(e)=>{const target = e.target as HTMLTextAreaElement; target.style.height = "40px"; target.style.height = target.scrollHeight + 'px'}}
                                            onChange={e=> handleActionChange(indexAcao, e.target.value)}
                                        />
                                        <Separator orientation='vertical' className="self-center w-[0.5px] h-7 bg-gray-300" />
                                        <Trash2 
                                            className="min-w-6 min-h-6 max-w-6 max-h-6 border-[1px] self-center hover:bg-red-400 hover:text-white rounded-full p-1 cursor-pointer" 
                                            onClick={()=> handleDeleteAction(acao.id)}    
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                    <div className="flex w-full items-center gap-2 justify-end mt-6">
                        <Button 
                            className="w-fit bg-zinc-700 hover:bg-zinc-500"
                            onClick={()=> {
                                handleClearCode(); 
                                handleClearPrompt(); 
                                handleResetUpdateStates();
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            className="w-fit bg-green-800 hover:bg-green-600"
                            id="buttonSave"
                            onClick={()=>{ 
                                        if(validateCompletionOfConsequencesOrRecommendedActions(risk.consequencias)?.status && validateCompletionOfConsequencesOrRecommendedActions(risk.acoes)?.status) {
                                            handleSaveRisk(); 
                                            handleClearPrompt(); 
                                            handleClearCode()
                                        } else {

                                            if(validateCompletionOfConsequencesOrRecommendedActions(risk.consequencias).emptyItemsList.length > 0) {
                                                validateCompletionOfConsequencesOrRecommendedActions(risk.consequencias).emptyItemsList.reverse().map(itemList => {
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-red-400')
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-[1px]')
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.focus()
                                                    setTimeout(() => {
                                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-red-400')
                                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-[1px]')    
                                                    }, 5000);
                                                })
                                            }

                                            if(validateCompletionOfConsequencesOrRecommendedActions(risk.acoes).emptyItemsList.length > 0) {
                                                validateCompletionOfConsequencesOrRecommendedActions(risk.acoes).emptyItemsList.reverse().map(itemList => {
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-red-400')
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-[1px]')
                                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.focus()
                                                    setTimeout(() => {
                                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-red-400')
                                                        document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-[1px]')    
                                                    }, 5000);
                                                })
                                            }

                                            setIsInvalidatedFilling(true)

                                            setTimeout(() => {
                                                setIsInvalidatedFilling(false)
                                            }, 3000);
                                            console.log('Erro ao adicionar o risco')
                                        }
                                    }}
                        >
                            Adicionar ao relatório
                        </Button>
                    </div>
                    {
                        isInvalidatedFilling && <AlertNotification text="Preencha todos os campos!" />
                    }
                </CardContent>
            }
        </Card>
    )
}