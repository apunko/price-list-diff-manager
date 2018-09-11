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
        idColumn: 4,
        startRow: 3,
        priceColumn: 5,
      },
      newFile: {
        path: null,
        idColumn: 5,
        startRow: 3,
        priceColumn: 5,
      },
    };

    this.updateFileConfig = this.updateFileConfig.bind(this);
    this.compareFiles = this.compareFiles.bind(this);
    this.canGenerateDiff = this.canGenerateDiff.bind(this);
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({ [name]: file });
  }

  compareFiles() {
    PriceService.savePriceDiff(this.state.oldFile, this.state.newFile);
  }

  canGenerateDiff() {
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
          <button disabled={!this.canGenerateDiff()} type="button" onClick={this.compareFiles}>
            Generate diff file
          </button>
        </div>
        <hr />
      </>
    );
  }
}

export default AppContainer;
