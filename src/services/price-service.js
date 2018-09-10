import XLSX from 'xlsx';
import Logger from '../helpers/logger';
import ArrayDiffHelper from '../helpers/array-diff-helper';

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
  savePriceDiff: (oldFileConfig, newFileConfig) => {
    const oldFileRows = PriceService.parseRows(oldFileConfig);
    const newFileRows = PriceService.parseRows(newFileConfig);

    const addedRows = ArrayDiffHelper.selectAddedRows(
      oldFileRows,
      oldFileConfig.idColumn - 1,
      newFileRows,
      newFileConfig.idColumn - 1,
    );
    const removedRows = ArrayDiffHelper.selectAddedRows(
      newFileRows,
      newFileConfig.idColumn - 1,
      oldFileRows,
      oldFileConfig.idColumn - 1,
    );
    Logger.info(addedRows.length);
    Logger.info(removedRows.length);
  },
};

export default PriceService;
