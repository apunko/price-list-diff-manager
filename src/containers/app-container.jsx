import React from 'react';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';
import './app.css';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFile: {
        path: null,
        idColumn: 4,
        startRow: 3,
      },
      newFile: {
        path: null,
        idColumn: 5,
        startRow: 3,
      },
    };

    this.updateFileConfig = this.updateFileConfig.bind(this);
    this.compareFiles = this.compareFiles.bind(this);
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({ [name]: file });
  }

  compareFiles() {
    PriceService.savePriceDiff(this.state.oldFile, this.state.newFile);
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
          <button type="button" onClick={this.compareFiles}>Generate diff file</button>
        </div>
        <hr />
      </>
    );
  }
}

export default AppContainer;
