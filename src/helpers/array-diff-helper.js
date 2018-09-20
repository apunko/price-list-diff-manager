const ArrayDiffHelper = {
  getAddedRows: (oldRows, oldIdColumn, newRows, newIdColumn) => (
    newRows.filter(priceRow => (
      !ArrayDiffHelper.isInRows(oldRows, oldIdColumn, priceRow[newIdColumn])
    ))
  ),
  getPriceDiffRows: (oldRows, oldConfig, newRows, newConfig, compare) => (
    newRows.filter((newRow) => {
      const oldRow = oldRows.find(row => row[oldConfig.idColumn] === newRow[newConfig.idColumn]);

      return oldRow ? compare(oldRow[oldConfig.priceColumn], newRow[newConfig.priceColumn]) : false;
    })
  ),
  isInRows: (rows, idColumn, checkRowId) => (
    rows.some(row => row[idColumn] === checkRowId)
  ),
  getNewPriceObjects: (priceChangedRows, chargeRates, fileConfig) => (
    priceChangedRows.map((row, index) => (
      {
        id: row.data[fileConfig.idColumn - 1],
        price: (Number(chargeRates[index]) * Number(row.data[fileConfig.priceColumn - 1])).toFixed(2),
      }
    ))
  ),
  // removeEmptyItems: (rows) => {
  //   let min = 0;
  //   for (let i = rows.length - 1; i >= 0; i -= 1) {
  //     const row = rows[i];
  //     let j = row.length - 1;
  //     while (j >= 0 && !row[j]) {
  //       j -= 1;
  //     }
  //   }
  // }
};

export default ArrayDiffHelper;
