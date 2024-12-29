'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    return(
        <div className="flex flex-col w-screen h-[100vh] justify-between">
            <nav className="p-6">
                {/* <Image alt='' src={require('../lib/imagens/logo-cipa-2.png')} width={50} height={50} /> */}
            </nav>
            
            <main className="flex flex-col">
                <p className="w-[70%] p-1 md:p-8 self-center text-center text-2xl md:text-4xl lg:text-5xl font-bold">Crie rapidamente relatórios de inspeção de segurança do trabalho.</p>

                <p className="w-[70%] pb-8 self-center text-center text-base md:text-lg">Um editor projetado para criar relatórios de inspeção de segurança do trabalho.</p>

                <div className="flex flex-col md:flex-row self-center gap-4 mb-4">
                    <Link href={'/editor'}>
                        <Button 
                            className="bg-green-900 hover:bg-green-700 w-full md:w-fit"
                        >
                            Começar
                        </Button>
                    </Link>
                    
                    <Button 
                        className="bg-green-900 hover:bg-green-700"
                        disabled={true}
                    >
                        Carregar relatório existente
                    </Button>
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
                            Descreva as situações de risco identificadas em campo e deixe a Inteligência Artifical Google Gemini fazer uma análise das principais consequências que esta situação pode acarretar, 
                            e recomendar ações para garantir a segurança dos trabalhadores e o cumprimento das normas regulamentadoras, ou faça sua própria análise.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />
                    
                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Adicione fotos para deixar o seu relatório mais completo se desejar.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />
                    
                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Edite as análises feitas pela IA, complementando, removendo ou reescrevendo informações.
                        </p>
                    </div>

                    <Separator className="w-auto h-[2px] mx-5 lg:w-[2px] lg:h-auto" />
                    
                    <div className="flex flex-row flex-1">
                        <p className="flex p-4 lg:p-0 text-md lg:text-sm font-medium">
                            Revise as situações de risco adicionadas à lista e ao final visualize o relatório completo.
                        </p>
                    </div>
                    
                </div>
                
            </main>

            <footer className="bg-lime-200">

            </footer>
        </div>
    )
}