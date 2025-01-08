'use client'

import LoadingIndicator from "@/components/LoadingIndicator";
import LoadingIndicatorAnimated from "@/components/LoadingIndicatorAnimated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SystemContext } from "@/lib/context/SystemContext";
import { FileCheck, FileUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {

    const router = useRouter()

    const [ isLoadingFile, setIsLoadingFile ] = useState(false)
    const [ isLoadingPage, setIsLoadingPage ] = useState(false)
    const [ isLoadingEditor, setIsLoadingEditor ] = useState(false)
    const { setUploadedFile, uploadedFile } = useContext(SystemContext)

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
                    setUploadedFile(data)
                    
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

    function handleIsLoadingEditor() {
        setIsLoadingEditor(true)
    }

    useEffect(() => {
        window.history.pushState(null, window.location.href)
        window.onpopstate = () => {
          if (window.confirm('Todo o preenchimento do relatório será perdido! Tem certeza que deseja sair?')) {
            window.history.go(0)
          } else {
            window.history.go(1);
          }
        };
      }, []);

    useEffect(()=> {
        if(uploadedFile) {
            setIsLoadingPage(true)

            setTimeout(() => {
                router.push('/editor')
                
                setTimeout(() => {
                    setUploadedFile(null)
                }, 5000);
            }, 2000);
        }
    }, [uploadedFile])

    return(
        <div className="flex flex-col w-screen h-[100vh] justify-between">
            <nav className="p-6">
                {/* <Image alt='' src={require('../lib/imagens/logo-cipa-2.png')} width={50} height={50} /> */}
            </nav>
            
            <main className="flex flex-col">
                <p className="w-[70%] p-1 md:p-8 self-center text-center text-2xl md:text-4xl lg:text-5xl font-bold">Crie rapidamente relatórios de inspeção de segurança do trabalho.</p>

                <p className="w-[70%] pb-8 self-center text-center text-base md:text-lg">Um editor projetado para criar relatórios de inspeção de segurança do trabalho.</p>

                <div className="flex flex-col md:flex-row self-center gap-4 mb-4">
                        <Button 
                            className="bg-green-800 hover:bg-green-600 w-full md:w-fit"
                            onClick={()=> {router.push('/editor'); handleIsLoadingEditor()}}
                        >
                            Começar
                        </Button>

                    <div className="flex items-center justify-center border-[1px] bg-green-800 hover:bg-green-600 rounded-md w-fit px-4 py-2 cursor-pointer">
                        {
                            isLoadingFile
                            ?
                            <LoadingIndicatorAnimated styles="w-4 h-4 border-[3px] mr-2" />
                            :
                            (
                                uploadedFile
                                ?
                                <FileCheck className="text-white mr-2 h-4 w-4" />
                                :
                                <FileUp className="text-white mr-2 h-4 w-4" />
                            )
                        }
                        
                        <p className="text-sm text-white select-none">{`${isLoadingFile ? 'Carregando relatório...' : (uploadedFile ? 'Relatório carregado!' : 'Carregar relatório existente')}`}</p>
                        <Input 
                            className="absolute w-[15%] cursor-pointer" 
                            style={{opacity: 0, cursor: 'pointer'}}
                            type="file" 
                            accept=".ris"
                            id="inputFileLoaded"
                            onClick={()=> {
                                handleSelectFile();
                            }}
                        />
                    </div>

                </div>
                
                <div className="flex flex-col md:w-[80%] md:self-center lg:flex-row my-8">
                    <div className="flex flex-row md:flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Simplifique a criação de seus relatórios de inspeção de segurança do trabalho. 
                            Crie relatórios detalhados com poucos cliques e promova um ambiente de trabalho mais seguro.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />

                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Descreva as situações de risco identificadas em campo e deixe que a Inteligência Artifical Google Gemini te ajude a fazer uma análise das principais consequências que esta situação pode acarretar, 
                            e recomendar ações para garantir a segurança dos trabalhadores e o cumprimento das normas regulamentadoras, ou faça sua própria análise.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />
                    
                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Adicione fotos para proporcionar uma visualização mais clara e completa dos dados e informações apresentados, deixando o seu relatório ainda mais completo.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />
                    
                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Revise as situações de risco adicionadas à lista e ao final visualize o relatório completo.
                        </p>
                    </div>
                    
                </div>

                {
                    (isLoadingPage || isLoadingEditor) && <LoadingIndicator text={isLoadingEditor? 'Inicializando o editor...' : 'Carregando o relatório...'} />
                }
                
            </main>

            {/* <footer className="bg-lime-200">

            </footer> */}
        </div>
    )
}