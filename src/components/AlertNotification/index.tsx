import { CircleX } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

interface AlertNotificationProps {
    text :string
}

export default function AlertNotification({ text } :AlertNotificationProps) {
    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <Card>
                <CardContent className='py-4 bg-red-200 rounded-md'>
                    <div className='flex items-center justify-center gap-3'>
                        <CircleX className='text-red-600'/>
                        <p className='flex flex-wrap'>{text}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}