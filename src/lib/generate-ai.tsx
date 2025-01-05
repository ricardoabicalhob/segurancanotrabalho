import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function GenerateAI( req :string ) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
        const genAI = new GoogleGenerativeAI(apiKey)

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        })

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 300,
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.OBJECT,
                properties: {
                    risco: {
                        type: SchemaType.STRING
                    },
                    consequencias: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                id: {
                                    type: SchemaType.STRING
                                },
                                value: {
                                    type: SchemaType.STRING
                                },
                                corDoGrupoDeRisco: {
                                    type: SchemaType.STRING
                                }
                            }
                        }
                    },
                    acoes: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                id: {
                                type: SchemaType.STRING
                                },
                                value: {
                                    type: SchemaType.STRING
                                }
                            }
                        }
                    }
                }
            },
        }

        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });

        const definitions = `Você é funcionário de uma empresa de saneamento e atua como técnico em segurança do trabalho. 
                            Sua função será responder apenas perguntas relacionadas à segurança do trabalho e principalmente
                            sobre situações que envolvam o setor de saneamento. Imagine que você está fazendo uma inspeção de segurança 
                            em um ambiente de trabalho e deve fazer uma análise bem resumida e breve elencando no MÍNIMO 1 e no MÁXIMO 
                            4 das principais consequencias que a exposição ao risco pode trazer para funcionário. As cores atribuídas
                            aos grupos de risco devem estar de acordo com o padrão: verde para risco tipo Físico, vermelho para risco tipo Químico, 
                            laranja para risco tipo Biológico, amarelo para risco tipo Ergonômico e azul para risco tipo Acidente. Recomende 
                            no MÍNIMO 1 e no MÁXIMO 4 ações preventivas e/ou corretivas para o risco identificado.`

        const prompt = req
        
        const result = await chatSession.sendMessage(`${definitions} ${prompt}`)
        const response = result.response
        const code = response.text()

        // console.log('Resposta da IA: ', JSON.parse(code ? code : ''))

        return Response.json(JSON.parse(code ? code : ''))

    }catch(error) {
        console.log('Erro ao obter resposta da IA: ', error)
    }
}

// export async function GenerateAI( req :string) {

//     try {

//         const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
//         const genAI = new GoogleGenerativeAI(apiKey)

//         const model = genAI.getGenerativeModel({
//               //model: "gemini-1.5-pro",
//               model: "gemini-1.5-flash"
//         });

//         const generationConfig = {
//             temperature: 1.8,
//             topP: 0.95,
//             topK: 40,
//             maxOutputTokens: 400,
//             responseMimeType: "text/plain",
//         }

//         const chatSession = model.startChat({
//             generationConfig,
//             history: [
//             ],
//         });

//         const jsonModel = `com as chaves risco: string (o valor da chave risco deve ser exatamente o mesmo que recebeu no prompt, iniciando com letra maiúscula), gruposRisco: string[] (retorne sempre a cor de 1 ou mais grupos de risco correspondente aos grupos da tabela ${JSON.stringify(tabelaDeRiscos)}, nunca retornar outro valor que não seja a cor do grupo), consequencias: object[] tamanho mínimo 1 onde cada elemento de consequencia e tamanho máximo 4 deve seguir a estrutura {id: '', value: string}, acoes: object[] tamanho mínimo 1 e tamanho máximo 4 onde cada elemento de acoes deve seguir a estrutura {id: '', value: string}, images: any[]`

//         const definitions = `Você é funcionário de uma empresa de saneamento e atua como técnico em segurança do trabalho. 
//                             Sua função será responder apenas perguntas relacionadas à segurança do trabalho e principalmente
//                             sobre situações que envolvam o setor de saneamento. Imagine que você está fazendo uma inspeção de segurança 
//                             em um ambiente de trabalho e deve fazer uma análise bem resumida e breve elencando no MÍNIMO 1 e no MÁXIMO 
//                             4 das principais consequencias que a exposição ao risco pode trazer para funcionário. Recomende 
//                             no MÍNIMO 1 e no MÁXIMO 4 ações preventivas e/ou corretivas para o risco identificado. 
//                             Para isso, consulte todas as NRs atualizadas, indicando o nexo causal e quando pertinente cite 
//                             a Norma Regulamentadora que trata do tema sempre no formato (NR - Título) e explique como a norma 
//                             é aplicada. Reforçando, limite-se a uma resposta curta e objetiva e no formato JSON ${jsonModel} válido e 
//                             remova as aspas do início e do fim mas mantenha as endentações. Segue a descrição do risco: `

//         const prompt = req
        
//         const result = await chatSession.sendMessage(`${definitions} ${prompt}`)
//         const response = result.response
//         const code = response.text()
        
//         return Response.json(await JSON.parse(code ? code : ''))


//     }catch(error) {
//         console.log(error)
//     }
// }