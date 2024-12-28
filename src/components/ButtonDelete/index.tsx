import { Trash2, X } from "lucide-react";

interface ButtonDeleteProps {
    onDelete :()=> void
}

export function ButtonDelete( { onDelete } :ButtonDeleteProps) {
    return(
        <div 
            className="mb-[-24px] z-50 flex items-center justify-center rounded-full w-6 h-6 self-end bg-gray-200 hover:bg-red-400 cursor-pointer" 
            onClick={onDelete}
        >
            <Trash2 className="w-6 h-6 text-black select-none rounded-full p-1 hover:text-white cursor-pointer"/>
        </div>
    )
}