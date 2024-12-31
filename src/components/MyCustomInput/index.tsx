import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> { label :string, classNameContainer? :string, initialState :boolean}

const MyCustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className: className, type, label, classNameContainer, initialState , ...props }, ref) => {

    React.useEffect(()=> {
        if(initialState) {
            document.getElementById(`label${label}`)?.classList.remove('w-[80%]')

            document.getElementById(`input-${label}`)?.classList.add('disabled:text-gray-400')

            document.getElementById(`label${label}`)?.classList.replace('top-6', 'top-2')
            document.getElementById(`label${label}`)?.classList.replace('text-base', 'text-xs')     
            document.getElementById(`label${label}`)?.classList.replace('md:text-sm', 'text-xs')               
        }
    }, [initialState])

    return (
        <div
            id={`container${label}`}
            className={`relative disabled:cursor-not-allowed px-2 pt-2 md:pt-1 pb-1.5 md:pb-1.5 border-[1px] rounded-md ${classNameContainer}`}
        >
            <label
                id={`label${label}`}
                htmlFor={`input-${label}`}
                className="absolute select-none bg-white w-[80%] text-gray-500 px-1
                           top-6 -translate-y-4 text-base md:text-sm transform origin-top-left 
                           transition-all 
                           duration-200 
                           cursor-text"
            >{label}</label>
            <input
                className="w-full bg-inherit focus:outline-none text-base md:text-sm peer"
                id={`input-${label}`}
                type={type}
                required
                ref={ref}
                {...props}

                onFocus={()=> {
                    document.getElementById(`label${label}`)?.classList.remove('w-[80%]')
                    document.getElementById(`container${label}`)?.classList.add('border-green-600')

                    document.getElementById(`label${label}`)?.classList.replace('top-6', 'top-2')
                    document.getElementById(`label${label}`)?.classList.replace('text-base', 'text-xs')
                    document.getElementById(`label${label}`)?.classList.replace('md:text-sm', 'md:text-xs')

                }}

                onBlur={(e)=> {
                    document.getElementById(`container${label}`)?.classList.remove('border-green-600')
                    if(e.target.checkValidity()) {
                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')
                    } else {
                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')

                        document.getElementById(`label${label}`)?.classList.add('w-[80%]')

                        document.getElementById(`label${label}`)?.classList.replace('top-2', 'top-6')
                        document.getElementById(`label${label}`)?.classList.replace('text-xs', 'text-base')
                        document.getElementById(`label${label}`)?.classList.replace('md:text-xs', 'md:text-sm')

                    } 
                }}
            />
            
        </div>
    )
  }
)
MyCustomInput.displayName = "Input"

export { MyCustomInput }
