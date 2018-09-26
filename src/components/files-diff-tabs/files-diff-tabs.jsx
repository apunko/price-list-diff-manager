import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import FilesDiffEditor from '../files-diff-editor';
import FileRowsTable from '../file-rows-table';
import 'react-tabs/style/react-tabs.css';

const FilesDiffTabs = ({ newFile, oldFile, handleChargeRateChange, chargeRates, filesDiff }) => (
  <Tabs style={{ background: 'white' }}>
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
  chargeRates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilesDiffTabs;
