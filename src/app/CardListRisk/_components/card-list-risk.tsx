'use client'

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import generatePdf from '@/lib/pdf-generate'
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { inspectionInformations } from "@/lib/pdf-generate";

export interface CardListRiskProps {
    listRisks :Array<RiskProps>
    inspectionInformations :inspectionInformations
}

export default function CardListRisk({ listRisks , inspectionInformations} :CardListRiskProps){

    return(
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-lg">Situações de Risco Identificadas</CardTitle>
            </CardHeader>
            <Accordion type="single" collapsible className="w-full px-6 py-4">
                {
                    listRisks
                    ?
                    listRisks.map((item, index)=>(
                        <AccordionItem key={index} value={index.toString()} className={`my-6`}>
                            <div className="flex flex-row justify-between">
                                <AccordionTrigger className="font-bold text-left max-w-[90%] text-base md:text-sm">{`${index + 1}. ${item.risco}`}</AccordionTrigger>
                                <ChevronDown/>
                            </div>
                            <AccordionContent>
                                <p className="font-bold ml-4 my-4 text-base md:text-sm">Fotos</p>
                                <div className="flex gap-2 justify-center">
                                {
                                    item.images.map((image, index) => (
                                        // <image key={index} className="w-[150px] h-[80px] mt-1 mb-1" src={image}/>
                                        <Image key={index} alt="" className="w-[150px] h-[90px] mt-1 mb-1" src={image} width={150} height={90}/>
                                    ))
                                }
                                </div>
                                
                                <p className="font-bold ml-4 my-4 text-base md:text-sm">Principais consequências</p>
                                {
                                    item.consequencias.map((consequencia, index)=>(
                                        <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${consequencia}`}</p>
                                    ))
                                }
                                <Separator className="my-4"/>
                                <p className="font-bold ml-4 my-4 text-base md:text-sm">Ações recomendadas</p>
                                {
                                    item.acoes.map((acao, index)=>(
                                        <p key={index} className="text-left ml-4 text-base md:text-sm">{`${index + 1}. ${acao}`}</p>
                                    ))
                                }
                            </AccordionContent>
                        </AccordionItem>
                    ))
                    :
                    null
                }
            </Accordion>
            <CardFooter>
                <Button className="bg-green-600 hover:bg-green-400 text-base md:text-sm" onClick={()=> generatePdf(listRisks, inspectionInformations)} >Gerar PDF</Button>
            </CardFooter>
        </Card>
    )
}