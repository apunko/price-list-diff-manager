import React from 'react';
import * as Log from 'electron-log';
import XLSX from 'xlsx';
// import OpenDialog from '../components/open-dialog';
import FileParsingConfig from '../components/file-parsing-config';

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
  }

  updateFileConfig(name, file) {
    if (!file) { return; }

    this.setState({ [name]: file });
  }

  compareFiles() {
    const oldFile = XLSX.readFile(this.state.oldFile.path);
    Log.info(`${Date(Date.now)}:\n Read: ${this.state.oldFile.path};\n Sheets names: ${oldFile.SheetNames}`);
    const newFile = XLSX.readFile(this.state.newFile.path);
    Log.info(`${Date(Date.now)}:\n Read: ${this.state.newFile.path};\n Sheets names: ${newFile.SheetNames}`);
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
