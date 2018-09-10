import React from 'react';
// import OpenDialog from '../components/open-dialog';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';

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
      // outputDirectoryPath: null,
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
        <br />
        <button type="button" onClick={this.compareFiles}>Generate diff file</button>
        {/* {this.state.outputDirectoryPath}
        <OpenDialog label="Select output directory"
        name="outputDirectoryPath" updatePath={this.updatePath} type="openDirectory" /> */}
      </>
    );
  }
}

export default AppContainer;
