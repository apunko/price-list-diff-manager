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

  render() {
    if (this.props.rows.length === 0) { return <>No items</>; }

    const { rows, idColumn, priceColumn, chargeRates, handleChange } = this.props;
    const theadRows = FilesDiffEditor.prepareTheadRows(rows[0].data.length, idColumn, priceColumn);
    const tRows = TableHelper.prepareEditableTRows(rows, idColumn, priceColumn, chargeRates, handleChange);

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
