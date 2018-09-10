import XLSX from 'xlsx';
import Logger from '../helpers/logger';

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
  parseRows: (fileConfig) => {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const file = XLSX.readFile(fileConfig.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    Logger.info(`Read: ${fileConfig.path};\n Sheets names: ${file.SheetNames}`);
    const rows = sheetToArray(sheet);

    return rows.slice(fileConfig.startRow - 1, rows.length - 1);
  },
  selectNewRows: (oldPriceRows, oldPriceIdColumn, newPriceRows, newIdColumn) => (
    newPriceRows.filter(priceRow => (
      !PriceService.isInPrice(oldPriceRows, oldPriceIdColumn, priceRow[newIdColumn])
    ))
  ),
  isInPrice: (rows, idColumn, rowFromDifferentId) => (
    rows.some(row => row[idColumn] === rowFromDifferentId)
  ),
};

export default PriceService;
