const ArrayDiffHelper = {
  getAddedRows: (oldRows, oldIdColumn, newRows, newIdColumn) => (
    newRows.filter(priceRow => (
      !ArrayDiffHelper.isInRows(oldRows, oldIdColumn, priceRow[newIdColumn])
    ))
  ),
  getPriceDiffRows: (oldRows, oldConfig, newRows, newConfig, compare) => (
    newRows.filter((newRow) => {
      const oldRow = oldRows.find(row => row[oldConfig.idColumn] === newRow[newConfig.idColumn]);

      return oldRow ? compare(Number(oldRow[oldConfig.priceColumn]), Number(newRow[newConfig.priceColumn])) : false;
    })
  ),
  isInRows: (rows, idColumn, checkRowId) => (
    rows.some(row => row[idColumn] === checkRowId)
  ),
  getNewPriceObjects: (filesDiff, chargeRates, newFile, oldFile) => {
    const newPriceObjects = filesDiff.priceChangedRows.map((row, index) => (
      {
        id: row.data[newFile.idColumn - 1],
        price: (Number(chargeRates[index]) * Number(row.data[newFile.priceColumn - 1])).toFixed(2),
      }
    ));

    const zeroPriceObjects = filesDiff.removedRows.map(row => (
      {
        id: row[oldFile.idColumn - 1],
        price: 0,
      }
    ));

    return newPriceObjects.concat(zeroPriceObjects);
  },
};

export default ArrayDiffHelper;
