import { CircleAlert, CircleCheckBig, ImageOff, MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button"
import { Dialog } from "@radix-ui/react-dialog";
import AlertNotification from "../AlertNotification";
import LoadingIndicator from "../LoadingIndicator";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { SystemContext } from "@/lib/context/SystemContext";
import { RiskProps } from "@/lib/types";
import { uuid } from "uuidv4";
import { GenerateAI } from "@/lib/generate-ai";
import convertToBase64 from "@/lib/convert-base64";
import { Input } from "../ui/input";
import { ButtonDelete } from "../ButtonDelete";
import Image from "next/image";
import { TooltipProvider } from "../ui/tooltip";
import CustomSelect from "../CustomSelect";
import { Separator } from "../ui/separator";
import { DataContext } from "@/lib/datacontext";
import MyDialog from "../MyDialog/index-layout-2";
import MyModalDialog from "../MyDialog/index-layout-2-modal";

interface DadosDaAnaliseDeRiscoProps {

}

export default function DadosDaAnaliseDeRiscoTeste({  } :DadosDaAnaliseDeRiscoProps) {

    const [prompt, setPrompt] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isFirstUpdateScrollArea, setIsFirstUpdateScrollArea] = useState(true)
    const [isFirstUpdateTextAreasHeight, setIsFirstUpdateTextAreasHeight] = useState(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const textareaAcoesRefs = useRef<HTMLTextAreaElement[]>([])
    const textareaConsequenciasRefs = useRef<HTMLTextAreaElement[]>([])
    const [ isInvalidatedFilling, setIsInvalidatedFilling ] = useState(false)

    const { 
        validateCompletionOfConsequences,
        validateCompletionOfRecommendedActions,
        risk, setRisk, handleSaveRisk,
        formEditable, setFormEditable,
        setListRisks
    } = useContext(DataContext)

    function handleSaveChanges(newRisk :RiskProps) {
        handleClearRisk()
        handleResetUpdateStates()
        setFormEditable(false)

        setListRisks(prevRisks => {
            if(Array.isArray(prevRisks)) {
                return prevRisks.map((item)=> {
                    return item.risco === newRisk.risco ? newRisk : item
                })
            }
            console.error('índice inválido ou lista de riscos está vazia.')
            return prevRisks
        })
    }

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
                    value: '',
                    corDoGrupoDeRisco: ''
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

    function handleClearRisk() {
        setRisk(undefined)
    }

    const handleKeyDown = (event :KeyboardEvent<HTMLTextAreaElement>) => {
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
                newConsequences.push({id: uuid(), value: '', corDoGrupoDeRisco: ''})

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

    function handleColorGroupConsequenceChange(index :number, newValue :string) {
        if(risk) {
            const newConsequeces = [...risk.consequencias]
            const newConsequence = newConsequeces[index]
            newConsequence.corDoGrupoDeRisco = newValue

            setRisk({
                ...risk,
                consequencias: newConsequeces
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
                const data = await response?.json()
                const responseJson :RiskProps = data
                // console.log('Resposta da analise: ', responseJson)

                if(response?.ok) {
                    responseJson.consequencias.map((consequencia) => {
                        consequencia.id = uuid()
                    })
                    responseJson.acoes.map(acao => {
                        acao.id = uuid()
                    })
                    responseJson.images = []
                    console.log(responseJson)

                    setRisk(responseJson)
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

    function handleSaveRiskOnList() {
        if(risk) {
            handleSaveRisk(risk)  
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
        
        const listener = function(event :Event){
            const input = event.target as HTMLInputElement
            if(input.files && input.files.length) {
                const file = input.files[0]
                convertToBase64(file)
                .then(base64String => {
                    handleAddImage(base64String as string)        
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
                    scrollAreaRef.current.classList.add('flex-1', 'overflow-y-auto')
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

    if(!risk) {
        return(
            <form id="formDadosDaAnaliseDeRisco" className="flex flex-col flex-grow w-full basis-0 gap-4 p-2 custom-scrollbar overflow-y-auto">
                
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="prompt" className="flex gap-2 items-center font-bold text-sm h-fit"><CircleAlert className="text-yellow-500 w-4 h-4"/> Situação de risco</label>
                    <textarea 
                        name="prompt" 
                        id="prompt"
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
                </div>  

                <Button
                    className="bg-green-800 hover:bg-green-600"
                    disabled={prompt === ''}
                    formAction={()=>{
                        handleGenerate(); 
                        handleLoadingIndicator()
                    }}
                >
                    Analisar a situação de risco com IA
                </Button>
                <span className="text-sm self-center">Ou</span>
                <Button
                    className="border-[1px] border-green-900 bg-white hover:bg-green-100 text-green-800"
                    disabled={prompt === ''}
                    formAction={()=> handleIWantToAnalyse()}
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
            </form>
        )
    } else {
        return(
            <MyModalDialog 
                indexRisk={0}
                itemRisk={risk}
                setItemRisk={setRisk}
                handleCancelar={()=> {
                    handleClearRisk(); 
                    handleClearPrompt(); 
                    handleResetUpdateStates();
                    setFormEditable(false)
                }}
                handleContinue={()=> {
                    if(validateCompletionOfConsequences(risk.consequencias)?.status && validateCompletionOfRecommendedActions(risk.acoes)?.status) {
                        handleSaveRiskOnList(); 
                        handleClearPrompt(); 
                        handleClearRisk()
                    } else {

                        if(validateCompletionOfConsequences(risk.consequencias).emptyItemsList.length > 0) {
                            validateCompletionOfConsequences(risk.consequencias).emptyItemsList.reverse().map(itemList => {
                                document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-red-400')
                                document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('rounded-sm')
                                document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('border-[1px]')
                                document.getElementById(`COLORGROUPRISCID${itemList.id}`)?.classList.add('rounded-md')
                                document.getElementById(`COLORGROUPRISCID${itemList.id}`)?.classList.add('border-red-400')
                                document.getElementById(`COLORGROUPRISCID${itemList.id}`)?.classList.add('border-[1px]')
                                document.getElementById(`TEXTAREAID${itemList.id}`)?.focus()
                                setTimeout(() => {
                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-red-400')
                                    document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.remove('border-[1px]')
                                    document.getElementById(`COLORGROUPRISCID${itemList.id}`)?.classList.remove('border-red-400')
                                    document.getElementById(`COLORGROUPRISCID${itemList.id}`)?.classList.remove('border-[1px]')        
                                }, 5000);
                            })
                        }

                        if(validateCompletionOfRecommendedActions(risk.acoes).emptyItemsList.length > 0) {
                            validateCompletionOfRecommendedActions(risk.acoes).emptyItemsList.reverse().map(itemList => {
                                document.getElementById(`TEXTAREAID${itemList.id}`)?.classList.add('rounded-sm')
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
            />
        )
    }
}