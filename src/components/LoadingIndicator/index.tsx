import { Card, CardContent } from '../ui/card'
import LoadingIndicatorAnimated from '../LoadingIndicatorAnimated'

interface LoadingIndicatorProps {
    text :string
}

export default function LoadingIndicator({ text } :LoadingIndicatorProps) {
    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <Card>
                <CardContent className='py-2'>
                    <div className='flex items-center justify-center gap-3'>
                        <LoadingIndicatorAnimated/>
                        <p>{text}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}