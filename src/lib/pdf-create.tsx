import jsPDF from 'jspdf'


export default function createPDF(data :object) {

    const doc = new jsPDF()

    doc.text('Titulo do PDF', 14, 10)
    //doc.text(data.texto, 14, 20)

    doc.addImage(data, 'JPEG', 15, 40, 50, 50)

    doc.save('meu-pdf.pdf')

}