import React from 'react';
import PropTypes from 'prop-types';

class FilesDiffEditor extends React.Component {
  static prepareTheadRows(rowDataLength, idColumn, priceColumn) {
    const theadRows = [];
    for (let i = 1; i <= rowDataLength; i += 1) {
      if (i === Number(idColumn)) {
        theadRows.push(<th>ID</th>);
      } else if (i === Number(priceColumn)) {
        theadRows.push(<th>Price</th>);
      } else {
        theadRows.push(<th />);
      }
    }

    theadRows.push(<th>Charge Rate</th>);
    theadRows.push(<th>New Price</th>);

    return theadRows;
  }

  static prepareTRows(rows, idColumn, priceColumn, chargeRates) {
    return rows.map((row, rowIndex) => {
      const rowData = row.data.map((columnValue, index) => <td key={index}>{columnValue}</td>); // eslint-disable-line
      rowData.push(<td>{chargeRates[rowIndex]}</td>);
      rowData.push(<td>{Number(chargeRates[rowIndex]) * Number(row.data[priceColumn - 1])}</td>);

      return <tr key={row[idColumn - 1]}>{rowData}</tr>;
    });
  }

  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    const { rows, idColumn, priceColumn, chargeRates } = this.props;
    const theadRows = FilesDiffEditor.prepareTheadRows(rows[0].data.length, idColumn, priceColumn);
    const tRows = FilesDiffEditor.prepareTRows(rows, idColumn, priceColumn, chargeRates);

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

FilesDiffEditor.propTypes = {
  idColumn: PropTypes.string.isRequired,
  priceColumn: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired, // eslint-disable-line
  chargeRates: PropTypes.array.isRequired, // eslint-disable-line
};

export default FilesDiffEditor;
