import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import FilesDiffEditor from '../files-diff-editor';
import FileRowsTable from '../file-rows-table';
import 'react-tabs/style/react-tabs.css';

class FilesDiffTabs extends React.Component {
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
      const rowData = row.data.map((columnValue, index) => <td key={`${index}`}>{columnValue}</td>); // eslint-disable-line

      return <tr key={row.data[idColumn - 1]}>{rowData}</tr>;
    });
  }

  render() {
    const { newFile, oldFile, handleChargeRateChange, chargeRates, filesDiff } = this.props;

    return (
      <Tabs>
        <TabList>
          <Tab>Changed Price Items</Tab>
          <Tab>Added Items</Tab>
          <Tab>Removed Items</Tab>
        </TabList>

        <TabPanel>
          <FilesDiffEditor
            handleChange={handleChargeRateChange}
            idColumn={newFile.idColumn}
            priceColumn={newFile.priceColumn}
            rows={filesDiff.priceChangedRows}
            chargeRates={chargeRates}
          />
        </TabPanel>
        <TabPanel>
          <FileRowsTable
            file={newFile}
            rows={filesDiff.addedRows}
          />
        </TabPanel>
        <TabPanel>
          <FileRowsTable
            file={oldFile}
            rows={filesDiff.removedRows}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

FilesDiffTabs.propTypes = {
  newFile: PropTypes.shape({
    idColumn: PropTypes.string.isRequired,
    priceColumn: PropTypes.string.isRequired,
  }).isRequired,
  oldFile: PropTypes.shape({
    idColumn: PropTypes.string.isRequired,
    priceColumn: PropTypes.string.isRequired,
  }).isRequired,
  filesDiff: PropTypes.shape({
    priceChangedRows: PropTypes.array.isRequired,
    addedRows: PropTypes.array.isRequired,
    removedRows: PropTypes.array.isRequired,
  }).isRequired,
  handleChargeRateChange: PropTypes.func.isRequired,
  chargeRates: PropTypes.array.isRequired, // eslint-disable-line
};

export default FilesDiffTabs;
