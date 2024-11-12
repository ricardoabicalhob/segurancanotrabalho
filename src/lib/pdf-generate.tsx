import { RiskProps } from '@/app/CardRiskAnalysisAI/_components/card-analysis'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts

export default async function generatePdf(contentEntry :Array<RiskProps>) {

    const documentDefinition = {

        content: [
                    {text: 'Relatório de Inspeção de Segurança', fontSize: 16, alignment: 'center'},
                    {text: ' '},
                    {text: ' '},

                    
                    {
                        table: {
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            headerRows: 1,
                            widths: [ '*', '*', '*' ],
                    
                            body: [
                              [ {text: 'Empresa: ', fontSize: 11}, {text: 'Data: ', fontSize: 11}, {text: 'Hora: ', fontSize: 11} ],
                              [ {text: 'Local: ', fontSize: 11}, {text: 'Cidade: ', fontSize: 11}, {text: 'Área emitente: ', fontSize: 11} ],
                            ]
                          }
                    },

                    {text: ' ', },
                    {text: 'INDICAÇÃO DAS NÃO CONFORMIDADES', alignment: 'center'},
                    {text: ' ', },
                    {text: 'Solicitamos sua especial atenção para o assunto citado, visto que são irregularidades que comprometem a segurança do(s) funcionário(s) e/ou equipamento(s) no local de trabalho e terceiros.', fontSize: 10, alignment: 'justify'},
                    {text: ' ', },
                    {text: ' ', },
                    
                    contentEntry.map((riskSituation, index)=>(
                        [
                            {text: `${index + 1}. ${riskSituation.risco}`, fontSize: 14, bold: true},

                            {text:' '},
                            {text: 'Fotos', fontSize: 12, bold: true},
                            {text: ' ', },
                            
                            riskSituation.images.map((img, index) => (
                                [
                                    {image: riskSituation.images[index], fit: [300, 160], alignment: 'center'},
                                    {text: ' ', },
                                ]
                            )),
                            {text: ' ', },

                            {text:' '},
                            {text: 'Consequências', fontSize: 12, bold: true},
                            {text: ' ', },
                            {
                                ul: riskSituation.consequencias, fontSize: 11, alignment: 'justify'
                            },
                            {text: ' '},
                            {text: 'Ações recomendadas', fontSize: 12, bold: true},
                            {text: ' ', },
                            {
                                ul: riskSituation.acoes, fontSize: 11, alignment: 'justify'
                            },
                            {text: ' '},
                        ]
                    ))
                ]
    }

    pdfMake.createPdf(documentDefinition).download()

}