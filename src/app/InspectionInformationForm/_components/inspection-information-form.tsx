'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const formInspectionInformationSchema = z.object({
    areaEmitente: z.string().min(2, {
        message: ''
    }),
    areaLotacao: z.string().min(2, {
        message: ''
    }),
    localInspecionado: z.string().min(2, {
        message: ''
    }),
    cidade: z.string().min(2, {
        message: ''
    }),
    cipa: z.string().min(2, {
        message: ''
    }),
    data: z.coerce.date()
})

export default function InspectionInformationForm() {

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(formInspectionInformationSchema)
    })

    function handleInspectionInformation(data :object) {//@ts-expect-error não é considerado erro
        console.log(data) //@ts-expect-error não é considerado erro
    }//@ts-expect-error não é considerado erro

    return(

        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className='text-lg'>Dados da Inspeção</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleInspectionInformation)} className='grid gap-2'>
                    <Input placeholder='Área emitente' {...register('areaEmitente')} />
                    <Input placeholder='Área/Lotação' {...register('areaLotacao')} />
                    <Input placeholder='Local inspecionado' {...register('localInspecionado')} />
                    <Input placeholder='Cidade' {...register('cidade')} />
                    <Input placeholder='Cipa' {...register('cipa')} />
                    <Input type='date' {...register('data')} />

                    <Button type='submit'>
                        Salvar
                    </Button>
                </form>
            </CardContent>
        </Card>
        

        // <Card className="mx-auto max-w-lg">
        //     <CardHeader>
        //         <CardTitle>Informações da inspeção</CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         <form className="grid-w-full grid-flow-row">
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="emitente">Área emitente</Label>
        //                 <Input id="emitente" type="text"/>
        //             </div>
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="area">Área/Lotação</Label>
        //                 <Input id="area" type="text" />
        //             </div>
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="local">Local inspecionado</Label>
        //                 <Input id="local" type="text" />
        //             </div>
                                            
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="cidade">Cidade</Label>
        //                 <Input id="cidade" type="text" />
        //             </div>
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="cipa">Cipa</Label>
        //                 <Input id="cipa" type="text" />
        //             </div>
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="data">Data</Label>
        //                 <Input id="data" type="date" />
        //             </div>
        //             <div className="grid-w-full items-center gap-1.5">
        //                 <Label htmlFor="hora">Hora</Label>
        //                 <Input id="hora" type="time" />
        //             </div>
        //             <Card className="mt-2 w-auto">
        //                 <CardContent className="p-3">
        //                     <RadioGroup defaultValue="instalacao">
        //                         <div className="flex items-center space-x-2">
        //                             <RadioGroupItem value="obra-prestadora" id="r1" />
        //                             <Label htmlFor="r1">Obra/Prestadora de serviços</Label>
        //                         </div>
        //                         <div className="flex items-center space-x-2">
        //                             <RadioGroupItem value="equipe" id="r2" />
        //                             <Label htmlFor="r2">Equipe Sanepar</Label>
        //                         </div>
        //                         <div className="flex items-center space-x-2">
        //                             <RadioGroupItem value="instalacao" id="r3" />
        //                             <Label htmlFor="r3">Instalação Sanepar</Label>
        //                         </div>
        //                     </RadioGroup>
        //                 </CardContent>
        //             </Card>
        //         </form>
        //     </CardContent>
        // </Card>
        
    )
}