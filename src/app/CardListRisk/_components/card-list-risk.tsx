'use client'

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import generatePdf from '@/lib/pdf-generate'
import { ChevronDown } from "lucide-react";

export interface CardListRiskProps {
    listRisks :Array<RiskProps>
}

export default function CardListRisk({ listRisks } :CardListRiskProps){

    return(
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-lg">Situações de Risco Identificadas</CardTitle>
            </CardHeader>
            <Accordion type="single" collapsible className="w-full px-6 py-4">
                {
                    listRisks !== undefined
                    ?
                    listRisks.map((item, index)=>(
                        <AccordionItem key={index} value={index.toString()} className="my-6">
                            <div className="flex flex-row justify-between">
                                <AccordionTrigger className="font-bold text-left max-w-[90%]">{`${index + 1}. ${item.risco}`}</AccordionTrigger>
                                <ChevronDown/>
                            </div>
                            <AccordionContent>
                                <p className="font-bold ml-4 my-4">Fotos</p>
                                <div className="flex gap-2 justify-center">
                                {
                                    item.images.map((image, index) => (
                                        <img key={index} className="w-[150px] h-[80px] mt-1 mb-1" src={image} />
                                    ))
                                }
                                </div>
                                
                                <p className="font-bold ml-4 my-4">Principais consequências</p>
                                {
                                    item.consequencias.map((consequencia, index)=>(
                                        <p key={index} className="text-left ml-4">{`${index + 1}. ${consequencia}`}</p>
                                    ))
                                }
                                <Separator className="my-4"/>
                                <p className="font-bold ml-4 my-4">Ações recomendadas</p>
                                {
                                    item.acoes.map((acao, index)=>(
                                        <p key={index} className="text-left ml-4">{`${index + 1}. ${acao}`}</p>
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
                <Button onClick={()=>generatePdf(listRisks)}>Gerar PDF</Button>
            </CardFooter>
        </Card>
    )
}