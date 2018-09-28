import React from 'react';

const MAX_ROW_SIZE = 10;

const TableHelper = {
  prepareTheadRows: (rowDataLength, idColumn, priceColumn) => {
    const theadRows = [];
    const rowLength = TableHelper.getRowLength(rowDataLength, idColumn, priceColumn);
    for (let i = 0; i < rowLength; i += 1) {
      if (i === Number(idColumn - 1)) {
        theadRows.push(<th key={i}>ID</th>);
      } else if (i === Number(priceColumn - 1)) {
        theadRows.push(<th key={i}>Price</th>);
      } else {
        theadRows.push(<th key={i} />);
      }
    }

    return theadRows;
  },
  prepareTRows: (rows, idColumn, priceColumn) => {
    if (rows.length === 0) { return []; }

    const rowLength = TableHelper.getRowLength(rows[0].length, idColumn, priceColumn);

    return rows.map((row) => {
      const rowData = [];
      for (let i = 0; i < rowLength; i += 1) {
        rowData.push(<td key={i}>{row[i]}</td>);
      }

      return <tr key={row[idColumn - 1]}>{rowData}</tr>;
    });
  },
  prepareEditableTRows: (rows, idColumn, priceColumn, chargeRates, handleChange) => {
    if (rows.length === 0) { return []; }

    const rowLength = TableHelper.getRowLength(rows[0].data.length, idColumn, priceColumn);

    return rows.map((row, rowIndex) => {
      const rowData = [];
      for (let i = 0; i < rowLength; i += 1) {
        rowData.push(<td key={i}>{row.data[i]}</td>);
      }
      rowData.push(
        <td key="charge">
          <input
            type="number"
            step="0.01"
            min="0"
            className="number-field"
            name={rowIndex}
            onChange={handleChange}
            value={chargeRates[rowIndex]}
          />
        </td>,
      );
      rowData.push(
        <td key="new_price">
          {(Number(chargeRates[rowIndex]) * Number(row.data[priceColumn - 1])).toFixed(2)}
        </td>,
      );

      return <tr key={row[idColumn - 1]}>{rowData}</tr>;
    });
  },
  getRowLength: (rowDataLength, idColumn, priceColumn) => {
    if (rowDataLength > MAX_ROW_SIZE) {
      if (MAX_ROW_SIZE < priceColumn && priceColumn > idColumn) {
        return priceColumn;
      }
      if (MAX_ROW_SIZE < priceColumn && priceColumn < idColumn) {
        return idColumn;
      }

      return MAX_ROW_SIZE;
    }

    return rowDataLength;
  },
};

export default TableHelper;
