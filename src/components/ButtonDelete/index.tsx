import { X } from "lucide-react";

interface ButtonDeleteProps {
    onDelete :()=> void
}

export function ButtonDelete( { onDelete } :ButtonDeleteProps) {
    return(
        <div 
            className="absolute flex items-center justify-center rounded-full w-6 h-6 self-end bg-gray-300 hover:bg-red-600" 
            onClick={onDelete}
        >
            <X className="w-4 h-4 text-white"/>
        </div>
    )
}