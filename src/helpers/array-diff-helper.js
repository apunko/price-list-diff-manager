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
};

export default ArrayDiffHelper;
