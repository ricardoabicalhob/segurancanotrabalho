import { DataContext } from "@/lib/datacontext";
import { NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { useContext } from "react";


// @ts-expect-error erro ja esperado
export default async function GeneratePdf(req, res :NextApiResponse) {

        // function uint8ArrayToBase64(array :Uint8Array) {
        //     // @ts-expect-error erro já previsto array
        //     return btoa(String.fromCharCode.apply(null, array)); 
        // }

        // const browser = await puppeteer.launch()
        // const page = await browser.newPage()

        // await page.goto('http://ricardoabicalhob.github.io/segurancanotrabalho/editor')
        // // await page.goto('http://localhost:3000/relatorio')
        

        // const pdfBuffer = await page.pdf({
        //     format: 'A4',
        //     printBackground: true,
        //     margin: {top: '1cm', right: '1cm', bottom: '1cm', left: '1cm'}
        // })

        // const base64Buffer = uint8ArrayToBase64(pdfBuffer)
        // const dataUrl = `data:application/pdf;base64,${base64Buffer}`       

        // await browser.close()

        // res?.setHeader('Content-Type', 'application/pdf')
        // //res?.setHeader('Content-Disposition', 'attachment; filename="meu-pdf.pdf"')
        // res?.send(base64Buffer)

        return(
            <html lang="pt-BR">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Relatório de Inspeção de Segurança do Trabalho</title>
            </head>
            <body>  
                <div className="h-screen w-screen">
                    {/* <iframe src={dataUrl} width="100%" height="100%"></iframe> */}
                    <iframe src="" width="100%" height="100%"></iframe>
                </div>
            </body>
            </html>
            
        )
}