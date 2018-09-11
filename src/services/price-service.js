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
    const risenPriceRows = ArrayDiffHelper.getPriceDiffRows(
      oldRows,
      { idColumn: oldConfig.idColumn - 1, priceColumn: oldConfig.priceColumn - 1 },
      newRows,
      { idColumn: newConfig.idColumn - 1, priceColumn: newConfig.priceColumn - 1 },
      (a, b) => (a > b),
    );
    const cheaperRows = ArrayDiffHelper.getPriceDiffRows(
      oldRows,
      { idColumn: oldConfig.idColumn - 1, priceColumn: oldConfig.priceColumn - 1 },
      newRows,
      { idColumn: newConfig.idColumn - 1, priceColumn: newConfig.priceColumn - 1 },
      (a, b) => (a < b),
    );

    XlsxHelper.saveSheets(
      [
        { data: addedRows, name: 'Added items' },
        { data: removedRows, name: 'Removed items' },
        { data: risenPriceRows, name: 'New Price +' },
        { data: cheaperRows, name: 'New Price -' },
      ],
    );
  },
};

export default PriceService;
