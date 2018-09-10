import XLSX from 'xlsx';
import Logger from '../helpers/logger';
import ArrayDiffHelper from '../helpers/array-diff-helper';
import XlsHelper from '../helpers/xls-helper';

const PriceService = {
  parseRows: (fileConfig) => {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const file = XLSX.readFile(fileConfig.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    Logger.info(`Read: ${fileConfig.path};\n Sheets names: ${file.SheetNames}`);
    const rows = XlsHelper.sheetToArray(sheet);

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
