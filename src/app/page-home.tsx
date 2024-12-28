import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return(
        <div className="flex flex-col w-screen h-[100vh] justify-between">
            <nav className="p-6">
                {/* <Image alt='' src={require('../lib/imagens/logo-cipa-2.png')} width={50} height={50} /> */}
            </nav>
            
            <main className="flex flex-col">
                <p className="w-[70%] p-8 self-center text-center text-xl md:text-5xl font-bold">Crie rapidamente relatórios de inspeção de segurança do trabalho.</p>

                <p className="w-[70%] pb-8 self-center text-center text-base md:text-lg">Um editor projetado para criar relatórios de inspeção de segurança do trabalho.</p>

                <div className="flex flex-col md:flex-row self-center gap-4">
                    <Button 
                        className="bg-green-900 hover:bg-green-700"
                    >
                        Começar
                    </Button>
                    
                    <Button 
                        className="bg-green-900 hover:bg-green-700"
                    >
                        Carregar relatório existente
                    </Button>
                </div>
                
                {/* <p className="flex w-[50%] p-4 text-lg font-medium">
                    Simplifique a criação de seus relatórios de inspeção de segurança do trabalho. 
                    Crie relatórios detalhados com poucos cliques e promova um ambiente de trabalho mais seguro.
                </p>

                <p className="flex w-[50%] p-4 text-lg font-medium">
                Descreva as situações de risco identificadas em campo e deixe a Inteligência Artifical Google Gemini fazer uma análise das principais consequências que esta situação pode acarretar, 
                e recomendar ações para garantir a segurança dos trabalhadores e o cumprimento das normas regulamentadoras.
                </p>

                <p className="flex w-[50%] p-4 text-lg font-medium">
                    Adicione fotos para deixar o seu relatório mais completo se desejar.
                </p>

                <p className="flex w-[50%] p-4 text-lg font-medium">
                    Edite as análises feitas pela IA, complementando, removendo ou reescrevendo informações.
                </p>

                <p className="flex w-[50%] p-4 text-lg font-medium">
                    Revise as situações de risco adicionadas à lista e ao final visualize o relatório completo.
                </p> */}
            </main>

            <footer className="bg-lime-200">

            </footer>
        </div>
    )
}