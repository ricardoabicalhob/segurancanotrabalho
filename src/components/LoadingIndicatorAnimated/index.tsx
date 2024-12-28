import { Brain } from "lucide-react";
import Image from "next/image";

interface LoadingIndicatorAnimatedProps {
    styles? :string
}

export default function LoadingIndicatorAnimated({ styles } :LoadingIndicatorAnimatedProps) {
    return(
        <div 
            className={`w-12 h-12 flex items-center justify-center border-8 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-green-600 animate-spin ease-linear rounded-full ${styles}`}
        >
            {/* <Brain/> */}
            {/* <Image className="self-center" alt="" src={require('../../lib/imagens/logo-cipa-2.png')} width={40} height={40}/> */}
            
        </div>
    )
}