'use client'
import { saveAs } from 'file-saver'
import { inspectionInformationsProps, inspectionInformationsTeste, ListRisks } from './types'
import { useContext } from 'react'
import { DataContext } from './datacontext'
import { SystemContext } from './context/SystemContext'

export default function DownloadFileRIS(checkFilling :()=> boolean, inspectionData:inspectionInformationsTeste | undefined, listRisks: ListRisks) {

    const data = {
        checkFilling: checkFilling(),
        inspectionData: inspectionData,
        listRisks: listRisks
    }

    try {
        const file = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' })

        if(inspectionData) {
            saveAs(file, `INSPECAO-DE-SEGURANCA-${inspectionData.areaLotacao}-${inspectionData.localInspecionado}-${new Date(Date.now()).toLocaleDateString('pt-BR')}-${new Date(Date.now()).toLocaleTimeString('pt-BR')}.ris`)
        }else {
            console.log('Erro no inspectionData: ', inspectionData)
        }
    } catch(error) {
        console.log('Erro ao baixar o arquivo.', error)
    }
}