import { HTMLAttributes, useContext } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SystemContext } from "@/lib/context/SystemContext"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface CustomSelectProps extends HTMLAttributes<HTMLDivElement>{
    valorSelecionado? :string
    indexConsequence :number
    handleColorGroupConsequence :(index :number, newValue :string)=> void
}

export default function CustomSelect({ handleColorGroupConsequence, indexConsequence, valorSelecionado, ...props } :CustomSelectProps) {

    const { buscarRiscoPorCor, buscarRiscoPorTipo } = useContext(SystemContext)
    
    interface ItemListProps {
        cor :string
    }
    const ItemList = ({ cor } :ItemListProps)=> (
        <Tooltip>
            <TooltipTrigger className="flex w-full">
                <div 
                    className={`
                        w-4 h-4 mt-[0.5px] rounded-full self-center 
                        ${cor === 'verde' ? 'bg-green-700' : ''}
                        ${cor === 'vermelho' ? 'bg-red-super' : ''}
                        ${cor === 'laranja' ? 'bg-orange-800' : ''}
                        ${cor === 'amarelo' ? 'bg-yellow-400' : ''}
                        ${cor === 'azul' ? 'bg-blue-700' : ''}
                        ${cor === 'cinza' ? 'bg-gray-100' : ''}
                    `}
                />
            </TooltipTrigger>
            <TooltipContent  className={`
                    max-w-md whitespace-pre-line
                    ${cor === 'verde' ? 'bg-green-700' : ''}
                    ${cor === 'vermelho' ? 'bg-red-super' : ''}
                    ${cor === 'laranja' ? 'bg-orange-800' : ''}
                    ${cor === 'amarelo' ? 'bg-yellow-400' : ''}
                    ${cor === 'azul' ? 'bg-blue-700' : ''}
                    ${cor === 'cinza' ? 'bg-gray-100' : ''}
                `}>
                <span className="font-bold text-sm">{buscarRiscoPorCor(cor).tipo + ': '}</span> 
                {buscarRiscoPorTipo(buscarRiscoPorCor(cor).tipo).riscos.map((risco, index)=> {
                    return index === buscarRiscoPorTipo(buscarRiscoPorCor(cor).tipo).riscos.length - 1 ? risco + '.' : risco + ', '
                })}
            </TooltipContent>
        </Tooltip>
    )

    return(

        <div {...props} className="flex h-full w-fit items-center">
            <Select defaultValue={valorSelecionado? valorSelecionado : ''} onValueChange={(value)=> handleColorGroupConsequence(indexConsequence, value)}>
                <SelectTrigger>
                    <SelectValue placeholder='Cor'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="verde"><ItemList cor="verde" /></SelectItem>
                    <SelectItem value="vermelho"><ItemList cor="vermelho" /></SelectItem>
                    <SelectItem value="laranja"><ItemList cor="laranja" /></SelectItem>
                    <SelectItem value="amarelo"><ItemList cor="amarelo" /></SelectItem>
                    <SelectItem value="azul"><ItemList cor="azul" /></SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}