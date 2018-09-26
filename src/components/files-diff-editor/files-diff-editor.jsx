import React from 'react';
import PropTypes from 'prop-types';
import TableHelper from '../../helpers/table-helper';
import './files-diff-editor.css';

class FilesDiffEditor extends React.Component {
  static prepareTheadRows(rowDataLength, idColumn, priceColumn) {
    const theadRows = TableHelper.prepareTheadRows(rowDataLength, idColumn, priceColumn);
    theadRows.push(<th key="charge_rate">Charge Rate</th>);
    theadRows.push(<th key="new_price">New Price</th>);

    return theadRows;
  }

  static prepareTRows(rows, idColumn, priceColumn, chargeRates, handleChange) {
    return rows.map((row, rowIndex) => {
      const rowData = row.data.map((columnValue, index) => <td key={`${index}`}>{columnValue}</td>);
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

  render() {
    if (this.props.rows.length === 0) { return <>No items</>; }

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
  rows: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  chargeRates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilesDiffEditor;
