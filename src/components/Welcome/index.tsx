import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface WelcomeProps {
    onWelcome :()=> void
}

export default function Welcome({ onWelcome } :WelcomeProps) {
    return(
        <Card className="fixed flex flex-col self-start justify-self-center w-[450px] h-[400px] md:w-[600px] bg-gray-200 bg-opacity-90 ">
            <CardHeader className="grid grid-flow-col grid-cols-3 justify-center items-center gap-4 w-full">
                <p />
                <CardTitle className="justify-self-center text-2xl text-green-900">Bem-vindo!</CardTitle>
                <div 
                    className="rounded-full w-7 justify-self-end bg-red-600 hover:bg-red-400 p-1"
                    onClick={()=> onWelcome()}    
                >
                    <X className="text-white w-5 h-5"/>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Carousel className="flex max-w-full max-h-full">
                    <CarouselPrevious className="bg-green-600 hover:bg-green-400 text-white"/>
                        <CarouselContent>
                            <CarouselItem >
                                <Card>
                                    <CardContent className="h-[240px] py-3 px-3 text-justify">
                                        <p className="mb-2">Simplifique a criação de seus relatórios de inspeção de segurança do trabalho. Crie relatórios detalhados com poucos cliques e promova um ambiente de trabalho mais seguro.</p>
                                        <p>Inicie o relatório com o preenchimento dos dados da inspeção.</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem >
                                <Card>
                                    <CardContent className="h-[240px] py-3 px-3 text-justify">
                                        <p className="mb-2">Descreva as situações de risco identificadas em campo e deixe a Inteligência Artifical Google Gemini fazer uma análise das principais consequências que esta situação pode acarretar e propor ações para garantir a segurança dos trabalhadores e o cumprimento das normas regulamentadoras.</p>
                                        <p className="mb-2">Adicione fotos para deixar o relatório mais completo se desejar.</p>
                                        <p>Edite as análises feitas pela IA, complementando, removendo ou reescrevendo informações.</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem>
                                <Card>
                                    <CardContent className="flex flex-col justify-between h-[240px] py-3 px-3 text-justify">
                                        <p className="mb-20">Revise as situações de risco adicionadas à lista e ao final visualize o relatório completo.</p>
                                        <Button onClick={()=> onWelcome()} className="bg-green-600 hover:bg-green-400 w-[90px] self-end">Iniciar</Button>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselNext className="bg-green-600 hover:bg-green-400 text-white"/>
                    </Carousel>
            </CardContent>
        </Card>
    )
}