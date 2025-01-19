import { inspectionInformationsProps, inspectionInformationsTeste } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { MyCustomInput } from "../MyCustomInput"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/lib/datacontext"
import { SystemContext } from "@/lib/context/SystemContext"

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
    localInspecionadoRua: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    localInspecionadoNumero: z.string().min(2, {
        message: ''
    }).toUpperCase(),
    localInspecionadoBairro: z.string().min(2, {
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
    data: z.string().date().default(new Date().toISOString()).transform(date => {
        return new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'})
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


export default function DadosDaInspecao() {
    const { 
        inspectionData, setInspectionData,
        setFormUnlocked, formUnlocked
    } = useContext(DataContext)
    
    const [ isSaved, setIsSaved ] = useState(false)

    const { register, handleSubmit, setValue } = useForm({
            resolver: zodResolver(formInspectionInformationSchema)
        })

    const handleIsSaved = ()=> { 
        setIsSaved(!isSaved)
    }

    function handleSetFormUnlocked(value? :boolean) {
        if(value) {
            setFormUnlocked(value)
        }else {
            setFormUnlocked(!formUnlocked)
        }
    }
    
    function handleSaveInspectionInformation(data: formInspectionInformationSchema) {
        if(data) {  
            setInspectionData(prevInspectionData => prevInspectionData = data)    
            handleIsSaved()   
            handleSetFormUnlocked(false)
        }else{
            console.log('Algo deu errado! Por favor tente novamente.')
        }
    }

    useEffect(()=>{
            if(inspectionData) {
                setValue('empresa', inspectionData.empresa)
                setValue('areaEmitente', inspectionData.areaEmitente)
                setValue('cipa', inspectionData.cipa)
                setValue('areaLotacao', inspectionData.areaLotacao)
                setValue('localInspecionado', inspectionData.localInspecionado)
                setValue('localInspecionadoRua', inspectionData.localInspecionadoRua)
                setValue('localInspecionadoNumero', inspectionData.localInspecionadoNumero)
                setValue('localInspecionadoBairro', inspectionData.localInspecionadoBairro)
                setValue('cidade', inspectionData.cidade)
                setValue('data', new Date(inspectionData.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'))
                setValue('hora', inspectionData.hora)
                setValue('responsavelPelaInspecao', inspectionData.responsavelPelaInspecao)
                setValue('funcaoResponsavelPelaInspecao', inspectionData.funcaoResponsavelPelaInspecao)
                setValue('matriculaResponsavelPelaInspecao', inspectionData.matriculaResponsavelPelaInspecao)
    
                setIsSaved(true)
            }
        }, [inspectionData])

    return(
        <div className="flex flex-col w-full h-full gap-3 p-2">

            <form id="formDadosDaInspecao" onSubmit={handleSubmit(handleSaveInspectionInformation)} className="flex flex-col flex-grow basis-0 gap-4 p-2 custom-scrollbar overflow-y-auto">

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Empresa"
                    type="text"
                    {...register('empresa')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Área emitente"
                    type="text"
                    {...register('areaEmitente')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Ano CIPA"
                    type="text"
                    {...register('cipa')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Área/Lotação"
                    type="text"
                    {...register('areaLotacao')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Local inspecionado"
                    type="text"
                    {...register('localInspecionado')}
                />

                <div className="flex justify-between gap-2">
                    <MyCustomInput 
                        classNameContainer="w-full"
                        initialState={inspectionData? true : false}
                        disabled={isSaved}
                        label="Rua"
                        type="text"
                        {...register('localInspecionadoRua')}
                    />
                    <MyCustomInput 
                        classNameContainer="w-[100px]"
                        maxLength={6}
                        initialState={inspectionData? true : false}
                        disabled={isSaved}
                        label="Nº"
                        type="text"
                        {...register('localInspecionadoNumero')}
                    />
                </div>

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Bairro"
                    type="text"
                    {...register('localInspecionadoBairro')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Cidade-Estado"
                    type="text"
                    {...register('cidade')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Data"
                    type="date"
                    {...register('data')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Hora"
                    type="time"
                    {...register('hora')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Responsável pela inspeção"
                    type="text"
                    {...register('responsavelPelaInspecao')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Função / Cargo"
                    type="text"
                    {...register('funcaoResponsavelPelaInspecao')}
                />

                <MyCustomInput 
                    initialState={inspectionData? true : false}
                    disabled={isSaved}
                    label="Matrícula"
                    type="text"
                    {...register('matriculaResponsavelPelaInspecao')}
                />

            </form>

            {
                isSaved && <Button
                                className="bg-zinc-700 hover:bg-zinc-500"
                                onClick={()=> {handleIsSaved(); handleSetFormUnlocked(true)}}
                            >
                                Alterar
                            </Button>
            }
            {
                !isSaved && <Button
                                className="bg-green-800 hover:bg-green-600"
                                type='submit'
                                form="formDadosDaInspecao"
                                formAction={()=> {handleSaveInspectionInformation}}
                            >
                                Ok
                            </Button>
            }
        </div>
    )
}