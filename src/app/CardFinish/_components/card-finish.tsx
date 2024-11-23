import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function CardFinish() {
    return(
        <Card>
            <CardContent className="p-6">
                <Button className="bg-green-600 hover:bg-green-400">Emitir relatório</Button>
            </CardContent>
            <CardFooter>
                <Link target="_blank" className="bg-green-600 hover:bg-green-400 rounded-md py-2 px-4 text-white text-sm" href={'/api/generate-pdf'}>
                    Baixar o relatório em PDF
                </Link>
            </CardFooter>
        </Card>
    )
}