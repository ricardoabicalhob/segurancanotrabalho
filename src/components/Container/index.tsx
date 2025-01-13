import { Expand, Shrink } from "lucide-react"
import { ButtonHTMLAttributes, ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ContainerProps {
    children? :ReactNode
    titulo? :string
    maximizableComponent? :ReactNode
    actions? :ReactNode
}

export default function Container({ children, titulo, maximizableComponent, actions } :ContainerProps) {
    return(
        <div className={`flex flex-col items-center justify-center border-[1px] rounded-md min-w-full max-w-full m-2`}>
            <div className="bg-gray-100 flex w-full justify-between items-center rounded-tl-md rounded-tr-md">
                <span className="w-full mt-2 px-2 text-base antialiased">{titulo}</span>
                {actions}
                {maximizableComponent}
            </div>
            {children}
        </div>
    )
}

interface MaximizeContainerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    action? :()=> void
}

export function MaximizeContainer({action, ...rest} :MaximizeContainerProps) {

    const [ isExpanded, setIsExpanded ] = useState(false)

    function handleIsExpanded() {
        setIsExpanded(!isExpanded)
        if(action) {
            action()
        }
    }

    return(
        <button
            {...rest}
            className={twMerge("w-8 h-8 rounded flex items-center justify-center", rest.className)}
            onClick={()=> {
                handleIsExpanded()
            }}
        >
            {isExpanded && <Shrink className="w-4 h-4 text-gray-500 hover:text-green-600"/>}
            {!isExpanded && <Expand className="w-4 h-4 text-gray-500 hover:text-green-600" />}
        </button>
    )
}