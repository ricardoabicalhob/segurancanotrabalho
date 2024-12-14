'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { inspectionInformations } from '@/lib/pdf-generate';
import { useEffect, useState } from 'react';

export const formInspectionInformationSchema = z.object({
    empresa: z.string().min(2, {
        message: ''
    }),
    areaLotacao: z.string().min(2, {
        message: ''
    }),
    localInspecionado: z.string().min(2, {
        message: ''
    }),
    areaEmitente: z.string().min(2, {
        message: ''
    }),
    cidade: z.string().min(2, {
        message: ''
    }),
    cipa: z.string().min(2, {
        message: ''
    }),
    data: z.coerce.date().default(new Date().toISOString()).transform((date) => {
        return new Date(date.toLocaleDateString('en-US', {timeZone: 'UTC'}))
    }),
    hora: z.string(),
    responsavelPelaInspecao: z.string().min(2, {

    })
})

interface InspectionInformationFormProps {
    onAddInspectionInformations :(inspectionInformations :inspectionInformations)=> void
    inspectionInformations? :inspectionInformations
    readyReport :boolean
}

export default function InspectionInformationForm({ onAddInspectionInformations, inspectionInformations, readyReport } :InspectionInformationFormProps) {

    const [ isSaved, setIsSaved ] = useState(false)

    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(formInspectionInformationSchema)
    })

    function handleSaveInspectionInformation(data :object) {
        if(data) {
            onAddInspectionInformations(data as inspectionInformations)
            setIsSaved(!isSaved)
        }else{
            console.log('Algo deu errado! Por favor tente novamente.')
        }
    }

    useEffect(()=>{
        if(inspectionInformations) {
            setValue('empresa', inspectionInformations.empresa)
            setValue('areaEmitente', inspectionInformations.areaEmitente)
            setValue('cipa', inspectionInformations.cipa)
            setValue('areaLotacao', inspectionInformations.areaLotacao)
            setValue('localInspecionado', inspectionInformations.localInspecionado)
            setValue('cidade', inspectionInformations.cidade)
            if(typeof inspectionInformations.data === 'string'){
                setValue('data', new Date(inspectionInformations.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'))
            }else{
                setValue('data', inspectionInformations.data.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'))

            }
            setValue('hora', inspectionInformations.hora)
            setValue('responsavelPelaInspecao', inspectionInformations.responsavelPelaInspecao)

            setIsSaved(true)
        }
    }, [readyReport, inspectionInformations])

    return(

        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className='text-lg'>Dados da Inspeção</CardTitle>
            </CardHeader>
            <CardContent>
                <form  onSubmit={handleSubmit(handleSaveInspectionInformation)} className='grid gap-2'>
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Empresa' {...register('empresa')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Área emitente' {...register('areaEmitente')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Ano CIPA' {...register('cipa')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Área/Lotação' {...register('areaLotacao')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Local inspecionado' {...register('localInspecionado')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Cidade' {...register('cidade')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} type='date' placeholder='Data' {...register('data')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} type='time' placeholder='Hora' {...register('hora')} />
                    <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Responsável pela inspeção' {...register('responsavelPelaInspecao')} />

                    {
                        isSaved && <Button onClick={()=> setIsSaved(!isSaved)} className="bg-lime-500 hover:bg-lime-300">
                                        Alterar
                                    </Button>
                    }
                    {
                        !isSaved && <Button type='submit' formAction={()=> {handleSaveInspectionInformation}} className="bg-green-600 hover:bg-green-400">
                                        Ok
                                    </Button>
                    }
                    
                </form>
            </CardContent>
        </Card>
        
    )
}