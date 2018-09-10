const ArrayDiffHelper = {
  getAddedRows: (oldRows, oldIdColumn, newRows, newIdColumn) => (
    newRows.filter(priceRow => (
      !ArrayDiffHelper.isInRows(oldRows, oldIdColumn, priceRow[newIdColumn])
    ))
  ),
  isInRows: (rows, idColumn, checkRowId) => (
    rows.some(row => row[idColumn] === checkRowId)
  ),
};

export default ArrayDiffHelper;
