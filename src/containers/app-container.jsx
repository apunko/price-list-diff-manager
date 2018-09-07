import React from 'react';
import * as Log from 'electron-log';
import XLSX from 'xlsx';
import OpenDialog from '../components/open-dialog';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldFilePath: null,
      newFilePath: null,
      outputDirectoryPath: null,
    };

    this.updatePath = this.updatePath.bind(this);
  }

  updatePath(name, path) {
    this.setState({ [name]: path });
    const workbook = XLSX.readFile(path);
    Log.info(`${Date(Date.now)}:\n ${name}-${path} sheets names: ${workbook.SheetNames}`);
  }

  render() {
    return (
      <>
        {this.state.oldFilePath}
        <OpenDialog label="Select old file" name="oldFilePath" updatePath={this.updatePath} />
        {this.state.newFilePath}
        <OpenDialog label="Select new file" name="newFilePath" updatePath={this.updatePath} />
        {this.state.outputDirectoryPath}
        <OpenDialog label="Select output directory" name="outputDirectoryPath" updatePath={this.updatePath} type="openDirectory" />
      </>
    );
  }
}

export default AppContainer;
