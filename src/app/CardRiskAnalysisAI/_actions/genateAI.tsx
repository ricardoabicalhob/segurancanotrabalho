'use server'

export default async function generateAI(formData :FormData) {
    try {
        const { prompt } = Object.fromEntries(formData.entries())

        console.log('Requisição: ', {prompt})
        
        const response = await fetch('../../api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({body: prompt}),
        })

        const data = await response.json()


        if(response.ok) {
            console.log(data)
        }else{
            console.log('Algo deu errado!')
        }

    }catch(error) {
        console.log('Error: ', error)
    }
}