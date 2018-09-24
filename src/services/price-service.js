import ArrayDiffHelper from '../helpers/array-diff-helper';
import XlsxHelper from '../helpers/xlsx-helper';
import Logger from '../helpers/logger';

const PriceService = {
  parseRows: (fileConfig) => {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const rows = XlsxHelper.parseRows(fileConfig.path);

    return rows.slice(fileConfig.startRow - 1, rows.length - 1);
  },
  calculateFilesDiff: (oldConfig, newConfig) => {
    const oldRows = PriceService.parseRows(oldConfig);
    const newRows = PriceService.parseRows(newConfig);
    const addedRows = ArrayDiffHelper.getAddedRows(oldRows, oldConfig.idColumn - 1, newRows, newConfig.idColumn - 1);
    const removedRows = ArrayDiffHelper.getAddedRows(newRows, newConfig.idColumn - 1, oldRows, oldConfig.idColumn - 1);
    const newPriceUprows = ArrayDiffHelper.getPriceDiffRows(
      oldRows,
      { idColumn: oldConfig.idColumn - 1, priceColumn: oldConfig.priceColumn - 1 },
      newRows,
      { idColumn: newConfig.idColumn - 1, priceColumn: newConfig.priceColumn - 1 },
      (a, b) => (a < b),
    );
    const newPriceDownRows = ArrayDiffHelper.getPriceDiffRows(
      oldRows,
      { idColumn: oldConfig.idColumn - 1, priceColumn: oldConfig.priceColumn - 1 },
      newRows,
      { idColumn: newConfig.idColumn - 1, priceColumn: newConfig.priceColumn - 1 },
      (a, b) => (a > b),
    );

    const priceChangedRows = newPriceUprows
      .map(row => ({ up: true, data: row }))
      .concat(newPriceDownRows.map(row => ({ up: false, data: row })));

    return {
      addedRows,
      removedRows,
      priceChangedRows,
    };
  },
  saveFilesDiff: (priceDiff) => {
    Logger.info('Prepare priceDiff data to export');
    XlsxHelper.saveSheets(
      [
        { data: priceDiff.addedRows, name: 'Added items' },
        { data: priceDiff.removedRows, name: 'Removed items' },
        {
          data: priceDiff.priceChangedRows.reduce((newPriceUpRows, row) => {
            if (row.up) { newPriceUpRows.push(row.data); }

            return newPriceUpRows;
          }, []),
          name: 'New Price +',
        },
        {
          data: priceDiff.priceChangedRows.reduce((newPriceDownRows, row) => {
            if (!row.up) { newPriceDownRows.push(row.data); }

            return newPriceDownRows;
          }, []),
          name: 'New Price -',
        },
      ],
    );
  },
};

export default PriceService;
