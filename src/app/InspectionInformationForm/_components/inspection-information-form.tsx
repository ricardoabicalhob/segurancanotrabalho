'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { inspectionInformations } from '@/lib/pdf-generate';
import { useEffect, useState } from 'react';
import { Check, Edit } from 'lucide-react';
import { MyCustomInput } from '@/components/MyCustomInput';

export const formInspectionInformationSchema = z.object({
    empresa: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    areaLotacao: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    localInspecionado: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    areaEmitente: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    cidade: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    cipa: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    data: z.coerce.date().default(new Date().toISOString()).transform((date) => {
        return new Date(date.toLocaleDateString('en-US', {timeZone: 'UTC'}))
    }),
    hora: z.string(),
    responsavelPelaInspecao: z.string().min(2, {

    }).toUpperCase(),
    funcaoResponsavelPelaInspecao: z.string().min(2, {

    }).toUpperCase(),
    matriculaResponsavelPelaInspecao: z.string().min(2, {

    }).toUpperCase()
})


type formInspectionInformationSchema = z.infer<typeof formInspectionInformationSchema>

interface InspectionInformationFormProps {
    onAddInspectionInformations :(inspectionInformations :inspectionInformations)=> void
    inspectionInformations? :inspectionInformations
    readyReport :boolean
    setFormUnlocked :()=> void
}

export default function InspectionInformationForm({ onAddInspectionInformations, setFormUnlocked, inspectionInformations, readyReport } :InspectionInformationFormProps) {

    const [ isSaved, setIsSaved ] = useState(false)

    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(formInspectionInformationSchema)
    })

    function handleSaveInspectionInformation(data :object) {
        if(data) {          
            onAddInspectionInformations(data as inspectionInformations)
            setIsSaved(!isSaved)
            setFormUnlocked()
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
            setValue('funcaoResponsavelPelaInspecao', inspectionInformations.funcaoResponsavelPelaInspecao)
            setValue('matriculaResponsavelPelaInspecao', inspectionInformations.matriculaResponsavelPelaInspecao)

            setIsSaved(true)
        }
    }, [readyReport, inspectionInformations])

    return(
        <Card className="flex flex-col justify-between mx-auto max-w-md h-full">
            <CardHeader>
                <CardTitle className='text-lg'>Dados da Inspeção</CardTitle>
            </CardHeader>
            <CardContent className='flex-1 mt-[30px]'>
                <form id='formInformation'  onSubmit={handleSubmit(handleSaveInspectionInformation)} className='grid gap-3'>
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Empresa' {...register('empresa')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Empresa'
                        type='text'
                        {...register('empresa')}
                    />

                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Área emitente' {...register('areaEmitente')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Área emitente'
                        type='text'
                        {...register('areaEmitente')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Ano CIPA' {...register('cipa')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Ano CIPA'
                        type='text'
                        {...register('cipa')}
                    />

                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Área/Lotação' {...register('areaLotacao')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Área/Lotação'
                        type='text'
                        {...register('areaLotacao')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Local inspecionado' {...register('localInspecionado')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Local inspecionado'
                        type='text'
                        {...register('localInspecionado')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Cidade' {...register('cidade')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Cidade'
                        type='text'
                        {...register('cidade')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} type='date' placeholder='Data' {...register('data')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Data' 
                        type='date' 
                        {...register('data')} 
                    />

                    {/* <Input className='text-base md:text-sm' disabled={isSaved} type='time' placeholder='Hora' {...register('hora')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Hora'
                        type='time'
                        {...register('hora')}
                    />

                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Responsável pela inspeção' {...register('responsavelPelaInspecao')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Responsável pela inspeção'
                        type='text'
                        {...register('responsavelPelaInspecao')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Função / Cargo' {...register('funcaoResponsavelPelaInspecao')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Função / Cargo'
                        type='text'
                        {...register('funcaoResponsavelPelaInspecao')}
                    />
                    
                    {/* <Input className='text-base md:text-sm' disabled={isSaved} placeholder='Matrícula' {...register('matriculaResponsavelPelaInspecao')} /> */}
                    <MyCustomInput 
                        initialState={inspectionInformations? true : false}
                        disabled={isSaved}
                        label='Matrícula'
                        type='text'
                        {...register('matriculaResponsavelPelaInspecao')}
                    />
                
                </form>
            </CardContent>          
            <CardFooter>
                {
                    isSaved && <Button onClick={()=> {setIsSaved(!isSaved); setFormUnlocked()}} className="bg-zinc-700 hover:bg-zinc-500 w-full">
                                    <Edit />
                                    Alterar
                                </Button>
                }
                {
                    !isSaved && <Button 
                                    type='submit' 
                                    form='formInformation'
                                    formAction={()=> {handleSaveInspectionInformation}}
                                    // onClick={()=> {isSaved ? setFormUnlocked() : null}}
                                    className="bg-green-800 hover:bg-green-600 w-full"
                                >
                                    Ok
                                </Button>
                }
            </CardFooter>
        </Card>
        
    )
}