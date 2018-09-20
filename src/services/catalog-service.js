import ArrayDiffHelper from '../helpers/array-diff-helper';
import XlsxHelper from '../helpers/xlsx-helper';
import FileConfigHelper from '../helpers/file-config-helper';
import Logger from '../helpers/logger';

const CatalogService = {
  updateCatalog: ({ filesDiff, chargeRates, newFile, catalogFile }) => {
    Logger.info('Prepare data for catalog update');
    const idSymbol = FileConfigHelper.columnToSymbol(catalogFile.idColumn);
    const priceSymbol = FileConfigHelper.columnToSymbol(catalogFile.priceColumn);
    const rowsObjects = ArrayDiffHelper.getNewPriceObjects(filesDiff.priceChangedRows, chargeRates, newFile);
    XlsxHelper.updateCatalog(catalogFile.path, rowsObjects, idSymbol, priceSymbol);
    Logger.info('End catalog update');
  },
};

export default CatalogService;
