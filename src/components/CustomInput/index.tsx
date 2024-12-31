
import { ForwardRefExoticComponent, RefAttributes, useEffect, useRef, useState } from "react"
import { InputProps } from "../ui/input"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    classNameContainer? :string
    label? :string
}

export default function CustomInput({ 
    classNameContainer, 
    label,
    ...rest
 } :CustomInputProps) {

    const [value, setValue] = useState('')
    const inputRef = useRef(null)

    return(
        <div
            id={`container${label}`}
            className={`relative disabled:cursor-not-allowed px-3 pt-1 pb-1.5 border-[1px] rounded-md ${classNameContainer}`}
        >
            <label
                id={`label${label}`}
                htmlFor={'input'}
                className="absolute bg-white w-[80%] text-gray-500 px-1
                           top-6 text-sm -translate-y-4 scale-100 transform origin-top-left 
                           transition-all 
                           duration-200 
                           valid:scale-90 
                           valid:top-2 cursor-text"
            >{label}</label>
            <input
                {...rest}

                onFocus={()=> {
                    document.getElementById(`label${label}`)?.classList.remove('w-[80%]')
                    document.getElementById(`container${label}`)?.classList.add('border-green-600')

                    document.getElementById(`label${label}`)?.classList.replace('top-6', 'top-2')
                    document.getElementById(`label${label}`)?.classList.replace('scale-100', 'scale-90')

                }}

                onBlur={(e)=> {
                    document.getElementById(`container${label}`)?.classList.remove('border-green-600')
                    if(e.target.checkValidity()) {
                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')
                    } else {
                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')

                        document.getElementById(`label${label}`)?.classList.add('w-[80%]')

                        document.getElementById(`label${label}`)?.classList.replace('top-2', 'top-6')
                        document.getElementById(`label${label}`)?.classList.replace('scale-90', 'scale-100')
                    } 
                }}
                value={value}
                ref={inputRef}
                required
                className="w-full focus:outline-none text-sm shrink peer"
                onChange={event => setValue(event.target.value)}
            />
            
        </div>
    )
}