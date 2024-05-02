import ExcelJS from 'exceljs'
import { sheetAnalyser } from './SheetAnalyser'

const FileSaver = require('file-saver');

const saveEx = async (item, experimentName) => {
  const buffer = await item.xlsx.writeBuffer();
  const blob = new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  FileSaver.saveAs(blob, `ResultsExcel ${experimentName}.xlsx`);
}

const extractFileName = fileString => {
  let fileName = fileString.replace("Raw data-", "");
  fileName = fileName.replace(".xlsx", "");
  fileName = fileName.replace(/\s+/g, "");
  return fileName;
 }

export const inputFiles = () => {
  const fileInput = document.getElementById("ctrl");
  const files = fileInput.files;
  const experimentName = extractFileName(files[0].name)

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
          x.eachSheet(sheet => {
            sheetAnalyser(sheet, worksheet)
          })
          saveEx(workbook, experimentName)
        })
      }
    }
  }
};
