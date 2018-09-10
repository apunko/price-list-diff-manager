import ArrayDiffHelper from '../helpers/array-diff-helper';
import XlsxHelper from '../helpers/xlsx-helper';

const PriceService = {
  parseRows: (fileConfig) => {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const rows = XlsxHelper.parseRows(fileConfig.path);

    return rows.slice(fileConfig.startRow - 1, rows.length - 1);
  },
  savePriceDiff: (oldConfig, newConfig) => {
    const oldRows = PriceService.parseRows(oldConfig);
    const newRows = PriceService.parseRows(newConfig);
    const addedRows = ArrayDiffHelper.getAddedRows(oldRows, oldConfig.idColumn - 1, newRows, newConfig.idColumn - 1);
    const removedRows = ArrayDiffHelper.getAddedRows(newRows, newConfig.idColumn - 1, oldRows, oldConfig.idColumn - 1);

    XlsxHelper.saveSheets(
      'out2.xls',
      [{ data: addedRows, name: 'Added items' }, { data: removedRows, name: 'Removed items' }],
    );
  },
};

export default PriceService;
