import { RiskProps } from "@/app/CardRiskAnalysisAI/_components/card-analysis";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function GenerateAI( req :string) {

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    const genAI = new GoogleGenerativeAI(apiKey)


    try {

        const model = genAI.getGenerativeModel({
              model: "gemini-1.5-pro",
              //model: "gemini-1.5-flash"
        });

        const generationConfig = {
            temperature: 1.8,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 400,
            responseMimeType: "text/plain"
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });

        const jsonModel = 'com as chaves risco: string (o valor da chave risco deve ser exatamente o mesmo que recebeu no prompt, iniciando com letra maiúscula), consequencias: string[] tamanho mínimo 1 e tamanho máximo 4, acoes: string[] tamanho mínimo 1 e tamanho máximo 4, images: any[]'

        const definitions = `Você é um técnico em segurança do trabalho e só deve responder perguntas relacionadas à segurança do trabalho. Você está fazendo uma inspeção de segurança em um ambiente de trabalho e  deve fazer uma análise resumida elencando no MÍNIMO 1 e no MÁXIMO 4 das principais consequencias que a exposição ao risco pode trazer para funcionário. Recomende no MÍNIMO 1 e no MÁXIMO 4 ações preventivas e/ou corretivas para o risco identificado. Para isso, consulte todas as NRs atualizadas, indicando o nexo causal e quando pertinente cite a Norma Regulamentadora que trata do tema sempre no formato (NR - Título) e explique como a norma é aplicada. Limite-se a uma resposta curta e objetiva e no formato JSON ${jsonModel} válido e remova as aspas do início e do fim mas mantenha as endentações. Segue a descrição do risco: `
    
        const prompt = req
        
        const result = await chatSession.sendMessage(`${definitions} ${prompt}`)
        const response = result.response
        const code = response.text()
        
        return Response.json(JSON.parse(code))


    }catch(error) {
        console.log(error)
    }

    // const response = {
    //     risco: 'Funcionáro trabalhando em alutra sem EPI',
    //     consequencias: ['Quedas graves', 'Morte', 'fraturas graves'],
    //     acoes: ['Entregar EPIs necessários conforme estipula a NR-35', 'Cobrar a utilização correta dos EPIs'],
    //     images: []
    // }

    // return Response.json(JSON.parse(JSON.stringify(response)))
}