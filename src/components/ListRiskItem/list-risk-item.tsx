import { Button } from "../ui/button"
import { X } from "lucide-react"
import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis"
import { ReactNode, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"

interface ListRiskItemProps {
    onRemoveRiskOfList :(index :number)=> void
    index :number
    item :RiskProps
    children :ReactNode
}

export default function ListRiskItem( { children, onRemoveRiskOfList, index, item } :ListRiskItemProps) {
    

    useEffect(()=> {
        const container = document.getElementById(`container${index}`)

        setTimeout(() => {
            container?.classList.replace('bg-green-100', 'bg-white')
            container?.classList.replace('border-green-600', 'border-inherit')
        }, 1000);

        container?.classList.remove('border-red-500')
    }, [])
    
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div id={`container${index}`} className={`flex flex-row transition duration-500 ease-in-out gap-3 justify-between items-center bg-green-100 hover:bg-gray-100 border-green-600 border-[1px] p-2 rounded-md`}>
                        <p className="font-medium text-left whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[90%] break-words text-base md:text-sm select-none">{`${index + 1}. ${item.risco}`}</p>

                        <div className="flex flex-row w-auto items-center gap-3">
                            
                            {children}

                            <Button 
                                onClick={()=> onRemoveRiskOfList(index)} 
                                className="max-w-[45px] h-fit px-6 bg-inherit hover:bg-red-400 text-black text-xs"
                            >
                                <X />
                            </Button>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="z-auto bg-green-700">
                    <p>{`${index + 1}. ${item.risco}`}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider> 
    )
}