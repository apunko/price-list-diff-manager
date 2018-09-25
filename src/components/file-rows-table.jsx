import React from 'react';
import PropTypes from 'prop-types';

class FileRowsTable extends React.Component {
  static prepareTheadRows(rowDataLength, idColumn, priceColumn) {
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
  }

  static prepareTRows(rows, idColumn) {
    return rows.map((row) => {
      const rowData = row.map((columnValue, index) => <td key={`${index}`}>{columnValue}</td>); // eslint-disable-line

      return <tr key={row[idColumn - 1]}>{rowData}</tr>;
    });
  }

  render() {
    if (this.props.rows.length === 0) { return <>No items</>; }

    const { file, rows } = this.props;
    const theadRows = FileRowsTable.prepareTheadRows(rows[0].length, file.idColumn, file.priceColumn);
    const tRows = FileRowsTable.prepareTRows(rows, file.idColumn);

    return (
      <table>
        <thead>
          <tr>
            {theadRows}
          </tr>
        </thead>
        <tbody>
          {tRows}
        </tbody>
      </table>
    );
  }
}

FileRowsTable.propTypes = {
  file: PropTypes.shape({
    idColumn: PropTypes.string.isRequired,
    priceColumn: PropTypes.string.isRequired,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default FileRowsTable;
