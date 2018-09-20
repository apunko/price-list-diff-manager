import XLSX from 'xlsx';
import Logger from './logger';

// eslint-disable-next-line import/no-extraneous-dependencies
const { dialog } = require('electron').remote;

const XlsxHelper = {
  sheetToArray: (sheet) => {
    const result = [];
    let row;
    let rowNum;
    let colNum;
    const range = XLSX.utils.decode_range(sheet['!ref']);
    // debugger;
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
  },
  parseRows: (path) => {
    const file = XLSX.readFile(path);
    const sheet = file.Sheets[file.SheetNames[0]];
    Logger.info(`Read: ${path};\n Sheets names: ${file.SheetNames}`);

    return XlsxHelper.sheetToArray(sheet);
  },
  updateCatalog: (path, rowsObjects, idSymbol, priceSymbol) => {
    Logger.info(`Start read catalog${path}`);
    const file = XLSX.readFile(path);
    file.SheetNames.forEach((sheetName) => {
      const sheet = file.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      const sheetLength = range.e.r;
      for (let i = 1; i <= sheetLength; i += 1) {
        const r = rowsObjects.find(row => String(row.id) === String(sheet[`${idSymbol}${i}`].v));

        if (r) {
          Logger.info(`Found ${r.id}. updating price ...`);
          sheet[`${priceSymbol}${i}`] = {
            t: 'n',
            v: r.price,
          };
        }
      }
    });

    const saveDialog = dialog.showSaveDialog({ defaultPath: 'Catalog_updated.xlsx' });
    if (!saveDialog) { return; }

    Logger.info('Start write updated catalog');
    XLSX.writeFile(file, saveDialog);
  },
  saveSheets: (sheets) => {
    Logger.info('Attempt to save sheets.');
    const book = XLSX.utils.book_new();
    for (let i = 0; i < sheets.length; i += 1) {
      const sheet = XLSX.utils.json_to_sheet(sheets[i].data);
      XLSX.utils.book_append_sheet(book, sheet, sheets[i].name);
    }

    const saveDialog = dialog.showSaveDialog({ defaultPath: 'DiffBook.xlsx' });
    if (!saveDialog) { return; }

    XLSX.writeFile(book, saveDialog);
    Logger.info('File was saved');
  },
};

export default XlsxHelper;
