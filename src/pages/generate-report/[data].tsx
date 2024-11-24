'use client'
import { useRouter } from 'next/router';
import '../../app/globals.css'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { ArrowBigRightDash, Dot } from 'lucide-react';
import Image from 'next/image';

type RiskProps = {
    risco :string
    acoes :string[]
    consequencias :string[]
    images :string[]
}

export default function GenerateReport() {

    // const [ parsedData, setParsedData ] = useState<object>()

    const router = useRouter()
    const { data } = router.query
    const parsedData = data ? JSON.parse(data) : null
    
    const content :RiskProps = {
        risco: 'Buraco na calçada em frente à porta de entrada do prédio administrativo',
        consequencias: ['Tropeços graves', 'Torções nos pés', 'Quedas graves resultando em morte'],
        acoes: ['Sinalização imediata do buraco', 'Fechamento do buraco'],
        images: []
    }


    return (
            <div key={'containerPrincipal'} className='w-screen h-svh flex flex-row justify-center'>
                <div key={'containerSubprincipal'} className="max-w-[960px] h-svh">
                    <div key={'header'} className="flex flex-row items-center bg-green-100">
                        <p className='w-[20%] flex items-center justify-center'>CIPA</p>
                        <p className="text-xl text-center p-6 w-[60%] text-green-900">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA DO TRABALHO</p>
                        <p className='w-[20%]'>{''}</p>
                    </div>
                    <p key={'naoconformidades'} className='w-full text-center my-4'>INDICAÇÃO DAS NÃO CONFORMIDADES</p>
                        <p key={'informativo'} className='text-sm mx-6 my-4'>Solicitamos sua especial atenção para o assunto citado, visto que são irregularidades que comprometem a 
                            segurança do(s) funcionário(s) e/ou equipamento(s) no local de trabalho e terceiros.</p>
                    {
                        parsedData
                        &&
                        <div key={'containerAnalises'} className="flex flex-col gap-2 p-6 h-full ">
                            {
                                parsedData.analises.map(( analise, index ) =>(
                                    <div key={'analise'}>
                                        <p 
                                            key={index}
                                            className='font-bold text-base antialiased mt-4'
                                        >
                                            {`${index + 1}. ${analise.risco}`}
                                        </p>

                                        <p key={'fotos'} className='text-sm font-bold antialiased py-3'>Fotos</p>
                                        <div className='flex flex-row items-center justify-center flex-wrap p-6 gap-3 border-2 rounded-md'>
                                            {
                                                analise.images?.map(( image, index ) => (
                                                    <></>
                                                ))
                                            }
                                        </div>

                                        <p key={'consequencias'} className='text-sm font-bold antialiased py-3'>Principais consequências</p>
                                        {
                                            analise.consequencias?.map(( consequencia, index ) => (
                                                <p 
                                                    key={index}
                                                    className='text-sm antialiased ml-6 flex flex-row'
                                                >
                                                <Dot className='min-w-5 min-h-5 max-w-5 max-h-5'/> {consequencia}
                                                </p>
                                            ))
                                        }

                                        <p key={'acoes'} className='text-sm font-bold antialiased py-3'>Ações recomendadas</p>
                                        {
                                            analise.acoes?.map(( acao, index ) => (
                                                <p 
                                                    key={index}
                                                    className='text-sm antialiased ml-6 flex flex-row'
                                                >
                                                    <Dot className='min-w-5 min-h-5 max-w-5 max-h-5'/> {acao}
                                                </p>
                                            ))
                                        }
                                    
                                    </div>
                                ))
                            }
                        </div>    
                    }
                        

                </div>
            </div>
            
    )
}