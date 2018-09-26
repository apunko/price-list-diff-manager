import React from 'react';
import PropTypes from 'prop-types';
import TableHelper from '../helpers/table-helper';

const FileRowsTable = ({ file, rows }) => {
  if (rows.length === 0) { return <>No items</>; }

  const theadRows = TableHelper.prepareTheadRows(rows[0].length, file.idColumn, file.priceColumn);
  const tRows = TableHelper.prepareTRows(rows, file.idColumn);

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
};

FileRowsTable.propTypes = {
  file: PropTypes.shape({
    idColumn: PropTypes.string.isRequired,
    priceColumn: PropTypes.string.isRequired,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default FileRowsTable;
