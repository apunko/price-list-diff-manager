import React from 'react';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';
import FileConfigHelper from '../helpers/file-config-helper';
import CatalogConfig from '../components/catalog-config';
import CatalogService from '../services/catalog-service';
import FilesDiffTabs from '../components/files-diff-tabs';
import './app.css';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFile: {
        path: '/Users/mac-082-71/Downloads/Прайс№1(старый).xls',
        idColumn: '4',
        startRow: '3',
        priceColumn: '5',
      },
      newFile: {
        path: '/Users/mac-082-71/Downloads/Прайс№2 (новый).xls',
        idColumn: '5',
        startRow: '3',
        priceColumn: '6',
      },
      catalogFile: {
        path: '/Users/mac-082-71/Downloads/set_of_files/catalog_test/Catalog_test.xlsx',
        idColumn: '6',
        priceColumn: '2',
      },
      filesDiff: {
        addedRows: null,
        removedRows: null,
        priceChangedRows: null,
      },
      chargeRates: null,
      configUpdated: false,
    };

    this.updateCatalog = this.updateCatalog.bind(this);
    this.canUpdateCatalog = this.canUpdateCatalog.bind(this);
    this.updateFileConfig = this.updateFileConfig.bind(this);
    this.compareFiles = this.compareFiles.bind(this);
    this.saveFilesDiff = this.saveFilesDiff.bind(this);
    this.canCalculateDiff = this.canCalculateDiff.bind(this);
    this.handleChargeRateChange = this.handleChargeRateChange.bind(this);
    this.saveFilesDiff = this.saveFilesDiff.bind(this);
    this.updateCatalogFile = this.updateCatalogFile.bind(this);
  }

  updateCatalog(name, file) {
    if (!file) { return; }

    this.setState({
      [name]: file,
    });
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({
      [name]: file,
      configUpdated: true,
    });
  }

  compareFiles() {
    this.setState(((prevState) => {
      const filesDiff = PriceService.calculateFilesDiff(prevState.oldFile, prevState.newFile);

      return {
        filesDiff,
        chargeRates: Array(filesDiff.priceChangedRows.length).fill('1.30'),
        configUpdated: false,
      };
    }));
  }

  saveFilesDiff() {
    if (!this.state.chargeRates) { return; }

    PriceService.saveFilesDiff(this.state.filesDiff);
  }

  updateCatalogFile() {
    if (!this.canUpdateCatalog) { return; }

    CatalogService.updateCatalog(this.state);
  }

  canCalculateDiff() {
    const { oldFile, newFile } = this.state;

    return FileConfigHelper.isValid(oldFile) && FileConfigHelper.isValid(newFile);
  }

  canUpdateCatalog() {
    const { chargeRates, catalogFile } = this.state;

    return FileConfigHelper.isValid(catalogFile) && chargeRates;
  }

  handleChargeRateChange(event) {
    const { name, value } = event.target;

    this.setState(prevState => ({
      chargeRates: prevState.chargeRates.map((rate, index) => (
        index === Number(name) ? value : rate
      )),
    }));
  }

  render() {
    const { newFile, oldFile, filesDiff, chargeRates, catalogFile } = this.state;

    return (
      <>
        <div className="file-configs-grid">
          <FileParsingConfig
            title="Old file"
            name="oldFile"
            change={this.updateFileConfig}
            file={oldFile}
          />
          <FileParsingConfig
            title="New file"
            name="newFile"
            change={this.updateFileConfig}
            file={newFile}
          />
          <CatalogConfig
            title="Catalog"
            name="catalogFile"
            change={this.updateCatalog}
            file={catalogFile}
          />
        </div>
        <div className="buttons-group">
          <div className="button diff-button">
            <button disabled={!this.canCalculateDiff()} type="button" onClick={this.compareFiles}>
              Calculate prices diff
            </button>
          </div>
          <div className="button file-button">
            <button disabled={!chargeRates} type="button" onClick={this.saveFilesDiff}>
              Save prices diff
            </button>
          </div>
          <div className="button file-button">
            <button disabled={!this.canUpdateCatalog()} type="button" onClick={this.updateCatalogFile}>
              Update Catalog
            </button>
          </div>
        </div>
        {this.state.configUpdated && chargeRates
          && <span>Configs were updated. Prices diff may not be up to date.</span>
        }
        <hr />
        {chargeRates
          && (
          <FilesDiffTabs
            handleChargeRateChange={this.handleChargeRateChange}
            newFile={newFile}
            oldFile={oldFile}
            filesDiff={filesDiff}
            chargeRates={chargeRates}
          />)
        }
      </>
    );
  }
}

export default AppContainer;
