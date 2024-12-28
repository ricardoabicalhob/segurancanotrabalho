import { saveAs } from 'file-saver'
import { inspectionInformations } from './pdf-generate'

export default function DownloadFile(checkFilling :()=> boolean, inspectionInformations :inspectionInformations, listRisks :object) {

    const data = {
        checkFilling: checkFilling(),
        inspectionInformations: inspectionInformations,
        listRisks: listRisks
    }

    try {
        const file = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' })
        saveAs(file, `INSPECAO-DE-SEGURANCA-${inspectionInformations.areaLotacao}-${inspectionInformations.localInspecionado}-${new Date(Date.now()).toLocaleDateString('pt-BR')}-${new Date(Date.now()).toLocaleTimeString('pt-BR')}.ris`)
    } catch(error) {
        console.log(error)
    }
}