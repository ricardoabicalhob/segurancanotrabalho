import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis"
import { Edit, ListX } from "lucide-react"
import { twMerge } from 'tailwind-merge'
import { ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode, Suspense, useEffect, useRef } from "react"
import { ListRisks } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface GenericItemProps {
    item :RiskProps
    key :React.Key
}

interface MyCustomListProps extends HTMLAttributes<HTMLDivElement> {
    emptyList? :ReactNode
    children? :ReactNode
    data :ListRisks
    horizontalAlignment? :'start' | 'center' | 'end' | 'auto'
    renderItemComponent :React.FC<GenericItemProps>
}

function MyCustomList({ data , horizontalAlignment, emptyList, renderItemComponent, children, ...rest } :MyCustomListProps) {
    
    const containerItemsRef = useRef<HTMLDivElement>(null)

    useEffect(()=> {
        setTimeout(() => {
            if(containerItemsRef.current) {
                containerItemsRef.current.classList.add('flex-grow')
                containerItemsRef.current.classList.add('overflow-y-auto')
            }    
        }, 100);
        
    }, [containerItemsRef.current])

    return(
        <Suspense fallback={'Carregando...'}>
            <div 
                key="containerList"     
                {...rest} 
                className={twMerge(`flex flex-col flex-grow 
                    w-full
                    h-full
                    md:max-w-full  
                    rounded-md
                    px-1 pb-2 pt-1 gap-2
                    ${horizontalAlignment === 'start'? 'self-start' : ''}
                    ${horizontalAlignment === 'center'? 'self-center' : ''}
                    ${horizontalAlignment === 'end'? 'self-end' : ''}
                    ${horizontalAlignment === 'auto'? 'self-auto' : ''}
                    bg-white` , rest.className)
                }
            >

                {children}

                <div 
                    key="containerItems" 
                    ref={containerItemsRef}
                    className={`
                        flex flex-col basis-0
                        max-w-full rounded-md
                        custom-scrollbar
                        px-3 pt-3 gap-2
                        overflow-y-auto
                        bg-white
                    `}
                >
                    {
                        data?.length
                        ?  
                        data.map((item, index)=> (
                            renderItemComponent({key: index, item: item})
                        ))
                        :
                        emptyList
                    }
                </div>
            </div>
        </Suspense>
    )
}

interface TitleListProps {
    title :string
    horizontalAlignment? :'left' | 'center' | 'right'
}

function TitleList( {title, horizontalAlignment} :TitleListProps) {

    return(
        <span 
            key={'title'}
            className={`items-center
                px-3 py-5 ml-3 mr-4
                rounded-md leading-relaxed
                font-bold select-none
                text-base md:text-xl
                ${horizontalAlignment === 'left'? 'text-left' : ''}
                ${horizontalAlignment === 'center'? 'text-center' : ''}
                ${horizontalAlignment === 'right'? 'text-right' : ''}
                bg-gray-100`
            }
        >
            {title}
        </span>
    )
}

interface ItemListProps {
    children :ReactNode
    item? :RiskProps
}

function ItemList({ item, children } :ItemListProps) {
    
    useEffect(()=> {
        const container = document.getElementById(`container-${item?.consequencias[0].id}`)

        container?.scrollIntoView({behavior: 'smooth'})
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
                    <div id={`container-${item?.consequencias[0].id}`} className="flex w-full min-h-fit
                                    items-center justify-between
                                    gap-1 pl-3 pr-1 py-1 rounded-md
                                    border-[1px] border-green-600
                                    transition duration-500 ease-in-out
                                    bg-green-100 hover:bg-gray-100"
                    >
                        <span 
                            className="text-sm md:text-sm select-none whitespace-nowrap overflow-hidden overflow-ellipsis"
                        >
                            {item?.risco}
                        </span>
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-green-800 whitespace-pre-line max-w-md">{item?.risco}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

interface ActionsItemListProps {
    children :ReactNode
}

function ActionsItemList({ children } :ActionsItemListProps) {
    return(
        <div className="flex gap-2">
            {children}
        </div>
    )
}

interface ActionItemListProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon :ElementType
}

function ActionItemList({ icon: Icon, ...rest } :ActionItemListProps) {
    return(
        <button
            {...rest}
            className={twMerge("w-8 h-8 rounded flex items-center justify-center bg-zinc-400 hover:bg-zinc-500", rest.className)}
        >
            <Icon className={'w-4 h-4'} />
        </button>
    )
}

interface EmptyListProps {
    text? :string
}

function EmptyList({ text } :EmptyListProps) {
    return(
        <div 
            className="flex flex-col flex-grow 
                items-center justify-center
                border-[1px] mr-1 rounded-md
                text-gray-400 leading-relaxed"
        >
            <ListX />
            <span className="text-sm">{text}</span>
        </div>
    )
}
    
export const CustomList = {
    Container: MyCustomList,
    Item: ItemList,
    ItemActions: ActionsItemList,
    ItemAction: ActionItemList,
    Title: TitleList,
    Empty: EmptyList
}