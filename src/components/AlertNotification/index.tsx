import { CircleX } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

export default function AlertNotification() {
    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <Card>
                <CardContent className='py-2'>
                    <div className='flex items-center justify-center gap-3'>
                        <CircleX className='text-red-600'/>
                        <p>Algo deu errado! Por favor, tente novamente.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}