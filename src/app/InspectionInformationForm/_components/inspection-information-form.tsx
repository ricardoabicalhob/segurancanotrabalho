'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { inspectionInformations } from '@/lib/pdf-generate';
import { useState } from 'react';

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
    data: z.coerce.date(),
    hora: z.string(),
    responsavelPelaInspecao: z.string().min(2, {

    })
})

interface InspectionInformationFormProps {
    onAddInspectionInformations :(inspectionInformations :inspectionInformations)=> void
}

export default function InspectionInformationForm({ onAddInspectionInformations } :InspectionInformationFormProps) {

    const [ isSaved, setIsSaved ] = useState(false)

    const { register, handleSubmit } = useForm({
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
                        isSaved && <Button onClick={()=> setIsSaved(!isSaved)} className="bg-yellow-500 hover:bg-yellow-300">
                                        Alterar
                                    </Button>
                    }
                    {
                        !isSaved && <Button type='submit' formAction={()=> {handleSaveInspectionInformation}} className="bg-green-600 hover:bg-green-400">
                                        Salvar
                                    </Button>
                    }
                    
                </form>
            </CardContent>
        </Card>
        
    )
}