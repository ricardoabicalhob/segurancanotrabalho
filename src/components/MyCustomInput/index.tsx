import * as React from "react"

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> { 
    label :string, 
    classNameContainer? :string, 
    initialState :boolean
    width? :number
}

const MyCustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className: className, type, label, width, classNameContainer, initialState , ...props }, ref) => {

    React.useEffect(()=> {
        if(initialState) {
            if(type === 'date' || type === 'time'){
                document.getElementById(`label${label}`)?.classList.replace('w-[80%]', 'w-fit')
            }else {
                document.getElementById(`label${label}`)?.classList.replace(`w-[${width*0.96}%]`, 'w-fit')
            }

            document.getElementById(`input-${label}`)?.classList.add('disabled:text-gray-400')

            document.getElementById(`label${label}`)?.classList.replace('top-6', 'top-2')
            document.getElementById(`label${label}`)?.classList.replace('text-base', 'text-xs')     
            document.getElementById(`label${label}`)?.classList.replace('md:text-sm', 'md:text-xs')               
        }
    }, [initialState])

    return (
        <div
            id={`container${label}`}
            className={`relative w-[${width}%] px-2 pt-2 md:pt-2 pb-1.5 md:pb-0.5 border-[1px] rounded-md ${classNameContainer}`}
        >
            <label
                id={`label${label}`}
                htmlFor={`input-${label}`}
                className={`absolute select-none bg-white ${type === 'date' || type === 'time'? 'w-[80%]' : `w-[${width*0.96}%]`} text-gray-500 px-1
                           top-6 -translate-y-4 text-base md:text-sm transform origin-top-left 
                           transition-all 
                           duration-200 
                           cursor-text`}
            >{label}</label>
            <input
                className="w-full bg-inherit uppercase rounded-[5px] disabled:text-gray-400 focus:outline-none text-base md:text-sm peer"
                id={`input-${label}`}
                type={type}
                required
                ref={ref}
                autoCapitalize='off'
                {...props}

                onFocus={()=> {
                    if(type === 'date' || type === 'time'){
                        document.getElementById(`label${label}`)?.classList.replace('w-[80%]', 'w-fit')
                    }else {
                        document.getElementById(`label${label}`)?.classList.replace('w-[96%]', 'w-fit')
                    }

                    document.getElementById(`label${label}`)?.classList.replace('top-6', 'top-2')
                    document.getElementById(`label${label}`)?.classList.replace('text-base', 'text-xs')
                    document.getElementById(`label${label}`)?.classList.replace('md:text-sm', 'md:text-xs')

                    document.getElementById(`container${label}`)?.classList.add('border-green-600')
                }}

                onBlur={(e)=> {
                    document.getElementById(`container${label}`)?.classList.remove('border-green-600')
                    if(e.target.checkValidity()) {
                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')

                    } else {
                        document.getElementById(`label${label}`)?.classList.replace('top-2', 'top-6')
                        document.getElementById(`label${label}`)?.classList.replace('text-xs', 'text-base')
                        document.getElementById(`label${label}`)?.classList.replace('md:text-xs', 'md:text-sm')

                        document.getElementById(`container${label}`)?.classList.remove('border-green-600')

                        if(type === 'date' || type === 'time'){
                            document.getElementById(`label${label}`)?.classList.replace('w-fit', 'w-[80%]')
                        }else {
                            document.getElementById(`label${label}`)?.classList.replace('w-fit', 'w-[96%]')
                        }
                    } 
                }}
            />
            
        </div>
    )
  }
)
MyCustomInput.displayName = "Input"

export { MyCustomInput }
