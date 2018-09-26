import React from 'react';

const TableHelper = {
  prepareTheadRows: (rowDataLength, idColumn, priceColumn) => {
    const theadRows = [];
    for (let i = 1; i <= rowDataLength; i += 1) {
      if (i === Number(idColumn)) {
        theadRows.push(<th key={i}>ID</th>);
      } else if (i === Number(priceColumn)) {
        theadRows.push(<th key={i}>Price</th>);
      } else {
        theadRows.push(<th key={i} />);
      }
    }

    return theadRows;
  },
  prepareTRows: (rows, idColumn) => (
    rows.map((row) => {
      const rowData = row.map((columnValue, index) => (
        <td key={index}>{columnValue}</td>
      ));

      return <tr key={row[idColumn - 1]}>{rowData}</tr>;
    })
  ),
};

export default TableHelper;
