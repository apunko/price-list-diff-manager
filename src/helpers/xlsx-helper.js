import XLSX from 'xlsx';
import Logger from './logger';

const XlsxHelper = {
  sheetToArray: (sheet) => {
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
  },
  parseRows: (path) => {
    const file = XLSX.readFile(path);
    const sheet = file.Sheets[file.SheetNames[0]];
    Logger.info(`Read: ${path};\n Sheets names: ${file.SheetNames}`);

    return XlsxHelper.sheetToArray(sheet);
  },
  saveSheets: (filename, sheets) => {
    const book = XLSX.utils.book_new();
    for (let i = 0; i < sheets.length; i += 1) {
      const sheet = XLSX.utils.json_to_sheet(sheets[i].data);
      XLSX.utils.book_append_sheet(book, sheet, sheets[i].name);
    }

    return XLSX.writeFile(book, filename);
  },
};

export default XlsxHelper;
