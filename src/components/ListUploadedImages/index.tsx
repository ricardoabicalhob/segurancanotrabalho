import { Image, ImageOff, ImagePlus, ListPlus, X } from "lucide-react";

interface ListUploadedImagesProps {
    items :string[]
    onDeleteItem :(fileName :string) => void
}

export default function ListUploadedImages( { items, onDeleteItem } :ListUploadedImagesProps ) {

    interface ItemListProps {
        fileName :string
    }

    const ItemList = ( {fileName} :ItemListProps ) => (
        <div className="flex flex-row items justify-between gap-1.5 bg-white rounded-md p-1.5">
            <div className="flex flex-row items-center gap-2 min-w-[85%] max-w-[85%]">
                <div className="flex flex-row items-center justify-center min-w-[10%] max-w-[10%]">
                    <Image className="text-black min-w-5 min-h-5 max-w-5 max-h-5"/>
                </div>
                
                <p className="flex text-justify min-w-[90%] max-w-[90%]">{fileName}</p>
            </div>
            <div 
                className="flex justify-center items-center min-w-[15%] max-w-[15%]"
            >
                <X
                    className="text-red-600 hover:text-red-400 min-w-5 h-5 max-w-5 min-h-5 max-h-5"
                    onClick={()=>{onDeleteItem(fileName)}}
                />
            </div>
        </div>
    )

    return(
        <div className="flex flex-col gap-2 bg-slate-100 rounded-md p-1.5">
            {
                items && items.map((item, index) => (
                    <ItemList fileName = {item} key={index}/>
                ))
            }
            {
                !items.length &&    <div className="flex flex-col items-center">
                                        <ImageOff className="text-gray-400 w-6 h-6"/>
                                        <p className="text-center font-bold text-gray-400">Ainda não foram adicionadas fotos</p>
                                    </div>
            }
        </div>
    )
}