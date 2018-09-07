import React from 'react';
import * as Log from 'electron-log';
// import OpenDialog from '../components/open-dialog';
import FileParsingConfig from '../components/file-parsing-config';
import PriceService from '../services/price-service';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFile: {
        path: null,
        idColumn: 'A',
        startRow: '5',
      },
      newFile: {
        path: null,
        idColumn: 'A',
        startRow: '5',
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
    const oldFileRows = PriceService.parseRows(this.state.oldFile);
    Log.info(oldFileRows);
    // const newFile = PriceService.parse(this.state.newFile);
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
          change={this.updatePath}
          file={this.state.newFile}
        />
        <br />
        <button type="button" onClick={this.compareFiles}>Generate diff xls</button>
        {/* {this.state.outputDirectoryPath}
        <OpenDialog label="Select output directory"
        name="outputDirectoryPath" updatePath={this.updatePath} type="openDirectory" /> */}
      </>
    );
  }
}

export default AppContainer;
