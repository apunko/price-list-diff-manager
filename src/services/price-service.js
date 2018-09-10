import ArrayDiffHelper from '../helpers/array-diff-helper';
import XlsxHelper from '../helpers/xlsx-helper';

const PriceService = {
  parseRows: (fileConfig) => {
    if (!fileConfig && !fileConfig.pass) { return []; }

    const rows = XlsxHelper.parseRows(fileConfig.path);

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

    XlsxHelper.saveSheets(
      'out2.xls',
      [{ data: addedRows, name: 'Added items' }, { data: removedRows, name: 'Removed items' }],
    );
  },
};

export default PriceService;
