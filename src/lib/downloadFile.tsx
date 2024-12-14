import { saveAs } from 'file-saver'
import { inspectionInformations } from './pdf-generate'

export default function DownloadFile(inspectionInformations :inspectionInformations, listRisks :object) {

    const data = {
        inspectionInformations: inspectionInformations,
        listRisks: listRisks
    }

    try {
        const file = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' })
        saveAs(file, `INSPECAO-DE-SEGURANCA-${inspectionInformations.areaLotacao}-${inspectionInformations.localInspecionado}-${typeof inspectionInformations.data === 'string' ? new Date(inspectionInformations.data).toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false}) : inspectionInformations.data.toLocaleDateString('pt-BR', {timeZone: 'america/Sao_Paulo', hour12: false})}.ris`)
    } catch(error) {
        console.log(error)
    }
}