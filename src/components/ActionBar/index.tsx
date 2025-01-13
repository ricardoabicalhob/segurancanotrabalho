import { ButtonHTMLAttributes, ElementType, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react"
import { Input } from "../ui/input"
import LoadingIndicatorAnimated from "../LoadingIndicatorAnimated"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface BarProps extends HTMLAttributes<HTMLDivElement>{
    children :ReactNode
    alignItems : 'justify-start' | 'justify-center' | 'justify-end'
    border? :boolean
}

function Bar({ children, alignItems, border, ...rest } :BarProps) {
    return(
        <div {...rest} className={`flex ${alignItems} ${border? 'border-b-[1px] border-t-[1px]' : ''} min-h[20px] min-w-full px-2 py-1 gap-3`}>
            {children}
        </div>
    )
}


interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon :ElementType
    invertIconColor? :boolean
    textTooltip? :string
}

function Action({ icon: Icon, invertIconColor, textTooltip, ...rest } :ActionProps) {
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className={`flex justify-center items-center  rounded-full w-7 h-7 disabled:text-gray-500 ${invertIconColor? 'text-gray-300 hover:bg-customgray-1000' : 'text-gray-800 hover:bg-gray-200'}`} {...rest}>
                        <Icon className={`w-[18px] h-[18px] `} />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-green-800 max-w-xs">{textTooltip}</TooltipContent>
            </Tooltip>    
        </TooltipProvider>
    )
}

interface ActionUploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
    icon :ElementType
    isLoadingFile :boolean
    textTooltip? :string
}

function ActionUploadFile({ icon: Icon, isLoadingFile, textTooltip, ...rest } :ActionUploadFileProps) {
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="relative flex items-center justify-center bg-inherit hover:bg-gray-200 disabled:text-gray-500 w-7 h-7 rounded-full cursor-pointer">
                        {
                            isLoadingFile
                            ?
                            <LoadingIndicatorAnimated styles="w-5 h-5 border-[3px]" />
                            :
                            <Icon className="h-[18px] w-[18px] text-gray-800 hover:text-gray-500" />
                        }
                        <Input
                            {...rest}
                            className="absolute bg-inherit left-0 w-[15%] h-[100%] cursor-pointer" 
                            style={{opacity: 0, cursor: 'pointer'}}
                            type="file" 
                            accept=".ris"
                            id="inputFileLoaded"
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-green-800 max-w-md">{textTooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export const ActionBar = {
    Bar: Bar,
    Action: Action,
    ActionUploadFile: ActionUploadFile
}