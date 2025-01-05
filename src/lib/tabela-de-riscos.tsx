export interface Risco {
    cor :string
    tipo :string
}

export interface TabelaDeRiscos {
    verde :Risco
    vermelho :Risco
    laranja :Risco
    amarelo :Risco
    azul :Risco
}

export const tabelaDeRiscosSimplificada :TabelaDeRiscos = {
    verde: {cor: 'bg-green-700', tipo: 'Físico'},
    vermelho: {cor: 'bg-red-500', tipo: 'Químico'},
    laranja: {cor: 'bg-orange-400', tipo: 'Biológico'},
    amarelo: {cor: 'bg-yellow-400', tipo: 'Ergonômico'},
    azul: {cor: 'bg-blue-700', tipo: 'Acidente'},
}

export interface InformacoesDoGrupoDeRisco {
    riscos: string[]
}

export interface TabelaDeRiscosCompletaProps {
    Físico :InformacoesDoGrupoDeRisco
    Químico :InformacoesDoGrupoDeRisco
    Biológico :InformacoesDoGrupoDeRisco
    Ergonômico :InformacoesDoGrupoDeRisco
    Acidente :InformacoesDoGrupoDeRisco
}

export const TabelaDeRiscosCompleta :TabelaDeRiscosCompletaProps = {
    Físico: {
        riscos: [
            'Vibrações',
            'Radiações ionizantes (raio-x, alfa gama)',
            'Radiações não ionizantes',
            'Temperaturas extremas',
            'Frio',
            'Calor',
            'Pressões anormais',
            'Umidade'
        ]
    },

    Químico: {
        riscos: [
            'Poeiras',
            'Fumos',
            'Névoas',
            'Neblinas',
            'Gases',
            'Vapores',
            'Substâncias, compostos ou produtos químicos em geral',
        ]
    },
    
    Biológico: {
        riscos: [
            'Vírus',
            'Bactéria',
            'Protozoários',
            'Fungos',
            'Parasitas',
            'Bacilos',
            'Sangue',
        ]
    },
    
    Ergonômico: {
        riscos: [
            'Esforço físico intenso',
            'Exigência de postura inadequada (local de trabalho inadequado)',
            'Levantamento e transporte manual de peso',
            'Postura inadequada',
            'Controle rígido de produtividade',
            'Imposição de rítimos excessivos',
            'Trabalho em turno e noturno',
            'Jornada de trabalho prolongada',
            'Monotomia e repetitividade',
            'Outras situações causadoras de stress físico ou psicológico'
        ]
    },
    
    Acidente: {
        riscos: [
            'Arranjo físico inadequado',
            'Piso escorregadio',
            'Máquinas e equipamentos sem proteção',
            'Ferramentas inadequadas ou defeituosas',
            'Iluminação inadequada',
            'Eletricidade',
            'Probabilidade de incêndio ou explosão',
            'Armazenamento inadequado',
            'Animais peçonhentos: (mordida de cobra, aranha, picada de escorpião, barbeiro, etc)',
            'Outras situações de risco que poderão contribuir para a ocorrência de acidentes'
        ]
    }
}

// export const tabelaDeRiscos = {
//     grupo1: {
//         cor: 'Verde',
//         tipo: 'Físico',
//         riscos: [
//             'Vibrações',
//             'Radiações ionizantes (raio-x, alfa gama)',
//             'Radiações não ionizantes',
//             'Temperaturas extremas',
//             'Frio',
//             'Calor',
//             'Pressões anormais',
//             'Umidade'
//         ]
//     },

//     grupo2: {
//         cor: 'Vermelho',
//         tipo: 'Químico',
//         riscos: [
//             'Poeiras',
//             'Fumos',
//             'Névoas',
//             'Neblinas',
//             'Gases',
//             'Vapores',
//             'Substâncias, compostos ou produtos químicos em geral',
//         ]
//     },
    
//     grupo3: {
//         cor: 'Marrom',
//         tipo: 'Biológico',
//         riscos: [
//             'Vírus',
//             'Bactéria',
//             'Protozoários',
//             'Fungos',
//             'Parasitas',
//             'Bacilos',
//             'Sangue',
//         ]
//     },
    
//     grupo4: {
//         cor: 'Amarelo',
//         tipo: 'Ergonômico',
//         riscos: [
//             'Esforço físico intenso',
//             'Exigência de postura inadequada (local de trabalho inadequado)',
//             'Levantamento e transporte manual de peso',
//             'Postura inadequada',
//             'Controle rígido de produtividade',
//             'Imposição de rítimos excessivos',
//             'Trabalho em turno e noturno',
//             'Jornada de trabalho prolongada',
//             'Monotomia e repetitividade',
//             'Outras situações causadoras de stress físico ou psicológico'
//         ]
//     },
    
//     grupo5: {
//         cor: 'Azul',
//         tipo: 'Acidente',
//         riscos: [
//             'Arranjo físico inadequado',
//             'Piso escorregadio',
//             'Máquinas e equipamentos sem proteção',
//             'Ferramentas inadequadas ou defeituosas',
//             'Iluminação inadequada',
//             'Eletricidade',
//             'Probabilidade de incêndio ou explosão',
//             'Armazenamento inadequado',
//             'Animais peçonhentos: (mordida de cobra, aranha, picada de escorpião, barbeiro, etc)',
//             'Outras situações de risco que poderão contribuir para a ocorrência de acidentes'
//         ]
//     }
// }