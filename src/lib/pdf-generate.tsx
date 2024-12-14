import { RiskProps } from '@/app/CardRiskAnalysisAI/_components/card-analysis'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts

export type inspectionInformations = {
    empresa :string
    areaLotacao :string
    localInspecionado :string
    areaEmitente :string
    cidade :string
    cipa :string
    data : Date
    hora :string
    responsavelPelaInspecao :string
    funcaoResponsavelPelaInspecao :string
    matriculaResponsavelPelaInspecao :string
}


export default async function generatePdf(contentEntry :Array<RiskProps>, inspectionInformations :inspectionInformations) {

    function createTableRow(imageUrl :string) {
        return [
            {
                image: imageUrl,
                width: 100,
                height: 100
            },
            {
                image: imageUrl,
                width: 100,
                height: 100
            }
        ]
    }

    const documentDefinition = {

        pageSize: 'A4',

        pageMargins: [40, 60, 40, 60],

        content: [
                    {text: 'Relatório de Inspeção de Segurança', fontSize: 16, alignment: 'center'},
                    {text: ' '},
                    {text: ' '},

                    
                    {
                        table: {
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            headerRows: 1,
                            widths: [ '*', 'auto', 'auto' ],
                    
                            body: [
                              [ {text: `Empresa: ${inspectionInformations.empresa}`, fontSize: 11}, {text: `Data: ${inspectionInformations.data.toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false})}`, fontSize: 11}, {text: `Hora: ${inspectionInformations.hora}`, fontSize: 11} ],
                              [ {text: `Local: ${inspectionInformations.localInspecionado}`, fontSize: 11}, {text: `Cidade: ${inspectionInformations.cidade}`, fontSize: 11}, {text: `Área emitente: ${inspectionInformations.areaEmitente}`, fontSize: 11} ],
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
                            riskSituation.images.length === 0 ? {text: 'Fotos não incluídas.', fontSize: 11} : null,

                            {
                                table: {
                                    headerRows: 1,
                                    widths: [ '*', '*' ],
                                    
                                    body: [
                                        
                                        riskSituation.images.map(image => ({
                                            image: image,
                                            fit: [290, 160],
                                            alignment: 'center',
                                            style: 'imageStyle'
                                        }))


                                        // riskSituation.images.forEach((imageUrl, index)=>{
                                        //     if(index % 2 === 0) {
                                        //         documentDefinition.content[10][4].table.body.push(createTableRow(imageUrl))
                                        //     }else {
                                        //         documentDefinition.content[10][4].table.body[documentDefinition.content[0].table.body.length -1].push({
                                        //             image: imageUrl,
                                        //             width: 100,
                                        //             height: 100
                                        //         })
                                        //     }
                                        // })
                                        
                                    ],
                                    styles: {
                                        imageStyle: {
                                            margin: [5, 5, 5, 5], // Margens ao redor da imagem
                                            border: 0, // Borda de 1 pixel
                                        }
                                    },
                                    layout: {
                                        hLineColor: ()=> 'transparent',
                                        vLineColor: ()=> 'transparent'
                                    }
                                }
                            },                   
                           
                            {text: ' ', },

                            {text:' '},
                            {text: 'Consequências', fontSize: 12, bold: true},
                            {text: ' ', },
                            {
                                ul: [...riskSituation.consequencias], fontSize: 11, alignment: 'justify'
                            },
                            {text: ' '},
                            {text: 'Ações recomendadas', fontSize: 12, bold: true},
                            {text: ' ', },
                            {
                                ul: [...riskSituation.acoes], fontSize: 11, alignment: 'justify'
                            },
                            {text: ' '},
                        ]
                    )),

                    {text: ' ', },
                    {text: ' ', },
                    {text: ' ', },
                    {text: ' ', },
                    {text: ' ', },
                    {text: ' ', },
                    {text: '_____________________________________________', alignment: 'center'},
                    {text: inspectionInformations.responsavelPelaInspecao, alignment: 'center'},
                    {text: 'Responsável pela inspeção', alignment: 'center' },
                ]
    }

    pdfMake.createPdf(documentDefinition).download()

}