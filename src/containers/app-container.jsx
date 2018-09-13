import React from 'react';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';
import FileConfigHelper from '../helpers/file-config-helper';
import FilesDiffEditor from '../components/files-diff-editor';
import './app.css';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFile: {
        path: null,
        idColumn: '4',
        startRow: '3',
        priceColumn: '5',
      },
      newFile: {
        path: null,
        idColumn: '5',
        startRow: '3',
        priceColumn: '6',
      },
      filesDiff: {
        addedRows: null,
        removedRows: null,
        priceChangedRows: null,
      },
      configUpdated: false,
    };

    this.updateFileConfig = this.updateFileConfig.bind(this);
    this.compareFiles = this.compareFiles.bind(this);
    this.canCalculateDiff = this.canCalculateDiff.bind(this);
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({
      [name]: file,
      configUpdated: false,
    });
  }

  compareFiles() {
    this.setState(prevState => (
      {
        filesDiff: PriceService.calculateFilesDiff(prevState.oldFile, prevState.newFile),
        configUpdated: true,
      }
    ));
  }

  saveFilesDiff() {
    if (!this.state.filesDiff.addedRows) { return; }

    PriceService.saveFilesDiff(this.state.filesDiff);
  }

  canCalculateDiff() {
    const { oldFile, newFile } = this.state;

    return FileConfigHelper.isValid(oldFile) && FileConfigHelper.isValid(newFile);
  }

  render() {
    const { newFile, oldFile, filesDiff } = this.state;

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
        </div>
        <div className="diff-button">
          <button disabled={!this.canCalculateDiff()} type="button" onClick={this.compareFiles}>
            Calculate prices diff
          </button>
        </div>
        <button disabled={!filesDiff.addedRows} type="button" onClick={this.saveFilesDiff}>
          Save prices diff
        </button>
        {!this.state.configUpdated
          && <span>Configs were updated. Prices diff may not be up to date.</span>
        }
        <hr />
        {filesDiff.addedRows
          && (
          <FilesDiffEditor
            idColumn={newFile.idColumn}
            priceColumn={newFile.priceColumn}
            rows={filesDiff.priceChangedRows}
            chargeRates={Array(filesDiff.priceChangedRows.length).fill('123')}
          />)
        }
      </>
    );
  }
}

export default AppContainer;
