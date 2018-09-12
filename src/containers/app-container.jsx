import React from 'react';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';
import FileConfigHelper from '../helpers/file-config-helper';
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
      filesDiff: null,
      diffValid: false,
    };

    this.updateFileConfig = this.updateFileConfig.bind(this);
    this.compareFiles = this.compareFiles.bind(this);
    this.canCalculateDiff = this.canCalculateDiff.bind(this);
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({
      [name]: file,
      diffValid: false,
    });
  }

  compareFiles() {
    this.setState(prevState => (
      {
        filesDiff: PriceService.calculateFilesDiff(prevState.oldFile, prevState.newFile),
        diffValid: true,
      }
    ));
  }

  saveFilesDiff() {
    if (!this.state.filesDiff) { return; }

    PriceService.saveFilesDiff(this.state.filesDiff);
  }

  canCalculateDiff() {
    const { oldFile, newFile } = this.state;

    return FileConfigHelper.isValid(oldFile) && FileConfigHelper.isValid(newFile);
  }

  render() {
    return (
      <>
        <div className="file-configs-grid">
          <FileParsingConfig
            title="Old file"
            name="oldFile"
            change={this.updateFileConfig}
            file={this.state.oldFile}
          />
          <FileParsingConfig
            title="New file"
            name="newFile"
            change={this.updateFileConfig}
            file={this.state.newFile}
          />
        </div>
        <div className="diff-button">
          <button disabled={!this.canCalculateDiff()} type="button" onClick={this.compareFiles}>
            Calculate prices diff
          </button>
        </div>
        <button disabled={!this.state.filesDiff} type="button" onClick={this.saveFilesDiff}>
          Save prices diff
        </button>
        {!this.state.diffValid
          && <span>Prices diff is not up to date with configs.</span>
        }
        <hr />
      </>
    );
  }
}

export default AppContainer;
