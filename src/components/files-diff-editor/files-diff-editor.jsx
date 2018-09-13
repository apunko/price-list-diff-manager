import React from 'react';
import PropTypes from 'prop-types';
import './files-diff-editor.css';

class FilesDiffEditor extends React.Component {
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

    theadRows.push(<th key="charge_rate">Charge Rate</th>);
    theadRows.push(<th key="new_price">New Price</th>);

    return theadRows;
  }

  static prepareTRows(rows, idColumn, priceColumn, chargeRates, handleChange) {
    return rows.map((row, rowIndex) => {
      const rowData = row.data.map((columnValue, index) => <td key={`${index}`}>{columnValue}</td>); // eslint-disable-line
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

      return <tr key={row.data[idColumn - 1]}>{rowData}</tr>;
    });
  }

  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    const { rows, idColumn, priceColumn, chargeRates, handleChange } = this.props;
    const theadRows = FilesDiffEditor.prepareTheadRows(rows[0].data.length, idColumn, priceColumn);
    const tRows = FilesDiffEditor.prepareTRows(rows, idColumn, priceColumn, chargeRates, handleChange);

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
  handleChange: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired, // eslint-disable-line
  chargeRates: PropTypes.array.isRequired, // eslint-disable-line
};

export default FilesDiffEditor;
