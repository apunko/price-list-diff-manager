import XLSX from 'xlsx';
import * as Log from 'electron-log';

function sheetToArray(sheet) {
  const result = [];
  let row;
  let rowNum;
  let colNum;
  const range = XLSX.utils.decode_range(sheet['!ref']);
  for (rowNum = range.s.r; rowNum <= range.e.r; rowNum += 1) {
    row = [];
    for (colNum = range.s.c; colNum <= range.e.c; colNum += 1) {
      const nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
      if (typeof nextCell === 'undefined') {
        row.push(undefined);
      } else row.push(nextCell.w);
    }
    result.push(row);
  }

  return result;
}

const PriceService = {
  parseRows(fileConfig) {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const file = XLSX.readFile(fileConfig.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    Log.info(`${Date(Date.now)}:\n Read: ${fileConfig.path};\n Sheets names: ${file.SheetNames}`);

    return sheetToArray(sheet);
  },
};

export default PriceService;
