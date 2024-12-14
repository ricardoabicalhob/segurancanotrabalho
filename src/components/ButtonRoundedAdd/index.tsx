import { Plus } from "lucide-react";

interface ButtonRoundedAdd {
    onAdd :()=>void
    text :string
}

export function ButtonRoundedAdd( { onAdd, text } :ButtonRoundedAdd) {
    return(
        <div 
            className="flex items-center justify-center bg-green-600 hover:bg-green-400 rounded-full w-fit h-6 px-2" 
            onClick={onAdd}
        >
            <Plus className="text-white w-4 h-4" />
            <p className="text-xs text-white select-none">{text}</p>
        </div>
    )
}