import ExcelJS from 'exceljs'
import { sheetAnalyser } from './SheetAnalyser'

const FileSaver = require('file-saver');

const saveEx = async (item) => {
  const buffer = await item.xlsx.writeBuffer(); // maybe here is the problem
  const blob = new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  FileSaver.saveAs(blob, `ResultsExcel ${item.modified}.xlsx`);
}

export const inputFiles = () => {
  const fileInput = document.getElementById("ctrl");
  const files = fileInput.files;

  const reader = new FileReader();
  const wb = new ExcelJS.Workbook();
  
  for (let key in files) {
    const file = files[key] || false;
    if (file?.name && file.name !== "item") {
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Results');
        worksheet.columns = [
          { header: 'Trial', key: 'trial', width: 10 },
          { header: 'Arena', key: 'arena', width: 10 },
          { header: 'Sequence', key: 'sequence', width: 80 },
          { header: 'Percent', key: 'percent', width: 20 }
        ];

        wb.xlsx.load(reader.result).then(x => {
          x.eachSheet((sheet, id) => {
            sheetAnalyser(sheet, worksheet)
          })
          // console.log('worksheet.getRow(2)', worksheet.getRow(2)) // have access in this position
          saveEx(workbook) // but we have only first two sheet printed
        })
        // console.log('worksheet.getRow(2)', worksheet.getRow(2))
        // here have no access
      }
    }
  }
};

// Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
//     Policy set or a policy with "unsafe-eval" enabled. This exposes users of
//     this app to unnecessary security risks.

// For more information and help, consult
// https://electronjs.org/docs/tutorial/security.
// This warning will not show up
// once the app is packaged.